import { useState, useContext } from "react";
import { AuthContext } from "../../shared/components/AuthContext";
import "./ReportPage.css";

const ReportPage = ({ tripId, onEndTrip, setShowReportPage }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useContext(AuthContext);

  const dummyUser = user.user;

  
  const id = tripId.tripId;
  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/create-report", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, dummyUser, id, category }),
      });
      const data = await response.json();
      console.log(data);
      setShowReportPage(false);
      onEndTrip();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        className="report_title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        value={description}
        onChange={handleChange}
        name="description"
      />
      <div>
        <label>
          <input
            type="radio"
            name="category"
            value="lost"
            checked={category === "lost"}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
          Stolen/Lost
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="category"
            value="repair"
            checked={category === "repair"}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
          Needs Maintenance
        </label>
      </div>
      <p>Warning! Submitting the report will end your trip.</p>
      <button type="submit" className="submit_report">
        Submit Report
      </button>
    </form>
  );
};

export default ReportPage;
