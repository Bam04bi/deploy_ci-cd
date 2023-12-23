function Contact() {
    // Component rendering the contact form
    return (
      <div className="container contact">
        {/* Title */}
        <h2 className="main-title text-center">CONTACT</h2>
  
        {/* Contact Form Inputs */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 mb-1">
              {/* Name Input */}
              <input name="name" placeholder="Name" className="contact-input" />
            </div>
  
            <div className="col-md-4 mb-1">
              {/* Email Input */}
              <input name="email" placeholder="Email" className="contact-input" />
            </div>
            <div className="col-md-4 mb-1">
              {/* Subject Input */}
              <input
                name="subject"
                placeholder="Subject"
                className="contact-input"
              />
            </div>
          </div>
        </div>
        <br />
  
        {/* Message Textarea */}
        <div className="col-md-12">
          <textarea
            name="message"
            placeholder="Message"
            className="contact-textarea"
          />
        </div>
  
        <br></br>
  
        {/* Submit Button */}
        <div className="row">
          <div className="col-md-12">
            <input className="form-btn" type="submit" value="Send Message" />
          </div>
        </div>
      </div>
    );
  }
  
  export default Contact;
  