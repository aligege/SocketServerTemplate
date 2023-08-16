import { CommonErrorCode } from "../../Common/Config/_error_"

export let EErrorCode:TexasErrorCode=null
class TexasErrorCode extends CommonErrorCode
{
    Wrong_Param={id:60001,des:"错误的参数"}
    Token_Failed={id:6001,des:"token验证失败!"}
}
EErrorCode=new TexasErrorCode()