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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { z } from "zod";
// import { ProductTableSchema } from "@/schemas";
import { Product } from "@/models";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) => {
      const images = row.original.images;
      const label = row.original.label;

      return (
        <>
          {images && (
            <Dialog>
              <DialogTrigger>
                <div className="overflow-hidden aspect-square h-[100px] border-0 p-0 w-[100px] relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md">
                  <Image src={images[0]} fill alt={`${label} image 1`} />
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
                    <div className="overflow-y-auto grid  gap-2 grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)]">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="overflow-hidden border-0 p-0 w-full h-full relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md aspect-square"
                        >
                          <Image
                            src={image}
                            fill
                            alt={`${label} image ${index + 1}`}
                          />
                        </div>
                      ))}
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
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("label")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("price")} Dt
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Category.label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      console.log("original row :");
      console.log(row.original);
      console.log(row.original.Category?.label);
      const categoryLabel = row.original.Category?.label;
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {/* {row.getValue("Category.label")} */}
            {categoryLabel}
          </span>
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
