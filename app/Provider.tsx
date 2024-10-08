"use client";

import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}