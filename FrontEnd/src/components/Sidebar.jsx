import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 p-4 w-48 min-h-screen">
      <ul className="space-y-3">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/deliveries">Deliveries</Link></li>
        <li><Link to="/billing">Billing</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </aside>
  );
}