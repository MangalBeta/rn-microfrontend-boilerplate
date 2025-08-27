import {apiClient} from './ApiClient';
import {User} from '@types/microfrontend';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  rememberMe?: boolean;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post('/common/login', credentials);
    if (!response.success) {
      throw new Error(response.message || 'Login failed');
    }
    
    return response.data;
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/signup', credentials);
    
    if (!response.success) {
      throw new Error(response.message || 'Signup failed');
    }
    
    return response.data;
  }

  async logout(token: string): Promise<void> {
    const response = await apiClient.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      console.warn('Logout request failed:', response.message);
      // Don't throw error for logout, as we want to clear local data anyway
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Token refresh failed');
    }
    
    return response.data;
  }

  async getCurrentUser(token: string): Promise<User> {
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to get user info');
    }
    
    return response.data;
  }

  async changePassword(data: ChangePasswordData, token: string): Promise<void> {
    const response = await apiClient.post('/auth/change-password', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Password change failed');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiClient.post('/auth/forgot-password', {
      email,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Password reset failed');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiClient.post('/auth/verify-email', {
      token,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const response = await apiClient.post('/auth/resend-verification', {
      email,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to resend verification email');
    }
  }

  async enableTwoFactor(token: string): Promise<{secret: string; qrCode: string}> {
    const response = await apiClient.post('/auth/2fa/enable', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to enable two-factor authentication');
    }
    
    return response.data;
  }

  async verifyTwoFactor(token: string, code: string): Promise<void> {
    const response = await apiClient.post('/auth/2fa/verify', {
      code,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Two-factor verification failed');
    }
  }

  async disableTwoFactor(token: string, code: string): Promise<void> {
    const response = await apiClient.post('/auth/2fa/disable', {
      code,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to disable two-factor authentication');
    }
  }

  async getBackupCodes(token: string): Promise<string[]> {
    const response = await apiClient.get('/auth/2fa/backup-codes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to get backup codes');
    }
    
    return response.data;
  }

  async regenerateBackupCodes(token: string): Promise<string[]> {
    const response = await apiClient.post('/auth/2fa/regenerate-backup-codes', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to regenerate backup codes');
    }
    
    return response.data;
  }

  async deleteAccount(password: string, token: string): Promise<void> {
    const response = await apiClient.delete('/auth/account', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password,
      },
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete account');
    }
  }
}

export const authService = new AuthService();
export default authService;

