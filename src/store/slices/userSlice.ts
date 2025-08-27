import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User, UserPreferences} from '@types/microfrontend';
import {userService} from '@services/UserService';

// Types
interface UserState {
  profile: User | null;
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
}

// Initial state
const initialState: UserState = {
  profile: null,
  preferences: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const profile = await userService.getProfile(token);
      return profile;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: UpdateProfileData, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const updatedProfile = await userService.updateProfile(data, token);
      return updatedProfile;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (imageUri: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const avatarUrl = await userService.uploadAvatar(imageUri, token);
      return avatarUrl;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upload avatar');
    }
  },
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences: Partial<UserPreferences>, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      const updatedPreferences = await userService.updatePreferences(preferences, token);
      return updatedPreferences;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update preferences');
    }
  },
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async (password: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token');
      }
      
      await userService.deleteAccount(password, token);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete account');
    }
  },
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateLocalProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = {...state.profile, ...action.payload};
      }
    },
    updateLocalPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.preferences) {
        state.preferences = {...state.preferences, ...action.payload};
      }
    },
    clearUserData: state => {
      state.profile = null;
      state.preferences = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Upload Avatar
    builder
      .addCase(uploadAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile.avatar = action.payload;
        }
        state.error = null;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Preferences
    builder
      .addCase(updateUserPreferences.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preferences = action.payload;
        state.error = null;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Account
    builder
      .addCase(deleteUserAccount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, state => {
        state.isLoading = false;
        state.profile = null;
        state.preferences = null;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setLoading,
  updateLocalProfile,
  updateLocalPreferences,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;

