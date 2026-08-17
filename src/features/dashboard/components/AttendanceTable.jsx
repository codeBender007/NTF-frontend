import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const rows = [
  {
    id: 1,
    empId: "NTF00123",
    employee: "Rohit Sharma",
    department: "Production",
    subDepartment: "Assembly",
    line: "Line 1",
    shift: "Shift A",
    date: "01 Aug 2026",
    checkIn: "08:55 AM",
    checkOut: "05:35 PM",
    status: "Active",
    workHours: "8h 40m",
  },
];

const statusStyles = {
  Active: {
    badge: "bg-green-100 text-green-700 ring-green-600/20",
    dot: "bg-green-500",
  },
  Inactive: {
    badge: "bg-red-100 text-red-700 ring-red-600/20",
    dot: "bg-red-500",
  },
};

const AttendanceTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search] = useState("");
  const [statusFilter] = useState("");
  const [shiftFilter] = useState("");
  const [menu, setMenu] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, rowId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenu({ rowId, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const handleMenuClose = () => {
    setMenu(null);
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.employee.toLowerCase().includes(search.toLowerCase()) ||
        row.empId.toLowerCase().includes(search.toLowerCase()) ||
        row.department.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || row.status === statusFilter) &&
      (shiftFilter === "" || row.shift === shiftFilter),
  );

  const displayedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const from = filteredRows.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(filteredRows.length, (page + 1) * rowsPerPage);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center shadow-sm">
            <PeopleAltIcon sx={{ color: "#fff", fontSize: 22 }} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Attendance Records
            </h2>
            <p className="text-xs text-gray-500">Employee attendance details</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-gray-100/80">
              {[
                "Employee ID",
                "Name",
                "Department",
                "Sub Dept.",
                "Line",
                "Shift",
                "Date",
                "Check In",
                "Check Out",
                "Status",
                "Work Hrs.",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200 ${
                    head === "Actions" ? "text-center" : "text-left"
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayedRows.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No attendance records found
                </td>
              </tr>
            )}

            {displayedRows.map((row, rowIdx) => {
              const status = statusStyles[row.status] || statusStyles.Active;

              return (
                <tr
                  key={row.id}
                  className={`whitespace-nowrap transition hover:bg-primary/5 ${
                    rowIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-r border-gray-100">
                    {row.empId}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-100">
                    <span className="text-xs font-medium text-gray-500">
                      {row.employee}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
                    {row.department}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
                    {row.subDepartment}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
                    {row.line}
                  </td>

                  <td className="px-4 py-3 border-b border-r border-gray-100">
                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-500">
                      {row.shift}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
                    {row.date}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-r border-gray-100">
                    {row.checkIn}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-r border-gray-100">
                    {row.checkOut}
                  </td>

                  <td className="px-4 py-3 text-center border-b border-r border-gray-100">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${status.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                      />
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs tabular-nums font-medium text-gray-500 border-b border-r border-gray-100">
                    {row.workHours}
                  </td>

                  <td className="px-4 py-3 text-center border-b border-gray-100">
                    <button
                      type="button"
                      title="More actions"
                      onClick={(event) => handleMenuOpen(event, row.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#6F4AE7] hover:text-[#6F4AE7]"
                    >
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Row actions menu */}
        {menu && (
          <>
            <div className="fixed inset-0 z-40" onClick={handleMenuClose} />
            <div
              className="fixed z-50 min-w-[160px] rounded-xl bg-white py-1 shadow-xl"
              style={{ top: menu.top, right: menu.right }}
            >
              <button
                type="button"
                onClick={handleMenuClose}
                className="block w-full px-4 py-2 text-left text-[13px] text-gray-700 hover:bg-gray-100"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={handleMenuClose}
                className="block w-full px-4 py-2 text-left text-[13px] text-gray-700 hover:bg-gray-100"
              >
                Edit Record
              </button>
              <button
                type="button"
                onClick={handleMenuClose}
                className="block w-full px-4 py-2 text-left text-[13px] text-[#EF4444] hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {/* Pagination */}
        <div className="flex min-h-[48px] items-center justify-between gap-2 border-t border-[#E5E7EB] px-2">
          <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
            <span>Rows per page</span>

            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="cursor-pointer rounded-md border border-[#E5E7EB] bg-white py-1 pl-2 pr-6 text-[11px] text-[#6B7280] outline-none focus:border-[#6F4AE7]"
            >
              {[10, 25, 50].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6B7280]">
              {from}-{to} of {filteredRows.length}
            </span>

            <button
              type="button"
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              className="flex h-8 w-8 items-center justify-center rounded text-[#6B7280] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: 20 }} />
            </button>

            <button
              type="button"
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded text-[#6B7280] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;