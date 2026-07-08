export interface createUserPayload {
    name: string,
    email:string,
    password: string,
    profilePhoto?:string,
    role: "TENANT" | "LANDLORD"
}
export interface IUpdateUser{
    name:string,
    profilePhoto?:string,
    bio?:string
}