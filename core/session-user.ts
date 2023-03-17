
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/core/db";

const  getuseridBySession = async (cookies: Partial<{
  [key: string]: string;
}>)=>{
    const cookie = cookies
    if(!cookie['next-auth.session-token']){
      return null
    }
    const session = await db.session.findFirstOrThrow({
      where:{
        sessionToken:cookie['next-auth.session-token']
      }
    })||null

    return session
}
export default getuseridBySession;