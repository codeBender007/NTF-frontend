import { CirclePlus, Layers, Lock, Pencil, Search, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/operatorUtils";
import { ActionButton, TableCell, TableHeader } from "../operators/Table";
import { LockStatusBadge } from "./Badges";

const COLUMNS = [
  "Operator",
  "Primary Level",
  "Station Kill",
  "Progress",
  "Lock Status",
  "Lock Accessed",
  "Actions",
];

export function LevelsTable({ rows, search, onSearchChange, onAdd, onEdit, onDelete }) {
  return (
    <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
      {/* TABLE TOOLBAR */}

      <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-[#26364d]">Operator Levels</h3>
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
              rows.map((row) => (
                <LevelRow
                  key={row.id}
                  row={row}
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

function LevelRow({ row, onEdit, onDelete }) {
  return (
    <tr className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]">
      <TableCell bold>{row.operator}</TableCell>

      <TableCell>
        <span className="inline-flex h-8 min-w-[48px] items-center justify-center rounded-lg bg-[#f0ecff] px-2 text-[13px] font-bold text-[#6F4AE7]">
          {row.primaryLevel}
        </span>
      </TableCell>

      <TableCell>
        <span className="font-semibold text-[#344760]">{row.stationKill}</span>
      </TableCell>

      <TableCell>
        <ProgressBar value={row.progress} />
      </TableCell>

      <TableCell>
        <LockStatusBadge status={row.lockStatus} />
      </TableCell>

      <TableCell>
        {row.lockStatus === "Locked" ? (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#e74c3c]">
            <Lock size={13} />
            {formatDate(row.lockAccessed)}
          </span>
        ) : (
          formatDate(row.lockAccessed)
        )}
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <ActionButton title="Edit operator level" onClick={() => onEdit(row)}>
            <Pencil size={15} />
          </ActionButton>

          <ActionButton danger title="Delete operator level" onClick={() => onDelete(row)}>
            <Trash2 size={15} />
          </ActionButton>
        </div>
      </TableCell>
    </tr>
  );
}

function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex min-w-[130px] items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
        <div
          className="h-full rounded-full bg-[#6F4AE7] transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <span className="w-9 text-right text-[12px] font-semibold text-[#344760]">
        {clamped}%
      </span>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Layers size={42} className="mb-3 opacity-40" />

      <p className="mb-4 text-sm">No operator levels found.</p>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
      >
        <CirclePlus size={15} />
        Add Operator Level
      </button>
    </div>
  );
}