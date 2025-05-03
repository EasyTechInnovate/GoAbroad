import { DashboardLayout } from './components/layout/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { MultipleStudentSelect } from './components/tasks/MultipleStudentSelect';

// Mock activities data with more items and dates
const mockActivities = [
  {
    id: '1',
    user: {
      name: 'Emma Johnson',
      initials: 'EJ',
    },
    action: 'submitted',
    subject: 'IELTS score report',
    timestamp: '10 minutes ago',
    status: 'pending',
    date: 'Oct 15, 2023'
  },
  {
    id: '2',
    user: {
      name: 'Daniel Lee',
      initials: 'DL',
    },
    action: 'uploaded',
    subject: 'SOP for Stanford University',
    timestamp: '30 minutes ago',
    status: 'active',
    date: 'Oct 15, 2023'
  },
  {
    id: '3',
    user: {
      name: 'Sophia Chen',
      initials: 'SC',
    },
    action: 'completed',
    subject: 'visa application form',
    timestamp: '1 hour ago',
    status: 'complete',
    date: 'Oct 14, 2023'
  },
  {
    id: '4',
    user: {
      name: 'James Wilson',
      initials: 'JW',
    },
    action: 'received',
    subject: 'offer from MIT',
    timestamp: '2 hours ago',
    status: 'active',
    date: 'Oct 14, 2023'
  },
  {
    id: '5',
    user: {
      name: 'Olivia Garcia',
      initials: 'OG',
    },
    action: 'received',
    subject: 'rejection from Harvard',
    timestamp: '3 hours ago',
    status: 'rejected',
    date: 'Oct 13, 2023'
  },
  {
    id: '6',
    user: {
      name: 'Michael Brown',
      initials: 'MB',
    },
    action: 'updated',
    subject: 'personal statement draft',
    timestamp: '5 hours ago',
    status: 'active',
    date: 'Oct 13, 2023'
  },
  {
    id: '7',
    user: {
      name: 'Isabella Martinez',
      initials: 'IM',
    },
    action: 'scheduled',
    subject: 'interview with UCLA admissions',
    timestamp: '8 hours ago',
    status: 'pending',
    date: 'Oct 12, 2023'
  },
  {
    id: '8',
    user: {
      name: 'Ethan Smith',
      initials: 'ES',
    },
    action: 'submitted',
    subject: 'UC Berkeley application',
    timestamp: '1 day ago',
    status: 'complete',
    date: 'Oct 12, 2023'
  },
  {
    id: '9',
    user: {
      name: 'Ava Johnson',
      initials: 'AJ',
    },
    action: 'received',
    subject: 'recommendation letter from Prof. Williams',
    timestamp: '1 day ago',
    status: 'active',
    date: 'Oct 11, 2023'
  },
  {
    id: '10',
    user: {
      name: 'Noah Thompson',
      initials: 'NT',
    },
    action: 'uploaded',
    subject: 'financial documents for NYU',
    timestamp: '2 days ago',
    status: 'complete',
    date: 'Oct 11, 2023'
  }
];

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  active: 'bg-blue-100 text-blue-800 border-blue-300',
  complete: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
};

// Mock student data for filtering
const students = [
  { id: 1, name: 'Emma Johnson' },
  { id: 2, name: 'Daniel Lee' },
  { id: 3, name: 'Sophia Chen' },
  { id: 4, name: 'James Wilson' },
  { id: 5, name: 'Olivia Garcia' },
  { id: 6, name: 'Noah Thompson' },
  { id: 7, name: 'Ava Johnson' },
  { id: 8, name: 'Ethan Smith' },
  { id: 9, name: 'Michael Brown' },
  { id: 10, name: 'Isabella Martinez' }
];

export default function AllActivities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const filteredActivities = mockActivities.filter((activity) => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    // Student filter
    const matchesStudent = selectedStudents.length === 0 || 
      selectedStudents.includes(activity.user.name);
    
    return matchesSearch && matchesStatus && matchesStudent;
  });

  const handleStudentsChange = (selected) => {
    setSelectedStudents(selected);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">All Activities</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Input
            className="max-w-md"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="w-[220px]">
              <MultipleStudentSelect
                students={students}
                selectedStudents={selectedStudents}
                onChange={handleStudentsChange}
              />
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.user.image} alt={activity.user.name} />
                          <AvatarFallback>{activity.user.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.subject}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>
                      {activity.status && (
                        <Badge variant="outline" className={statusClasses[activity.status]}>
                          {activity.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}