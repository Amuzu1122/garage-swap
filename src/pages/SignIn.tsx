import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnBig from "../components/shared/BtnBig";
import Input from "../components/shared/Input";
import {
  RiMailFill,
  RiLockFill,
  RiUserFill,
  RiEyeFill,
  RiEyeCloseFill,
} from "@remixicon/react";
import { supabase } from "../lib/supabaseClient";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState<Boolean>(true);
  let date_today = new Date().toISOString().split("T")[0];

  const setSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const userVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const emailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // log in function here
  async function handleSignIn(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("sorry, ", error);
    } else {
      console.log(data);
      navigate("/profile");
    }
  }

  // sign up functions here
  async function handleSignUp(
    email: string,
    password: string,
    username: string,
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          date_joined: date_today,
        },
      },
    });

    if (error) {
      console.log("Error signing up:", error.message);
      return;
    } else {
      console.log("Signup successful! Profile created via trigger.");
      navigate("/profile");
    }
  }

  // handle password visibility function
  function handlePasswordVisibility() {
    setIsPassword(!isPassword);
  }

  // handle navigation
  function handleNavigate(navigateTo: string) {
    navigate(navigateTo);
  }

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row items-stretch">
      {/* LEFT SIDE — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex lg:flex-2 flex-col justify-end p-12 bg-[url(/lay-flat.jpg)] bg-bottom-left bg-cover relative">
        <div className="relative z-10">
          <h3 className="font-[Inter] text-8xl font-extrabold text-white text-shadow-lg">
            The neighbourly way to swap.
          </h3>
          <p className="w-2/3 text-2xl text-white text-shadow-lg font-[Inter]">
            Join thousands of people across the country discovering treasures
            and building community right next door.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* MOBILE HERO BANNER — shown only on mobile/tablet */}
      <div className="lg:hidden w-full h-48 sm:h-64 bg-[url(/background.jpg)] bg-center bg-cover relative flex items-end p-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined font-extrabold text-[#F48C25] text-2xl">
              handyman
            </span>
            <span className="text-xl font-bold text-white">GarageSwap</span>
          </div>
          <p className="text-white/90 text-sm font-medium">
            The neighbourly way to swap.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-10 lg:py-0">
        <form className="w-full max-w-md flex flex-col gap-6 lg:gap-8 font-[Inter]">
          {/* Header */}
          <div>
            <h4 className="text-3xl lg:text-4xl font-bold text-[#0F172A]">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h4>
            <p className="text-[#475569] mt-1">
              {isSignUp
                ? "Create an account to continue"
                : "Log into your account to continue"}
            </p>
          </div>

          {/* username */}
          {isSignUp ? (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-[#334155] text-sm lg:text-base"
              >
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onchange={(e) => userVal(e)}
                placeholder="cookingpot237"
                icon={<RiUserFill color="#94A3B8" />}
                required
              />
            </div>
          ) : null}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#334155] text-sm lg:text-base"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onchange={(e) => emailVal(e)}
              placeholder="neighbour@example.com"
              icon={<RiMailFill color="#94A3B8" />}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="password"
              className="text-[#334155] text-sm lg:text-base"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={isPassword ? "password" : "text"}
                value={password}
                onchange={passwordVal}
                placeholder="Enter your password"
                icon={<RiLockFill color="#94A3B8" />}
                passwordIcon={
                  isPassword == true ? (
                    <RiEyeCloseFill
                      color="#94A3B8"
                      className="absolute right-4 cursor-pointer"
                      onClick={handlePasswordVisibility}
                    />
                  ) : (
                    <RiEyeFill
                      color="#94A3B8"
                      className="absolute right-4 cursor-pointer "
                      onClick={handlePasswordVisibility}
                    />
                  )
                }
                required
              />
            </div>
            <div
              className={`absolute top-0 right-0 text-[#F48C25] cursor-pointer ${isSignUp ? "hidden" : "visible"}`}
              onClick={() => handleNavigate("/forgotpassword")}
            >
              forgot password?
            </div>
          </div>

          {/* Submit */}
          <BtnBig
            text={isSignUp ? "Create Account" : "Sign In"}
            textColor="text-white"
            btnBg="bg-[#F48C25]"
            onsubmit={(e) => {
              e.preventDefault();
              isSignUp
                ? handleSignUp(email, password, username)
                : handleSignIn(email, password);
            }}
          />

          {/* Toggle Sign In / Sign Up */}
          <div className="text-center text-sm sm:text-base pb-4 lg:pb-0">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-[#F48C25] font-semibold cursor-pointer hover:underline"
              onClick={setSignUp}
            >
              {isSignUp ? "Sign In" : "Create an account"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
