<<<<<<< HEAD
=======
import { DashboardLayout } from './components/layout/DashboardLayout';
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  DollarSign,
  Users,
  Calendar,
  Clock,
  User,
  FileText,
  Building2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

<<<<<<< HEAD

=======
// Mock data for charts
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
const applicationStats = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 27 },
  { name: 'May', count: 21 },
  { name: 'Jun', count: 16 },
  { name: 'Jul', count: 29 },
  { name: 'Aug', count: 35 },
];

const universityData = [
  { name: 'USA', value: 35 },
  { name: 'UK', value: 25 },
  { name: 'Canada', value: 20 },
  { name: 'Australia', value: 15 },
  { name: 'Other', value: 5 },
];

const progressData = [
  { name: 'Week 1', completed: 40, total: 100 },
  { name: 'Week 2', completed: 60, total: 100 },
  { name: 'Week 3', completed: 75, total: 100 },
  { name: 'Week 4', completed: 90, total: 100 },
  { name: 'Week 5', completed: 85, total: 100 },
  { name: 'Week 6', completed: 95, total: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const recentStudents = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    targetUniversity: 'Harvard University',
    program: 'MBA',
    status: 'active',
  },
  {
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    targetUniversity: 'Stanford University',
    program: 'Computer Science',
    status: 'active',
  },
  {
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    targetUniversity: 'MIT',
    program: 'Electrical Engineering',
    status: 'inactive',
  },
];

const upcomingDeadlines = [
  {
    student: 'John Doe',
    university: 'Harvard University',
    deadline: 'Oct 30, 2023',
    task: 'Submit SOP',
    daysLeft: 5,
  },
  {
    student: 'Emma Wilson',
    university: 'Stanford University',
    deadline: 'Nov 5, 2023',
    task: 'Application Fee Payment',
    daysLeft: 11,
  },
  {
    student: 'Michael Brown',
    university: 'MIT',
    deadline: 'Nov 12, 2023',
    task: 'Recommendation Letters',
    daysLeft: 18,
  },
];

const AdminDashboard = () => {
  return (
<<<<<<< HEAD
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" /> {new Date().toLocaleDateString()}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
=======
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" /> Oct 25, 2023
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">
                    +6 this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Applications
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">
                    +12 this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Universities
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35</div>
                  <p className="text-xs text-muted-foreground">
                    +3 this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Deadlines
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Within next 7 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Application Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={applicationStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Applications by Country</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={universityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {universityData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Deadlines */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>
                    Newly added students and their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStudents.map((student, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">
                            {student.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {student.program} • {student.targetUniversity}
                        </div>
                        <div className="ml-2">
                          <Badge
                            variant={student.status === 'active' ? 'default' : 'outline'}
                          >
                            {student.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>
                    Tasks and application deadlines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="font-medium">{deadline.task}</span>
                            <span className="text-sm text-muted-foreground">
                              {' '}
                              • {deadline.student}
                            </span>
                          </div>
                          <Badge variant={deadline.daysLeft <= 7 ? 'destructive' : 'outline'}>
                            {deadline.daysLeft} days
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex justify-between">
                          <span>{deadline.university}</span>
                          <span>{deadline.deadline}</span>
                        </div>
                        <Progress
                          value={100 - (deadline.daysLeft / 20) * 100}
                          className="h-1 mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Completion Progress</CardTitle>
                  <CardDescription>
                    Weekly student task completion rate
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        Documents Uploaded
                      </span>
                      <span className="text-sm">254</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        Questionnaires Completed
                      </span>
                      <span className="text-sm">89/120</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        Applications Submitted
                      </span>
                      <span className="text-sm">62/95</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        Visa Applications
                      </span>
                      <span className="text-sm">32/85</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Activity from students and counselors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary-foreground p-2">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe submitted Harvard SOP</p>
                    <p className="text-sm text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary-foreground p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Emma Wilson uploaded transcript documents</p>
                    <p className="text-sm text-muted-foreground">42 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary-foreground p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Michael Brown completed initial assessment</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary-foreground p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Stanford application for Emma Wilson submitted</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 11:42 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary-foreground p-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Application fee payment processed for MIT application</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 3:15 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-6">
                  <Button variant="outline">View All Activity</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
<<<<<<< HEAD
=======
    </DashboardLayout>
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
  );
};

export default AdminDashboard;