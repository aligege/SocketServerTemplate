import { BaseClientWebSocket } from './BaseClientWebSocket';
/*
    客户端连接上来的websocket
*/
export class GameClientWebSocket extends BaseClientWebSocket
{
    send_kickout()
    {
        let msg = this.getNewMsg("kickout")
        this.send(msg)
    }
}