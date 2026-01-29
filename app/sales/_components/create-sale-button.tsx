"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";


interface createSaleButtonProps {
  products: Product[];
  productsOptions: ComboboxOption[];
}

const createSaleButton = (props: createSaleButtonProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button>Nova Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent setSheetIsOpen={setSheetOpen} {...props} />
    </Sheet>
  );
};

export default createSaleButton;
