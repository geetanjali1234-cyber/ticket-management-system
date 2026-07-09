import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";


function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    progressTickets: 0,
    closedTickets: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get(
        `http://localhost:5000/api/tickets/dashboard/${user.id}`
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // For JWT (we'll use it next)

    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1>Ticket Management Dashboard</h1>

      <h2>Welcome, {user.fullName} 👋</h2>

      <div className="stats-container">
        <div className="card">
          <h3>Total Tickets</h3>
          <h1>{stats.totalTickets}</h1>
        </div>

        <div className="card">
          <h3>Open Tickets</h3>
          <h1>{stats.openTickets}</h1>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <h1>{stats.progressTickets}</h1>
        </div>

        <div className="card">
          <h3>Closed Tickets</h3>
          <h1>{stats.closedTickets}</h1>
        </div>
      </div>

      <div className="buttons">
        <Link to="/raise-ticket">
          <button>Raise Ticket</button>
        </Link>

        <Link to="/my-tickets">
          <button>My Tickets</button>
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;