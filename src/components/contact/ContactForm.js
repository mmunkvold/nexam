import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import styles from "../formElements/form/Form.module.css";

const url = BASE_URL + "/messages";

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name").min(3, "Name must consist of min 3 letters"),
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  message: yup.string().required("Please write something").min(10, "Message must consist of min 10 letters"),
  subject: yup.string().required("Please write something").min(2, "Subject can't be empty"),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log();
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
      });
    setSubmitted(true);
    reset();
  }

  console.log(errors);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>{submitted && <span className="success">Your message was sent!</span>}</div>

        <label htmlFor="fullname">Name:</label>
        {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
        <input id="fullname" type="text" name="fullname" {...register("fullname", { required: true })} />

        <label htmlFor="email">Your email:</label>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <input id="email" type="email" name="email" {...register("email", { required: true })} />

        <div>
          <label htmlFor="subject">Subject:</label>
          {errors.subject && <FormError>{errors.subject.subject}</FormError>}
          <input type="text" id="subject" name="subject" {...register("subject", { required: true })}></input>
        </div>

        <div>
          <label htmlFor="message">Your message:</label>
          {errors.message && <FormError>{errors.message.message}</FormError>}
          <textarea id="message" cols="10" rows="8" type="text" name="message" {...register("message", { required: true })}></textarea>
        </div>

        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};

export default ContactForm;
