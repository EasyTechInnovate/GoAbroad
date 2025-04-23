import { useState } from 'react';
import { ChevronDown, ChevronUp, User, Download } from 'lucide-react';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import SidebarHeader from '../../components/SidebarHeader';

const DocManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({
    'category1': true, 
  });

  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const documentCategories = [
    {
      id: 'category1',
      title: 'Common Checklist / LOR Internship Manager',
      manager: 'LOR Internship Manager',
      assignedTo: 'Mr. Dhiraj Prajapat',
      documents: [
        {
          id: 'doc1',
          task: 'Rework LOR-Master',
          uploadedDate: '19-11-2024 05:28:17 PM',
        },
        {
          id: 'doc2',
          task: 'Rework LOR-Master',
          uploadedDate: '19-11-2024 05:28:17 PM',
        },
        {
          id: 'doc3',
          task: 'Rework LOR-Master',
          uploadedDate: '19-11-2024 05:28:17 PM',
        },
        {
          id: 'doc4',
          task: 'Draft LOR',
          uploadedDate: '18-11-2024 05:28:17 PM',
        },
      ]
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-50 p-4 pt-8 md:p-6 md:pt-10">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-primary-1 mb-6">Document Manager</h1>
              
              <div className="space-y-4">
                {documentCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-md shadow-sm overflow-hidden">

                    <div 
                      className="bg-white border-b p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-1 text-white rounded-sm flex items-center justify-center mr-3 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        </div>
                        <h2 className="text-black font-medium">{category.title}</h2>
                      </div>
                      <div>
                        {openCategories[category.id] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                    

                    {openCategories[category.id] && (
                      <div className="p-4">

                        <div className="mb-4">
                          <h3 className="text-black font-medium">{category.manager}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>{category.assignedTo}</span>
                          </div>
                        </div>
                        

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Task</th>
                                <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Uploaded Date</th>
                                <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">Download</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.documents.map((doc) => (
                                <tr key={doc.id} className="border-b">
                                  <td className="py-2 px-4 text-sm text-gray-800">{doc.task}</td>
                                  <td className="py-2 px-4 text-sm text-gray-800">{doc.uploadedDate}</td>
                                  <td className="py-2 px-4 text-right cursor-pointer">
                                    <button className="text-primary-1 hover:text-primary-1">
                                      <Download className="h-5 w-5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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

export default DocManager;