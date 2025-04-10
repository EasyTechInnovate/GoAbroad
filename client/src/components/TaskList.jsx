import { AlignLeft } from 'lucide-react';


const TasksList = () => {
  const tasks = [
    { id: 1, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 2, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 3, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 4, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 5, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
    { id: 6, name: 'Review the List of Universities', category: 'University Selection - Post GRE', deadline: '19-11-2024' },
  ];

  return (
    <div className="rounded-md bg-white p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Tasks</h3>
      <div className="bg-whiteoverflow-hidden rounded-none">
        <table className="min-w-full">
          <thead className="border-y border-primary-1">
            <tr className="text-left text-black">
              <th className="px-6 py-3 text-sm">Task</th>
              <th className="px-6 py-3 text-sm">Category</th>
              <th className="px-6 py-3 text-sm text-right">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
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
    </div>
  );
};

export default TasksList;
