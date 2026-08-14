import { CirclePlus, Pencil, Search, Trash2, Users } from "lucide-react";
import { ActionButton, TableCell, TableHeader } from "../operators/Table";
import { UserStatusBadge } from "./Badges";

const COLUMNS = [
  "User Name",
  "Email",
  "Role",
  "Department",
  "Status",
  "Actions",
];

export function UsersTable({ rows, search, onSearchChange, onAdd, onEdit, onDelete }) {
  return (
    <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
      {/* TABLE TOOLBAR */}

      <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-[#26364d]">Users</h3>
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
        <table className="w-full min-w-[800px] border-collapse">
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
              rows.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
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

function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]">
      <TableCell bold>
        <button
          type="button"
          className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
        >
          {user.name}
        </button>
      </TableCell>

      <TableCell>{user.email}</TableCell>

      <TableCell>{user.role}</TableCell>

      <TableCell>{user.department}</TableCell>

      <TableCell>
        <UserStatusBadge status={user.status} />
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <ActionButton title="Edit user" onClick={() => onEdit(user)}>
            <Pencil size={15} />
          </ActionButton>

          <ActionButton danger title="Delete user" onClick={() => onDelete(user)}>
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
      <Users size={42} className="mb-3 opacity-40" />

      <p className="mb-4 text-sm">No users found.</p>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
      >
        <CirclePlus size={15} />
        Add User
      </button>
    </div>
  );
}
