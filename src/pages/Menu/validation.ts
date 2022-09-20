import * as yup from 'yup';

const playerRegEx = new RegExp(/^[a-zA-Z]{3,10}$/);

export const validationSchema = yup
  .string()
  .trim()
  .required('Please, enter your name')
  .min(3, 'Minimum 3 characters')
  .max(10, 'Maximum 10 characters')
  .matches(playerRegEx, 'Only latin characters are allowed');
