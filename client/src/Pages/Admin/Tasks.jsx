import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CheckCircle, Circle, Clock, Filter, Plus, Search, Users, 
  FileQuestion, Edit, X, Briefcase
} from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from '@/components/ui/sonner';
import { MultipleStudentSelect } from './components/tasks/MultipleStudentSelect';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Submit SOP for Review',
      assignee: 'John Doe',
      students: ['Emma Wilson', 'William Chen'],
      dueDate: '2023-10-25',
      status: 'completed',
      priority: 'high',
      questionnaire: 'Initial Student Assessment',
      subtasks: ['Draft SOP', 'Review with counselor', 'Final submission'],
      mainTask: 'Application Documents'
    },
    {
      id: 2,
      title: 'Complete University Application Form',
      assignee: 'Emma Wilson',
      students: ['Emma Wilson'],
      dueDate: '2023-10-30',
      status: 'in-progress',
      priority: 'medium',
      questionnaire: 'University Preference Form',
      subtasks: ['Fill personal details', 'Academic information', 'Upload documents'],
      mainTask: 'Application Documents'
    },
    {
      id: 3,
      title: 'Prepare for IELTS Test',
      assignee: 'Michael Brown',
      students: ['Michael Brown', 'Sophia Garcia'],
      dueDate: '2023-11-15',
      status: 'pending',
      priority: 'high',
      questionnaire: null,
      subtasks: ['Speaking practice', 'Writing exercise', 'Mock test'],
      mainTask: 'Test Preparation'
    },
    {
      id: 4,
      title: 'Obtain Academic Transcripts',
      assignee: 'Sophia Garcia',
      students: ['Sophia Garcia'],
      dueDate: '2023-11-05',
      status: 'in-progress',
      priority: 'low',
      questionnaire: null,
      subtasks: ['Contact university', 'Pay fees', 'Verify documents'],
      mainTask: 'Application Documents'
    },
    {
      id: 5,
      title: 'Submit Financial Documents',
      assignee: 'William Chen',
      students: ['William Chen', 'John Doe'],
      dueDate: '2023-11-10',
      status: 'pending',
      priority: 'medium',
      questionnaire: 'Financial Aid Application',
      subtasks: ['Bank statements', 'Income proof', 'Affidavit'],
      mainTask: 'Financial Documentation'
    }
  ]);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [studentFilter, setStudentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAssignStudentOpen, setIsAssignStudentOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isCreateQuestionnaireOpen, setIsCreateQuestionnaireOpen] = useState(false);

  const [currentUser, _setCurrentUser] = useState({
    id: 1,
    name: 'John Doe',
    role: 'admin'
  });

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
      'Upload documents',
      'Contact university', 
      'Pay fees', 
      'Verify documents'
    ],
    'Test Preparation': [
      'Speaking practice', 
      'Writing exercise', 
      'Mock test',
      'Vocabulary building',
      'Grammar review'
    ],
    'Financial Documentation': [
      'Bank statements', 
      'Income proof', 
      'Affidavit',
      'Financial guarantee letter',
      'Scholarship application'
    ],
    'Visa Application': [
      'Fill visa form',
      'Book appointment',
      'Prepare for interview',
      'Submit biometrics'
    ],
    'University Selection': [
      'Research universities',
      'Compare programs',
      'Check requirements',
      'Shortlist options'
    ]
  };

  const questionnaires = [
    { id: 1, title: 'Initial Student Assessment' },
    { id: 2, title: 'University Preference Form' },
    { id: 3, title: 'Financial Aid Application' },
    { id: 4, title: 'Visa Documentation Checklist' },
    { id: 5, title: 'Post-Admission Survey' }
  ];

  const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Emma Wilson' },
    { id: 3, name: 'Michael Brown' },
    { id: 4, name: 'Sophia Garcia' },
    { id: 5, name: 'William Chen' }
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Smith', role: 'counselor' },
    { id: 3, name: 'Robert Johnson', role: 'advisor' },
    { id: 4, name: 'Alice Williams', role: 'counselor' },
    { id: 5, name: 'Michael Brown', role: 'admin' }
  ];

  const statusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <Circle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge>Low</Badge>;
      default:
        return null;
    }
  };
  
  const [newTask, setNewTask] = useState({
    title: '',
    mainTask: 'Application Documents',
    subtasks: [],
    assignee: currentUser.name,
    students: [],
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    questionnaire: null
  });

  const [selectedMainTask, setSelectedMainTask] = useState('Application Documents');
  const [newMainTask, setNewMainTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [selectedSubtasks, setSelectedSubtasks] = useState([]);
  const [newQuestionnaire, setNewQuestionnaire] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    setNewTask(prev => ({
      ...prev,
      assignee: currentUser.name
    }));
  }, [currentUser]);

  const handleAddTask = () => {
    const taskToAdd = {
      ...newTask,
      id: tasks.length + 1,
      subtasks: selectedSubtasks,
      students: selectedStudents
    };
    
    setTasks([...tasks, taskToAdd]);
    setIsAddTaskOpen(false);
    resetTaskForm();
    toast.success('Task added successfully!');
  };
  
  const handleEditTask = () => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? {
        ...task,
        title: newTask.title || task.title,
        mainTask: newTask.mainTask || task.mainTask,
        subtasks: selectedSubtasks.length ? selectedSubtasks : task.subtasks,
        status: newTask.status || task.status,
        priority: newTask.priority || task.priority,
        dueDate: newTask.dueDate || task.dueDate,
        questionnaire: newTask.questionnaire || task.questionnaire,
        students: selectedStudents.length ? selectedStudents : task.students
      } : task
    );
    
    setTasks(updatedTasks);
    setIsEditTaskOpen(false);
    resetTaskForm();
    toast.success('Task updated successfully!');
  };
  
  const resetTaskForm = () => {
    setNewTask({
      title: '',
      mainTask: 'Application Documents',
      subtasks: [],
      assignee: currentUser.name,
      students: [],
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      questionnaire: null
    });
    setSelectedMainTask('Application Documents');
    setNewMainTask('');
    setNewSubtask('');
    setSelectedSubtasks([]);
    setNewQuestionnaire('');
    setSelectedStudents([]);
  };

  const handleOpenEditTask = (task) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      mainTask: task.mainTask,
      subtasks: task.subtasks,
      assignee: task.assignee,
      students: task.students,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      questionnaire: task.questionnaire
    });
    setSelectedMainTask(task.mainTask);
    setSelectedSubtasks(task.subtasks);
    setSelectedStudents(task.students || []);
    setIsEditTaskOpen(true);
  };

  const handleAssignStudent = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
    setSelectedStudents(task.students || []);
    setIsAssignStudentOpen(true);
  };

  const handleAddQuestionnaire = (taskId) => {
    setSelectedTask(tasks.find(task => task.id === taskId));
    setIsQuestionnaireOpen(true);
  };

  const handleSaveStudentAssignment = () => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? {
        ...task,
        students: selectedStudents
      } : task
    );
    
    setTasks(updatedTasks);
    setIsAssignStudentOpen(false);
    toast.success('Student assigned successfully!');
  };

  const handleSaveQuestionnaire = () => {
    setIsQuestionnaireOpen(false);
    toast.success('Questionnaire linked successfully!');
  };
  
  const handleCreateQuestionnaire = () => {
    if (newQuestionnaire.trim()) {
      questionnaires.push({ id: questionnaires.length + 1, title: newQuestionnaire });
      setNewQuestionnaire('');
      setIsCreateQuestionnaireOpen(false);
      toast.success('New questionnaire created!');
    }
  };

  const handleMainTaskChange = (value) => {
    if (value === 'create_new') {
    } else {
      setSelectedMainTask(value);
      setNewTask(prev => ({
        ...prev,
        mainTask: value
      }));
    }
  };
  
  const handleAddSubtask = () => {
    if (newSubtask.trim() && !selectedSubtasks.includes(newSubtask)) {
      setSelectedSubtasks([...selectedSubtasks, newSubtask]);
      setNewSubtask('');
    }
  };
  
  const handleRemoveSubtask = (subtask) => {
    setSelectedSubtasks(selectedSubtasks.filter(item => item !== subtask));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.mainTask.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStudent = 
      studentFilter === 'all' || 
      (task.students && task.students.some(student => 
        student.toLowerCase().includes(studentFilter.toLowerCase())
      ));
    
    return matchesSearch && matchesStudent;
  });
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={studentFilter} onValueChange={setStudentFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Filter by student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              {students.map(student => (
                <SelectItem key={student.id} value={student.name}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>
                  View and manage all tasks assigned to students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Status</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Questionnaire</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{statusIcon(task.status)}</TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium block">{task.mainTask}</span>
                            <span className="text-sm">{task.title}</span>
                            {task.subtasks && task.subtasks.length > 0 && (
                              <div className="mt-1 text-sm text-muted-foreground">
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value={`subtasks-${task.id}`} className="border-0">
                                    <AccordionTrigger className="py-0 hover:no-underline">
                                      <span className="text-xs text-muted-foreground">
                                        {task.subtasks.length} subtasks
                                      </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <ul className="list-disc pl-5 space-y-1 text-xs">
                                        {task.subtasks.map((subtask, idx) => (
                                          <li key={idx}>{subtask}</li>
                                        ))}
                                      </ul>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {task.students && task.students.length > 0 ? (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{task.students.join(', ')}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No students assigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>{priorityBadge(task.priority)}</TableCell>
                        <TableCell>
                          {task.questionnaire ? (
                            <span className="text-sm">{task.questionnaire}</span>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAddQuestionnaire(task.id)}
                            >
                              <FileQuestion className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAssignStudent(task.id)}
                            >
                              Assign
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenEditTask(task)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTasks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No tasks found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>
                  View and manage all pending tasks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  {/* Similar structure to "all" tab but filtered for pending tasks */}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="in-progress">
            <Card>
              <CardHeader>
                <CardTitle>In Progress Tasks</CardTitle>
                <CardDescription>
                  View and manage all tasks currently in progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  {/* Similar structure to "all" tab but filtered for in-progress tasks */}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>
                  View all completed tasks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  {/* Similar structure to "all" tab but filtered for completed tasks */}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task and assign it to students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="mainTask" className="text-sm font-medium">
                Main Task Category
              </label>
              <Select value={selectedMainTask} onValueChange={handleMainTaskChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main task category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create_new">+ Create New Category</SelectItem>
                  {mainTaskCategories.map((category, idx) => (
                    <SelectItem key={idx} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedMainTask === 'create_new' && (
                <div className="mt-2">
                  <Input 
                    placeholder="Enter new main task category" 
                    value={newMainTask} 
                    onChange={(e) => setNewMainTask(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="taskTitle" className="text-sm font-medium">
                Task Title
              </label>
              <Input 
                id="taskTitle" 
                placeholder="Enter task title" 
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">
                Assign to Students
              </label>
              <MultipleStudentSelect 
                students={students}
                selectedStudents={selectedStudents}
                onChange={setSelectedStudents}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">Subtasks</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add subtask" 
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                />
                <Button type="button" onClick={handleAddSubtask} className="shrink-0">
                  Add
                </Button>
              </div>
              
              {selectedSubtasks.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Subtasks:</p>
                  <ul className="space-y-1">
                    {selectedSubtasks.map((subtask, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm bg-muted/50 rounded-sm px-2 py-1">
                        <span>{subtask}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveSubtask(subtask)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedMainTask !== 'create_new' && subtaskTemplates[selectedMainTask]?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">Suggested subtasks:</p>
                  <div className="flex flex-wrap gap-1">
                    {subtaskTemplates[selectedMainTask].map((template, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          if (!selectedSubtasks.includes(template)) {
                            setSelectedSubtasks([...selectedSubtasks, template]);
                          }
                        }}
                      >
                        {template}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select 
                  value={newTask.status} 
                  onValueChange={(val) => setNewTask({...newTask, status: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <Input 
                  type="date" 
                  id="dueDate" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select 
                  value={newTask.priority}
                  onValueChange={(val) => setNewTask({...newTask, priority: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="questionnaire" className="text-sm font-medium">
                  Questionnaire (Optional)
                </label>
                <Select 
                  value={newTask.questionnaire || 'none'}
                  onValueChange={(val) => {
                    if (val === 'create_new') {
                      setIsCreateQuestionnaireOpen(true);
                    } else if (val === 'none') {
                      setNewTask({...newTask, questionnaire: null});
                    } else {
                      setNewTask({...newTask, questionnaire: val});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select questionnaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="create_new">+ Create New</SelectItem>
                    {questionnaires.map(q => (
                      <SelectItem key={q.id} value={q.title}>
                        {q.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="assignee" className="text-sm font-medium">
                Assignee
              </label>
              <Select 
                value={newTask.assignee}
                onValueChange={(val) => setNewTask({...newTask, assignee: val})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{member.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({member.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="mainTask" className="text-sm font-medium">
                Main Task Category
              </label>
              <Select value={selectedMainTask} onValueChange={handleMainTaskChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main task category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create_new">+ Create New Category</SelectItem>
                  {mainTaskCategories.map((category, idx) => (
                    <SelectItem key={idx} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="taskTitle" className="text-sm font-medium">
                Task Title
              </label>
              <Input 
                id="taskTitle" 
                placeholder="Enter task title" 
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">
                Assign to Students
              </label>
              <MultipleStudentSelect 
                students={students}
                selectedStudents={selectedStudents}
                onChange={setSelectedStudents}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">Subtasks</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add subtask" 
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                />
                <Button type="button" onClick={handleAddSubtask} className="shrink-0">
                  Add
                </Button>
              </div>
              
              {selectedSubtasks.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Subtasks:</p>
                  <ul className="space-y-1">
                    {selectedSubtasks.map((subtask, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm bg-muted/50 rounded-sm px-2 py-1">
                        <span>{subtask}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveSubtask(subtask)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select 
                  value={newTask.status} 
                  onValueChange={(val) => setNewTask({...newTask, status: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <Input 
                  type="date" 
                  id="dueDate" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select 
                  value={newTask.priority}
                  onValueChange={(val) => setNewTask({...newTask, priority: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="questionnaire" className="text-sm font-medium">
                  Questionnaire (Optional)
                </label>
                <Select 
                  value={newTask.questionnaire || 'none'}
                  onValueChange={(val) => {
                    if (val === 'create_new') {
                      setIsCreateQuestionnaireOpen(true);
                    } else if (val === 'none') {
                      setNewTask({...newTask, questionnaire: null});
                    } else {
                      setNewTask({...newTask, questionnaire: val});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select questionnaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="create_new">+ Create New</SelectItem>
                    {questionnaires.map(q => (
                      <SelectItem key={q.id} value={q.title}>
                        {q.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="assignee" className="text-sm font-medium">
                Assignee
              </label>
              <Select 
                value={newTask.assignee}
                onValueChange={(val) => setNewTask({...newTask, assignee: val})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{member.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({member.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAssignStudentOpen} onOpenChange={setIsAssignStudentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Students to Task</DialogTitle>
            <DialogDescription>
              {selectedTask?.title ? `Select students to assign to "${selectedTask.title}"` : 'Select students to assign to this task'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <MultipleStudentSelect 
              students={students}
              selectedStudents={selectedStudents}
              onChange={setSelectedStudents}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignStudentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStudentAssignment}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Link Questionnaire</DialogTitle>
            <DialogDescription>
              Select an existing questionnaire or create a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Questionnaire</label>
              <Select 
                onValueChange={(val) => {
                  if (val === 'create_new') {
                    setIsQuestionnaireOpen(false);
                    setIsCreateQuestionnaireOpen(true);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select questionnaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create_new">+ Create New</SelectItem>
                  {questionnaires.map(q => (
                    <SelectItem key={q.id} value={q.title}>
                      {q.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuestionnaireOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveQuestionnaire}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isCreateQuestionnaireOpen} onOpenChange={setIsCreateQuestionnaireOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Questionnaire</DialogTitle>
            <DialogDescription>
              Create a new questionnaire for student tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Questionnaire Title</label>
              <Input 
                placeholder="Enter questionnaire title" 
                value={newQuestionnaire}
                onChange={(e) => setNewQuestionnaire(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              After creation, you'll be redirected to set up questions for this questionnaire.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateQuestionnaireOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQuestionnaire}>Create & Configure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Tasks;