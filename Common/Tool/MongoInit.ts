import { core, GDBCache, GLog, GMongoCacheSer } from "cgserver"
import { AdModel, GAdSer } from "../Service/AdService"
import { GBagSer } from "../Service/BagService"
import { BlindModel, GBlindSer } from "../Service/BlindService"
import { GItemCfgSer } from "../Service/Config/ItemCfgService"
import { GProductCfgSer } from "../Service/Config/ProductCfgService"
import { GExtAccountSer } from "../Service/ExtAccountService"
import { GExtUserSer } from "../Service/ExtUserService"
import { GServerSer, ServerItem, ServerModel } from "../Service/ServerService"
import { GStatisticsLogin } from "../Service/StatisticsLogin"

class MongoInit
{
    /**
     * 优化数据库访问
     */
    initIndexes()
    {
        GMongoCacheSer.createIndex({key:1})
        GExtUserSer.createIndex({id:1})
        GExtUserSer.createIndex({account_id:1})
        GExtAccountSer.createIndex({id:1})
        GBagSer.createIndex({user_id:1})
        GStatisticsLogin.createIndex({account_id:1})
    }
    async initAll()
    {
        await this.initServers()
        await this.initItemCfg()
    }
    async initServers()
    {
        let sm = new ServerModel()
        sm.id= 1
        sm.name= "test region"
        sm.info= "rest region info"
        sm.is_show= 1
        sm.sort_num= 1
        sm.create_time= Date.now()
        sm.servers=[]
        let si = new ServerItem()
        si.id = 1
        si.sort_num = 1
        si.host = "119.3.92.190"
        si.port = 6001
        si.gmhost = ""
        si.gmport = -1
        si.name = "hall"
        si.info = "hall"
        si.is_show = 1
        si.state = 1
        si.create_time = Date.now()
        sm.servers.push(si)
        si = new ServerItem()

        si = new ServerItem()
        si.id = 3
        si.sort_num = 1
        si.host = "119.3.92.190"
        si.port = 6010
        si.gmhost = ""
        si.gmport = -1
        si.name = "texas"
        si.info = "texas"
        si.is_show = 1
        si.state = 1
        si.create_time = Date.now()
        sm.servers.push(si)
        await GServerSer.updateOne(sm,{id:sm.id},true)
    }
    async initItemCfg()
    {
        let items=[]
        items.push({"id":1001,"type":0,"name":"济南主赛资格（三晚华美达酒店套餐/组别任选）","icon":"image/icon/ticket","coin":0,"des":"济南主赛资格（三晚华美达酒店套餐/组别任选）"})
        items.push({"id":1002,"type":0,"name":"济南主赛（A/B组/无酒店）资格+附赛资格卡","icon":"image/icon/ticket","coin":0,"des":"济南主赛（A/B组/无酒店）资格+附赛资格卡"})
        items.push({"id":1003,"type":0,"name":"济南主赛（A/B组）资格(无酒店)","icon":"image/icon/ticket","coin":0,"des":"济南主赛（A/B组）资格(无酒店)"})
        items.push({"id":1004,"type":0,"name":"2022TJPT长沙主赛邀请函（AB通用）","icon":"image/icon/ticket","coin":0,"des":"2022TJPT长沙主赛邀请函（AB通用）"})
        items.push({"id":1005,"type":0,"name":"国家杯.无锡站资格卡兑换卷","icon":"image/icon/ticket","coin":0,"des":"国家杯.无锡站资格卡兑换卷"})
        items.push({"id":1006,"type":0,"name":"GYPT贵阳实业赞助赛","icon":"image/icon/ticket","coin":0,"des":"GYPT贵阳实业赞助赛"})
        items.push({"id":1007,"type":0,"name":"南京.大明杯主赛资格卡兑换卷","icon":"image/icon/ticket","coin":0,"des":"南京.大明杯主赛资格卡兑换卷"})
        items.push({"id":1008,"type":0,"name":"无锡.太湖杯主赛资格卡兑换卷","icon":"image/icon/ticket","coin":0,"des":"无锡.太湖杯主赛资格卡兑换卷"})
        items.push({"id":1009,"type":0,"name":"无锡.泰坦杯主赛资格卡兑换卷","icon":"image/icon/ticket","coin":0,"des":"无锡.泰坦杯主赛资格卡兑换卷"})
        items.push({"id":1010,"type":0,"name":"无锡.南方杯主赛资格卡兑换卷","icon":"image/icon/ticket","coin":0,"des":"无锡.南方杯主赛资格卡兑换卷"})
        items.push({"id":1011,"type":1,"name":"10元话费券","icon":"image/icon/ticket","coin":0,"des":"10元话费券"})
        items.push({"id":1012,"type":1,"name":"20元话费券","icon":"image/icon/ticket","coin":0,"des":"20元话费券"})
        items.push({"id":1013,"type":1,"name":"30元话费券","icon":"image/icon/ticket","coin":0,"des":"30元话费券"})
        items.push({"id":1014,"type":1,"name":"50元话费券","icon":"image/icon/ticket","coin":0,"des":"50元话费券"})
        items.push({"id":1015,"type":1,"name":"100元话费券","icon":"image/icon/ticket","coin":0,"des":"100元话费券"})
        items.push({"id":1016,"type":2,"name":"实物参赛券","icon":"image/icon/ticket","coin":0,"des":"实物参赛券"})
        items.push({"id":1017,"type":1,"name":"200元话费券","icon":"image/icon/ticket","coin":0,"des":"200元话费券"})
        for(let i=0;i<items.length;++i)
        {
            let item = items[i]
            await GItemCfgSer.updateOne(item,{id:item.id},true)
        }
    }
    async initProductCfg()
    {
        let items=[]
        items.push({"id":"texas@products@05","key":"com.shilaike.zdpk.10","title":"购买50视频点","icon":"Module/Order/Image/Shop/shop2","money":0.5,"coin":50,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0,"activity":true})
        items.push({"id":"texas@products@10","key":"com.shilaike.zdpk.10","title":"购买1000视频点","icon":"Module/Order/Image/Shop/shop2","money":10,"coin":1000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0,"activity":true})
        items.push({"id":"texas@products@50","key":"com.shilaike.zdpk.50","title":"购买5000视频点","icon":"Module/Order/Image/Shop/shop5","money":50,"coin":5000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0,"activity":true})
        items.push({"id":"texas@products@100","key":"com.shilaike.zdpk.100","title":"购买10000视频点","icon":"Module/Order/Image/Shop/shop5","money":100,"coin":10000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0,"activity":true})
        items.push({"id":"texas@products@300","key":"com.shilaike.zdpk.300","title":"购买30000视频点","icon":"Module/Order/Image/Shop/shop5","money":300,"coin":30000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0,"activity":true})
        items.push({"id":"texas@products@500","key":"com.shilaike.zdpk.500","title":"购买50000视频点","icon":"Module/Order/Image/Shop/shop1","money":500,"coin":50000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0})
        items.push({"id":"texas@products@800","key":"com.shilaike.zdpk.800","title":"购买80000视频点","icon":"Module/Order/Image/Shop/shop1","money":800,"coin":80000,"crystal":0,"give_crystal":0,"give_coin":0,"vip_exp":0})
        for(let i=0;i<items.length;++i)
        {
            let item = items[i]
            await GProductCfgSer.updateOne(item,{id:item.id},true)
        }
    }
}
export let GMongoInit=new MongoInit()