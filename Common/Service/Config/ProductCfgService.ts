import { BaseCfgModel, BaseCfgService } from "./BaseCfgService";
export class ProductCfgItem extends BaseCfgModel
{
    key:string=""
    title:string=""
    icon:string=""
    money:number=0
    coin:number=0
    crystal:number=0
    give_coin:number=0
    give_crystal:number=0
    vip_exp:number=0
}

export class CoinItem
{
    id=""
    title=""
    icon=""
    crystal=0
    coin=0
    popular=false
    best=false
}

class ProductCfgService extends BaseCfgService<ProductCfgItem>
{

}
export let GProductCfgSer=new ProductCfgService("productcfg",ProductCfgItem)