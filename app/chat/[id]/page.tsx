"use client";

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Message } from "@prisma/client";
type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const {
    data: messages,
    refetch: refetchProjects,
    isLoading,
  } = useQuery(`messages`, () =>
    axios
      .get<Message[]>(`/api/chats/${id}`)
      .then((response) => response.data)
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col h-screen overflow-hidden"
    >
      <Chat chatId={id} 
            messages={messages} 
            refresh={()=>{refetchProjects()}}/>
      <ChatInput chatId={id} 
                 refresh={()=>{refetchProjects()}}/>
    </motion.div>
  );
}

export default ChatPage;
