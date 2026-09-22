import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function SimpleNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

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
    <nav className="bg-white px-4 sm:px-6 py-3 flex flex-row justify-between items-center shadow">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">DueNest</h1>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          title="Menu"
        >
          <Menu size={24} />
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
    </nav>
  );
}

export default SimpleNavbar;
