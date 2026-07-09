import "./MyTickets.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";


function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get(
        `http://localhost:5000/api/tickets/mytickets/${user.id}`
      );

      setTickets(response.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTicket = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmDelete) return;

  try {

    const response = await api.delete(
      `http://localhost:5000/api/tickets/delete/${id}`
    );

    alert(response.data.message);

    fetchTickets();

  } catch (error) {
    alert(error.response?.data?.message || "Delete Failed");
  }
};

  return (
    <div className="tickets-container">
      <h2>My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div className="ticket-card" key={ticket._id}>
            <h3>{ticket.title}</h3>

            <p>{ticket.description}</p>

            <p>
              <strong>Category:</strong> {ticket.category}
            </p>

            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
            <Link to={`/edit-ticket/${ticket._id}`}>
  <button>Edit</button>
</Link>
<button
  onClick={() => deleteTicket(ticket._id)}
>
  Delete
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTickets;