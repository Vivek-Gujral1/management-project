"use client";

import React, {
  createContext,
  FC,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface RoomAcknowledgeMent {
  status: boolean;
}

export interface message {
  content: string;
  sender: user;
  roomName : string
}
interface user {
  name: string;
  avatar: string | null;
  id: string;
}

export interface ITask{
  content:string,
  Manager:user,
  // LastDate:Date,
  employee:user,
  title:string
}

export interface INotification {
  content : string 
  sender  : user
  reciever : user
}

interface NotificationOrg {
  id : string 
  name : string 
  avatar : string | null
}

export interface AddEmployeeAcceptNotification extends INotification {
 org : NotificationOrg
 
}



interface IsocketContext {
  sendMessage: (roomName: string, Message: message) => Promise<boolean>;
  joinRoom: (roomName: string) => Promise<boolean>;
  Messages: Array<message>;
  clearMessages: () => void; // Function to clear messages
  sendTask:(roomName:string,Task:ITask)=> Promise<boolean>;
  Tasks : Array<ITask>
  notifications : Array<INotification>
  sendNotifications:(roomName : string , Notification : INotification) => Promise<boolean>
}

const socketContext = React.createContext<IsocketContext | null>(null);
export const useSocket = () => {
  const state = useContext(socketContext);
  if (!state) throw new Error("state not defined");

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [Socket, setSocket] = useState<Socket>();
  const [Messages, setMessages] = useState<message[]>([]);
  const [Tasks  , setTasks] = useState<ITask[]>([])
  const [notifications , setNotifications] = useState<INotification[]>([])
  const userData = useSelector((state : RootState)=> state.auth.userData)
  

  const joinRoom = useCallback(
    async (roomName: string) => {
      if (Socket === undefined) {
        console.log("Socket Undefined");
        
        return false;
      }

      const res: RoomAcknowledgeMent = await Socket.emitWithAck(
        "joinRoom",
        roomName
      );

      console.log("socket emit");

      if (res.status === false) {
        return false;
      }

      return true;
    },
    [Socket]
  );
  const sendTask :IsocketContext["sendTask"] = useCallback(
    async(roomName:string,Task:ITask)=>{
      const res:RoomAcknowledgeMent = await Socket?.emitWithAck(
        "sendtask",
        roomName,
        Task
      )
      console.log("task send " , Task);
      
      return res.status

    },[Socket]
  )

  const sendMessage: IsocketContext["sendMessage"] = useCallback(
    async (roomName: string, Message: message) => {
      const res: RoomAcknowledgeMent = await Socket?.emitWithAck(
        "sendMessage",
        roomName,
        Message
      );

      console.log("Message send ", Message);

      if (res.status === false) {
        return false;
      }
      const create = await axios.post(
        `/api/messages/create-message?GroupName=${roomName}`,
        {
          content: Message.content,
        }
      );
      console.log(create);

      return true;
    },
    [Socket]
  );

  const sendNotifications: IsocketContext["sendNotifications"] = useCallback(
    async (roomName: string, Notification: INotification) => {
      const res: RoomAcknowledgeMent = await Socket?.emitWithAck(
        "sendNotification",
        roomName,
        Notification
      );

      console.log("Notification res ", res );

      if (res.status === false) {
        return false;
      }
      const create = await axios.post(`/api/notifications/create-notification?recieverID=${Notification.reciever.id}` , {
                content : Notification.content
              })
      console.log(create);

      return true;
    },
    [Socket]
  );

  const onMessageRec = useCallback(
    (Message: message | ITask | INotification) => {
     
      
      console.log("Message recieved from server", Message);

      

      // console.log(Message);
      // console.log( "socket Provider messages ",Messages);

      if ('content' in Message && 'sender' in Message && 'roomName' in Message) {
        console.log("message hai");
        
        // Object is of type Message
        // this.io.emit('message', parsedData as message);
        setMessages((prev) => [...prev, Message]);
      } else if ('content' in Message && 'title' in Message && 'Manager' in Message && 'employee' in Message) {
        // Object is of type Task
        console.log("task hai");
        setTasks((prev) => [...prev, Message]);
      } 
      else if("sender" in Message && "reciever" in Message && "reciever" in Message ) {
        console.log("Notification hai");
        setNotifications((prev)=>[...prev , Message])
      }
      else {
        console.error('Received data does not match expected format.');
      }
      
    },
    [Socket]
  );

  const clearMessages : IsocketContext["clearMessages"] = useCallback(() => {
    setMessages([]); // Clearing messages array
  }, []);

  // const clearTasks
  
  
  

  useEffect(() => {
    // const _socket = io("http://localhost:3002");
    // _socket.on("RecivedMessage", onMessageRec);
    // // _socket.on("RecievedTask" , onTaskRecievd)

    

    // setSocket(_socket);

    const initializeSocket = async () => {
      const _socket = io("http://localhost:3002");
      _socket.on("RecivedMessage", onMessageRec);
  
      setSocket(_socket);
  
      // Join room immediately after socket is initialized
     const res =  await joinRoom("notifcation ka liya");
     console.log("notification" ,res);
     
    };
  
    initializeSocket();

  
   
   

    return () => {
      if (Socket) {
        Socket.disconnect();
        setSocket(undefined);
      }
    };
  }, []);

  useEffect(() => {
    const joinRoomIfSocketInitialized = async () => {
      if (Socket) {
      if (userData) {
        await joinRoom(`${userData.id}_${userData.name}`);
      }
      }
    };

    joinRoomIfSocketInitialized();
  }, [Socket, joinRoom]);

  return (
    <socketContext.Provider value={{ sendMessage, joinRoom, Messages  , clearMessages ,sendTask , Tasks  , sendNotifications , notifications}}>
      {children}
    </socketContext.Provider>
  );
};
