/*!@preserve
* TinyTS     : Free Web,Native Server
* Copyright : muma <chengang01@live.com>
*/
import { ISocketServer } from 'cgserver';
import { GameServer } from './Game/Logic/GameServer';

let server2:ISocketServer=new GameServer()

if(server2)server2.run()