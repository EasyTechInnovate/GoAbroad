import { Route, Routes } from 'react-router-dom';
import Home from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import StudentDetails from './Pages/Admin/StudentDetails';
import Tasks from './Pages/Admin/Tasks';
import Subtasks from './Pages/Admin/Subtasks';
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
import AdminLogin from './Pages/Admin/Login';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import Students from './Pages/Admin/components/students/Students';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
      <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
      <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/dashboard/timeline" element={<ProtectedRoute><StudentTasks /></ProtectedRoute>} />
      <Route path="/dashboard/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/dashboard/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
      <Route path="/dashboard/edu-loan" element={<ProtectedRoute><EduLoan /></ProtectedRoute>} />      
      <Route path="/dashboard/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
      <Route path="/dashboard/documents" element={<ProtectedRoute><DocManager /></ProtectedRoute>} />
      <Route path="/dashboard/universities" element={<ProtectedRoute><UniversityManagement /></ProtectedRoute>} />      
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<PrivateAdminRoute><Index /></PrivateAdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />          <Route path="tasks" element={<Tasks />} />
        <Route path="subtasks" element={<Subtasks />} />
        <Route path="applications" element={<Applications />} />
        <Route path="universities" element={<Universities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="forms" element={<Forms />} />
        <Route path="documents" element={<Documents />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="activities" element={<AllActivities />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;