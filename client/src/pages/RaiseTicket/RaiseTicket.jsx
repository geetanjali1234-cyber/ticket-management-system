import "./RaiseTicket.css";
import { useState } from "react";
import api from "../../utils/axiosConfig";

function RaiseTicket() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    category: "Technical",
  });

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "http://localhost:5000/api/tickets/create",
        {
          ...ticketData,
          createdBy: user.id,
        }
      );

      alert(response.data.message);

      setTicketData({
        title: "",
        description: "",
        category: "Technical",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="raise-container">
      <div className="raise-box">
        <h2>Raise a New Ticket</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Ticket Title"
            value={ticketData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={ticketData.description}
            onChange={handleChange}
            required
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

          <button type="submit">
            Create Ticket
          </button>

        </form>
      </div>
    </div>
  );
}

export default RaiseTicket;