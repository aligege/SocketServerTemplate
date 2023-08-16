import { MongoBaseService } from "cgserver"
import { MongoBaseModel } from "cgserver"

export class SessionModel extends MongoBaseModel
{
    user_id=-1
    host=""
    port=-1
    session=""
    ingame=false
}

export let GSessionSer:SessionService=null
class SessionService extends MongoBaseService<SessionModel>
{
}
GSessionSer = new SessionService("session",SessionModel)