import { AuthUser, AdminSettings } from '../types/auth';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut 
} from '../firebase';

const STORAGE_KEY_AUTH_USER = 'cvcraft_auth_user_v1';
const STORAGE_KEY_USERS = 'cvcraft_registered_users_v1';
const STORAGE_KEY_ADMIN_SETTINGS = 'cvcraft_admin_settings_v1';

export const SUPER_ADMIN_CREDENTIALS = {
  email: 'gmsayhanrabby@gmail.com',
  username: 'gmsayhanrabby',
  password: 'mycv786',
  name: 'G M Sayhan Rabby',
};

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  allowUserRegistration: true,
  enableAtsAudit: true,
  enableCoverLetter: true,
  announcement: {
    enabled: true,
    message: '🚀 CVCraft Studio 2026: Official High-Fidelity ATS & Regional CV Builder is Active.',
    messageBn: '🚀 সিভিক্রাফট স্টুডিও ২০২৬: আন্তর্জাতিক এটিএস ও রিজিওনাল সিভি বিল্ডার সক্রিয় রয়েছে।',
    type: 'success',
  },
};

// Initial seeded accounts
export const SEEDED_SUPER_ADMIN: AuthUser = {
  id: 'usr_super_admin_sayhan',
  email: SUPER_ADMIN_CREDENTIALS.email,
  username: SUPER_ADMIN_CREDENTIALS.username,
  name: SUPER_ADMIN_CREDENTIALS.name,
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  loginMethod: 'credentials',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastLogin: new Date().toISOString(),
};

export const getStoredUsers = (): AuthUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch (e) {
    console.warn('Failed to parse stored users:', e);
  }
  return [SEEDED_SUPER_ADMIN];
};

export const saveStoredUsers = (users: AuthUser[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to save users:', e);
  }
};

export const getCurrentUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    if (raw) {
      return JSON.parse(raw) as AuthUser;
    }
  } catch (e) {
    console.warn('Failed to parse current auth user:', e);
  }
  return null;
};

export const setCurrentUserSession = (user: AuthUser | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    }
  } catch (e) {
    console.warn('Failed to update session:', e);
  }
};

export const getAdminSettings = (): AdminSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_SETTINGS);
    if (raw) {
      return { ...DEFAULT_ADMIN_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('Failed to parse admin settings:', e);
  }
  return DEFAULT_ADMIN_SETTINGS;
};

export const saveAdminSettings = (settings: AdminSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save admin settings:', e);
  }
};

/**
 * Authenticate with Username/Email and Password
 * Supports both Super Admin predefined credentials and Firebase Auth / local storage
 */
export const authenticateWithCredentials = async (
  identifier: string,
  pass: string
): Promise<{ success: boolean; user?: AuthUser; message?: string }> => {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = pass.trim();

  // 1. Direct Super Admin Credential check
  const isSuperAdminId =
    cleanId === SUPER_ADMIN_CREDENTIALS.email.toLowerCase() ||
    cleanId === SUPER_ADMIN_CREDENTIALS.username.toLowerCase() ||
    cleanId === 'admin';

  if (isSuperAdminId) {
    if (cleanPass === SUPER_ADMIN_CREDENTIALS.password) {
      const superAdminUser: AuthUser = {
        ...SEEDED_SUPER_ADMIN,
        lastLogin: new Date().toISOString(),
        loginMethod: 'credentials',
      };
      setCurrentUserSession(superAdminUser);
      return { success: true, user: superAdminUser };
    } else {
      return { success: false, message: 'Invalid username/email or password.' };
    }
  }

  // 2. Try Firebase Email/Password Auth if cleanId is an email
  if (cleanId.includes('@')) {
    try {
      const fbRes = await signInWithEmailAndPassword(auth, cleanId, cleanPass);
      const isSuper = fbRes.user.email?.toLowerCase() === SUPER_ADMIN_CREDENTIALS.email.toLowerCase();
      const fbUser: AuthUser = {
        id: fbRes.user.uid,
        email: fbRes.user.email || cleanId,
        username: cleanId.split('@')[0],
        name: fbRes.user.displayName || cleanId.split('@')[0],
        role: isSuper ? 'super_admin' : 'user',
        avatar: fbRes.user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanId)}`,
        loginMethod: 'credentials',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setCurrentUserSession(fbUser);
      return { success: true, user: fbUser };
    } catch (fbErr: any) {
      console.debug('Firebase direct email login attempt:', fbErr?.code || fbErr?.message);
      // Fall through to local demo store if Firebase returns user-not-found or invalid-credential
    }
  }

  // 3. Check locally stored users
  const users = getStoredUsers();
  const existing = users.find(
    (u) =>
      u.email.toLowerCase() === cleanId ||
      u.username.toLowerCase() === cleanId
  );

  if (existing) {
    const storedPassKey = `cvcraft_pwd_${existing.id}`;
    const storedPass = localStorage.getItem(storedPassKey) || '123456';
    if (cleanPass === storedPass) {
      const updatedUser = { ...existing, lastLogin: new Date().toISOString(), loginMethod: 'credentials' as const };
      setCurrentUserSession(updatedUser);
      return { success: true, user: updatedUser };
    } else {
      return { success: false, message: 'Incorrect password.' };
    }
  }

  // 4. Auto-register if new user provides email and password
  if (cleanId.includes('@') && cleanPass.length >= 4) {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      email: cleanId,
      username: cleanId.split('@')[0],
      name: cleanId.split('@')[0].charAt(0).toUpperCase() + cleanId.split('@')[0].slice(1),
      role: 'user',
      loginMethod: 'credentials',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    try {
      localStorage.setItem(`cvcraft_pwd_${newUser.id}`, cleanPass);
    } catch (e) {
      // ignore
    }
    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);
    setCurrentUserSession(newUser);
    return { success: true, user: newUser };
  }

  return { success: false, message: 'User not found. Enter valid email and password to create an account.' };
};

/**
 * Real Firebase Google Sign-In with popup
 * Prompts Google account selection, and detects if the signed-in user is Super Admin
 */
export const loginWithFirebaseGoogle = async (): Promise<{
  success: boolean;
  user?: AuthUser;
  error?: string;
  isFirebasePopupError?: boolean;
}> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    const email = (fbUser.email || '').trim().toLowerCase();
    const isSuperAdmin = email === SUPER_ADMIN_CREDENTIALS.email.toLowerCase();

    const user: AuthUser = {
      id: fbUser.uid || (isSuperAdmin ? 'usr_super_admin_sayhan' : `usr_google_${Date.now()}`),
      email: email,
      username: email ? email.split('@')[0] : 'google_user',
      name: fbUser.displayName || (isSuperAdmin ? SUPER_ADMIN_CREDENTIALS.name : 'Google User'),
      role: isSuperAdmin ? 'super_admin' : 'user',
      avatar: fbUser.photoURL || (isSuperAdmin ? SEEDED_SUPER_ADMIN.avatar : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email || 'user')}`),
      loginMethod: 'google',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const users = getStoredUsers();
    if (!users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
      saveStoredUsers([...users, user]);
    }

    setCurrentUserSession(user);
    return { success: true, user };
  } catch (err: any) {
    console.error('Firebase Google Auth error:', err);
    const errorCode = err?.code || '';
    const errorMsg = err?.message || 'Firebase Google Sign-In failed';
    return { 
      success: false, 
      error: `${errorCode ? `[${errorCode}] ` : ''}${errorMsg}`,
      isFirebasePopupError: errorCode === 'auth/popup-blocked' || errorCode === 'auth/unauthorized-domain' || errorCode === 'auth/popup-closed-by-user' || errorCode.includes('unauthorized')
    };
  }
};

/**
 * Fast / Simulated Google sign-in (ideal for quick Super Admin verification or fallback when popup is blocked)
 */
export const authenticateWithGoogle = (
  googleEmail?: string,
  googleName?: string,
  googleAvatar?: string
): { success: boolean; user: AuthUser } => {
  const email = (googleEmail || SUPER_ADMIN_CREDENTIALS.email).trim().toLowerCase();
  const isSuperAdmin = email === SUPER_ADMIN_CREDENTIALS.email.toLowerCase();

  const user: AuthUser = {
    id: isSuperAdmin ? 'usr_super_admin_sayhan' : `usr_google_${Date.now()}`,
    email: email,
    username: email.split('@')[0],
    name: googleName || (isSuperAdmin ? SUPER_ADMIN_CREDENTIALS.name : email.split('@')[0]),
    role: isSuperAdmin ? 'super_admin' : 'user',
    avatar: googleAvatar || (isSuperAdmin ? SEEDED_SUPER_ADMIN.avatar : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`),
    loginMethod: 'google',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  const users = getStoredUsers();
  if (!users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    saveStoredUsers([...users, user]);
  }

  setCurrentUserSession(user);
  return { success: true, user };
};

export const logoutAuthUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    // ignore
  }
  setCurrentUserSession(null);
};
