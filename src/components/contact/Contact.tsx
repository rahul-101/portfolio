import { useState, FormEvent } from 'react';
import { contact } from '../../lib/data';
import Section from '../ui/Section';
import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('Please fill in all fields.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (res.ok) {
        setStatus("Thanks — your message has been sent. I'll get back to you soon.");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Request failed');
      }
    } catch {
      setStatus(`Couldn't send — email me directly at ${contact.email}`);
    }
    setSending(false);
  };

  return (
    <Section id="contact" label={contact.label} title={contact.title}>
      <ScrollReveal>
        <p className="mb-10 text-center text-brand-muted">{contact.sub}</p>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <ScrollReveal className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass-card glass-shine rounded-card p-6">
            <h3 className="mb-4 font-display font-semibold text-brand-text">Send a Message</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-muted">Name</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-base text-brand-text placeholder:text-brand-text/30 outline-none transition-colors focus:border-brand-accent" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-muted">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-base text-brand-text placeholder:text-brand-text/30 outline-none transition-colors focus:border-brand-accent" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-muted">Message</label>
                <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required
                  placeholder="Tell me about the opportunity..."
                  className="w-full resize-none rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-base text-brand-text placeholder:text-brand-text/30 outline-none transition-colors focus:border-brand-accent" />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-full bg-gradient-to-r from-amber-400 via-brand-amber to-orange-500 py-3 font-semibold text-stone-900 shadow-lg shadow-brand-amber/20 disabled:opacity-60"
              >
                {sending ? 'Sending…' : 'Send Message'}
              </motion.button>
              {status && <p className="mt-2 text-center text-sm text-brand-muted">{status}</p>}
            </div>
          </form>
        </ScrollReveal>

        {/* Contact links */}
        <ScrollReveal delay={0.08} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-4">
            {[
              { icon: '✉', label: 'Email', href: `mailto:${contact.email}`, value: contact.email },
              { icon: '📞', label: 'Phone', href: `tel:${contact.phoneHref}`, value: contact.phone },
              { icon: 'in', label: 'LinkedIn', href: contact.linkedin, value: contact.linkedinLabel },
              { icon: '⌘', label: 'GitHub', href: contact.github, value: contact.githubLabel },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 rounded-card p-4 transition-colors hover:border-brand-amber/30"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-amber">{c.icon}</span>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-brand-muted">{c.label}</p>
                  <p className="truncate text-sm text-brand-text">{c.value}</p>
                </div>
              </a>
            ))}
            <p className="mt-2 text-center font-mono text-xs text-brand-muted">
              📍 {contact.location}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}