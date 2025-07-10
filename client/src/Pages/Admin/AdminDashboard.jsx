import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAdminStudentActivities, getAdminDashboardStats } from '@/services/adminActivityService';

function getInitials(name) {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[1][0];
}


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalActiveApplications: 0,
    totalPendingTasks: 0,
    totalCompletedTasks: 0,
    statsChange: {},
  });
  const [activities, setActivities] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError(null);
      try {
        // Fetch dashboard stats from the new endpoint
        const statsRes = await getAdminDashboardStats();
        // Fetch activities separately 
        const activitiesRes = await getAdminStudentActivities(1, 5);
        
        // Set stats from the new endpoint
        setStats({
          totalStudents: statsRes.data?.totalStudents || 0,
          totalActiveApplications: statsRes.data?.totalActiveApplications || 0,
          totalPendingTasks: statsRes.data?.totalPendingTasks || 0,
          totalCompletedTasks: statsRes.data?.totalCompletedTasks || 0,
          statsChange: {
            totalStudents: '+12%',
            totalActiveApplications: '+7%',
            totalPendingTasks: '-2%',
            totalCompletedTasks: '+22%'
          }
        });
        
        // Set activities from the activities endpoint
        setActivities(activitiesRes.data?.activities || []);
        
        // Set deadlines (this could come from another endpoint in the future)
        setDeadlines(activitiesRes.data?.deadlines || [
          // fallback mock
          {
            id: 1,
            university: 'UC Berkeley Application Due',
            student: 'Emma Johnson',
            date: 'Oct 15, 2023',
            task: '',
            status: 'pending',
          },
        ]);
      } catch (err) {
        setError(err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" /> {new Date().toLocaleDateString()}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : loading ? (
        <div className="text-center text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid gap-6">
          {/* Stats Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="text-xs text-muted-foreground font-medium">Total Students</div>
                <div className="text-3xl font-bold mt-1">{stats.totalStudents}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span className="text-green-600 font-semibold">{stats.statsChange.totalStudents || '+12%'}</span>
                  from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="text-xs text-muted-foreground font-medium">Active Applications</div>
                <div className="text-3xl font-bold mt-1">{stats.totalActiveApplications}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span className="text-green-600 font-semibold">{stats.statsChange.totalActiveApplications || '+7%'}</span>
                  from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="text-xs text-muted-foreground font-medium">Pending Tasks</div>
                <div className="text-3xl font-bold mt-1">{stats.totalPendingTasks}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span className="text-red-600 font-semibold">{stats.statsChange.totalPendingTasks || '-2%'}</span>
                  from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="text-xs text-muted-foreground font-medium">Completed Tasks</div>
                <div className="text-3xl font-bold mt-1">{stats.totalCompletedTasks}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span className="text-green-600 font-semibold">{stats.statsChange.totalCompletedTasks || '+22%'}</span>
                  from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Row */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Recent Activity */}
            <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="font-semibold text-lg mb-4">Recent Activity</div>
              <div className="divide-y">
                {activities.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No recent activity found.</div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity._id} className="flex items-center py-4 gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base font-bold text-gray-600">
                        {getInitials(activity.student?.name || activity.student?.email || 'U')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{activity.student?.name || activity.student?.email || 'Unknown Student'}</div>
                        <div className="text-sm text-muted-foreground">{activity.message}</div>
                      </div>
                      <div className="flex flex-col items-end min-w-[100px]">
                        <span className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className={`mt-1 text-xs px-2 py-0.5 rounded-full font-semibold ${activity.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : activity.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{activity.status?.toLowerCase()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="ghost"
                  className="text-primary-600"
                  onClick={() => {
                    // Navigate to All Activities page
                    if (typeof window !== 'undefined') {
                      window.location.href = '/admin/all-activities';
                    }
                  }}
                >
                  View All
                </Button>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="font-semibold text-lg mb-4">Upcoming Deadlines</div>
              <div className="space-y-4">
                {deadlines.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No upcoming deadlines.</div>
                ) : (
                  deadlines.map((deadline, i) => (
                    <div key={deadline.id || i} className="flex items-center gap-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${deadline.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : deadline.status === 'active' ? 'bg-blue-100 text-blue-700' : deadline.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {deadline.university?.[0] || 'U'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{deadline.university}</div>
                        <div className="text-xs text-muted-foreground">{deadline.student}</div>
                      </div>
                      <div className="flex flex-col items-end min-w-[90px]">
                        <span className="text-xs text-gray-500">{deadline.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;