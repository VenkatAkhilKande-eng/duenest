import { useEffect, useState } from "react";
import axios from "axios";

function Notifications({ userId, onBack }) {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:4000/api/notifications/${userId}`)
      .then(res => setNotifs(res.data))
      .catch(console.error);
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notifications/${id}`, {
        data: { user_id: userId }, // body for DELETE
      });
      setNotifs(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button
          onClick={onBack}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Dashboard
        </button>
      </div>

      {notifs.length === 0 && <p>No notifications 🎉</p>}

      <ul className="space-y-2">
        {notifs.map(n => (
          <li
            key={n.id}
            className="bg-white shadow p-4 rounded flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
          >
            <div className="min-w-0">
              <h3 className="font-semibold break-words">{n.title}</h3>
              <p className="text-sm text-gray-600 break-words">{n.body}</p>
            </div>

            <div className="flex gap-2 self-start sm:self-auto">
              {/* (Optional) mark-as-read button could go here too */}
              <button
                onClick={() => handleDelete(n.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
