import axios from "axios";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate()
  // State------------
  const [showPass, setshowPass] = useState(false);
  const [Loading, setLoading] = useState(false);
  // Inputs----------
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Error----------
  const [usernameError, setusernameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (!userName) setusernameError("border-red-500 border-2");
    if (!email) setemailError("border-red-500 border-2");
    if (!password) setpasswordError("border-red-500 border-2");
    if (!confirm) return setConfirmError("border-red-500 border-2");

    setLoading(true);

    if (password != confirm) {
      setLoading(false)
      setConfirmError("border-red-500 border-2")
      return;
    } else {
      axios
        .post(
          "https://api.freeapi.app/api/v1/users/register",
          {
            email,
            password,
            role: "ADMIN",
            username: userName,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          navigate('/')
          toast.success("Successfully signed up!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.response.data.message}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#526D82]">
      <div className="px-10 pt-18 pb-10 bg-[#27374D] shadow-2xl mx-auto rounded-4xl">
        <h1 className="text-center text-gray-100 text-3xl mb-5">Sign Up</h1>
        <div className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-3 justify-center">
            <h2 className="text-xl text-normal text-[#DDE6ED]">User Name</h2>
            <form
              className={`w-fit p-3 bg-slate-700 rounded-xl ${usernameError}`}
              onSubmit={handleForm}
            >
              <input
                type="text"
                className={`outline-0 w-100 px-4`}
                onChange={(e) => {
                  setuserName(e.target.value.toLowerCase());
                  setusernameError(null);
                }}
              />
            </form>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-3 justify-center">
            <h2 className="text-xl text-normal text-[#DDE6ED]">Email</h2>
            <form
              className={`w-fit p-3 bg-slate-700 rounded-xl ${emailError}`}
              onSubmit={handleForm}
            >
              <input
                type="email"
                className={`outline-0 w-100 px-4 `}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setemailError(null);
                }}
              />
            </form>
          </div>
          {/* Password */}
          <div className="flex flex-col gap-3 justify-center relative">
            <h2 className="text-xl text-normal text-[#DDE6ED]">Password</h2>
            <form
              className={`w-fit p-3 bg-slate-700 rounded-xl ${passwordError}`}
              onSubmit={handleForm}
            >
              <input
                type={showPass ? "text" : "password"}
                className={`outline-0 w-100 px-4`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setpasswordError(null);
                }}
              />
            </form>
            <button onClick={() => setshowPass(!showPass)}>
              {showPass ? (
                <FaRegEyeSlash className="absolute top-14 right-4 text-xl text-slate-200" />
              ) : (
                <FaRegEye className="absolute top-14 right-4 text-xl text-slate-200" />
              )}
            </button>
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-3 justify-center relative">
            <h2 className="text-xl text-normal text-[#DDE6ED]">
              Confirm Password
            </h2>
            <form
              className={`w-fit p-3 bg-slate-700 rounded-xl ${confirmError}`}
              onSubmit={handleForm}
            >
              <input
                type={showPass ? "text" : "password"}
                className={`outline-0 w-100 px-4`}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setConfirmError(null);
                }}
              />
            </form>
          </div>
        </div>

        <button
          className="w-full py-2 bg-[#526D82] outline-0 rounded-xl mt-15 text-xl active:scale-90"
          onClick={handleForm}
        >
          {Loading ? (
            <div className="mx-auto w-6 h-6 animate-spin border-4 border-t-4 border-t-white border-gray-500 rounded-full"></div>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="mt-4 text-lg font-semibold text-slate-300">Already have an account? <Link className="text-lg font-semibold text-blue-400" to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
// w-110 h-130
