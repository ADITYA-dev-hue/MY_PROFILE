import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Check, 
  Copy, 
  ExternalLink, 
  Terminal, 
  Server, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, VERCEL_DOMAIN_CONFIG } from '../data/portfolioData';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div 
      id="vercel-deploy-guide-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-vercel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-black text-white dark:bg-white dark:text-black font-mono font-bold text-xs">
              ▲
            </div>
            <div>
              <h2 id="modal-vercel-title" className="text-base font-bold text-slate-900 dark:text-white">
                Vercel Hosting & Custom Domain Deployment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target Domain: <strong>{PERSONAL_INFO.customDomain}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Status Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                Production-Ready Static SPA Architecture
              </div>
              <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                This portfolio is compiled with Vite + React 19 and Tailwind CSS v4, perfectly configured for 1-click deployment on Vercel with automated SSL/TLS certificates and global Edge CDN routing.
              </p>
            </div>
          </div>

          {/* DNS Configuration Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>Step 1: DNS Records for Custom Domain ({PERSONAL_INFO.customDomain})</span>
            </h3>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Name / Host</th>
                    <th className="p-3">Value / Target</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">A Record</td>
                    <td className="p-3">@ (apex)</td>
                    <td className="p-3 font-semibold">{VERCEL_DOMAIN_CONFIG.aRecord}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => copyToClipboard(VERCEL_DOMAIN_CONFIG.aRecord, 'a-record')}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        {copiedKey === 'a-record' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'a-record' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-blue-600 dark:text-blue-400">CNAME</td>
                    <td className="p-3">www</td>
                    <td className="p-3 font-semibold">{VERCEL_DOMAIN_CONFIG.cnameRecord}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => copyToClipboard(VERCEL_DOMAIN_CONFIG.cnameRecord, 'cname-record')}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        {copiedKey === 'cname-record' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'cname-record' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Vercel CLI Quick Command */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span>Step 2: Deploy from Terminal (or GitHub Integration)</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs flex items-center justify-between">
              <code>npx vercel --prod</code>
              <button
                onClick={() => copyToClipboard('npx vercel --prod', 'cli-cmd')}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                title="Copy command"
              >
                {copiedKey === 'cli-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step-by-Step Vercel Dashboard Guide */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 3: Automated Vercel Continuous Deployment
            </h3>
            <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {VERCEL_DOMAIN_CONFIG.deploySteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a
            href={PERSONAL_INFO.vercel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:underline"
          >
            <span>Open Aditya's Vercel Space</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
