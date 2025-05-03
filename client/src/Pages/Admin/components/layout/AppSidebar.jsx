import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  School,
  MessageSquare,
  FileQuestion,
  FolderOpen,
  HelpCircle,
  Settings,
} from 'lucide-react';

import logo from '@/assets/logo.svg';

const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Student Management',
    path: '/admin/students',
    icon: Users,
  },
  {
    title: 'Task Management',
    path: '/admin/tasks',
    icon: ClipboardList,
  },
  {
    title: 'Application & Essays',
    path: '/admin/applications',
    icon: FileText,
  },
  {
    title: 'University Management',
    path: '/admin/universities',
    icon: School,
  },
  {
    title: 'Communication',
    path: '/admin/messages',
    icon: MessageSquare,
  },
  {
    title: 'Questionnaires',
    path: '/admin/forms',
    icon: FileQuestion,
  },
  {
    title: 'Document Manager',
    path: '/admin/documents',
    icon: FolderOpen,
  },
  {
    title: 'FAQs & Knowledge Base',
    path: '/admin/faqs',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      <Sidebar className="border-r border-border">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className={cn('flex items-center gap-2', collapsed && 'justify-center w-full')}>
            <div className="bg-primary text-primary-foreground rounded h-8 w-8 flex items-center justify-center font-semibold">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            </div>
            {!collapsed && <span className="font-semibold text-lg">GoupBroad</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn('h-8 w-8', collapsed && 'hidden')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        location.pathname === item.path ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                      )}
                    >
                      <Link to={item.path} className="w-full flex items-center">
                        <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-2')} />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {collapsed && (
          <div className="mt-auto p-2 border-t">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(false)}
              className="h-8 w-8 mx-auto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Sidebar>
      
      <div className="lg:hidden">
        <SidebarTrigger>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SidebarTrigger>
      </div>
    </>
  );
}