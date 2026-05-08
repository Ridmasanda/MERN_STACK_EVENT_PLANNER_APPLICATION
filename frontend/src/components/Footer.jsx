import React from "react";

const Footer = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [subscribeStatus, setSubscribeStatus] = React.useState(null);
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alert("Please enter an email address!");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubscribeStatus({ type: "success", message: data.message });
        setEmail("");
        setTimeout(() => setSubscribeStatus(null), 3000);
      } else {
        setSubscribeStatus({ type: "error", message: data.message });
        setTimeout(() => setSubscribeStatus(null), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubscribeStatus({ type: "error", message: "Failed to subscribe. Please try again." });
      setTimeout(() => setSubscribeStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer>
      <div className="banner">
        <div className="title">
          <h1>RIDMA's</h1>
          <p>Events and Weddings</p>
        </div>
        <div className="tag">
          <label>News Letter</label>
          <form onSubmit={handleSubscribe}>
            <div>
              <input 
                type="email" 
                placeholder="E-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
          {subscribeStatus && (
            <p style={{
              color: subscribeStatus.type === "success" ? "#4CAF50" : "#f44336",
              marginTop: "8px",
              fontSize: "14px"
            }}>
              {subscribeStatus.message}
            </p>
          )}
          <p>Sign up with your email address to receive news and updates!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;