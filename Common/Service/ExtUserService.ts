import { EErrorCode } from "../Config/_error_";
import * as _ from "underscore"
import { GLog } from 'cgserver';
import { MongoUserModel, MongoUserService } from "cgserver";
import { ERoleGroup } from "cgserver";
export class FollowerItem
{
    id=0
    nickname=""
    logo=""
    create_time=0
    ticket=0
}
/**
 * 记录用户的参赛信息和情况
 */
export class UserMatchInfo
{
    //比赛实例id
    ins_id=""
    //报名时间
    signup_time=0
    /**
     * 被淘汰的时间
     */
    drop_time=0
    //名词
    rank=-1
}

export class ExtUserModel extends MongoUserModel
{
    coin:number=0//默认0
    crystal:number = 0//砖石
    followers:{[user_id:number]:{id:number,create_time:number,ticket:number}}={}
}

export let GExtUserSer:ExtUserService = null
export class ExtUserService extends MongoUserService<ExtUserModel>
{
    constructor()
    {
        super(ExtUserModel)
        GExtUserSer=this
    }
    //这个函数一定要有
    static create()
    {
        if(GExtUserSer)
        {
            return
        }
        new ExtUserService()
    }
    //这个函数一定要有
    protected async _createNewUser(account_id:number,nickname:string,sex:number,logo:string,group?:ERoleGroup)
    {
        let rm = await super._createNewUser(account_id,nickname,sex,logo,group)
        let ext_rm = new ExtUserModel()
        for(let k in ext_rm)
        {
            if(rm[k]==undefined)
            {
                rm[k]=ext_rm[k]
            }
        }
        return rm
    }
    async getFollwers(user_id:number)
    {
        let rs=await this.aggregate(<any>[
            {"$match":{id:user_id}},
            {"$project":{followers:1}},
            {
                "$addFields": {
                    "followers": {
                        "$objectToArray": "$followers"
                    }
                }
            },
            {
                "$lookup":
                {
                    from:"user",
                    localField:"followers.v.id",
                    foreignField:"id",
                    as:"user_followers"
                }
            },
            {"$project":{_id:1,followers:1,"user_followers.id":1,"user_followers.nickname":1,"user_followers.logo":1}}
        ]).toArray()
        if(!rs||rs.length==0)
        {
            return null
        }
        let data=rs[0]
        data.followers=data.followers||[]
        data.user_followers=data.user_followers||[]
        let followers:FollowerItem[]=[]
        for(let i=0;i<data.followers.length;++i)
        {
            let one:FollowerItem = data.followers[i].v
            let fi = new FollowerItem()
            fi.id=one.id
            fi.create_time=one.create_time
            fi.ticket=one.ticket
            for(let j=0;j<data.user_followers.length;++j)
            {
                let uf:{id:number,logo:string,nickname:string} = data.user_followers[j]
                if(uf.id==fi.id)
                {
                    fi.nickname=uf.nickname
                    fi.logo=uf.logo
                    break
                }
            }
            followers.push(fi)
        }
        return followers
    }
}
new ExtUserService()