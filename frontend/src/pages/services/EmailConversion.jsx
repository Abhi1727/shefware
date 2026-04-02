import { useEffect, useState } from 'react';

const EmailConversion = () => {
  useEffect(() => {
    document.title = 'Email Conversion Services - Shefware';
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

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Shefware Email Conversion Services</h1>
            <p className="hero-description">Professional Email Data Conversion Solutions</p>
            <p className="service-detailed-description">Shefware Email Conversion Services provide seamless transformation between various email formats while maintaining complete data integrity, metadata, and folder structures. Perfect for legal compliance, data archiving, and system migrations with 100% data accuracy guarantee.</p>
            
            <div className="service-stats">
              <div className="stat-item">
                <h3>100%</h3>
                <p>DATA ACCURACY</p>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <p>FORMATS SUPPORTED</p>
              </div>
              <div className="stat-item">
                <h3>24x7</h3>
                <p>TECHNICAL SUPPORT</p>
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
              <h2>Key Benefits of Our Email Conversion Service</h2>
              <div className="blue-underline"></div>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>100% data accuracy guarantee ensures perfect preservation of all email properties, metadata, and folder structures</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Fast conversion speeds for large datasets with optimized algorithms and parallel processing capabilities</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Legal and compliance-ready outputs with detailed audit trails and conversion logs for regulatory requirements</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Automated conversion workflows with batch processing capabilities for efficient handling of multiple files</p>
                </div>
                <div className="benefit-item">
                  <div className="checkmark-icon">✓</div>
                  <p>Comprehensive format support including PST, EML, MSG, MBOX, NSF, and more with seamless transformation</p>
                </div>
              </div>
            </div>
            <div className="benefits-right">
              <div className="benefits-image">
                <img src="/images/email-conversion.svg" alt="Email Conversion Benefits" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="office365-migration-section">
        <div className="container">
          <div className="office365-header">
            <h2>Shefware Core Email Conversion Solutions</h2>
            <p>Shefware provides comprehensive email conversion solutions, divided into 4 types, each designed to address specific email format transformation needs.</p>
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
                <h3>PST Conversion</h3>
                <p>Convert Outlook PST files to various formats including Office 365, MBOX, and HTML with full folder structure preservation</p>
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
                <h3>Lotus Notes Conversion</h3>
                <p>Transform NSF files from Lotus Notes to Outlook PST, Office 365, or other formats with complete metadata preservation</p>
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
                <h3>Format Interchange</h3>
                <p>Seamless conversion between EML, MSG, MBOX, and other email formats with perfect data integrity</p>
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
                <h3>Archive Migration</h3>
                <p>Convert legacy email archives to modern platforms with advanced search and accessibility features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="migration-works-section">
        <div className="container">
          <div className="section-header">
            <h1>How Shefware Email Conversion Works</h1>
            <p>Our email conversion process ensures seamless transformation between various email formats while maintaining complete data integrity and compliance requirements.</p>
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
                  <h3>Format Analysis</h3>
                  <p>Analyze source email files, identify format specifications, and assess conversion requirements and potential challenges.</p>
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
                  <h3>Conversion Planning</h3>
                  <p>Determine optimal conversion settings, mapping rules, and preservation requirements for metadata and attachments.</p>
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
                  <h3>Data Preparation</h3>
                  <p>Validate source files, repair corrupted emails, and organize data structure for optimal conversion results.</p>
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
                  <h3>Format Processing</h3>
                  <p>Execute conversion using advanced algorithms that preserve email properties, attachments, and folder hierarchies.</p>
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
                  <h3>Metadata Preservation</h3>
                  <p>Ensure complete preservation of email headers, timestamps, recipients, and other critical metadata elements.</p>
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
                  <h3>Quality Validation</h3>
                  <p>Comprehensive validation checks ensure data accuracy, completeness, and format compliance with detailed reporting.</p>
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
                  <h3>Output Generation</h3>
                  <p>Generate final converted files in the target format with proper organization and accessibility features.</p>
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
                  <h3>Audit & Documentation</h3>
                  <p>Create comprehensive audit logs, conversion reports, and documentation for compliance and future reference.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secure-migration-section">
        <div className="container">
          <div className="section-header">
            <h2>Secure and Reliable Email Conversion Solutions</h2>
            <p>Our conversion protocol ensures your email data is protected with enterprise-grade security throughout the entire transformation process. We employ multi-layered protection to safeguard your sensitive communications.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>End-to-End Encryption</h3>
              <p>We encrypt email data during conversion, ensuring complete protection of sensitive communications and attachments.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Metadata Preservation</h3>
              <p>Our comprehensive metadata preservation ensures all email properties, headers, and timestamps are perfectly maintained.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Bulk Processing</h3>
              <p>Advanced batch processing capabilities enable efficient conversion of large email archives with automated workflows.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Attachment Handling</h3>
              <p>Intelligent attachment processing ensures all embedded files, images, and documents are properly converted and preserved.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3>Format Recovery</h3>
              <p>Advanced recovery capabilities can repair corrupted email files and extract data from damaged archives.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="25" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 4 8-11 8-11-8-4-8z"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z"/>
                </svg>
              </div>
              <h3>Compliance Reporting</h3>
              <p>Detailed audit trails and conversion logs ensure compliance with legal and regulatory requirements for email data.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="compliance-section">
        <div className="container">
          <div className="compliance-content">
            <div className="compliance-info">
              <h2>Certified Compliance Standards</h2>
              <p>Our email conversion platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your email data transformation meets legal and professional standards.</p>
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
            <h2>Why Choose Shefware Email Conversion Services?</h2>
            <p>Discover the advantages that make Shefware the trusted choice for professional email conversion solutions</p>
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
              <p>Our service ensures your email data is encrypted and protected with multi-layer security protocols throughout conversion.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Fast Processing</h3>
              <p>We provide rapid conversion speeds with optimized algorithms for processing large email archives efficiently.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
              </div>
              <h3>Format Support</h3>
              <p>Users can convert between 15+ email formats including PST, EML, MSG, MBOX, NSF, and specialized formats.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Compliance Ready</h3>
              <p>Shefware adheres to all legal compliance requirements including GDPR, HIPAA, and eDiscovery regulations.</p>
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
              <h3>Expert Support</h3>
              <p>Our Service provides 24/7 technical support from email conversion specialists for complex requirements.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Data Integrity</h3>
              <p>Users benefit from our 100% data accuracy guarantee with comprehensive validation and verification processes.</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>100%</h3>
                <p>Data Accuracy</p>
              </div>
              <div className="stat-card">
                <h3>15+</h3>
                <p>Formats Supported</p>
              </div>
              <div className="stat-card">
                <h3>50K+</h3>
                <p>Conversions Daily</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Technical Support</p>
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
                    "Shefware's email conversion service was crucial for our legal case. They converted thousands of emails from Lotus Notes to Outlook with perfect metadata preservation. The accuracy was remarkable."
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="Jennifer Park" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">Jennifer Park</h4>
                    <p className="client-title">Legal Counsel</p>
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
                    "We needed to migrate 20 years of email archives to Office 365. Shefware handled the complex PST conversions flawlessly, maintaining all folder structures and attachments. Outstanding service!"
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">
                    <img src="https://via.placeholder.com/48x48" alt="Mark Thompson" />
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">Mark Thompson</h4>
                    <p className="client-title">IT Manager</p>
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
            <h2>Advanced Email Conversion Solutions</h2>
            <p>Our email conversion services provide seamless transformation between various email formats while maintaining complete data integrity, metadata, and folder structures. Perfect for legal compliance, data archiving, and system migrations.</p>
            
            <div className="service-features">
              <h3>Supported Formats</h3>
              <ul>
                <li>PST to Office 365/Microsoft 365</li>
                <li>EML to MSG and MSG to EML conversion</li>
                <li>MBOX to PST and PST to MBOX</li>
                <li>NSF (Lotus Notes) to Office 365</li>
                <li>DBX (Outlook Express) to PST</li>
                <li>OST to PST conversion for offline data recovery</li>
              </ul>
            </div>

            <div className="service-features">
              <h3>Conversion Features</h3>
              <ul>
                <li>Bulk conversion with batch processing</li>
                <li>Preservation of email properties and metadata</li>
                <li>Attachment handling and conversion</li>
                <li>Folder structure maintenance</li>
                <li>Unicode and multilingual character support</li>
                <li>Corrupted file recovery and repair</li>
              </ul>
            </div>

            <div className="service-benefits">
              <h3>Business Benefits</h3>
              <ul>
                <li>100% data accuracy guarantee</li>
                <li>Fast conversion speeds for large datasets</li>
                <li>Legal and compliance-ready outputs</li>
                <li>Automated conversion workflows</li>
                <li>Detailed conversion reports and logs</li>
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
              <p>Leading provider of professional email conversion and data transformation solutions. We help businesses seamlessly convert their email data with cutting-edge technology and expert support.</p>
            </div>
            <div className="footer-column">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Email Conversion</a></li>
                <li><a href="#">Data Migration</a></li>
                <li><a href="#">Cloud Backup</a></li>
                <li><a href="#">Security Tools</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#">Enterprise</a></li>
                <li><a href="#">Small Business</a></li>
                <li><a href="#">Legal</a></li>
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

export default EmailConversion;
