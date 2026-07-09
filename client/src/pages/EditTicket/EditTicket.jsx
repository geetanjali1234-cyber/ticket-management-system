import "./EditTicket.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";

function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    category: "Technical",
    status: "Open",
  });

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.get(
        `http://localhost:5000/api/tickets/mytickets/${user.id}`
      );

      const ticket = response.data.tickets.find(
        (t) => t._id === id
      );

      if (ticket) {
        setTicketData(ticket);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `http://localhost:5000/api/tickets/update/${id}`,
        ticketData
      );

      alert(response.data.message);

      navigate("/my-tickets");

    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">

        <h2>Edit Ticket</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={ticketData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={ticketData.category}
            onChange={handleChange}
          >
            <option>Technical</option>
            <option>Billing</option>
            <option>General</option>
          </select>

          <select
            name="status"
            value={ticketData.status}
            onChange={handleChange}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <button type="submit">
            Update Ticket
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditTicket;