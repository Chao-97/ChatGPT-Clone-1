"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Message } from "@prisma/client";
 import Messages from "./Message";

type Props = {
  chatId: string;
  messages:Message[]| undefined;
  refresh:()=>void
};

function Chat({ 
  chatId,
  messages,
  refresh
 }: Props) {
  const { data: session } = useSession();
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  // const {
  //   data: messages,
  //   refetch: refetchProjects,
  //   isLoading,
  // } = useQuery(`messages`, () =>
  //   axios
  //     .get<Message[]>(`/api/chats/${chatId}`)
  //     .then((response) => response.data)
  // );
  // const [messages] = useCollection(
  //   session &&
  //     query(
  //       collection(
  //         firestore,
  //         `users/${session?.user?.uid!}/chats/${chatId}/messages`
  //       ),
  //       orderBy("createdAt", "asc")
  //     )
  // );
  //console.log("🚀 ~ file: Chat.tsx:27 ~ Chat ~ messages:", messages?.docs);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {!(messages?.length!>0) && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mx-auto mt-5 text-white animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </>
      )}
      {messages?.map((message) => (
        <Messages key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;

