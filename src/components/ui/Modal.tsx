"use client";

import React, { FC } from "react";
import Button from "./Button";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <div
    onClick={onClose}
    className={clsx(
      "fixed inset-0 z-10 lg:z-5 flex items-center justify-center overlay-radials transition",
      isOpen
        ? "opacity-100 scale-100"
        : "opacity-0 scale-0 pointer-events-none",
    )}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full lg:max-w-[410px] lg:rounded-[28px] modal-wrapper-radials lg:bg-jaguar px-[42px] lg:px-[50px] pt-[157px] lg:pt-[90px] pb-[42px] lg:pb-[71px] text-black lg:shadow-inset-custom h-full lg:h-auto lg:max-h-[70dvh] overflow-y-auto flex flex-col"
    >
      <Button
        onClick={onClose}
        className="absolute top-7 right-7 size-8 flex items-center justify-center"
      >
        <img src="/cross.svg" alt="cross" />
      </Button>

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { onClose, isOpen } as {
            onClose?: () => void;
            isOpen?: boolean;
          });
        }
        return child;
      })}
    </div>
  </div>
);

export default Modal;
