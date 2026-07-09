import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";

function AdminDashboard() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {

      const response = await api.get(
        "http://localhost:5000/api/tickets/all"
      );

      setTickets(response.data.tickets);

    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (id, status) => {

  try {

    const response = await api.put(
      `http://localhost:5000/api/tickets/status/${id}`,
      {
        status,
      }
    );

    alert(response.data.message);

    fetchTickets();

  } catch (error) {

    alert(error.response?.data?.message || "Update Failed");

  }

};

  return (
    <div className="admin-container">

      <h1>Admin Dashboard</h1>

      <table>

        <thead>

          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {tickets.map((ticket) => (

            <tr key={ticket._id}>

              <td>{ticket.createdBy.fullName}</td>

              <td>{ticket.createdBy.email}</td>

              <td>{ticket.title}</td>

              <td>{ticket.category}</td>

              <td>

  <select
    defaultValue={ticket.status}
    onChange={(e) =>
      updateStatus(ticket._id, e.target.value)
    }
  >

    <option>Open</option>

    <option>In Progress</option>

    <option>Closed</option>

  </select>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;