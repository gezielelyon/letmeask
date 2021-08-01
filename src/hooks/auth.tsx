import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { firebase, auth } from "../services/firebase";

interface IUserProps {
  id: string;
  name: string;
  avatar: string;
}

interface IAuthContextData {
  user: IUserProps;
  signInWithGoogle(): Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((item) => {
      if (item) {
        const { displayName, photoURL, uid } = item;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      const results = await auth.signInWithPopup(provider);

      if (results.user) {
        const { displayName, photoURL, uid } = results.user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    } catch (err) {
      throw new Error("Error on sign in with Google");
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth must be used with AuthProvider");
  }

  return context;
}
