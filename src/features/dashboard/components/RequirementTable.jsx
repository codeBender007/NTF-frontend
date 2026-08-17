import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RequirementPopup from "./RequirementPopup";

const requirementData = [
  {
    id: 1,
    code: "D01-1",
    sectionName: "D&D",
    lineDescription: "Engineering",
    approval: "System Approved",
    aug: { pp: 5, sp: 0, fn01: 0, fn02: 0 },
    sep: { pp: 5, sp: 0, fn01: 0, fn02: 0 },
    oct: { pp: 5, sp: 0, fn01: 0, fn02: 0 },
    nov: { pp: 5, sp: 0, fn01: 0, fn02: 0 },
    dec: { pp: 5, sp: 0, fn01: 0, fn02: 0 },
  },
  {
    id: 2,
    code: "D01-2",
    sectionName: "D&D",
    lineDescription: "Drafting",
    approval: "Pending",
    aug: { pp: 2, sp: 3, fn01: 1, fn02: 0 },
    sep: { pp: 2, sp: 3, fn01: 1, fn02: 0 },
    oct: { pp: 1, sp: 3, fn01: 1, fn02: 1 },
    nov: { pp: 1, sp: 2, fn01: 2, fn02: 1 },
    dec: { pp: 1, sp: 2, fn01: 2, fn02: 2 },
  },
];

const months = ["AUG", "SEP", "OCT", "NOV", "DEC"];

const approvalStyles = {
  "System Approved": {
    badge: "bg-green-100 text-green-700 ring-green-600/20",
    dot: "bg-green-500",
  },
  Pending: {
    badge: "bg-amber-100 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
  Rejected: {
    badge: "bg-red-100 text-red-700 ring-red-600/20",
    dot: "bg-red-500",
  },
};

const RequirementTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = requirementData.filter(
    (row) =>
      row.code.toLowerCase().includes(search.toLowerCase()) ||
      row.sectionName.toLowerCase().includes(search.toLowerCase()) ||
      row.lineDescription.toLowerCase().includes(search.toLowerCase()),
  );

  const displayedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const from = filteredData.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(filteredData.length, (page + 1) * rowsPerPage);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center shadow-sm">
            <AssignmentOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Requirement Records
            </h2>
            <p className="text-xs text-gray-500">
              View and manage manpower requirements
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
        >
          <AddCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          Add Requirement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="bg-gray-100/80">
              <th
                rowSpan={2}
                className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200"
              >
                Department Name
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200"
              >
                Sub-Department Name
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200"
              >
                Line Description
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200"
              >
                Machines
              </th>

              {months.map((month, idx) => (
                <th
                  key={month}
                  rowSpan={2}
                  className={`text-center text-xs font-bold text-white py-2.5 px-4 border-b border-r border-gray-200 ${
                    idx % 2 === 0 ? "bg-primary/90" : "bg-primary-light"
                  }`}
                >
                  {month}
                </th>
              ))}

              <th
                rowSpan={2}
                className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedData.length === 0 && (
              <tr>
                <td
                  colSpan={25}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No requirement records found
                </td>
              </tr>
            )}

            {displayedData.map((row, rowIdx) => {
              const approval =
                approvalStyles[row.approval] || approvalStyles.Pending;

              return (
                <tr
                  key={row.id}
                  className={`whitespace-nowrap transition hover:bg-primary/5 ${
                    rowIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-xs font-medium text-gray-700 border-b border-r border-gray-100">
                    {row.code}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700 border-b border-r border-gray-100">
                    {row.sectionName}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700 border-b border-r border-gray-100">
                    {row.lineDescription}
                  </td>
                  <td className="px-4 py-3 text-center border-b border-r border-gray-100">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${approval.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${approval.dot}`}
                      />
                      {row.approval}
                    </span>
                  </td>

                  {months.map((month) => {
                    const data = row[month.toLowerCase()];
                    const total = Object.values(data).reduce(
                      (sum, value) => sum + value,
                      0,
                    );
                    return (
                      <td
                        key={month}
                        className="px-4 py-3 text-center text-xs tabular-nums text-gray-700 border-b border-r border-gray-100"
                      >
                        {total}
                      </td>
                    );
                  })}

                  <td className="px-4 py-3 text-center border-b border-gray-100">
                    <div className="flex items-center justify-center gap-0.5">
                      <button
                        type="button"
                        title="Edit"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 hover:text-primary"
                      >
                        <EditOutlinedIcon
                          sx={{ color: "#F59E0B", fontSize: 18 }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
              {from}-{to} of {filteredData.length}
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

      <RequirementPopup open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default RequirementTable;