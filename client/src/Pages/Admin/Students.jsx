<<<<<<< HEAD
=======
import { DashboardLayout } from './components/layout/DashboardLayout';
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
import { StudentsTable } from './components/students/StudentsTable';

export default function Students() {
  return (
<<<<<<< HEAD
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
      <StudentsTable />
    </div>
=======
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
        <StudentsTable />
      </div>
    </DashboardLayout>
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
  )
}
