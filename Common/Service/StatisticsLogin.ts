import { MongoBaseService } from 'cgserver';
import { MongoBaseModel } from 'cgserver';

export class StatisticsLoginModel extends MongoBaseModel
{
    id:number=-1
    account_id:number=-1
    login_time:number=-1
    login_ip:string=""
}

export let GStatisticsLogin:StatisticsLogin=null
class StatisticsLogin extends MongoBaseService<StatisticsLoginModel>
{
}
GStatisticsLogin = new StatisticsLogin("statistics_login",StatisticsLoginModel)