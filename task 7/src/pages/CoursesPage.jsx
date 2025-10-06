import './Page.css'

const CoursesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Courses Offered</h1>
      </div>
      
      <div className="page-content">
        <div className="welcome-card">
          <h2>Academic Programs at Charusat University</h2>
          <p className="subtitle">Choose from our wide range of undergraduate and postgraduate programs</p>
          
          <div className="info-grid">
            <div className="info-item">
                <h3>University Overview</h3>
              <h3>Engineering Programs</h3>
              <p>Bachelor of Technology (B.Tech) programs in Computer Science, Information Technology, Mechanical, Civil, and Electrical Engineering with modern curriculum and industry exposure.</p>
            </div>
            
            <div className="info-item">
              <h3>Management Programs</h3>
              <p>Comprehensive business education through BBA and MBA programs designed to develop future business leaders and entrepreneurs.</p>
            </div>
            
            <div className="info-item">
              <h3>Computer Applications</h3>
              <p>Master of Computer Applications (MCA) program focusing on software development, programming, and IT industry requirements.</p>
            </div>
            
            <div className="info-item">
              <h3>Applied Sciences</h3>
              <p>Bachelor of Science programs in various applied science fields providing strong foundation for research and industry careers.</p>
            </div>
          </div>
          
          <div className="features-list">
            <h3>Undergraduate Programs (B.Tech)</h3>
            <ul>
              <li>Computer Science & Engineering - 4 Years</li>
              <li>Information Technology - 4 Years</li>
              <li>Mechanical Engineering - 4 Years</li>
              <li>Civil Engineering - 4 Years</li>
              <li>Electrical Engineering - 4 Years</li>
              <li>Electronics & Communication Engineering - 4 Years</li>
            </ul>
          </div>
          
          <div className="features-list">
            <h3>Postgraduate Programs</h3>
            <ul>
              <li>Master of Technology (M.Tech) - Computer Science & Engineering - 2 Years</li>
              <li>Master of Computer Applications (MCA) - 3 Years</li>
              <li>Master of Business Administration (MBA) - 2 Years</li>
              <li>Master of Science (M.Sc) - Applied Sciences - 2 Years</li>
            </ul>
          </div>
          
          <div className="features-list">
            <h3>Other Programs</h3>
            <ul>
              <li>Bachelor of Business Administration (BBA) - 3 Years</li>
              <li>Bachelor of Science (B.Sc) - Applied Sciences - 3 Years</li>
              <li>Diploma Programs - Various Engineering Fields - 3 Years</li>
              <li>Certificate Courses - Short-term skill development programs</li>
            </ul>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Degree Programs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Engineering Branches</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3-4</span>
              <span className="stat-label">Years Duration</span>
            </div>
          </div>
          
          <div className="program-highlights">
            
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default CoursesPage
