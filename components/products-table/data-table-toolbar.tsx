"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CreateProductButton } from "../create-product-button";
import { Search } from "lucide-react";

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
        {/* {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("gategory")}
            title="Status"
            options={}
          />
        )} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={}
          />
        )} */}
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
      <CreateProductButton />

      <DataTableViewOptions table={table} />
    </div>
  );
}
