import { RiLockLine } from "@remixicon/react";

const Profile = () => {
  return (
    <section className="w-2/3 flex justify-center flex-col gap-12 mx-auto">
      <div className="self-start w-2/3 flex flex-col gap-4">
        <h2 className="font-[Lora] font-bold text-5xl text-slate-700">
          My Profile
        </h2>
        <p className="font-[Poppins] text-lg text-[rgb(69,70,77)] font-light">
          Manage your curator profile, account security, and track your active
          listings in the neighborhood exchange.
        </p>
      </div>
      <div className="w-full h-0.5 bg-slate-200"></div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <h5 className="font-[Lora] font-bold text-slate-700">
            Account Settings
          </h5>
          <p className="font-[Poppins] font-light text-[rgb(69,70,77)]">
            Update your public identity and secure your digital credentials.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-700 font-medium font-[Poppins]">
              DISPLAY NAME
            </p>
            <input
              type="text"
              className="shadow-xs focus:outline outline-[#F48C25] border border-slate-300 rounded-md px-2 py-2 w-full"
            />
            <div className="px-8 cursor-not-allowed py-2 rounded-sm bg-[#F48C2550] text-white self-start">
              Save
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-700 font-medium font-[Poppins]">
              PRIMARY EMAIL
            </p>
            <div className="relative">
              <RiLockLine
                className="absolute right-2 top-2"
                color="#31415880"
              />
              <input
                type="text"
                className="shadow-xs outline-none border border-slate-300 rounded-md px-2 py-2 w-full font-[Poppins] text-slate-700 bg-slate-300 cursor-not-allowed"
                value="myemail@email.com"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center justify-between col-span-2 gap-8 p-8 bg-slate-200 rounded-md">
            <div className="flex flex-col gap-1 flex-1">
              <h5 className="font-bold font-[Poppins] text-slate-700">
                Security
              </h5>
              <p className="font-[Poppins]">
                If you think your password is compromised, change it!
              </p>
            </div>
            <div className="font-[Poppins] flex justify-end flex-1">
              <span className="border px-3 py-2 rounded-md shadow-xs bg-white border-slate-300 ">
                RESET PASSWORD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
