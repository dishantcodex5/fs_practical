import './Page.css'

const DepstarCSEPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Depstar - Computer Science & Engineering</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>Computer Science & Engineering Department</h2>
          <p className="subtitle">Shaping Future Technology Leaders</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>CSE Excellence</h3>
              <p>The CSE department at DEPSTAR focuses on cutting-edge computer science education and research in emerging technologies.</p>
            </div>
            
            <div className="info-item">
              <h3>Specializations</h3>
              <p>AI/ML, Data Science, Cybersecurity, Cloud Computing, Mobile App Development, and Software Engineering.</p>
            </div>
            
            <div className="info-item">
              <h3>Research Areas</h3>
              <p>Machine Learning, Artificial Intelligence, IoT, Blockchain, Computer Vision, and Natural Language Processing.</p>
            </div>
            
            <div className="info-item">
              <h3>Achievements</h3>
              <p>Students regularly win national and international coding competitions, hackathons, and technical events.</p>
            </div>
          </div>
          
          <div className="features-list">
            <h3>Technical Infrastructure and co curriculum</h3>
            <ul>
              <li>Advanced Computer Labs with latest software</li>
              <li>AI/ML Research Lab with GPU clusters</li>
              <li>Cybersecurity Lab with ethical hacking tools</li>
              <li>Mobile App Development Studio</li>
              <li>Cloud Computing Lab with AWS/Azure access</li>
              <li>Project Development Centers</li>
            </ul>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">Placement Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Tech Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹ 4.5 LPA</span>
              <span className="stat-label">Avg Package</span>
            </div>
          </div>
          
          <div className="program-highlights">
            <h3>Program Highlights</h3>
            <div className="highlight-grid">
              <div className="highlight-item">
                <span>Industry-Aligned Curriculum</span>
              </div>
              <div className="highlight-item">
                <span>Hands-on Coding Practice</span>
              </div>
              <div className="highlight-item">
                <span>Startup Incubation</span>
              </div>
              <div className="highlight-item">
                <span>International Collaborations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepstarCSEPage
