import { StudentsTable } from './components/students/StudentsTable';

export default function Students() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
      <StudentsTable />
    </div>
  )
}
