import { useState } from 'react';
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
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Custom date formatter function instead of using date-fns
const formatDate = (date) => {
  if (!date) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

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

const DOCUMENT_DATA = [
  {
    id: 'doc-001',
    name: 'Wang_Li_Passport.pdf',
    type: 'Passport Scan',
    size: '1.2 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'approved',
    student: 'Wang Li',
    studentId: 'ST20455'
  },
  {
    id: 'doc-002',
    name: 'Garcia_Maria_UniversityApplication.pdf',
    type: 'University Application',
    size: '3.4 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'pending',
    student: 'Maria Garcia',
    studentId: 'ST20231'
  },
  {
    id: 'doc-003',
    name: 'Smith_John_AcademicTranscript.pdf',
    type: 'Academic Transcript',
    size: '0.8 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'approved',
    student: 'John Smith',
    studentId: 'ST19876'
  },
  {
    id: 'doc-004',
    name: 'Kumar_Ananya_SOP.docx',
    type: 'Statement of Purpose',
    size: '0.4 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'rejected',
    student: 'Ananya Kumar',
    studentId: 'ST21334'
  },
  {
    id: 'doc-005',
    name: 'Schneider_Eva_FinancialStatement.pdf',
    type: 'Financial Statement',
    size: '2.1 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'approved',
    student: 'Eva Schneider',
    studentId: 'ST20887'
  },
  {
    id: 'doc-006',
    name: 'Tanaka_Hiro_IELTS_Certificate.pdf',
    type: 'Language Proficiency',
    size: '1.5 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'pending',
    student: 'Hiro Tanaka',
    studentId: 'ST21009'
  },
  {
    id: 'doc-007',
    name: 'Nkosi_Thabo_RecommendationLetter.pdf',
    type: 'Recommendation Letter',
    size: '0.7 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'approved',
    student: 'Thabo Nkosi',
    studentId: 'ST20765'
  },
  {
    id: 'doc-008',
    name: 'Oliveira_Sofia_Resume.pdf',
    type: 'Resume/CV',
    size: '0.9 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'pending',
    student: 'Sofia Oliveira',
    studentId: 'ST21442'
  },
  {
    id: 'doc-009',
    name: 'Davis_Emma_VisaApplication.pdf',
    type: 'Visa Application',
    size: '2.7 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'rejected',
    student: 'Emma Davis',
    studentId: 'ST20123'
  },
  {
    id: 'doc-010',
    name: 'Kovalev_Alexei_HealthInsurance.pdf',
    type: 'Health Insurance',
    size: '1.1 MB',
    uploadDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    status: 'approved',
    student: 'Alexei Kovalev',
    studentId: 'ST21567'
  }
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

const Documents = () => {
  const [documents, setDocuments] = useState(DOCUMENT_DATA);
  const [templates, setTemplates] = useState(TEMPLATE_DOCUMENTS);
  const [filteredDocuments, setFilteredDocuments] = useState(DOCUMENT_DATA);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [viewDocument, setViewDocument] = useState(null);
  
  // New document/template form state
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterDocuments(query, selectedType, activeTab);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    filterDocuments(searchQuery, type, activeTab);
  };

  const filterDocuments = (query, type, status) => {
    let filtered = documents;
    
    if (status === 'approved') {
      filtered = filtered.filter(doc => doc.status === 'approved');
    } else if (status === 'pending') {
      filtered = filtered.filter(doc => doc.status === 'pending');
    } else if (status === 'rejected') {
      filtered = filtered.filter(doc => doc.status === 'rejected');
    }
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(lowercaseQuery) || 
        doc.student.toLowerCase().includes(lowercaseQuery) ||
        doc.studentId.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (type) {
      filtered = filtered.filter(doc => doc.type === type);
    }
    
    setFilteredDocuments(filtered);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    filterDocuments(searchQuery, selectedType, value);
  };

  const handleStatusChange = (docId, newStatus) => {
    const updatedDocs = documents.map(doc => {
      if (doc.id === docId) {
        return { ...doc, status: newStatus };
      }
      return doc;
    });
    setDocuments(updatedDocs);
    filterDocuments(searchQuery, selectedType, activeTab);
    
    const statusMessages = {
      approved: 'Document approved successfully',
      rejected: 'Document rejected',
      pending: 'Document marked as pending review'
    };
    
    toast.success(statusMessages[newStatus] || 'Document status updated');
  };

  const handleDeleteDocument = (docId) => {
    const updatedDocs = documents.filter(doc => doc.id !== docId);
    setDocuments(updatedDocs);
    filterDocuments(searchQuery, selectedType, activeTab);
    toast.success('Document deleted successfully');
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    setTemplates(updatedTemplates);
    toast.success('Template deleted successfully');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setNewDocName(e.target.files[0].name);
    }
  };

  const handleUploadDocument = () => {
    if (!newDocName || !newDocType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    const newDoc = {
      id: `doc-${Math.floor(Math.random() * 1000)}`,
      name: newDocName,
      type: newDocType,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date(),
      status: 'pending',
      student: 'Admin Upload', // This would typically come from a form
      studentId: 'ADMIN'
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadDialogOpen(false);
    toast.success('Document uploaded successfully');
    resetForm();
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

  const resetForm = () => {
    setNewDocName('');
    setNewDocType('');
    setIsRequired(false);
    setSelectedFile(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          <Button variant="outline" onClick={() => setIsTemplateDialogOpen(true)}>
            <FilePlus className="mr-2 h-4 w-4" /> Add Template
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
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
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
                  {filteredDocuments.map((doc) => (
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewDocument(doc)}>
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
                  {filteredDocuments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No documents found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
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
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setViewDocument(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDocuments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No pending documents found
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
                <TableHead className="w-[30%]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
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
              {filteredDocuments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No approved documents found
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
                <TableHead className="w-[30%]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Rejection Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewDocument(doc)}>
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
              {filteredDocuments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No rejected documents found
                  </TableCell>
                </TableRow>
              )}
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
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Document File</Label>
              <Input
                id="file"
                type="file"
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadDocument}>
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
    </div>
  );
};

export default Documents;