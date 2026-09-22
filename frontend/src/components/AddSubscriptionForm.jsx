import { useState } from "react";
import axios from "axios";

function AddSubscriptionForm({ accountId, onClose, onAdded }) {
  const [form, setForm] = useState({
    category: "",
    service_name: "",
    amount_cents: "",
    frequency: "monthly",
    next_due_date: "",
    notes: ""
  });

  const categories = {
    Entertainment: [
      "Netflix",
      "Disney+",
      "Hulu",
      "Amazon Prime Video",
      "HBO Max",
      "Apple TV+",
      "Peacock",
      "Paramount+",
      "Crunchyroll",
      "Discovery+"
    ],
    Music: [
      "Spotify",
      "Apple Music",
      "YouTube Music",
      "Amazon Music",
      "Tidal",
      "Pandora",
      "Deezer",
      "SoundCloud Go+"
    ],
    Productivity: [
      "Google Workspace",
      "Microsoft 365",
      "Notion",
      "Slack",
      "Zoom",
      "Evernote",
      "Todoist",
      "Trello",
      "Asana",
      "Dropbox",
      "Box",
      "Grammarly Premium"
    ],
    Cloud_Storage: [
      "Google Drive",
      "iCloud",
      "Dropbox",
      "OneDrive",
      "Mega",
      "Box"
    ],
    Shopping: [
      "Amazon Prime",
      "Walmart+",
      "Costco Membership",
      "Instacart+",
      "Target Circle"
    ],
    Food_Delivery: [
      "Uber Eats Pass",
      "DoorDash DashPass",
      "Grubhub+",
      "Postmates Unlimited",
      "Zomato Pro",
      "Swiggy One"
    ],
    Fitness_Health: [
      "Peloton",
      "Fitbit Premium",
      "Apple Fitness+",
      "MyFitnessPal Premium",
      "Headspace",
      "Calm",
      "Noom",
      "Strava Summit"
    ],
    Education: [
      "Coursera Plus",
      "Udemy",
      "Skillshare",
      "LinkedIn Learning",
      "MasterClass",
      "edX",
      "Khan Academy Plus",
      "Brilliant"
    ],
    Gaming: [
      "Xbox Game Pass",
      "PlayStation Plus",
      "Nintendo Switch Online",
      "EA Play",
      "Google Stadia",
      "GeForce NOW",
      "Apple Arcade",
      "Roblox Premium"
    ],
    News_Magazines: [
      "The New York Times",
      "The Washington Post",
      "The Wall Street Journal",
      "Bloomberg",
      "Financial Times",
      "The Economist",
      "TIME Magazine",
      "National Geographic"
    ],
    Utilities_Security: [
      "NordVPN",
      "ExpressVPN",
      "Surfshark",
      "ProtonVPN",
      "1Password",
      "LastPass",
      "Dashlane",
      "Bitwarden",
      "McAfee",
      "Norton 360"
    ],
    Social_Media_Premium: [
      "Reddit Premium",
      "Snapchat+",
      "Twitter Blue",
      "YouTube Premium",
      "Twitch Turbo",
      "Patreon",
      "OnlyFans"
    ],
    Travel: [
      "Airbnb Plus",
      "Tripadvisor Premium",
      "Priority Pass",
      "Hopper Premium",
      "Expedia+ Rewards"
    ],
    Kids_Family: [
      "Disney+ Kids",
      "Noggin",
      "PBS Kids Video",
      "Khan Academy Kids"
    ],
    Other: []
  };


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    await axios.post(`http://localhost:4000/api/subscriptions/account/${accountId}`, {
      ...form,
      amount_cents: Math.round(parseFloat(form.amount_cents) * 100),
    });

    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form className="bg-white p-6 rounded-xl shadow w-11/12 max-w-md space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold">Add Subscription</h2>

        {/* Category dropdown */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Service dropdown or text input */}
        {form.category && categories[form.category].length > 0 ? (
          <select
            name="service_name"
            value={form.service_name}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          >
            <option value="">Select Service</option>
            {categories[form.category].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="custom">Other (Enter manually)</option>
          </select>
        ) : null}

        {/* Manual input if "Other" or custom */}
        {(!form.category || form.service_name === "custom" || categories[form.category].length === 0) && (
          <input
            type="text"
            name="service_name"
            placeholder="Enter service name"
            value={form.service_name === "custom" ? "" : form.service_name}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        )}

        {/* Price */}
        <input
          type="number" step="0.01" name="amount_cents" placeholder="Price (USD)"
          value={form.amount_cents} onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        {/* Frequency */}
        <select
          name="frequency" value={form.frequency} onChange={handleChange}
          className="border w-full p-2 rounded"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="weekly">Weekly</option>
        </select>

        {/* Due date */}
        <input
          type="date" name="next_due_date"
          value={form.next_due_date} onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        {/* Notes (optional) */}
        <textarea
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          rows={3}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddSubscriptionForm;
