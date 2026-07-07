import { ProfileUpsertWithoutUserInput, PropertyScalarWhereInput, PropertyWhereInput } from "../../../generated/prisma/models";

export interface IPost {
  title: string;
  description: string;
  address: string;
  price: number;
  imageUrl: string;
  categoryId:number;
  categoryName:string;
}
export interface IUpdatePost {
  title?:string,
  description?:string
  address?:string
  price?:number
  imageUrl?:string
  categories?:string[]
}
export interface IPQuery extends PropertyWhereInput{
        title?:string
  address?: string
    price?:number
    searchTerm?:string
    page?:string
    limit?:string
    sortOrder?:string
    sortBy?:string
}