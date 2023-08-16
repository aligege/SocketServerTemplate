import * as _ from "underscore";
import { Rpc } from "cgserver";

class GameRpc extends Rpc
{
    /**
     * 当前服务器收到的当前或者其他服务器发来的有用户上线的消息，返回给调用的服务器参数1
     */
    async onUserOnline(user_id:number)
    {
        return 1
    }
    /**
     * 调用远程服务器的函数，告诉别人有人上线了
     * @param user_id 
     */
    async userOnline(user_id:number)
    {
        //调用game服务器的onUserOnline函数
        this.getRemote("server").call("onUserOnline",user_id)
    }
}
export let GGameRpc = new GameRpc()