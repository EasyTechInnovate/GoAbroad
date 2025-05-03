import { BarChart3, FileText, MessageSquare, Users } from 'lucide-react';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import StatCard from '@/components/StackCard';
import TasksList from '@/components/TaskList';
import { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      icon: <BarChart3 className="text-white" />,
      iconBg: 'bg-[#FA5A7D]',
      count: '11',
      title: 'My Pending Tasks',
      bgColor: 'bg-[#FFE2E5]',
    },
    {
      id: 2,
      icon: <FileText className="text-white" />,
      iconBg: 'bg-[#FF947A]',
      count: '63',
      title: 'Completed Tasks',
      bgColor: 'bg-[#FFF4DE]',
    },
    {
      id: 3,
      icon: <MessageSquare className="text-white" />,
      iconBg: 'bg-[#3CD856]',
      count: '0',
      title: 'New Messages',
      bgColor: 'bg-[#DCFCE7]',
    },
    {
      id: 4,
      icon: <Users className="text-white" />,
      iconBg: 'bg-[#BF83FF]',
      count: '46',
      title: 'Universities Shortlisted',
      bgColor: 'bg-[#F3E8FF]',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isSidebarOpen={isOpen}/>
        <SidebarInset>
          <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen}/>
          
          <main className="p-3 md:p-6 bg-gray-50 flex-1 overflow-x-hidden">
            <div className="grid grid-cols-1 mt-4 sm:mt-6 md:mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8 bg-white p-4 sm:p-6 md:p-8 rounded-md">
              {stats.map((stat) => (
                <StatCard
                  key={stat.id}
                  icon={stat.icon}
                  iconBg={stat.iconBg}
                  count={stat.count}
                  title={stat.title}
                  bgColor={stat.bgColor}
                />
              ))}
            </div>

            <TasksList />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;