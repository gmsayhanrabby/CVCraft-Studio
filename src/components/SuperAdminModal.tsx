import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  Users, 
  Settings, 
  Activity, 
  Database, 
  LogOut, 
  Check, 
  Sparkles, 
  Save, 
  Bell, 
  RefreshCw,
  Download,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { AuthUser, AdminSettings } from '../types/auth';
import { 
  getStoredUsers, 
  getAdminSettings, 
  saveAdminSettings,
  saveStoredUsers
} from '../utils/authService';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: AppLanguage;
  currentUser: AuthUser;
  onLogout: () => void;
  onRefreshData?: () => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  onLogout,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings' | 'system'>('overview');
  const [users, setUsers] = useState<AuthUser[]>(() => getStoredUsers());
  const [settings, setSettings] = useState<AdminSettings>(() => getAdminSettings());
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    saveAdminSettings(settings);
    setSaveAlert(lang === 'bn' ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Settings updated successfully!');
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleExportBackup = () => {
    const backupData = {
      system: 'CVCraft Studio',
      exportedAt: new Date().toISOString(),
      superAdmin: currentUser.email,
      users: users,
      settings: settings,
      activeCvData: localStorage.getItem('cvcraft_user_clean_v3'),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cvcraft_admin_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearNonAdmins = () => {
    if (confirm(lang === 'bn' ? 'আপনি কি অন্যান্য সাধারণ একাউন্টগুলো মুছে ফেলতে চান?' : 'Clear all non-admin registered user accounts?')) {
      const superAdminOnly = users.filter((u) => u.role === 'super_admin');
      saveStoredUsers(superAdminOnly);
      setUsers(superAdminOnly);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>{t.adminDashboard}</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {currentUser.role === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUser.name} • <span className="text-amber-400 font-mono">{currentUser.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সারাংশ ও অবস্থা' : 'Overview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'users'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ইউজার তালিকা' : 'Registered Users'} ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সিস্টেম সেটিংস' : 'System Settings'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'system'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ডাটা ব্যাকআপ' : 'Backup & Data'}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {saveAlert && (
            <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveAlert}</span>
            </div>
          )}

          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400">Total Users</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{users.length}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Active accounts</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400">Super Admin</div>
                  <div className="text-sm font-bold text-emerald-400 mt-2 truncate">
                    {currentUser.name || currentUser.username || 'Authorized'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Full privilege</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400">System Status</div>
                  <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Operational</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Vercel & Local Sync</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400">ATS Engine</div>
                  <div className="text-sm font-bold text-amber-400 mt-2">Active v3.0</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Europass & Global</div>
                </div>
              </div>

              {/* Verified Super Admin Badge Details */}
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'সুপার অ্যাডমিন পরিচয় নিশ্চিত' : 'Super Admin Identity Verified'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-mono">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500">Email: </span>
                    <span className="text-white font-bold">{currentUser.email}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500">Role: </span>
                    <span className="text-amber-400 font-bold">SUPER_ADMIN (Master Access)</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500">Auth Method: </span>
                    <span className="text-slate-200 capitalize">{currentUser.loginMethod}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500">Developer WhatsApp: </span>
                    <span className="text-emerald-400 font-bold">+8801634092772</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. USERS TAB */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Registered Accounts</h4>
                  <p className="text-xs text-slate-400">Users who have signed in on this platform.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearNonAdmins}
                  className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded-xl text-xs font-semibold"
                >
                  Clear Non-Admins
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 divide-y divide-slate-800/60 overflow-hidden">
                {users.map((u) => (
                  <div key={u.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-400 border border-slate-700">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{u.name}</span>
                          {u.role === 'super_admin' && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Crown className="w-2.5 h-2.5" />
                              <span>Super Admin</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-500 font-mono">
                      <span>Method: {u.loginMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Bell className="w-4 h-4" />
                  <span>Site Announcement Banner</span>
                </h4>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcement.enabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        announcement: { ...settings.announcement, enabled: e.target.checked },
                      })
                    }
                    className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                  />
                  <span>Show Announcement Banner at Top</span>
                </label>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Announcement Text (English)</label>
                  <input
                    type="text"
                    value={settings.announcement.message}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        announcement: { ...settings.announcement, message: e.target.value },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Announcement Text (Bengali)</label>
                  <input
                    type="text"
                    value={settings.announcement.messageBn}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        announcement: { ...settings.announcement, messageBn: e.target.value },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Feature Switches
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAtsAudit}
                      onChange={(e) => setSettings({ ...settings, enableAtsAudit: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                    />
                    <span>Enable ATS Compliance Audit Tool</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableCoverLetter}
                      onChange={(e) => setSettings({ ...settings, enableCoverLetter: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                    />
                    <span>Enable Cover Letter Generator Tool</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          )}

          {/* 4. SYSTEM & BACKUP */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="text-sm">🔥</span>
                    <span>Firebase Live Configuration</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Connected
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Project ID</span>
                    <span className="text-amber-300 font-bold">cvcraft-studio-330e6</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Auth Domain</span>
                    <span className="text-slate-200">cvcraft-studio-330e6.firebaseapp.com</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">App ID</span>
                    <span className="text-slate-300 truncate block">1:1037420311837:web:8e96d62daccd5347135df4</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Measurement ID</span>
                    <span className="text-emerald-300 font-bold">G-LHJL4WWEZ6</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full System Backup</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Export complete application state, user accounts, and local CV draft as a JSON backup file.
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON Backup</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
