import { useState, forwardRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Upload,
  FileText,
  FileCheck,
  FilePlus,
  FileX,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown,
  Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { getDocuments, updateDocument, uploadDocument, deleteDocument } from '@/services/documentService';
import { getTasks } from '@/services/taskService';
import { getSubtasks } from '@/services/subtaskService';
import { getStudentById, getStudents } from '@/services/studentService';
import { uploadFile } from '@/services/uploadService';
import { DownloadIcon } from '@radix-ui/react-icons';

const DOCUMENT_TYPES = [
  'Passport Scan',
  'University Application',
  'Academic Transcript',
  'Statement of Purpose',
  'Recommendation Letter',
  'Financial Statement',
  'Language Proficiency',
  'Resume/CV',
  'Visa Application',
  'Health Insurance',
  'Student ID',
  'Accommodation Contract'
];

const TEMPLATE_DOCUMENTS = [
  {
    id: 'template-001',
    name: 'University_Application_Form.pdf',
    type: 'University Application',
    size: '0.3 MB',
    lastUpdated: new Date(2023, 5, 15),
    required: true
  },
  {
    id: 'template-002',
    name: 'Financial_Declaration_Form.pdf',
    type: 'Financial Statement',
    size: '0.2 MB',
    lastUpdated: new Date(2023, 8, 3),
    required: true
  },
  {
    id: 'template-003',
    name: 'Visa_Application_Checklist.pdf',
    type: 'Visa Application',
    size: '0.1 MB',
    lastUpdated: new Date(2023, 6, 22),
    required: true
  },
  {
    id: 'template-004',
    name: 'Accommodation_Request_Form.pdf',
    type: 'Accommodation Contract',
    size: '0.2 MB',
    lastUpdated: new Date(2023, 7, 10),
    required: false
  },
  {
    id: 'template-005',
    name: 'SOP_Guidelines.pdf',
    type: 'Statement of Purpose',
    size: '0.4 MB',
    lastUpdated: new Date(2023, 9, 5),
    required: false
  },
  {
    id: 'template-006',
    name: 'Recommendation_Letter_Template.docx',
    type: 'Recommendation Letter',
    size: '0.1 MB',
    lastUpdated: new Date(2023, 4, 28),
    required: false
  }
];

const MenuButton = forwardRef(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={`h-8 w-8 p-0 ${className || ''}`}
    {...props}
  >
    {children}
  </Button>
));

MenuButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MenuButton.defaultProps = {
  className: '',
};

MenuButton.displayName = 'MenuButton';

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'verified':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'rejected':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const Documents = ({ studentId }) => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [subtasksLoading, setSubtasksLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSubtask, setSelectedSubtask] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [viewDocument, setViewDocument] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [templates, setTemplates] = useState(TEMPLATE_DOCUMENTS);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState(null);
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

    if (!validFileTypes[file.type]) {
      toast.error(`Please upload a valid file type (${Object.values(validFileTypes).join(', ')})`);
      return false;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast.error('File size should be less than 10MB');
      return false;
    }

    return true;
  };

  const filterDocuments = useCallback(() => {
    let filtered = [...documents];

    if (activeTab === 'approved') {
      filtered = filtered.filter(doc => doc.status === 'verified');
    } else if (activeTab === 'pending') {
      filtered = filtered.filter(doc => doc.status === 'pending');
    } else if (activeTab === 'rejected') {
      filtered = filtered.filter(doc => doc.status === 'rejected');
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(lowercaseQuery) ||
        doc.student?.toLowerCase().includes(lowercaseQuery) ||
        doc.studentId?.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    setFilteredDocuments(filtered);
  }, [documents, searchQuery, selectedType, activeTab]);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDocuments({ page: pagination.page, limit: pagination.limit });

      const documentsArray = Array.isArray(response.data) ? response.data : (response.data.documents || []);

      const docs = documentsArray.map(doc => ({
        id: doc._id,
        name: doc.fileName,
        type: doc.fileType,
        size: `${(doc.fileSize / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date(doc.createdAt),
        status: doc.status.toLowerCase(),
        student: doc.studentName || 'N/A',
        studentId: doc.studentId || 'N/A',
        fileUrl: doc.fileUrl
      }));

      setDocuments(docs);

      if (response.data.pagination) {
        setPagination(response.data.pagination);
      } else {
        setPagination({
          page: 1,
          limit: docs.length,
          total: docs.length,
          totalPages: 1
        });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  // Fetch documents only when pagination changes
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Apply filters whenever documents or filter criteria change
  useEffect(() => {
    filterDocuments();
  }, [filterDocuments]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const handleStatusChange = async (docId, newStatus) => {
    try {
      const apiStatus = newStatus === 'approved' ? 'VERIFIED' : newStatus.toUpperCase();
      await updateDocument(docId, { status: apiStatus });
      await fetchDocuments();
      toast.success(`Document ${newStatus} successfully`);
    } catch (error) {
      toast.error(error.message || 'Failed to update document status');
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setNewDocName(file.name);
      } else {
        event.target.value = null;
      }
    }
  };
  const resetForm = () => {
    setNewDocName('');
    setNewDocType('');
    setIsRequired(false);
    setSelectedFile(null);
    if (!studentId) {
      setSelectedStudent('');
    }
  }; const handleUploadDocument = async () => {
    if (!selectedFile || !newDocType ||
      !selectedTask ||
      !selectedSubtask ||
      !selectedStudent) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    try {
      setUploadLoading(true);

      // First upload the file
      const fileFormData = new FormData();
      fileFormData.append('file', selectedFile);
      fileFormData.append('category', 'documents');

      // Upload the file first to get the URL
      const uploadResponse = await uploadFile(fileFormData);

      if (!uploadResponse?.data?.url) {
        throw new Error('Failed to get uploaded file URL');
      }      // Then create the document with the file URL
      const documentFormData = new FormData();
      documentFormData.append('studentId', selectedStudent);
      documentFormData.append('taskId', selectedTask);
      documentFormData.append('subtaskId', selectedSubtask);
      documentFormData.append('fileName', selectedFile.name);
      documentFormData.append('fileSize', selectedFile.size.toString());
      // Get the actual file type from the file's MIME type
      const fileExtension = selectedFile.type === 'application/pdf' ? 'PDF' :
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? 'DOCX' :
          selectedFile.type === 'application/msword' ? 'DOC' :
            selectedFile.type === 'image/jpeg' ? 'JPG' :
              selectedFile.type === 'image/png' ? 'PNG' : '';
      documentFormData.append('fileType', fileExtension);
      documentFormData.append('documentCategory', newDocType); // Add document category separately
      documentFormData.append('fileUrl', uploadResponse.data.url);
      documentFormData.append('status', 'PENDING');

      await uploadDocument(documentFormData);
      await fetchDocuments();
      setIsUploadDialogOpen(false);
      toast.success('Document uploaded successfully');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Failed to upload document');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await deleteDocument(docId);
      await fetchDocuments();
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete document');
    }
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    setTemplates(updatedTemplates);
    toast.success('Template deleted successfully');
  };

  const handleAddTemplate = () => {
    if (!newDocName || !newDocType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    const newTemplate = {
      id: `template-${Math.floor(Math.random() * 1000)}`,
      name: newDocName,
      type: newDocType,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      lastUpdated: new Date(),
      required: isRequired
    };

    setTemplates([newTemplate, ...templates]);
    setIsTemplateDialogOpen(false);
    toast.success('Template added successfully');
    resetForm();
  };
  const fetchTasks = async () => {
    try {
      setTasksLoading(true);
      const response = await getTasks();

      const tasksData = Array.isArray(response.data) ? response.data :
        (response.data?.tasks || response.data?.data || []);
      setTasks(tasksData);

      if (!Array.isArray(tasksData)) {
        console.error('Unexpected tasks data format:', response.data);
        toast.error('Invalid tasks data format received');
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setTasksLoading(false);
    }
  };
  const fetchSubtasks = async (taskId) => {
    if (!taskId) {
      setSubtasks([]);
      return;
    }
    try {
      setSubtasksLoading(true);
      const response = await getSubtasks();
      // Access the subtasks array from the nested structure
      const subtasksData = response.data?.subtasks || [];

      // No need to filter by taskId as the API returns the correct subtasks
      setSubtasks(subtasksData);

      if (!Array.isArray(subtasksData)) {
        console.error('Unexpected subtasks data format:', response.data);
        toast.error('Invalid subtasks data format received');
      }
    } catch (error) {
      toast.error('Failed to fetch subtasks');
      console.error('Error fetching subtasks:', error);
    } finally {
      setSubtasksLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchSubtasks(selectedTask);
  }, [selectedTask]);

  const fetchStudentDetails = useCallback(async (id) => {
    if (!id) return;

    setStudentLoading(true);
    setStudentError(null);

    try {
      const data = await getStudentById(id);
      setStudentDetails(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch student details';
      setStudentError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setStudentLoading(false);
    }
  }, []);

  // Clear student details when closing document view
  const handleCloseDocumentView = useCallback(() => {
    setViewDocument(null);
    setStudentDetails(null);
    setStudentError(null);
  }, []);
  // Update document view handler to fetch student details
  const handleViewDocument = useCallback((doc) => {
    if (!doc) return;
    setViewDocument(doc);
    if (doc.studentId) {
      fetchStudentDetails(doc.studentId);
    }
  }, [fetchStudentDetails]);

  const fetchStudents = async () => {
    try {
      setStudentsLoading(true);
      const response = await getStudents();
      const studentsData = Array.isArray(response.data) ? response.data :
        (response.data?.students || response.data?.data || []);
      setStudents(studentsData);
    } catch (error) {
      toast.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setStudentsLoading(false);
    }
  };

  // Fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // If studentId prop changes, update selected student
  useEffect(() => {
    if (studentId) {
      setSelectedStudent(studentId);
    }
  }, [studentId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            {uploadLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setIsTemplateDialogOpen(true)}>
            <FilePlus className="mr-2 h-4 w-4" />
            Add Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <Select value={selectedType} onValueChange={handleTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {DOCUMENT_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No documents found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) :
                      filteredDocuments.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                              {doc.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{doc.size}</div>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>
                            <div>{doc.student}</div>
                            <div className="text-xs text-muted-foreground">{doc.studentId}</div>
                          </TableCell>
                          <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <MenuButton>
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </MenuButton>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end"><DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Change status to</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'approved')}>
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                  Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'pending')}>
                                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                  Pending Review
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'rejected')}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Rejected
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
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Documents that need your evaluation</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No pending documents found
                      </TableCell>
                    </TableRow>
                  ) :
                    filteredDocuments.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            {doc.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{doc.size}</div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <div>{doc.student}</div>
                          <div className="text-xs text-muted-foreground">{doc.studentId}</div>
                        </TableCell>
                        <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                              onClick={() => handleStatusChange(doc.id, 'approved')}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                              onClick={() => handleStatusChange(doc.id, 'rejected')}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              Reject
                            </Button>                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleViewDocument(doc)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No approved documents found
                  </TableCell>
                </TableRow>
              ) :
                filteredDocuments.map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileCheck className="mr-2 h-4 w-4 text-green-500" />
                        {doc.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{doc.size}</div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <div>{doc.student}</div>
                      <div className="text-xs text-muted-foreground">{doc.studentId}</div>
                    </TableCell>
                    <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setViewDocument(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableCell>Student</TableCell>
                <TableHead>Rejection Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No rejected documents found
                  </TableCell>
                </TableRow>
              ) :
                filteredDocuments.map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileX className="mr-2 h-4 w-4 text-red-500" />
                        {doc.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{doc.size}</div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <div>{doc.student}</div>
                      <div className="text-xs text-muted-foreground">{doc.studentId}</div>
                    </TableCell>
                    <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">                        <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'pending')}>
                            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                            Move to Pending
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
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Document Templates</CardTitle>
          <CardDescription>
            Standard forms and templates for students to use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Required</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-blue-500" />
                      {template.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{template.size}</div>
                  </TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{formatDate(template.lastUpdated)}</TableCell>
                  <TableCell>
                    {template.required ? (
                      <Badge>Required</Badge>
                    ) : (
                      <Badge variant="outline">Optional</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Upload className="mr-2 h-4 w-4" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <FileX className="mr-2 h-4 w-4" />
                          Delete
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

      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>
              Upload a document to the system. It will be marked as pending for review.
            </DialogDescription>
          </DialogHeader>            <div className="grid gap-4 py-4">
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
              <Label htmlFor="name">Document Name</Label>
              <Input
                id="name"
                placeholder="Enter document name"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Document Type</Label>
              <Select value={newDocType} onValueChange={setNewDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {/* Add Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Document Template</DialogTitle>
            <DialogDescription>
              Add a new template that students can download and fill out.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template-file">Template File</Label>
              <Input
                id="template-file"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="Enter template name"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template-type">Document Type</Label>
              <Select value={newDocType} onValueChange={setNewDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={isRequired}
                onCheckedChange={setIsRequired}
              />
              <label
                htmlFor="required"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as required document
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTemplate}>
              <FilePlus className="mr-2 h-4 w-4" />
              Add Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      {viewDocument && (
        <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getStatusIcon(viewDocument.status)}
                <span className="ml-2">{viewDocument.name}</span>
              </DialogTitle>
              <DialogDescription>
                Uploaded by {viewDocument.student} ({viewDocument.studentId}) on {formatDate(viewDocument.uploadDate)}
              </DialogDescription>
            </DialogHeader>

            <div className="border rounded-md p-6 flex items-center justify-center h-[400px]">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Document preview would appear here in a real application.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              {viewDocument.status !== 'approved' && (
                <Button onClick={() => {
                  handleStatusChange(viewDocument.id, 'approved');
                  setViewDocument(null);
                }}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve Document
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* View Document Details Dialog */}
      {viewDocument && (
        <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Document Details</DialogTitle>
              <DialogDescription>
                View document information and student details
              </DialogDescription>
            </DialogHeader>

            {/* Document Details */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Document Information</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Name:</span> {viewDocument?.name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {viewDocument?.type}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {viewDocument?.status}
                  </div>
                  <div>
                    <span className="font-medium">Uploaded:</span>{' '}
                    {viewDocument?.uploadDate
                      ? new Date(viewDocument.uploadDate).toLocaleDateString()
                      : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Student Details Section */}
              <div className="space-y-2">
                <h4 className="font-semibold">Student Information</h4>
                {studentLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : studentError ? (
                  <div className="text-red-500">
                    Failed to load student details: {studentError}
                  </div>
                ) : studentDetails ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Name:</span>{' '}
                      {`${studentDetails.firstName} ${studentDetails.lastName}`}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {studentDetails.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{' '}
                      {studentDetails.phone || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Program:</span>{' '}
                      {studentDetails.programType || 'N/A'}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No student information available</div>
                )}
              </div>

              {/* Document Preview or Download Button */}
              {viewDocument?.fileUrl && (
                <div className="flex justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => window.open(viewDocument.fileUrl, '_blank')}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Open Document
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDocumentView}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

Documents.propTypes = {
  studentId: PropTypes.string,
  taskId: PropTypes.string,
  subtaskId: PropTypes.string
};

Documents.defaultProps = {
  studentId: '',
  taskId: '',
  subtaskId: ''
};

export default Documents;