
import axios from "axios"
import { INotification } from "../app/custom-Hooks/SocketProvider"


interface RetunTypeGetNotifications {
    messaeg : string 
    notifications :   Array<INotification>
    status : boolean
}

export const getNotifications = async() =>{
    const {data} : {data : RetunTypeGetNotifications} = await axios.get("/api/notifications/get-notifications")

    return data
}