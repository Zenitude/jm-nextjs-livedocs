"use client"

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import Loader from "./Loader";
import Header from "./Header";

export default function CollaborativeRoom() {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
              <p className='document-title'>Share</p>
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}
