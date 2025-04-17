import { useLocation } from 'react-router-dom'; // Import useLocation
import {
  ShoppingCart, User, Package2,
  LineChart, MessageSquare, Settings, LogOut,
  PieChartIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AppSidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  console.log(location);

  const handleLogout = () => {
    console.log('User logged out');
  };

  const menuItems = [
    { id: 1, name: 'Profile', icon: <User className="h-5 w-5" />, link: '/dashboard/profile' },
    { id: 2, name: 'Dashboard', icon: <PieChartIcon className="h-5 w-5" />, link: '/dashboard' },
    { id: 3, name: 'Order', icon: <ShoppingCart className="h-5 w-5" />, link: '/dashboard/order' },
    { id: 4, name: 'Products', icon: <Package2 className="h-5 w-5" />, link: '/dashboard/products' },
    { id: 5, name: 'Sales Report', icon: <LineChart className="h-5 w-5" />, link: '/dashboard/sales-report' },
    { id: 6, name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, link: '/dashboard/messages' },
    { id: 7, name: 'Settings', icon: <Settings className="h-5 w-5" />, link: '/dashboard/settings' },
    { id: 8, name: 'Sign Out', icon: <LogOut className="h-5 w-5" />, action: handleLogout },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={'bg-white'}>
        {isSidebarOpen && (
          <div className="py-4 ml-1">
            <img src="logo.svg" height={35} width={35} />
          </div>
        )}
          {!isSidebarOpen && (
        <div className="md:py-6 flex md:items-center md:space-x-2 px-1">
            <>
              <img src="logo.svg" height={40} width={40} />
              <span className="text-2xl font-bold text-gray-900">Goupbroad</span>
            </>
        </div>
          )}
      </SidebarHeader>

      <SidebarContent className={cn('bg-white', !isSidebarOpen && 'px-2')}>
      
        <SidebarMenu className={cn('px-3', !isSidebarOpen && 'px-1')}>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              {item.link ? (
                <Link to={item.link} className="w-full">
                  <SidebarMenuButton
                    tooltip={item.name}
                    className={cn(
                      'w-full justify-start cursor-pointer p-6',
                      location.pathname === item.link && 'bg-primary-1 text-white hover:bg-primary-1/90 hover:text-white'
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              ) : (
                <SidebarMenuButton
                  onClick={item.action}
                  tooltip={item.name}
                  className="w-full justify-start cursor-pointer text-red-500 p-6 hover:bg-red-100 hover:text-red-500"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

AppSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};
export default AppSidebar;