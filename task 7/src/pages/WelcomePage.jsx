import './Page.css'

const WelcomePage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Welcome to CHARUSAT University</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>Charotar University of Science and Technology</h2>
          <p className="subtitle">Excellence in Education & Innovation</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Our Mission</h3>
              <p>To provide world-class education and foster innovation, research, and entrepreneurship among students.</p>
            </div>
            
            <div className="info-item">
              <h3>Our Vision</h3>
              <p>To be a globally recognized university that creates leaders and innovators for tomorrow's challenges.</p>
            </div>
            
            <div className="info-item">
              <h3>Academic Excellence</h3>
              <p>Offering diverse programs in Engineering, Management, Applied Sciences, and Computer Applications.</p>
            </div>
            
            <div className="info-item">
              <h3>Research & Innovation</h3>
              <p>Promoting cutting-edge research and innovation across various disciplines and industries.</p>
            </div>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">8,000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Faculty</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Programs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
