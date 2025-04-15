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
          <SidebarHeader isSidebarOpen={isOpen} setIsOpen={setIsOpen} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 p-5 bg-gray-50">

            <div className="sm:col-span-2 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Image */}
                    <div className="md:col-span-1">
                      <div className="bg-white rounded-lg overflow-hidden h-[300px]">
                        <img
                          src="/profile-full.png"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Program & Contact Details */}
                    <div className="md:col-span-2">
                      <div className="mb-5 max-w-[250px]">
                        <h2 className="text-lg font-semibold mb-4">Program Details</h2>
                        <div className="space-y-5">
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

                      <div className="max-w-[250px]">
                        <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
                        <div className="space-y-5">
                          <DataField
                            icon={<PhoneIcon className="w-5 h-5" />}
                            label="Phone"
                            value="7016149548"
                          />
                          <DataField
                            icon={<MailIcon className="w-5 h-5" />}
                            label="E-mail"
                            value="shreyrock420@gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details Column */}
            <div className="sm:col-span-1 lg:col-span-3">
              <ProfileDetailsCard title="Personal Details">
                <div className="space-y-5">
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
                      <div>
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

            {/* College Details Column */}
            <div className="sm:col-span-1 lg:col-span-5">
              <ProfileDetailsCard title="College Details">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-1 space-y-5">
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
                  <div className="col-span-1 space-y-5">
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

            {/* GRE Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                <h2 className="text-lg font-semibold mb-5">GRE</h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">GRE Plan</div>
                      <div className="text-sm text-gray-500">15/08/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">GRE Date</div>
                      <div className="text-sm text-gray-500">15/08/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">GRE Score</div>
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
                    <div>
                      <div className="">GRE Scorecard</div>
                      <div className="text-sm text-gray-500">Yes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarRangeIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">Retaking GRE</div>
                      <div className="text-sm text-gray-500">Yet to decide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IELTS Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                <h2 className="text-lg font-semibold mb-5">IELTS</h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">IELTS Plan</div>
                      <div className="text-sm text-gray-500">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">IELTS Date</div>
                      <div className="text-sm text-gray-500">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">IELTS Score</div>
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
                    <div>
                      <div className="">Retaking IELTS</div>
                      <div className="text-sm text-gray-500">Not set</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            {/* VISA Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <div className="bg-[#f0f7f5] rounded-lg shadow-sm p-5 border border-primary/60">
                <h2 className="text-lg font-semibold">VISA</h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <LocateFixedIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">Countries planning to apply</div>
                      <div className="mt-1">
                        <span className="bg-[#e9eeee] text-gray-700 px-2 py-1 rounded text-sm">USA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">Visa Interview Date</div>
                      <div className="text-sm text-gray-500">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <LocateFixedIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">Visa Interview Location</div>
                      <div className="text-sm text-gray-500">Not Set</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TOEFL Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                <h2 className="text-lg font-semibold mb-5">TOEFL</h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">TOEFL Plan</div>
                      <div className="text-sm text-gray-500">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">TOEFL Date</div>
                      <div className="text-sm text-gray-500">13/10/2022</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">
                      <ListBulletIcon className="w-5 h-5 stroke-white" />
                    </div>
                    <div>
                      <div className="">TOEFL Score</div>
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
                    <div>
                      <div className="">Retaking TOEFL</div>
                      <div className="text-sm text-gray-500">Not set</div>
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