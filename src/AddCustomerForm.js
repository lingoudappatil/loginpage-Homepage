const AddCustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Customer added:', { name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
    };
  
    return (
      <div className="add-customer-form">
        <h2>Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
		  <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Customer</button>
        </form>
      </div>
    );
  };