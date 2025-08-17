import { useState } from "react";

export default function Deliveries() {
  // Mock customers for now, later we’ll fetch from backend
  const customersList = [
    { id: 1, name: "ABC Company" },
    { id: 2, name: "XYZ Traders" }
  ];

  const [deliveries, setDeliveries] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState("");
  const [jars, setJars] = useState("");

  const handleAddDelivery = (e) => {
    e.preventDefault();
    if (!customerId || !date || !jars) return;

    const customerName = customersList.find(c => c.id === parseInt(customerId))?.name;

    const newDelivery = {
      id: Date.now(),
      customerId: parseInt(customerId),
      customerName,
      date,
      jars: parseInt(jars)
    };

    setDeliveries([...deliveries, newDelivery]);
    setCustomerId("");
    setDate("");
    setJars("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deliveries</h1>

      {/* Add Delivery Form */}
      <form
        onSubmit={handleAddDelivery}
        className="bg-white p-4 rounded-lg shadow mb-6 max-w-lg space-y-4"
      >
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Customer</option>
          {customersList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Number of Jars"
          value={jars}
          onChange={(e) => setJars(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Delivery
        </button>
      </form>

      {/* Deliveries Table */}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Jars</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No deliveries recorded yet.
              </td>
            </tr>
          ) : (
            deliveries.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{d.date}</td>
                <td className="p-3">{d.customerName}</td>
                <td className="p-3">{d.jars}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
