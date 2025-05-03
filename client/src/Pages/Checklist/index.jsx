import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import SidebarHeader from '../../components/SidebarHeader';
import { Check, LockKeyhole } from 'lucide-react';

const Checklist = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const checklistItems = [
    {
      id: 1,
      type: 'SOP - Variant',
      university: 'University of California - Los Angeles',
      program: 'Master of Science in Computer Science',
      status: 'completed',
      isHighlighted: true
    },
    {
      id: 2,
      type: 'SOP - Variant',
      university: 'University of California - Los Angeles',
      program: 'Master of Science in Computer Science',
      status: 'completed',
      isHighlighted: false
    },
    {
      id: 3,
      type: 'SOP - Variant',
      university: 'University of California - Los Angeles',
      program: 'Master of Science in Computer Science',
      status: 'completed',
      isHighlighted: false
    },
    {
      id: 4,
      type: 'SOP - Variant',
      university: 'University of California - Los Angeles',
      program: 'Master of Science in Computer Science',
      status: 'completed',
      isHighlighted: false
    },
    {
      id: 5,
      type: 'LOR-HOD',
      university: 'University of California - Los Angeles',
      program: 'Locked',
      status: 'locked',
      isHighlighted: false
    },
    {
      id: 6,
      type: 'LOR-HOD',
      university: 'University of California - Los Angeles',
      program: 'Locked',
      status: 'locked',
      isHighlighted: false
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Review SOP-Variant',
      assignedTo: 'Me',
      deadline: '22-07-2025',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Review SOP-Variant',
      assignedTo: 'Me',
      deadline: '22-07-2025',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Review SOP-Variant',
      assignedTo: 'Me',
      deadline: '22-07-2025',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Review SOP-Variant',
      assignedTo: 'Me',
      deadline: '22-07-2025',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Review SOP-Variant',
      assignedTo: 'None',
      deadline: 'Not set',
      status: 'locked'
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-50 p-4 pt-8 md:p-6 md:pt-10">
            <div className="flex flex-col lg:flex-row gap-6">

              <div className="w-full lg:w-1/3">
                <h2 className="text-xl font-semibold text-primary-1 mb-4">Checklist</h2>
              
                {checklistItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`mb-4 rounded-lg overflow-hidden cursor-pointer ${
                      item.isHighlighted ? 'bg-primary-1 text-white' : 'bg-white'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-grow">
                        <h3 className={`font-medium ${item.isHighlighted ? 'text-white' : 'text-primary-1'}`}>
                          {item.type}
                        </h3>
                        <p className={`text-sm mt-1 ${item.isHighlighted ? 'text-white' : 'text-gray-700'}`}>
                          {item.university}
                        </p>
                        <p className={`text-xs ${item.isHighlighted ? 'text-gray-200' : 'text-gray-500'}`}>
                          {item.program}
                        </p>
                      </div>
                      {item.status === 'completed' ? (
                        <div className={`rounded-full p-1 bg-primary ${item.isHighlighted ? 'bg-white' : 'bg-primary-1'}`}>
                        <Check className={`h-5 w-5 ${item.isHighlighted ? 'text-primary-1' : 'text-white'}`} />
                        </div>
                      ) : (
                        <LockKeyhole className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>


              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h2 className="text-xl font-semibold text-black mb-4">Tasks in SOP - Variant</h2>
                  
                  {tasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      className={`mb-4 p-4 rounded-lg ${
                        task.status === 'locked' 
                        ? 'bg-gray-100' 
                        : index % 2 === 0 ? 'bg-red-50' : 'bg-primary-1/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {task.status === 'locked' && <LockKeyhole className="h-5 w-5 text-gray-400 mr-2" />}
                          <h3 className="font-medium text-gray-800">
                            {task.title}
                          </h3>
                        </div>
                        {task.status !== 'locked' && (
                          <button className="bg-primary-1 cursor-pointer hover:bg-teal-800 text-white text-xs font-medium py-2 px-5 rounded">
                            Goto Questionnaire
                          </button>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <div>
                          <span className="text-gray-600">Assigned to: </span>
                          <span className="font-medium bg-white px-1 rounded-xs">{task.assignedTo}</span>
                          <span className="text-gray-400 mx-2">|</span>
                          <span className="text-gray-600">Deadline: </span>
                          <span className="font-medium bg-white px-1 rounded-xs">{task.deadline}</span>
                        </div>
                        
                        {task.status !== 'locked' && (
                          <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-xs font-medium py-2 px-3 rounded">
                            Send Message to AIFA
                          </button>
                        )}
                        
                        {task.status === 'locked' && (
                          <button className="bg-orange-300 text-white text-xs font-medium py-2 px-3 rounded cursor-not-allowed">
                            Send Message to AIFA
                            </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Checklist;