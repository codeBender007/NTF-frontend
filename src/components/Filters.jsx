import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: "32px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "6px 12px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
};

const menuProps = {
  PaperProps: {
    sx: {
      "& .MuiMenuItem-root": {
        fontSize: "13px",
        minHeight: "34px",
      },
    },
  },
};

const Filters = ({
  values: externalValues,
  onChange: externalOnChange,
  departmentOptions = ["Assembly", "Production", "Quality"],
  subDepartmentOptions = ["Sub 1", "Sub 2"],
  lineOptions = ["Line 1", "Line 2", "Line 3"],
  machineOptions = ["Machine 1", "Machine 2", "Machine 3"],
  machineLabel = "Shift",
  showDates = true,
}) => {
  const [internalValues, setInternalValues] = useState({
    department: "",
    subDepartment: "",
    line: "",
    machine: "",
    fromDate: "",
    toDate: "",
  });

  const values = externalValues ?? internalValues;

  const updateValue = (key) => (event) => {
    const next = { ...values, [key]: event.target.value };

    if (externalOnChange) {
      externalOnChange(next);
    } else {
      setInternalValues(next);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-3">Filters</h2>

      <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-3">
        <FormControl fullWidth size="small" sx={inputSx}>
          <InputLabel>Department</InputLabel>

          <Select
            value={values.department}
            label="Department"
            onChange={updateValue("department")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            {departmentOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={inputSx}>
          <InputLabel>Sub Department</InputLabel>

          <Select
            value={values.subDepartment}
            label="Sub Department"
            onChange={updateValue("subDepartment")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            {subDepartmentOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={inputSx}>
          <InputLabel>Line</InputLabel>

          <Select
            value={values.line}
            label="Line"
            onChange={updateValue("line")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            {lineOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={inputSx}>
          <InputLabel>{machineLabel}</InputLabel>

          <Select
            value={values.machine}
            label={machineLabel}
            onChange={updateValue("machine")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            {machineOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {showDates && (
          <>
            <TextField
              fullWidth
              size="small"
              label="From Date"
              type="date"
              value={values.fromDate}
              onChange={updateValue("fromDate")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                ...inputSx,
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                  height: "32px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="To Date"
              type="date"
              value={values.toDate}
              onChange={updateValue("toDate")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                ...inputSx,
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                  height: "32px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Filters;
