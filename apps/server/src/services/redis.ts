import {Redis} from "ioRedis"
import { Server } from "socket.io"
import { Task, message  , INotification} from "./socket"

type RecievedData = message | Task | INotification

class RedisService {
    private io:Server
    private pub:Redis
    private sub:Redis
    private subscribedChannels: Set<string>;

    constructor(io:Server){
        this.io= io
        this.pub = new Redis()
        this.sub = new Redis()
        this.subscribedChannels = new Set();
    };

    public async publishToRoom(roomName:string,Message:message): Promise<void> {
              await this.pub.publish(roomName,JSON.stringify(Message) ,(err , result)=>{
                if (err) {
                    console.log(`error while publish to channel ${roomName}  `);   
                    return err
                }
                else {
                    console.log(`publish to channel ${roomName} and the message is ${Message}`);   
                }})
    }

    public async publishTaskToRoom(roomName:string,Task:Task){
        await this.pub.publish(roomName,JSON.stringify(Task),(err , result)=>{
            if (err) {
                console.log(`error while publish to channel ${roomName}  `);   
                return err
            }
            else {
                console.log(`publish to channel ${roomName} and the task is ${Task}`);   
            }})
    }

    
    public async publishNotificationToRoom(roomName:string,Notification : INotification){
        await this.pub.publish(roomName,JSON.stringify(Notification),(err , result)=>{
            if (err) {
                console.log(`error while publish to channel ${roomName}  `);   
                return err
            }
            else {
                console.log(`publish to channel ${roomName} and the Notification is ${Notification}`);   
            }})
    }


    public async subscribeToRoom(roomName:string): Promise<void>{

        if (this.subscribedChannels.has(roomName)) {
            console.log(`Already subscribed to Redis channel: ${roomName}`);
            return;
          }

        await this.sub.subscribe(roomName,(err , result)=>{
            if (err) {
                console.log(`error while subscribe to channel ${roomName} `);   
                return err
            }
            else {
                console.log(`subscribe to channel ${roomName}`);   
                this.subscribedChannels.add(roomName);
            }})


            this.sub.on("message",(channel:string,Message:string)=>{
                if (channel===roomName) {
                    const parsedData : RecievedData   = JSON.parse(Message)
                    console.log("parsed item" , parsedData);

                    // if ('content' in parsedData && 'sender' in parsedData && 'roomName' in parsedData) {
                    //     console.log("message hai");
                        
                    //     // Object is of type Message
                    //     // this.io.emit('message', parsedData as message);
                    //     this.io.to(roomName).emit("RecivedMessage" , parsedData as message)
                    //   } else if ('content' in parsedData && 'title' in parsedData && 'Manager' in parsedData && 'employee' in parsedData) {
                    //     // Object is of type Task
                    //     console.log("task hai");
                    //     console.log("roomName" , roomName);
                        
                        
                    //     this.io.emit('RecivedMessage', parsedData as Task);
                    //   } else {
                    //     console.error('Received data does not match expected format.');
                    //   }

                  
                    this.io.to(roomName).emit("RecivedMessage" , parsedData )
                    
                    
                   
                    
                }
            })

            
    }

   
get pubLisher(){
    return this.pub
}
get subscribe(){
    return this.sub
}
}
export{RedisService}