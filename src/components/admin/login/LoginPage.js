import Heading from "../../typography/Heading";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.center}>
        <Heading title="Login" />
      </div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
