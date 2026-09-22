import { useState } from "react";

function SubscriptionCard({ service, price, dueDate }) {
  const [bg, setBg] = useState("from-indigo-500 via-purple-500 to-pink-500");

  const handleEdit = () => {
    // rotate between some futuristic gradients
    const gradients = [
      "from-indigo-500 via-purple-500 to-pink-500",
      "from-blue-500 via-cyan-500 to-green-400",
      "from-rose-500 via-red-400 to-orange-400",
      "from-gray-800 via-gray-700 to-gray-900",
    ];
    const next = gradients[Math.floor(Math.random() * gradients.length)];
    setBg(next);
  };

  return (
    <div
      className={`relative p-6 rounded-2xl shadow-lg transition transform hover:scale-105 
                  bg-gradient-to-br ${bg} text-white`}
    >
      {/* Glass overlay for futuristic feel */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col space-y-2">
        <h3 className="text-xl font-bold tracking-wide">{service}</h3>
        <p className="text-lg opacity-90">${price} / month</p>
        <p className="text-sm opacity-80">Next due: {dueDate}</p>
      </div>

      {/* Edit button */}
      <button
        onClick={handleEdit}
        className="absolute top-3 right-3 px-2 py-1 text-xs bg-white/20 hover:bg-white/30 
                   rounded-lg backdrop-blur-md shadow-md"
      >
        🎨 Edit
      </button>
    </div>
  );
}

export default SubscriptionCard;
