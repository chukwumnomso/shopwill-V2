import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../supabaseAuth/supabaseAuth";
import Button from "../components/Button";
import { getCurrentUser } from "../supabaseAuth/supabaseAuth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      navigate("/signup");
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className=" w-[80%] ">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          className="border w-full h-10 mb-2 "
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="border w-full h-10 mb-2  "
        />

        <Button className="bg-black text-white w-full h-10 uppercase hover:text-blue-300 cursor-pointer transition-color duration-300">
          login
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
