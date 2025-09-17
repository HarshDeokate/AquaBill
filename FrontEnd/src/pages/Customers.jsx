import { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rate, setRate] = useState("");

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name || !address || !rate) return;

    const newCustomer = {
      id: Date.now(),
      name,
      address,
      rate: parseFloat(rate)
    };

    setCustomers([...customers, newCustomer]);
    setName("");
    setAddress("");
    setRate("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Add Customer Form */}
      <form
        onSubmit={handleAddCustomer}
        className="bg-white p-4 rounded-lg shadow mb-6 max-w-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Rate per Jar"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Customer
        </button>
      </form>

      {/* Customers Table */}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Address</th>
            <th className="p-3">Rate</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No customers added yet.
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.address}</td>
                <td className="p-3">₹{c.rate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
