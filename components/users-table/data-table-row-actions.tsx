"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserTableSchema } from "@/schemas";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import {
  ActiveToggelerUserById,
  ModeratorToggelerUserById,
} from "@/actions/user";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const userRow = UserTableSchema.parse(row.original);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [status, setStatus] = useState(userRow.isActive.toString());
  const [role, setRole] = useState(userRow.role);
  const { edgestore } = useEdgeStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentUser = useCurrentUser();

  const changedStatus = async (v: string) => {
    console.log(v);
    if (
      (v === "false" && userRow.isActive !== false) ||
      (v === "true" && userRow.isActive !== true)
    )
      await ActiveToggelerUserById({ id: userRow.id });
    setStatus(v);
  };
  const changedRole = async (v: string) => {
    console.log(v);
    if (
      (v === "MODERATOR" && userRow.role !== UserRole.MODERATOR) ||
      (v === "USER" && userRow.role !== UserRole.USER)
    )
      await ModeratorToggelerUserById({ id: userRow.id });
    setStatus(v);
  };
  return (
    <>
      {currentUser.id !== userRow.id && userRow.role !== UserRole.ADMIN && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={status}
                  onValueChange={(v) => changedStatus(v)}
                >
                  <DropdownMenuRadioItem key={"disabled"} value={"false"}>
                    disabled
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem key={"activated"} value={"true"}>
                    activated
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={role}
                  onValueChange={(v) => changedRole(v)}
                >
                  <DropdownMenuRadioItem key={"moderator"} value={"MODERATOR"}>
                    moderator
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem key={"normal"} value={"USER"}>
                    normal
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
              Delete <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This product will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={() => {}}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
