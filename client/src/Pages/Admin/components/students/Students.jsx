import { StudentsTable } from './StudentsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Students() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <StudentsTable />
        </TabsContent>
        <TabsContent value="verified" className="space-y-4">
          <StudentsTable initialFilters={{ isVerified: 'true' }} />
        </TabsContent>
        <TabsContent value="unverified" className="space-y-4">
          <StudentsTable initialFilters={{ isVerified: 'false' }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
