"use client";
import React, { ChangeEvent, forwardRef, useEffect, useRef } from "react";
import { Textarea } from "./textarea";

interface AutoResizeTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ placeholder, value, onChange, ...props }, ref) => {
  /*
    + ref là ref từ {...register()} của react-hook-form, được truyền từ form cha xuống AutoResizeTextarea,
    + innerRef là ref nội bộ của AutoResizeTextarea component,
    + Và vì chỉ có một ref thực sự được gắn vào DOM nên cần merge hai ref này lại để cả hai cùng trỏ đến cùng một phần tử <textarea> thật.
*/
  const innerRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = innerRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }

    // Gọi cả onChange bên ngoài (từ register)
    onChange?.(e);
  };

  useEffect(() => {
    const el = innerRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);

  const setRefs = (element: HTMLTextAreaElement) => {
      // Gộp ref: để react-hook-form và AutoResize cùng truy cập được, function tự động gọi mỗi khi <Textarea .../> mount/unmount
    innerRef.current = element;
    if (typeof ref === "function") ref(element); // Nếu ref là dạng callback, truyền element ngược ra ngoài ref function của component cha
    else if (ref) ref.current = element; // Nếu ref là object thì gán trực tiếp: ref.current = element (merge innerRef vào ref của {...register} truyền vào)
  };

  return (
    <Textarea
      ref={setRefs}
      value={value}
      {...props}
      onChange={handleInput}
      rows={1}
      className="h-fit overflow-hidden resize-none"
      placeholder={placeholder}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
export default AutoResizeTextarea;
