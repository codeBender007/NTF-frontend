export const OPERATORS_STORAGE_KEY = "lms_operators";
export const DEPARTMENTS_STORAGE_KEY = "lms_departments";

export const LEVEL_OPTIONS = ["Level 1", "Level 2", "Level 3", "Level 4"];
export const STATUS_OPTIONS = ["Active", "On Leave", "Left"];
export const JOINING_LEAVING_OPTIONS = ["Joined", "Left"];

export const EMPTY_OPERATOR_FORM = {
  name: "",
  empCode: "",
  level: "",
  date: "",
  contact: "",
  status: "Active",
  department: "",
  joiningLeaving: "Joined",
};

export const SEED_OPERATORS = [
  {
    id: "101",
    name: "Amit Sharma",
    empCode: "EMP-1001",
    level: "L1",
    date: "2026-01-12",
    contact: "+91 98765 10001",
    status: "Active",
    department: "Production",
    joiningLeaving: "Joined",
  },
];

export const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (value) => {
  if (!value) return "-";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};

export const unique = (list) => [...new Set(list.filter(Boolean))];

export const getSavedDepartments = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(DEPARTMENTS_STORAGE_KEY));

    if (Array.isArray(stored)) return stored.map((department) => department.name);
  } catch {
    /* ignore */
  }

  return [];
};

export const getDepartmentOptions = (operators) =>
  unique([...operators.map((operator) => operator.department), ...getSavedDepartments()]);

export const filterOperators = (
  operators,
  { search = "", department = "", fromDate = "", toDate = "" } = {},
) => {
  const query = search.toLowerCase();

  return operators.filter((operator) => {
    const text = [
      operator.name,
      operator.empCode,
      operator.level,
      operator.department,
      operator.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesText = !query || text.includes(query);
    const matchesDepartment = !department || operator.department === department;
    const matchesFromDate = !fromDate || !operator.date || operator.date >= fromDate;
    const matchesToDate = !toDate || !operator.date || operator.date <= toDate;

    return matchesText && matchesDepartment && matchesFromDate && matchesToDate;
  });
};