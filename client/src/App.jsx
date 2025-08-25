import { Route, Routes } from 'react-router-dom';
import Home from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
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
import PaymentRequired from './Pages/Auth/PaymentRequired';
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
import VerificationPending from './Pages/Auth/VerificationPending';
import PaymentFailed from './Pages/Auth/PaymentFailed';
import Questionnaire from './Pages/Questionnaire';
import QuestionnaireList from './Pages/Questionnaire/List';
import HomePage from './Pages/Static/HomePage';

import Community from './Pages/Static/Community';
import About from './Pages/Static/About';
import PremiumAccess from './Pages/Static/PremiumAccess';
import Pricing from './Pages/Static/Pricing';
import TestCheckout from './components/static/TestCheckout';
import CollegeFinder from './Pages/Static/CollegeFinder/CollegeFinderFixed';
import CollegeFinderStep1 from './Pages/Static/CollegeFinder/CollegeFinderStep1';
import CollegeFinderStep2 from './Pages/Static/CollegeFinder/CollegeFinderStep2';
import CollegeFinderStep3 from './Pages/Static/CollegeFinder/CollegeFinderStep3';
import CollegeFinderStep4 from './Pages/Static/CollegeFinder/CollegeFinderStep4';
import CollegeFinderResults from './Pages/Static/CollegeFinder/CollegeFinderResults';
import OrderConfirmation from './Pages/Static/OrderConfirmation';
import Checkout from './Pages/Static/Checkout';
import TestOrderConfirmation from './Pages/Static/components/TestOrderConfirmation';
import SignIn from './Pages/Static/SignIn';
import TermsCondition from './Pages/Static/TermsCondition';
import PrivacyPolicy from './Pages/Static/PrivacyPolicy.';
import Calculator from './Pages/Calculator/Calculator';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/server-health" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/payment-required" element={<PaymentRequired />} />
      <Route path="/auth/verification-pending" element={<VerificationPending />} />
      <Route path="/auth/payment-failed" element={<PaymentFailed />} />

      {/* Static Pages */}
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/premium" element={<PremiumAccess />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsCondition />} />
      <Route path='/calculator' element={<Calculator/>}/>

      {/* Payment Routes */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      
      {/* Test Routes */}
      <Route path="/test-checkout" element={<TestCheckout />} />
      <Route path="/test-order-confirmation" element={<TestOrderConfirmation />} />

      {/* College Finder Routes */}
      <Route path="/college-finder" element={<CollegeFinder />} />
      <Route path="/college-finder/step1" element={<CollegeFinderStep1 />} />
      <Route path="/college-finder/step2" element={<CollegeFinderStep2 />} />
      <Route path="/college-finder/step3" element={<CollegeFinderStep3 />} />
      <Route path="/college-finder/step4" element={<CollegeFinderStep4 />} />
      <Route path="/college-finder/results" element={<CollegeFinderResults />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/dashboard/timeline" element={<ProtectedRoute><StudentTasks /></ProtectedRoute>} />
      <Route path="/dashboard/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/dashboard/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
      <Route path="/dashboard/edu-loan" element={<ProtectedRoute><EduLoan /></ProtectedRoute>} />
      <Route path="/dashboard/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
      <Route path="/questionnaires/:taskId/:subtaskId" element={<ProtectedRoute><QuestionnaireList /></ProtectedRoute>} />
      <Route path="/questionnaire/:taskId/:subtaskId/:questionnaireId" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
      <Route path="/dashboard/documents" element={<ProtectedRoute><DocManager /></ProtectedRoute>} />
      <Route path="/dashboard/universities" element={<ProtectedRoute><UniversityManagement /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<PrivateAdminRoute><Index /></PrivateAdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/student/:studentId" element={<Tasks />} />
        <Route path="subtasks" element={<Subtasks />} />
        <Route path="applications" element={<Applications />} />
        <Route path="universities" element={<Universities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="forms" element={<Forms />} />
        <Route path="documents" element={<Documents />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="all-activities" element={<AllActivities />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;