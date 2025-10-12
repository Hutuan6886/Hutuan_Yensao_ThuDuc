import toast from "react-hot-toast";

export function useCopyClipboard() {
  const copy = async (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast.success("Copy đường dẫn ảnh bìa thành công", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    }
  };

  return { copy };
}
