import axios from "axios";

export interface Selectorgtype{
    name:string
    id:string
    avatar:string|null
    headline:string|null

}

interface selectOrgApiType{
    message:string
    orgs:Array<Selectorgtype> | null
}

export const selectorgsS = async()=>{
    const {data}:{data:selectOrgApiType}  = await axios.get("/api/org/get-orgs-for-owner")
    return data
}
