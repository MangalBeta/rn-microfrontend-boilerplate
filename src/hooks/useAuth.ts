import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { login, logout, signup, AuthState } from '@store/slices/authSlice';
import { User } from '@types/microfrontend';

interface UseAuthReturn extends AuthState {
  isAuthenticated: boolean;
  loginUser: (credentials: any) => Promise<void>;
  logoutUser: () => Promise<void>;
  signupUser: (credentials: any) => Promise<void>;
  user: User | null;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const isAuthenticated = !!authState.user && !!authState.token;

  const loginUser = async (credentials: any) => {
    await dispatch(login(credentials)).unwrap();
  };

  const logoutUser = async () => {
    await dispatch(logout()).unwrap();
  };

  const signupUser = async (credentials: any) => {
    await dispatch(signup(credentials)).unwrap();
  };

  return {
    ...authState,
    isAuthenticated,
    loginUser,
    logoutUser,
    signupUser,
    user: authState.user,
  };
};

export default useAuth;

