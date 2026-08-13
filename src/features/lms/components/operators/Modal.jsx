import { X } from "lucide-react";

export function Modal({ open, title, onClose, children, large }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`max-h-full w-full overflow-hidden rounded-[17px] bg-white shadow-2xl ${
          large ? "max-w-[850px]" : "max-w-[520px]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
          <h2 className="text-base font-bold">{title}</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={21} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

export function ModalFooter({ children }) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}