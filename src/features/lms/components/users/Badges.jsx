const STATUS_STYLES = {
  Active: "bg-[#e6f7ef] text-[#0f9d58]",
  Inactive: "bg-[#eef0f3] text-[#6b7280]",
  Pending: "bg-[#fff4e0] text-[#e6920b]",
  Locked: "bg-[#fff0ee] text-[#e74c3c]",
};

const DOT_STYLES = {
  Active: "bg-[#0f9d58]",
  Inactive: "bg-[#6b7280]",
  Pending: "bg-[#e6920b]",
  Locked: "bg-[#e74c3c]",
};

export function UserStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          DOT_STYLES[status] || "bg-gray-400"
        }`}
      />

      {status || "-"}
    </span>
  );
}
