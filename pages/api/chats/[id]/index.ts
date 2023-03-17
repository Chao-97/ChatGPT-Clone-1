import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@/core/db";
import getuseridBySession from "@/core/session-user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const chatId = req.query.id as string;
  // const session = await getuseridBySession(req.cookies) 
  if (!session?.user.uid) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.method === "POST") {
    let messageItem =  await db.chat.create({
            data: {
                userId:session.user.uid
            },
        });  
    return res.json({ messageItem });
  }

  if (req.method === "GET") {
    const messages = await db.message.findMany({
      where:{chatId:chatId},
      orderBy: { createdAt: "asc" },
    });
    return res.json(messages);
  }
  if (req.method === "DELETE") {
    await db.message.deleteMany({ where: { chatId: chatId } });
    await db.chat.delete({ where: { id:chatId } });
    return res.json({ success: true });
  }
};

export default handler;