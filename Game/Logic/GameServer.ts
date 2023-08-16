import { GameClientWebSocket } from '../Net/GameClientWebSocket';
import { GGameRpc } from '../Net/GameRpc';
import { GGameCfg } from '../Config/GameConfig';
import { ISocketServer } from 'cgserver';

export let GGameServer:GameServer = null
export class GameServer extends ISocketServer
{
    constructor()
    {
        GGameCfg.init()
        super(GGameCfg)
        GGameServer = this
        //这个目的是为了让底层收到客户端请求后建立socket的连接对象
        this.registerWebSocketHandleClass("default",GameClientWebSocket)
    }
    onListenning()
    {
        super.onListenning()
        GGameRpc.init(GGameCfg.third_cfg.cgmq)
    }
    protected _userid_to_socketid=new Map<number,number>()
    addUserId(user_id:number,socket_id:number)
    {
        this._userid_to_socketid[user_id] = socket_id
    }
    removeUserId(user_id:number,socket_id:number)
    {
        if(this._userid_to_socketid[user_id]==socket_id)
        {
            delete this._userid_to_socketid[user_id]
        }
    }
    getWebSocketByUserId(user_id:number):GameClientWebSocket
    {
        let si = this._userid_to_socketid[user_id]
        if(!si)
        {
            return
        }
        return this._ws_clients[si] as GameClientWebSocket
    }
}