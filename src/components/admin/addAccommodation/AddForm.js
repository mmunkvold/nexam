import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PRODUCTS_URL } from "../../../constants/api";
import FormError from "../../common/FormError";
import AuthContext from "../../../context/AuthContext";
import styles from "../../formElements/form/Form.module.css";
import styles2 from "./AddForm.module.css";

const url = PRODUCTS_URL;

const schema = yup.object().shape({
  name: yup.string().required("Please enter accommodation name"),
  price: yup.number().typeError("Please enter a number").required("Please enter a number"),
  type: yup.string().required("Please enter type of accommodation"),
  subheading: yup.string().required("Please enter a subheading"),
  description: yup.string().required("Please write a description"),
  short_description: yup.string().required("Please write a short description"),
  address: yup.string().required("Please enter an address"),
  cover_image: yup.mixed().test("required", "You need to provide a file", (value) => {
    return value && value.length;
  }),
  images: yup.mixed().test("required", "You need to provide a file", (value) => {
    return value && value.length;
  }),
});

const AddForm = () => {
  // eslint-disable-next-line
  const [submitted, setSubmitted] = useState(false);
  const [auth] = useContext(AuthContext);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const token = auth.jwt;
  async function onSubmit(data) {
    const formData = new FormData();

    const dataInput = {
      name: data.name,
      type: data.type,
      subheading: data.subheading,
      description: data.description,
      short_description: data.short_description,
      address: data.address,
      pets_allowed: data.pets_allowed,
      parking: data.parking,
      wifi: data.wifi,
      breakfast_incl: data.breakfast_incl,
      price: data.price,
    };

    formData.append("data", JSON.stringify(dataInput));
    formData.append("files.cover_image", data.cover_image[0]);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("files.images", data.images[i]);
    }

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const addProduct = await fetch(url, options);
    const result = await addProduct.json();
    console.log("addProductResult:", result);
    reset();
    setSubmitted(true);
  }

  const onMultiFileChange = (e) => {
    const files = e.target.files;
    setValue("images", files);
  };

  const onSingleFileChange = (e) => {
    const file = e.target.files;
    setValue("cover_image", file[0]);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>{submitted && <span className={styles.success}>Accommodation is added!</span>}</div>

        <label htmlFor="name">Name of accommodation:</label>
        {errors.name && <FormError>{errors.name.message}</FormError>}
        <input id="name" type="text" name="name" {...register("name", { required: true })} />

        <fieldset>
          <legend>Accommodation type:</legend>
          <input id="hotel" type="radio" name="type" value="hotel" checked="checked" {...register("type", { required: true })} />
          <label htmlFor="hotel">Hotel</label>

          <input id="guesthouse" type="radio" name="type" value="guesthouse" {...register("type", { required: true })} />
          <label htmlFor="guesthouse">Guesthouse</label>

          <input id="bedandbreakfast" type="radio" name="type" value="bedandbreakfast" {...register("type", { required: true })} />
          <label htmlFor="bedandbreakfast">Bed &amp; Breakfast</label>
        </fieldset>

        <label htmlFor="subheading">Subheading:</label>
        {errors.subheading && <FormError>{errors.subheading.message}</FormError>}
        <input id="subheading" type="text" name="subheading" {...register("subheading", { required: true })} />

        <label htmlFor="description">Description:</label>
        {errors.description && <FormError>{errors.description.message}</FormError>}
        <textarea id="description" type="text" name="description" rows="4" {...register("description", { required: true })} />

        <label htmlFor="short_description">Short description:</label>
        {errors.short_description && <FormError>{errors.short_description.message}</FormError>}
        <textarea id="short_description" type="text" name="short_description" rows="2" {...register("short_description", { required: true })} />

        <label htmlFor="address">Address:</label>
        {errors.address && <FormError>{errors.address.message}</FormError>}
        <input id="address" type="text" name="address" {...register("address", { required: true })} />

        <fieldset>
          <legend>Facilities:</legend>
          <div>
            <input id="pets_allowed" type="checkbox" name="pets_allowed" value="" {...register("pets_allowed", { required: false })} />
            <label htmlFor="pets_allowed">Pets allowed? (leave unchecked for "No")</label>
          </div>
          <div>
            <input id="parking" type="checkbox" name="parking" value="" {...register("parking", { required: false })} />
            <label htmlFor="parking">Parking available? (leave unchecked for "No")</label>
          </div>
          <div>
            <input id="wifi" type="checkbox" name="wifi" value="" {...register("wifi", { required: false })} />
            <label htmlFor="wifi">WIFI available? (leave unchecked for "No")</label>
          </div>
          <div>
            <input id="breakfast_incl" type="checkbox" name="breakfast_incl" value="" {...register("breakfast_incl", { required: false })} />
            <label htmlFor="breakfast_incl">Breakfast included? (leave unchecked for "No")</label>
          </div>
        </fieldset>

        <label htmlFor="price">Price per night:</label>
        {errors.price && <FormError>{errors.price.message}</FormError>}
        <input id="price" type="number" name="price" {...register("price", { required: true })} />

        <label htmlFor="file">Cover Image:</label>
        {errors.cover_image && <FormError>{errors.cover_image.message}</FormError>}
        <input type="file" id="file" name="file" onChange={onSingleFileChange} {...register("cover_image", { required: true })}></input>

        <label htmlFor="files">Images:</label>
        {errors.images && <FormError>{errors.images.message}</FormError>}
        <input type="file" id="files" name="files" onChange={onMultiFileChange} multiple {...register("images", { required: true })}></input>
        <div className={styles2.flex}>
          <button className={styles.button}>Add product</button>
        </div>
      </form>
    </>
  );
};
export default AddForm;
