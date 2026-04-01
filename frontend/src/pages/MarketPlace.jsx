import { useState } from 'react';

const MarketPlace = () => {
  const [selectedCategory, setSelectedCategory] = useState('office-365');

  const categories = [
    { id: 'office-365', name: 'Office 365 Migration', icon: '📧' },
    { id: 'tenant', name: 'Tenant Migration', icon: '🔄' },
    { id: 'email', name: 'Email Conversion', icon: '📨' },
    { id: 'backup', name: 'Cloud Backup', icon: '☁️' }
  ];

  const products = [
    {
      id: 1,
      title: 'Office 365 Migration Tool',
      description: 'Safely migrate mailboxes, contacts, and calendars between Microsoft tenants with… no loss of data.',
      rating: 5,
      price: '$299',
      category: 'office-365',
      image: '/images/office-365-migration.svg'
    },
    {
      id: 2,
      title: 'Tenant to Tenant Migration Engine',
      description: 'Without any timeout between tenants, migrate users, mailboxes, and permissions.',
      rating: 5,
      price: '$499',
      category: 'tenant',
      image: '/images/tenant-migration.svg'
    },
    {
      id: 3,
      title: 'OST to PST Converter',
      description: 'Easily export Outlook data files quickly and securely with preview of data before export.',
      rating: 4.5,
      price: '$199',
      category: 'email',
      image: '/images/email-conversion.svg'
    },
    {
      id: 4,
      title: 'IMAP Backup',
      description: 'Safeguard your email data with scheduled backups to safe and secure cloud storage.',
      rating: 4.8,
      price: '$249',
      category: 'backup',
      image: '/images/imap-backup.svg'
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key={`half`} className="star half">★</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="marketplace-container">
      {/* Sidebar */}
      <aside className="marketplace-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">TOOL CATEGORIES</h2>
        </div>
        
        <nav className="sidebar-nav">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`nav-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="nav-icon">
                <div className="icon-dot"></div>
              </div>
              <span className="nav-text">{category.name}</span>
            </div>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="sidebar-arrow">›</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="marketplace-main">
        {/* Promotional Banner */}
        <section className="promo-banner">
          <div className="banner-background">
            <div className="banner-content">
              <div className="banner-badge">
                <span>Shefware Solutions</span>
              </div>
              <h1 className="banner-title">
                Transform Data | Simplify Migration | Enable AI Innovation
              </h1>
              <p className="banner-subtitle">
                Move Data Faster | Manage Smarter | Grow with AI. Discover AI-driven SaaS platforms for simple, quick, and reliable management.
              </p>
              <div className="search-container">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search for migration tools, backup solutions..."
                    className="search-input"
                  />
                </div>
                <button className="search-button">
                  <span>Search</span>
                </button>
              </div>
            </div>
            <div className="banner-image">
              <img src="/images/marketplace-banner.svg" alt="Marketplace Banner" />
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="image-placeholder">
                  <div className="product-icon"></div>
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-text">{product.rating} (5.0)</span>
                </div>
                
                <div className="product-price">
                  <span className="price-amount">{product.price}</span>
                  <span className="price-period">/license</span>
                </div>
                
                <div className="product-actions">
                  <button className="btn btn-primary purchase-btn">
                    Purchase Now
                  </button>
                  <button className="btn btn-secondary read-more-btn">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MarketPlace;
