import { useState } from "react";
import BtnBig from "../components/shared/BtnBig";
import Input from "../components/shared/Input";
import { RiMailFill, RiLockFill } from "@remixicon/react";

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const setSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row items-stretch">
      {/* LEFT SIDE — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex lg:flex-[2] flex-col justify-end p-12 bg-[url(/background.jpg)] bg-bottom-left bg-cover relative">
        <div className="relative z-10">
          <h3 className="font-[Inter] text-8xl font-extrabold text-white text-shadow-lg">
            The neighbourly way to swap.
          </h3>
          <p className="w-2/3 text-2xl text-white text-shadow-lg">
            Join thousands of people across the country discovering treasures
            and building community right next door.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
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
              placeholder="neighbour@example.com"
              icon={<RiMailFill color="#94A3B8" />}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[#334155] text-sm lg:text-base"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={<RiLockFill color="#94A3B8" />}
              required
            />
          </div>

          {/* Submit */}
          <BtnBig
            text={isSignUp ? "Create Account" : "Sign In"}
            textColor="text-white"
            btnBg="bg-[#F48C25]"
          />

          <div className="flex items-center gap-4">
            <hr className="flex-1 text-[#64748B50]" />
            <span className="text-sm text-[#64748B]">Or continue with</span>
            <hr className="flex-1 text-[#64748B50]" />
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="font-[Inter] flex items-center justify-center gap-2 p-2 sm:p-2.5 border rounded-md border-[#F48C2520] shadow flex-1 text-sm sm:text-base cursor-pointer hover:bg-gray-50 transition-colors">
              <img className="max-w-5 sm:max-w-6" src="/google.png" />
              Google
            </div>
            <div className="font-[Inter] flex items-center justify-center gap-2 p-2 sm:p-2.5 border rounded-md border-[#F48C2520] shadow flex-1 text-sm sm:text-base cursor-pointer hover:bg-gray-50 transition-colors">
              <img className="max-w-5 sm:max-w-6" src="/facebook.png" />
              Facebook
            </div>
          </div>

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
