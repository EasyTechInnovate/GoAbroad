import { useState, useEffect } from 'react';
import { getStudents } from '@/services/studentService';
import { getUniversities } from '@/services/universityService';
import { getTeamMembers } from '@/services/teamService';
import { getTasksByStudentId } from '@/services/taskService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, CheckCircle2, Clock, XCircle, Eye, Building, Calendar, FileText, EditIcon, TrashIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
// Removed unused Link import
import {
  getApplications,
  getApplicationById,
  updateApplication,
  createApplication,
  deleteApplication,
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
  // Removed unused sortConfig state
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

  // State for update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    progress: '',
    taskAssignments: [],
    assignTo: '',
  });
  const [updatingAppId, setUpdatingAppId] = useState(null);

  

  const handleUpdate = async (app) => {
    setUpdatingAppId(app.id || app._id);

    // Always fetch members for update modal (like create modal)
    setMembersLoading(true);
    try {
      const res = await getTeamMembers({ page: 1, limit: 100 });
      setMembers(res.data?.members || res.members || []);
    } catch {
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }

    let studentId = app.student?._id || app.studentId?._id || app.studentId || app.student;
    if (studentId) {
      setTasksLoading(true);
      try {
        const res = await getTasksByStudentId(studentId);
        setTasks(res.data?.task || []);
      } catch {
        setTasks([]);
      } finally {
        setTasksLoading(false);
      }
    } else {
      setTasks([]);
    }

    let taskAssignments = [];
    if (Array.isArray(app.taskAssignments) && app.taskAssignments.length > 0) {
      taskAssignments = app.taskAssignments.map(t => t.taskAssignmentId || t._id || t);
    }

    let assignTo = '';
    if (app.assignTo && typeof app.assignTo === 'object') {
      assignTo = app.assignTo._id || '';
    } else if (typeof app.assignTo === 'string') {
      assignTo = app.assignTo;
    }
    setUpdateForm({
      status: app.status || '',
      progress: app.progress || '',
      taskAssignments,
      assignTo,
    });
    setIsUpdateOpen(true);
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {};
      if (updateForm.status) payload.status = updateForm.status;
      if (updateForm.progress !== '' && updateForm.progress !== null && updateForm.progress !== undefined) payload.progress = Number(updateForm.progress);

      if (Array.isArray(updateForm.taskAssignments) && updateForm.taskAssignments.length > 0 && updateForm.taskAssignments[0]) {
        const validTaskIds = tasks.map(t => t.taskId?._id || t._id);
        const filteredTaskAssignments = updateForm.taskAssignments.filter(id => validTaskIds.includes(id));
        if (filteredTaskAssignments.length > 0) payload.taskAssignments = filteredTaskAssignments;
      }
      if (updateForm.assignTo) payload.assignTo = updateForm.assignTo;
      await updateApplication(updatingAppId, payload);
      toast.success('Application updated');
      setIsUpdateOpen(false);
      setUpdatingAppId(null);
      // Refetch applications
      const params = {
        page: 1,
        limit: 100,
        search: searchQuery || undefined,
        status: activeStatus !== 'all' ? activeStatus.toUpperCase() : undefined,
      };
      const res = await getApplications(params);
      setFilteredApplications(res.data?.applications || []);
    } catch (err) {
      toast.error('Failed to update application');
      console.error('Update application error:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (app) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await deleteApplication(app.id || app._id);
      toast.success('Application deleted');
      const params = {
        page: 1,
        limit: 100,
        search: searchQuery || undefined,
        status: activeStatus !== 'all' ? activeStatus.toUpperCase() : undefined,
      };
      const res = await getApplications(params);
      setFilteredApplications(res.data?.applications || []);
    } catch (err) {
      toast.error('Failed to delete application');
      console.error('Delete application error:', err);
    }
  };

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

      getTeamMembers({ page: 1, limit: 100 })
      .then(res => setMembers(res.data?.members || res.members || []))
      .catch(() => setDropdownError('Failed to load members'))
      .finally(() => setMembersLoading(false));

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


        setFilteredApplications(res.data?.applications || []);
      } catch (err) {
        setError(err?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [searchQuery, activeStatus]);



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

  // console.log('Filtered Applications:', filteredApplications);
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
                      <TableHead className="w-[20%]">University</TableHead>
                      <TableHead className="w-[20%]">Program</TableHead>
                      <TableHead className="w-[12%]">Status</TableHead>
                      <TableHead className="w-[13%]">Progress</TableHead>
                      <TableHead className="w-[10%]">Last Updated</TableHead>
                      <TableHead className="w-[10%] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => {
                      const student = app.student || app.studentId || {};
                      const university = app.university || app.universityId || {};
                      const program = university.program || app.program || '';
                      const status = app.status || '';
                      const progress = typeof app.progress === 'number' ? app.progress : 0;
                      const lastUpdated = app.updatedAt || app.lastUpdated || app.submissionDate || app.createdAt || '';
                      // Status badge color
                      let badgeClass = '';
                      let badgeText = '';
                      switch (status.toUpperCase()) {
                        case 'SUBMITTED': badgeClass = 'bg-green-500 text-white'; badgeText = 'Submitted'; break;
                        case 'IN PROGRESS': badgeClass = 'bg-blue-500 text-white'; badgeText = 'In Progress'; break;
                        case 'UNDER REVIEW': badgeClass = 'bg-yellow-500 text-white'; badgeText = 'Under Review'; break;
                        case 'DRAFT': badgeClass = 'bg-gray-200 text-gray-700'; badgeText = 'Draft'; break;
                        case 'REJECTED': badgeClass = 'bg-red-500 text-white'; badgeText = 'Rejected'; break;
                        case 'APPROVED': badgeClass = 'bg-green-500 text-white'; badgeText = 'Approved'; break;
                        case 'PENDING': badgeClass = 'bg-yellow-500 text-white'; badgeText = 'Pending'; break;
                        case 'INTERVIEW': badgeClass = 'bg-blue-500 text-white'; badgeText = 'Interview'; break;
                        default: badgeClass = 'bg-gray-200 text-gray-700'; badgeText = status; break;
                      }
                      return (
                        <TableRow key={app.id || app._id}>
                          <TableCell className="font-bold">{student.name || ''}</TableCell>
                          <TableCell>{university.name || ''}</TableCell>
                          <TableCell>{program}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>{badgeText}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-2 rounded-full" style={{ width: `${progress}%`, background: progress === 100 ? '#22c55e' : '#3b82f6' }}></div>
                              </div>
                              <span className="text-xs font-medium ml-2">{progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{lastUpdated ? format(lastUpdated, 'yyyy-MM-dd') : ''}</TableCell>
                          <TableCell className="text-right flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => handleUpdate(app)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3h3" /></svg>
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(app)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

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
                    ? filteredApplications.map((app) => {
                        // Normalize for both old and new API shapes
                        const student = app.student || app.studentId || {};
                        const university = app.university || app.universityId || {};
                        const studentName = student && student.name ? student.name : '';
                        return (
                          <TableRow key={app.id || app._id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{studentName ? studentName.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{studentName}</div>
                                  <div className="text-xs text-muted-foreground">{app.id || app._id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{university && university.name ? university.name : ''}</TableCell>
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
                        );
                      })
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
                <TableHead className="w-[10%]">Update</TableHead>
                <TableHead className="w-[10%]">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => {
                  // Normalize for both old and new API shapes
                  const student = app.student || app.studentId || {};
                  const university = app.university || app.universityId || {};
                  const studentName = student && student.name ? student.name : '';
                  return (
                    <TableRow key={app.id || app._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{studentName ? studentName.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{studentName}</div>
                            <div className="text-xs text-muted-foreground">{app.id || app._id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{university && university.name ? university.name : ''}</TableCell>
                      {/* <TableCell>{university && university.program ? university.program : ''}</TableCell> */}
                      <TableCell>{app.decisionDate ? format(app.decisionDate, 'MMM d, yyyy') : 'N/A'}</TableCell>
                      <TableCell>{app.startDate ? format(app.startDate, 'MMM yyyy') : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleView(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleUpdate(app)}>
                          <EditIcon/>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(app)}>
                        <TrashIcon/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
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
                filteredApplications.map((app) => {

                  const student = app.student || app.studentId || {};
                  const university = app.university || app.universityId || {};
                  const studentName = student && student.name ? student.name : '';
                  return (
                    <TableRow key={app.id || app._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{studentName ? studentName.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{studentName}</div>
                            <div className="text-xs text-muted-foreground">{app.id || app._id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{university && university.name ? university.name : ''}</TableCell>
                      {/* <TableCell>{university && university.program ? university.program : ''}</TableCell> */}
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
                  );
                })
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
                filteredApplications.map((app) => {
                  // Normalize for both old and new API shapes
                  const student = app.student || app.studentId || {};
                  const university = app.university || app.universityId || {};
                  const studentName = student && student.name ? student.name : '';
                  return (
                    <TableRow key={app.id || app._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{studentName ? studentName.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{studentName}</div>
                            <div className="text-xs text-muted-foreground">{app.id || app._id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{university && university.name ? university.name : ''}</TableCell>
                      {/* <TableCell>{university && university.program ? university.program : ''}</TableCell> */}
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
                  );
                })
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

      {/* Update Application Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Application</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <Select
                value={updateForm.status}
                onValueChange={val => setUpdateForm(f => ({ ...f, status: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUBMITTED">Submitted</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="INTERVIEW">Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Progress (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={updateForm.progress}
                onChange={e => setUpdateForm(f => ({ ...f, progress: e.target.value }))}
                placeholder="Enter progress (0-100)"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Assign To</label>
              <Select
                value={updateForm.assignTo}
                onValueChange={val => setUpdateForm(f => ({ ...f, assignTo: val }))}
                disabled={membersLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={membersLoading ? 'Loading members...' : 'Select Member'} />
                </SelectTrigger>
                <SelectContent>
                  {members.map(member => (
                    <SelectItem key={member._id} value={member._id}>{member.email}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Task Assignments</label>
              <Select
                value={updateForm.taskAssignments[0] || ''}
                onValueChange={val => setUpdateForm(f => ({ ...f, taskAssignments: val ? [val] : [] }))}
                disabled={tasksLoading || !updateForm.assignTo}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tasksLoading ? 'Loading tasks...' : (!updateForm.assignTo ? 'Select Member first' : 'Select Task')} />
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
              <Button type="button" variant="outline" onClick={() => setIsUpdateOpen(false)}>Cancel</Button>
              <Button type="submit" variant="default" disabled={loading}>Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;