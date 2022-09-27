import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import axios from "axios";
//import Input from "../form/inputs/Input";
//import Form from "../form/Form";
import styles from "../formElements/form/Form.module.css";
import styles2 from "../formElements/buttons/Button.module.css";

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your name").min(3, "Name must consist of min 3 letters"),
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  beds: yup.number().required("Please provide no of beds needed"),
  message: yup.string().required("Please write something").min(10, "Message can't be empty"),
  start: yup.date().min(new Date(), "Please choose a future date"),
  end: yup.date().when("start", (start, schema) => {
    if (start) {
      const dayAfter = new Date(start.getTime() + 86400000);
      return schema.min(dayAfter, "End date has to be min 1 day after start date");
    }
    return schema;
  }),
});

//const url = BASE_URL + "/enquiries"; HVORFOR VIRKER IKKE DENNE?
const EnquiryForm = (props) => {
  const [submitted, setSubmitted] = useState(false);
  //const { id } = useParams(); //need this for id?
  //but like this for name...?
  const { name } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    //const id = data.id;
    console.log(data);

    axios
      .post("https://noroff-exam.herokuapp.com/api/enquiries", {
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
        console.log(response);
      });
    setSubmitted(true);
    reset();
  }

  console.log(errors);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>{submitted && <span className={styles.success}>Your enquiry was sent!</span>}</div>

        <p>{name}</p>

        <input id="name" type="hidden" name={name} value={name} {...register("name", { required: true })} />

        <label htmlFor="fullname">Your name:</label>
        {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
        <input id="fullname" type="text" name="fullname" {...register("fullname", { required: true })} />

        <label htmlFor="email">Your email:</label>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <input id="email" type="email" name="email" {...register("email", { required: true })} />

        <label htmlFor="beds">No of beds:</label>
        {errors.beds && <FormError>{errors.beds.message}</FormError>}
        <input id="beds" type="number" name="beds" {...register("beds", { required: true })} />

        <label htmlFor="start">Check in:</label>
        {errors.start && <FormError>{errors.start.message}</FormError>}
        <input id="start" type="date" name="start" {...register("start", { required: true })} />

        <label htmlFor="end">Check out:</label>
        {errors.end && <FormError>{errors.end.message}</FormError>}
        <input id="end" type="date" name="end" {...register("end", { required: true })} />

        <label htmlFor="message">Your message:</label>
        {errors.message && <FormError>{errors.message.message}</FormError>}
        <textarea id="message" cols="10" rows="8" type="text" name="message" {...register("message", { required: true })}></textarea>

        <button className={styles2.button}>Send</button>
      </form>
    </>
  );
};

export default EnquiryForm;
//for date validation : https://stackoverflow.com/questions/69985066/yup-date-validation-start-date-must-not-be-same-as-end-date
