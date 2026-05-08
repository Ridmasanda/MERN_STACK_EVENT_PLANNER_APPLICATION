import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const mapEmbedUrl =
    "https://www.google.com/maps?q=Hikkaduwa,+Sri+Lanka&output=embed";
  const mapShareUrl = "https://maps.app.goo.gl/KhadW7U8fcQftjXCA";

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      toast.error("All fields are required!");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          name,
          email,
          subject,
          message,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success(res.data.message || "Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Failed to send message. Please try again.";
      toast.error(errorMessage);
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact container" id="contact">
        <div className="banner">
          <div className="item">
            <h4>Address</h4>
            <p>No.32 , Hikkaduwa , Galle , Sri Lanka </p>
          </div>
          <div className="item">
            <h4>Call Us</h4>
            <p>Call Us: +94 11 123 4567</p>
          </div>
          <div className="item">
            <h4>Mail Us</h4>
            <p>ridmasanda2003@gmail.com</p>
          </div>
        </div>
        <div className="banner">
          <div className="item">
            <iframe
              src={mapEmbedUrl}
              style={{ border: 0, width: "100%", height: "450px" }}
              title="Google Maps location"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapShareUrl}
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: "12px", display: "inline-block" }}
            >
              Open this location in Google Maps
            </a>
          </div>
          <div className="item">
            <form onSubmit={handleSendMessage}>
              <h2>CONTACT</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                rows={10}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;