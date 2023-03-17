import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@/core/db";
import getuseridBySession from "@/core/session-user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getSession({ req });
  // const session = await getuseridBySession(req.cookies) 
  if (!session?.user.uid) {
    return res.status(200).json(null);
  }
  if (req.method === "POST") {

    
    return res.json("400");
  }

  if (req.method === "GET") {

  
    const user = await db.user.findFirst({
      where:{id:session.user.uid},
    });
    return res.status(200).json(user);
  }
};

export default handler;