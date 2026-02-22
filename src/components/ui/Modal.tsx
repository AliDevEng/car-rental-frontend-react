import type { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
}

const Modal = ({ open, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
