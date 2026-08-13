import { Modal, ModalFooter } from "./Modal";

export function ConfirmDeleteModal({ open, name, onClose, onConfirm }) {
  return (
    <Modal open={open} title="Confirm Delete" onClose={onClose}>
      <div className="text-sm leading-6 text-gray-600">
        Are you sure you want to delete{" "}
        <strong className="text-gray-900">"{name}"</strong>?
      </div>

      <ModalFooter>
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded-lg bg-[#fff0ee] px-4 py-2.5 text-xs font-semibold text-[#e74c3c]"
        >
          Delete
        </button>
      </ModalFooter>
    </Modal>
  );
}