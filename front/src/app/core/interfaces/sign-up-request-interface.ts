export interface SignUpReq {
  name: string,
  lastName: string,
  email: string,
  password: string,
  repeatPassword: string,
  rol: Int16Array
}
