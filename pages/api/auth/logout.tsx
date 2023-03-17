import { NextApiRequest, NextApiResponse } from "next";
import authingClient from "@/utils/clients/authing";
import getuseridBySession from "@/core/session-user"
import db from "@/core/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const userId = JSON.stringify(req.query.userId).split("\"").join("")
    if (!userId) {
      return res.status(200).json("未登陆");
    }
    
    const user = await db.user.findFirstOrThrow({
      where:{
        id:userId
      }
    })
     console.log("user://",user);
     console.log("authingId://",user.authingId);

     const reqs1 = await authingClient.post(
      `api/v3/get-management-token`,
      {
        accessKeyId:process.env.AUTHING_ACCESSKETID,
        accessKeySecret:process.env.AUTHING_ACCESSKETSECRET
      }
    );
      // console.log("reqs",reqs1.data.data,);

    const reqs = await authingClient.post(
      `api/v3/kick-users/`,
      {
        userId:user.authingId||"",
        appIds:[`${process.env.AUTHING_CLIENT_ID}`]
      },{
        headers:{
          "Authorization" : reqs1.data.data.access_token,
        }
      }
    );
      console.log("reqs",reqs.data);
    const returnTo = encodeURI(process.env.NEXTAUTH_URL||"");
    res.redirect(`${returnTo}`);


    // res.setHeader("access-control-allow-origin","*");
    // res.setHeader("access-control-allow-origin","*");

    //前端下线
    //const params = new URLSearchParams({
      // id_token_hint: user.authingId||"",
      // post_logout_redirect_uri:process.env.NEXTAUTH_URL||"",
      // state:"200"
   // });
    // res.redirect(`https://tmft35dm68fa-demo.authing.cn/oidc/session/end?${params.toString()}`); //前端下线
     
    // res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?federated&client_id=${process.env.AUTH0_CLIENT_ID}`);
    // res.redirect(`https://tmft35dm68fa-demo.authing.cn/login/profile/logout?redirect_uri=http://localhost:3000`);

}