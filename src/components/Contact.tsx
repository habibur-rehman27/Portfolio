import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Copy,
  Check,
  Send,
  MapPin,
  Mail,
  ArrowUpRight,
  Terminal,
  AlertCircle,
} from 'lucide-react';
import { profile, contactContent } from '../data/content';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = profile.email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSuccess(false);

    // Validation
    if (!formState.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim() || !emailRegex.test(formState.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      setErrorMessage('Please write a brief message (at least 10 characters).');
      return;
    }

    // Compose prefilled mailto link
    const subject = `${contactContent.form.subjectPrefix} ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}\n\n[Sent from portfolio contact console]`;
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSuccess(true);
    window.location.href = mailtoUrl;
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Transmission Channels"
      className="scroll-mt-24 py-16 md:py-24 border-t border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Monospace Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealVariants}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-xs text-accent-lime font-bold tracking-wider">
            // 06
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            CONTACT
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        {/* Large Closing Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealVariants}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-content-primary mb-4 leading-tight">
            {contactContent.closingHeadline.split('intelligent.')[0]}
            <span className="text-accent-lime underline decoration-accent-lime/40 decoration-wavy underline-offset-8">
              intelligent.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-content-secondary max-w-2xl leading-relaxed">
            {contactContent.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Transmission & Network Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealVariants}
            className="lg:col-span-5 space-y-6"
          >
            {/* Click-to-Copy Email Card */}
            <div className="console-card rounded-2xl p-6 border border-hairline bg-surface/90 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 font-mono text-[11px] text-content-muted uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent-lime" />
                  {contactContent.emailLabel}
                </span>
                <span className="text-accent-lime">PRIMARY</span>
              </div>

              <div className="p-3 rounded-xl border border-hairline bg-base flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-xs sm:text-sm text-content-primary hover:text-accent-lime transition-colors truncate"
                  title="Send email"
                >
                  {profile.email}
                </a>

                {/* Click to Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface hover:border-accent-lime/60 hover:text-accent-lime text-xs font-mono text-content-secondary transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-lime" />
                      <span className="text-accent-lime font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accessible Live Region Toast Announcement */}
              <div aria-live="polite" className="sr-only">
                {copied ? 'Email address copied to clipboard.' : ''}
              </div>

              {/* Toast Pill visible feedback */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-2 text-center py-1 px-2 rounded font-mono text-[11px] text-accent-lime bg-accent-lime/10 border border-accent-lime/30"
                  >
                    ✓ Address copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Networks & Location */}
            <div className="console-card rounded-2xl p-6 border border-hairline bg-surface/80 space-y-4 font-mono text-xs">
              <div className="font-mono text-[11px] text-content-muted uppercase tracking-wider pb-2 border-b border-hairline/60">
                // {contactContent.socialsLabel}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-hairline bg-base flex items-center justify-between hover:border-accent-lime/60 hover:text-accent-lime text-content-primary transition-all group min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-accent-lime" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-muted group-hover:text-accent-lime transition-colors" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-hairline bg-base flex items-center justify-between hover:border-accent-lime/60 hover:text-accent-lime text-content-primary transition-all group min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-accent-cyan" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-muted group-hover:text-accent-lime transition-colors" />
                </a>

                {/* WhatsApp Direct Messaging Channel */}
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Message Habib-ur-Rehman on WhatsApp at ${profile.whatsapp}`}
                  className="sm:col-span-2 p-3 rounded-xl border border-hairline bg-base flex items-center justify-between hover:border-accent-lime/60 hover:text-accent-lime text-content-primary transition-all group min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg border border-accent-lime/30 bg-accent-lime/10 text-accent-lime">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">WhatsApp</span>
                        <span className="text-[10px] text-accent-lime font-mono bg-accent-lime/10 px-1.5 py-0.2 rounded">
                          DIRECT
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-content-muted">
                        {profile.whatsapp}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-accent-lime transition-colors" />
                </a>
              </div>

              <div className="pt-3 border-t border-hairline/60 flex items-center justify-between text-content-secondary">
                <span className="text-content-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                  {contactContent.locationLabel}
                </span>
                <span className="text-content-primary font-medium">{profile.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Simple Contact Form UI (opens prefilled mailto) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealVariants}
            className="lg:col-span-7"
          >
            <div className="console-card rounded-2xl p-6 sm:p-8 border border-hairline bg-surface/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-content-primary font-semibold">
                  <Terminal className="w-4 h-4 text-accent-lime" />
                  <span>TRANSMISSION_DISPATCH_CONSOLE</span>
                </div>
                <span className="text-[10px] text-content-muted bg-base px-2 py-0.5 rounded border border-hairline">
                  DIRECT_CLIENT_TRIGGER
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Validation Error Banner */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {isSuccess && (
                  <div
                    role="status"
                    className="p-3 rounded-lg border border-accent-lime/40 bg-accent-lime/10 text-accent-lime font-mono text-xs flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Opening mail client with prefilled transmission...</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-content-secondary mb-1.5"
                    >
                      {contactContent.form.nameLabel} <span className="text-accent-lime">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={contactContent.form.namePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-base text-content-primary placeholder:text-content-muted text-sm font-mono focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-content-secondary mb-1.5"
                    >
                      {contactContent.form.emailLabel} <span className="text-accent-lime">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder={contactContent.form.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-base text-content-primary placeholder:text-content-muted text-sm font-mono focus:border-accent-lime focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-content-secondary mb-1.5"
                  >
                    {contactContent.form.messageLabel} <span className="text-accent-lime">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={contactContent.form.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-base text-content-primary placeholder:text-content-muted text-sm font-mono focus:border-accent-lime focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-accent-lime text-white dark:text-[#0B0D12] font-semibold text-sm font-mono hover:bg-accent-lime-hover shadow-lime-glow flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactContent.form.submitButton}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
