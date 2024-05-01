import axios from "axios"


interface comemntType {
    author : {
        name : string ,
        avatar : string | null
    } ,
    content : string ,
    createdAt : Date ,
    id : string
}

interface ReturnTypeGetComments {
    message : string
    comments : Array<comemntType> | null 
    status : boolean
} 

interface ReturnTypeCreateComment{
    message : string
    comment : comemntType
}

export const getComments = async(postID : string | undefined) => {
    if (postID === undefined) {
        return null
    }
  const {data} : {data : ReturnTypeGetComments} = await axios.get(`/api/comment/get-comments?postID=${postID}`)
  return data
}

export const createComment = async (postID : string , content : string) => {
    const {data} : {data : ReturnTypeCreateComment} = await axios.post(`/api/comment/create-comment?postID=${postID}` , {
        content : content
    })
    return data
}