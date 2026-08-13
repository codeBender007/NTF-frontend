import { useState } from "react";
import {
  EMPTY_OPERATOR_FORM,
  JOINING_LEAVING_OPTIONS,
  LEVEL_OPTIONS,
  STATUS_OPTIONS,
} from "../../utils/operatorUtils";
import { Modal, ModalFooter } from "./Modal";

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

export function OperatorFormModal({ operator, departmentOptions, onClose, onSubmit }) {
  const [form, setForm] = useState(operator || EMPTY_OPERATOR_FORM);

  const setField = (key) => (event) => {
    setForm((previous) => ({
      ...previous,
      [key]: event.target.value,
    }));
  };

  return (
    <Modal
      open
      title={operator ? "Edit Operator" : "Add Operator"}
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Operator Name" required>
          <input
            autoFocus
            value={form.name || ""}
            onChange={setField("name")}
            placeholder="Enter operator name"
            className={inputClass}
          />
        </Field>

        <Field label="Emp Code" required>
          <input
            value={form.empCode || ""}
            onChange={setField("empCode")}
            placeholder="Enter employee code"
            className={inputClass}
          />
        </Field>

        <Field label="Primary Level">
          <select value={form.level || ""} onChange={setField("level")} className={inputClass}>
            <option value="">Select level</option>

            {LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date">
          <input
            type="date"
            value={form.date || ""}
            onChange={setField("date")}
            className={inputClass}
          />
        </Field>

        <Field label="Contact">
          <input
            value={form.contact || ""}
            onChange={setField("contact")}
            placeholder="Enter contact number"
            className={inputClass}
          />
        </Field>

        <Field label="Status">
          <select
            value={form.status || "Active"}
            onChange={setField("status")}
            className={inputClass}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
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

        <Field label="Joining/Leaving">
          <select
            value={form.joiningLeaving || "Joined"}
            onChange={setField("joiningLeaving")}
            className={inputClass}
          >
            {JOINING_LEAVING_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
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
          {operator ? "Save Changes" : "Save"}
        </button>
      </ModalFooter>
    </Modal>
  );
}