"use client";
import React from "react";
import { Mass } from "@prisma/client";
import { ProductType } from "@/types";
import MassPriceItem from "./MassPriceItem";

interface MassPriceFieldProps {
  masses: Mass[];
  value: ProductType["productMass"];
  onChange: (value: ProductType["productMass"]) => void;
}
const MassPriceField: React.FC<MassPriceFieldProps> = ({
  masses,
  value,
  onChange,
}) => {
  const handleCheckboxChange = (massId: string, checked: boolean) => {
    if (checked) {
      onChange([
        ...value,
        { id: crypto.randomUUID(), price: 0, discount: 0, massId },
      ]);
    } else {
      onChange(value.filter((v) => v.massId !== massId));
    }
  };
  const handlePriceChange = (
    massId: string,
    field: "price" | "discount",
    newValue: number
  ) => {
    const update = value.map((v) =>
      v.massId === massId ? { ...v, [field]: newValue } : v
    );
    onChange(update);
  };
  return (
    <div className="flex flex-col justify-center gap-4">
      {masses.map((mass) => (
        <MassPriceItem
          key={mass.id}
          mass={mass}
          value={value.find((v) => v.massId === mass.id)}
          onCheckboxChange={handleCheckboxChange}
          onPriceChange={handlePriceChange}
        />
      ))}
    </div>
  );
};

export default MassPriceField;
