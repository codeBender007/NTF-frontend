import { Building2, CirclePlus, Pencil, Search, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/operatorUtils";
import { ActionButton, TableCell, TableHeader } from "./Table";
import { JoiningBadge, StatusBadge } from "./Badges";

const COLUMNS = [
  "Operator Name",
  "Emp Code",
  "Primary Level",
  "Date",
  "Contact",
  "Status",
  "Department",
  "Joining/Leaving",
  "Actions",
];

export function OperatorsTable({ rows, search, onSearchChange, onAdd, onEdit, onDelete, onView }) {
  return (
    <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
      {/* TABLE TOOLBAR */}

      <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-[#26364d]">Operators</h3>
        </div>

        <div className="relative w-full sm:w-auto sm:max-w-[300px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
          />
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead>
            <tr className="bg-[#f5f6f8]">
              {COLUMNS.map((column) => (
                <TableHeader key={column}>{column}</TableHeader>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="p-0">
                  <EmptyState onAdd={onAdd} />
                </td>
              </tr>
            ) : (
              rows.map((operator) => (
                <OperatorRow
                  key={operator.id}
                  operator={operator}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OperatorRow({ operator, onView, onEdit, onDelete }) {
  return (
    <tr className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]">
      <TableCell bold>
        <button
          type="button"
          onClick={() => onView(operator)}
          className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
        >
          {operator.name}
        </button>
      </TableCell>

      <TableCell>{operator.empCode}</TableCell>

      <TableCell>{operator.level}</TableCell>

      <TableCell>{formatDate(operator.date)}</TableCell>

      <TableCell>{operator.contact}</TableCell>

      <TableCell>
        <StatusBadge status={operator.status} />
      </TableCell>

      <TableCell>{operator.department}</TableCell>

      <TableCell>
        <JoiningBadge value={operator.joiningLeaving} />
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <ActionButton title="Edit operator" onClick={() => onEdit(operator)}>
            <Pencil size={15} />
          </ActionButton>

          <ActionButton danger title="Delete operator" onClick={() => onDelete(operator)}>
            <Trash2 size={15} />
          </ActionButton>
        </div>
      </TableCell>
    </tr>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Building2 size={42} className="mb-3 opacity-40" />

      <p className="mb-4 text-sm">No operators found.</p>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
      >
        <CirclePlus size={15} />
        Add Operator
      </button>
    </div>
  );
}