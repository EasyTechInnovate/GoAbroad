import { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Plus, Eye, Edit, Trash2, Copy, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Forms = () => {
  const questionnaires = [
    {
      id: 1,
      title: 'Initial Student Assessment',
      description: 'Basic information and academic background',
      questions: 15,
      responses: 48,
      status: 'active',
      created: '2023-08-15'
    },
    {
      id: 2,
      title: 'University Preference Form',
      description: 'Student university and program preferences',
      questions: 10,
      responses: 42,
      status: 'active',
      created: '2023-09-05'
    },
    {
      id: 3,
      title: 'Visa Documentation Checklist',
      description: 'Required documents for visa application',
      questions: 20,
      responses: 36,
      status: 'active',
      created: '2023-09-12'
    },
    {
      id: 4,
      title: 'Financial Aid Application',
      description: 'Information for scholarship and financial support',
      questions: 25,
      responses: 31,
      status: 'draft',
      created: '2023-10-01'
    },
    {
      id: 5,
      title: 'Post-Admission Survey',
      description: 'Feedback after university admission',
      questions: 12,
      responses: 15,
      status: 'archived',
      created: '2023-07-20'
    }
  ];

  const eduLoanForms = [
    {
      id: 1,
      title: 'Education Loan Application',
      bank: 'Bank of America',
      applicants: 18,
      status: 'active',
      created: '2023-09-01'
    },
    {
      id: 2,
      title: 'Loan Cosigner Form',
      bank: 'Chase Bank',
      applicants: 15,
      status: 'active',
      created: '2023-09-10'
    },
    {
      id: 3,
      title: 'Financial Statement Verification',
      bank: 'CitiBank',
      applicants: 12,
      status: 'active',
      created: '2023-09-15'
    },
    {
      id: 4,
      title: 'Income Proof Documentation',
      bank: 'Wells Fargo',
      applicants: 10,
      status: 'draft',
      created: '2023-09-22'
    }
  ];

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, text: '', type: 'text', required: true, options: [] }
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [optionText, setOptionText] = useState('');
  const [selectedMainTask, setSelectedMainTask] = useState('');
  const [selectedSubtask, setSelectedSubtask] = useState('');
  const [currentEditingQuestion, setCurrentEditingQuestion] = useState(null);

  const mainTaskCategories = [
    'Application Documents',
    'Test Preparation',
    'Financial Documentation',
    'Visa Application',
    'University Selection'
  ];

  const subtaskTemplates = {
    'Application Documents': [
      'Draft SOP',
      'Review with counselor', 
      'Final submission',
      'Fill personal details', 
      'Academic information', 
      'Upload documents'
    ],
    'Test Preparation': [
      'Speaking practice', 
      'Writing exercise', 
      'Mock test',
      'Vocabulary building'
    ],
    'Financial Documentation': [
      'Bank statements', 
      'Income proof', 
      'Affidavit',
      'Financial guarantee letter'
    ],
    'Visa Application': [
      'Fill visa form',
      'Book appointment',
      'Prepare for interview'
    ],
    'University Selection': [
      'Research universities',
      'Compare programs',
      'Check requirements'
    ]
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return null;
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const newQuestionObj = {
        id: questions.length + 1,
        text: newQuestion,
        type: questionType,
        required: true,
        options: questionType === 'multiple_choice' || questionType === 'checkbox' ? [] : undefined
      };
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion('');
      setQuestionType('text');
      setCurrentEditingQuestion(newQuestionObj);
    }
  };

  const handleAddOption = (questionId) => {
    if (optionText.trim()) {
      const updatedQuestions = questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...(q.options || []), optionText]
          };
        }
        return q;
      });
      setQuestions(updatedQuestions);
      setOptionText('');
    }
  };

  const handleRemoveOption = (questionId, optionIndex) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...(q.options || [])];
        newOptions.splice(optionIndex, 1);
        return { ...q, options: newOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (question) => {
    setCurrentEditingQuestion(question);
    setNewQuestion(question.text);
    setQuestionType(question.type);
  };

  const handleUpdateQuestion = () => {
    if (currentEditingQuestion && newQuestion.trim()) {
      const updatedQuestions = questions.map(q => {
        if (q.id === currentEditingQuestion.id) {
          return {
            ...q,
            text: newQuestion,
            type: questionType
          };
        }
        return q;
      });
      setQuestions(updatedQuestions);
      setNewQuestion('');
      setQuestionType('text');
      setCurrentEditingQuestion(null);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    if (currentEditingQuestion?.id === questionId) {
      setCurrentEditingQuestion(null);
      setNewQuestion('');
      setQuestionType('text');
    }
  };

  const handleSaveForm = () => {
    if (formTitle.trim() === '') {
      toast.error('Please enter a form title');
      return;
    }
    
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    
    const newForm = {
      id: questionnaires.length + 1,
      title: formTitle,
      description: formDescription,
      questions: questions.length,
      responses: 0,
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };
    
    questionnaires.push(newForm);
    setIsCreateFormOpen(false);
    resetForm();
    toast.success('Form created successfully!');
  };
  
  const handleSaveAndAssign = () => {
    if (formTitle.trim() === '' || !selectedMainTask || !selectedSubtask) {
      toast.error('Please fill all required fields');
      return;
    }
    
    handleSaveForm();
    toast.success(`Form assigned to ${selectedMainTask} > ${selectedSubtask}`);
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setQuestions([{ id: 1, text: '', type: 'text', required: true, options: [] }]);
    setNewQuestion('');
    setCurrentStep(1);
    setSelectedMainTask('');
    setSelectedSubtask('');
    setCurrentEditingQuestion(null);
  };

  const nextStep = () => {
    if (currentStep === 1 && formTitle.trim() === '') {
      toast.error('Please enter a form title');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Questionnaires & Forms</h1>
          <Button onClick={() => setIsCreateFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Form
          </Button>
        </div>

        <Tabs defaultValue="questionnaires">
          <TabsList>
            <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
            <TabsTrigger value="eduloans">Education Loan Forms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questionnaires" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search questionnaires..."
                  className="pl-8 w-full"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Questionnaires</CardTitle>
                <CardDescription>
                  Manage student questionnaires and view responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questionnaires.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">{form.title}</TableCell>
                        <TableCell>{form.description}</TableCell>
                        <TableCell>{form.questions}</TableCell>
                        <TableCell>{form.responses}</TableCell>
                        <TableCell>{statusBadge(form.status)}</TableCell>
                        <TableCell>{form.created}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
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
          
          <TabsContent value="eduloans" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search loan forms..."
                  className="pl-8 w-full"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Education Loan Forms</CardTitle>
                <CardDescription>
                  Manage education loan applications and forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form Title</TableHead>
                      <TableHead>Bank/Institution</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eduLoanForms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">{form.title}</TableCell>
                        <TableCell>{form.bank}</TableCell>
                        <TableCell>{form.applicants}</TableCell>
                        <TableCell>{statusBadge(form.status)}</TableCell>
                        <TableCell>{form.created}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
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
        </Tabs>
      </div>

      <Dialog open={isCreateFormOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsCreateFormOpen(open);
      }}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              {currentStep === 1 && 'Set up basic form information'}
              {currentStep === 2 && 'Add questions to your form'}
              {currentStep === 3 && 'Assign form to a task (optional)'}
            </DialogDescription>
          </DialogHeader>
          
          {currentStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="formTitle">Form Title *</Label>
                <Input 
                  id="formTitle" 
                  placeholder="Enter form title" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="formDescription">Description</Label>
                <Textarea 
                  id="formDescription" 
                  placeholder="Enter a description for this form" 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Form Questions</h3>
                
                <div className="space-y-4 mb-4">
                  {questions.map((q, index) => (
                    <div key={q.id} className="border rounded-md p-3 bg-muted/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{index + 1}. {q.text || '[Empty Question]'}</p>
                          <p className="text-xs text-muted-foreground mt-1">Type: {q.type}</p>
                          
                          {(q.type === 'multiple_choice' || q.type === 'checkbox') && q.options && (
                            <div className="mt-2">
                              <p className="text-xs font-medium">Options:</p>
                              <ul className="text-xs ml-4 list-disc">
                                {q.options.map((option, i) => (
                                  <li key={i} className="mt-1 flex items-center gap-1">
                                    {option}
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-4 w-4 text-destructive" 
                                      onClick={() => handleRemoveOption(q.id, i)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditQuestion(q)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleRemoveQuestion(q.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {currentEditingQuestion?.id === q.id && (
                        <div className="mt-3 border-t pt-3">
                          <div className="grid gap-2 mb-2">
                            <Input 
                              placeholder="Edit question text" 
                              value={newQuestion}
                              onChange={(e) => setNewQuestion(e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <Select value={questionType} onValueChange={setQuestionType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Question type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="textarea">Paragraph</SelectItem>
                                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="file">File Upload</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button onClick={handleUpdateQuestion}>Update Question</Button>
                          </div>
                          
                          {(questionType === 'multiple_choice' || questionType === 'checkbox') && (
                            <div className="flex gap-2 mt-2">
                              <Input 
                                placeholder="Add option" 
                                value={optionText}
                                onChange={(e) => setOptionText(e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                variant="outline" 
                                onClick={() => handleAddOption(q.id)}
                              >
                                Add Option
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Add New Question</h4>
                  <div className="grid gap-2 mb-2">
                    <Input 
                      placeholder="Enter question text" 
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={questionType} onValueChange={setQuestionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="textarea">Paragraph</SelectItem>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="file">File Upload</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Assign to Task (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  You can assign this form to a specific task or save it for later assignment.
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <Label htmlFor="mainTask" className="text-xs mb-1 block">Main Task</Label>
                    <Select value={selectedMainTask} onValueChange={setSelectedMainTask}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select main task" />
                      </SelectTrigger>
                      <SelectContent>
                        {mainTaskCategories.map((task) => (
                          <SelectItem key={task} value={task}>
                            {task}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="subtask" className="text-xs mb-1 block">Subtask</Label>
                    <Select 
                      value={selectedSubtask} 
                      onValueChange={setSelectedSubtask}
                      disabled={!selectedMainTask}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subtask" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMainTask && subtaskTemplates[selectedMainTask]?.map((subtask) => (
                          <SelectItem key={subtask} value={subtask}>
                            {subtask}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsCreateFormOpen(false)}>
                  Cancel
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button variant="default" onClick={handleSaveForm}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Form
                    </Button>
                    {selectedMainTask && selectedSubtask && (
                      <Button onClick={handleSaveAndAssign}>
                        Save & Assign
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Forms;