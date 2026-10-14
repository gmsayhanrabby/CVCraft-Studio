export type UserRole = 'super_admin' | 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
  loginMethod: 'credentials' | 'google';
  createdAt: string;
  lastLogin: string;
}

export interface SystemAnnouncement {
  enabled: boolean;
  message: string;
  messageBn: string;
  type: 'info' | 'warning' | 'success';
}

export interface AdminSettings {
  allowUserRegistration: boolean;
  enableAtsAudit: boolean;
  enableCoverLetter: boolean;
  announcement: SystemAnnouncement;
}
