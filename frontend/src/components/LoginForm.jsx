const LoginForm = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray1">
            <form className="flex flex-wrap flex-col items-center w-[4.15in] h-[4.97in] bg-gray2 rounded-[68px] shadow-glow">
                <p className=" text-yellow font-bold italic text-3xl mt-[0.6in]">BLOGS</p>
                <p className="mt-[0.5in] text-xl text-[#b2b2b2]">Username/Email</p>
                <input className="mt-[0.2in] text-2xl text-[#b2b2b2] w-[16rem] h-[3rem] bg-[#333333] rounded-lg"/>
                <p className="mt-[0.2in] text-xl text-[#b2b2b2]">Password</p>
                <input type="password" className="mt-[0.2in] text-2xl text-[#b2b2b2] w-[16rem] h-[3rem] bg-[#333333] rounded-lg"/>
                <button type="submit" className="w-[0.94in] h-[0.41in] rounded-md mt-[0.5in] text-2xl text-[#ffffff] font-bold bg-gruvboxBlue">Login</button>
            </form>
            <p className="text-[#ffffff] mt-[0.5in] text-lg">Don't Have an Account?
                <a className="text-[#3465a4]" href="/"> Sign Up</a>
            </p>
        </div>
    );
}

export default LoginForm;
