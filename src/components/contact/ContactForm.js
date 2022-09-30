import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import styles from "../formElements/Form.module.css";

const url = BASE_URL + "messages";

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name").min(3, "Name must consist of min 3 letters"),
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  message: yup.string().required("Please write something").min(10, "Message must consist of min 10 letters"),
  subject: yup.string().required("Please write something").min(2, "Subject can't be empty"),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    setSendError(null);

    axios
      .post(url, {
        data: {
          fullname: data.fullname,
          message: data.message,
          email: data.email,
          subject: data.subject,
        },
      })
      .then((response) => {
        console.log(response);

        setSubmitted(true);
        reset();
      })
      .catch((error) => {
        console.log(error);
        setSendError("Sorry, something wrong happened, try again");
      });
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {sendError && <FormError>{sendError}</FormError>}
        <div>{submitted && <span className={styles.success}>Your message was sent!</span>}</div>
        <p className="smallText">All fields are required</p>
        <label htmlFor="fullname">Name:</label>
        {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
        <input id="fullname" type="text" name="fullname" {...register("fullname")} />

        <label htmlFor="email">Your email:</label>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <input id="email" type="email" name="email" {...register("email")} />

        <label htmlFor="subject">Subject:</label>
        {errors.subject && <FormError>{errors.subject.message}</FormError>}
        <input id="subject" type="text" name="subject" {...register("subject")}></input>

        <label htmlFor="message">Your message:</label>
        {errors.message && <FormError>{errors.message.message}</FormError>}
        <textarea id="message" type="text" cols="10" rows="8" name="message" {...register("message")}></textarea>

        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default ContactForm;
