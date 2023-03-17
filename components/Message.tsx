"use client";

import { motion } from "framer-motion";
import React from "react";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";

type Props = {
  message: Message;
};

function Messages({ message }: Props) {
  const isChatGPT = message.role === "ChatGPT";
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        {isChatGPT? 
          <img src="/AIicon.jpg"
          alt={message.role}  className="h-8 w-8" />
        :
          <img src="/icon.png"
          alt={message.role}  className="h-8 w-8" />
        }
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </motion.div>
  );
}

export default Messages;
