import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  color: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

export const ModalForm = ({values, onSubmit, onCancel} : {values:any, onSubmit:any,onCancel:any}) => {
  return (
    <Formik
      initialValues={values}
      validationSchema={ValidationSchema}
      isInitialValid={ValidationSchema.isValidSync(values)}
      onSubmit={onSubmit}
      render={({ isValid }) => {
        return (
          <Form>
            {!isValid && <span>The form contains some errors</span>}

            <div>
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <Field component="select" name="color">
                <option value=""></option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
              <ErrorMessage name="color" />
            </div>
            <div>
              <Field name="firstName" />
              <ErrorMessage name="firstName" />
            </div>
            <div>
              <Field name="lastName" />
              <ErrorMessage name="lastName" />
            </div>

            <div
              className="swal2-actions"
              style={{ display: "flex", fontSize: "0.9em" }}
            >
              <button
                type="submit"
                className="swal2-confirm swal2-styled"
              >
                OK
              </button>
              <button onClick={onCancel} className="swal2-cancel swal2-styled">
                Cancel
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};
