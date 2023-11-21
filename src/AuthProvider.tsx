import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    localStorage.setItem("isAuth", JSON.stringify(true));
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuth", JSON.stringify(false));
    setAuthenticated(false);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    isAuth && setAuthenticated(JSON.parse(isAuth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("isAuth")]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
