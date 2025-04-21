import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SidebarHeader from '../../components/SidebarHeader';
import AppSidebar from '../../components/AppSidebar';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';

const EduLoan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailId: '',
    pinCode: '',
    address: '',
    admissionTerm: 'Fall\'23',
    statusOfAdmission: '',
    coBorrowerName: '',
    universities: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        
        <SidebarInset>
          <SidebarHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-50 p-4 pt-8 md:p-6 md:pt-10">
            <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm my-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Edu Loan Form</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admission Term</label>
                      <div className="relative">
                        <select
                          name="admissionTerm"
                          value={formData.admissionTerm}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:primary-1"
                        >
                          <option value="Fall'23">Fall&apos;23</option>
                          <option value="Spring'24">Spring&apos;24</option>
                          <option value="Fall'24">Fall&apos;24</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                      </div>
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status of Admission</label>
                      <div className="relative">
                        <select
                          name="statusOfAdmission"
                          value={formData.statusOfAdmission}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:primary-1"
                        >
                          <option value="">-Select-</option>
                          <option value="admitted">Admitted</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4 pt-4">
                      <p className="block text-sm text-center font-medium text-gray-700 mb-3">Co Borrower*</p>
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="coBorrowerName"
                        value={formData.coBorrowerName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University/Universities I received admit from</label>
                      <input
                        type="text"
                        name="universities"
                        value={formData.universities}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:primary-1"
                        required
                      />
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button
                        type="submit"
                        className="px-10 py-2 cursor-pointer bg-primary-1 text-white font-medium hover:bg-primary-1/90 focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EduLoan;