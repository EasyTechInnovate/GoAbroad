import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  Eye,
  Upload,
  Download,
  FileText,
  Loader2,
  TrashIcon
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { getDocuments, updateDocument, uploadDocument, deleteDocument } from '@/services/documentService';
import { getTasksByStudentId } from '@/services/taskService';
import { getSubtasksByTaskAndStudent } from '@/services/subtaskService';
import { getStudents } from '@/services/studentService';
import { uploadFile } from '@/services/uploadService';
import { createPortal } from 'react-dom';

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
  const [selectedFileType, setSelectedFileType] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(studentId || "");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({});

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
      const validType = validateFile(file);
      if (validType) {
        setSelectedFile(file);
        setSelectedFileType(validType);
      } else {
        setSelectedFileType("");
        event.target.value = null;
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSelectedFileType("");
    setSelectedTask('');
    setSelectedSubtask('');
    if (!studentId) {
      setSelectedStudent('');
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedFile || !selectedTask || !selectedSubtask || !selectedStudent || !selectedFileType) {
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
      documentData.append('fileType', selectedFileType); // Use validated type (PDF, DOCX, JPG, PNG)

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

  // Memoized fetch functions
  const fetchTasks = useCallback(async (studentId) => {
    if (!studentId) {
      setTasks([]);
      return;
    }

    try {
      setTasksLoading(true);
      console.log('Fetching tasks for student:', studentId); // Debug log
      const response = await getTasksByStudentId(studentId);
      const tasksData = response.data?.task || [];
      
      if (!Array.isArray(tasksData)) {
        throw new Error('Invalid tasks data received');
      }

      // Map the tasks data from the taskId object which contains the main task details
      const mappedTasks = tasksData.map(task => ({
        _id: task.taskId._id,
        id: task.taskId._id,
        title: task.taskId.title || 'Untitled Task',
        assignedAt: task.assignedAt,
        status: task.status,
        dueDate: task.dueDate,
        priority: task.taskId.priority,
        assignmentId: task._id // Keep the assignment ID for reference
      }));

      console.log('Tasks fetched:', mappedTasks); // Debug log
      setTasks(mappedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setTasksLoading(false);
    }
  }, []);

  const fetchSubtasks = useCallback(async (taskId) => {
    if (!taskId || !selectedStudent) {
      setSubtasks([]);
      return;
    }
    try {
      setSubtasksLoading(true);
      const response = await getSubtasksByTaskAndStudent(taskId, selectedStudent);
      console.log("Subtaskssss",response)
      const subtasksData = response.subTasks || [];
      if (!Array.isArray(subtasksData)) {
        throw new Error('Invalid subtasks data received');
      }
      // Always provide a string for title (use subtaskId if nothing else)
      const mappedSubtasks = subtasksData.map(subtask => {
        let title = '';
        if (subtask.title && typeof subtask.title === 'string' && subtask.title.trim()) {
          title = subtask.title;
        } else if (subtask.name && typeof subtask.name === 'string' && subtask.name.trim()) {
          title = subtask.name;
        } else if (subtask.taskId && subtask.taskId.title) {
          title = `${subtask.taskId.title}`;
        } else {
          title = String(subtask.subtaskId);
        }
        return {
          _id: subtask.subtaskId,
          id: subtask.subtaskId,
          assignmentId: subtask._id,
          taskId: subtask.taskId?._id || subtask.taskId,
          status: subtask.status,
          dueDate: subtask.dueDate,
          assignedAt: subtask.assignedAt,
          title
        };
      });
      setSubtasks(mappedSubtasks);
    } catch (err) {
      setSubtasks([]);
      console.error('Error fetching subtasks:', err);
      toast.error(err.message || 'Failed to fetch subtasks');
    } finally {
      setSubtasksLoading(false);
    }
  }, [selectedStudent]);

  const fetchStudents = useCallback(async () => {
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
  }, []);

  // Effects to handle data fetching
  useEffect(() => {
    if (selectedStudent) {
      console.log('Selected student changed, fetching tasks:', selectedStudent); // Debug log
      fetchTasks(selectedStudent);
    }
    if (!studentId) {
      fetchStudents();
    }
  }, [selectedStudent, studentId, fetchTasks, fetchStudents]);

  useEffect(() => {
    if (selectedTask) {
      console.log('Selected task changed, fetching subtasks:', selectedTask); // Debug log
      fetchSubtasks(selectedTask);
    }
  }, [selectedTask, fetchSubtasks]);

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
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                          ${doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                            doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'}`}
                          style={{ minWidth: 70, justifyContent: 'center' }}>
                          {doc.status === 'verified' && 'Verified'}
                          {doc.status === 'pending' && 'Pending'}
                          {doc.status === 'rejected' && 'Rejected'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center" style={{ verticalAlign: 'middle', padding: 0 }}>
                        <div className="flex items-center gap-4 justify-center" style={{ height: '100%' }}>
                          <Button size="icon" variant="ghost" onClick={() => window.open(doc.fileUrl, '_blank')} title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => {
                            const link = document.createElement('a');
                            link.href = doc.fileUrl;
                            link.download = doc.name || 'document';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }} title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <div className="relative" style={{ display: 'inline-block' }}>
                            <Button size="icon" variant="ghost" title="More Actions" onClick={e => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX - 160 });
                              setOpenDropdownId(openDropdownId === doc.id ? null : doc.id);
                            }}>
                              <span style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 2 }}>⋯</span>
                            </Button>
                            {openDropdownId === doc.id && createPortal(
                              <div className="fixed bg-white border rounded shadow-md min-w-[160px] mt-2" style={{ zIndex: 99999, top: dropdownPosition.top, left: dropdownPosition.left }}>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                  onClick={() => { handleStatusChange(doc.id, 'verified'); setOpenDropdownId(null); }}
                                >
                                  Mark as Verified
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                  onClick={() => { handleStatusChange(doc.id, 'pending'); setOpenDropdownId(null); }}
                                >
                                  Mark as Pending
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 cursor-pointer"
                                  onClick={() => { handleStatusChange(doc.id, 'rejected'); setOpenDropdownId(null); }}
                                >
                                  Mark as Rejected
                                </button>
                              </div>,
                              document.body
                            )}
                          </div>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteDocument(doc.id)} title="Delete">
                            <TrashIcon className="h-4 w-4 text-red-600 cursor-pointer" />
                          </Button>
                        </div>
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
          
          <div className="space-y-4">
            {!studentId && (
              <div>
                <Label>Student</Label>
                <Select
                  value={selectedStudent || undefined}
                  onValueChange={value => {
                    setSelectedStudent(value);
                    setSelectedTask("");
                    setSelectedSubtask("");
                  }}
                  disabled={studentsLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Student">
                    {(() => {
                      const s = students.find(s => s._id === selectedStudent);
                      if (!s) return null;
                      if (s.firstName || s.lastName) {
                        return `${s.firstName || ''} ${s.lastName || ''}`.trim();
                      }
                      return s.email;
                    })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {students.length === 0 ? (
                      <SelectItem value="__none__" disabled>
                        {studentsLoading ? "Loading..." : "No students available"}
                      </SelectItem>
                    ) : (
                      students.map(student => (
                        <SelectItem key={student._id} value={student._id}>
                        {student.firstName || student.lastName ? `${student.firstName || ''} ${student.lastName || ''}`.trim() : student.email}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Task</Label>
              <Select
                value={selectedTask || undefined}
                onValueChange={value => {
                  setSelectedTask(value);
                  setSelectedSubtask("");
                }}
                disabled={!selectedStudent || tasksLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Task">
                    {selectedTask && tasks.find(t => t._id === selectedTask)?.title}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {tasks.length === 0 ? (
                    <SelectItem value="__none__" disabled>
                      {tasksLoading ? "Loading..." : "No tasks available"}
                    </SelectItem>
                  ) : (
                    tasks.map(task => (
                      <SelectItem key={task._id} value={task._id}>
                        {task.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Subtask</Label>
              <Select
                value={selectedSubtask || undefined}
                onValueChange={setSelectedSubtask}
                disabled={!selectedTask || subtasksLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Subtask">
                    {selectedSubtask && (subtasks.find(s => s._id === selectedSubtask)?.title || selectedSubtask)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {subtasks.length === 0 ? (
                    <SelectItem value="__none__" disabled>
                      {subtasksLoading ? "Loading..." : "No subtasks available"}
                    </SelectItem>
                  ) : (
                    subtasks.map(subtask => (
                      <SelectItem key={subtask._id} value={subtask._id}>
                        {subtask.title || subtask._id}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Document File</Label>
              <Input 
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={!selectedFile || !selectedTask || !selectedSubtask || !selectedStudent || uploadLoading}
              onClick={handleUploadDocument}
            >
              {uploadLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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