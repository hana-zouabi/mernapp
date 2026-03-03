import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    work: "",
  });
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/persons");
      setPersons(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/persons", formData);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        work: "",
      });
      fetchPersons();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Enregistrement des Présences</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          name="work"
          placeholder="Work"
          value={formData.work}
          onChange={handleChange}
        />
        <button type="submit">Add Person</button>
      </form>

      <h3>Liste des Présents</h3>
      <ul className="person-list">
        {persons.map((p) => (
          <li key={p._id} className="person-card">
            <strong>{p.fullName}</strong> <br />
            Email: {p.email} <br />
            Phone: {p.phone || "-"} <br />
            Address: {p.address || "-"} <br />
            Work: {p.work || "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
