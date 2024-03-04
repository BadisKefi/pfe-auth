"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/current-user";

import avatarImage from "@/public/avatars/04.png";
import { LogoutButton } from "./auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { ExtendedUser } from "@/next-auth";

export const UserNav = () => {
  const currentUser = useCurrentUser();
  const { name, email, id, role, image } = currentUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar className="">
            <AvatarImage
              src={image || avatarImage.src}
              alt={name || "current connected user image"}
              className="h-full w-full"
            />
            <AvatarFallback className="h-full w-full">
              {(name && name[0]) || "US"}
            </AvatarFallback>{" "}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name || "name"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email || "name@email.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
