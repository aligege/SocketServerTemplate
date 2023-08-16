import { FrameworkErrorCode } from "cgserver";

export let EErrorCode:CommonErrorCode =null

export class CommonErrorCode extends FrameworkErrorCode
{

}
EErrorCode=new CommonErrorCode()