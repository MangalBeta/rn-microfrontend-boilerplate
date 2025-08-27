import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@types/microfrontend';
import {authService} from '@services/AuthService';
import {storageService} from '@services/StorageService';

// Types
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  biometricEnabled: boolean;
  rememberMe: boolean;
}

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

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  biometricEnabled: false,
  rememberMe: false,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, {rejectWithValue}) => {
    try {
      const response = await authService.login(credentials);
      if(response?.data?.accessToken){
      // Store tokens
      await storageService.setSecureItem('accessToken', response?.data?.accessToken);
      await storageService.setSecureItem('refreshToken', response?.data?.accessToken);
       if (credentials.rememberMe) {
        await storageService.setItem('rememberMe', 'true');
      }
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials, {rejectWithValue}) => {
    try {
      const response = await authService.signup(credentials);
      
      // Store tokens
      await storageService.setSecureItem('accessToken', response.token);
      await storageService.setSecureItem('refreshToken', response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as {auth: AuthState};
      
      if (state.auth.token) {
        await authService.logout(state.auth.token);
      }
      
      // Clear stored tokens
      await storageService.removeSecureItem('accessToken');
      await storageService.removeSecureItem('refreshToken');
      await storageService.removeItem('rememberMe');
      
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as {auth: AuthState};
      
      if (!state.auth.refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await authService.refreshToken(state.auth.refreshToken);
      
      // Store new tokens
      await storageService.setSecureItem('accessToken', response.token);
      await storageService.setSecureItem('refreshToken', response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: ChangePasswordData, {getState, rejectWithValue}) => {
    try {
      const state = getState() as {auth: AuthState};
      
      if (!state.auth.token) {
        throw new Error('Not authenticated');
      }
      
      await authService.changePassword(data, state.auth.token);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password change failed');
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, {rejectWithValue}) => {
    try {
      await authService.forgotPassword(email);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    {token, password}: {token: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      await authService.resetPassword(token, password);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset failed');
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, {rejectWithValue}) => {
    try {
      const token = await storageService.getSecureItem('accessToken');
      const refreshTokenValue = await storageService.getSecureItem('refreshToken');
      const rememberMe = await storageService.getItem('rememberMe');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const user = await authService.getCurrentUser(token);
      
      return {
        user,
        token,
        refreshToken: refreshTokenValue,
        rememberMe: rememberMe === 'true',
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Auth check failed');
    }
  },
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.rememberMe = action.payload.rememberMe || false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Signup
    builder
      .addCase(signup.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.rememberMe = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Check Auth Status
    builder
      .addCase(checkAuthStatus.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.rememberMe = action.payload.rememberMe;
      })
      .addCase(checkAuthStatus.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const {clearError, setLoading, setBiometricEnabled, updateUser} =
  authSlice.actions;

export default authSlice.reducer;

