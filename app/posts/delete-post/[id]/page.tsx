import React from "react";

import { DeleteButton } from "../DeleteButton";
import { betterAuthClient } from "@/lib/auth";

const DeletePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const { data } = betterAuthClient.useSession();
    const currUser = data?.user.id;
   
   

  return (
    <>
  <DeleteButton postId={id} currentUserId={currUser || ""} postOwnerId={""} />
    </>
  );
};

export default DeletePage;