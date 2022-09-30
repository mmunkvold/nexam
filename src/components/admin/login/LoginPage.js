import Head from "../../common/Head";
import Heading from "../../typography/Heading";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <>
      <Head title="Login" addPostfixTitle={true} keywords="login" description="Login to dashboard Holidaze" />
      <div className="center">
        <Heading title="Login" />
      </div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
