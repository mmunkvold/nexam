import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment/moment";
import FormError from "../common/FormError";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import styles from "../formElements/Form.module.css";
import styles2 from "../formElements/Button.module.css";

const url = BASE_URL + "enquiries";

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name").min(3, "Name must consist of min 3 letters"),
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  beds: yup.number().typeError("Please provide no of beds needed").required(),
  start: yup.date().min(new Date()).typeError("Please choose a future date").required(),
  end: yup
    .date()
    .when("start", (start, schema) => (moment(start).isValid() ? schema.min(start) : schema))
    .typeError("End date has to be min 1 day after start date")
    .required(),
});

const EnquiryForm = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(null);

  const { name } = props;
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
          accommodationName: data.name,
          beds: data.beds,
          start: data.start,
          end: data.end,
        },
      })
      .then((response) => {
        //console.log(response)
        setSubmitted(true);
        reset();
      })
      .catch((error) => {
        //console.log(error)
        setSendError("Sorry, something wrong happened, try again");
      });
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {sendError && <FormError>{sendError}</FormError>}
        <div>{submitted && <span className={styles.success}>Your enquiry was sent!</span>}</div>
        <p className="smallText">Required fields are marked with *</p>
        <h1>{name}</h1>

        <input id="name" type="hidden" name={name} value={name} {...register("name")} />

        <label htmlFor="fullname">Your name: *</label>
        {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
        <input id="fullname" type="text" name="fullname" {...register("fullname")} />

        <label htmlFor="email">Your email: *</label>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <input id="email" type="email" name="email" {...register("email")} />

        <label htmlFor="beds">No of beds: *</label>
        {errors.beds && <FormError>{errors.beds.message}</FormError>}
        <input id="beds" type="number" name="beds" {...register("beds")} />

        <label htmlFor="start">Check in: *</label>
        {errors.start && <FormError>{errors.start.message}</FormError>}
        <input id="start" type="date" name="start" {...register("start")} />

        <label htmlFor="end">Check out: *</label>
        {errors.end && <FormError>{errors.end.message}</FormError>}
        <input id="end" type="date" name="end" {...register("end")} />

        <label htmlFor="message">Your message:</label>
        {errors.message && <FormError>{errors.message.message}</FormError>}
        <textarea id="message" cols="10" rows="8" type="text" name="message" {...register("message")}></textarea>

        <button className={styles2.button} type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default EnquiryForm;
