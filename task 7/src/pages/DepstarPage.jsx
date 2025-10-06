import './Page.css'

const DepstarPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Depstar - Devang Patel Institute of Advance Technology and Research</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>Devang Patel Institute of Advance Technology and Research</h2>
          <p className="subtitle">Leading Institute for Technology & Research</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>About Depstar</h3>
              <p>DEPSTAR is a premier institute under Charusat University, dedicated to advancing technology education and research.</p>
            </div>
            
            <div className="info-item">
              <h3>Innovation Hub</h3>
              <p>State-of-the-art facilities and laboratories that foster innovation and practical learning experiences.</p>
            </div>
            
            <div className="info-item">
              <h3>Programs Offered</h3>
              <p>Undergraduate and Postgraduate programs in Computer Science, Information Technology, and emerging technologies.</p>
            </div>
            
            <div className="info-item">
              <h3>Industry Connect</h3>
              <p>Strong industry partnerships providing internships, placements, and real-world project opportunities.</p>
            </div>
          </div>
          
          <div className="features-list">
            <h3>Key Features</h3>
            <ul>
              <li>Modern infrastructure with smart classrooms</li>
              <li>Experienced faculty with industry expertise</li>
              <li>Research-oriented curriculum</li>
              <li>Innovation and entrepreneurship programs</li>
              <li>Active placement cell with 90%+ placement record</li>
              <li>Student clubs and technical societies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepstarPage
