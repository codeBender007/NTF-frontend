const LOCK_STATUS_STYLES = {
  Locked: "bg-[#fff0ee] text-[#e74c3c]",
  Unlocked: "bg-[#e6f7ef] text-[#0f9d58]",
};

export function LockStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        LOCK_STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "-"}
    </span>
  );
}