import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Search,
  MoreHorizontal,
  Eye,
  Upload,
  FileText,
  FileCheck,
  FileX,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { getDocuments, updateDocument, uploadDocument, deleteDocument } from '@/services/documentService';
import { getTasks } from '@/services/taskService';
import { getSubtasks } from '@/services/subtaskService';
import { getStudents } from '@/services/studentService';
import { uploadFile } from '@/services/uploadService';

const Documents = ({ studentId }) => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [subtasksLoading, setSubtasksLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSubtask, setSelectedSubtask] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(studentId || "");

  const validateFile = (file) => {
    const validFileTypes = {
      'application/pdf': 'PDF',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'application/msword': 'DOC',
      'image/jpeg': 'JPG',
      'image/png': 'PNG'
    };

    const fileType = validFileTypes[file.type];
    if (!fileType) {
      toast.error(`Please upload a valid file type (${Object.values(validFileTypes).join(', ')})`);
      return null;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast.error('File size should be less than 10MB');
      return null;
    }

    return fileType;
  };

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDocuments({ page: 1, limit: 10 });
      
      if (!response?.data?.documents) {
        throw new Error('Invalid response from server');
      }

      const mappedDocs = response.data.documents.map(doc => ({
        id: doc._id,
        name: doc.fileName,
        size: `${(doc.fileSize / (1024 * 1024)).toFixed(1)} MB`,
        student: doc.studentId?.name || 'N/A',
        task: doc.taskId?.title || 'N/A',
        subtask: doc.subtaskId?.title || 'N/A',
        uploadDate: new Date(doc.uploadedAt || doc.createdAt).toLocaleDateString(),
        status: doc.status.toLowerCase(),
        fileUrl: doc.fileUrl
      }));

      setDocuments(mappedDocs);
      setFilteredDocuments(mappedDocs);
    } catch (err) {
      console.error('Error fetching documents:', err);
      toast.error(err.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed as it only uses stable functions

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Filtering effect
  useEffect(() => {
    let filtered = [...documents];
    
    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(doc => doc.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => (
        doc.name.toLowerCase().includes(query) ||
        doc.student.toLowerCase().includes(query) ||
        doc.task.toLowerCase().includes(query) ||
        doc.subtask.toLowerCase().includes(query)
      ));
    }
    
    setFilteredDocuments(filtered);
  }, [documents, activeTab, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = async (docId, newStatus) => {
    try {
      await updateDocument(docId, { status: newStatus.toUpperCase() });
      await fetchDocuments();
      toast.success(`Document marked as ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error(err.message || 'Failed to update document status');
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await deleteDocument(docId);
      await fetchDocuments();
      toast.success('Document deleted successfully');
    } catch (err) {
      console.error('Error deleting document:', err);
      toast.error(err.message || 'Failed to delete document');
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        event.target.value = null;
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSelectedTask('');
    setSelectedSubtask('');
    if (!studentId) {
      setSelectedStudent('');
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedFile || !selectedTask || !selectedSubtask || !selectedStudent) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setUploadLoading(true);

      const fileFormData = new FormData();
      fileFormData.append('file', selectedFile);
      fileFormData.append('category', 'documents');

      const uploadResponse = await uploadFile(fileFormData);

      if (!uploadResponse?.data?.url) {
        throw new Error('Failed to get uploaded file URL');
      }

      const documentData = new FormData();
      documentData.append('studentId', selectedStudent);
      documentData.append('taskId', selectedTask);
      documentData.append('subtaskId', selectedSubtask);
      documentData.append('fileUrl', uploadResponse.data.url);
      documentData.append('fileName', selectedFile.name);
      documentData.append('fileSize', selectedFile.size);
      documentData.append('fileType', selectedFile.type);

      await uploadDocument(documentData);
      await fetchDocuments();
      
      setIsUploadDialogOpen(false);
      toast.success('Document uploaded successfully');
      resetForm();
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err.message || 'Failed to upload document');
    } finally {
      setUploadLoading(false);
    }
  };

  const fetchTasks = async (studentId) => {
    if (!studentId) {
      setTasks([]);
      return;
    }

    try {
      setTasksLoading(true);
      const response = await getTasks(studentId);
      const tasksData = response.data || [];
      
      if (!Array.isArray(tasksData)) {
        throw new Error('Invalid tasks data received');
      }

      setTasks(tasksData);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setTasksLoading(false);
    }
  };

  const fetchSubtasks = async (taskId) => {
    if (!taskId || !selectedStudent) {
      setSubtasks([]);
      return;
    }
    
    try {
      setSubtasksLoading(true);
      const response = await getSubtasks(taskId, selectedStudent);
      const subtasksData = response.data || [];

      if (!Array.isArray(subtasksData)) {
        throw new Error('Invalid subtasks data received');
      }

      setSubtasks(subtasksData);
    } catch (err) {
      console.error('Error fetching subtasks:', err);
      toast.error(err.message || 'Failed to fetch subtasks');
    } finally {
      setSubtasksLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setStudentsLoading(true);
      const response = await getStudents();
      const studentsData = response.data?.students || [];

      if (!Array.isArray(studentsData)) {
        throw new Error('Invalid students data received');
      }

      setStudents(studentsData);
    } catch (err) {
      console.error('Error fetching students:', err);
      toast.error(err.message || 'Failed to fetch students');
    } finally {
      setStudentsLoading(false);
    }
  };

  const memoizedFetchTasks = useCallback(fetchTasks, []);
  const memoizedFetchStudents = useCallback(fetchStudents, []);

  useEffect(() => {
    memoizedFetchTasks(selectedStudent);
    if (!studentId) {
      memoizedFetchStudents();
    }
  }, [selectedStudent, studentId, memoizedFetchTasks, memoizedFetchStudents]);

  // Memoize fetchSubtasks to prevent infinite rerenders
  const memoizedFetchSubtasks = useCallback(fetchSubtasks, [selectedStudent]);

  useEffect(() => {
    if (selectedTask) {
      memoizedFetchSubtasks(selectedTask);
    }
  }, [selectedTask, memoizedFetchSubtasks]);

  useEffect(() => {
    if (studentId) {
      setSelectedStudent(studentId);
    }
  }, [studentId]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Document Manager</h1>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-8 w-[300px]"
          />
        </div>
        <Button
          onClick={() => setIsUploadDialogOpen(true)}
          className="bg-primary text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Subtask</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-blue-500" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.student}</TableCell>
                      <TableCell>{doc.task}</TableCell>
                      <TableCell>{doc.subtask}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                          ${doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                          doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'}`}>
                          {doc.status === 'verified' ? (
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                          ) : doc.status === 'rejected' ? (
                            <XCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(doc.fileUrl, '_blank')}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'verified')}>
                              <FileCheck className="mr-2 h-4 w-4 text-green-500" />
                              Verify
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'rejected')}>
                              <FileX className="mr-2 h-4 w-4 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <FileX className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a document for a student&apos;s task or subtask.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="student">Student</Label>
              <Select
                value={selectedStudent}
                onValueChange={setSelectedStudent}
                disabled={studentsLoading || !!studentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a student">
                    {studentsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : 'Select a student'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(students) && students.length > 0 ? (
                    students.map(student => (
                      <SelectItem
                        key={student._id}
                        value={student._id}
                      >
                        {student.firstName} {student.lastName} ({student.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-students" disabled>No students available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Document File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>



            <div className="grid gap-2">
              <Label htmlFor="task">Task</Label>
              <Select value={selectedTask} onValueChange={(value) => {
                setSelectedTask(value);
                setSelectedSubtask('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task">
                    {tasksLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : 'Select a task'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>                  {Array.isArray(tasks) && tasks.length > 0 ? (
                  tasks.map(task => (
                    <SelectItem key={task._id || task.id} value={task._id || task.id}>
                      {task.title || task.name || 'Untitled Task'}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-tasks" disabled>No tasks available</SelectItem>
                )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subtask">Subtask</Label>
              <Select
                value={selectedSubtask}
                onValueChange={setSelectedSubtask}
                disabled={!selectedTask || subtasksLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subtask">
                    {subtasksLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : 'Select a subtask'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>                  {Array.isArray(subtasks) && subtasks.length > 0 ? (
                  subtasks.map(subtask => (
                    <SelectItem key={subtask._id} value={subtask._id}>
                      {subtask.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-subtasks" disabled>No subtasks available</SelectItem>
                )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadDocument} isLoading={uploadLoading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

Documents.propTypes = {
  studentId: PropTypes.string
};

Documents.defaultProps = {
  studentId: ''
};

export default Documents;