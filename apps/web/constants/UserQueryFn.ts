import axios from "axios"

interface ProfileUser {
    avatar : string | null,
    email : string,
    name : string,
    coverImage : string | null ,
    bio : string | null,
    headline : string | null ,
    id : true
}

interface ReturnTypeGetUser {
    message : string
    user  : ProfileUser
}

export const getUser = async(userID : string) => {
 const {data} : {data : ReturnTypeGetUser} = await axios.get(`/api/user/get-user?userID=${userID}`)
  return data.user
}