import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'

interface DataToServer {
    sender: string;
    room: string;
    cursor: {
        transX: number;
        transY: number;
    }
}

@WebSocketGateway(5000, {
    cors: {
        origin: ['http://192.168.1.102:5173', 'http://localhost:5173']
    }
})


export class Gateway implements OnModuleInit {

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', socket => {
            console.log('Connected: ', socket.id)
            socket.on('disconnect', reason => {
                console.log(`Dicsonnected: ${socket.id} | Reason: ${reason}`)
            })
        })
    } 

    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, room: string) {
        client.join(room)
        this.server.in(room).fetchSockets().then((users) => {
            this.server.emit('joinedRoom', { room, users: users.length, userId: client.id })
            console.log({ room, users: users.length })
        })
        
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, room: string) {
        client.leave(room)
        this.server.in(room).fetchSockets().then((users) => {
            this.server.emit('leftRoom', { room, users: users.length })
            console.log({ room, users: users.length })
        })
        
    }

    @SubscribeMessage('dataToServer')
    handleData(client: Socket, data: DataToServer) {
        console.log(data)
        this.server.to(data.room).emit('dataToClient', data)
    }

    @SubscribeMessage('newMessage')
    onNewMessage(client: Socket, body: any) {
        // console.log({body, socket: client.id})
        client.broadcast.emit('onMessage', {
            body, 
            socket: client.id
        })
    }
}