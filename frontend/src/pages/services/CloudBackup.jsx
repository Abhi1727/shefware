import { useEffect, useState } from 'react';

const CloudBackup = () => {
  useEffect(() => {
    document.title = 'Cloud Backup Services - Shefware';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitState({ status: 'loading', message: '' });
    try {
      const response = await fetch(`${apiBaseUrl}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Unable to send your request right now.');
      }
      setSubmitState({ status: 'success', message: data.message || 'Thank you! We will contact you shortly.' });
      setFormData({ name: '', phone: '', email: '', country: '', date: '', hours: '09 AM', mins: '00', zone: 'EST' });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Shefware Cloud Backup Services</h1>
            <p className="hero-description">
              Dependable cloud backup for full data protection.
            </p>
            <p className="service-detailed-description">
              Dependable cloud backup for full data protection—Shefware delivers
              enterprise-grade scheduling, encryption, and recovery so mailboxes
              and critical data stay safe across platforms with minimal downtime.
            </p>
            
            <div className="service-stats">
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>UPTIME GUARANTEE</p>
              </div>
              <div className="stat-item">
                <h3>AES-256</h3>
                <p>ENCRYPTION STANDARD</p>
              </div>
              <div className="stat-item">
                <h3>24x7</h3>
                <p>MONITORING & SUPPORT</p>
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
              
              {submitState.status === 'success' && (
                <p className="form-success-msg">{submitState.message}</p>
              )}
              {submitState.status === 'error' && (
                <p className="form-error-msg">{submitState.message}</p>
              )}
              <button type="submit" className="form-submit" disabled={submitState.status === 'loading'}>
                {submitState.status === 'loading' ? 'Sending...' : 'Submit Request'}
              </button>

              <p className="form-privacy">By submitting this form you agree to the terms in our privacy policy.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="key-benefits-section">
        <div className="container">
          <div className="key-benefits-content">
            <div className="benefits-left">
              <h2>Key Benefits of Our Cloud Backup Service</h2>
              <div className="blue-underline"></div>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Automated backup scheduling with flexible retention policies ensures your data is always protected without manual intervention</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>End-to-end encryption with AES-256 security standards guarantees your data remains secure during transmission and storage</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Real-time backup with incremental and differential options minimizes storage requirements while maximizing data protection</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Cross-platform compatibility (Windows, macOS, Linux) provides comprehensive protection for all your organization's devices</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>24/7 monitoring and alerting system ensures immediate detection and resolution of any backup issues</p>
                </div>
              </div>
            </div>
            <div className="benefits-right">
              <div className="benefits-image">
                <img src="/images/cloud-backup.svg" alt="Cloud Backup Benefits" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="office365-migration-section">
        <div className="container">
          <div className="office365-header">
            <h2>Shefware Core Cloud Backup Solutions</h2>
            <p>Shefware provides comprehensive cloud backup solutions, divided into 4 types, each designed to address specific backup and recovery needs.</p>
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
                <h3>Full System Backup</h3>
                <p>Complete system image backup for disaster recovery with bare-metal restore capabilities</p>
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
                <h3>File & Folder Backup</h3>
                <p>Selective backup of critical files and folders with version history and point-in-time recovery</p>
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
                <h3>Database Backup</h3>
                <p>Specialized database backup solutions for SQL, Oracle, and NoSQL databases with transaction log backup</p>
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
                <h3>Cloud-to-Cloud Backup</h3>
                <p>SaaS application backup for Microsoft 365, Google Workspace, and other cloud services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="migration-works-section">
        <div className="container">
          <div className="section-header">
            <h1>How Shefware Cloud Backup Works</h1>
            <p>Our cloud backup system automatically protects your data with intelligent scheduling, encryption, and rapid recovery capabilities to ensure business continuity.</p>
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
                  <h3>Assessment & Planning</h3>
                  <p>Identify critical data, backup requirements, and create a comprehensive backup strategy tailored to your business needs.</p>
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
                  <h3>Configuration & Setup</h3>
                  <p>Install backup agents, configure schedules, set retention policies, and establish encryption protocols for secure data transmission.</p>
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
                  <h3>Automated Backup Execution</h3>
                  <p>System automatically performs scheduled backups with incremental changes, ensuring minimal impact on system performance.</p>
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
                  <h3>Secure Storage & Encryption</h3>
                  <p>Data is encrypted using AES-256 standards and stored in redundant, geographically distributed data centers for maximum reliability.</p>
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
                  <h3>Continuous Monitoring</h3>
                  <p>24/7 monitoring system tracks backup status, sends alerts for any issues, and ensures successful completion of all backup operations.</p>
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
                  <h3>Compliance & Reporting</h3>
                  <p>Generate comprehensive reports for compliance audits, including backup success rates, storage utilization, and recovery testing results.</p>
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
                  <h3>Rapid Recovery</h3>
                  <p>Quickly restore individual files, folders, or entire systems with point-in-time recovery options to minimize downtime.</p>
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
                  <h3>Ongoing Optimization</h3>
                  <p>Continuously optimize backup schedules, storage allocation, and retention policies based on changing business requirements and data growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secure-migration-section">
        <div className="container">
          <div className="section-header">
            <h2>Secure and Reliable Cloud Backup Solutions</h2>
            <p>Our backup protocol ensures your data is protected with enterprise-grade security. We employ multi-layered protection to safeguard your critical business data at every step.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>End-to-End Encryption</h3>
              <p>We encrypt data during backup and transmission, ensuring complete protection against unauthorized access.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Geo-Redundant Storage</h3>
              <p>Your data is stored across multiple geographic locations for maximum reliability and disaster recovery capabilities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Automated Scheduling</h3>
              <p>Set up automated backup schedules with flexible timing and retention policies to meet your business requirements.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Role-Based Access Control</h3>
              <p>We ensure that only authorized personnel can access backup data with granular permission controls and audit trails.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3>Data Integrity Verification</h3>
              <p>Automatic verification ensures your backups are complete and corruption-free with regular integrity checks.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 4 8-11 8-11-8-4-8z"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z"/>
                </svg>
              </div>
              <h3>Compliance Monitoring</h3>
              <p>We provide tools to ensure compliance with GDPR, HIPAA, and industry regulations with detailed audit logs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="compliance-section">
        <div className="container">
          <div className="compliance-content">
            <div className="compliance-info">
              <h2>Certified Compliance Standards</h2>
              <p>Our cloud backup platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your data protection meets legal and professional standards.</p>
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
            <h2>Why Choose Shefware Cloud Backup Services?</h2>
            <p>Discover the advantages that make Shefware the trusted choice for enterprise cloud backup solutions</p>
          </div>

          <div className="features-horizontal-timeline">
            <div className="timeline-connection-line"></div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Safety & Security</h3>
              <p>Our service ensures your backup data is encrypted with AES-256 and protected by multi-layer security protocols.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>24/7 Monitoring</h3>
              <p>We provide continuous monitoring of your backup operations with instant alerts and proactive issue resolution.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
              </div>
              <h3>Automated Scheduling</h3>
              <p>Users can easily set up automated backup schedules with flexible retention policies through our intuitive interface.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Compliance Ready</h3>
              <p>Shefware adheres to all legal compliance requirements including GDPR, HIPAA, and industry-specific regulations.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h3>Scalable Storage</h3>
              <p>Our Service provides unlimited storage capacity that grows with your business needs without performance degradation.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Rapid Recovery</h3>
              <p>Users can quickly restore their data with point-in-time recovery options to minimize business disruption.</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>99.9%</h3>
                <p>Uptime Guarantee</p>
              </div>
              <div className="stat-card">
                <h3>PB+</h3>
                <p>Data Protected</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Enterprise Clients</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
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
                    "Shefware's cloud backup solution has been a game-changer for our organization. The automated scheduling and rapid recovery features saved us from potential data loss multiple times."
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="David Chen" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">David Chen</h4>
                    <p className="client-title">IT Director</p>
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
                    "The compliance features and encryption standards of Shefware's backup service gave us the confidence we needed for our sensitive healthcare data. Outstanding service!"
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="Sarah Johnson" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">Sarah Johnson</h4>
                    <p className="client-title">Healthcare Administrator</p>
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
            <h2>Enterprise Cloud Backup Solutions</h2>
            <p>Our cloud backup services provide enterprise-grade protection for your critical business data. With automated scheduling, encryption, and rapid recovery capabilities, ensure your business continuity with minimal downtime.</p>
            
            <div className="service-features">
              <h3>Backup Scope</h3>
              <ul>
                <li>Full system image backup for disaster recovery</li>
                <li>File and folder level backup with version history</li>
                <li>Database backup for SQL, Oracle, and NoSQL</li>
                <li>Virtual machine backup and replication</li>
                <li>SaaS application backup (Microsoft 365, Google Workspace)</li>
                <li>Mobile device backup and management</li>
              </ul>
            </div>

            <div className="service-features">
              <h3>Advanced Capabilities</h3>
              <ul>
                <li>Deduplication and compression technology</li>
                <li>Bare-metal restore capabilities</li>
                <li>Point-in-time recovery options</li>
                <li>Automated backup testing and verification</li>
                <li>Custom retention policies and archiving</li>
                <li>Integration with existing IT infrastructure</li>
              </ul>
            </div>

            <div className="service-benefits">
              <h3>Business Benefits</h3>
              <ul>
                <li>99.9% uptime guarantee with SLA commitments</li>
                <li>Reduced operational costs with cloud infrastructure</li>
                <li>Compliance with industry regulations and standards</li>
                <li>Rapid recovery times with optimized restore processes</li>
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
              <p>Leading provider of enterprise cloud backup and data protection solutions. We help businesses safeguard their critical data with cutting-edge technology and expert support.</p>
            </div>
            <div className="footer-column">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Cloud Backup</a></li>
                <li><a href="#">Data Migration</a></li>
                <li><a href="#">Email Conversion</a></li>
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

export default CloudBackup;
