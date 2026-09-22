// src/components/MainNavbar.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu } from "lucide-react";

function MainNavbar({ userId, onAddClick, onNotifClick }) {
  const [notifs, setNotifs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:4000/api/notifications/${userId}`)
      .then(res => setNotifs(res.data))
      .catch(console.error);
  }, [userId]);

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login", { replace: true });
  };

  return (
    <nav className="bg-white px-4 sm:px-6 py-3 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div className="flex flex-row items-center justify-between w-full sm:w-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">DueNest</h1>

        <div className="flex flex-row gap-3 items-center sm:hidden">
          {/* Bell */}
          <div className="relative">
            <button
              className="p-2 bg-gray-200 rounded-full"
              onClick={onNotifClick}
              title="View Notifications"
            >
              🔔
            </button>
            {notifs.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {notifs.length}
              </span>
            )}
          </div>
          {/* Add button */}
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onAddClick}
          >
            + Add
          </button>
          {/* Hamburger */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title="Menu"
            >
              <Menu size={20} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user?.full_name || "User"}<br />
                  <span className="text-xs text-gray-500">{user?.email || "—"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop icons */}
      <div className="hidden sm:flex flex-row gap-4 items-center">
        <div className="relative">
          <button
            className="p-2 bg-gray-200 rounded-full"
            onClick={onNotifClick}
            title="View Notifications"
          >
            🔔
          </button>
          {notifs.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifs.length}
            </span>
          )}
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onAddClick}
        >
          + Add
        </button>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="Menu"
          >
            <Menu size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user?.full_name || "User"}<br />
                <span className="text-xs text-gray-500">{user?.email || "—"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
