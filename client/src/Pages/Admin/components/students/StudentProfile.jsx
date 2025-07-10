import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,   
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Badge 
} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FilePen, 
  GraduationCap, 
  Mail, 
  Phone, 
  FileText,
  MessageSquare,
  Lock,
  Unlock,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getStudentById, apiService } from '@/services/api.services';
import { toast } from 'sonner';
import { getTasksByStudentId } from '@/services/taskService';
import { getSubtasksByTaskAndStudent } from '@/services/subtaskService';
import { getTaskSubtaskQuestionDetails } from '@/services/questionnaireService';
import PropTypes from 'prop-types';
import { AssignUniversityDialog } from './AssignUniversityDialog';
import '@/index.css'; // For spinner styling

export function StudentProfile({ id }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [studentTasks, setStudentTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [subtasksLoading, setSubtasksLoading] = useState(false);
  const [subtasks, setSubtasks] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showSubtasksDialog, setShowSubtasksDialog] = useState(false);
  const [questionnaires, setQuestionnaires] = useState({});
  const [questionnaireLoading, setQuestionnaireLoading] = useState(false);
  const [expandedQuestionnaire, setExpandedQuestionnaire] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  const fetchAssignments = async () => {
    try {
      const response = await apiService.get('/admin/student-university-assignments');
      if (response.data?.assignments) {
        setAssignments(response.data.assignments);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get student data and assignments in parallel
        const [studentResponse, assignmentsResponse] = await Promise.all([
          getStudentById(id),
          apiService.get('/admin/student-university-assignments')
        ]);
        
        setStudent(studentResponse.data.student);
        if (assignmentsResponse.data?.assignments) {
          setAssignments(assignmentsResponse.data.assignments);
        }

        // Fetch tasks and subtasks (including questionnaires)
        if (studentResponse.data.student) {
          await fetchStudentTasks(id);
          // Fetch task-subtask-question details
          await fetchQuestionnaireDetails(id);
          // Fetch student documents
          await fetchStudentDocuments(id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load student profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const fetchStudentTasks = async (studentId) => {
    try {
      setTasksLoading(true);

      const taskResponse = await getTasksByStudentId(studentId);
      
      if (taskResponse.success && taskResponse.data.task) {
        const tasks = taskResponse.data.task || [];
        setStudentTasks(tasks);
      }
    } catch (error) {
      console.error('Error fetching student tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setTasksLoading(false);
    }
  };


  const fetchSubtasks = async (taskId, studentId) => {
    try {
      setSubtasksLoading(true);
      
      if (!taskId || !studentId) {
        console.error('Missing required parameters: taskId or studentId');
        toast.error('Missing required parameters for fetching subtasks');
        return [];
      }
      
      const response = await getSubtasksByTaskAndStudent(taskId, studentId);
      
      if (response && response.subTasks) {

        setSubtasks(prev => ({
          ...prev,
          [taskId]: response.subTasks || []
        }));
        return response.subTasks;
      }
      return [];
    } catch (error) {
      console.error('Error fetching subtasks:', error);
      toast.error('Failed to fetch subtasks: ' + (error.response?.data?.message || error.message));
      return [];
    } finally {
      setSubtasksLoading(false);
    }
  };


  const fetchQuestionnaireDetails = async (studentId) => {
    try {
      setQuestionnaireLoading(true);
      const response = await getTaskSubtaskQuestionDetails(studentId);
      
      if (response && response.success) {

        if (response.questionnaireMap) {
          setQuestionnaires(response.questionnaireMap);
          

          if (selectedTaskId && subtasks[selectedTaskId]) {
            const updatedSubtasks = [...subtasks[selectedTaskId]].map(subtask => {

              const possibleKeys = [
                subtask._id, 
                subtask.assignmentId,
                typeof subtask.subtaskId === 'object' ? subtask.subtaskId._id : null,
                typeof subtask.subtaskId === 'string' ? subtask.subtaskId : null
              ].filter(Boolean);
              

              for (const key of possibleKeys) {
                if (response.questionnaireMap[key] && response.questionnaireMap[key].length > 0) {

                  return {
                    ...subtask,
                    questionnaires: response.questionnaireMap[key]
                  };
                }
              }
              
              return subtask;
            });
            

            setSubtasks(prev => ({
              ...prev,
              [selectedTaskId]: updatedSubtasks
            }));
          }
          
          return;
        }
        

        const questionnairesBySubtask = {};
        

        if (response.student && response.student.tasks) {

          response.student.tasks.forEach(taskData => {
            if (taskData.subtasks && Array.isArray(taskData.subtasks)) {
              taskData.subtasks.forEach(subtask => {

                const possibleKeys = new Set();
                

                if (subtask._id) {
                  possibleKeys.add(subtask._id);
                  questionnairesBySubtask[subtask._id] = subtask.questionnaires || [];
                }
                
                if (subtask.assignmentId) {
                  possibleKeys.add(subtask.assignmentId);
                  questionnairesBySubtask[subtask.assignmentId] = subtask.questionnaires || [];
                }
                

                if (typeof subtask.subtaskId === 'object' && subtask.subtaskId?._id) {
                  possibleKeys.add(subtask.subtaskId._id);
                  questionnairesBySubtask[subtask.subtaskId._id] = subtask.questionnaires || [];
                } else if (typeof subtask.subtaskId === 'string') {
                  possibleKeys.add(subtask.subtaskId);
                  questionnairesBySubtask[subtask.subtaskId] = subtask.questionnaires || [];
                }
              });
            }
          });
        }
        
        setQuestionnaires(questionnairesBySubtask);
      } else {
        console.warn('API response unsuccessful or missing data:', response);
      }
    } catch (error) {
      console.error('Error fetching questionnaire details:', error);
      toast.error('Failed to fetch questionnaire details: ' + (error.response?.data?.message || error.message));
    } finally {
      setQuestionnaireLoading(false);
    }
  };


  const fetchStudentDocuments = async (studentId) => {
    try {
      setDocumentsLoading(true);
      
      const response = await apiService.get(`/admin/documents/student/${studentId}?page=1&limit=10`);
      
      if (response && response.success) {
        setDocuments(response.data.documents || []);
      } else {
        console.warn('API response unsuccessful or missing data:', response);
        toast.error('Failed to fetch documents data');
      }
    } catch (error) {
      console.error('Error fetching student documents:', error);
      toast.error('Failed to fetch documents: ' + (error.response?.data?.message || error.message));
    } finally {
      setDocumentsLoading(false);
    }
  };


  const handleUpdateSubtaskStatus = async (subtaskId, status, isLocked) => {
    try {

      await apiService.put(`/admin/task-subtask-assignments/update`, { 
        assignmentId: subtaskId,
        status,
        isLocked,

        dueDate: subtasks[selectedTaskId]?.find(st => st._id === subtaskId)?.dueDate || null
      });
      toast.success('Subtask status updated successfully');
      

      if (selectedTaskId) {
        await fetchSubtasks(selectedTaskId, id);
      }
    } catch (error) {
      console.error('Error updating subtask status:', error);
      toast.error('Failed to update subtask status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAssign = async () => {
    await fetchAssignments();
  };

  const handleUpdateAssignment = async (assignmentId, updates) => {
    try {
      await apiService.put(`/admin/student-university-assignments/${assignmentId}`, updates);
      await fetchAssignments();
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await apiService.delete(`/admin/student-university-assignments/${assignmentId}`);
      await fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };


  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      setTasksLoading(true);

      const task = studentTasks.find(t => t._id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      

      await apiService.put(`/admin/student-task-assignments/update`, { 
        assignmentId: taskId,
        status,
        isLocked: task.isLocked, 
        dueDate: task.dueDate
      });
      toast.success('Task status updated successfully');

      await fetchStudentTasks(id);
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status: ' + (error.response?.data?.message || error.message));
    } finally {
      setTasksLoading(false);
    }
  };

  const handleOpenSubtasks = async (taskId) => {

    const task = studentTasks.find(t => t._id === taskId);
    if (!task || !task.taskId?._id) {
      toast.error('Task information not found');
      return;
    }
    
    const mainTaskId = task.taskId._id;
    setSelectedTaskId(mainTaskId);
    setShowSubtasksDialog(true);
    

    setSubtasksLoading(true);
    try {
      const subtasksResult = await fetchSubtasks(mainTaskId, id);
      

      await fetchQuestionnaireDetails(id);
      

      if (subtasksResult && subtasksResult.length > 0) {
        subtasksResult.forEach((subtask) => {

          if (subtask.questionnaires && subtask.questionnaires.length > 0) {
            return;
          }
          

          const possibleKeys = [
            subtask._id, 
            subtask.assignmentId,
            typeof subtask.subtaskId === 'object' ? subtask.subtaskId._id : null,
            typeof subtask.subtaskId === 'string' ? subtask.subtaskId : null,
            subtask._id?.replace(/^[a-f0-9]{24}-/, '') || null,
            subtask.subtaskId?._id || null
          ].filter(Boolean);
          

          const matchingKeys = possibleKeys.filter(key => questionnaires[key] && questionnaires[key].length > 0);
          
          if (matchingKeys.length > 0) {

            const key = matchingKeys[0]; 
            subtask.questionnaires = questionnaires[key];
          }
        });
      }
    } catch (error) {
      console.error('Error fetching subtasks:', error);
      toast.error('Failed to fetch subtasks: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubtasksLoading(false);
    }
  };


  const handleCloseSubtasks = () => {
    setShowSubtasksDialog(false);
  };

  const statusClasses = {
    PENDING: 'status-pending',
    ACTIVE: 'status-active', 
    COMPLETE: 'status-complete',
    REJECTED: 'status-rejected',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>Student ID: {student._id}</CardDescription>
              </div>
              <Badge className={cn('status-pill', statusClasses[student.status])}>
                {student.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.profilePicture} />
                <AvatarFallback className="text-xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 mb-4">
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.programDetails.program}</p>
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.phoneNumber}</span>
                </div>
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.collegeDetails.university}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Application Completion</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{student.isFeePaid ? '100' : '50'}%</span>
                </div>
                <Progress value={student.isFeePaid ? 100 : 50} className="h-2" />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <Button className="flex-1" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button className="flex-1">
                <FilePen className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="overview">
              <div className="w-full flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="universities">Universities</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              {student && <AssignUniversityDialog studentId={student._id} onAssign={handleAssign} />}
            </div>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">GRE</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Verbal</p>
                          <p className="text-xl font-semibold">{student.greDetails.greScore.verbal}</p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Quantitative</p>
                          <p className="text-xl font-semibold">{student.greDetails.greScore.quant}</p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground">AWA</p>
                          <p className="text-xl font-semibold">{student.greDetails.greScore.awa}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">IELTS</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Reading</p>
                            <p className="text-xl font-semibold">{student.ieltsDetails.ieltsScore.reading}</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Writing</p>
                            <p className="text-xl font-semibold">{student.ieltsDetails.ieltsScore.writing}</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Speaking</p>
                            <p className="text-xl font-semibold">{student.ieltsDetails.ieltsScore.speaking}</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Listening</p>
                            <p className="text-xl font-semibold">{student.ieltsDetails.ieltsScore.listening}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">TOEFL</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Reading</p>
                            <p className="text-xl font-semibold">{student.toeflDetails.toeflScore.reading}</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Writing</p>
                            <p className="text-xl font-semibold">{student.toeflDetails.toeflScore.writing}</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <p className="text-xs text-muted-foreground">Speaking</p>
                            <p className="text-xl font-semibold">{student.toeflDetails.toeflScore.speaking}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">Degree</p>
                        <p className="text-xl font-semibold">{student.collegeDetails.highestDegree}</p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">Branch</p>
                        <p className="text-xl font-semibold">{student.collegeDetails.branch}</p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">GPA</p>
                        <p className="text-xl font-semibold">{student.collegeDetails.gpa}</p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">Toppers GPA</p>
                        <p className="text-xl font-semibold">{student.collegeDetails.toppersGPA}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Checklist</CardTitle>
                  <CardDescription>
                    Track the status of required documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {documentsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>No documents found for this student.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((docGroup, index) => (
                        <div key={index} className="border rounded-md overflow-hidden">
                          <div className="bg-muted p-3">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <h3 className="font-medium">{docGroup.task?.title || 'Untitled Task'}</h3>
                                <p className="text-xs text-muted-foreground">
                                  Task ID: {docGroup.task?._id || 'Unknown'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {docGroup.subtasks && docGroup.subtasks.length > 0 ? (
                            <div className="p-3">
                              <h4 className="text-sm font-medium mb-2">Associated Subtasks:</h4>
                              <div className="space-y-2">
                                {docGroup.subtasks.map((subtask, idx) => (
                                  <div key={idx} className="pl-4 border-l-2 border-muted">
                                    <p className="text-sm">{subtask.title || 'Untitled Subtask'}</p>
                                    {subtask.documents && subtask.documents.length > 0 ? (
                                      <div className="mt-2 space-y-2">
                                        {subtask.documents.map((doc, docIdx) => (
                                          <div key={docIdx} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></div>
                                            <p className="text-xs">{doc.name || doc.fileName || 'Unnamed Document'}</p>
                                            <Badge className="ml-2" variant="outline">
                                              {doc.status || 'Pending'}
                                            </Badge>
                                            {doc.url && (
                                              <Button size="sm" variant="ghost" className="h-6 ml-auto" asChild>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                  <Eye className="h-3 w-3 mr-1" /> View
                                                </a>
                                              </Button>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-muted-foreground mt-1">No documents attached</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-3">
                              <p className="text-sm text-muted-foreground">No subtasks or documents associated</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="universities">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>University Applications</CardTitle>
                    <CardDescription>
                      Universities the student has applied to
                    </CardDescription>
                  </div>
                  <AssignUniversityDialog studentId={student._id} onAssign={handleAssign} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment._id} className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>                              <h3 className="font-medium">{assignment.universityId?.name || 'Unknown University'}</h3>
                              <p className="text-sm text-muted-foreground">{assignment.universityId?.program || 'No Program Specified'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={cn('status-pill', statusClasses[assignment.admissionStatus.toUpperCase()])}>
                              {assignment.admissionStatus}
                            </Badge>
                            <Badge variant="secondary">{assignment.universityStatus}</Badge>
                          </div>
                        </div>
                        <div className="p-3 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Assigned By:</span>
                            <span>{assignment.assignedBy.email}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Assigned Date:</span>
                            <span>{new Date(assignment.assignedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Select
                              value={assignment.universityStatus}
                              onValueChange={(value) => handleUpdateAssignment(assignment._id, { universityStatus: value })}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ambitious">Ambitious</SelectItem>
                                <SelectItem value="Achievable">Achievable</SelectItem>
                                <SelectItem value="Safe">Safe</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={assignment.admissionStatus}
                              onValueChange={(value) => handleUpdateAssignment(assignment._id, { admissionStatus: value })}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Applied">Applied</SelectItem>
                                <SelectItem value="Accepted">Accepted</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteAssignment(assignment._id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {assignments.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        No universities assigned yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks & Progress</CardTitle>
                  <CardDescription>Track student progress through assigned tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  {tasksLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="spinner"></div>
                    </div>
                  ) : studentTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>No tasks assigned to this student yet.</p>
                      <Button variant="outline" className="mt-4">
                        Assign Task
                      </Button>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {studentTasks.map(task => (
                        <AccordionItem key={task._id} value={task._id}>
                          <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <Badge className={`status-pill ${statusClasses[task.status]}`}>
                                    {task.status}
                                  </Badge>
                                </div>
                                <div>
                                  <h3 className="font-medium text-left">{task.taskId?.title || 'Untitled Task'}</h3>
                                  <p className="text-xs text-muted-foreground text-left">
                                    {task.taskId?.description ? 
                                      task.taskId.description.substring(0, 60) + (task.taskId.description.length > 60 ? '...' : '') 
                                      : 'No description'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-xs text-right mr-4">
                                  <div className="font-medium">Due</div>
                                  <div>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</div>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2 mb-2">
                                {/* Status update dropdown */}
                                <Select 
                                  value={task.status} 
                                  onValueChange={(value) => handleUpdateTaskStatus(task._id, value)}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Update Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Task details */}
                              <div className="bg-muted/30 p-4 rounded-md">
                                <div className="mb-2">
                                  <span className="text-sm font-medium">Description:</span>
                                  <p className="text-sm mt-1">{task.taskId?.description || 'No description provided'}</p>
                                </div>
                                
                                {task.taskId?.category && (
                                  <div className="mb-2">
                                    <span className="text-sm font-medium">Category:</span>
                                    <Badge variant="outline" className="ml-2">{task.taskId.category}</Badge>
                                  </div>
                                )}
                                
                                <div className="mb-2">
                                  <span className="text-sm font-medium">Priority:</span>
                                  <Badge variant="outline" className="ml-2">{task.taskId?.priority || 'MEDIUM'}</Badge>
                                </div>
                                
                                {task.assignedAt && (
                                  <div className="mb-2">
                                    <span className="text-sm font-medium">Assigned:</span>
                                    <span className="text-sm ml-2">{new Date(task.assignedAt).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm" onClick={() => handleOpenSubtasks(task._id)}>
                                  View Subtasks {subtasks[task.taskId?._id] ? `(${subtasks[task.taskId?._id].length})` : ''}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Subtasks Dialog */}
      <Dialog open={showSubtasksDialog} onOpenChange={handleCloseSubtasks}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Subtasks & Questionnaires</DialogTitle>
            <DialogDescription>
              Manage subtasks and view associated questionnaires
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {subtasksLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="spinner"></div>
              </div>
            ) : (
              <div>
                {!subtasks[selectedTaskId] || subtasks[selectedTaskId]?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No subtasks found for this task.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subtasks[selectedTaskId]?.map(subtask => (
                      <div key={subtask._id} className="rounded-md border">
                        <div className="p-3 bg-muted flex justify-between items-center">
                          <div className="flex-1">
                            {/* Display the subtask title - it's stored in the subtaskId field which might be a string or an object */}
                            <p className="text-sm font-medium">
                              {typeof subtask.subtaskId === 'string' 
                                ? subtask.subtaskId 
                                : (subtask.subtaskId?.title || 'Untitled Subtask')}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Status:</span> {subtask.status}
                              {subtask.isLocked && <span className="ml-2 text-amber-600">(Locked)</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Assigned:</span> {new Date(subtask.assignedAt).toLocaleDateString()}
                            </p>
                            {subtask.dueDate && (
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Due:</span> {new Date(subtask.dueDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={cn('status-pill', statusClasses[subtask.status])}>
                              {subtask.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateSubtaskStatus(
                                subtask._id, 
                                subtask.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED', 
                                !subtask.isLocked
                              )}
                            >
                              {subtask.isLocked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                              {subtask.status === 'COMPLETED' ? 'Reopen' : 'Complete'}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Questionnaires for this subtask */}
                        <div className="p-3 border-t">
                          <div className="flex items-center mb-2">
                            <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                            <h4 className="text-sm font-medium">Questionnaires</h4>
                          </div>
                          
                          {questionnaireLoading ? (
                            <div className="flex justify-center py-4">
                              <div className="spinner-sm"></div>
                            </div>
                          ) : (
                            <div>
                              {(() => {

                                if (subtask.questionnaires && Array.isArray(subtask.questionnaires) && subtask.questionnaires.length > 0) {
                                  const foundQuestionnaires = subtask.questionnaires;
                                  
                                  return (
                                    <div className="space-y-2">
                                      {foundQuestionnaires.map(questionnaire => (
                                        <div key={questionnaire._id} className="border rounded-sm">
                                          <div 
                                            className="p-2 bg-muted/50 flex justify-between items-center cursor-pointer"
                                            onClick={() => setExpandedQuestionnaire(
                                              expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` ? null : `${subtask._id}-${questionnaire._id}`
                                            )}
                                          >
                                            <div className="flex items-center">
                                              {expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` ? 
                                                <ChevronDown className="h-4 w-4 mr-1" /> : 
                                                <ChevronRight className="h-4 w-4 mr-1" />
                                              }
                                              <span className="text-xs font-medium">{questionnaire.title}</span>
                                            </div>
                                            <div>
                                              <Badge variant="outline" className="text-xs">
                                                {questionnaire.status || 'PENDING'}
                                              </Badge>
                                            </div>
                                          </div>
                                          
                                          {expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` && (
                                            <div className="p-2 text-xs space-y-2">
                                              <p className="text-muted-foreground">{questionnaire.description}</p>
                                              
                                              {questionnaire.questions && questionnaire.questions.length > 0 ? (
                                                <div className="space-y-2">
                                                  <h5 className="font-medium">Questions:</h5>
                                                  <ol className="list-decimal list-inside space-y-1.5">
                                                    {questionnaire.questions.map(question => (
                                                      <li key={question._id} className="ml-1">
                                                        <div className="text-xs font-medium">{question.question}</div>
                                                        <div className="pl-4 mt-1 text-xs">
                                                          <span className="text-muted-foreground">Type: </span>
                                                          <span>{question.ansType}</span>
                                                          {question.options && question.options.length > 0 && (
                                                            <div className="mt-1">
                                                              <span className="text-muted-foreground">Options: </span>
                                                              <span>{question.options.join(', ')}</span>
                                                            </div>
                                                          )}
                                                        </div>
                                                        {question.answer && (
                                                          <div className="pl-4 mt-1">
                                                            <span className="text-muted-foreground">Answer: </span>
                                                            <span>{question.answer}</span>
                                                          </div>
                                                        )}
                                                      </li>
                                                    ))}
                                                  </ol>
                                                </div>
                                              ) : (
                                                <p className="text-muted-foreground italic">No questions available</p>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                
                                // If no direct questionnaires, try looking them up by key
                                // Get a comprehensive list of possible keys for this subtask
                                const possibleKeys = [
                                  subtask._id, 
                                  subtask.assignmentId,
                                  // For when subtaskId is an object
                                  typeof subtask.subtaskId === 'object' ? subtask.subtaskId._id : null,
                                  // For when subtaskId is a string
                                  typeof subtask.subtaskId === 'string' ? subtask.subtaskId : null,
                                  // Try without prefixes/suffixes if they exist
                                  subtask._id?.replace(/^[a-f0-9]{24}-/, '') || null,
                                  // Try different combinations that might exist in the data
                                  subtask.subtaskId?._id || null
                                ].filter(Boolean); // Remove null/undefined values
                                
                                // Find the questionnaires by trying each key
                                let foundQuestionnaires = null;
                                
                                for (const key of possibleKeys) {
                                  if (questionnaires[key] && Array.isArray(questionnaires[key]) && questionnaires[key].length > 0) {
                                    foundQuestionnaires = questionnaires[key];
                                    break;
                                  }
                                }
                                
                                if (foundQuestionnaires) {
                                  return (
                                    <div className="space-y-2">
                                      {foundQuestionnaires.map(questionnaire => (
                                        <div key={questionnaire._id} className="border rounded-sm">
                                          <div 
                                            className="p-2 bg-muted/50 flex justify-between items-center cursor-pointer"
                                            onClick={() => setExpandedQuestionnaire(
                                              expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` ? null : `${subtask._id}-${questionnaire._id}`
                                            )}
                                          >
                                            <div className="flex items-center">
                                              {expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` ? 
                                                <ChevronDown className="h-4 w-4 mr-1" /> : 
                                                <ChevronRight className="h-4 w-4 mr-1" />
                                              }
                                              <span className="text-xs font-medium">{questionnaire.title}</span>
                                            </div>
                                            <div>
                                              <Badge variant="outline" className="text-xs">
                                                {questionnaire.status || 'PENDING'}
                                              </Badge>
                                            </div>
                                          </div>
                                          
                                          {expandedQuestionnaire === `${subtask._id}-${questionnaire._id}` && (
                                            <div className="p-2 text-xs space-y-2">
                                              <p className="text-muted-foreground">{questionnaire.description}</p>
                                              
                                              {questionnaire.questions && questionnaire.questions.length > 0 ? (
                                                <div className="space-y-2">
                                                  <h5 className="font-medium">Questions:</h5>
                                                  <ol className="list-decimal list-inside space-y-1.5">
                                                    {questionnaire.questions.map(question => (
                                                      <li key={question._id} className="ml-1">
                                                        <div className="text-xs font-medium">{question.question}</div>
                                                        <div className="pl-4 mt-1 text-xs">
                                                          <span className="text-muted-foreground">Type: </span>
                                                          <span>{question.ansType}</span>
                                                          {question.options && question.options.length > 0 && (
                                                            <div className="mt-1">
                                                              <span className="text-muted-foreground">Options: </span>
                                                              <span>{question.options.join(', ')}</span>
                                                            </div>
                                                          )}
                                                        </div>
                                                        {question.answer && (
                                                          <div className="pl-4 mt-1">
                                                            <span className="text-muted-foreground">Answer: </span>
                                                            <span>{question.answer}</span>
                                                          </div>
                                                        )}
                                                      </li>
                                                    ))}
                                                  </ol>
                                                </div>
                                              ) : (
                                                <p className="text-muted-foreground italic">No questions available</p>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                } else {
                                  return <p className="text-xs text-muted-foreground py-2">No questionnaires associated with this subtask.</p>;
                                }
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

StudentProfile.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
