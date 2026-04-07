import { useEffect, useState, useRef } from 'react';

const TenantToTenantMigration = () => {
  useEffect(() => {
    document.title = 'Tenant to Tenant Migration Services - Shefware';

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const featureObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleFeatures(prev => new Set(prev).add(index));
          }, index * 150); // Staggered animation
        }
      });
    }, observerOptions);

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setAnimatedStats(prev => new Set(prev).add(index));
          }, index * 200); // Staggered stats animation
        }
      });
    }, observerOptions);

    // Observe feature items
    featureRefs.current.forEach((ref) => {
      if (ref) featureObserver.observe(ref);
    });

    // Observe stats items
    statsRefs.current.forEach((ref) => {
      if (ref) statsObserver.observe(ref);
    });

    return () => {
      featureObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    date: '',
    hours: '09 AM',
    mins: '00',
    zone: 'EST',
  });

  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const [animatedStats, setAnimatedStats] = useState(new Set());
  const [activeFeature, setActiveFeature] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const featureRefs = useRef([]);
  const statsRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you shortly.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      country: '',
      date: '',
      hours: '09 AM',
      mins: '00',
      zone: 'EST',
    });
  };

  const handleFeatureClick = (index) => {
    setActiveFeature(activeFeature === index ? null : index);
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const handleFeatureHover = (index) => {
    setActiveFeature(index);
  };

  const handleFeatureLeave = () => {
    if (expandedFeature === null) {
      setActiveFeature(null);
    }
  };

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
          <div className="floating-element element-5"></div>
          <div className="floating-element element-6"></div>
        </div>
        <div className="container">
          <div className="service-hero-content">
            <h1><span>Shefware</span> <span>Tenant</span> <span>to</span> <span>Tenant</span> <span>Migration</span> <span>Office</span> <span>365</span> <span>Service</span></h1>
            <p className="hero-description">Seamless Transfer of your digital workspace</p>
            <p className="service-detailed-description">Shefware Tenant to Tenant Migration or Office 365 Migration to Office 365 Migration is the process of transferring mailboxes, files, users, and Teams from one Microsoft 365 Tenant to another Microsoft 365 Tenant. The common reasons the organization does Tenant-to-Tenant Migration include mergers & acquisitions, divestitures, and rebranding the company.</p>
            
            <div className="service-stats">
              <div className="stat-item">
                <h3>15000+</h3>
                <p>SUCCESSFUL MIGRATION</p>
              </div>
              <div className="stat-item">
                <h3>99%</h3>
                <p>DATA ACCURACY</p>
              </div>
              <div className="stat-item">
                <h3>24x7</h3>
                <p>CUSTOMER SUPPORT</p>
              </div>
            </div>
          </div>
          
          <div className="service-hero-form">
            <h3>Let's connect</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name*</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Jane" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="jane.doe@enterprise.com" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Select Your Country</label>
                <select 
                  id="country" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleInputChange}
                >
                  <option value="">Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-section">
                <p className="form-section-title">Please choose an appropriate time for a callback (Optional)</p>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hours">Hours</label>
                    <select 
                      id="hours" 
                      name="hours" 
                      value={formData.hours} 
                      onChange={handleInputChange}
                    >
                      <option value="09 AM">09 AM</option>
                      <option value="10 AM">10 AM</option>
                      <option value="11 AM">11 AM</option>
                      <option value="12 PM">12 PM</option>
                      <option value="01 PM">01 PM</option>
                      <option value="02 PM">02 PM</option>
                      <option value="03 PM">03 PM</option>
                      <option value="04 PM">04 PM</option>
                      <option value="05 PM">05 PM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mins">Mins</label>
                    <select 
                      id="mins" 
                      name="mins" 
                      value={formData.mins} 
                      onChange={handleInputChange}
                    >
                      <option value="00">00</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zone">Zone</label>
                    <select 
                      id="zone" 
                      name="zone" 
                      value={formData.zone} 
                      onChange={handleInputChange}
                    >
                      <option value="EST">EST</option>
                      <option value="CST">CST</option>
                      <option value="MST">MST</option>
                      <option value="PST">PST</option>
                      <option value="GMT">GMT</option>
                      <option value="CET">CET</option>
                      <option value="IST">IST</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="form-submit">Submit Request</button>
              
              <p className="form-privacy">By submitting this form you agree to the terms in our privacy policy.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="key-benefits-section">
        <div className="container">
          <div className="key-benefits-content">
            <div className="benefits-left">
              <h2>Key Benefits of Our Tenant to Tenant Migration Service</h2>
              <div className="blue-underline"></div>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Choosing Our Service boosts collaboration between users and their productivity by combining all teams working under same tenant</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Our Shefware Tenant-to-Tenant Migration ensures there is data integrity, followed by easily moving all mailbox data safely and securely</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>We have designed Shefware to support organizations of all sizes, whether it is a small team or a team of thousands of users</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Shefware Tenant-to-Tenant Migration is cost-effective, with ease of data migration through our tools, which reduce operational cost of organization</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>We ensure seamless transfer of all critical data, including OneDrive, SharePoint, Teams, etc while maintaining data integrity in process</p>
                </div>
              </div>
            </div>
            <div className="benefits-right">
              <div className="benefits-image">
                <img src="/images/tenant-migration.svg" alt="Tenant Migration Benefits" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="office365-migration-section">
        <div className="container">
          <div className="office365-header">
            <h2>Shefware Core Office 365 Migration Services</h2>
            <p>Shefware provides of Office 365 Migration tool, which is divided into 4 types, and each migration helps you with your specific problem.</p>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            <div className="timeline-item timeline-left">
              <div className="timeline-card">
                <div className="timeline-number">1</div>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3>Staged Migration</h3>
                <p>Transfer mails from on-premises Exchange to Exchange Online for Medium-to-Large organizations</p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-card">
                <div className="timeline-number">2</div>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3>Express/Cutover Migration</h3>
                <p>Quick method to migrate all emails and data at once in single phase</p>
              </div>
            </div>

            <div className="timeline-item timeline-left">
              <div className="timeline-card">
                <div className="timeline-number">3</div>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Hybrid Deployment</h3>
                <p>Blend of old system and cloud system used together</p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-card">
                <div className="timeline-number">4</div>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h3>Internet Message Access Protocol</h3>
                <p>Keep mail, contacts, and data on mail server with flexible access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="migration-works-section">
        <div className="container">
          <div className="section-header">
            <h1>How Shefware Office 365 Migration Works</h1>
            <p>Office 365 Migration allows all the users, emails, applications, and files in existing account to be exported safely and smoothly.</p>
          </div>

          <div className="migration-journey-visualizer">
            <div className="background-abstract-flow"></div>
            <div className="horizontal-journey-paths-desktop">
              <svg width="1136" height="95" viewBox="0 0 1136 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 47.5H1136" stroke="#C9DBFE" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
            <div className="horizontal-journey-paths-desktop-bottom">
              <svg width="1136" height="203" viewBox="0 0 1136 203" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 101.5H1136" stroke="#C9DBFE" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>

            <div className="milestone-nodes-bento-grid">
              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                      </svg>
                    </div>
                    <div className="step-number">1</div>
                  </div>
                  <h3>Analyzing & Assessment</h3>
                  <p>Users need to identify current data, systems, and users, and requirements of migration in the whole process.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div className="step-number">2</div>
                  </div>
                  <h3>Configuration & Account Settings</h3>
                  <p>The customers need to create user accounts & calendars on the target tenant and assign licenses and permissions to initiate user access.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l-6 6v3h9l3-3"/>
                        <path d="M22 12l-4-6v3h-9l-3 3"/>
                      </svg>
                    </div>
                    <div className="step-number">3</div>
                  </div>
                  <h3>Correct Migration Selection</h3>
                  <p>Further, users need to select right migration process as per organizational size, needs, and requirements.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                    <div className="step-number">4</div>
                  </div>
                  <h3>Organize & Add Data</h3>
                  <p>You need to structure and add important data, such as emails, files, contacts, and calendars, to new environment.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                    <div className="step-number">5</div>
                  </div>
                  <h3>Data Transfer</h3>
                  <p>Now, transfer all the data, such as emails and files, from local servers to Office 365.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <div className="step-number">6</div>
                  </div>
                  <h3>User Access & Configuration</h3>
                  <p>You need to assign licenses, change user settings, and restrict user access.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                      </svg>
                    </div>
                    <div className="step-number">7</div>
                  </div>
                  <h3>Data Verification</h3>
                  <p>Ensure all the data has been migrated accurately and systems are working.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <div className="step-number">8</div>
                  </div>
                  <h3>Post-Migration Support</h3>
                  <p>After the whole process, Shefware team provides support to resolve any queries or troubleshooting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secure-migration-section">
        <div className="container">
          <div className="section-header">
            <h2>Secure and Reliable Tenant to Tenant Migration</h2>
            <p>Our migration protocol ensures your transition is seamless and ironclad. We employ multi-layered protection to safeguard your critical business data at every step.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>End-to-End Encryption</h3>
              <p>We encrypt data during migration, monitoring the restrictions and access of the user.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>No Temporary Storage</h3>
              <p>The data is never stored on third-party servers; instead, it quickly moves to the desired tenant environment.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>API Based Transfer</h3>
              <p>We use secure and official Microsoft 365 APIs for data transfer, which prevents any manual errors.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Secured User Profile</h3>
              <p>We ensure that the users' passwords and other important credentials are not accessed during or post-migration.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3>Data Verification</h3>
              <p>Users can be fully assured that the files, emails, and content are unchanged.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 4 8-11 8-11-8-4-8z"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z"/>
                </svg>
              </div>
              <h3>Monitoring & Scanning</h3>
              <p>We provide tools to scan and detect errors or any potential security threats.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="compliance-section">
        <div className="container">
          <div className="compliance-content">
            <div className="compliance-info">
              <h2>Certified Compliance Standards</h2>
              <p>Our migration platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.</p>
              <div className="compliance-tags">
                <div className="compliance-tag">SOC2 Certified</div>
                <div className="compliance-tag">GDPR Compliant</div>
                <div className="compliance-tag">ISO 27001</div>
              </div>
            </div>
            <div className="compliance-image">
              <img src="/images/secure-infrastructure.svg" alt="Secure Infrastructure" />
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-shefware-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Shefware Tenant to Tenant Migration?</h2>
            <p>Discover the advantages that make Shefware the trusted choice for seamless tenant migrations</p>
          </div>

          <div className="features-horizontal-timeline">
            <div className="timeline-connection-line"></div>
            
            <div className="feature-item" 
                 ref={(el) => featureRefs.current[0] = el} 
                 data-index="0"
                 onClick={() => handleFeatureClick(0)}
                 onMouseEnter={() => handleFeatureHover(0)}
                 onMouseLeave={handleFeatureLeave}
                 style={{
                   opacity: visibleFeatures.has(0) ? 1 : 0,
                   transform: visibleFeatures.has(0) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Safety & Security</h3>
              <p>Our service ensures the migrated data is encrypted and protected.</p>
              {expandedFeature === 0 && (
                <div className="feature-expanded-content">
                  <div className="expanded-content-inner">
                    <h4>Advanced Security Features</h4>
                    <ul>
                      <li>End-to-end encryption during migration</li>
                      <li>Multi-factor authentication protocols</li>
                      <li>Real-time security monitoring</li>
                      <li>Compliance with international standards</li>
                    </ul>
                    <div className="feature-metrics">
                      <div className="metric-item">
                        <span className="metric-value">256-bit</span>
                        <span className="metric-label">Encryption</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-value">99.9%</span>
                        <span className="metric-label">Uptime</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="feature-item" 
                 ref={(el) => featureRefs.current[1] = el} 
                 data-index="1"
                 style={{
                   opacity: visibleFeatures.has(1) ? 1 : 0,
                   transform: visibleFeatures.has(1) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Minimal Service Interruption</h3>
              <p>We provide you with the service where there is minimal to zero downtime.</p>
            </div>

            <div className="feature-item" 
                 ref={(el) => featureRefs.current[2] = el} 
                 data-index="2"
                 style={{
                   opacity: visibleFeatures.has(2) ? 1 : 0,
                   transform: visibleFeatures.has(2) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
              </div>
              <h3>MultiData Migration</h3>
              <p>Users can easily migrate multiple data and files through our Shefware Tenant-to-Tenant Migration.</p>
            </div>

            <div className="feature-item" 
                 ref={(el) => featureRefs.current[3] = el} 
                 data-index="3"
                 style={{
                   opacity: visibleFeatures.has(3) ? 1 : 0,
                   transform: visibleFeatures.has(3) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Adherence to Laws & Regulations</h3>
              <p>Shefware adheres to all legal laws and regulations to execute this process.</p>
            </div>

            <div className="feature-item" 
                 ref={(el) => featureRefs.current[4] = el} 
                 data-index="4"
                 style={{
                   opacity: visibleFeatures.has(4) ? 1 : 0,
                   transform: visibleFeatures.has(4) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h3>Collaboration & Communication</h3>
              <p>Our Service ensures that the teams, files, and emails are migrated smoothly to the new tenant for user collaboration.</p>
            </div>

            <div className="feature-item" 
                 ref={(el) => featureRefs.current[5] = el} 
                 data-index="5"
                 style={{
                   opacity: visibleFeatures.has(5) ? 1 : 0,
                   transform: visibleFeatures.has(5) ? 'translateY(0)' : 'translateY(30px)',
                   transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Uninterrupted File Access</h3>
              <p>Users can easily access their files even after the data migration to a new tenant.</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card" 
                   ref={(el) => statsRefs.current[0] = el} 
                   data-index="0"
                   style={{
                     opacity: animatedStats.has(0) ? 1 : 0,
                     transform: animatedStats.has(0) ? 'translateY(0)' : 'translateY(20px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                   }}>
                <h3>{animatedStats.has(0) ? '12M+' : '0'}</h3>
                <p>Items Migrated</p>
              </div>
              <div className="stat-card" 
                   ref={(el) => statsRefs.current[1] = el} 
                   data-index="1"
                   style={{
                     opacity: animatedStats.has(1) ? 1 : 0,
                     transform: animatedStats.has(1) ? 'translateY(0)' : 'translateY(20px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                   }}>
                <h3>{animatedStats.has(1) ? '99.9%' : '0%'}</h3>
                <p>Success Rate</p>
              </div>
              <div className="stat-card" 
                   ref={(el) => statsRefs.current[2] = el} 
                   data-index="2"
                   style={{
                     opacity: animatedStats.has(2) ? 1 : 0,
                     transform: animatedStats.has(2) ? 'translateY(0)' : 'translateY(20px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                   }}>
                <h3>{animatedStats.has(2) ? '450+' : '0'}</h3>
                <p>Enterprise Clients</p>
              </div>
              <div className="stat-card" 
                   ref={(el) => statsRefs.current[3] = el} 
                   data-index="3"
                   style={{
                     opacity: animatedStats.has(3) ? 1 : 0,
                     transform: animatedStats.has(3) ? 'translateY(0)' : 'translateY(20px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                   }}>
                <h3>{animatedStats.has(3) ? '24/7' : '0'}</h3>
                <p>Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <section className="testimonial-carousel">
        <div className="container">
          <div className="testimonial-header">
            <h2 className="testimonial-title">what our client says</h2>
            <a href="#" className="read-more-link">Read more...</a>
          </div>
          
          <div className="testimonial-carousel-container">
            <div className="testimonial-track">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="star-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "Shefware handled our migration from Google Workspace to Microsoft 365 with perfect precision. Their architectural approach ensured no downtime for our 500+ employees."
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="Michael Carter" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">Michael Carter</h4>
                    <p className="client-title">Head of IT Infrastructure</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="star-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "We were worried about years of data migration, but Shefware made the process completely stress-free. Their attention to security protocols was outstanding."
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="Emily Anderson" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">Emily Anderson</h4>
                    <p className="client-title">Cloud Systems Admin</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="carousel-controls">
              <button className="carousel-btn prev-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button className="carousel-btn next-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="carousel-dots">
              <button className="dot active"></button>
              <button className="dot"></button>
              <button className="dot"></button>
            </div>
          </div>
        </div>
        
        {/* Decorative icon overlay */}
        <div className="testimonial-decoration">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 10C100 10 40 40 40 100C40 160 100 190 100 190C100 190 160 160 160 100C160 40 100 10 100 10Z" fill="currentColor" opacity="0.03"/>
          </svg>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          {/* <div className="service-content">
            <h2>Enterprise Tenant Migration Solutions</h2>
            <p>Our tenant-to-tenant migration services enable organizations to merge, split, or completely move between Microsoft 365 tenants while maintaining business continuity and data integrity throughout the process.</p>
            
            <div className="service-features">
              <h3>Migration Scope</h3>
              <ul>
                <li>User mailboxes and archives migration</li>
                <li>SharePoint sites and document libraries</li>
                <li>OneDrive for Business content transfer</li>
                <li>Microsoft Teams chats and channels</li>
                <li>Power Platform environments</li>
                <li>Exchange Online configurations</li>
              </ul>
            </div>

            <div className="service-features">
              <h3>Advanced Capabilities</h3>
              <ul>
                <li>Coexistence management during migration</li>
                <li>Domain and DNS configuration management</li>
                <li>Licensing and subscription transfer</li>
                <li>Security and compliance settings migration</li>
                <li>Custom application and workflow migration</li>
                <li>Automated user provisioning and mapping</li>
              </ul>
            </div>

            <div className="service-benefits">
              <h3>Business Benefits</h3>
              <ul>
                <li>Zero-downtime migration with business continuity</li>
                <li>Complete data integrity and metadata preservation</li>
                <li>Seamless user experience with minimal training</li>
                <li>Comprehensive pre and post-migration support</li>
                <li>Scalable solutions for organizations of any size</li>
              </ul>
            </div>
          </div> */}
        </div>
      </section>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Shefware</h3>
              <p>Leading provider of enterprise email migration and data management solutions. We help businesses transform their digital infrastructure with cutting-edge technology and expert support.</p>
            </div>
            <div className="footer-column">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Email Migration</a></li>
                <li><a href="#">Data Backup</a></li>
                <li><a href="#">Cloud Solutions</a></li>
                <li><a href="#">Security Tools</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#">Enterprise</a></li>
                <li><a href="#">Small Business</a></li>
                <li><a href="#">Education</a></li>
                <li><a href="#">Healthcare</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h4>Find Us on</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">t</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">ig</a>
              </div>
              <div className="email-subscription">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Shefware. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TenantToTenantMigration;
