import * as yup from "yup";

const Schema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .matches(/^[^0-9]*$/),
  dateOfBirth: yup
    .date()
    .required()
    .max(new Date(Date.now() - 568025136000)),
});

export default Schema;
