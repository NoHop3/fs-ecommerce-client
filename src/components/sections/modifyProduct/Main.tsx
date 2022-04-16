import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { authError, editProductAxios } from "../../../redux/actions/actions";
import { dropzoneChildren } from "../../../hooks/useDropzone";
import { RootState } from "../../../typescript/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../typescript/types";

export const Main = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.productState);
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const result = products.find((product) => product._id === productId);
    if (result !== undefined) {
      setSelectedProduct(result);
      setImage(result.image);
    } else setError("No such product found!");
  }, [productId, products]);
  const handleBackClick = () => {
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
                  dispatch(authError(err.response.data.message));
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
              dispatch(editProductAxios(values, productId as string));
            } catch (error: any) {
              console.log(error);
              setError(error.message as string);
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
                <Field
                  name='name'
                  placeholder={
                    selectedProduct &&
                    ((selectedProduct as Product).name as string)
                  }></Field>
                {errors.name && touched.name ? (
                  <div className='Errors'>{errors.name}</div>
                ) : null}
              </div>

              <div className='modify-product__wrapper__form__input--price'>
                <Field
                  type='number'
                  name='price'
                  placeholder={
                    selectedProduct?.price
                      ? (selectedProduct as Product).price
                      : "Price"
                  }></Field>
                {errors.price && touched.price ? (
                  <div className='Errors'>{errors.price}</div>
                ) : null}
              </div>

              <div className='modify-product__wrapper__form__input--category'>
                <Field
                  name='category'
                  placeholder={
                    selectedProduct?.category
                      ? (selectedProduct as Product).category
                      : "Category"
                  }></Field>
                {errors.category && touched.category ? (
                  <div className='Errors'>{errors.category}</div>
                ) : null}
              </div>
              <div className='modify-product__wrapper__form__input--color'>
                <Field
                  name='color'
                  placeholder={
                    selectedProduct?.color
                      ? (selectedProduct as Product).color
                      : "Color"
                  }></Field>
                {errors.color && touched.color ? (
                  <div className='Errors'>{errors.color}</div>
                ) : null}
              </div>

              <div className='modify-product__wrapper__form--actions'>
                <button className='btn editProductBtn' type='submit'>
                  Edit Product
                </button>
                <button
                  type='button'
                  className='btn cancelBtn'
                  onClick={() => {
                    resetForm();
                    setImage((selectedProduct as Product).image);
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
              <div className='internalErrors'>{error}</div>
              {/* <div className='error'>{authError}</div> */}
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
