import './Page.css'

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>About This Website</h2>
          <p className="subtitle">Information Portal for Charusat University</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Purpose</h3>
              <p>This website provides information about Charusat University and its various departments and institutes.</p>
            </div>
            
            <div className="info-item">
              <h3>Content</h3>
              <p>Find details about the university, DEPSTAR institute, and the Computer Science & Engineering department.</p>
            </div>
            
            <div className="info-item">
              <h3>Navigation</h3>
              <p>Use the sidebar menu to browse through different sections and learn more about our institution.</p>
            </div>
            
            <div className="info-item">
              <h3>Contact</h3>
              <p>For more information, please visit the official Charusat University website or contact the admissions office.</p>
            </div>
          </div>
          
          <div className="features-list">
            <h3>Website Sections</h3>
            <ul>
              <li>Welcome to Charusat - Overview of the university</li>
              <li>Depstar - Information about the institute</li>
              <li>Depstar CSE - Computer Science & Engineering department details</li>
              <li>About - This page with website information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
