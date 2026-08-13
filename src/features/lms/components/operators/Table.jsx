export function TableHeader({ children }) {
  return (
    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
      {children}
    </th>
  );
}

export function TableCell({ children, bold }) {
  return (
    <td
      className={`border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4 ${
        bold ? "font-semibold text-[#344760]" : ""
      }`}
    >
      {children}
    </td>
  );
}

export function ActionButton({ children, onClick, danger, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-lg transition ${
        danger
          ? "bg-[#fff0ee] text-[#e74c3c] hover:bg-[#ffe3df]"
          : "bg-[#f0ecff] text-[#6F4AE7] hover:bg-[#e6dfff]"
      }`}
    >
      {children}
    </button>
  );
}