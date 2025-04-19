import { CalendarIcon, LocateFixedIcon, CalendarRangeIcon, FileIcon, BuildingIcon, GraduationCapIcon, UniversityIcon, WorkflowIcon, BaggageClaimIcon, MailIcon, PhoneIcon, ClockIcon, BriefcaseBusiness } from 'lucide-react';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { useState } from 'react';
import ProfileDetailsCard, { DataField } from '@/components/ProfileDetailsCard';
import { ListBulletIcon } from '@radix-ui/react-icons';
import SidebarHeader from '@/components/SidebarHeader';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isSidebarOpen={isOpen} />
        <SidebarInset>
          <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />

          <div className="grid grid-cols-1 gap-3 p-2 sm:p-3 md:p-4 lg:p-5 bg-gray-50 overflow-x-hidden">

            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 h-full">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="bg-white rounded-lg overflow-hidden h-[180px] sm:h-[220px] md:h-[250px] lg:h-[300px] mx-auto max-w-[180px] sm:max-w-[220px] md:max-w-full">
                        <img
                          src="/profile-full.svg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="mb-4 sm:mb-5">
                        <h2 className="text-lg font-semibold mb-3">Program Details</h2>
                        <div className="space-y-3 sm:space-y-4">
                          <DataField
                            icon={<BriefcaseBusiness className="w-5 h-5" fill='#145044' />}
                            label="Program"
                            value="Dream Universities"
                          />
                          <DataField
                            icon={<ClockIcon className="w-5 h-5" />}
                            label="Validity"
                            value="22-07-2025"
                          />
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold mb-3">Contact Details</h2>
                        <div className="space-y-3 sm:space-y-4">
                          <DataField
                            icon={<PhoneIcon className="w-5 h-5" />}
                            label="Phone"
                            value="7016149548"
                          />
                          <DataField
                            icon={<MailIcon className="w-5 h-5" />}
                            label="E-mail"
                            value={<span className="break-all">shreyrock420@gmail.com</span>}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <ProfileDetailsCard title="Personal Details">
                <div className="space-y-3 sm:space-y-4">
                  <DataField
                    icon={<CalendarIcon className="w-5 h-5" />}
                    label="Date of Birth"
                    value="09/07/2001"
                  />
                  <DataField
                    icon={<BaggageClaimIcon className="w-5 h-5" />}
                    label="Gender"
                    value="Male"
                  />
                  <DataField
                    icon={<LocateFixedIcon className="w-5 h-5" />}
                    label="Address"
                    value={
                      <div className="text-sm sm:text-base">
                        <div>11, Shrimali Society, Opps. Jain Temple</div>
                        <div>Ahmedabad</div>
                        <div>Gujarat</div>
                        <div>India</div>
                        <div>380009</div>
                      </div>
                    }
                  />
                  <DataField
                    icon={<WorkflowIcon className="w-5 h-5" />}
                    label="Profession"
                    value="Student"
                  />
                </div>
              </ProfileDetailsCard>
            </div>

            <div className="col-span-1">
              <ProfileDetailsCard title="College Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 space-y-3 sm:space-y-4">
                    <DataField
                      icon={<GraduationCapIcon className="w-5 h-5" />}
                      label="Branch"
                      value="B.E in Electronics & Communication"
                    />
                    <DataField
                      icon={<UniversityIcon className="w-5 h-5" />}
                      label="University"
                      value="Gujarat Technological University"
                    />
                    <DataField
                      icon={<ListBulletIcon className="w-5 h-5" />}
                      label="GPA"
                      value="8.74"
                    />
                    <DataField
                      icon={<ListBulletIcon className="w-5 h-5" />}
                      label="Toppers GPA"
                      value="9.37"
                    />
                    <DataField
                      icon={<ListBulletIcon className="w-5 h-5" />}
                      label="No of backlogs"
                      value="0"
                    />
                  </div>
                  <div className="col-span-1 space-y-3 sm:space-y-4">
                    <DataField
                      icon={<GraduationCapIcon className="w-5 h-5" />}
                      label="Highest Degree"
                      value="B.E in Electronics & Communication Engg."
                    />
                    <DataField
                      icon={<BuildingIcon className="w-5 h-5" />}
                      label="College"
                      value="Lalbhai Dalpatbhai College of Engineering, Ahmedabad"
                    />
                    <DataField
                      icon={<CalendarRangeIcon className="w-5 h-5" />}
                      label="Admission Term"
                      value="Fall 2023"
                    />
                    <DataField
                      icon={<FileIcon className="w-5 h-5" />}
                      label="Courses applying"
                      value="Masters in Computer Science"
                    />
                  </div>
                </div>
              </ProfileDetailsCard>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 h-full">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">GRE</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>GRE Plan</div>
                      <div className="text-sm text-gray-500 truncate">15/08/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>GRE Date</div>
                      <div className="text-sm text-gray-500 truncate">15/08/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>GRE Score</div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
                        <div>
                          <div className="text-gray-500">Verbal</div>
                          <div>153</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Quant</div>
                          <div>161</div>
                        </div>
                        <div>
                          <div className="text-gray-500">AWA</div>
                          <div>4</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <FileIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>GRE Scorecard</div>
                      <div className="text-sm text-gray-500 truncate">Yes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarRangeIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Retaking GRE</div>
                      <div className="text-sm text-gray-500 truncate">Yet to decide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 h-full">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">IELTS</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>IELTS Plan</div>
                      <div className="text-sm text-gray-500 truncate">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>IELTS Date</div>
                      <div className="text-sm text-gray-500 truncate">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>IELTS Score</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Reading</div>
                          <div className="text-gray-500">26</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Writing</div>
                          <div className="text-gray-500">29</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Speaking</div>
                          <div className="text-gray-500">29</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-gray-500 text-sm">Listening</div>
                        <div className="text-gray-500 text-sm">29</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarRangeIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Retaking IELTS</div>
                      <div className="text-sm text-gray-500 truncate">Not set</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-[#f0f7f5] rounded-lg shadow-sm p-3 sm:p-4 md:p-5 border border-primary/60">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">VISA</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <LocateFixedIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Countries planning to apply</div>
                      <div className="mt-1">
                        <span className="bg-[#e9eeee] text-gray-700 px-2 py-1 rounded text-sm">USA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Visa Interview Date</div>
                      <div className="text-sm text-gray-500 truncate">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <LocateFixedIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Visa Interview Location</div>
                      <div className="text-sm text-gray-500 truncate">Not Set</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 h-full">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">TOEFL</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>TOEFL Plan</div>
                      <div className="text-sm text-gray-500 truncate">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>TOEFL Date</div>
                      <div className="text-sm text-gray-500 truncate">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>TOEFL Score</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Reading</div>
                          <div className="text-gray-500">26</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Writing</div>
                          <div className="text-gray-500">29</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Speaking</div>
                          <div className="text-gray-500">29</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarRangeIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>Retaking TOEFL</div>
                      <div className="text-sm text-gray-500 truncate">Not set</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;