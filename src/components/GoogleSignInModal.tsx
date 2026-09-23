import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ArrowRight, Check, Shield, User } from 'lucide-react';
import { CapEmblem } from './CapEmblem';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle } = useAuth();
  const [isCustomAccount, setIsCustomAccount] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleQuickLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithGoogle('jwilliam4421@gmail.com');
      setIsSubmitting(false);
      onClose();
      if (onSuccess) onSuccess();
    }, 400);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const name = customName.trim();
      loginWithGoogle(customEmail.trim(), name || undefined);
      setIsSubmitting(false);
      onClose();
      if (onSuccess) onSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-slate-800 border border-slate-200 animate-scale-in">
        {/* Top Google Header Bar */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            {/* Google SVG G logo */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="text-slate-900 font-medium text-base tracking-tight font-sans">
              Sign in with Google
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <CapEmblem size={34} />
            <div>
              <div className="text-sm font-semibold text-slate-900 leading-tight">
                Civil Air Patrol Cadet Portal
              </div>
              <div className="text-xs text-slate-500">
                Choose an account to access your Cadet Dashboard
              </div>
            </div>
          </div>

          {!isCustomAccount ? (
            <div className="space-y-3">
              {/* Primary Detected Google Account Card */}
              <button
                onClick={handleQuickLogin}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#1a73e8] hover:bg-blue-50/40 transition text-left group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-blue-100">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-[#1a73e8] transition">
                      jwilliam4421@gmail.com
                    </div>
                    <div className="text-xs text-slate-500 font-normal">
                      Google Account
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1a73e8] transition group-hover:translate-x-0.5" />
                </div>
              </button>

              {/* Use another account option */}
              <button
                type="button"
                onClick={() => setIsCustomAccount(true)}
                className="w-full py-2.5 px-3 text-xs font-semibold text-[#1a73e8] hover:text-blue-800 hover:bg-blue-50/50 rounded-xl transition text-center flex items-center justify-center gap-1.5"
              >
                Use another Google account
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cadet Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCustomAccount(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Sign In with Google
                </button>
              </div>
            </form>
          )}

          {/* Privacy & CAP Security info */}
          <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
            <Shield className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              Civil Air Patrol Cadet Portal safely connects with your Google account. Your personnel record, achievements, and training hours remain private to your cadet account.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
