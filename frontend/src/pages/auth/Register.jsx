import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import useRegister from "../../hooks/auth/useRegister";
import toast, { LoaderIcon } from "react-hot-toast";

useParams;
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, register } = useRegister();

  const { role } = useParams();
  if (role !== "guest" && role !== "host") {
    return Navigate("/choose-registration-type");
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const success = await register(firstName, lastName, email, password, role);
    if (success) toast.success("You have successfully created an account.");
  };
  return (
    <div className="max-w-[500px] w-full mx-auto p-5">
      <h1 className="text-2xl font-semibold text-center my-5">
        Create an account
      </h1>

      <form onSubmit={handleSubmit}>
        <label className="uppercase font-medium block">First Name</label>
        <input
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
          type="text"
          className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
        />

        <label className="uppercase font-medium block">Last Name</label>
        <input
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
          type="text"
          className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
        />

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

        <button
          disabled={loading}
          className="w-full py-2 rounded-lg bg-accent-purple text-lg text-primary"
        >
          {loading ? <LoaderIcon /> : <span>Sign up</span>}
        </button>
      </form>

      <p className="mt-5">
        Already have an account?{" "}
        <Link to={"/login"} className="font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
