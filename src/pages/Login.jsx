import { useState } from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ empId: "", password: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/home");
  };

  const fields = [
    { name: "empId", type: "text", placeholder: "Employee ID", Icon: BadgeOutlinedIcon },
    { name: "password", type: "password", placeholder: "Password", Icon: LockOutlinedIcon },
  ];

  return (
    <AuthLayout
      welcomeTitle="Welcome Back!"
      welcomeText="Login to access the NTF Attendance & Manpower Management System."
      title="Login"
      subtitle="Welcome back, please login to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map(({ name, type, placeholder, Icon }) => (
          <div key={name} className="flex items-center border rounded-lg px-5 h-12">
            <Icon className="text-gray-400" />
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full ml-3 outline-none"
            />
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-lg bg-gradient-to-r from-primary-light to-primary-dark text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
