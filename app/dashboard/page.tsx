"use client";
import { signOut } from "@/auth";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <>
      <div>Page</div>
      <div>
        <UserButton />
      </div>
    </>
  );
};

export default Page;
