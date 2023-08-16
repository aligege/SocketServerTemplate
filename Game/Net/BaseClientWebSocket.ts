import { BaseMsg, GMongoCacheSer, IClientWebSocket, ISocketServer } from 'cgserver';
import { ExtUserModel, GExtUserSer } from '../../Common/Service/ExtUserService';
import { EErrorCode } from '../Config/_error_';
import { GameServer } from '../Logic/GameServer';
import * as _ from "underscore";
/*
    客户端连接上来的websocket
*/
export class BaseClientWebSocket extends IClientWebSocket
{
    protected _user:ExtUserModel=null
    get server()
    {
        return this._server as GameServer
    }
    constructor(server:ISocketServer)
    {
        super(server)
        //这个决定是否输出debug的消息日志
        this._debug_msg=true
    }
    protected _sendTo(userid:number|number[],msg:BaseMsg)
    {
        if(!userid)
        {
            return
        }
        let user_id_list = []
        if(!_.isArray(userid))
        {
            user_id_list = [userid]
        }
        else
        {
            user_id_list = userid
        }
        //找到正确的center
        let game = this.server
        //让消息输出只输出第一条的有多条的时候
        let pre_debug_msg=this._debug_msg
        user_id_list.forEach((user_id)=>
        {
            let ws = game.getWebSocketByUserId(user_id)
            if(ws)
            {
                ws.send(msg)
                this._debug_msg=false
            }
        })
        //还原消息设置
        this._debug_msg = pre_debug_msg
    }
    getNewMsg(cmd: any, errcode?: any)
    {
        cmd = this.server.name+"_"+cmd
        let msg = super.getNewMsg(cmd,errcode)
        return msg
    }
    onClose(reasonCode: number, description: string)
    {
        let ret = super.onClose(reasonCode,description)
        if(this._user)
        {
            this.server.removeUserId(this._user.id,this.socketId)
        }
        return ret
    }
    async receive_login(jsonData)
    {
        let account_id = jsonData.account_id
        let token = jsonData.token
        let key = "account_login_token_"+account_id
        let now_token=await GMongoCacheSer.getData(key)
        if(!token||token!=now_token)
        {
            this.send_login(EErrorCode.Token_Failed)
            return
        }
        this._user = await GExtUserSer.getByAccountId(account_id)
        let ws = this.server.getWebSocketByUserId(this._user.id)
        //踢人
        if(ws)
        {
            ws.send_kickout()
        }
        this.server.addUserId(this._user.id,this.socketId)
        this.send_login()
    }
    send_login(errcode?)
    {
        let msg = this.getNewMsg("login",errcode)
        msg.user = this._user
        this.send(msg)
    }
    receive_other_all(jsonData)
    {
        let cmd = "receive_"+jsonData.cmd
        cmd = cmd.replace("_"+this._server.name+"_","_")
        if(this[cmd])
        {
            this[cmd](jsonData)
        }
    }
}