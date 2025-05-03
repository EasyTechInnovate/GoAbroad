import { useState } from 'react';
import { ChevronDown, FilterIcon, FlashlightIcon } from 'lucide-react';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import SidebarHeader from '../../components/SidebarHeader';

const UniversityManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const universityData = {
    id: 1,
    name: 'New York University',
    location: 'New York',
    program: 'Master\'s in Computer Science',
    description: 'New York University is one among the largest private universities.\n\nThe university has departments of sciences and MBA as part of its main streams, while the IT engineering school is a separate school (different IDs). Moreover, the university has a separate engineering school which is the NYU polytechnic School of Engineering.\n\nThe university\'s student-faculty ratio is 10:1. The New York Public Library has the largest collection of any public library system in the United States (second largest in the world). The library collection amounts to 55 million items.\nThe university maintains its selection standards with an acceptance rate of 32.4%.',
    address: {
      university: '70 Washington Square South, New York, NY 10012'
    },
    type: 'Private',
    rank: {
      international: 38,
      national: 8
    },
    graduateAdmission: {
      address: '383 Lafayette Street, New York, NY 10003',
      email: 'engineering.gradinfo@nyu.edu',
      phone: '+1-212-998-0440',
      fax: '212-995-4723',
      officeHours: 'Monday - Friday (9:00 am to 5 pm EST)'
    },
    livingCost: '$1878',
    links: [
      'http://www.nyu.edu/admissions/undergraduate-admissions/apply/freshmen-applicants/application-review.html',
      'Department - Department of Electrical and Computer Engineering',
      'Course Details - Master\'s in Computer Engineering',
      'Common Tools: Admissions API',
      'Messages'
    ],
    status: 'Got admit'
  };

  const universities = [
    {
      id: 1,
      name: 'New York University',
      location: 'New York',
      program: 'Masters in Computer Science',
      status: 'Got Admit',
      tag: 'Shortlisted After GRE'
    },
    {
      id: 2,
      name: 'New York University',
      location: 'New York',
      program: 'Masters in Computer Science',
      status: 'Safe',
      tag: 'Shortlisted After GRE'
    },
    {
      id: 3,
      name: 'New York University',
      location: 'New York',
      program: 'Masters in Computer Science',
      status: 'Got Admit',
      tag: 'Shortlisted After GRE'
    },
    {
      id: 4,
      name: 'New York University',
      location: 'New York',
      program: 'Masters in Computer Science',
      status: 'Safe',
      tag: 'Shortlisted After GRE'
    }
  ];
  
  const handleStatusChange = (universityId, newStatus) => {
    console.log(`Changed university ${universityId} status to ${newStatus}`);
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-50 p-4 pt-8 md:p-6 md:pt-10">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3">
                <div className="mb-6 bg-white rounded-md">
                  <div className="relative flex items-center px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-primary-1">
                        <FilterIcon fill='#145044'/>
                      <span className="font-medium">Got Admit</span>
                    </div>
                    <div className="ml-auto">
                      <ChevronDown className="h-5 w-5 text-black" />
                    </div>
                  </div>
                    <hr className='border-1 border-primary-1' />
                </div>

                {universities.map((university, index) => (
                  <div 
                    key={university.id} 
                    className={`mb-4 rounded-md overflow-hidden ${index === 0 ? 'bg-primary-1 text-white' : 'bg-white'}`}
                  >
                    <div className="p-4">
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                          <h3 className={`font-semibold text-base ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                            {university.name}
                          </h3>
                          <div className={`text-sm ${index === 0 ? 'text-gray-100' : 'text-gray-500'} mb-1`}>
                            {university.location}
                          </div>
                          <div className={`text-sm ${index === 0 ? 'text-gray-100' : 'text-gray-600'}`}>
                            {university.program}
                          </div>
                          
                          <div className="mt-3">
                            <span className={`text-xs px-2 py-1 rounded-sm ${index === 0 ? 'bg-white text-primary-1' : 'bg-primary-1 text-white'}`}>
                              {university.tag}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 justify-center">
                          <div className="relative">
                            <select 
                              className={`appearance-none w-full rounded-md text-xs border ${
                                index === 0 || university.status === 'Got Admit'
                                ? 'bg-white text-gray-900 border-gray-300' 
                                : 'bg-white text-gray-900 border-gray-300'
                              } px-3 mr-3 py-1.5`}
                              value="Got Admit"
                              onChange={(e) => handleStatusChange(university.id, e.target.value)}
                            >
                              <option value="Got Admit">Got Admit</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <select 
                              className={`appearance-none w-full rounded-md text-xs border ${
                                university.status === 'Safe'
                                ? 'bg-yellow-50 border-yellow-300 text-gray-900'
                                : 'bg-white text-gray-900 border-gray-300'
                              } px-3  mr-3 py-1.5`}
                              value="Safe"
                              onChange={(e) => handleStatusChange(university.id, e.target.value)}
                            >
                              <option value="Safe">Safe</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-lg shadow-sm">
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{universityData.name}</h2>
                  <div className="w-10 h-10 bg-purple-700 flex items-center justify-center rounded text-white text-xl font-bold">
                  <FlashlightIcon/>
                  </div>
                </div>

                <div className="w-full h-64 relative overflow-hidden">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/11/14/05/15/academic-1822682_960_720.jpg"
                    alt={universityData.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">Description</h3>
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {universityData.description}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">University Address</h3>
                    <p className="text-sm text-gray-600">{universityData.address.university}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">University Type</h3>
                    <p className="text-sm text-gray-600">{universityData.type}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">Rank</h3>
                    <div className="flex">
                      <div className="w-1/2 bg-teal-800 text-white p-3 flex flex-col items-center">
                        <span className="text-2xl font-bold">{universityData.rank.international}</span>
                        <span className="text-xs">International Rank</span>
                      </div>
                      <div className="w-1/2 bg-yellow-500 text-white p-3 flex flex-col items-center">
                        <span className="text-2xl font-bold">{universityData.rank.national}</span>
                        <span className="text-xs">National Rank</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">International Graduate Admission Address and Contact Details</h3>
                    <div className="text-sm text-gray-600">
                      <p>{universityData.graduateAdmission.address}</p>
                      <p className="mt-2">
                        <span className="font-medium">E-mail:</span> {universityData.graduateAdmission.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {universityData.graduateAdmission.phone}
                      </p>
                      <p>
                        <span className="font-medium">Fax:</span> {universityData.graduateAdmission.fax}
                      </p>
                      <p>
                        <span className="font-medium">Office Hours:</span> {universityData.graduateAdmission.officeHours}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">Living cost per year</h3>
                    <p className="text-sm text-gray-600">{universityData.livingCost}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">Useful Links</h3>
                    <ul className="text-sm text-blue-500 list-disc pl-4 space-y-1">
                      {universityData.links.map((link, index) => (
                        <li key={index}>
                          <a href="#" className="hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UniversityManagement;