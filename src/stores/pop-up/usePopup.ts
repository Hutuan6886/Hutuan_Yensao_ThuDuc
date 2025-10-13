import { create } from "zustand";

type ContentType = {
  title: string;
  message: string;
  submitPopup: () => Promise<void>;
};
interface popupState {
  content: ContentType;
  isPopupOpen: boolean;
  setPopupOpen: (content: ContentType) => void;
  closePopup: () => void;
}

export const usePopup = create<popupState>((set) => ({
  content: {
    title: "",
    message: "",
    submitPopup: async () => {},
  },
  isPopupOpen: false,
  setPopupOpen: (content) => set({ content, isPopupOpen: true }),
  closePopup: () =>
    set({
      content: {
        title: "",
        message: "",
        submitPopup: async () => {},
      },
      isPopupOpen: false,
    }),
}));
