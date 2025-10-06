import './Page.css'

const ContactPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>Get in Touch with Charusat University</h2>
          <p className="subtitle">We're here to help with your inquiries</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Main Campus</h3>
              <p>Charotar University of Science and Technology<br/>
              Changa, Anand - 388421<br/>
              Gujarat, India</p>
            </div>
            
            <div className="info-item">
              <h3>Phone Numbers</h3>
              <p>Main Office: +91-2697-265011<br/>
              Admissions: +91-2697-265021<br/>
              DEPSTAR: +91-2697-265031</p>
            </div>
            
            <div className="info-item">
              <h3>Email Addresses</h3>
              <p>General Inquiries: info@charusat.ac.in<br/>
              Admissions: admissions@charusat.ac.in<br/>
              DEPSTAR: depstar@charusat.ac.in</p>
            </div>
            
            <div className="info-item">
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM<br/>
              Saturday: 9:00 AM - 1:00 PM<br/>
              Sunday: Closed</p>
            </div>
          </div>
          
          <div className="features-list">
            <h3>Department Contacts</h3>
            <ul>
              <li>Computer Science & Engineering: cse@depstar.charusat.ac.in</li>
              <li>Information Technology: it@depstar.charusat.ac.in</li>
              <li>Mechanical Engineering: mech@charusat.ac.in</li>
              <li>Civil Engineering: civil@charusat.ac.in</li>
              <li>Electrical Engineering: electrical@charusat.ac.in</li>
              <li>Student Affairs: studentaffairs@charusat.ac.in</li>
            </ul>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Online Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">48 hrs</span>
              <span className="stat-label">Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5 Days</span>
              <span className="stat-label">Working Week</span>
            </div>
          </div>
          
          <div className="program-highlights">
            <h3>Quick Links</h3>
            <div className="highlight-grid">
              <div className="highlight-item">
                <span>Online Admission Portal</span>
              </div>
              <div className="highlight-item">
                <span>Student Portal</span>
              </div>
              <div className="highlight-item">
                <span>Faculty Directory</span>
              </div>
              <div className="highlight-item">
                <span>Campus Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
