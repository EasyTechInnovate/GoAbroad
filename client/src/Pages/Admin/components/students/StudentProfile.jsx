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
  Calendar, 
  FilePen, 
  GraduationCap, 
  Mail, 
  Phone, 
  Clock, 
  FileCheck, 
  CheckSquare,
  FileText,
  MessageSquare
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getStudentById, apiService } from '@/services/api.services';
import PropTypes from 'prop-types';
import { AssignUniversityDialog } from './AssignUniversityDialog';

export function StudentProfile({ id }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

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
        const [studentResponse, assignmentsResponse] = await Promise.all([
          getStudentById(id),
          apiService.get('/admin/student-university-assignments')
        ]);
        
        setStudent(studentResponse.data.student);
        if (assignmentsResponse.data?.assignments) {
          setAssignments(assignmentsResponse.data.assignments);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
                  <div className="space-y-4">
                    {student.personalDetails && (
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Personal Details</p>
                            <p className="text-xs text-muted-foreground">
                              {student.personalDetails.profession} - {student.personalDetails.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn('status-pill', statusClasses[student.status])}>
                            {student.status}
                          </Badge>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    )}
                  </div>
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
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>
                    Manage and track student&apos;s tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="planned-tests">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Planned Tests</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-6">
                          {student.greDetails.retakingGRE === 'Yes' && (
                            <div className="flex justify-between items-center border-b pb-2">
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-secondary" />
                                <span>GRE Retake</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Planned: {new Date(student.greDetails.grePlane).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}
                          {student.ieltsDetails.retakingIELTS === 'Yes' && (
                            <div className="flex justify-between items-center border-b pb-2">
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-secondary" />
                                <span>IELTS Retake</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Planned: {new Date(student.ieltsDetails.ieltsPlan).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}
                          {student.toeflDetails.retakingTOEFL === 'Yes' && (
                            <div className="flex justify-between items-center border-b pb-2">
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-secondary" />
                                <span>TOEFL Retake</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Planned: {new Date(student.toeflDetails.toeflPlan).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}
                          <Button size="sm" className="mt-2">
                            <CheckSquare className="h-4 w-4 mr-2" />
                            Add Task
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="completed-tests">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <FileCheck className="h-4 w-4 mr-2" />
                          <span>Completed Tests</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-6">
                          <div className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center gap-3">
                              <CheckSquare className="h-4 w-4 text-success" />
                              <span className="line-through">GRE Test</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Date: {new Date(student.greDetails.greDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center gap-3">
                              <CheckSquare className="h-4 w-4 text-success" />
                              <span className="line-through">IELTS Test</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Date: {new Date(student.ieltsDetails.ieltsDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center gap-3">
                              <CheckSquare className="h-4 w-4 text-success" />
                              <span className="line-through">TOEFL Test</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Date: {new Date(student.toeflDetails.toeflDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

StudentProfile.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
