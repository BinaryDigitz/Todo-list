import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { setUser, setToken, baseUrl } = useContext(AppContext);
  const [formState, setFormState] = useState("Login");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const disableBTN = formData.email.length < 6 || formData.password.length < 6;

  function toggleFormState() {
    clearForm()
    if (formState === "Login") {
      return setFormState("Sign Up");
    }
    return setFormState("Login");
  }
function clearForm(){
    return setFormData({
        name:'', email:'', password:''
    })
}
  async function handlePostData(body, endpoint) {
    const { data } = await axios.post(baseUrl + endpoint, body);
    const { success, message, token, user } = data;

    if (success) {
      toast.success(message);
      localStorage.setItem("token", token);
      setToken("token");
      setUser(user);
      return;
    }
    setError(message);
   
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (formData === "Login") {
        const formDatas = new FormData();
        formDatas.append("email", formData.email);
        formDatas.append("email", formData.password);
        await handlePostData(formDatas, '/api/auth/body');
      }
      await handlePostData(formData, '/api/auth/sign-up')
      setLoading(false);
      clearForm()

    } catch (ex) {
      setError(ex.message)
      setLoading(false)
      clearForm()
    }
  }
  return (
    <div className="grid place-items-center text-center mt-5">
      <div>
        {formState === "Login" ? (
          <h2 className="heading3 ">Welcome Back!</h2>
        ) : (
          <h2 className="heading3 ">Create Your Account</h2>
        )}

        <form
          onSubmit={handleFormSubmit}
          className="shadow-lg bg-white rounded w-sm p-6 h-[400px] mt-4"
        >
          <h1 className="heading4 text-center mb-5">{formState}</h1>
          {formState !== "Login" && (
            <div className="border border-neutral-600 mb-3 flex px-2 gap-2 rounded py-1.5 shadow">
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="black"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
              <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                placeholder="Mary Jones"
                required
                autoComplete="full name"
                className="bg-transparent outline-none border-none"
              />
            </div>
          )}
          <div className="border border-neutral-600 mb-3 flex px-2 gap-2 rounded py-1.5 shadow">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>{" "}
            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="bg-transparent outline-none border-none"
            />
          </div>
          <div className="border border-neutral-600 mb-3 flex px-2 gap-2 rounded py-1.5 shadow">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
            </svg>{" "}
            <input
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              placeholder="Password"
              required
              autoComplete="password"
              className="bg-transparent outline-none border-none"
            />
          </div>
          {formState === "Login" && (
            <p className="text-indigo-800 text-sm my-0.5 cursor-pointer">
              Forgot password
            </p>
          )}

          <button
            disabled={disableBTN}
            type="submit"
            className="bg-neutral-700 disabled:bg-neutral-400 hover:bg-neutral-600 text-white w-full py-1.5 rounded mt-5 cursor-pointer"
          >
            {isLoading ? "Loading..." : formState}
          </button>
          <hr className="text-neutral-500 my-5 mx-auto w-4/5" />
          {formState === "Login" ? (
            <p className="flex items-center justify-around">
              <span className="text-xs text-gray-700">
                Don't have an account?
              </span>
              <span
                onClick={toggleFormState}
                className="text-indigo-700 cursor-pointer"
              >
                Create account
              </span>
            </p>
          ) : (
            <p className="flex items-center justify-around">
              <span className="text-xs text-gray-700">
                Already have an account?
              </span>
              <span
                onClick={toggleFormState}
                className="text-indigo-700 cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        </form>
      </div>
    </div>
  );
}
export default Login;
