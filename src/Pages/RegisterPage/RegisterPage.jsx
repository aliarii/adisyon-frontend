import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { registerOwner } from "../../State/Auth/Action";

import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { error } = useSelector((store) => store.auth);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();

  const { register } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data.errors) setErrorMessage("");

      const validationErrors = error.response?.data?.errors || [];
      setErrors(validationErrors); // Set the errors array
      if (error.response && error.response.data.error)
        setErrorMessage(error.response?.data?.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerOwner({
        userData: { email, password, companyName, fullName },
        navigate,
        register,
      })
    );
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompanyName(event.target.value);
  };
  // Function to check if an error contains a specific field's name
  const getFieldErrors = (fieldName) => {
    return errors.filter((error) =>
      error.toLowerCase().includes(fieldName.toLowerCase())
    );
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-dark-7">
      <div className="flex flex-col w-80 md:w-96 m-auto p-4 rounded-xl bg-light-3 dark:bg-dark-5 gap-4">
        <h1 className="text-dark-7 dark:text-light-8 text-4xl font-semibold ">
          {t("Register")}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={t("Company Name")}
            name="companyName"
            value={companyName}
            onChange={handleCompanyChange}
          />
          {getFieldErrors("Company Name").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{t(error)}
            </h2>
          ))}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={t("Full Name")}
            name="fullName"
            value={fullName}
            onChange={handleFullNameChange}
          />
          {getFieldErrors("Full Name").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{t(error)}
            </h2>
          ))}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={t("Email")}
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {getFieldErrors("Email").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{t(error)}
            </h2>
          ))}
          {errorMessage && (
            <h2 className="-mt-4 text-sm text-red-500">*{errorMessage}</h2>
          )}

          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              className="w-full py-3 px-3 border-l border-y border-light-10 outline-none bg-white rounded-l-lg"
              placeholder={t("Password")}
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              className="px-3 flex items-center rounded-r-lg border-r border-y border-light-10 outline-none bg-white cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          {getFieldErrors("Password").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{t(error)}
            </h2>
          ))}

          <button
            className="w-full rounded-lg py-2 px-3 cursor-pointer bg-light-8 font-semibold text-xl"
            type="submit"
          >
            {t("Register")}
          </button>
        </form>
        <a
          className=" text-center cursor-pointer text-blue-700 dark:text-blue-500 font-bold no-underline text-sm"
          href="/adisyon-frontend/login"
        >
          {t("Back to Login")}
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
