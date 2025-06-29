import { useState, useEffect } from 'react';
import { getStudents } from '@/services/studentService';
import { getUniversities } from '@/services/universityService';
import { getTeamMembers } from '@/services/teamService';
import { getTasksByStudentId } from '@/services/taskService';
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
  DialogHeader,
  DialogTitle,
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
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  FileText,
  Building,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import {
  getApplications,
  getApplicationById,
  updateApplication,
  createApplication,
} from '@/services/applicationService';


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





const Applications = () => {
  // const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'submissionDate',
    direction: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    studentId: '',
    universityId: '',
    taskAssignments: [],
    assignTo: '',
  });
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [members, setMembers] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [universitiesLoading, setUniversitiesLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [dropdownError, setDropdownError] = useState(null);

  useEffect(() => {
    if (!isCreateOpen) return;
    setDropdownError(null);
    setStudentsLoading(true);
    setUniversitiesLoading(true);
    setMembersLoading(true);
    getStudents({ page: 1, limit: 100 })
      .then(res => setStudents(res.data?.students || []))
      .catch(() => setDropdownError('Failed to load students'))
      .finally(() => setStudentsLoading(false));
    getUniversities({ page: 1, limit: 100 })
      .then(res => setUniversities(res.data?.universities || res.data?.data || []))
      .catch(() => setDropdownError('Failed to load universities'))
      .finally(() => setUniversitiesLoading(false));
    // Fetch members for assignTo using teamService
    getTeamMembers({ page: 1, limit: 100 })
      .then(res => setMembers(res.data?.members || res.members || []))
      .catch(() => setDropdownError('Failed to load members'))
      .finally(() => setMembersLoading(false));
    // Reset tasks when opening modal
    setTasks([]);
    setTasksLoading(false);
  }, [isCreateOpen]);

  useEffect(() => {
    if (!isCreateOpen || !createForm.studentId) {
      setTasks([]);
      return;
    }
    setTasksLoading(true);
    getTasksByStudentId(createForm.studentId)
      .then(res => setTasks(res.data?.task || []))
      .catch(() => setTasks([]))
      .finally(() => setTasksLoading(false));
  }, [isCreateOpen, createForm.studentId]);


  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page: 1,
          limit: 100,
          search: searchQuery || undefined,
          status: activeStatus !== 'all' ? activeStatus.toUpperCase() : undefined,
        };
        const res = await getApplications(params);

        // setApplications(res.data?.applications || []);
        setFilteredApplications(res.data?.applications || []);
      } catch (err) {
        setError(err?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [searchQuery, activeStatus]);




  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setFilteredApplications((prev) => {
      const sorted = [...prev];
      sorted.sort((a, b) => {
        let aValue = a[key];
        let bValue = b[key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          return direction === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
        }
        return 0;
      });
      return sorted;
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      await updateApplication(id, { status: newStatus.toUpperCase() });
      toast.success('Application status updated');

      const params = {
        page: 1,
        limit: 100,
        search: searchQuery || undefined,
        status: activeStatus !== 'all' ? activeStatus.toUpperCase() : undefined,
      };
      const res = await getApplications(params);
      // setApplications(res.data?.applications || []);
      setFilteredApplications(res.data?.applications || []);
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Update application status error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value) => {
    setActiveStatus(value);
  };


  const handleView = async (application) => {
    try {
      setLoading(true);
      const res = await getApplicationById(application.id || application._id);
      setSelectedApplication(res.data?.application || application);
      setIsViewOpen(true);
    } catch (err) {
      toast.error('Failed to load application details');
      console.error('View application error:', err);
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-6">
      {error && <div className="text-center text-red-500">{error}</div>}
      {loading && <div className="text-center text-muted-foreground">Loading...</div>}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" onClick={() => setIsCreateOpen(true)}>
            + Create Application
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
          {filteredApplications.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No applications available</div>
          ) : (
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
          )}
        </TabsContent>
      {/* Create Application Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Application</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                setLoading(true);
                // Use the array directly for taskAssignments
                const payload = {
                  studentId: createForm.studentId,
                  universityId: createForm.universityId,
                  taskAssignments: createForm.taskAssignments,
                  assignTo: createForm.assignTo,
                };
                await createApplication(payload);
                toast.success('Application created');
                setIsCreateOpen(false);
                setCreateForm({ studentId: '', universityId: '', taskAssignments: [], assignTo: '' });
                // Refetch applications
                const params = {
                  page: 1,
                  limit: 100,
                  search: searchQuery || undefined,
                  status: activeStatus !== 'all' ? activeStatus.toUpperCase() : undefined,
                };
                const res = await getApplications(params);
                // setApplications(res.data?.applications || []);
                setFilteredApplications(res.data?.applications || []);
              } catch (err) {
                toast.error('Failed to create application');
                console.error('Create application error:', err);
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            {/* Student Dropdown */}
            <div>
              <label className="block mb-1 font-medium">Student</label>
              <Select
                value={createForm.studentId}
                onValueChange={val => setCreateForm(f => ({ ...f, studentId: val }))}
                disabled={studentsLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={studentsLoading ? 'Loading students...' : 'Select Student'} />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student._id} value={student._id}>
                      {student.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* University Dropdown */}
            <div>
              <label className="block mb-1 font-medium">University</label>
              <Select
                value={createForm.universityId}
                onValueChange={val => setCreateForm(f => ({ ...f, universityId: val }))}
                disabled={universitiesLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={universitiesLoading ? 'Loading universities...' : 'Select University'} />
                </SelectTrigger>
                <SelectContent>
                  {universities.map(university => (
                    <SelectItem key={university._id} value={university._id}>
                      {university.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Assign To Dropdown */}
            <div>
              <label className="block mb-1 font-medium">Assign To</label>
              <Select
                value={createForm.assignTo}
                onValueChange={val => setCreateForm(f => ({ ...f, assignTo: val }))}
                disabled={membersLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={membersLoading ? 'Loading members...' : 'Select Member'} />
                </SelectTrigger>
                <SelectContent>
                  {members.map(member => (
                    <SelectItem key={member._id} value={member._id}>
                      {member.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {dropdownError && <div className="text-red-500 text-sm">{dropdownError}</div>}

            {/* Task Assignments Dropdown */}
            <div>
              <label className="block mb-1 font-medium">Task Assignments</label>
              <Select
                value={createForm.taskAssignments.length > 0 ? createForm.taskAssignments[0] : ''}
                onValueChange={val => setCreateForm(f => ({ ...f, taskAssignments: val ? [val] : [] }))}
                disabled={tasksLoading || !createForm.studentId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tasksLoading ? 'Loading tasks...' : (!createForm.studentId ? 'Select Student first' : 'Select Task')} />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map(task => (
                    <SelectItem key={task.taskId?._id || task._id} value={task.taskId?._id || task._id}>
                      {task.taskId?.title || task.title || task.taskId?._id || task._id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" variant="default" disabled={loading}>Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
        {/* <TableHead className="w-[20%]">Program</TableHead> */}
                    <TableHead className="w-[15%]">Submission Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0
                    ? filteredApplications.map((app) => (
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
        {/* <TableCell>{app.program}</TableCell> */}
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
                    : (
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
        {/* <TableHead className="w-[20%]">Program</TableHead> */}
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
        {/* <TableCell>{app.program}</TableCell> */}
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
        {/* <TableHead className="w-[20%]">Program</TableHead> */}
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
        {/* <TableCell>{app.program}</TableCell> */}
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
        {/* <TableHead className="w-[20%]">Program</TableHead> */}
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
        {/* <TableCell>{app.program}</TableCell> */}
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
    </div>
  );
};

export default Applications;