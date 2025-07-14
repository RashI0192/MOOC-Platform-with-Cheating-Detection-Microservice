import { Outlet } from 'react-router-dom';
import DashboardTabs from '../../components/instructor/DashboardTabs';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="instructor-dashboard">
      <h1>Instructor Dashboard</h1>
      <DashboardTabs />
      <Outlet /> 
    </div>
  );
}