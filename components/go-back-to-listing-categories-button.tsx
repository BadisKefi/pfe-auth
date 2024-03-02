import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Table } from "lucide-react";

export const GoBackToListingCategoriesButton = () => {
  return (
    <div>
      <Link
        className={buttonVariants({ variant: "default" })}
        href="/dashboard/categories"
      >
        <div className="flex justify-center items-center gap-2">
          <Table className="h-4 w-4" />
          Categories
        </div>
      </Link>
    </div>
  );
};
