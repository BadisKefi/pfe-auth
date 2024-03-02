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
import { CategoryTableSchema } from "@/schemas";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { DeleteCategory } from "@/actions/category-action";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const categoryRow = CategoryTableSchema.parse(row.original);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { edgestore } = useEdgeStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
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
          <DropdownMenuItem>
            <Link
              className="w-full h-full"
              href={`/dashboard/categories/update-category/${categoryRow.id}`}
            >
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
            Delete <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This category will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={() => {
                startTransition(async () => {
                  if (categoryRow.image) {
                    try {
                      const res = await edgestore.publicFiles.delete({
                        url: categoryRow.image,
                      });
                    } catch (err) {
                      console.log(err);
                    }

                    await DeleteCategory({ id: categoryRow.id });
                  }
                  setTimeout(() => {
                    router.push("/dashboard/categories");
                    router.refresh();
                    setShowDeleteDialog(false);
                  }, 1000);
                });

                // toast({
                //   description: "This preset has been deleted.",
                // })
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
