import * as yup from "yup"; // Import yup for validation

export const ProductsSchemaValidation = yup.object().shape({
  productName: yup
    .string()
    .required("Product name is required")
    .max(50, "Product name must be at most 50 characters"),
  category: yup
    .string()
    .required("Category is required")
    .max(30, "Category must be at most 30 characters"),
  // image: yup
  //   .string()
  //   .required("Image is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a number"),
});
