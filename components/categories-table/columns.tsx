"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { z } from "zod";
import { CategoryTableSchema } from "@/schemas";
import Image from "next/image";

export const columns: ColumnDef<z.infer<typeof CategoryTableSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const image = row.original.image;
      const label = row.original.label;

      return (
        <>
          {image && (
            <Dialog>
              <DialogTrigger>
                <div className="overflow-hidden h-[60px] w-full border-0 p-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md aspect-[21/6]">
                  <Image
                    src={image}
                    className="object-cover"
                    fill
                    alt={`${label} image 1`}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="h-1/3">
                  <div className="m-3">
                    <div className="overflow-y-auto">
                      <div className="overflow-hidden border-0 p-0 w-full h-full relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md aspect-[21/6]">
                        <Image
                          src={image}
                          fill
                          className="object-cover"
                          alt={`${label} image`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => {
      const label = row.original.label;

      return (
        <div>
          <div className="max-w-[200px] truncate font-medium">
            {row.getValue("label")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <div className="max-w-[200px] truncate font-medium">
            {row.getValue("description")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      const value: Date = row.getValue("createdAt");
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {value.toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UpdatedAt" />
    ),
    cell: ({ row }) => {
      const value: Date = row.getValue("updatedAt");
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {value.toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
