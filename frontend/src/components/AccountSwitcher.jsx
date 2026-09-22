function AccountSwitcher({ accounts, current, onSwitch }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
      <label htmlFor="account" className="text-sm font-medium text-gray-600">
        Account:
      </label>
      <select
        id="account"
        value={current}
        onChange={e => onSwitch(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={accounts.length === 1}
      >
        {accounts.map(a => (
          <option key={a.id} value={a.id}>
            {a.name} ({a.account_type}, {a.role})
          </option>
        ))}
      </select>
    </div>
  );
}
export default AccountSwitcher;
