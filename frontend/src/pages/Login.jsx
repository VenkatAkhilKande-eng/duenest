import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });
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
        <h1 className="text-xl font-bold">Login</h1>
        <input className="border w-full p-2 rounded" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border w-full p-2 rounded" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-blue-600 text-white rounded py-2">Login</button>
        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
