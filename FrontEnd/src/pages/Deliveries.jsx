import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Deliveries() {
  // Mock customers for now, later we’ll fetch from backen

  const [deliveries, setDeliveries] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState("");
  const [jars, setJars] = useState("");
  const [customersList , setCustomerList] = useState([]);

  useEffect(() => {
    // Fetch customers from backend
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers/get");
        const data = await response.json();
        setCustomerList(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);
  

  const handleAddDelivery = (e) => {
    e.preventDefault();
    if (!customerId || !date || !jars) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("http://localhost:5000/api/deliveries/create", {
      customerId,
      date,
    }).then((res) => {
      console.log(res.data);
      const customer = customersList.find(c => c.id === customerId);
      const newDelivery = {
        id: res.data.id,
        customerName: customer ? customer.name : "Unknown",
        date,
        jars
      };
      setDeliveries([...deliveries, newDelivery]);
    }).catch((err) => {
      console.error("Error adding delivery:", err);
    });
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
