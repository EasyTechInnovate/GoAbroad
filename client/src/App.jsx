import { Route, Routes } from 'react-router-dom';
import Home from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';

import StudentDetails from './Pages/Admin/StudentDetails';
import Tasks from './Pages/Admin/Tasks';
import Applications from './Pages/Admin/Applications';
import Universities from './Pages/Admin/Universities';
import Messages from './Pages/Admin/Messages';
import Forms from './Pages/Admin/Forms';
import Documents from './Pages/Admin/Documents';
import FAQs from './Pages/Admin/FAQs';
import AllActivities from './Pages/Admin/AllActivities';
import Settings from './Pages/Admin/Settings';
import NotFound from './Pages/Admin/NotFound';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ProfilePage from './Pages/Profile';
import Index from './Pages/Admin/Index';
import Students from './Pages/Admin/Students';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      
      <Route path="/admin" element={<Index />}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="applications" element={<Applications />} />
        <Route path="universities" element={<Universities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="forms" element={<Forms />} />
        <Route path="documents" element={<Documents />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="activities" element={<AllActivities />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;