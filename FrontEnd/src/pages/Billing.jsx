import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Billing() {
  const customersList = [
    { id: 1, name: "ABC Company", rate: 30 },
    { id: 2, name: "XYZ Traders", rate: 25 }
  ];

  const [customerId, setCustomerId] = useState("");
  const [month, setMonth] = useState("");
  const [billData, setBillData] = useState(null);

  const handleGenerateBill = async () => {
    if (!customerId || !month) return;

    const customer = customersList.find(c => c.id === parseInt(customerId));

    try {
      const res = await fetch(
        `/api/deliveries/billing-data?customerId=${customerId}&month=${month}`
      );
      const deliveries = await res.json();

      const totalJars = deliveries.reduce((sum, d) => sum + d.jars, 0);
      const totalAmount = totalJars * customer.rate;

      setBillData({ customer, deliveries, totalJars, totalAmount });
    } catch (err) {
      console.error("Error fetching billing data:", err);
    }
  };

  const handleDownloadPDF = () => {
    if (!billData) return;
    const { customer, deliveries, totalJars, totalAmount } = billData;
    const doc = new jsPDF();

    doc.setFontSize(20).text("JarTrack - Monthly Invoice", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Date", "Jars Delivered", "Rate", "Amount"]],
      body: deliveries.map(d => [
        d.date,
        d.jars,
        `₹${customer.rate}`,
        `₹${d.jars * customer.rate}`
      ]),
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Jars: ${totalJars}`, 14, finalY);
    doc.text(`Total Amount: ₹${totalAmount}`, 14, finalY + 8);

    doc.save(`Invoice-${customer.name}-${month}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>

      <div className="bg-white p-4 rounded-lg shadow max-w-lg space-y-4">
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
          <option value="">Select Customer</option>
          {customersList.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />

        <button onClick={handleGenerateBill} className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Bill
        </button>
      </div>

      {billData && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg max-w-lg">
          <h2 className="text-lg font-bold">Bill Summary</h2>
          <p>Total Jars: {billData.totalJars}</p>
          <p>Total Amount: ₹{billData.totalAmount}</p>
          <button onClick={handleDownloadPDF} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
