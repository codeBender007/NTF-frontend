export const LOCK_STATUS_OPTIONS = ["Locked", "Unlocked"];

export const SEED_OPERATOR_LEVELS = [
  {
    id: "101",
    operator: "Amit Sharma",
    primaryLevel: "L1",
    stationKill: 0,
    progress: 42,
    lockStatus: "Unlocked",
    lockAccessed: "2026-08-12",
  },
];

export const filterOperatorLevels = (
  rows,
  { search = "", lockStatus = "" } = {},
) => {
  const query = search.toLowerCase();

  return rows.filter((row) => {
    const text = [row.operator, row.primaryLevel, row.lockStatus]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesText = !query || text.includes(query);
    const matchesLockStatus = !lockStatus || row.lockStatus === lockStatus;

    return matchesText && matchesLockStatus;
  });
};
