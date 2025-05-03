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
import { cn } from '@/lib/utils';

import PropTypes from 'prop-types';

export function StudentProfile({ id }) {
  // In a real app, you'd fetch the student data based on the ID
  const student = {
    id,
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    status: 'active',
    university: 'Stanford University',
    program: 'Computer Science',
    completionRate: 65,
    scores: {
      gre: {
        verbal: 165,
        quantitative: 168,
        analytical: 4.5,
      },
      ielts: 7.5,
      toefl: 110,
    },
    tasks: [
      {
        id: '1',
        title: 'Complete Financial Documents',
        status: 'pending',
        dueDate: 'Oct 15, 2023',
      },
      {
        id: '2',
        title: 'Submit SOP Draft',
        status: 'complete',
        dueDate: 'Oct 10, 2023',
      },
      {
        id: '3', 
        title: 'Schedule IELTS Test',
        status: 'complete',
        dueDate: 'Oct 5, 2023',
      },
      {
        id: '4',
        title: 'Request Recommendation Letters',
        status: 'pending',
        dueDate: 'Oct 25, 2023',
      },
    ],
    documents: [
      {
        id: '1',
        name: 'Statement of Purpose.docx',
        status: 'complete',
        updatedAt: 'Oct 8, 2023',
      },
      {
        id: '2',
        name: 'Resume.pdf',
        status: 'complete',
        updatedAt: 'Oct 2, 2023',
      },
      {
        id: '3',
        name: 'Financial Documents.pdf',
        status: 'pending',
        updatedAt: 'Oct 12, 2023',
      },
      {
        id: '4',
        name: 'Recommendation Letter.pdf',
        status: 'pending',
        updatedAt: 'Not submitted',
      },
    ],
    universities: [
      {
        id: '1',
        name: 'Stanford University',
        status: 'active',
        program: 'MS in Computer Science',
        deadline: 'Dec 1, 2023',
      },
      {
        id: '2',
        name: 'MIT',
        status: 'active',
        program: 'MS in Computer Science',
        deadline: 'Dec 15, 2023',
      },
      {
        id: '3',
        name: 'Harvard University',
        status: 'pending',
        program: 'MS in Data Science',
        deadline: 'Jan 5, 2024',
      },
    ],
  };

  const statusClasses = {
    pending: 'status-pending',
    active: 'status-active', 
    complete: 'status-complete',
    rejected: 'status-rejected',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>Student ID: {student.id}</CardDescription>
              </div>
              <Badge className={cn('status-pill', statusClasses[student.status])}>
                {student.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="text-xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 mb-4">
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.program}</p>
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.university}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Application Completion</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{student.completionRate}%</span>
                </div>
                <Progress value={student.completionRate} className="h-2" />
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
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="universities">Universities</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

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
                          <p className="text-xl font-semibold">{student.scores.gre.verbal}</p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Quantitative</p>
                          <p className="text-xl font-semibold">{student.scores.gre.quantitative}</p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Analytical</p>
                          <p className="text-xl font-semibold">{student.scores.gre.analytical}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">IELTS</p>
                        <p className="text-xl font-semibold">{student.scores.ielts}</p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-xs text-muted-foreground">TOEFL</p>
                        <p className="text-xl font-semibold">{student.scores.toefl}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {student.tasks.filter(task => task.status === 'pending').slice(0, 3).map((task) => (
                      <li key={task.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 mr-2 text-secondary" />
                          <span>{task.title}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Due {task.dueDate}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
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
                    {student.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Updated: {doc.updatedAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn('status-pill', statusClasses[doc.status])}>
                            {doc.status}
                          </Badge>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="universities">
              <Card>
                <CardHeader>
                  <CardTitle>University Applications</CardTitle>
                  <CardDescription>
                    Universities the student has applied to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.universities.map((uni) => (
                      <div key={uni.id} className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
                            <h3 className="font-medium">{uni.name}</h3>
                          </div>
                          <Badge className={cn('status-pill', statusClasses[uni.status])}>
                            {uni.status}
                          </Badge>
                        </div>
                        <div className="p-3 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Program:</span>
                            <span>{uni.program}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Deadline:</span>
                            <span>{uni.deadline}</span>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm">Documents</Button>
                            <Button size="sm">Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    <AccordionItem value="pending">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Pending Tasks</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-6">
                          {student.tasks
                            .filter((task) => task.status === 'pending')
                            .map((task) => (
                              <div key={task.id} className="flex justify-between items-center border-b pb-2">
                                <div className="flex items-center gap-3">
                                  <CheckSquare className="h-4 w-4 text-secondary" />
                                  <span>{task.title}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Due {task.dueDate}</span>
                                </div>
                              </div>
                            ))}
                            <Button size="sm" className="mt-2">
                              <CheckSquare className="h-4 w-4 mr-2" />
                              Add Task
                            </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="completed">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <FileCheck className="h-4 w-4 mr-2" />
                          <span>Completed Tasks</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-6">
                          {student.tasks
                            .filter((task) => task.status === 'complete')
                            .map((task) => (
                              <div key={task.id} className="flex justify-between items-center border-b pb-2">
                                <div className="flex items-center gap-3">
                                  <CheckSquare className="h-4 w-4 text-success" />
                                  <span className="line-through">{task.title}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Due {task.dueDate}</span>
                                </div>
                              </div>
                            ))}
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
      )
}

StudentProfile.propTypes = {
  id: PropTypes.string.isRequired,
}; 