import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import {
  addProductAxios,
  setServerResMesssage,
} from "../../../redux/actions/actions";
import { dropzoneChildren } from "../../../hooks/useDropzone";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../typescript/redux/store";

export const Main = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { response } = useSelector(
    (state: RootState) => state.serverResponseState
  );
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dtggdx3hc/image/upload/v1650203970/bgqymelvcfsiqxfnm6sc.jpg"
  );
  const handleBackClick = () => {
    dispatch(setServerResMesssage(""));
    navigate("/products");
  };
  return (
    <main>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Drop your avatar!'
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.95}>
        <Dropzone
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
          onDrop={(file) => {
            const reader = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              formData.append("file", reader.result as string);
              formData.append("upload_preset", "zwhjf8pn");
              axios
                .post(
                  "https://api.cloudinary.com/v1_1/dtggdx3hc/image/upload",
                  formData
                )
                .then((response: any) => {
                  setImage(response.data.secure_url);
                })
                .catch((err: any) => {
                  console.log(err);
                });
            };
            reader.readAsDataURL(new Blob(file));
            setOpened(false);
          }}>
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      </Modal>
      <div className='modify-product__wrapper'>
        <Formik
          initialValues={{
            name: "",
            price: 0,
            category: "",
            color: "",
          }}
          validationSchema={productSchema}
          onSubmit={(values) => {
            try {
              Object.assign(values, {
                image: image,
              });
              dispatch(addProductAxios(values));
            } catch (error: any) {
              console.log(error);
            }
          }}>
          {({ errors, touched, resetForm }) => (
            <Form className='modify-product__wrapper__form'>
              <div
                className='modify-product__wrapper__form--image'
                onClick={() => {
                  setOpened(true);
                }}>
                <img src={image} alt='Product that is being edited' />
              </div>
              <div className='modify-product__wrapper__form__input--name'>
                <Field name='name' placeholder={"Name"}></Field>
                {errors.name && touched.name ? (
                  <div className='Errors'>{errors.name}</div>
                ) : null}
              </div>
              <div className='modify-product__wrapper__form__input--price'>
                <Field type='number' name='price' placeholder={"Price"}></Field>
                {errors.price && touched.price ? (
                  <div className='Errors'>{errors.price}</div>
                ) : null}
              </div>

              <div className='modify-product__wrapper__form__input--category'>
                <Field name='category' placeholder={"Category"}></Field>
                {errors.category && touched.category ? (
                  <div className='Errors'>{errors.category}</div>
                ) : null}
              </div>
              <div className='modify-product__wrapper__form__input--color'>
                <Field name='color' placeholder={"Color"}></Field>
                {errors.color && touched.color ? (
                  <div className='Errors'>{errors.color}</div>
                ) : null}
              </div>

              <div className='modify-product__wrapper__form--actions'>
                <button className='btn editProductBtn' type='submit'>
                  Add Product
                </button>
                <button
                  type='button'
                  className='btn cancelBtn'
                  onClick={() => {
                    resetForm();
                    dispatch(setServerResMesssage(""));
                    setImage(
                      "https://res.cloudinary.com/dtggdx3hc/image/upload/v1650203970/bgqymelvcfsiqxfnm6sc.jpg"
                    );
                  }}>
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn backBtn'
                  onClick={handleBackClick}>
                  back
                </button>
              </div>
              <div
                className='internalErrors'
                style={
                  response.message === "Success! Product added successfully!"
                    ? {
                        color: "lightgreen",
                      }
                    : {}
                }>
                {response.message}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Product name cannot be less than 2 characters")
    .max(50, "Product name cannot be more than 50 characters")
    .required("Required"),
  price: Yup.number()
    .min(99)
    .max(9999)
    .integer()
    .positive()
    .required("This field is requried"),
  category: Yup.string()
    .min(2, "Product category cannot contain less than 2 characters")
    .max(50, "Product category cannot contain more than 50 characters")
    .oneOf([
      "Entertainment",
      "Fantasy",
      "Lifestyle",
      "Home",
      "Cooking",
      "Books",
      "Electronics",
      "Toys",
      "Watches",
      "DIY",
      "Unknown",
    ]),
  color: Yup.string()
    .min(2, "Product color cannot contain less than 2 characters")
    .max(50, "Product color cannot contain more than 50 characters")
    .oneOf([
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Black",
      "Brown",
      "Pink",
      "Mixed",
      "Purple",
      "Colourful",
      "Dark",
      "Light",
      "Orange",
      "White",
      "Unknown",
    ]),
});
