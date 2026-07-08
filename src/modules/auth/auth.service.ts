import prismaConfig from "../../../prisma.config";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import { error } from "node:console";
const loginUserIntoDB = async (payload: ILoginUser) => {
    const { email, password } = payload;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email,
        },
    });
    if (user.activeStatus === "BLOCKED") {
        throw new Error("Your account has been blocked");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    
    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );
    
    return { accessToken, refreshToken };
};
const refreshToken = async (refreshToken: string)=>{
    const veryfiedRefreshToken =await jwtUtils.veryfyToken(refreshToken,config.jwt_refresh_secret)
    if (!veryfiedRefreshToken.success){
        throw new Error (veryfiedRefreshToken.error)
    }
    const {id} =await veryfiedRefreshToken.data as JwtPayload
    const user = await prisma.user.findUniqueOrThrow({
        where :{
            id
        }
    })
    if(user.activeStatus==="BLOCKED"){
        throw new Error ("you are blocket")
    }
    const jwtPaylosd = {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    const accessToken = jwtUtils.createToken(jwtPaylosd,config.jwt_access_secret,config.jwt_access_expires_in as SignOptions)
    return{accessToken}

}

export const authService = {
    loginUserIntoDB,
    refreshToken
};
