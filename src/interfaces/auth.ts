export interface ForgotPassword{
    email: string
}
export interface SignIn extends ForgotPassword {
    password: string
}
export interface UpdatePassword {
    code: string,
    new_password: string,
    email?: string
}
export interface SignUp extends SignIn {
    full_name: string,
    phone_number: string
}

export interface AuthVerify {
    code: string,
    email: string
}
export interface Request {
    sign_up:(data:SignUp)=>any,
    auth_verify:(data:AuthVerify)=>any,
    sign_in: (data: SignIn) => any,
    forgot_password: (data: ForgotPassword) => any,
    update_password: (data: UpdatePassword) => any,
}
