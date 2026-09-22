import { useState } from "react";
import axios from "axios";

function JoinFamilyRequest({ userId, onClose, onRequested }) {
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!accountId) { setErr("Family Account ID is required"); return; }
    try {
      setLoading(true);
      await axios.post(`http://localhost:4000/api/accounts/${accountId}/request`, {
        requester_id: userId,
        message: message || null,
      });
      onRequested?.();     // for any parent refresh
      onClose();
      alert("Request sent to the family account owner ✅");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-white w-11/12 max-w-md rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-bold">Request Access to Family Account</h2>

        <label className="block text-sm font-medium">Family Account ID</label>
        <input
          type="number"
          value={accountId}
          onChange={e => setAccountId(e.target.value)}
          className="border w-full p-2 rounded"
          placeholder="e.g., 12"
        />

        <label className="block text-sm font-medium">Message (optional)</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="border w-full p-2 rounded"
          rows={3}
          placeholder="Hi, please add me to our family account."
        />

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div className="flex justify-end gap-2">
          <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinFamilyRequest;
