import { useState, useEffect } from "react";
import { RiArrowLeftLine, RiKeyFill, RiMailFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import BtnBig from "../components/shared/BtnBig";
import { supabase } from "../lib/supabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const userEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  async function handleEmailReset(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (data) {
      console.log("email sent successfully");
    } else {
      console.log(error);
    }
  }

  return (
    <section className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center max-w-lg ">
      <div className="p-4 bg-white rounded-lg">
        <RiKeyFill color="#f48c25" size={32} />
      </div>
      <p className="text-3xl font-[Playfair_Display]">Reset Your Password</p>
      <p className="font-[Inter] text-lg text-center w-2/3 mt-5 text-slate-700">
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </p>
      <div className="p-8 mt-5 rounded-md bg-white flex flex-col items-start gap-4 w-full">
        <label htmlFor="email" className="w-full ">
          <span className="font-[Inter] font-semibold text-slate-700 text-sm">
            EMAIL ADDRESS
          </span>
          <Input
            placeholder="eg. neighbourhood@gmail.com"
            type="email"
            icon={<RiMailFill color="#f48c25" />}
            value={email}
            onchange={(e) => userEmail(e)}
          />
        </label>
        <BtnBig
          text="Send Reset Link"
          textColor="text-white"
          btnBg="bg-[#f48c25]"
          onsubmit={() => handleEmailReset(email)}
        />
        <div
          className="flex items-center justify-center gap-3 w-full cursor-pointer"
          onClick={() => navigate("/sign-in")}
        >
          <RiArrowLeftLine color="text-slate-700" />
          Back To Login
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
