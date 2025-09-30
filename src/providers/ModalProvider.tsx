"use client";

import Modal from "@/components/ui/Modal";
import { createContext, useContext, useState, useEffect } from "react";

interface ModalContextType {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);

    const handleKeyDown = (e: KeyboardEvent) =>
      e.code === "Escape" && closeModal();

    isOpen && window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openModal = (c: React.ReactNode) => {
    setContent(c);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal isOpen={isOpen} onClose={closeModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
