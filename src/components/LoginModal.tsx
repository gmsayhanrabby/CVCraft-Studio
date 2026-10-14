import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  UserCheck,
  Flame,
  Globe
} from 'lucide-react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { AuthUser } from '../types/auth';
import { 
  authenticateWithCredentials, 
  loginWithFirebaseGoogle 
} from '../utils/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: AppLanguage;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
}) => {
  const t = TRANSLATIONS[lang];

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে ইউজারনেম বা ইমেইল লিখুন।' : 'Please enter your username or email address.');
      return;
    }
    if (!password) {
      setErrorMsg(lang === 'bn' ? 'পাসওয়ার্ড প্রদান করুন।' : 'Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authenticateWithCredentials(identifier, password);
      setIsSubmitting(false);

      if (res.success && res.user) {
        setSuccessMsg(
          res.user.role === 'super_admin'
            ? (lang === 'bn' ? 'সুপার অ্যাডমিন হিসেবে সফলভাবে লগইন হয়েছে!' : 'Logged in as Super Admin!')
            : t.loginSuccess
        );
        setTimeout(() => {
          onLoginSuccess(res.user!);
          onClose();
        }, 500);
      } else {
        setErrorMsg(res.message || t.loginFailed);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Login error occurred');
    }
  };

  // Real Firebase Google Sign-In with popup
  const handleFirebaseGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await loginWithFirebaseGoogle();
      setIsSubmitting(false);

      if (result.success && result.user) {
        const isSuper = result.user.role === 'super_admin';
        setSuccessMsg(
          isSuper
            ? (lang === 'bn' ? 'গুগল লগইন সফল! (সুপার অ্যাডমিন এক্সেস)' : 'Google Login Verified as Super Admin!')
            : (lang === 'bn' ? 'গুগল সাইন ইন সফল!' : 'Firebase Google Sign In Successful!')
        );
        setTimeout(() => {
          onLoginSuccess(result.user!);
          onClose();
        }, 500);
      } else {
        const errorDetail = result.error || 'Firebase popup cancelled or blocked.';
        console.warn('Firebase popup issue:', errorDetail);
        setErrorMsg(
          lang === 'bn'
            ? `অথেন্টিকেশন সতর্কতা: ${errorDetail}`
            : `Authentication: ${errorDetail}`
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Firebase login error');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-6 border-b border-slate-800 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  {t.systemArchitecture}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Secure Access
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {t.loginPortalTitle}
              </h3>
            </div>
          </div>

          {/* Firebase connected badge */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[11px] font-mono">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Firebase Authentication Engine</span>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Feedback messages */}
          {errorMsg && (
            <div className="flex items-start gap-2 p-3 bg-rose-950/50 border border-rose-700/50 rounded-xl text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                {errorMsg}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Google Login Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleFirebaseGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              {/* Official Google G Logo SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{lang === 'bn' ? 'গুগল দিয়ে লগইন করুন' : 'Continue with Google'}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider absolute">
              {t.orUseEmail}
            </span>
          </div>

          {/* 2. Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.usernameOrEmail}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার ইউজারনেম বা ইমেইল' : 'name@example.com'}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
                />
                <span className="text-[11px]">{t.rememberMe}</span>
              </label>

              <span className="text-[11px] text-slate-500 inline-flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>SSL Encrypted</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{t.signIn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/80 p-3.5 sm:p-4 border-t border-slate-800/80 text-center text-[11px] text-slate-400 shrink-0">
          <span>{lang === 'bn' ? 'সহায়তা ও যোগাযোগ:' : 'Support & Inquiries:'} </span>
          <a
            href="https://wa.me/8801634092772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-bold hover:underline"
          >
            Sayhan Rabby (+8801634092772)
          </a>
        </div>
      </div>
    </div>
  );
};
