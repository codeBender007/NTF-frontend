// import { useState } from "react";
// import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ empId: "", password: "" });

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     navigate("/home");
//   };

//   const fields = [
//     { name: "empId", type: "text", placeholder: "Employee ID", Icon: BadgeOutlinedIcon },
//     { name: "password", type: "password", placeholder: "Password", Icon: LockOutlinedIcon },
//   ];

//   return (
//     <AuthLayout
//       welcomeTitle="Welcome Back!"
//       welcomeText="Login to access the NTF Attendance & Manpower Management System."
//       title="Login"
//       subtitle="Welcome back, please login to your account"
//     >
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {fields.map(({ name, type, placeholder, Icon }) => (
//           <div key={name} className="flex items-center border rounded-lg px-5 h-12">
//             <Icon className="text-gray-400" />
//             <input
//               type={type}
//               name={name}
//               placeholder={placeholder}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full ml-3 outline-none"
//             />
//           </div>
//         ))}

//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-password")}
//             className="text-sm font-medium text-primary hover:underline"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full h-12 rounded-lg bg-gradient-to-r from-primary-light to-primary-dark text-white font-semibold shadow-lg hover:opacity-90 transition"
//         >
//           Login
//         </button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Login;


import { useState } from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/images/ntf-login-bg.jpg";
import ntfLogo from "../assets/images/NTF_logo_black.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={loginBg}
        alt="NTF Group Holding"
        className="absolute inset-0 h-full w-full object-fill"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm rounded-2xl bg-white px-2 py-6 shadow-2xl sm:px-8">

          {/* Logo */}
          <div className="mb-2 flex justify-center">
            <img
              src={ntfLogo}
              alt="NTF Group Holding"
              className="h-25 w-30 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back, please login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Employee ID */}
            <div className="flex h-12 items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <BadgeOutlinedIcon className="text-gray-400" />

              <input
                type="text"
                name="empId"
                placeholder="Employee ID"
                value={formData.empId}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex h-12 items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <LockOutlinedIcon className="text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="ml-3 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-gradient-to-r from-primary-light to-primary-dark font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;