import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
    usernameOrEmail: yup.string().required("Required"),
    password: yup.string().required("Required")
});
