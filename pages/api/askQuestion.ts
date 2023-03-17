// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from "@/firebase/firebaseAdmin";
import query from "@/utils/queryApi";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/core/db";
import { Session } from "inspector";
import Input from "react-select/dist/declarations/src/components/Input";
type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prompt = req.body.prompt as string
  const chatId = req.body.chatId as string
  const model = req.body.model as string

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
  }
  // const userInput = await db.message.create({
  //   data:{
  //     chatId:chatId,
  //     text:prompt,
  //     role:"user"
  //   }
  // })
  // ChatGpt Query

  const response = await query(prompt, chatId, model);

  const chatOutput = await db.message.create({
    data:{
      chatId:chatId,
      text:response || "ChatGpt unable to answer that!",
      role:"ChatGPT"
    }
  })


  res.status(200).json({ answer: chatOutput.text });
}
