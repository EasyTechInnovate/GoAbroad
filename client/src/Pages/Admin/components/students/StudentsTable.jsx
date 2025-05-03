import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  MoreHorizontal, 
  ChevronDown, 
  Search,
  Filter,
  Eye,
  Trash2,
  UserPlus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AddStudentForm } from './AddStudentForm';

const mockStudents = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    university: 'Stanford University',
    status: 'active',
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Daniel Lee',
    email: 'daniel.l@example.com',
    university: 'MIT',
    status: 'active',
    lastUpdated: '1 day ago',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    email: 'sophia.c@example.com',
    university: 'UC Berkeley',
    status: 'pending',
    lastUpdated: '3 days ago',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@example.com',
    university: 'Harvard University',
    status: 'complete',
    lastUpdated: '1 week ago',
  },
  {
    id: '5',
    name: 'Olivia Garcia',
    email: 'olivia.g@example.com',
    university: 'UCLA',
    status: 'rejected',
    lastUpdated: '2 weeks ago',
  },
];

const statusClasses = {
  pending: 'status-pending',
  active: 'status-active',
  complete: 'status-complete',
  rejected: 'status-rejected',
};

const statusLabels = {
  pending: 'Pending',
  active: 'Active',
  complete: 'Complete',
  rejected: 'Rejected',
};

export function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.university.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = (values) => {
    console.log('New student data:', values);
    setIsAddStudentOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 w-full"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Filter</span>
                <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Status</p>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}>
                Reset filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => setIsAddStudentOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student&apos;s information to create a new student profile.
            </DialogDescription>
          </DialogHeader>
          <AddStudentForm 
            onSubmit={handleAddStudent}
            onCancel={() => setIsAddStudentOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Link to={`/students/${student.id}`} className="font-medium hover:underline">
                    {student.name}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                <TableCell>
                  <Badge className={cn('status-pill', statusClasses[student.status])}>
                    {statusLabels[student.status]}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {student.lastUpdated}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/students/${student.id}`} className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          View Student
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}