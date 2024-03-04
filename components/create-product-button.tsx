import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const CreateProductButton = () => {
  return (
    <div className="h-8">
      <Button
        variant="default"
        size="sm"
        className="ml-auto h-8 lg:flex"
        asChild
      >
        <Link href="/dashboard/products/create-product">
          <PlusIcon className="mr-2 h-4 w-4" />
          New
        </Link>
      </Button>
    </div>
  );
};
