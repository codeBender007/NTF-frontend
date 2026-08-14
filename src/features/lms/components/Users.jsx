import { useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Filters from "../../../components/Filters";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useToast } from "../../../hooks/useToast";
import { ConfirmDeleteModal } from "./operators/ConfirmDeleteModal";
import { UserFormModal } from "./users/UserFormModal";
import { UsersTable } from "./users/UsersTable";
import {
  SEED_USERS,
  USERS_STORAGE_KEY,
  createId,
  filterUsers,
  getUserDepartmentOptions,
} from "../utils/userUtils";

const Users = () => {
  const [users, setUsers] = useLocalStorage(USERS_STORAGE_KEY, SEED_USERS);
  const [filterValues, setFilterValues] = useState({});
  const [search, setSearch] = useState("");

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { message: toast, showToast } = useToast();

  const departmentOptions = useMemo(
    () => getUserDepartmentOptions(users),
    [users],
  );

  const tableRows = useMemo(
    () => filterUsers(users, { search, department: filterValues.department }),
    [users, search, filterValues],
  );

  /* ============================================================
     FORM ACTIONS
  ============================================================ */

  const openAddModal = () => {
    setEditingUser(null);
    setFormModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormModalOpen(true);
  };

  const handleSubmit = (form) => {
    const name = form.name?.trim();
    const email = form.email?.trim();

    if (!name) {
      showToast("Please enter user name.");
      return;
    }

    if (!email) {
      showToast("Please enter email address.");
      return;
    }

    const duplicate = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.id !== editingUser?.id,
    );

    if (duplicate) {
      showToast("Email already exists.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...form, name, email }
            : user,
        ),
      );

      showToast("User updated successfully.");
    } else {
      setUsers((previous) => [
        ...previous,
        { id: createId("user"), ...form, name, email },
      ]);

      showToast("User added successfully.");
    }

    setFormModalOpen(false);
  };

  /* ============================================================
     DELETE ACTIONS
  ============================================================ */

  const openDeleteModal = (user) => {
    setDeleteTarget(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    setUsers((previous) =>
      previous.filter((user) => user.id !== deleteTarget.id),
    );

    showToast("User deleted successfully.");

    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="text-[#26364d]">
      <section className="py-4">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* PAGE HEADER */}
          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <ManageAccountsOutlinedIcon sx={{ fontSize: 21 }} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Users Management</h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage users, access and account status
                </p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6] sm:w-auto"
            >
              <CirclePlus size={16} />
              Add User
            </button>
          </div>

          {/* FILTERS */}
          <div className="m-4 sm:m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={departmentOptions}
              subDepartmentOptions={["Sub 1", "Sub 2", "Sub 3"]}
              lineOptions={["Line 1", "Line 2", "Line 3"]}
              machineOptions={["Morning", "Evening", "Night"]}
              machineLabel="Shift"
            />
          </div>

          {/* TABLE */}
          <UsersTable
            rows={tableRows}
            search={search}
            onSearchChange={setSearch}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </div>
      </section>

      {/* ADD / EDIT MODAL */}
      {formModalOpen && (
        <UserFormModal
          key={editingUser?.id || "add"}
          user={editingUser}
          departmentOptions={departmentOptions}
          onClose={() => setFormModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        open={deleteModalOpen}
        name={deleteTarget?.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#5A38D6] bg-[#6F4AE7] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Users;