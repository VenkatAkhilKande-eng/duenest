import { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionCard from "../components/SubscriptionCard";

function Dashboard({ accountId }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (!accountId) return;
    axios
      .get(`http://localhost:4000/api/subscriptions/account/${accountId}`)
      .then(res => setSubs(res.data))
      .catch(console.error);
  }, [accountId]);

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subs.map(s => (
        <SubscriptionCard
          key={s.id}
          service={s.service_name}
          price={(s.amount_cents / 100).toFixed(2)}
          dueDate={s.next_due_date}
        />
      ))}
    </main>
  );
}
export default Dashboard;
