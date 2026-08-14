import { useState } from "react";
import { EMPTY_USER_FORM, ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../../utils/userUtils";
import { Modal, ModalFooter } from "../operators/Modal";

const inputClass =
  "h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none transition focus:border-[#6F4AE7]";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold">
        {label}

        {required && <span className="ml-0.5 text-[#e74c3c]">*</span>}
      </label>

      {children}
    </div>
  );
}

export function UserFormModal({ user, departmentOptions, onClose, onSubmit }) {
  const [form, setForm] = useState(user || EMPTY_USER_FORM);

  const setField = (key) => (event) => {
    setForm((previous) => ({
      ...previous,
      [key]: event.target.value,
    }));
  };

  return (
    <Modal
      open
      title={user ? "Edit User" : "Add User"}
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="User Name" required>
          <input
            autoFocus
            value={form.name || ""}
            onChange={setField("name")}
            placeholder="Enter user name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            value={form.email || ""}
            onChange={setField("email")}
            placeholder="Enter email address"
            className={inputClass}
          />
        </Field>

        <Field label="Role" required>
          <select value={form.role || ""} onChange={setField("role")} className={inputClass}>
            <option value="">Select role</option>

            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Department">
          <select
            value={form.department || ""}
            onChange={setField("department")}
            className={inputClass}
          >
            <option value="">Select department</option>

            {departmentOptions.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status">
          <select
            value={form.status || "Active"}
            onChange={setField("status")}
            className={inputClass}
          >
            {USER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <ModalFooter>
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
        >
          Cancel
        </button>

        <button
          onClick={() => onSubmit(form)}
          className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
        >
          {user ? "Save Changes" : "Save"}
        </button>
      </ModalFooter>
    </Modal>
  );
}