import { ReactNode, useState } from "react"
import AuthContext from "./context"
import authData, { AuthContextData } from "./data";

type Props = {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  return (
    <AuthContext.Provider value={ {
      authContextData: authContextData,
      setAuthContextData
    } } >
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
