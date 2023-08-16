import { core } from "cgserver"
import { EAccountFrom } from "cgserver"
import { MongoAccountModel, MongoAccountService } from "cgserver"
import { GMongoCacheSer, MongoCacheModel } from "cgserver"

export class ExtAccountModel extends MongoAccountModel
{
    invite_code:number=-1
}
let expire_seconds=365*24*60*60//一年
export let GExtAccountSer:ExtAccountService=null
class ExtAccountService extends MongoAccountService
{
    protected _getNewModel()
    {
        return new ExtAccountModel()
    }
    async login(unionid:string,openid:string,ip:string,from:EAccountFrom,access_token?:string,extra?:{nickname:string,sex:number,logo:string})
    {
        let rs = {errcode:null,account:<ExtAccountModel>null,token:<string>null,is_new:false}
        let res = await super.login(unionid,openid,ip,from,access_token,extra)
        if(res.errcode)
        {
            rs.errcode = res.errcode
            return rs
        }
        rs.is_new=res.is_new
        rs.account = res.account as ExtAccountModel
        let key = "account_login_token_"+res.account.id
        let token = core.md5(res.account.id+""+res.account.login_time)
        rs.token = token
        let cm = new MongoCacheModel()
        cm.key=key
        cm.data=token
        cm.expireAt=Date.now()+expire_seconds*1000
        await GMongoCacheSer.updateOne(cm,{key:key},true)
        return rs
    }
}
GExtAccountSer = new ExtAccountService()