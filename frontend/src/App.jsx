import { useEffect, useState } from "react";
import Navbar from "./components/MainNavbar";
import Footer from "./components/Footer";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AddSubscriptionForm from "./components/AddSubscriptionForm";
import FamilyRequests from "./pages/FamilyRequests";
import FamilyMembers from "./pages/FamilyMembers";
import JoinFamilyRequest from "./components/JoinFamilyRequest";
import axios from "axios";
import MainNavbar from "./components/MainNavbar";

function App() {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = savedUser?.id || 1; // fallback to 1 if empty (dev)
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [view, setView] = useState("dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showJoin, setShowJoin] = useState(false);

  // NEW: pending requests count for owner view
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/accounts/${userId}`)
      .then(res => {
        setAccounts(res.data);
        if (res.data.length > 0) setCurrentAccount(res.data[0].id);
      });
  }, [userId]);

  // find the active account object
  const active = accounts.find(a => String(a.id) === String(currentAccount));

  // fetch pending count if owner on a family account
  useEffect(() => {
    const fetchPending = async () => {
      if (!active) return setPendingCount(0);
      if (active.account_type !== "family" || active.role !== "owner") return setPendingCount(0);
      const res = await axios.get(`http://localhost:4000/api/accounts/${active.id}/requests`);
      setPendingCount(res.data.length || 0);
    };
    fetchPending().catch(() => setPendingCount(0));
  }, [active, refresh, view]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainNavbar
        userId={userId}
        onAddClick={() => setShowAdd(true)}
        onNotifClick={() => setView("notifications")}
      />
      <div className="flex-1 bg-gray-100">
        {/* Controls row */}
        <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
          {accounts.length > 0 && (
            <AccountSwitcher
              accounts={accounts}
              current={currentAccount}
              onSwitch={(val) => {
                setCurrentAccount(val);
                setView("dashboard");
              }}
            />
          )}

          <div className="flex items-center gap-3">
            {active?.account_type === "family" && active?.role === "owner" && (
              <>
                <button
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => setView("requests")}
                >
                  Manage Requests{pendingCount ? ` (${pendingCount})` : ""}
                </button>

                <button
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  onClick={() => setView("members")}
                >
                  View Members
                </button>
              </>
            )}

            <button
              className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              onClick={() => setShowJoin(true)}
            >
              Join Family Account
            </button>
          </div>
        </div>
      

        {/* Pages */}
        {view === "requests" ? (
          <FamilyRequests accountId={currentAccount} ownerId={userId} />
        ) : view === "members" ? (
          <FamilyMembers accountId={currentAccount} />
        ) : view === "dashboard" ? (
          <Dashboard accountId={currentAccount} key={refresh} />
        ) : (
          <Notifications userId={userId} onBack={() => setView("dashboard")} />
        )}

        {/* Modals */}
        {showAdd && (
          <AddSubscriptionForm
            accountId={currentAccount}
            onClose={() => setShowAdd(false)}
            onAdded={() => setRefresh(prev => prev + 1)}
          />
        )}

        {showJoin && (
          <JoinFamilyRequest
            userId={userId}
            onClose={() => setShowJoin(false)}
            onRequested={() => setRefresh(prev => prev + 1)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;