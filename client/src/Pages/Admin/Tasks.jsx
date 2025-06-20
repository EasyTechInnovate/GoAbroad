import { useState, useEffect } from 'react';
import { servicesAxiosInstance } from '@/services/config';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addStudentsToTask,
} from '@/services/taskService';
import { getSubtasks } from '@/services/subtaskService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
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
import { Plus, Loader2, X, Briefcase } from 'lucide-react';


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
    'Final submission'
  ],
  'Test Preparation': [
    'Mock test',
    'Review session',
    'Practice questions'
  ],
  'Financial Documentation': [
    'Bank statements',
    'Affidavit preparation',
    'Source of funds'
  ],
  'Visa Application': [
    'Form filling',
    'Document preparation',
    'Interview preparation'
  ],
  'University Selection': [
    'Research universities',
    'Shortlist options',
    'Compare programs'
  ]
};

const Tasks = () => {

  const [loading, setLoading] = useState({
    tasks: false,
    add: false,
    edit: false,
    delete: false,
    students: false,
    subtasks: false,
    members: false
  });


  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableSubtasks, setAvailableSubtasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedSubtasks, setSelectedSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [selectedMainTask, setSelectedMainTask] = useState('');
  const [newMainTask, setNewMainTask] = useState('');
  

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isAssignStudentOpen, setIsAssignStudentOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'HIGH',
    logo: '',
    status: 'pending',
    dueDate: '',
    assignee: ''
  });


  const validateTaskData = (data) => {
    if (!data.title?.trim()) {
      toast.error('Task title is required');
      return false;
    }
    if (selectedMainTask === 'create_new' && !newMainTask.trim()) {
      toast.error('Please enter a new task category name');
      return false;
    }
    return true;
  };


  const handleMainTaskChange = (value) => {
    setSelectedMainTask(value);
    if (value === 'create_new') {
      setNewMainTask('');
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(prev => ({ ...prev, tasks: true }));
      const response = await getTasks();
      const transformedTasks = response.data.tasks.map(task => ({
        ...task,
        status: task.subtasks.length > 0 ? 
          task.subtasks.every(st => st.status === 'COMPLETED') ? 'COMPLETED' :
          task.subtasks.some(st => st.status === 'IN_PROGRESS') ? 'IN_PROGRESS' : 'PENDING'
          : 'PENDING',
        studentNames: task.students?.map(s => s.name || s.email).join(', '),
        subtaskCount: task.subtasks?.length || 0
      }));
      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(prev => ({ ...prev, members: true }));
      const response = await servicesAxiosInstance.get('/admin/members');
      if (response.data.success) {
        setTeamMembers(response.data.data.members
          .filter(member => member.status === 'ACTIVE')
          .map(member => ({
            id: member._id,
            name: `${member.firstName} ${member.lastName}`,
            role: member.role,
            status: member.status
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch team members');
    } finally {
      setLoading(prev => ({ ...prev, members: false }));
    }
  };

  const fetchSubtasks = async () => {
    try {
      setLoading(prev => ({ ...prev, subtasks: true }));
      const response = await getSubtasks();
      if (response?.data?.subtasks) {
        setAvailableSubtasks(response.data.subtasks.map(subtask => ({
          id: subtask._id,
          title: subtask.title,
          description: subtask.description,
          priority: subtask.priority
        })));
      }
    } catch (error) {
      console.error('Error fetching subtasks:', error);
      toast.error('Failed to fetch subtasks');
    } finally {
      setLoading(prev => ({ ...prev, subtasks: false }));
    }
  };

  const fetchStudents = async (searchQuery = '') => {
    try {
      setLoading(prev => ({ ...prev, students: true }));
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await servicesAxiosInstance.get('/admin/students', { params });
      if (response.data.success) {
        setStudents(response.data.data.students.map(student => ({
          id: student._id,
          name: student.name || student.email,
          email: student.email
        })));
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(prev => ({ ...prev, students: false }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        if (!isMounted) return;
        await fetchTeamMembers();
        await fetchSubtasks();
        await fetchTasks();
        await fetchStudents('');
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);


  const handleDeleteTask = async (taskId) => {
    if (!taskId) return;

    try {
      setLoading(prev => ({ ...prev, delete: true }));
      await deleteTask(taskId);
      await fetchTasks();
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };


  

  const handleSubtaskSelection = (subtaskId) => {

    const subtask = availableSubtasks.find(s => s.id === subtaskId);

    if (subtask && !selectedSubtasks.includes(subtask.id)) {
      setSelectedSubtasks([...selectedSubtasks, subtask.id]);
    }
  };


  const handleRemoveSubtask = (subtaskId) => {

    setSelectedSubtasks(selectedSubtasks.filter(id => id !== subtaskId));
  };

  const resetTaskForm = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 'HIGH',
      logo: '',
      status: 'pending',
      dueDate: '',
      assignee: ''
    });
    setSelectedStudents([]);
    setSelectedSubtasks([]);
    setNewSubtask('');
    setSelectedMainTask('');
    setNewMainTask('');
  };
  const handleOpenEditTask = (task) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'HIGH',
      logo: task.logo || '',
      status: task.status || 'pending',
      dueDate: task.dueDate || '',
      assignee: task.assignee || ''
    });

    setSelectedStudents(task.students?.map(s => s._id) || []);
    setSelectedSubtasks(task.subtasks?.map(s => s.subtask._id) || []); // Keep track of subtask IDs
    setSelectedMainTask(task.mainTask);
    setIsEditTaskOpen(true);
  };


  const handleSaveStudentAssignment = async () => {
    if (!selectedTask || selectedStudents.length === 0) {
      toast.error('Please select students to assign');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, students: true }));
      await addStudentsToTask(selectedTask._id, {
        studentIds: selectedStudents
      });
      await fetchTasks();
      setIsAssignStudentOpen(false);
      toast.success('Students assigned successfully!');
    } catch (error) {
      console.error('Error assigning students:', error);
      toast.error(error?.response?.data?.message || 'Failed to assign students');
    } finally {
      setLoading(prev => ({ ...prev, students: false }));
    }
  };
  const handleAddTask = async () => {
    if (!validateTaskData(newTask)) {
      return;
    }

      try {
        setLoading(prev => ({ ...prev, add: true }));
        const taskData = {
          title: newTask.title.trim(),
          description: newTask.description?.trim() || '',
          priority: newTask.priority.toUpperCase(),
          logo: newTask.logo || '',
          studentIds: selectedStudents,
          subtaskIds: selectedSubtasks
        };

        await createTask(taskData);
        await fetchTasks();
        resetTaskForm();
        setIsAddTaskOpen(false);
        toast.success('Task created successfully!');
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error(error?.response?.data?.message || 'Failed to create task');
      } finally {
        setLoading(prev => ({ ...prev, add: false }));
      }
    };

  const handleEditTask = async () => {
    if (!selectedTask || !validateTaskData(newTask)) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, edit: true }));

      const taskData = {
        title: newTask.title.trim(),
        description: newTask.description?.trim() || '',
        priority: newTask.priority.toUpperCase(),
        logo: newTask.logo || '',
        status: newTask.status,
        dueDate: newTask.dueDate,
        assignee: newTask.assignee,
        mainTask: selectedMainTask === 'create_new' ? newMainTask : selectedMainTask
      };

      await updateTask(selectedTask._id, taskData);
      await fetchTasks();
      setIsEditTaskOpen(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error(error?.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(prev => ({ ...prev, edit: false }));
    }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
        <Button onClick={() => setIsAddTaskOpen(true)} disabled={loading.add}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        View and manage all tasks assigned to students
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Task</th>
              <th className="px-4 py-3 text-left font-medium">Main Task</th>  
              <th className="px-4 py-3 text-left font-medium">Student</th>
              <th className="px-4 py-3 text-left font-medium">Assignee</th>
              <th className="px-4 py-3 text-left font-medium">Priority</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading.tasks ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No tasks found. Start by adding a new task.
                </td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr key={task._id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {task.status === 'COMPLETED' ? (
                        <Badge variant="success">Completed</Badge>
                      ) : task.status === 'IN_PROGRESS' ? (
                        <Badge variant="warning">In Progress</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{task.title}</div>
                      {task.subtasks?.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {task.subtasks.length} subtasks
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{task.mainTask || '-'}</td>
                  <td className="px-4 py-3">
                    {task.students?.map(student => student.email).join(', ') || '-'}
                  </td>
                  <td className="px-4 py-3">
                    {task.assignee ? teamMembers.find(m => m.id === task.assignee)?.name : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant={task.priority === 'HIGH' ? 'destructive' : 
                              task.priority === 'MEDIUM' ? 'warning' : 'secondary'}
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTask(task);
                          setIsAssignStudentOpen(true);
                        }}
                      >
                        Assign
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEditTask(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTask(task._id)}
                        disabled={loading.delete}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">
                Assign to Students
              </label>
              <Select 
                value=""
                onValueChange={(val) => {
                  if (!selectedStudents.includes(val)) {
                    setSelectedStudents([...selectedStudents, val])
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      <div className="flex items-center">
                        <span>{student.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({student.email})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedStudents.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Students:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudents.map((studentId) => {
                      const student = students.find(s => s.id === studentId);
                      if (!student) return null;
                      return (
                        <Badge
                          key={student.id}
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center gap-1"
                        >
                          {student.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                            onClick={() => setSelectedStudents(selectedStudents.filter(id => id !== student.id))}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">Subtasks</label>
              <Select
                value={newSubtask}
                onValueChange={handleSubtaskSelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subtask" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubtasks.map(subtask => (
                    <SelectItem key={subtask.id} value={subtask.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span>{subtask.title}</span>
                          <span className="text-xs text-muted-foreground block">{subtask.description}</span>
                        </div>
                        <Badge variant={subtask.priority.toLowerCase()}>{subtask.priority}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSubtasks.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Subtasks:</p>
                  <ul className="space-y-1">
                    {selectedSubtasks.map((subtaskId) => {
                      const subtask = availableSubtasks.find(s => s.id === subtaskId);
                      if (!subtask) return null;
                      return (
                        <li key={subtask.id} className="flex items-center justify-between text-sm bg-muted/50 rounded-sm px-2 py-1">
                          <div>
                            <span>{subtask.title}</span>
                            <span className="text-xs text-muted-foreground block">{subtask.description}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={subtask.priority.toLowerCase()}>{subtask.priority}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSubtask(subtask.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </li>
                      );
                    })}
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
                          const matchedSubtask = availableSubtasks.find(s => s.title === template);
                          if (matchedSubtask && !selectedSubtasks.includes(matchedSubtask.id)) {
                            setSelectedSubtasks([...selectedSubtasks, matchedSubtask.id]);
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
                  onValueChange={(val) => setNewTask({ ...newTask, status: val })}
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
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
                  onValueChange={(val) => setNewTask({ ...newTask, priority: val })}
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
                <label htmlFor="assignee" className="text-sm font-medium">
                  Assignee
                </label>
                <Select
                  value={newTask.assignee}
                  onValueChange={(val) => setNewTask({ ...newTask, assignee: val })}
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

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask} disabled={loading.add}>
              {loading.add ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Task'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              {selectedTask?.title ? `Edit "${selectedTask.title}"` : 'Edit task'}
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
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">
                Assign to Students
              </label>
              <Select 
                value=""
                onValueChange={(val) => {
                  if (!selectedStudents.includes(val)) {
                    setSelectedStudents([...selectedStudents, val])
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      <div className="flex items-center">
                        <span>{student.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({student.email})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedStudents.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Students:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudents.map((studentId) => {
                      const student = students.find(s => s.id === studentId);
                      if (!student) return null;
                      return (
                        <Badge
                          key={student.id}
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center gap-1"
                        >
                          {student.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                            onClick={() => setSelectedStudents(selectedStudents.filter(id => id !== student.id))}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">Subtasks</label>
              <Select
                value={newSubtask}
                onValueChange={handleSubtaskSelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subtask" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubtasks.map(subtask => (
                    <SelectItem key={subtask.id} value={subtask.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span>{subtask.title}</span>
                          <span className="text-xs text-muted-foreground block">{subtask.description}</span>
                        </div>
                        <Badge variant={subtask.priority.toLowerCase()}>{subtask.priority}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSubtasks.length > 0 && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm font-medium mb-2">Selected Subtasks:</p>
                  <ul className="space-y-1">
                    {selectedSubtasks.map((subtaskId) => {
                      const subtask = availableSubtasks.find(s => s.id === subtaskId);
                      if (!subtask) return null;
                      return (
                        <li key={subtask.id} className="flex items-center justify-between text-sm bg-muted/50 rounded-sm px-2 py-1">
                          <div>
                            <span>{subtask.title}</span>
                            <span className="text-xs text-muted-foreground block">{subtask.description}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={subtask.priority.toLowerCase()}>{subtask.priority}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSubtask(subtask.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </li>
                      );
                    })}
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
                  onValueChange={(val) => setNewTask({ ...newTask, status: val })}
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
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
                  onValueChange={(val) => setNewTask({ ...newTask, priority: val })}
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
                <label htmlFor="assignee" className="text-sm font-medium">
                  Assignee
                </label>
                <Select
                  value={newTask.assignee}
                  onValueChange={(val) => setNewTask({ ...newTask, assignee: val })}
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

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask} disabled={loading.edit}>
              {loading.edit ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Students Dialog */}
      <Dialog open={isAssignStudentOpen} onOpenChange={setIsAssignStudentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Students to Task</DialogTitle>
            <DialogDescription>
              {selectedTask?.title ? `Select students to assign to "${selectedTask.title}"` : 'Select students to assign to this task'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Select
              value=""
              onValueChange={(val) => {
                if (!selectedStudents.includes(val)) {
                  setSelectedStudents([...selectedStudents, val])
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select students" />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    <div className="flex items-center">
                      <span>{student.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({student.email})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedStudents.length > 0 && (
              <div className="border rounded-md p-2">
                <p className="text-sm font-medium mb-2">Selected Students:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudents.map((studentId) => {
                    const student = students.find(s => s.id === studentId);
                    if (!student) return null;
                    return (
                      <Badge
                        key={student.id}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {student.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                          onClick={() => setSelectedStudents(selectedStudents.filter(id => id !== student.id))}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignStudentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStudentAssignment} disabled={loading.students}>
              {loading.students ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;