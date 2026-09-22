import { useEffect, useState } from "react";
import axios from "axios";

function FamilyRequests({ accountId, ownerId }) {
  const [requests, setRequests] = useState([]);

  // Load all requests for this family account
  useEffect(() => {
    if (!accountId) return;
    axios
      .get(`http://localhost:4000/api/accounts/${accountId}/requests`)
      .then(res => setRequests(res.data))
      .catch(console.error);
  }, [accountId]);

  const handleApprove = async (requestId) => {
    await axios.post(`http://localhost:4000/api/access-requests/${requestId}/approve`, {
      owner_id: ownerId
    });
    setRequests(reqs => reqs.filter(r => r.id !== requestId));
  };

  const handleReject = async (requestId) => {
    await axios.post(`http://localhost:4000/api/access-requests/${requestId}/reject`, {
      owner_id: ownerId
    });
    setRequests(reqs => reqs.filter(r => r.id !== requestId));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Family Access Requests</h2>
      {requests.length === 0 && <p>No pending requests 🎉</p>}

      <ul className="space-y-3">
        {requests.map(req => (
          <li key={req.id} className="bg-white shadow p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold">{req.requester_name || `User #${req.requester_id}`}</p>
              <p className="text-sm text-gray-600 break-words">{req.message || "No message"}</p>
            </div>
            <div className="flex gap-2 self-start sm:self-auto">
              <button
                onClick={() => handleApprove(req.id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(req.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyRequests;
