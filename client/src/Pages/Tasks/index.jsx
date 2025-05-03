import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import SidebarHeader from '../../components/SidebarHeader';
import { ChevronDown, ChevronUp, AlignJustify } from 'lucide-react';

const Tasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'Orientation': false,
    'University Selection - PRE GRE': true,
    'SOP Master': false,
    'LOR Internship Manager': false,
    'LOR Prof Guide': false,
    'Resume Master': false,
    'SOP Variant UCLA': false,
    'Essay UCLA': false,
    'SOP Variant Stanford': false,
    'Essay Stanford': false,
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const checklistSections = [
    {
      id: 'Orientation',
      title: 'Orientation',
      tasks: []
    },
    {
      id: 'University Selection - PRE GRE',
      title: 'University Selection - PRE GRE',
      tasks: [
        {
          id: 'university-list-questionnaire',
          title: 'University List Questionnaire',
          completed: true
        },
        {
          id: 'draft-list-of-universities',
          title: 'Draft List of Universities',
          completed: true
        },
        {
          id: 'review-list-of-universities',
          title: 'Review the List of Universities',
          completed: true
        },
        {
          id: 'rework-list-1',
          title: 'Rework - List of Universities',
          completed: true
        },
        {
          id: 'rework-list-2',
          title: 'Rework - List of Universities',
          completed: true
        },
        {
          id: 'rework-list-3',
          title: 'Rework - List of Universities',
          completed: false,
          locked: true
        },
        {
          id: 'rework-list-4',
          title: 'Rework - List of Universities',
          completed: false,
          locked: true
        }
      ]
    },
    {
      id: 'SOP Master',
      title: 'SOP Master',
      tasks: []
    },
    {
      id: 'LOR Internship Manager',
      title: 'LOR Internship Manager - Prof. Mr. Dhaval Patel',
      tasks: []
    },
    {
      id: 'LOR Prof Guide',
      title: 'LOR Prof Guide - Prof. Mr. Dhaval Patel',
      tasks: []
    },
    {
      id: 'Resume Master',
      title: 'Resume Master',
      tasks: [],
      showLogoAfter: true
    },
    {
      id: 'SOP Variant UCLA',
      title: 'SOP Variant - University of California - Los Angeles',
      tasks: [],
      university: 'UCLA'
    },
    {
      id: 'Essay UCLA',
      title: 'Essay - University of California - Los Angeles',
      tasks: []
    },
    {
      id: 'SOP Variant Stanford',
      title: 'SOP Variant - Stanford University',
      tasks: [],
      showLogoAfter: true
    },
    {
      id: 'Essay Stanford',
      title: 'Essay - Stanford University',
      tasks: [],
      university: 'Stanford'
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto p-4 pt-8 md:p-6 md:pt-10">
            <div className="max-w-5xl mx-auto">
                
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Checklist & Tasks</h2>
              
              <div className="rounded-md space-y-4 p-4">

                {checklistSections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-md ">
                    <div 
                      className="flex items-center py-3 px-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSection(section.id)}
                    >
                      <AlignJustify className="h-4 w-4 text-green-800 mr-2" />
                      <span className="font-medium text-gray-800">{section.title}</span>
                      <div className="ml-auto">
                        {expandedSections[section.id] ? 
                          <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                          <ChevronDown className="h-5 w-5 text-gray-400" />}
                      </div>
                    </div>

                    {expandedSections[section.id] && (
                      <>
                        {section.university === 'UCLA' && (
                          <div className="px-12 py-2 border-t border-gray-200">
                            <div className="bg-blue-800 inline-block px-4 py-2 text-white font-semibold">
                              UCLA
                            </div>
                          </div>
                        )}
                        
                        {section.university === 'Stanford' && (
                          <div className="px-12 py-2 border-t border-gray-200">
                            <div className="bg-red-600 inline-block p-1.5">
                              <span className="text-white font-bold">S</span>
                            </div>
                          </div>
                        )}
                        
                        {section.tasks.length > 0 && (
                          <div className="border-t border-gray-100">
                            {section.tasks.map((task) => (
                              <div key={task.id} className="flex items-center py-2 px-10">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                                  task.locked 
                                    ? 'bg-white text-gray-400 border border-gray-200' 
                                    : task.completed 
                                      ? 'bg-green-800 text-white border-0' 
                                      : 'border border-gray-400'
                                }`}>
                                  {task.locked 
                                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                      </svg> 
                                    : task.completed && 
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>}
                                </div>
                                <span className={`${task.locked ? 'text-gray-400' : 'text-gray-800'} text-sm`}>
                                  {task.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.showLogoAfter && section.id === 'Resume Master' && (
                          <div className="px-12 py-2 border-t border-gray-200">
                            <div className="bg-blue-800 inline-block px-4 py-2 text-white font-semibold">
                              UCLA
                            </div>
                          </div>
                        )}
                        
                        {section.showLogoAfter && section.id === 'SOP Variant Stanford' && (
                          <div className="px-12 py-2 border-t border-gray-200">
                            <div className="bg-red-600 inline-block p-1.5">
                              <span className="text-white font-bold">S</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Tasks;