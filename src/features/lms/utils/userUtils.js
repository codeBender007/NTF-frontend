import { unique } from "./operatorUtils";

export { createId } from "./operatorUtils";

export const USERS_STORAGE_KEY = "lms_users";

export const ROLE_OPTIONS = [
  "Operator",
  "Supervisor",
  "Manager",
  "Admin",
  "HR Executive",
  "Quality Inspector",
];

export const USER_STATUS_OPTIONS = ["Active", "Inactive", "Pending", "Locked"];

export const EMPTY_USER_FORM = {
  name: "",
  email: "",
  role: "",
  department: "",
  status: "Active",
};

export const getUserDepartmentOptions = (users) =>
  unique([
    ...users.map((user) => user.department),
    "Production",
    "Quality",
    "HR",
    "Admin",
  ]);

export const SEED_USERS = [
  {
    id: "101",
    name: "Rahul Sharma",
    email: "rahul@company.com",
    role: "Operator",
    department: "Production",
    status: "Active",
  },
];

export const filterUsers = (users, { search = "", department = "" } = {}) => {
  const query = search.toLowerCase();

  return users.filter((user) => {
    const text = [
      user.name,
      user.email,
      user.role,
      user.department,
      user.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesText = !query || text.includes(query);
    const matchesDepartment = !department || user.department === department;

    return matchesText && matchesDepartment;
  });
};
