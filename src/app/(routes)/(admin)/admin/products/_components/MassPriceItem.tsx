"use client";
import Checkbox from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClickTrigger } from "@/hooks/useClickTrigger";
import { formatterCurrency } from "@/lib/utils";
import { Mass } from "@prisma/client";
import React, { ChangeEvent } from "react";

interface MassPriceItemProps {
  mass: Mass;
  value?: {
    id: string;
    price: number;
    discount: number;
    massId: string;
  };
  onCheckboxChange: (id: string, checked: boolean) => void;
  onPriceChange: (
    massId: string,
    field: "price" | "discount",
    newValue: number
  ) => void;
}
const MassPriceItem: React.FC<MassPriceItemProps> = ({
  mass,
  value,
  onCheckboxChange,
  onPriceChange,
}) => {
  const { ref, trigger } = useClickTrigger<HTMLInputElement>();
  const checked = !!value;
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="flex flex-row items-center justify-start gap-6">
        {/* <Checkbox
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onCheckboxChange(e.target.value, e.target.checked)
          }
          label={`${mass.value} gram`}
        /> */}
        <Input
          ref={ref}
          type="checkbox"
          className="size-4 cursor-pointer"
          value={mass.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onCheckboxChange(e.target.value, e.target.checked)
          }
        />
        <Label className="text-nowrap cursor-pointer" onClick={trigger}>
          {mass.value} gram
        </Label>
      </div>
      {checked && (
        <div className="w-full grid grid-cols-2 gap-8">
          <div className="col-span-1 grid grid-cols-2 items-center gap-6">
            <Input
              type="number"
              placeholder="Giá"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onPriceChange(mass.id, "price", Number(e.target.value))
              }
            />
            {value?.price ? (
              <p className="text-sm">
                {formatterCurrency.format(value?.price)}
              </p>
            ) : undefined}
          </div>
          <div className="col-span-1 grid grid-cols-2 items-center gap-6">
            <Input
              type="number"
              placeholder="Giảm (%)"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onPriceChange(mass.id, "discount", Number(e.target.value))
              }
            />
            {value?.discount && value.price ? (
              <p className="text-sm">
                {formatterCurrency.format(
                  (value?.discount * value?.price) / 100
                )}
              </p>
            ) : undefined}
          </div>
        </div>
      )}
    </div>
  );
};

export default MassPriceItem;
