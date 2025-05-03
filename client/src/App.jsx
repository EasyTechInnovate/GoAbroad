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
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import EduLoan from './Pages/EduLoan';
import FAQ from './Pages/FAQ';
import DocManager from './Pages/DocManager';
import UniversityManagement from './Pages/UniversityManagement';
import Checklist from './Pages/Checklist';
import StudentTasks from './Pages/Tasks';
import Chat from './Pages/Messages';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="/dashboard/timeline" element={<StudentTasks />} />
      <Route path="/dashboard/chat" element={<Chat />} />
      <Route path="/dashboard/faq" element={<FAQ />} />
      <Route path="/dashboard/edu-loan" element={<EduLoan />} />
      <Route path="/dashboard/checklist" element={<Checklist />} />
      <Route path="/dashboard/documents" element={<DocManager />} />
      <Route path="/dashboard/universities" element={<UniversityManagement />} />
      
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