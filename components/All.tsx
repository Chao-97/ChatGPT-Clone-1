"use client";

import { signOut, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Sidebar from "../components/Sidebar";
import ClientProvider from "@/components/ClientProvider"

const queryClient = new QueryClient();

function All({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>
              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
        </QueryClientProvider>
    </>
  
  );
}

export default All;
