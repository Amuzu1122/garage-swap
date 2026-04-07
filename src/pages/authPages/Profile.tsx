import { useEffect, useState } from "react";
import { RiLockLine, RiSaveLine, RiLoader4Line } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const Profile = () => {
  const navigate = useNavigate();

  // States
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setEmail(user.email ?? "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("username, phone")
      .eq("user_id", user.id)
      .single();

    if (profile) {
      setUsername(profile.username || "");
      setPhone(profile.phone || "");
      setOriginalPhone(profile.phone || "");
    }

    setLoading(false);
  };

  const handleSavePhone = async () => {
    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to update your profile.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        phone: phone.trim() || null,
      })
      .eq("user_id", user.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setOriginalPhone(phone.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }

    setSaving(false);
  };

  const hasPhoneChanged = phone.trim() !== originalPhone.trim();

  return (
    <section className="w-full max-w-4xl flex justify-center flex-col gap-12 mx-auto px-4 sm:px-8 py-10">
      <div className="self-start w-full sm:w-2/3 flex flex-col gap-4">
        <h2 className="font-[Lora] font-bold text-3xl sm:text-5xl text-slate-700">
          My Profile
        </h2>
        <p className="font-[Poppins] text-lg text-[rgb(69,70,77)] font-light">
          Manage your curator profile, account security, and contact information
          for the neighborhood exchange.
        </p>
      </div>

      <div className="w-full h-0.5 bg-slate-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <h5 className="font-[Lora] font-bold text-slate-700">
            Account Settings
          </h5>
          <p className="font-[Poppins] font-light text-[rgb(69,70,77)]">
            Update your public identity and contact details.
          </p>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-700 font-medium font-[Poppins]">
              USERNAME
            </p>
            <input
              type="text"
              value={username}
              disabled
              className="shadow-xs border border-slate-300 rounded-md px-3 py-2.5 w-full font-[Poppins] bg-slate-100 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500">Username cannot be changed</p>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-700 font-medium font-[Poppins]">
              PHONE NUMBER <span className="text-red-500">*</span>
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-xs focus:outline outline-[#F48C25] border border-slate-300 rounded-md px-3 py-2.5 w-full font-[Poppins]"
              placeholder="+233 24 123 4567"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleSavePhone}
                disabled={!hasPhoneChanged || saving}
                className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#F48C25] hover:bg-[#e07d1a] disabled:bg-slate-300 text-white text-sm font-medium font-[Poppins] transition-colors"
              >
                {saving ? (
                  <>
                    <RiLoader4Line size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <RiSaveLine size={16} />
                    Save Phone Number
                  </>
                )}
              </button>

              {saveSuccess && (
                <p className="text-emerald-600 text-sm font-medium">
                  ✓ Saved successfully
                </p>
              )}
            </div>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            <p className="text-xs text-slate-500 mt-1">
              Phone number is required to create listings
            </p>
          </div>

          {/* Primary Email */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <p className="text-xs text-slate-700 font-medium font-[Poppins]">
              PRIMARY EMAIL
            </p>
            <div className="relative">
              <RiLockLine
                className="absolute right-3 top-3"
                color="#31415880"
              />
              <input
                type="text"
                className="shadow-xs outline-none border border-slate-300 rounded-md px-3 py-2.5 w-full font-[Poppins] text-slate-700 bg-slate-100 cursor-not-allowed"
                value={email}
                disabled
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:col-span-2 gap-6 p-6 sm:p-8 bg-slate-200 rounded-md">
            <div className="flex flex-col gap-1 flex-1">
              <h5 className="font-bold font-[Poppins] text-slate-700">
                Security
              </h5>
              <p className="font-[Poppins]">
                If you think your password is compromised, change it!
              </p>
            </div>
            <div
              className="font-[Poppins] sm:flex sm:justify-end flex-1"
              onClick={() => navigate("/forgotpassword")}
            >
              <span className="border px-6 py-3 rounded-md shadow-xs bg-white border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
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
