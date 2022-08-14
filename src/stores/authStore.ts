import create from "zustand";

let authTimeout: NodeJS.Timeout | null = null;

export const useAuthStore = create<{
  token: null | string;
  userId: null | string;
  authRedirectPath: string;
  authStateChecked: boolean;
  setAuthRedirectPath: (path: string) => void;
  authSuccess: (token: string, userId: string) => void;
  authLogout: () => void;
  authCheckState: () => void;
  checkAuthTimeout: (expirationTime: number) => void;
}>((set, get) => ({
  token: null,
  userId: null,
  authRedirectPath: "/",
  authStateChecked: false,
  setAuthRedirectPath: (path) => set({ authRedirectPath: path }),
  authSuccess: (token, userId) =>
    set({
      token: token,
      userId: userId,
    }),
  authLogout: () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expirationDate");
    window.localStorage.removeItem("userId");
    set({ token: null, userId: null })
  },
  authCheckState: () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      get().authLogout();
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate') || '');
      if (expirationDate <= new Date()) {
        get().authLogout();
      } else {
        const userId = localStorage.getItem('userId');
        get().authSuccess(token, userId ?? '');
        get().checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 100);
      }
    }
    set({authStateChecked: true});
  },
  checkAuthTimeout: (expirationTime: number) => {
    console.log({expirationTime});
    if (authTimeout != null) {
      clearTimeout(authTimeout)
    }
    authTimeout = setTimeout(() => {
      console.log("logout")
      get().authLogout();
    }, expirationTime * 1000);
  }
}));
