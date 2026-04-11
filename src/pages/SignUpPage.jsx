import { useState } from "react";

import { signUp } from "../supabaseAuth/supabaseAuth";
import Button from "../components/Button";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, firstName, lastName);
  };

  return (
    <div className="flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className=" w-[80%] ">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          className="border w-full h-10 mb-2 "
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
          className="border w-full h-10 mb-2  "
        />
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="first name"
          className="border w-full h-10 mb-2  "
        />

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="last name"
          className="border w-full h-10 mb-2 s"
        />
        <Button className="bg-black text-white w-full h-10 uppercase hover:text-blue-300 cursor-pointer transition-color duration-300">
          sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
