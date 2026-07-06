import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { SigningOptions } from "node:crypto";
import config from "../config";

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret, {
        expiresIn
    } as SignOptions)
    return token
}
const veryfyToken = async (token: string, secret: string) => {

    try {
        const veryfyedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: veryfyedToken
        }
    } catch (error: any) {
        return {
            success:false,
            error: error.message
        }
    }
}
export const jwtUtils = {
    createToken,
    veryfyToken
}