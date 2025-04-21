import { SidebarTrigger } from './ui/sidebar'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const SidebarHeader = ({isOpen,setIsOpen}) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/dashboard/profile') return 'Profile';
    if (path === '/dashboard/eduloan') return 'Education Loan';
    if (path === '/dashboard/order') return 'Timeline';
    if (path === '/dashboard/products') return 'Products';
    if (path === '/dashboard/faq') return 'FAQs';
    if (path === '/dashboard/documents') return 'Doc Manager';
    if (path === '/dashboard/sales-report') return 'Sales Report';
    if (path === '/dashboard/messages') return 'Messages';
    if (path === '/dashboard/settings') return 'Settings';
    
    if (path.startsWith('/admin')) {
      const subPath = path.replace('/admin/', '');
      if (path === '/admin') return 'Admin Dashboard';
      if (subPath === 'students') return 'Student Management';
      if (subPath === 'tasks') return 'Task Management';
      if (subPath === 'applications') return 'Applications & Essays';
      if (subPath === 'universities') return 'University Management';
      if (subPath === 'messages') return 'Communication';
      if (subPath === 'forms') return 'Questionnaires';
      if (subPath === 'documents') return 'Document Manager';
      if (subPath === 'faqs') return 'FAQs & Knowledge Base';
      if (subPath === 'activities') return 'Activities';
      if (subPath === 'settings') return 'Settings';
    }
    
    return 'Go Abroad';
  };
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="">
                <SidebarTrigger onClick={()=>setIsOpen(!isOpen)}>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 w-64"
                />
              </div>

              <div className="hidden md:flex items-center space-x-2 text-gray-700 cursor-pointer">
                <img
                  src="/flag.svg"
                  alt="US Flag"
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span className="text-sm">Eng (US)</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              <div className="relative cursor-pointer bg-gray-50">
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <img src="/profile.svg" alt="User" />
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">Shrey</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-700" />
              </div>
            </div>
          </header>
  )
}
SidebarHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default SidebarHeader