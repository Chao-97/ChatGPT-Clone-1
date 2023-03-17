import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@/core/db";
import getuseridBySession from "@/core/session-user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const prompt = req.body.prompt as string
  const chatId = req.body.chatId as string
  const model = req.body.model as string
  // const session = await getuseridBySession(req.cookies) 
  if (!session?.user.uid) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (!prompt) {
    res.status(400).json({ answer: "Please Provide a prompt" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
  }
  const userInput = await db.message.create({
    data:{
      chatId:chatId,
      text:prompt,
      role:"user"
    }
  })
    return res.status(200).json({ userInput });
  }



export default handler;