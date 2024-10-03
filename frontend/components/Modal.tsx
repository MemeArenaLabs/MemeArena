import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Close } from "@nine-thirty-five/material-symbols-react/outlined";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface ModalProps {
  icon?: ReactNode;
  title?: ReactNode;
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
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    dialogRef.current?.close();
  }, [onClose]);

  useOutsideClick(contentRef, handleClose);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className={`modal max-sm:modal-bottom ${className}`}
      ref={dialogRef}
    >
      <div
        className="modal-box w-fit flex flex-col gap-4 p-3 max-w-[720px] rounded-none bg-gradient-to-r from-[#3B4787BF] to-[#B35BE2BF] opacity-90"
        ref={contentRef}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-4">
            {icon && (
              <div className="flex h-6 w-6 items-center justify-center">
                {icon}
              </div>
            )}
            <h3 className="">{title}</h3>
          </div>
          <div className="flex items-center">
            <button onClick={handleClose} className="cursor-pointer">
              <Close className="w-6 h-6" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
}
