import axios from "axios";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()
  // Formdata and error handling-------
  const [formData, setformData] = useState({ username: null, password: null });
  const [errors, setErrors] = useState({
    usernameError: "border-0",
    passwordError: "border-0",
  });
  // Miscellaneous---------
  const [showPass, setshowPass] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username)
      setErrors((prev) => ({
        ...prev,
        usernameError: "border-red-500 border-2",
      }));
    if (!formData.password)
      return setErrors((prev) => ({
        ...prev,
        passwordError: "border-red-500 border-2",
      }));
    setLoading(true)

    // ----API FETCH
    axios
      .post("https://api.freeapi.app/api/v1/users/login", formData, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      })
      .then((res) =>{
        console.log(res);
        navigate('/')
        toast.success("User logged in successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setLoading(false)
      }
      )
      .catch((err) =>{
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setLoading(false)
      }
      );
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#526D82]">
      <div className="px-10 pt-18 pb-10 bg-[#27374D] shadow-2xl mx-auto rounded-4xl">
        <h1 className="text-center text-gray-100 text-3xl mb-5">Login</h1>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col gap-3 justify-center">
              <h2 className="text-xl text-normal text-[#DDE6ED]">User Name</h2>
              <div
                className={`w-fit p-3 bg-slate-700 rounded-xl ${errors.usernameError}`}
              >
                <input
                  type="text"
                  className={`outline-0 w-100 px-4`}
                  onChange={(e) => {
                    setformData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, usernameError: null }));
                  }}
                />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-col gap-3 justify-center relative">
              <h2 className="text-xl text-normal text-[#DDE6ED]">Password</h2>
              <div
                className={`w-fit p-3 bg-slate-700 rounded-xl ${errors.passwordError}`}
              >
                <input
                  type={showPass ? "text" : "password"}
                  className={`outline-0 w-100 px-4`}
                  onChange={(e) => {
                    setformData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, passwordError: null }));
                  }}
                />
              </div>
              <button onClick={() => setshowPass(!showPass)}>
                {showPass ? (
                  <FaRegEyeSlash className="absolute top-14 right-4 text-xl text-slate-200" />
                ) : (
                  <FaRegEye className="absolute top-14 right-4 text-xl text-slate-200" />
                )}
              </button>
            </div>
            <button
              className="w-full py-2 bg-[#526D82] outline-0 rounded-xl mt-7 text-xl active:scale-90"
              onClick={handleSubmit}
              type="submit"
            >
              {Loading ? (
                <div className="mx-auto w-6 h-6 animate-spin border-4 border-t-4 border-t-white border-gray-500 rounded-full"></div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-300">
          Don't have an account?{" "}
          <Link className="text-lg font-semibold text-blue-400" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
