import { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  User,
  FileText,
  GraduationCap,
  Building,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';

// Custom date formatter function instead of using date-fns
const format = (date, formatStr) => {
  if (!date) return '';
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  if (formatStr === 'MMM d, yyyy') {
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } else if (formatStr === 'MMMM d, yyyy') {
    return `${fullMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } else if (formatStr === 'MMMM yyyy') {
    return `${fullMonths[d.getMonth()]} ${d.getFullYear()}`;
  } else if (formatStr === 'MMM yyyy') {
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// Fake data generator
const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Fake data for applications
const APPLICATIONS = [
  {
    id: 'APP-2023-001',
    student: {
      id: 'STD-1001',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      avatar: '',
    },
    university: 'University of Toronto',
    program: 'Computer Science, Bachelor',
    status: 'approved',
    submissionDate: generateRandomDate(new Date(2023, 0, 1), new Date(2023, 3, 30)),
    decisionDate: generateRandomDate(new Date(2023, 4, 1), new Date(2023, 5, 30)),
    startDate: new Date(2023, 8, 1),
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Recommendation Letter'],
  },
  {
    id: 'APP-2023-002',
    student: {
      id: 'STD-1002',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      avatar: '',
    },
    university: 'University of Sydney',
    program: 'Business Administration, Master',
    status: 'rejected',
    submissionDate: generateRandomDate(new Date(2023, 1, 1), new Date(2023, 2, 30)),
    decisionDate: generateRandomDate(new Date(2023, 3, 1), new Date(2023, 4, 30)),
    startDate: null,
    documents: ['Passport', 'Transcripts', 'CV', 'Research Proposal'],
  },
  {
    id: 'APP-2023-003',
    student: {
      id: 'STD-1003',
      name: 'Aisha Khan',
      email: 'aisha.khan@example.com',
      avatar: '',
    },
    university: 'Ludwig Maximilian University of Munich',
    program: 'Medicine, Bachelor',
    status: 'pending',
    submissionDate: generateRandomDate(new Date(2023, 3, 1), new Date(2023, 4, 15)),
    decisionDate: null,
    startDate: new Date(2023, 9, 1),
    documents: ['Passport', 'Transcripts', 'Medical Exam', 'Language Certificate'],
  },
  {
    id: 'APP-2023-004',
    student: {
      id: 'STD-1004',
      name: 'Chen Wei',
      email: 'chen.wei@example.com',
      avatar: '',
    },
    university: 'ETH Zurich',
    program: 'Mechanical Engineering, PhD',
    status: 'interview',
    submissionDate: generateRandomDate(new Date(2023, 2, 1), new Date(2023, 3, 30)),
    decisionDate: null,
    startDate: new Date(2023, 8, 1),
    documents: ['Passport', 'Transcripts', 'Research Proposal', 'CV', 'Publications'],
  },
  {
    id: 'APP-2023-005',
    student: {
      id: 'STD-1005',
      name: 'Olga Ivanova',
      email: 'olga.ivanova@example.com',
      avatar: '',
    },
    university: 'Imperial College London',
    program: 'Data Science, Master',
    status: 'approved',
    submissionDate: generateRandomDate(new Date(2023, 0, 15), new Date(2023, 2, 15)),
    decisionDate: generateRandomDate(new Date(2023, 3, 1), new Date(2023, 4, 15)),
    startDate: new Date(2023, 8, 15),
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Recommendation Letter'],
  },
  {
    id: 'APP-2023-006',
    student: {
      id: 'STD-1006',
      name: 'Mohammed Al-Fayez',
      email: 'mohammed.alfayez@example.com',
      avatar: '',
    },
    university: 'National University of Singapore',
    program: 'Finance, Master',
    status: 'pending',
    submissionDate: generateRandomDate(new Date(2023, 4, 1), new Date(2023, 5, 15)),
    decisionDate: null,
    startDate: new Date(2024, 0, 15),
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Financial Statement'],
  },
  {
    id: 'APP-2023-007',
    student: {
      id: 'STD-1007',
      name: 'Sofia Martinez',
      email: 'sofia.martinez@example.com',
      avatar: '',
    },
    university: 'McGill University',
    program: 'International Relations, Bachelor',
    status: 'approved',
    submissionDate: generateRandomDate(new Date(2023, 1, 1), new Date(2023, 2, 28)),
    decisionDate: generateRandomDate(new Date(2023, 3, 15), new Date(2023, 4, 30)),
    startDate: new Date(2023, 8, 1),
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Language Certificate'],
  },
  {
    id: 'APP-2023-008',
    student: {
      id: 'STD-1008',
      name: 'Rajiv Patel',
      email: 'rajiv.patel@example.com',
      avatar: '',
    },
    university: 'Technical University of Munich',
    program: 'Computer Engineering, Master',
    status: 'rejected',
    submissionDate: generateRandomDate(new Date(2023, 2, 1), new Date(2023, 3, 30)),
    decisionDate: generateRandomDate(new Date(2023, 4, 15), new Date(2023, 5, 30)),
    startDate: null,
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Projects Portfolio'],
  },
  {
    id: 'APP-2023-009',
    student: {
      id: 'STD-1009',
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      avatar: '',
    },
    university: 'University of Melbourne',
    program: 'Psychology, PhD',
    status: 'interview',
    submissionDate: generateRandomDate(new Date(2023, 3, 1), new Date(2023, 4, 30)),
    decisionDate: null,
    startDate: new Date(2023, 9, 15),
    documents: ['Passport', 'Transcripts', 'Research Proposal', 'CV', 'Publications'],
  },
  {
    id: 'APP-2023-010',
    student: {
      id: 'STD-1010',
      name: 'Takashi Yamamoto',
      email: 'takashi.yamamoto@example.com',
      avatar: '',
    },
    university: 'University of British Columbia',
    program: 'Environmental Science, Master',
    status: 'pending',
    submissionDate: generateRandomDate(new Date(2023, 4, 1), new Date(2023, 5, 30)),
    decisionDate: null,
    startDate: new Date(2024, 0, 1),
    documents: ['Passport', 'Transcripts', 'Statement of Purpose', 'Recommendation Letter'],
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(APPLICATIONS);
  const [filteredApplications, setFilteredApplications] = useState(APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'submissionDate',
    direction: 'desc',
  });

  // Filter applications based on status and search query
  const filterApplications = (status, query) => {
    let filtered = [...applications];
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(app => app.status === status);
    }
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(app => 
        app.student.name.toLowerCase().includes(lowercaseQuery) ||
        app.university.toLowerCase().includes(lowercaseQuery) ||
        app.program.toLowerCase().includes(lowercaseQuery) ||
        app.id.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        // Handle nested properties
        let aValue, bValue;
        
        if (sortConfig.key.includes('.')) {
          const keys = sortConfig.key.split('.');
          aValue = keys.reduce((obj, key) => obj[key], a);
          bValue = keys.reduce((obj, key) => obj[key], b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        
        // Handle dates
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'asc' 
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        
        // Handle strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        // Handle nulls
        if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;
        
        // Default comparison
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
    
    setFilteredApplications(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterApplications(activeStatus, query);
  };

  const handleTabChange = (value) => {
    setActiveStatus(value);
    filterApplications(value, searchQuery);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    // Re-filter with new sort
    filterApplications(activeStatus, searchQuery);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedApplications = applications.map(app => {
      if (app.id === id) {
        const updatedApp = { 
          ...app, 
          status: newStatus,
          decisionDate: newStatus === 'pending' ? null : new Date(),
        };
        
        // If we're viewing this application, update the selected one too
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication(updatedApp);
        }
        
        return updatedApp;
      }
      return app;
    });
    
    setApplications(updatedApplications);
    filterApplications(activeStatus, searchQuery);
    
    const statusMessages = {
      approved: 'Application approved successfully',
      rejected: 'Application rejected',
      interview: 'Interview scheduled for this application',
      pending: 'Application marked as pending review'
    };
    
    toast.success(statusMessages[newStatus] || 'Application status updated');
  };

  const handleView = (application) => {
    setSelectedApplication(application);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'interview':
        return <Badge className="bg-blue-500">Interview</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'interview':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" value={activeStatus} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[20%]">Student</TableHead>
                      <TableHead className="w-[25%]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort('university')}
                        >
                          University
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[20%]">Program</TableHead>
                      <TableHead className="w-[15%]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort('submissionDate')}
                        >
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[10%]">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={app.student.avatar} alt={app.student.name} />
                              <AvatarFallback>{app.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{app.student.name}</div>
                              <div className="text-xs text-muted-foreground">{app.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{app.university}</TableCell>
                        <TableCell>{app.program}</TableCell>
                        <TableCell>{format(app.submissionDate, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(app)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Application
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/student/${app.student.id}`} className="flex items-center">
                                  <User className="mr-2 h-4 w-4" />
                                  View Student
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'approved')}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'rejected')}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'interview')}>
                                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'pending')}>
                                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                Mark Pending
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
                <CardDescription>
                  Applications awaiting review and decision
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[25%]">Student</TableHead>
                      <TableHead className="w-[20%]">University</TableHead>
                      <TableHead className="w-[20%]">Program</TableHead>
                      <TableHead className="w-[15%]">Submission Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{app.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{app.student.name}</div>
                                <div className="text-xs text-muted-foreground">{app.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{app.university}</TableCell>
                          <TableCell>{app.program}</TableCell>
                          <TableCell>{format(app.submissionDate, 'MMM d, yyyy')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button size="sm" variant="default" className="h-8" onClick={() => handleStatusChange(app.id, 'approved')}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="h-8" onClick={() => handleStatusChange(app.id, 'interview')}>
                                Schedule Interview
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleView(app)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No pending applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Student</TableHead>
                  <TableHead className="w-[20%]">University</TableHead>
                  <TableHead className="w-[20%]">Program</TableHead>
                  <TableHead className="w-[15%]">Approval Date</TableHead>
                  <TableHead className="w-[10%]">Start Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{app.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{app.student.name}</div>
                            <div className="text-xs text-muted-foreground">{app.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.university}</TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell>{app.decisionDate ? format(app.decisionDate, 'MMM d, yyyy') : 'N/A'}</TableCell>
                      <TableCell>{app.startDate ? format(app.startDate, 'MMM yyyy') : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleView(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No approved applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Student</TableHead>
                  <TableHead className="w-[20%]">University</TableHead>
                  <TableHead className="w-[20%]">Program</TableHead>
                  <TableHead className="w-[15%]">Rejection Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{app.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{app.student.name}</div>
                            <div className="text-xs text-muted-foreground">{app.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.university}</TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell>{app.decisionDate ? format(app.decisionDate, 'MMM d, yyyy') : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleStatusChange(app.id, 'pending')}>
                            Reconsider
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleView(app)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No rejected applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="interview" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Student</TableHead>
                  <TableHead className="w-[20%]">University</TableHead>
                  <TableHead className="w-[20%]">Program</TableHead>
                  <TableHead className="w-[15%]">Submission Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{app.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{app.student.name}</div>
                            <div className="text-xs text-muted-foreground">{app.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.university}</TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell>{format(app.submissionDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="default" className="h-8" onClick={() => handleStatusChange(app.id, 'approved')}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8" onClick={() => handleStatusChange(app.id, 'rejected')}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleView(app)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No interview applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>Application {selectedApplication.id}</span>
                  {getStatusBadge(selectedApplication.status)}
                </DialogTitle>
                <DialogDescription>
                  Submitted on {format(selectedApplication.submissionDate, 'MMMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">
                      {selectedApplication.student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedApplication.student.name}</h2>
                    <p className="text-muted-foreground">{selectedApplication.student.email}</p>
                    <p className="text-sm text-muted-foreground">Student ID: {selectedApplication.student.id}</p>
                  </div>
                </div>

                <Card className="border-t">
                  <CardHeader>
                    <CardTitle className="text-base">Application Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">University</p>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <p>{selectedApplication.university}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Program</p>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <p>{selectedApplication.program}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedApplication.status)}
                        <p className="capitalize">{selectedApplication.status}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p>{selectedApplication.startDate ? format(selectedApplication.startDate, 'MMMM yyyy') : 'Not set'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-t">
                  <CardHeader>
                    <CardTitle className="text-base">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {selectedApplication.documents.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 border rounded-md">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>{doc}</span>
                          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-2 justify-end">
                  {selectedApplication.status !== 'approved' && (
                    <Button variant="default" onClick={() => {
                      handleStatusChange(selectedApplication.id, 'approved');
                      setIsViewOpen(false);
                    }}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {selectedApplication.status !== 'rejected' && (
                    <Button variant="outline" onClick={() => {
                      handleStatusChange(selectedApplication.id, 'rejected');
                      setIsViewOpen(false);
                    }}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  )}
                  {selectedApplication.status !== 'interview' && (
                    <Button variant="outline" onClick={() => {
                      handleStatusChange(selectedApplication.id, 'interview');
                      setIsViewOpen(false);
                    }}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Interview
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Applications;