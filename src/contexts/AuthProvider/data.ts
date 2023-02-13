import { TokenData } from "../../util/auth"

export type AuthContextData = {
  authenticated: boolean,
  tokenData?: TokenData
}

const authData: AuthContextData = {
  authenticated: false
}

export default authData;
