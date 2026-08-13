import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const defaultOperator = {
  name: "RAM",
  employeeId: "FNG",
  department: "HR",
  section: "80",
  line: "N/A",
  subSection: "N/A",
  station: "N/A",
  level: "L1",
  efficiency: "0%",
  status: "ON LEAVE",
  email: "fng@fme-minda.co.in",
  phone: "N/A",
  designation: "Operator",
  contractor: "N/A",
  employeeType: "Regular",
  shift: "N/A",
  fatherHusband: "—",
  gender: "MALE",
  dob: "—",
  qualification: "Not Specified",
  joiningDate: "—",
  district: "—",
  pinCode: "—",
  busRoute: "Self / Not Assigned",
  desk: "—",
  pktCode: "—",
  gradeRule: "Self / Not Assigned",
};

const InfoRow = ({ icon: Icon, label, value, valueClass = "" }) => {
  return (
    <div className="flex items-start gap-3 border-b border-[#EEF0F5] py-3 last:border-b-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F1FF] text-[#6F4AE7]">
        <Icon sx={{ fontSize: 17 }} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-[#8B93A7]">{label}</p>
        <p
          className={`mt-1 text-[13px] font-semibold ${
            valueClass || "text-[#252B3A]"
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const PrimaryInfo = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#EEF0F5] bg-[#FBFCFE] p-3 transition hover:border-[#DDD5FF] hover:bg-white">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F1FF] text-[#6F4AE7]">
        <Icon sx={{ fontSize: 20 }} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-[#8B93A7]">{label}</p>

        <p className="mt-0.5 truncate text-sm font-semibold text-[#252B3A]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const STATUS_PILL_STYLES = {
  ACTIVE: "border-[#7BD6A4] bg-[#EEFBF4] text-[#16864A]",
  "ON LEAVE": "border-[#FFD9A8] bg-[#FFF4E5] text-[#E6920B]",
  LEFT: "border-[#FFD3D3] bg-[#FFF0EE] text-[#E74C3C]",
};

const StatusPill = ({ status }) => {
  const normalized = (status || "").toUpperCase();

  const styles =
    STATUS_PILL_STYLES[normalized] ||
    "border-[#E4E7EC] bg-[#F9FAFB] text-[#344054]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status || "—"}
    </span>
  );
};

const FlowBox = ({ icon: Icon, label, value, color = "purple" }) => {
  const colors = {
    purple: {
      bg: "bg-[#F5F2FF]",
      border: "border-[#DDD5FF]",
      icon: "text-[#6F4AE7]",
      value: "text-[#4F46B5]",
    },
    blue: {
      bg: "bg-[#F2F6FF]",
      border: "border-[#D6E1FF]",
      icon: "text-[#5575D9]",
      value: "text-[#4457A8]",
    },
    red: {
      bg: "bg-[#FFF4F4]",
      border: "border-[#FFD3D3]",
      icon: "text-[#FF4D4D]",
      value: "text-[#FF4D4D]",
    },
    green: {
      bg: "bg-[#EEFBF4]",
      border: "border-[#C7EED8]",
      icon: "text-[#1DA65B]",
      value: "text-[#16864A]",
    },
  };

  const c = colors[color];

  return (
    <div className={`rounded-lg border ${c.border} ${c.bg} px-2.5 py-2`}>
      <div className="flex items-center gap-1.5">
        <Icon sx={{ fontSize: 14 }} className={c.icon} />

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase text-[#8B93A7]">
            {label}
          </p>
          <p className={`text-[11px] font-bold ${c.value}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

const OperatorProfileDetails = ({ operator = defaultOperator }) => {
  const data = {
    ...defaultOperator,
    ...operator,
  };

  return (
    <div className="space-y-3 p-3 md:p-4 lg:p-5">
      {/* =========================================================
          TOP PROFILE HEADER
      ========================================================= */}
      <section className="rounded-2xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT PROFILE */}
          <div className="flex min-w-0 items-center gap-5">
            {/* Identity */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
                {data.name}
              </h1>

              <p className="mt-1 text-sm font-medium text-[#667085]">
                {data.employeeId}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[#A89CFF] bg-[#F7F5FF] px-3 py-1 text-xs font-semibold text-[#5B3BE6]">
                  {data.level}
                </span>

                <span className="inline-flex items-center rounded-full border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-1 text-xs font-semibold text-[#344054]">
                  {data.department}
                </span>

                <StatusPill status={data.status} />
              </div>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 self-start xl:self-center">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              <RefreshOutlinedIcon sx={{ fontSize: 16 }} />
              Refresh Data
            </button>

            <button
              type="button"
              className="flex h-10 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#667085] hover:bg-[#F9FAFB]"
            >
              <MoreVertOutlinedIcon sx={{ fontSize: 19 }} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN PROFILE AREA
      ========================================================= */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[220px_minmax(0,1fr)]">
        {/* =====================================================
            PRIMARY DETAILS
        ===================================================== */}
        <section className="rounded-2xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
          <div className="mb-3 flex items-center gap-2.5 border-b border-[#EEF0F5] pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#6F4AE7]">
              <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />
            </div>

            <h2 className="text-sm font-bold text-[#252B3A]">
              Primary Details
            </h2>
          </div>

          <div className="space-y-2">
            <PrimaryInfo
              icon={EmailOutlinedIcon}
              label="Email Address"
              value={data.email}
            />

            <PrimaryInfo
              icon={PhoneOutlinedIcon}
              label="Mobile Number"
              value={data.phone}
            />
          </div>
        </section>

        {/* =====================================================
            DETAILED PROFILE
        ===================================================== */}
        <section className="min-w-0 rounded-2xl border border-[#E8EAF0] bg-white p-5 shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
          {/* Header */}
          <div className="mb-4 flex items-center gap-2.5 border-b border-[#EEF0F5] pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#6F4AE7]">
              <BusinessOutlinedIcon sx={{ fontSize: 20 }} />
            </div>

            <h2 className="text-sm font-bold text-[#252B3A]">
              Detailed Profile Information
            </h2>
          </div>

          {/* THREE COLUMNS */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* PERSONAL */}
            <div className="rounded-2xl border border-[#EEF0F5] bg-[#FBFCFE] p-4">
              <div className="mb-2 flex items-center gap-2.5 border-b border-[#EEF0F5] pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FF] text-[#6F4AE7]">
                  <FamilyRestroomOutlinedIcon sx={{ fontSize: 18 }} />
                </div>

                <h3 className="text-[13px] font-bold text-[#252B3A]">
                  Personal
                </h3>
              </div>
              <InfoRow
                icon={FamilyRestroomOutlinedIcon}
                label="Father / Husband"
                value={data.fatherHusband}
              />

              <InfoRow
                icon={WcOutlinedIcon}
                label="Gender / DOB"
                value={`${data.gender} / ${data.dob}`}
              />

              <InfoRow
                icon={SchoolOutlinedIcon}
                label="Qualification"
                value={data.qualification}
                valueClass="inline-block rounded-md bg-[#F3F0FF] px-2 py-0.5 text-[#5B3BE6]"
              />

              <InfoRow
                icon={FlagOutlinedIcon}
                label="Joining Date"
                value={data.joiningDate}
              />
            </div>

            {/* PROFESSIONAL */}
            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-4">
              <div className="mb-3 flex items-center gap-2.5 border-b border-[#EEF0F5] pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FF] text-[#6F4AE7]">
                  <AccountTreeOutlinedIcon sx={{ fontSize: 18 }} />
                </div>

                <h3 className="text-[13px] font-bold text-[#252B3A]">
                  Professional
                </h3>
              </div>

              <p className="mb-3 text-[11px] font-bold text-[#344054]">
                Organizational Assignment Flow
              </p>

              <div className="flex flex-col items-center">
                {/* Department */}
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="w-[115px]">
                    <FlowBox
                      icon={ApartmentOutlinedIcon}
                      label="DEPT"
                      value={data.department}
                    />
                  </div>

                  <ArrowForwardIosOutlinedIcon
                    sx={{ fontSize: 12, color: "#A5ACBA" }}
                  />

                  <div className="relative w-[115px]">
                    <FlowBox
                      icon={AccountTreeOutlinedIcon}
                      label="SECTION"
                      value={data.section}
                    />

                    <span className="absolute -right-2 -top-2 rounded-full bg-[#6F4AE7] px-1.5 py-0.5 text-[7px] font-bold text-white">
                      Primary
                    </span>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-4 w-px border-l border-dashed border-[#A5ACBA]" />

                {/* Line */}
                <div className="flex w-full justify-center">
                  <FlowBox
                    icon={ApartmentOutlinedIcon}
                    label="LINE"
                    value={data.line}
                    color="blue"
                  />
                </div>

                <div className="h-4 w-px border-l border-dashed border-[#A5ACBA]" />

                {/* Sub section */}
                <div className="flex w-full justify-center">
                  <FlowBox
                    icon={LayersOutlinedIcon}
                    label="SUB-SECT"
                    value={data.subSection}
                    color="purple"
                  />
                </div>

                <div className="h-4 w-px border-l border-dashed border-[#A5ACBA]" />

                {/* Station + Level */}
                <div className="grid w-full grid-cols-2 gap-2">
                  <FlowBox
                    icon={SettingsOutlinedIcon}
                    label="STATION"
                    value={data.station}
                    color="red"
                  />

                  <FlowBox
                    icon={LayersOutlinedIcon}
                    label="LEVEL"
                    value={data.level}
                    color="purple"
                  />
                </div>

                <div className="h-3 w-px border-l border-dashed border-[#A5ACBA]" />

                {/* Efficiency */}
                <div className="w-1/2 min-w-[100px]">
                  <FlowBox
                    icon={SettingsOutlinedIcon}
                    label="EFFICIENCY"
                    value={data.efficiency}
                    color="green"
                  />
                </div>
              </div>
            </div>

            {/* LOCATION & TRANSIT */}
            <div className="rounded-2xl border border-[#EEF0F5] bg-[#FBFCFE] p-4">
              <div className="mb-2 flex items-center gap-2.5 border-b border-[#EEF0F5] pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FF] text-[#6F4AE7]">
                  <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                </div>

                <h3 className="text-[13px] font-bold text-[#252B3A]">
                  Location & Transit
                </h3>
              </div>

              <InfoRow
                icon={LocationOnOutlinedIcon}
                label="District & State"
                value={data.district}
              />

              <InfoRow
                icon={PinDropOutlinedIcon}
                label="PIN Code"
                value={data.pinCode}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OperatorProfileDetails;
