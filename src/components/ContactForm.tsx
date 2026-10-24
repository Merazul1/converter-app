import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

// Allowed inquiry subjects whitelist
const ALLOWED_SUBJECTS = [
  'General Inquiry',
  'Exchange Rate Data / API',
  'Feature Suggestion',
  'Bug / Technical Issue',
  'Advertising & Sponsorship',
] as const;

type SubjectType = typeof ALLOWED_SUBJECTS[number];

// Security helper: strip dangerous HTML tags, attributes, and script injection payloads
function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: pseudo-protocol
    .replace(/data:/gi, '') // Strip data: URIs
    .replace(/vbscript:/gi, '') // Strip vbscript: URIs
    .replace(/on\w+\s*=/gi, '') // Strip event handlers like onclick=, onerror=
    .replace(/[<>]/g, '') // Neutralize residual angle brackets
    .trim();
}

// Validation rules
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ0-9\s'.-]{2,60}$/;
const URL_REGEX = /(https?:\/\/|www\.|\.com\b|\.org\b|\.net\b|\.io\b|\.ru\b|\.xyz\b)/gi;
const SUSPICIOUS_SPAM_PATTERNS = [
  /\bviagra\b/i,
  /\bcialis\b/i,
  /\bcasino\b/i,
  /\bpoker\b/i,
  /\bcrypto\s+investment\s+guarantee\b/i,
  /\bguaranteed\s+profit\b/i,
  /\bwhatsapp\s*\+\d+/i,
  /\btelegram\s*@/i,
  /\bseo\s+rank\s+guarantee\b/i,
];

const SUBMISSION_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown between submissions
const MIN_TIME_ON_PAGE_MS = 3500; // Bots submit in < 3.5 seconds

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry' as SubjectType,
    message: '',
    _honey: '', // Primary honeypot trap
    website_url: '', // Secondary deceptive honeypot trap
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [generalError, setGeneralError] = useState('');
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  // Time-on-page tracking to block instantaneous bot automation
  const mountTimeRef = useRef<number>(Date.now());

  // Check rate limit on mount
  useEffect(() => {
    mountTimeRef.current = Date.now();
    const lastSubmit = localStorage.getItem('currenflow_contact_last_sent');
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      if (elapsed < SUBMISSION_COOLDOWN_MS) {
        setCooldownRemaining(Math.ceil((SUBMISSION_COOLDOWN_MS - elapsed) / 1000));
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (generalError) setGeneralError('');
  };

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};

    // 1. Honeypot traps: if a bot populated either trap, silently pretend success
    if (formData._honey || formData.website_url) {
      return false; // Will trigger silent success in handleSubmit
    }

    // 2. Name validation
    const cleanName = sanitizeText(formData.name);
    if (!cleanName) {
      errors.name = 'Please enter your full name.';
    } else if (cleanName.length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    } else if (cleanName.length > 60) {
      errors.name = 'Name cannot exceed 60 characters.';
    } else if (!NAME_REGEX.test(cleanName)) {
      errors.name = 'Name contains invalid characters (letters, numbers, spaces and hyphens only).';
    } else if (URL_REGEX.test(cleanName)) {
      errors.name = 'URLs and links are not permitted in the Name field.';
    }

    // 3. Email validation
    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      errors.email = 'Please provide a valid email address.';
    } else if (cleanEmail.length > 100) {
      errors.email = 'Email address is too long (maximum 100 characters).';
    } else if (!EMAIL_REGEX.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    // 4. Subject whitelist validation
    if (!ALLOWED_SUBJECTS.includes(formData.subject)) {
      errors.subject = 'Please select a valid topic from the dropdown.';
    }

    // 5. Message validation
    const cleanMessage = sanitizeText(formData.message);
    if (!cleanMessage) {
      errors.message = 'Please provide details for your message.';
    } else if (cleanMessage.length < 15) {
      errors.message = `Message is too brief (${cleanMessage.length}/15 chars). Please provide more detail.`;
    } else if (cleanMessage.length > 2000) {
      errors.message = 'Message exceeds maximum length of 2,000 characters.';
    } else {
      // Link spam detection: limit to maximum 2 hyperlinks
      const linkMatches = cleanMessage.match(URL_REGEX);
      if (linkMatches && linkMatches.length > 2) {
        errors.message = 'For security and spam prevention, messages cannot contain more than 2 web links.';
      }

      // Check suspicious automated spam triggers
      for (const pattern of SUSPICIOUS_SPAM_PATTERNS) {
        if (pattern.test(cleanMessage)) {
          errors.message = 'Your message contains content flagged by our automated spam filters.';
          break;
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limit check
    if (cooldownRemaining > 0) {
      setGeneralError(`Please wait ${cooldownRemaining} seconds before sending another message.`);
      return;
    }

    // Honeypot bot trap triggered: silently succeed without sending spam
    if (formData._honey || formData.website_url) {
      setStatus('success');
      return;
    }

    // Time-on-page bot trap: humans take > 3.5 seconds to fill form
    const timeElapsed = Date.now() - mountTimeRef.current;
    if (timeElapsed < MIN_TIME_ON_PAGE_MS) {
      setStatus('error');
      setGeneralError('Submission occurred unusually quickly. Please wait a moment and try again.');
      return;
    }

    // Strict validation
    if (!validate()) {
      setStatus('error');
      setGeneralError('Please fix the highlighted errors before submitting.');
      return;
    }

    setStatus('submitting');
    setGeneralError('');

    // Sanitize all payload fields before network dispatch
    const sanitizedPayload = {
      name: sanitizeText(formData.name),
      email: formData.email.trim(),
      subject: formData.subject,
      message: sanitizeText(formData.message),
      _subject: `[CurrenFlow Contact] ${formData.subject} from ${sanitizeText(formData.name)}`,
      _captcha: 'false',
    };

    try {
      const response = await fetch(CONTACT_CONFIG.serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        localStorage.setItem('currenflow_contact_last_sent', Date.now().toString());
        setCooldownRemaining(60);
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
          _honey: '',
          website_url: '',
        });
        setFieldErrors({});
      } else {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setGeneralError(
        err instanceof Error
          ? err.message
          : `Could not send message. You can also email us directly at ${CONTACT_CONFIG.recipientEmail}.`
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 rounded-3xl bg-emerald-50/90 border border-emerald-200 text-center animate-fade-in">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">Message Delivered</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for contacting CurrenFlow. Your inquiry has passed security verification and been forwarded to our support engineers. We will reply to your email within 24-48 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            mountTimeRef.current = Date.now();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const charCount = formData.message.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Invisible Honeypot Trap 1: Standard Bot Trap */}
      <input
        type="text"
        name="_honey"
        value={formData._honey}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Invisible Honeypot Trap 2: Secondary deceptive field */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <label htmlFor="website_url">Leave this field blank</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={formData.website_url}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Top Banner Error Notification */}
      {generalError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-shake">
          <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
          <span className="font-medium">{generalError}</span>
        </div>
      )}

      {/* Rate Limiting Notice if Active */}
      {cooldownRemaining > 0 && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <Lock size={14} className="shrink-0 text-amber-600" />
          <span>Security rate limiter active: Wait <strong>{cooldownRemaining}s</strong> before next submission.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            maxLength={60}
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === 'submitting'}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 disabled:opacity-60 ${
              fieldErrors.name
                ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/20'
                : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
              <AlertCircle size={12} /> {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            maxLength={100}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === 'submitting'}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 disabled:opacity-60 ${
              fieldErrors.email
                ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/20'
                : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
              <AlertCircle size={12} /> {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Inquiry Topic Dropdown */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Inquiry Topic
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60"
        >
          {ALLOWED_SUBJECTS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        {fieldErrors.subject && (
          <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <AlertCircle size={12} /> {fieldErrors.subject}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Message <span className="text-rose-500">*</span>
          </label>
          <span className={`text-[11px] font-mono ${charCount > 1900 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
            {charCount}/2000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your inquiry, question, or exchange rate feedback with as much detail as possible..."
          disabled={status === 'submitting'}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 resize-none disabled:opacity-60 ${
            fieldErrors.message
              ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/20'
              : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <AlertCircle size={12} /> {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Submit Button & Security Reassurance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting' || cooldownRemaining > 0}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Verifying &amp; Sending...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Message</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
          <span>Anti-Spam &amp; XSS Protected</span>
        </div>
      </div>
    </form>
  );
};
