import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account_choice, setChoice] = useState("personal");
  const [family_name, setFamilyName] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const body = { full_name, email, password, account_choice };
      if (account_choice === "family") body.family_name = family_name;
      const res = await axios.post("http://localhost:4000/api/auth/register", body);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-11/12 max-w-md space-y-4">
        <h1 className="text-xl font-bold">Create your account</h1>

        <input className="border w-full p-2 rounded" placeholder="Full name"
               value={full_name} onChange={e=>setFullName(e.target.value)} />
        <input className="border w-full p-2 rounded" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border w-full p-2 rounded" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />

        <div className="space-y-2">
          <label className="font-medium text-sm">Choose account type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="acct" value="personal"
                     checked={account_choice==="personal"}
                     onChange={()=>setChoice("personal")} />
              Personal
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="acct" value="family"
                     checked={account_choice==="family"}
                     onChange={()=>setChoice("family")} />
              Family
            </label>
          </div>
        </div>

        {account_choice === "family" && (
          <input className="border w-full p-2 rounded" placeholder="Family account name"
                 value={family_name} onChange={e=>setFamilyName(e.target.value)} />
        )}

        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-blue-600 text-white rounded py-2">
          Create account
        </button>

        <p className="text-sm text-center">
          Have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
