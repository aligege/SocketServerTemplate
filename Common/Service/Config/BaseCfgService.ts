import { GCgServer, MongoBaseModel, MongoBaseService } from "cgserver";
export class BaseCfgModel extends MongoBaseModel
{
    id:any
}
export class BaseCfgService<T extends BaseCfgModel> extends MongoBaseService<T>
{
    protected _allitems:T[]=[]
    protected _mapItems:{[id:string]:T}={}
    constructor(table: string, type: {new (): T;})
    {
        super(table,type)
        GCgServer.addListener("start",this._init.bind(this))
    }
    protected async _init()
    {
        this._allitems=await this.gets()
        for(let i=0;i<this._allitems.length;++i)
        {
            let item = this._allitems[i]
            this._mapItems[item.id]=item
        }
        setTimeout(()=>
        {
            this._init()
        },5000)
    }
    getAll()
    {
        return this._allitems
    }
    getByCfgId(id:any)
    {
        return this._mapItems[id as string]
    }
    getById(id:any)
    {
        throw new Error("use getByCfgId instead!")
        return null
    }
}