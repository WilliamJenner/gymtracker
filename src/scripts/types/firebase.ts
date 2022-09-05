export interface User {
  apiKey: string;
  appName: string;
  authDomain: string;
  createdAt: string;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  multiFactor: MultiFactor;
  phoneNumber?: string;
  photoURL?: string;
  providerData?: ProviderDataEntity[];
  redirectEventId?: string;
  stsTokenManager: StsTokenManager;
  tenantId?: string;
  uid: string;
}

export interface MultiFactor {
  enrolledFactors?: string[] | string;
}

export interface ProviderDataEntity {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
}

export interface StsTokenManager {
  accessToken: string;
  apiKey: string;
  expirationTime: number;
  refreshToken: string;
}

export type FirestoreCollection = "users";
