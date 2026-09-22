import { useEffect, useState } from "react";
import axios from "axios";

function FamilyMembers({ accountId }) {
  const [members, setMembers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!accountId) return;
    axios
      .get(`http://localhost:4000/api/accounts/${accountId}/members`)
      .then(res => setMembers(res.data))
      .catch(e => setErr(e.message));
  }, [accountId]);

  const handleRemove = async (userId) => {
    if (!window.confirm("Remove this member from the family account?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/accounts/${accountId}/members/${userId}`);
      setMembers(prev => prev.filter(m => m.user_id !== userId));
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">Family Members</h2>
      {err && <p className="text-red-600">{err}</p>}
      {members.length === 0 && <p>No members yet.</p>}

      <ul className="space-y-3">
        {members.map(m => (
          <li
            key={m.user_id}
            className="bg-white shadow p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <div className="flex-1">
              <p className="font-semibold">
                {m.full_name} ({m.role})
              </p>
              <p className="text-sm text-gray-600 break-all">{m.email}</p>
              <p className="text-sm text-gray-500">Status: {m.status}</p>
            </div>
            {m.role !== "owner" && (
              <button
                onClick={() => handleRemove(m.user_id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyMembers;
