import {useFormik} from "formik";
import {loginFormSchema} from "../schemas/loginFormSchema";
import axios from "axios";

const LoginForm = () => {
    const onSubmit = async (values, actions) => {
        console.log(actions)
        try {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:8080/auth/login',
                data: {
                    usernameOrEmail: values.usernameOrEmail,
                    pwd: values.password
                }
            });
            const data = result.data;
            console.log(data);
            actions.resetForm();
        } catch (error) {
            alert(error?.response?.data?.message || error?.response?.data || error.message)
        }
    }

    const {
        handleChange,
        touched,
        handleSubmit,
        isSubmitting,
        handleBlur,
        values,
        errors
    } = useFormik({
        initialValues: {
            usernameOrEmail: "",
            password: ""
        },
        validationSchema: loginFormSchema,
        onSubmit
    });
    console.log(errors);
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray1">
            <form onSubmit={handleSubmit}
                className="flex flex-wrap flex-col items-center w-[4.15in] h-[4.97in] bg-gray2 rounded-[68px] shadow-glow">
                <p className=" text-yellow italic font-[1000] text-4xl mt-[0.6in]">Blog !t</p>
                <p className="mt-[0.5in] text-2xl text-[#b2b2b2]">Username/Email&nbsp;{
                    errors.usernameOrEmail && touched.usernameOrEmail ? <span className="text-[#cc241d] text-base">
                        *{
                        errors.usernameOrEmail
                    }</span> : null
                }</p>
                <input name="usernameOrEmail"
                    value={
                        values.usernameOrEmail
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="p-3 mt-[0.07in] text-2xl text-[#ffffff] w-[16rem] h-[3.3rem] bg-[#333333] rounded-lg"/>
                <p className="mt-[0.2in] text-2xl text-[#b2b2b2]">Password&nbsp;{
                    errors.password && touched.password ? <span className="text-[#cc241d] text-base">
                        *{
                        errors.password
                    }</span> : null
                }</p>
                <input name="password"
                    value={
                        values.password
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    className="p-3 mt-[0.07in] text-2xl text-[#ffffff] w-[16rem] h-[3.3rem] bg-[#333333] rounded-lg"/>
                <button disabled={isSubmitting} type="submit" className="w-[0.94in] h-[0.41in] rounded-md mt-[0.4in] text-2xl text-[#ffffff] font-bold bg-gruvboxBlue">Login</button>
            </form>
            <p className="text-[#ffffff] mt-[0.5in] text-xl">Don't Have an Account?
                <a className="text-[#3465a4]" href="/">
                    &nbsp;Sign Up</a>
            </p>
            <p className="text-[#ffffff] mt-[0.05in] text-lg">
                <a className="text-[#3465a4]" href="/">
                    Browse
                </a>
                &nbsp;without logging in.</p>
        </div>
    );
}

export default LoginForm;
