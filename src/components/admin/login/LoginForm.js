import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../../common/FormError";
import { LOGIN_URL } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import styles from "../../formElements/Form.module.css";
import styles2 from "../../formElements/Button.module.css";

const url = LOGIN_URL;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);

      setAuth(response.data);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError("Sorry, something wrong happened, try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <div disabled={submitting}>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" name="username" {...register("identifier")} />
          {errors.identifier && <FormError>{errors.identifier.message}</FormError>}

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" {...register("password")} />
          {errors.password && <FormError>{errors.password.message}</FormError>}

          <button className={styles2.button}>{submitting ? "Login in..." : "Login"}</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
