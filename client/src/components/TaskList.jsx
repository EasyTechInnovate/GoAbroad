import { AlignLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getStudentUpcomingTasks } from '@/services/dashboardService';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getStudentUpcomingTasks({
          page: pagination.page,
          limit: pagination.limit
        });
        
        if (response.success) {
          // Transform the API data to match the expected format
          const formattedTasks = response.data.upcomingTasks.map(task => ({
            id: task._id,
            name: task.title,
            category: task.priority || 'NORMAL',
            deadline: task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'No deadline'
          }));
          
          setTasks(formattedTasks);
          setPagination({
            page: response.data.currentPage || 1,
            limit: response.data.limit || 10,
            total: response.data.total || 0,
            totalPages: response.data.pages || 1
          });
        }
      } catch (error) {
        console.error('Error fetching upcoming tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingTasks();
  }, [pagination.page, pagination.limit]);

  // Use default mock data if there are no tasks from the API
  const defaultTasks = [
    { id: 1, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 2, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 3, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 4, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 5, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 6, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
  ];

  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;

  return (
    <div className="rounded-md bg-white p-4 md:p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Upcoming Tasks
        {isLoading && <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-primary-1 animate-spin"></span>}
      </h3>
      
      {/* Desktop view - Traditional table */}
      <div className="hidden md:block bg-white overflow-hidden rounded-none">
        <table className="min-w-full">
          <thead className="border-y border-primary-1">
            <tr className="text-left text-black">
              <th className="px-6 py-3 text-sm">Task</th>
              <th className="px-6 py-3 text-sm">Priority</th>
              <th className="px-6 py-3 text-sm text-right">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-gray-800 font-medium">{task.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-semibold">
                    <AlignLeft  className="h-4 w-4 text-primary-1 mr-2 font-bold" />
                    <span className="text-primary-1">{task.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex px-3 py-1 text-sm font-medium text-white bg-primary-1 rounded-md">
                    {task.deadline}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view - Card layout */}
      <div className="md:hidden space-y-4">
        {displayTasks.map((task) => (
          <div key={task.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="mb-3">
              <span className="text-gray-800 font-medium">{task.name}</span>
            </div>
            <div className="flex items-center font-semibold mb-3">
              <AlignLeft className="h-4 w-4 text-primary-1 mr-2 font-bold" />
              <span className="text-primary-1 text-sm">{task.category}</span>
            </div>
            <div className="flex justify-end">
              <span className="inline-flex px-3 py-1 text-sm font-medium text-white bg-primary-1 rounded-md">
                {task.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
