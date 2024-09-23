"use client";
import { Close } from "@nine-thirty-five/material-symbols-react/outlined";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  icon?: ReactNode;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

export function Modal({
  icon,
  title,
  onClose,
  children,
  isOpen,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (isOpen) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }

    const handleDialogClose = () => {
      if (!dialogElement?.open) {
        onClose();
      }
    };

    dialogElement?.addEventListener("close", handleDialogClose);

    return () => {
      dialogElement?.removeEventListener("close", handleDialogClose);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
    dialogRef.current?.close();
  };

  return (
    <dialog
      className={`modal max-sm:modal-bottom ${className}`}
      ref={dialogRef}
    >
      <div className="modal-box w-fit flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-4">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center">
                {icon}
              </div>
            )}
            <h3>{title}</h3>
          </div>
          <div className="flex items-center">
            <button onClick={handleClose} className="cursor-pointer">
              <Close className="w-8 h-8"/>
            </button>
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
}
