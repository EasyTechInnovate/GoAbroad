import { useState } from 'react';
<<<<<<< HEAD
=======
import { DashboardLayout } from './components/layout/DashboardLayout';
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, MapPin, GraduationCap, Building, Globe, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

const Universities = () => {
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: 'Harvard University',
      location: 'Cambridge, MA, USA',
      programs: ['Computer Science', 'Business', 'Law'],
      students: 24,
      category: 'top-tier',
      website: 'https://www.harvard.edu',
      description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
      ranking: 1,
      acceptance_rate: '4.6%',
      tuition: '$54,768',
      application_fee: '$75',
      deadline: 'January 1, 2023'
    },
    {
      id: 2,
      name: 'Stanford University',
      location: 'Stanford, CA, USA',
      programs: ['Engineering', 'Business', 'Medicine'],
      students: 18,
      category: 'top-tier',
      website: 'https://www.stanford.edu',
      description: 'Stanford University is a private research university in Stanford, California.',
      ranking: 2,
      acceptance_rate: '5.2%',
      tuition: '$56,169',
      application_fee: '$90',
      deadline: 'January 2, 2023'
    },
    {
      id: 3,
      name: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA, USA',
      programs: ['Engineering', 'Computer Science', 'Economics'],
      students: 15,
      category: 'top-tier',
      website: 'https://www.mit.edu',
      description: 'MIT is a private research university in Cambridge, Massachusetts.',
      ranking: 3,
      acceptance_rate: '7.3%',
      tuition: '$55,878',
      application_fee: '$75',
      deadline: 'January 5, 2023'
    },
    {
      id: 4,
      name: 'University of California, Berkeley',
      location: 'Berkeley, CA, USA',
      programs: ['Data Science', 'Engineering', 'Business'],
      students: 32,
      category: 'high-chance',
      website: 'https://www.berkeley.edu',
      description: 'UC Berkeley is a public research university in Berkeley, California.',
      ranking: 18,
      acceptance_rate: '16.8%',
      tuition: '$44,007',
      application_fee: '$70',
      deadline: 'November 30, 2022'
    },
    {
      id: 5,
      name: 'University of Michigan',
      location: 'Ann Arbor, MI, USA',
      programs: ['Engineering', 'Business', 'Medicine'],
      students: 28,
      category: 'high-chance',
      website: 'https://www.umich.edu',
      description: 'The University of Michigan is a public research university in Ann Arbor, Michigan.',
      ranking: 23,
      acceptance_rate: '26.1%',
      tuition: '$51,200',
      application_fee: '$75',
      deadline: 'February 1, 2023'
    }
  ]);

  const [isAddUniversityOpen, setIsAddUniversityOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newUniversity, setNewUniversity] = useState({
    name: '',
    location: '',
    website: '',
    description: '',
    category: 'high-chance',
    ranking: '',
    acceptance_rate: '',
    tuition: '',
    application_fee: '',
    deadline: '',
    programs: []
  });

  const [newProgram, setNewProgram] = useState('');

  const categoryOptions = [
    { label: 'Top Tier', value: 'top-tier' },
    { label: 'High Chance', value: 'high-chance' },
    { label: 'Moderate Chance', value: 'moderate-chance' },
    { label: 'Safety', value: 'safety' }
  ];

  const categoryBadge = (category) => {
    switch (category) {
      case 'top-tier':
        return <Badge className="bg-purple-500">Top Tier</Badge>;
      case 'high-chance':
        return <Badge className="bg-blue-500">High Chance</Badge>;
      case 'moderate-chance':
        return <Badge className="bg-amber-500">Moderate Chance</Badge>;
      case 'safety':
        return <Badge className="bg-green-500">Safety</Badge>;
      default:
        return null;
    }
  };

  const handleAddUniversity = () => {
    if (currentStep === 1 && (!newUniversity.name || !newUniversity.location)) {
      toast.error('University name and location are required');
      return;
    }

    if (currentStep === 2 && !newUniversity.programs.length) {
      toast.error('Please add at least one program');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const universityToAdd = {
        ...newUniversity,
        id: universities.length + 1,
        students: 0,
        ranking: newUniversity.ranking ? Number(newUniversity.ranking) : 0,
        programs: [...newUniversity.programs]
      };
      
      setUniversities([...universities, universityToAdd]);
      resetForm();
      setIsAddUniversityOpen(false);
      toast.success('University added successfully!');
    }
  };

  const handleAddProgram = () => {
    if (newProgram.trim() && !newUniversity.programs.includes(newProgram)) {
      setNewUniversity({
        ...newUniversity,
        programs: [...newUniversity.programs, newProgram]
      });
      setNewProgram('');
    }
  };

  const handleRemoveProgram = (program) => {
    setNewUniversity({
      ...newUniversity,
      programs: newUniversity.programs.filter(p => p !== program)
    });
  };

  const resetForm = () => {
    setNewUniversity({
      name: '',
      location: '',
      website: '',
      description: '',
      category: 'high-chance',
      ranking: '',
      acceptance_rate: '',
      tuition: '',
      application_fee: '',
      deadline: '',
      programs: []
    });
    setNewProgram('');
    setCurrentStep(1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setNewUniversity({
      ...newUniversity,
      [field]: value
    });
  };

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         university.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || university.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  return (
<<<<<<< HEAD
    <>
=======
    <DashboardLayout>
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">University Management</h1>
          <Button onClick={() => setIsAddUniversityOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search universities..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Universities</TabsTrigger>
            <TabsTrigger value="top-tier">Top Tier</TabsTrigger>
            <TabsTrigger value="high-chance">High Chance</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUniversities.map((university) => (
                <Card key={university.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{university.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-md font-medium">{university.name}</CardTitle>
                    </div>
                    {categoryBadge(university.category)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mt-2 space-y-3">
                      <div className="flex items-start">
                        <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{university.location}</span>
                      </div>
                      <div className="flex items-start">
                        <GraduationCap className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{university.programs.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{university.students} Students Applied</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(university.website, '_blank')}
                      >
                        <Globe className="mr-1 h-3.5 w-3.5" />
                        Website
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredUniversities.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-40 bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">No universities found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="top-tier">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Filtered top-tier universities will be shown here based on the activeTab state */}
            </div>
          </TabsContent>
          <TabsContent value="high-chance">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Filtered high-chance universities */}
            </div>
          </TabsContent>
          <TabsContent value="others">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Filtered other universities */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddUniversityOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsAddUniversityOpen(open);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New University</DialogTitle>
            <DialogDescription>
              {currentStep === 1 && 'Enter university information.'}
              {currentStep === 2 && 'Add programs offered by this university.'}
              {currentStep === 3 && 'Add additional details for student reference.'}
            </DialogDescription>
          </DialogHeader>
          
          {currentStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">University Name *</Label>
                  <Input 
                    id="name" 
                    value={newUniversity.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter university name"
                  />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location" 
                    value={newUniversity.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State, Country"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="website">Website URL</Label>
                  <Input 
                    id="website" 
                    value={newUniversity.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.university.edu"
                  />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newUniversity.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the university"
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-1.5">
                <Label>Programs Offered *</Label>
                <div className="flex gap-2">
                  <Input 
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    placeholder="Enter program name"
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={handleAddProgram}
                  >
                    Add
                  </Button>
                </div>
                
                {newUniversity.programs.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Added Programs:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {newUniversity.programs.map((program, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center gap-1"
                        >
                          {program}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                            onClick={() => handleRemoveProgram(program)}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">No programs added yet. Add at least one program.</p>
                )}
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="category">University Category</Label>
                <Select 
                  value={newUniversity.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">This helps categorize universities for student recommendations.</p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="ranking">Ranking</Label>
                  <Input 
                    id="ranking" 
                    value={newUniversity.ranking}
                    onChange={(e) => handleInputChange('ranking', e.target.value)}
                    placeholder="e.g., 15"
                  />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="acceptance_rate">Acceptance Rate</Label>
                  <Input 
                    id="acceptance_rate" 
                    value={newUniversity.acceptance_rate}
                    onChange={(e) => handleInputChange('acceptance_rate', e.target.value)}
                    placeholder="e.g., 12.5%"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="tuition">Tuition Fee</Label>
                  <Input 
                    id="tuition" 
                    value={newUniversity.tuition}
                    onChange={(e) => handleInputChange('tuition', e.target.value)}
                    placeholder="e.g., $50,000"
                  />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="application_fee">Application Fee</Label>
                  <Input 
                    id="application_fee" 
                    value={newUniversity.application_fee}
                    onChange={(e) => handleInputChange('application_fee', e.target.value)}
                    placeholder="e.g., $75"
                  />
                </div>
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input 
                  id="deadline"
                  type="date"
                  value={newUniversity.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between w-full">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div>
              <Button variant="outline" onClick={() => setIsAddUniversityOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleAddUniversity}>
                {currentStep < 3 ? (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Add University'
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
<<<<<<< HEAD
    </>
=======
    </DashboardLayout>
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
  );
};

export default Universities;