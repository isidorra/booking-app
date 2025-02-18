import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import toast, { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const success = await login(email, password);
    if(success) toast.success("Welcome back!");
  }

  return (
    <div className="max-w-[500px] w-full mx-auto p-5">
      <h1 className="text-2xl font-semibold text-center mt-10 mb-5">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit}>
        <label className="uppercase font-medium block">Email Address</label>
        <input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          type="email"
          className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
        />

        <label className="uppercase font-medium block">Password</label>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
        />

        <button disabled={loading} className="w-full py-2 rounded-lg bg-accent-purple text-lg text-primary">
          {loading ? <LoaderIcon className="mx-auto"/> : <span>Log in</span>}
        </button>
      </form>

      <p className="mt-5">
        Don&apos;t have an account?{" "}
        <Link to={"/choose-registration-type"} className="font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
