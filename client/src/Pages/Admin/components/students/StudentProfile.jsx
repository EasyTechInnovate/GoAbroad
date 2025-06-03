import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStudentById } from '@/services/studentService';
import { getDocuments } from '@/services/documentService';
import { getQuestionnaires } from '@/services/questionnaireService';
import { getTasks } from '@/services/taskService';
import { getUniversityAssignments } from '@/services/universityAssignmentService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  FileText, 
  GraduationCap, 
  Mail, 
  MessageSquare, 
  Phone, 
  FilePen 
} from 'lucide-react';

export function StudentProfile({ id }) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const [
          studentRes,
          documentsRes,
          questionnairesRes,
          tasksRes,
          universitiesRes
        ] = await Promise.all([
          getStudentById(id),
          getDocuments({ studentId: id }),
          getQuestionnaires(),
          getTasks({ studentId: id }),
          getUniversityAssignments({ studentId: id })
        ]);

        setStudent(studentRes.data);
        setDocuments(documentsRes.data.documents || []);
        setQuestionnaires(questionnairesRes.data.questionnaires || []);
        setTasks(tasksRes.data.tasks || []);
        setUniversities(universitiesRes.data.assignments || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  if (!student) {
    return <div className="flex items-center justify-center p-8">Student not found</div>;
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      ACTIVE: 'bg-green-100 text-green-800 border-green-300',
      INACTIVE: 'bg-red-100 text-red-800 border-red-300',
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      COMPLETE: 'bg-blue-100 text-blue-800 border-blue-300',
      IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
      VERIFIED: 'bg-green-100 text-green-800 border-green-300',
      REJECTED: 'bg-red-100 text-red-800 border-red-300',
    };
    return (
      <Badge className={cn(statusClasses[status] || 'bg-gray-100 text-gray-800')}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusBadge(student.status)}
                  {student.isVerified && (
                    <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">Application Progress</div>
              <Progress value={student.completionRate || 0} className="w-[200px] mt-2" />
              <div className="text-sm text-muted-foreground mt-1">
                {student.completionRate || 0}% Complete
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
              )}
              {student.university && (
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span>{student.university}</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Joined {new Date(student.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button>
                <FilePen className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="questionnaires" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
        </TabsList>

        <TabsContent value="questionnaires">
          <Card>
            <CardHeader>
              <CardTitle>Questionnaires</CardTitle>
              <CardDescription>Forms and assessments assigned to the student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questionnaires.map((questionnaire) => (
                  <div key={questionnaire._id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{questionnaire.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {questionnaire.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(questionnaire.status)}
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Student&apos;s submitted documents and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc._id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.fileName}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(doc.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
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
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Student&apos;s assigned tasks and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task._id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <CheckSquare className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline-block mr-1" />
                          Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(task.status)}
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
              <CardDescription>Universities the student has applied to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {universities.map((uni) => (
                  <div key={uni._id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{uni.university?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {uni.university?.programs?.join(', ')}
                          {uni.university?.applicationDeadline && (
                            <span> - Deadline: {new Date(uni.university.applicationDeadline).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(uni.admissionStatus)}
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

StudentProfile.propTypes = {
  id: PropTypes.string.isRequired,
};
