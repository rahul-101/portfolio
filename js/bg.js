/* ---------- 3D neural-network background ---------- */
/* Lightweight pseudo-3D particle constellation drawn on a 2D canvas.
   Theme-aware, pointer-parallax, pauses when hidden, honours reduced motion. */
(() => {
  const canvas = document.getElementById('bgNet');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  const palette = { accent: '#3fb950' };

  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    palette.accent = cs.getPropertyValue('--accent').trim() || '#3fb950';
  }
  readTheme();
  new MutationObserver(readTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes = [];

  const COUNT = coarse ? 55 : 115;
  const DEPTH = 260;
  const LINK2 = 145 * 145;
  const LIMIT = 1.1;

  /* Rotating pseudo-3D icosahedron wireframe */
  const ICO = (() => {
    const PHI = (1 + Math.sqrt(5)) / 2;
    const raw = [
      [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
      [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
      [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
    ];
    const verts = raw.map((v) => {
      const l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return v.map((c) => c / l);
    });
    const edges = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const dx = verts[i][0] - verts[j][0];
        const dy = verts[i][1] - verts[j][1];
        const dz = verts[i][2] - verts[j][2];
        if (dx * dx + dy * dy + dz * dz < 1.12) edges.push([i, j]);
      }
    }
    return { verts, edges };
  })();

  /* Rotating pseudo-3D octahedron wireframe */
  const OCT = (() => {
    const raw = [
      [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
    ];
    const verts = raw.map((v) => {
      const l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return v.map((c) => c / l);
    });
    const edges = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const dx = verts[i][0] - verts[j][0];
        const dy = verts[i][1] - verts[j][1];
        const dz = verts[i][2] - verts[j][2];
        if (dx * dx + dy * dy + dz * dz < 2.2) edges.push([i, j]);
      }
    }
    return { verts, edges };
  })();

  /* Orbiting particle ring (6 droplets circling a nucleus) */
  const ORBIT_COUNT = coarse ? 0 : 6;

  function spawn() {
    nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * DEPTH,
        vx: (Math.random() - 0.5) * 0.0016,
        vy: (Math.random() - 0.5) * 0.0016,
        vz: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize, { passive: true });

  let mx = 0;
  let my = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  function draw(now) {
    ctx.clearRect(0, 0, w, h);

    const focus = Math.min(w, h) * 0.55;
    const fov = focus * 2.4;
    const yaw = Math.sin(now * 0.00008) * 0.55;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);

    /* Icosahedron: slow rotation, depth-faded edges */
    const icoSize = Math.min(w, h) * 0.24;
    const icoCX = w * 0.5 + mx * 60;
    const icoCY = h * 0.5 + my * 40;
    const icoYaw = now * 0.00016;
    const icoPitch = 0.35 + Math.sin(now * 0.0001) * 0.3;
    const iCosY = Math.cos(icoYaw);
    const iSinY = Math.sin(icoYaw);
    const iCosX = Math.cos(icoPitch);
    const iSinX = Math.sin(icoPitch);
    const rotIco = (v) => {
      const x1 = v[0] * iCosY + v[2] * iSinY;
      const z1 = -v[0] * iSinY + v[2] * iCosY;
      const y1 = v[1] * iCosX - z1 * iSinX;
      const z2 = v[1] * iSinX + z1 * iCosX;
      return [x1, y1, z2];
    };
    const projIco = (v) => {
      const r = rotIco(v);
      const scale = focus / (focus + 2 + r[2] * icoSize);
      return [icoCX + r[0] * icoSize * scale, icoCY + r[1] * icoSize * scale, scale];
    };

    ctx.lineWidth = 1;
    ctx.strokeStyle = palette.accent;
    for (const [a, b] of ICO.edges) {
      const pa = projIco(ICO.verts[a]);
      const pb = projIco(ICO.verts[b]);
      ctx.globalAlpha = Math.min(1, Math.max(0.04, (pa[2] + pb[2]) / 2 - 0.55)) * 0.5;
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    }
    ctx.fillStyle = palette.accent;
    for (const v of ICO.verts) {
      const p = projIco(v);
      ctx.globalAlpha = Math.min(1, Math.max(0.08, p[2] - 0.55)) * 0.8;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* Octahedron: counter-wire, top-right, lightness fades with depth */
    const oSize = Math.min(w, h) * 0.12;
    const oCX = w * 0.5 - mx * 60;
    const oCY = h * 0.8 + my * 40;
    const oYaw = -now * 0.0001;
    const oPitch = -0.5 + Math.sin(now * 0.00006) * 0.4;
    const oCosY = Math.cos(oYaw);
    const oSinY = Math.sin(oYaw);
    const oCosX = Math.cos(oPitch);
    const oSinX = Math.sin(oPitch);
    const rotO = (v) => {
      const x1 = v[0] * oCosY + v[2] * oSinY;
      const z1 = -v[0] * oSinY + v[2] * oCosY;
      const y1 = v[1] * oCosX - z1 * oSinX;
      const z2 = v[1] * oSinX + z1 * oCosX;
      return [x1, y1, z2];
    };
    const projO = (v) => {
      const r = rotO(v);
      const scale = focus / (focus + 2 + r[2] * oSize);
      return [oCX + r[0] * oSize * scale, oCY + r[1] * oSize * scale, scale];
    };
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = palette.accent;
    for (const [a, b] of OCT.edges) {
      const pa = projO(OCT.verts[a]);
      const pb = projO(OCT.verts[b]);
      ctx.globalAlpha = Math.min(1, Math.max(0.03, (pa[2] + pb[2]) / 2 - 0.45)) * 0.45;
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.stroke();
    }
    for (const v of OCT.verts) {
      const p = projO(v);
      ctx.globalAlpha = Math.min(1, Math.max(0.1, p[2] - 0.45)) * 0.9;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* Orbiting particle cloud around the origin */
    if (ORBIT_COUNT > 0) {
      const orbCX = w * 0.5 + mx * 90;
      const orbCY = h * 0.5 + my * 60;
      const orbR = Math.min(w, h) * 0.18;
      const baseTilt = 0.42;
      const cTiltY = Math.cos(baseTilt);
      const sTiltY = Math.sin(baseTilt);
      ctx.fillStyle = palette.accent;
      for (let i = 0; i < ORBIT_COUNT; i++) {
        const angle = now * 0.0011 + (i / ORBIT_COUNT) * Math.PI * 2;
        const wob = 0.75 + 0.25 * Math.sin(angle * 1.7 + i * 2.0);
        const rx = Math.cos(angle) * orbR * wob;
        const ry = Math.sin(angle) * orbR;
        const x = rx * cTiltY;
        const y = ry;
        const z = -rx * sTiltY;
        const scale = focus / (focus + z);
        ctx.globalAlpha = Math.max(0.15, 0.4 + z * 0.0012) * 0.6;
        ctx.beginPath();
        ctx.arc(orbCX + x * scale, orbCY + y * scale, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    const pts = nodes.map((n) => {
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
      if (n.x > LIMIT || n.x < -LIMIT) n.vx *= -1;
      if (n.y > LIMIT || n.y < -LIMIT) n.vy *= -1;
      if (n.z > DEPTH / 2 || n.z < -DEPTH / 2) n.vz *= -1;

      const x = n.x * cosY + n.z * sinY;
      const z = -n.x * sinY + n.z * cosY;
      const scale = fov / (fov + z);
      return {
        x: w / 2 + (x + mx * 0.6) * focus * scale,
        y: h / 2 + (n.y + my * 0.5) * focus * scale,
        z,
        scale,
        pulse: n.pulse
      };
    });

    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = (pts[i].z - pts[j].z) * 0.5;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < LINK2) {
          ctx.strokeStyle = palette.accent;
          ctx.globalAlpha = (1 - d2 / LINK2) * 0.3;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    for (const p of pts) {
      const size = Math.max(0.5, (0.7 + p.scale * 1.6) * (0.7 + 0.5 * Math.sin(p.pulse + now * 0.0012)));
      ctx.fillStyle = palette.accent;
      ctx.globalAlpha = Math.min(1, p.scale) * 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    requestAnimationFrame(loop);
    if (!running || document.hidden) return;
    draw(now);
  }

  spawn();
  resize();

  if (reduced) {
    draw(0);
    canvas.style.opacity = '0.25';
  } else {
    requestAnimationFrame(loop);
  }
})();
