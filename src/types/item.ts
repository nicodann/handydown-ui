import { User } from "./user"

export type Item = {
    "id": number,
    "name": string,
    "description": string,
    "image": string,
    "offered": boolean,
    "delivered": boolean,
    "createdAt": string,
    "updatedAt": string,
    "userId": number,
    "user": User
}