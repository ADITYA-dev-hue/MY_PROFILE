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
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

const workspaceImg = '/workspace.jpg';

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
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
          colors: [theme.primary, theme.secondary, '#ffffff']
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 600);
  };

  return (
    <section 
      id="contact"
      className="py-16 sm:py-24 bg-[#FAF7F0] text-[#2B211B] border-b border-[#EADBCE] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Let's Work Together & Contact Details (Span 6) */}
          <ScrollReveal delay={0.05} distance={28} className="lg:col-span-6">
            <div className="space-y-6 text-left">
            
            <div className="space-y-3">
              <span className="eyebrow-label text-[#E87524] block mb-1">
                GET IN TOUCH
              </span>
              <h2 className="section-h2 text-[#2B211B]">
                LET'S WORK<br />
                <span className="text-[#E87524]">TOGETHER</span>{' '}
                <span className="text-3xl font-serif text-[#E87524]">✦</span>
              </h2>

              <p className="body-editorial text-sm leading-relaxed max-w-md">
                I'm actively seeking AI-Accelerated Full-Stack Data Developer opportunities across AI Engineering, Data Analytics, and Full-Stack Development. Let's connect.
              </p>

              {/* Pill Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Placement%20Interview%20-%20Aditya%20Prakash`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all bg-[#FFFCF7] text-[#E87524] border-[#EADBCE] hover:bg-[#F3EDE2] shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#E87524]" />
                  <span>AVAILABLE FOR INTERNSHIPS &amp; PLACEMENTS</span>
                </a>
              </div>
            </div>

            {/* Contact Items List */}
            <div className="space-y-3.5 pt-4 border-t border-[#EADBCE]">
              
              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#EADBCE] bg-[#FFFCF7] flex items-center justify-center text-[#6B3F25] shadow-xs shrink-0">
                    <Mail className="w-4 h-4 text-[#6B3F25]" />
                  </div>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-xs font-semibold text-[#2B211B] hover:text-[#E87524] transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] font-mono text-[#746A61] hover:text-[#2B211B] flex items-center gap-1 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#EADBCE] bg-[#FFFCF7] flex items-center justify-center text-[#6B3F25] shadow-xs shrink-0">
                    <Phone className="w-4 h-4 text-[#6B3F25]" />
                  </div>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`} 
                    className="text-xs font-semibold text-[#2B211B] hover:text-[#E87524] transition-colors font-mono"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="text-[10px] font-mono text-[#746A61] hover:text-[#2B211B] flex items-center gap-1 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location (LPU & Kapurthala) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#EADBCE] bg-[#FFFCF7] flex items-center justify-center text-[#6B3F25] shadow-xs shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#6B3F25]" />
                </div>
                <div className="text-xs text-left">
                  <div className="font-semibold text-[#2B211B]">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-[11px] text-[#746A61] leading-snug pt-0.5">
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
                className="inline-flex items-center gap-1.5 text-xs text-[#6B3F25] hover:text-[#E87524] transition-colors font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#6B3F25] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span>Vercel / aditya-prakashs-projects</span>
              </a>
              <span className="text-[#EADBCE]">•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#6B3F25] hover:text-[#E87524] transition-colors font-semibold"
              >
                <Linkedin className="w-4 h-4 text-[#E87524]" />
                <span>LinkedIn / {PERSONAL_INFO.linkedinDisplay}</span>
              </a>
              <span className="text-[#EADBCE]">•</span>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#6B3F25] hover:text-[#E87524] transition-colors font-semibold"
              >
                <SkillLogo name="leetcode" className="w-4 h-4" />
                <span>LeetCode / x2gyI6JfIR</span>
              </a>
              <span className="text-[#EADBCE]">•</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#6B3F25] hover:text-[#E87524] transition-colors font-semibold"
              >
                <Github className="w-4 h-4 text-[#6B3F25]" />
                <span>GitHub / ADITYA-dev-hue</span>
              </a>
            </div>

            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Laptop Mockup Graphic & Fast Form (Span 6) */}
          <ScrollReveal delay={0.2} distance={28} className="lg:col-span-6">
            <div className="space-y-6">
            
            {/* Workstation Laptop Image */}
            <div className="relative rounded-xl overflow-hidden border border-[#EADBCE] bg-[#FFFCF7] shadow-xs">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B211B]/80 via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <span className="font-bold text-[#FFFCF7] uppercase tracking-wider text-[11px] drop-shadow-xs">
                  ADITYA PRAKASH WORKSPACE
                </span>
                <span className="font-mono text-[10px] text-[#FFFCF7]/90">
                  LPU CSE • Batch 2024–2028
                </span>
              </div>
            </div>

            {/* Fast-Loading Message Form */}
            <div className="warm-card p-5 sm:p-6 text-left">
              {status === 'success' ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-[#E87524]" />
                  <h3 className="card-h3 text-sm text-[#2B211B] uppercase tracking-wider">
                    Message Sent to Aditya!
                  </h3>
                  <p className="body-editorial text-xs text-[#746A61]">
                    Thank you, {formData.name}. Aditya will respond directly at {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', roleOrCompany: '', message: '' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-xs font-semibold text-[#2B211B] hover:bg-[#F3EDE2]"
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
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-[#2B211B] text-xs placeholder:text-[#746A61] focus:outline-none focus:border-[#E87524] transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-[#2B211B] text-xs placeholder:text-[#746A61] focus:outline-none focus:border-[#E87524] transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="roleOrCompany"
                    placeholder="Company / Hiring Role (e.g. AI / Full-Stack Data Developer)"
                    value={formData.roleOrCompany}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-[#2B211B] text-xs placeholder:text-[#746A61] focus:outline-none focus:border-[#E87524] transition-colors"
                  />

                  <textarea
                    name="message"
                    required
                    rows={2}
                    placeholder="Brief message or interview invitation..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-[#2B211B] text-xs placeholder:text-[#746A61] focus:outline-none focus:border-[#E87524] transition-colors resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-2.5 px-4 rounded-lg text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 bg-[#E87524] hover:bg-[#D06316] shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === 'submitting' ? 'Transmitting...' : 'Send Direct Message'}</span>
                  </button>
                </form>
              )}
            </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
