import { CalendarIcon, LocateFixedIcon, CalendarRangeIcon, FileIcon, BuildingIcon, GraduationCapIcon, UniversityIcon, WorkflowIcon, BaggageClaimIcon, MailIcon, PhoneIcon, ClockIcon, AwardIcon } from 'lucide-react';

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

          <div className="px-3 sm:px-6 py-6 bg-goupbroad-lightGray min-h-screen overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

              {/* Profile Image */}
              <div className="sm:col-span-1 lg:col-span-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="../../public/profile-full.png"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Program Details */}
              <div className="sm:col-span-1 lg:col-span-3">
                <ProfileDetailsCard title="Program Details">
                  <DataField
                    icon={<AwardIcon className="w-5 h-5" />}
                    label="Program"
                    value={<div>
                      <div>Dream Universities</div>
                    </div>}
                  />
                  <DataField
                    icon={<ClockIcon className="w-5 h-5" />}
                    label="Validity"
                    value="'22-07-2025"
                  />
                </ProfileDetailsCard>

                <div className="mt-6">
                  <ProfileDetailsCard title="Contact Details">
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
                  </ProfileDetailsCard>
                </div>
              </div>

              {/* Personal Details */}
              <div className="sm:col-span-1 lg:col-span-3">
                <ProfileDetailsCard title="Personal Details">
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
                </ProfileDetailsCard>
              </div>

              {/* College Details */}
              <div className="sm:col-span-1 lg:col-span-3">
                <ProfileDetailsCard title="College Details">
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
                </ProfileDetailsCard>
              </div>

              {/* Highest Degree */}
              <div className="sm:col-span-1 lg:col-span-3">
                <ProfileDetailsCard title="">
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
                </ProfileDetailsCard>
              </div>

              {/* GRE Section */}
              <div className="sm:col-span-2 lg:col-span-6">
                <ProfileDetailsCard title="GRE">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="GRE Plan"
                        value="15/08/2022"
                      />
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="GRE Date"
                        value="15/08/2022"
                      />
                      <DataField
                        icon={<ListBulletIcon className="w-5 h-5" />}
                        label="GRE Score"
                        value={
                          <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Verbal</div>
                              <div>153</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Quant</div>
                              <div>161</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">AWA</div>
                              <div>4</div>
                            </div>
                          </div>
                        }
                      />
                    </div>
                    <div>
                      <DataField
                        icon={<FileIcon className="w-5 h-5" />}
                        label="GRE Scorecard"
                        value="Yes"
                      />
                      <DataField
                        icon={<CalendarRangeIcon className="w-5 h-5" />}
                        label="Retaking GRE"
                        value="Yet to decide"
                      />
                    </div>
                  </div>
                </ProfileDetailsCard>
              </div>

              {/* IELTS Section */}
              <div className="sm:col-span-2 lg:col-span-6">
                <ProfileDetailsCard title="IELTS">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="IELTS Plan"
                        value="13/10/2022"
                      />
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="IELTS Date"
                        value="13/10/2022"
                      />
                      <DataField
                        icon={<ListBulletIcon className="w-5 h-5" />}
                        label="IELTS Score"
                        value={
                          <div>
                            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                              <div>
                                <div className="text-sm text-gray-500">Reading</div>
                                <div>26</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Writing</div>
                                <div>29</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Speaking</div>
                                <div>29</div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="text-sm text-gray-500">Listening</div>
                              <div>29</div>
                            </div>
                          </div>
                        }
                      />
                    </div>
                    <div>
                      <DataField
                        icon={<CalendarRangeIcon className="w-5 h-5" />}
                        label="Retaking IELTS"
                        value="Not set"
                      />
                    </div>
                  </div>
                </ProfileDetailsCard>
              </div>

              {/* TOEFL Section */}
              <div className="sm:col-span-2 lg:col-span-6">
                <ProfileDetailsCard title="TOEFL">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="TOEFL Plan"
                        value="13/10/2022"
                      />
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="TOEFL Date"
                        value="13/10/2022"
                      />
                      <DataField
                        icon={<ListBulletIcon className="w-5 h-5" />}
                        label="TOEFL Score"
                        value={
                          <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Reading</div>
                              <div>26</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Writing</div>
                              <div>29</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Speaking</div>
                              <div>29</div>
                            </div>
                          </div>
                        }
                      />
                    </div>
                    <div>
                      <DataField
                        icon={<CalendarRangeIcon className="w-5 h-5" />}
                        label="Retaking TOEFL"
                        value="Not set"
                      />
                    </div>
                  </div>
                </ProfileDetailsCard>
              </div>

              {/* VISA Section */}
              <div className="sm:col-span-2 lg:col-span-6">
                <ProfileDetailsCard title="VISA">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <DataField
                        icon={<LocateFixedIcon className="w-5 h-5" />}
                        label="Countries planning to apply"
                        value="USA"
                      />
                      <DataField
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="Visa Interview Date"
                        value="13/10/2022"
                      />
                    </div>
                    <div>
                      <DataField
                        icon={<LocateFixedIcon className="w-5 h-5" />}
                        label="Visa Interview Location"
                        value="Not Set"
                      />
                    </div>
                  </div>
                </ProfileDetailsCard>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;