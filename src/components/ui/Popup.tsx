"use client";
import React, { useRef, MouseEvent } from "react";

interface PopupProps {
  isLoading: boolean;
  title: string;
  message: string;
  isOpen: boolean;
  closeFunc: () => void;
  submitFunc: () => Promise<void>;
}
const Popup: React.FC<PopupProps> = ({
  isLoading,
  title,
  message,
  isOpen,
  closeFunc,
  submitFunc,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const clickOutToClose = (e: MouseEvent<HTMLDivElement>) => {
    if (!popupRef.current?.contains(e.target as Node)) {
      closeFunc();
    }
  };
  const handleSubmit = async () => {
    await submitFunc();
    closeFunc();
  };
  if (!isOpen) return null;
  return (
    <div
      className="z-100 fixed top-0 left-0 w-full h-screen flex items-center bg-[#0000003d]"
      onClick={clickOutToClose}
    >
      <div
        ref={popupRef}
        className="w-full sm:w-[80%] md:w-[40%] xl:w-[30%] m-auto h-auto flex flex-col gap-3 bg-white rounded-md p-5"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-zinc-600 pl-2">{message}</p>
        </div>
        <div className="w-full flex flex-row items-center justify-end gap-2">
          <button
            type="button"
            className="bg-[#353333] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#4D4848] transition cursor-pointer"
            onClick={closeFunc}
          >
            Huỷ
          </button>
          <button
            disabled={isLoading}
            type="button"
            className="bg-[#998264] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#a59075] transition cursor-pointer"
            onClick={handleSubmit}
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
