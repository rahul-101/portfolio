import { useEffect, useRef } from 'react';

// Aesthetic 3D background: rotating icosahedron + octahedron wireframes,
// orbiting particles, depth-linked constellation with perspective.
export default function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let w = 0, h = 0, dpr = 1;
    const accent = { r: 208, g: 138, b: 110 };
    const alt = { r: 218, g: 165, b: 122 };

    // ---- Geometry: icosahedron wireframe ----
    const PHI = (1 + Math.sqrt(5)) / 2;
    const icoRaw = [
      [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
      [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
      [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
    ].map((v) => { const l = Math.hypot(v[0], v[1], v[2]); return v.map((c) => c / l); });
    const icoEdges: [number, number][] = [];
    for (let i = 0; i < icoRaw.length; i++) for (let j = i + 1; j < icoRaw.length; j++) {
      const dx = icoRaw[i][0] - icoRaw[j][0], dy = icoRaw[i][1] - icoRaw[j][1], dz = icoRaw[i][2] - icoRaw[j][2];
      if (dx * dx + dy * dy + dz * dz < 1.12) icoEdges.push([i, j]);
    }

    // ---- Octahedron ----
    const octRaw = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    const octEdges: [number, number][] = [];
    for (let i = 0; i < octRaw.length; i++) for (let j = i + 1; j < octRaw.length; j++) {
      const dx = octRaw[i][0] - octRaw[j][0], dy = octRaw[i][1] - octRaw[j][1], dz = octRaw[i][2] - octRaw[j][2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d > 1.3 && d < 1.8) octEdges.push([i, j]);
    }

    // ---- Particles ----
    const COUNT = coarse ? 40 : 70;
    let nodes: { x: number; y: number; z: number; vx: number; vy: number; vz: number; pulse: number }[] = [];
    const DEPTH = 300, LINK2 = 150 * 150;

    function spawn() {
      nodes = [];
      for (let i = 0; i < COUNT; i++) {
        nodes.push({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * DEPTH,
          vx: (Math.random() - 0.5) * 0.0015,
          vy: (Math.random() - 0.5) * 0.0012,
          vz: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvasRef.current!.width = w * dpr;
      canvasRef.current!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let running = true;
    const onVis = () => (running = !document.hidden);
    document.addEventListener('visibilitychange', onVis);

    function rot(v: number[], cy: number, sy: number, cx: number, sx: number) {
      const x1 = v[0] * cy + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy;
      const y1 = v[1] * cx - z1 * sx;
      const z2 = v[1] * sx + z1 * cx;
      return [x1, y1, z2];
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      const focus = Math.min(w, h) * 0.55;

      // Icosahedron — center
      const icoSize = Math.min(w, h) * 0.28;
      const iY = t * 0.00016, iP = 0.3 + Math.sin(t * 0.0001) * 0.2;
      const iCY = Math.cos(iY), iSY = Math.sin(iY), iCX = Math.cos(iP), iSX = Math.sin(iP);
      ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},0.5)`;
      ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},0.8)`;
      ctx.lineWidth = 1;
      for (const [a, b] of icoEdges) {
        const A = rot(icoRaw[a] as [number,number,number], iCY, iSY, iCX, iSX);
        const B = rot(icoRaw[b] as [number,number,number], iCY, iSY, iCX, iSX);
        const sA = focus / (focus + 2 + A[2] * icoSize);
        const sB = focus / (focus + 2 + B[2] * icoSize);
        ctx.globalAlpha = Math.min(1, Math.max(0.04, (sA + sB) / 2 - 0.5)) * 0.4;
        ctx.beginPath();
        ctx.moveTo(w/2 + A[0] * icoSize * sA, h/2.1 + A[1] * icoSize * sA);
        ctx.lineTo(w/2 + B[0] * icoSize * sB, h/2.1 + B[1] * icoSize * sB);
        ctx.stroke();
      }
      for (const v of icoRaw) {
        const r = rot(v as [number,number,number], iCY, iSY, iCX, iSX);
        const s = focus / (focus + 2 + r[2] * icoSize);
        ctx.globalAlpha = Math.min(1, Math.max(0.1, s - 0.5)) * 0.6;
        ctx.beginPath(); ctx.arc(w/2 + r[0] * icoSize * s, h/2.1 + r[1] * icoSize * s, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Octahedron (offset)
      const oSize = Math.min(w, h) * 0.12;
      const oY = -t * 0.00012, oP = -0.5 + Math.sin(t * 0.00008) * 0.3;
      const oCY = Math.cos(oY), oSY = Math.sin(oY), oCX = Math.cos(oP), oSX = Math.sin(oP);
      ctx.strokeStyle = `rgba(${alt.r},${alt.g},${alt.b},0.4)`;
      const ox = w * 0.82, oy = h * 0.18;
      for (const [a, b] of octEdges) {
        const ra = rot(octRaw[a] as [number,number,number], oCY, oSY, oCX, oSX);
        const rb = rot(octRaw[b] as [number,number,number], oCY, oSY, oCX, oSX);
        const sA = focus / (focus + 2 + ra[2] * oSize);
        const sB = focus / (focus + 2 + rb[2] * oSize);
        ctx.globalAlpha = Math.min(1, Math.max(0.04, (sA + sB) / 2 - 0.5)) * 0.4;
        ctx.beginPath();
        ctx.moveTo(ox + ra[0] * oSize * sA, oy + ra[1] * oSize * sA);
        ctx.lineTo(ox + rb[0] * oSize * sB, oy + rb[1] * oSize * sB);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Particles
      const yaw = Math.sin(t * 0.00008) * 0.4;
      const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
      const fovF = focus * 2.4;
      const pts = nodes.map((n) => {
        n.x += n.vx; n.y += n.vy; n.z += n.vz; n.pulse += 0.01;
        if (n.x > 1.1 || n.x < -1.1) n.vx *= -1;
        if (n.y > 1.1 || n.y < -1.1) n.vy *= -1;
        if (n.z > DEPTH/2 || n.z < -DEPTH/2) n.vz *= -1;
        const x = n.x * cosY + n.z * sinY;
        const z = -n.x * sinY + n.z * cosY;
        const scale = fovF / (fovF + z);
        return { x: w/2 + x * focus * scale, y: h/2 + n.y * focus * scale, z, scale, pulse: n.pulse };
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = (pts[i].z - pts[j].z) * 0.5;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < LINK2) {
          ctx.globalAlpha = (1 - d2 / LINK2) * 0.16;
          ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},1)`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${alt.r},${alt.g},${alt.b},0.9)`;
      for (const p of pts) {
        const size = Math.max(0.4, (0.6 + p.scale * 1.4) * (0.7 + 0.4 * Math.sin(p.pulse)));
        ctx.globalAlpha = Math.min(1, p.scale) * 0.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(t: number) {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      draw(t);
    }

    spawn(); resize();

    if (reduce) { draw(0); canvas.style.opacity = '0.5'; }
    else { raf = requestAnimationFrame(loop); }

    const onResize = () => { resize(); };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full opacity-80" aria-hidden="true" />;
}