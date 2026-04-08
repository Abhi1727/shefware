import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import MarketPlace from './pages/MarketPlace';
import CloudBackup from './pages/services/CloudBackup';
import Office365Migration from './pages/services/Office365Migration';
import EmailConversion from './pages/services/EmailConversion';
import TenantToTenantMigration from './pages/services/TenantToTenantMigration';
import GoogleWorkspaceToMicrosoft365Migration from './pages/services/GoogleWorkspaceToMicrosoft365Migration';
import DataMigration from './pages/services/DataMigration';
import './App.css';
import './styles/home-landing.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="market-place" element={<MarketPlace />} />
        <Route path="why-shefware" element={<Home />} />
        <Route path="services/cloud-backup" element={<CloudBackup />} />
        <Route path="services/office-365-migration" element={<Office365Migration />} />
        <Route path="services/email-conversion" element={<EmailConversion />} />
        <Route path="services/tenant-to-tenant-migration" element={<TenantToTenantMigration />} />
        <Route path="services/google-workspace-to-microsoft-365-migration" element={<GoogleWorkspaceToMicrosoft365Migration />} />
        <Route path="services/tenant-migration" element={<DataMigration />} />
        <Route path="services/data-migration" element={<DataMigration />} />
      </Route>
    </Routes>
  );
}

export default App;
