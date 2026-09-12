import React, { useState, useMemo } from 'react';
import { 
  Award, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  Maximize2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';
import { HoloCard } from './HoloCard';
import { ScrollReveal } from './ScrollReveal';
import { CertificateModal } from './CertificateModal';
import { useTheme } from '../context/ThemeContext';

export const CertificatesSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Categories for filtering
  const filterCategories = ['All', 'Artificial Intelligence', 'Web Development', 'Databases & Systems'];

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'All') return CERTIFICATIONS;
    if (activeFilter === 'Artificial Intelligence') {
      return CERTIFICATIONS.filter(c => 
        c.type === 'coursera-google' || 
        c.title.toLowerCase().includes('ai') || 
        c.skills?.some(s => s.toLowerCase().includes('ai'))
      );
    }
    if (activeFilter === 'Web Development') {
      return CERTIFICATIONS.filter(c => 
        c.type === 'coursera-meta' || 
        c.title.toLowerCase().includes('front-end') || 
        c.skills?.some(s => s.toLowerCase().includes('frontend') || s.toLowerCase().includes('web'))
      );
    }
    if (activeFilter === 'Databases & Systems') {
      return CERTIFICATIONS.filter(c => 
        c.type === 'infosys' || 
        c.type === 'iamneo' || 
        c.type === 'bgtechvista' ||
        c.title.toLowerCase().includes('database') ||
        c.title.toLowerCase().includes('java') ||
        c.title.toLowerCase().includes('c++')
      );
    }
    return CERTIFICATIONS;
  }, [activeFilter]);

  return (
    <section 
      id="certificates"
      className="py-16 sm:py-24 bg-[#FAF7F0] text-[#2B211B] border-b border-[#EADBCE] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching ProjectsSection editorial layout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#EADBCE] gap-4">
          <div>
            <span className="eyebrow-label text-[#E87524] block mb-1">
              ACCREDITATIONS &amp; CREDENTIALS
            </span>
            <h2 className="section-h2 text-[#2B211B]">
              VERIFIED CERTIFICATIONS
            </h2>
            <p className="body-editorial text-sm mt-1 max-w-xl">
              Official professional credentials authorized by Google, Meta, Infosys, and NIIT validating practical industry competencies.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] border border-[#EADBCE] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#E87524]" />
              <span className="text-xs font-mono font-bold text-[#6B3F25]">
                {CERTIFICATIONS.length} Credentials Verified
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#E87524] text-white shadow-xs font-bold'
                  : 'bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#52463C] border border-[#EADBCE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {filteredCertificates.map((cert, idx) => {
            const num = `0${idx + 1}`;
            const isGoogleAi = cert.id === 'google-ai-data-analysis' || cert.id === 'google-ai';

            return (
              <ScrollReveal
                key={cert.id || cert.title}
                delay={idx * 0.1}
                distance={28}
                className="h-full"
              >
                <HoloCard
                  maxTilt={6}
                  depthPop={true}
                  className="w-full h-full cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                  id={`cert-card-${cert.id || idx}`}
                >
                  <div className="warm-card p-5 group flex flex-col justify-between h-full text-left">
                    <div>
                      {/* Certificate Visual Mockup Card */}
                      <div 
                        className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-lg overflow-hidden bg-[#F4EEE4] border border-[#EADBCE] transition-all p-3 flex flex-col justify-between mb-4 shadow-2xs group-hover:border-[#E87524]/60"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Certificate Image Preview as Background Layer */}
                        {cert.imageUrl ? (
                          <div className="absolute inset-0 z-0 overflow-hidden bg-white">
                            <img 
                              src={cert.imageUrl} 
                              alt={cert.title}
                              className="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            {/* Subtle gradient vignette to keep UI text readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B211B]/60 via-transparent to-black/30 pointer-events-none" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-[#FAF7F0] flex items-center justify-center">
                            <Award className="w-12 h-12 text-[#E87524]/40" />
                          </div>
                        )}

                        {/* Top Bar with 3D Depth */}
                        <div 
                          className="flex items-center justify-between z-10 transition-transform duration-300"
                          style={{ transform: 'translateZ(14px)' }}
                        >
                          <div className="p-1.5 rounded-md bg-[#FFFCF7]/95 backdrop-blur-xs border border-[#EADBCE] shadow-xs flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#E87524]" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2B211B]">
                              {cert.badge?.split(' ')[0] || 'VERIFIED'}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFCF7]/95 backdrop-blur-xs text-[#6B3F25] border border-[#EADBCE] shadow-xs">
                            {cert.date}
                          </span>
                        </div>

                        {/* Expand Inspect Icon */}
                        <div className="absolute top-3 right-3 p-1.5 rounded-md bg-[#FFFCF7]/90 text-[#2B211B] border border-[#EADBCE] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs z-20">
                          <Maximize2 className="w-3.5 h-3.5 text-[#E87524]" />
                        </div>

                        {/* Bottom Overlay Info on Thumbnail */}
                        <div 
                          className="z-10 space-y-1 transition-transform duration-300 mt-auto"
                          style={{ transform: 'translateZ(16px)' }}
                        >
                          <span className="text-white text-xs font-semibold px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs inline-block line-clamp-1">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Identity Block */}
                      <div className="flex items-start gap-3 pt-1">
                        <span className="font-serif text-3xl sm:text-4xl font-bold leading-none shrink-0 text-[#E87524]">
                          {num}
                        </span>

                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="card-h3 text-base text-[#2B211B] uppercase tracking-wide leading-snug group-hover:text-[#E87524] transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-xs text-[#52463C] font-medium flex items-center gap-1.5">
                            <span>{cert.issuer}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-[#6B3F25]">{cert.date}</span>
                          </p>
                        </div>
                      </div>

                      {/* Summary / Overview */}
                      {cert.overview && (
                        <p className="text-xs text-[#52463C] leading-relaxed mt-2.5 line-clamp-2">
                          {cert.overview}
                        </p>
                      )}

                      {/* Competency Skills Tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {cert.skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF7F0] text-[#52463C] border border-[#EADBCE]"
                            >
                              #{sk}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#E87524] font-bold border border-[#EADBCE]">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-5 pt-3 border-t border-[#EADBCE] flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B3F25] hover:text-[#E87524] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#E87524]" />
                        <span>Preview Certificate</span>
                      </button>

                      {cert.verificationUrl ? (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#E87524] hover:underline"
                          title="Verify credential authenticity"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-[#746A61] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#E87524]" />
                          Verified
                        </span>
                      )}
                    </div>

                  </div>
                </HoloCard>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
