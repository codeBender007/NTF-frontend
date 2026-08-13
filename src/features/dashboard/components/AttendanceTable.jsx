import { useState } from "react";
import {
  TablePagination,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

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
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [statusFilter] = useState("");
  const [shiftFilter] = useState("");

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.employee.toLowerCase().includes(search.toLowerCase()) ||
        row.empId.toLowerCase().includes(search.toLowerCase()) ||
        row.department.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || row.status === statusFilter) &&
      (shiftFilter === "" || row.shift === shiftFilter),
  );

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
            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No attendance records found
                </td>
              </tr>
            )}

            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIdx) => {
                const status = statusStyles[row.status] || statusStyles.Present;

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
                      <Tooltip title="More actions">
                        <IconButton
                          size="small"
                          onClick={handleMenuOpen}
                          sx={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "10px",
                            color: "#6B7280",
                            "&:hover": {
                              borderColor: "#6F4AE7",
                              color: "#6F4AE7",
                              bgcolor: "primary/5",
                            },
                          }}
                        >
                          <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Row actions menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(17,24,39,0.12)",
                mt: 1,
                minWidth: 160,
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ fontSize: 13, py: 1 }}>
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ fontSize: 13, py: 1 }}>
            Edit Record
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            sx={{ fontSize: 13, py: 1, color: "#EF4444" }}
          >
            Delete
          </MenuItem>
        </Menu>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            borderTop: "1px solid #E5E7EB",
            ".MuiTablePagination-toolbar": {
              minHeight: "48px",
            },
            ".MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows":
              {
                fontSize: "12px",
                color: "#6B7280",
              },
            ".MuiTablePagination-select": {
              borderRadius: "6px",
              border: "1px solid #E5E7EB",
              padding: "4px 8px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceTable;
