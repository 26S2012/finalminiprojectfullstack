import * as yup from 'yup';

export const AddressSchemaValidation = yup.object().shape({

  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters long'),

    postalcode: yup
    .number().integer()
    .required('Address Line 1 is required')
    .min(3, 'Postal Code  should be 3 digits '),

  location: yup
    .string()
    .required('Location is required')
    .min(3, 'Location should be at least 3 characters long'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{8}$/, 'Phone number must be exactly 10 digits'),
  
  
});
