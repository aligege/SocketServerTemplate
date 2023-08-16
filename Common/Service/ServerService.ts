import { MongoBaseService } from "cgserver"
import { MongoBaseModel } from "cgserver"
import { GCacheTool } from "cgserver"
import _ from "underscore"

// 区域
export class ServerModel extends MongoBaseModel
{
    id: number = -1
    name: string = ""
    info: string = ""
    is_show: number = 1
    sort_num: number = 1
    create_time: number = Date.now()
    servers=new Array<ServerItem>()
}
// 服务器
export class ServerItem
{
    id: number = -1
    sort_num: number = -1
    host: string = ""
    port: number = -1
    gmhost: string = ""
    gmport: number = -1
    name: string = ""
    info: string = ""
    is_show: number = 1
    state: number = 1 // 1绿色流畅 2黄色普通 3红色拥挤 4紫色爆满
    create_time: number = Date.now()
}

export let GServerSer: ServerService = null
class ServerService extends MongoBaseService<ServerModel>
{
    async getAll()
    {
        let all = GCacheTool.get('all_server_config')
        if (all)
        {
            return all
        }
        all = await this.gets()
        if(!all||all.length==0)
        {
            return all
        }
        GCacheTool.add('all_server_config', all, 10*60*1000)
        return all
    }
    async getAllByName(server:string)
    {
        server=server.toLowerCase()
        let all = await this.getAll()
        let lst=new Array<ServerItem>()
        for(let i=0;i<all.length;++i)
        {
            let rg:ServerModel = all[i]
            rg.servers=rg.servers||[]
            for(let j=0;j<rg.servers.length;++j)
            {
                let s = rg.servers[j]
                if(s.name==server)
                {
                    lst.push(s)
                }
            }
        }
        return lst
    }
    async getRandomServerByName(server:string)
    {
        let lst = await this.getAllByName(server)
        if(lst.length==0)
        {
            return null
        }
        if(lst.length==1)
        {
            return lst[0]
        }
        let i = _.random(0,lst.length-1)
        return lst[i]
    }
    async getServerByInfo(host:string,port:number)
    {
        let all = await this.getAll()
        for(let i=0;i<all.length;++i)
        {
            let servers = all[i].servers||[]
            for(let j=0;j<servers.length;++j)
            {
                if(servers[j].host==host&&servers[j].port==port)
                {
                    return servers[j]
                }
            }
        }
        return null
    }
}
GServerSer = new ServerService("server",ServerModel)