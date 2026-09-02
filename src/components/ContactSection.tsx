import React, { useState } from 'react';
import { 
  Mail, 
  Globe, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Github
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SkillLogo } from './SkillLogo';
import workspaceImg from '../assets/images/workspace_setup_laptop_1787149887786.jpg';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleOrCompany: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#dc2626', '#ef4444', '#f87171', '#ffffff']
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 600);
  };

  return (
    <section 
      id="contact"
      className="py-16 sm:py-24 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Let's Work Together & Contact Details (Span 6) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="space-y-3">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-zinc-950 dark:text-white font-bold leading-tight">
                LET'S WORK<br />
                <span className="text-red-600 dark:text-[#dc2626]">TOGETHER</span> <span className="text-red-600 dark:text-[#ef4444] text-3xl font-serif">✦</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                I'm actively seeking SDE internship and full-time entry-level opportunities across Software Engineering, Data Analytics, and AI. Let's connect.
              </p>

              {/* Red Pill Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Placement%20Interview%20-%20Aditya%20Prakash`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600 text-red-600 dark:text-[#ef4444] hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>AVAILABLE FOR INTERNSHIPS &amp; PLACEMENTS</span>
                </a>
              </div>
            </div>

            {/* Contact Items List */}
            <div className="space-y-3.5 pt-4 border-t border-zinc-200 dark:border-zinc-900">
              
              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shadow-sm shrink-0">
                    <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-[#ef4444] transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shadow-sm shrink-0">
                    <Phone className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`} 
                    className="text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-[#ef4444] transition-colors font-mono"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location (LPU & Kapurthala) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shadow-sm shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div className="text-xs text-left">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-snug pt-0.5">
                    {PERSONAL_INFO.detailedLocation}
                  </div>
                </div>
              </div>

            </div>

            {/* Social & Deployment Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span>Vercel / aditya-prakashs-projects</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-800">•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white transition-colors font-semibold"
              >
                <Linkedin className="w-4 h-4 text-red-600 dark:text-[#ef4444]" />
                <span>LinkedIn / {PERSONAL_INFO.linkedinDisplay}</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-800">•</span>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors font-semibold"
              >
                <SkillLogo name="leetcode" className="w-4 h-4" />
                <span>LeetCode / x2gyI6JfIR (94 Solved)</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-800">•</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub / ADITYA-dev-hue</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Laptop Mockup Graphic & Fast Form (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Workstation Laptop Image */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl dark:shadow-2xl">
              <img
                src={workspaceImg || '/workspace.jpg'}
                alt="Aditya Prakash Developer Setup"
                className="w-full h-44 sm:h-52 object-cover filter contrast-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/workspace.jpg') {
                    target.src = '/workspace.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] drop-shadow-sm">
                  ADITYA PRAKASH WORKSPACE
                </span>
                <span className="font-mono text-[10px] text-zinc-300">
                  LPU CSE • Batch 2024–2028
                </span>
              </div>
            </div>

            {/* Fast-Loading Message Form */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/90 text-left shadow-sm">
              {status === 'success' ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-red-600 dark:text-[#dc2626] mx-auto" />
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                    Message Sent to Aditya!
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Thank you, {formData.name}. Aditya will respond directly at {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', roleOrCompany: '', message: '' });
                    }}
                    className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    name="roleOrCompany"
                    placeholder="Company / Hiring Role (e.g. SDE-1 / Data Analyst)"
                    value={formData.roleOrCompany}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                  />

                  <textarea
                    name="message"
                    required
                    rows={2}
                    placeholder="Brief message or interview invitation..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-red-600 focus:outline-none resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-red-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === 'submitting' ? 'Transmitting...' : 'Send Direct Message'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
