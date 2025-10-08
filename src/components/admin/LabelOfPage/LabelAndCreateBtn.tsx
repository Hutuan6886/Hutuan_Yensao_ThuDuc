"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface LabelAndCreateBtnProps {
  label: string;
  btnName: string;
  btnHref: string;
}
const LabelAndCreateBtn: React.FC<LabelAndCreateBtnProps> = ({
  label,
  btnName,
  btnHref,
}) => {
  const router = useRouter();
  const btnFunc = () => router.push(btnHref);
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-3xl font-semibold">{label}</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 transition
        flex flex-row items-center gap-2 cursor-pointer"
        onClick={btnFunc}
      >
        {btnName}
        <Plus className="inline-block size-[15px]" />
      </button>
    </div>
  );
};

export default LabelAndCreateBtn;
