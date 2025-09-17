import { useState } from "react";
import jsPDF from "jspdf";

export default function Billing() {
  // Mock customers
  const customersList = [
    { id: 1, name: "ABC Company", rate: 30 },
    { id: 2, name: "XYZ Traders", rate: 25 }
  ];

  // Mock deliveries
  const deliveriesList = [
    { customerId: 1, date: "2025-08-01", jars: 10 },
    { customerId: 1, date: "2025-08-03", jars: 12 },
    { customerId: 2, date: "2025-08-02", jars: 15 }
  ];

  const [customerId, setCustomerId] = useState("");
  const [month, setMonth] = useState("");
  const [totalJars, setTotalJars] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleGenerateBill = () => {
    if (!customerId || !month) return;

    const selectedCustomer = customersList.find(c => c.id === parseInt(customerId));
    const filteredDeliveries = deliveriesList.filter(d =>
      d.customerId === parseInt(customerId) && d.date.startsWith(month)
    );

    const jarsSum = filteredDeliveries.reduce((sum, d) => sum + d.jars, 0);
    const amount = jarsSum * selectedCustomer.rate;

    setTotalJars(jarsSum);
    setTotalAmount(amount);
  };

  const handleDownloadPDF = () => {
    const customer = customersList.find(c => c.id === parseInt(customerId));
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Water Jar Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${customer.name}`, 14, 30);
    doc.text(`Month: ${month}`, 14, 38);
    doc.text(`Total Jars: ${totalJars}`, 14, 46);
    doc.text(`Rate per Jar: ₹${customer.rate}`, 14, 54);
    doc.text(`Total Amount: ₹${totalAmount}`, 14, 62);

    doc.save(`Invoice-${customer.name}-${month}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>

      {/* Bill Generation Form */}
      <div className="bg-white p-4 rounded-lg shadow max-w-lg space-y-4">
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Customer</option>
          {customersList.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleGenerateBill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Generate Bill
        </button>
      </div>

      {/* Bill Result */}
      {totalJars > 0 && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg max-w-lg">
          <h2 className="text-lg font-bold">Bill Summary</h2>
          <p>Total Jars: {totalJars}</p>
          <p>Total Amount: ₹{totalAmount}</p>
          <button
            onClick={handleDownloadPDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
