import React, { useEffect } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { Certification } from '../types';

interface CertificateModalProps {
  certificate: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F0] border border-[#EADBCE] rounded-2xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EADBCE] bg-[#FFFCF7]">
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: certificate.accentColor || '#E87524' }} 
            />
            <div>
              <h3 className="text-base font-bold text-[#2B211B] leading-tight">
                {certificate.title}
              </h3>
              <p className="text-xs text-[#6B3F25] font-medium">
                {certificate.issuer} • {certificate.date}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {certificate.imageUrl && (
              <>
                <a
                  href={certificate.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#746A61] hover:text-[#2B211B] hover:bg-[#F3EDE2] transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={certificate.imageUrl}
                  download
                  className="p-2 rounded-lg text-[#746A61] hover:text-[#2B211B] hover:bg-[#F3EDE2] transition-colors"
                  title="Download certificate image"
                >
                  <Download className="w-4 h-4" />
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#746A61] hover:text-[#2B211B] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Image View */}
        <div className="p-3 sm:p-5 bg-[#F5EFE6]/60 flex items-center justify-center max-h-[68vh] overflow-auto">
          {certificate.imageUrl ? (
            <div className="w-full flex items-center justify-center overflow-hidden rounded-xl border border-[#EADBCE] bg-white shadow-md">
              <img 
                src={certificate.imageUrl} 
                alt={certificate.title}
                className="w-full h-auto max-h-[64vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="p-12 text-center text-[#746A61]">
              No image preview available
            </div>
          )}
        </div>

        {/* Modal Info Footer */}
        <div className="px-5 py-3.5 border-t border-[#EADBCE] bg-[#FFFCF7] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            {certificate.credentialId && (
              <p className="font-mono text-[#52463C]">
                Credential ID: <span className="font-bold text-[#2B211B]">{certificate.credentialId}</span>
              </p>
            )}
            {certificate.skills && certificate.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {certificate.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#EADBCE] text-[10px] font-mono text-[#52463C]">
                    #{s}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E87524] hover:bg-[#D46517] text-white font-semibold shadow-xs transition-colors"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {certificate.imageUrl && (
              <a
                href={certificate.imageUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#2B211B] border border-[#EADBCE] font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#E87524]" />
                <span>Save</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
