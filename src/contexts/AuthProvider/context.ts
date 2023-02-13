import { createContext } from "react";
import authData, { AuthContextData } from "./data";

export type AuthContextType = {
  authContextData: AuthContextData,
  setAuthContextData: (authContextData: AuthContextData) => void
}

export const AuthContextTypeData: AuthContextType = {
  authContextData: authData,
  setAuthContextData: () => {}
}

const AuthContext = createContext<AuthContextType>(AuthContextTypeData);

export default AuthContext;
