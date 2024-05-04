import axios from "axios"
import { postInterface } from "../app/api/post/get-posts/route"

interface ProfileUser {
    avatar: string | null,
    email: string,
    name: string,
    coverImage: string | null,
    bio: string | null,
    headline: string | null,
    id: true
}
export interface userOrgs {
    name: string,
    id: string,
    email: string,
    avatar: string | null,
    headline: string | null
}

interface ReturnTypeGetUser {
    message: string
    user: ProfileUser,
    posts: Array<postInterface> | null,
    userOrgs:  Array<userOrgs> | null
}

export const getUser = async (userID: string) => {
    const { data }: { data: ReturnTypeGetUser } = await axios.get(`/api/user/get-user?userID=${userID}`)
    return data
}