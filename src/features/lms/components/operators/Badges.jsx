const STATUS_STYLES = {
  Active: "bg-[#e6f7ef] text-[#0f9d58]",
  "On Leave": "bg-[#fff4e0] text-[#e6920b]",
  Left: "bg-[#fff0ee] text-[#e74c3c]",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "-"}
    </span>
  );
}

export function JoiningBadge({ value }) {
  const joined = value === "Joined";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        joined ? "bg-[#e6f7ef] text-[#0f9d58]" : "bg-[#fff0ee] text-[#e74c3c]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${joined ? "bg-[#0f9d58]" : "bg-[#e74c3c]"}`} />

      {value || "-"}
    </span>
  );
}