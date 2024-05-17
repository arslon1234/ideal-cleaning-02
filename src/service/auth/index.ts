import request from "../config";
import { Request } from "../../interfaces/auth";
const auth:Request = {
    sign_up: (data)=> request.post("/auth/register", data),
    auth_verify: (data)=> request.post("/auth/verify", data),
    sign_in: (data)=> request.post("/auth/login", data),
    forgot_password: (data)=> request.post("/auth/forgot-password", data),
    update_password: (data)=> request.post("/auth/verify-forgot-password", data),
}

export default auth