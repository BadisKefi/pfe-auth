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
import { UserTableSchema } from "@/schemas";
import Image from "next/image";
import avatarexemple from "@/public/avatars/04.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole, UserStatus } from "@prisma/client";

export const columns: ColumnDef<z.infer<typeof UserTableSchema>>[] = [
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
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const image = row.original.image;
      return (
        <div className="w-9 h-9">
          <Image
            src={image || (avatarexemple as StaticImport)}
            alt="avatar of a user"
            width={86}
            height={86}
            className="rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;

      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return (
        <div>
          <Badge
            variant={
              role === UserRole.ADMIN
                ? "blue"
                : role === UserRole.MODERATOR
                ? "orange"
                : "yello"
            }
          >
            {role}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div>
          <Badge
            variant={
              status === UserStatus.DISABLED ? "destructive" : "secondary"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
