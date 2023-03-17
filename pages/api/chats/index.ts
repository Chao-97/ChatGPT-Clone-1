import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@/core/db";
import getuseridBySession from "@/core/session-user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
     const session = await getSession({ req });
  // const session = await getuseridBySession(req.cookies) 
  if (!session?.user.uid) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.method === "POST") {
    let chatItem =  await db.chat.create({
            data: {
                userId:session.user.uid
            },
        });  
    return res.json({ chatItem });
  }

  if (req.method === "GET") {
    const chats = await db.chat.findMany({
      where:{userId:session.user.uid},
      orderBy: { id: "desc" },
    });
    return res.json(chats);
  }
};

export default handler;