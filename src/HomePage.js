import React, { useState, useEffect } from "react";
import "./HomePage.css";

const HomePage = ({ setCurrentPage }) => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      {/* Top Bar */}
      <div className={`top-bar ${darkMode ? "dark" : "light"}`}>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "⬅️" : "➡️"}
        </button>
        <h2 className="top-bar-title">Welcome, Admin</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <span style={{ marginLeft: "auto", color: "white" }}>{currentTime.toLocaleTimeString()}</span>
        <button className="dark-mode-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
        <span className="notification-bell">🔔</span>
      </div>

      <div className="content-wrapper">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="sidebar">
            <h2 className="logo">My App</h2>
            <ul className="sidebar-list">
              {["Dashboard", "Profile", "Settings", "Contact", "Add Customer", "Logout"].map((item) => (
                <li
                  key={item}
                  className={`sidebar-list-item ${activeContent === item ? "active" : ""}`}
                  onClick={() => {
                    if (item === "Logout") {
                      if (window.confirm("Are you sure you want to log out?")) {
                        setCurrentPage("login");
                      }
                    } else {
                      setActiveContent(item);
                    }
                  }}
                >
                  {getIcon(item)}
                  <span style={{ marginLeft: "10px" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Main Content */}
        <div className="main-content">
          <h1>{activeContent}</h1>

          {activeContent === "Dashboard" && (
            <div className="marquee-wrapper">
              <marquee behavior="scroll" direction="left" className="marquee">
                📢 Welcome to the Dashboard! Stay updated with the latest information here.
              </marquee>
            </div>
          )}

          {renderContent(activeContent)}
        </div>
      </div>
    </div>
  );
};

// Add Customer Form Component
const AddCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer data:', formData);
    setFormData({ name: '', email: '', phone: '', address: '' });
    alert('Customer added successfully!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-customer-form">
      <h2>New Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </form>
    </div>
  );
};

// Content Renderer
const renderContent = (activeContent) => {
  switch (activeContent) {
    case "Dashboard":
      return (
        <div className="dashboard-content">
          <p>📊 Welcome to the Dashboard! Here you can see the overview of your activities.</p>
          <div className="stats-container">
            <div className="stat-box">
              <h3>Total Customers</h3>
              <p>1,234</p>
            </div>
            <div className="stat-box">
              <h3>Recent Orders</h3>
              <p>89</p>
            </div>
            <div className="stat-box">
              <h3>Monthly Revenue</h3>
              <p>$45,678</p>
            </div>
          </div>
        </div>
      );
    case "Profile":
      return <div className="profile-content">👤 User Profile Section</div>;
    case "Settings":
      return <div className="settings-content">⚙️ Application Settings Panel</div>;
    case "Contact":
      return <div className="contact-content">📞 Contact Support: support@example.com</div>;
    case "Add Customer":
      return <AddCustomerForm />;
    default:
      return <div>Welcome to the Dashboard</div>;
  }
};

// Sidebar Icons
const getIcon = (item) => {
  const icons = {
    Dashboard: "📊",
    Profile: "👤",
    Settings: "⚙️",
    Contact: "📞",
    "Add Customer": "➕",
    Logout: "🚪",
  };
  return <span>{icons[item]}</span>;
};

export default HomePage;