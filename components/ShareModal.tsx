'use client'

import { useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import Image from "next/image";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";
import { getUsers } from "@/lib/actions/user.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function ShareModal(
  {roomId, collaborators, creatorId, currentUserType}: ShareDocumentDialogProps
) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');
  const [collaboratorNotExist, setCollaboratorNotExist] = useState(false);

  const user = useSelf();

  useEffect(() => {
    if(!open) {
      setCollaboratorNotExist(false);
    }
  }, [open])

  const shareDocumentHandler = async () => {
    setLoading(true);

    const users = await getUsers();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUser = users.filter((user: any) => user.email === email)
    console.log('findUser : ', findUser)
    if(findUser.length === 0) { 
      setCollaboratorNotExist(true);
      setLoading(false);
      return;
    }

    await updateDocumentAccess({
      roomId, 
      email, 
      userType: userType as UserType, 
      updatedBy: user.info
    });

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gradient-blue flex h-9 gap-1 px-4" disabled={currentUserType !== 'editor'}>
          <Image 
            src={"/assets/icons/share.svg"}
            alt={"share"}
            width={20}
            height={20}
            className="min-v-4 md:shize-5"
          />
          <p className="mr-1 hidden md:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select wich users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        { collaboratorNotExist && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Collaborator does not exist !</AlertTitle>
            <AlertDescription>
              The entered email does not correspond to any registered collaborator.
              Retry with email from existing collaborator.
            </AlertDescription>
          </Alert>
        )}
        <Label htmlFor="email" className="mt-6 text-blue-100">Email address</Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input 
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector 
              userType={userType}
              setUserType={setUserType}
            />
          </div>
          <Button 
            type="submit" 
            onClick={shareDocumentHandler}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </div>
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {
              collaborators.map(collaborator => (
                <Collaborator 
                  key={collaborator.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collaborator.email}
                  collaborator={collaborator}
                  user={user.info}
                />
              ))
            }
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
