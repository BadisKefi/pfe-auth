"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Search } from "lucide-react";
import { UserRole, UserStatus } from "@prisma/client";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="relative flex flex-1 items-center space-x-2">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("label")?.setFilterValue(event.target.value)
          }
          className="pl-8 h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role filter"
            options={Object.entries(UserRole).map(([key, value]) => ({
              label: value.toLocaleLowerCase(),
              value: value,
            }))}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status filter"
            options={Object.entries(UserStatus).map(([key, value]) => ({
              label: value.toLocaleLowerCase(),
              value: value,
            }))}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
