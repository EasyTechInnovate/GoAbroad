import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent} from '@/components/ui/tabs';
import { Search, Filter, Plus, MapPin, GraduationCap, Building, Globe, ChevronRight, ChevronLeft, X, Loader2 } from 'lucide-react';
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
import { getUniversities, createUniversity, updateUniversity } from '@/services/universityService';

const Universities = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditUniversityOpen, setIsEditUniversityOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    program: '',
    min_acceptance_rate: null,
    max_acceptance_rate: null,
  });

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
  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage,
        limit: 10
      };


      if (searchTerm?.trim()) {
        params.search = searchTerm.trim();
      }


      if (activeTab !== 'all') {
        params.category = activeTab;
      }


      if (filters.name?.trim()) {
        params.name = filters.name.trim();
      }

      if (filters.program?.trim()) {
        params.program = filters.program.trim();
      }


      if (!isNaN(parseFloat(filters.min_acceptance_rate))) {
        params.min_acceptance_rate = parseFloat(filters.min_acceptance_rate);
      }

      if (!isNaN(parseFloat(filters.max_acceptance_rate))) {
        params.max_acceptance_rate = parseFloat(filters.max_acceptance_rate);
      }

      const response = await getUniversities(params);
      setUniversities(response.data.universities || []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching universities:', error);
      toast.error('Failed to fetch universities');
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeTab, searchTerm, filters]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const handleAddUniversity = async () => {
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
    } else {      try {
        setLoading(true);

        const universityData = {
          name: newUniversity.name,
          location: newUniversity.location || null,
          logo: null,
          banner: null,
          program: newUniversity.programs?.[0] || '',
          description: newUniversity.description || null,
          website_url: newUniversity.website || null,
          university_type: newUniversity.university_type || 'Private',
          university_category: newUniversity.category || null,
          ranking: {
            international: !isNaN(parseInt(newUniversity.ranking)) ? parseInt(newUniversity.ranking) : null,
            national: null
          },
          acceptance_rate: !isNaN(parseFloat(newUniversity.acceptance_rate)) ?
            Math.min(Math.max(parseFloat(newUniversity.acceptance_rate), 0), 100) : null,
          living_cost_per_year: 20000,
          tuition_fees_per_year: !isNaN(parseFloat(newUniversity.tuition?.replace(/[^0-9.]/g, ''))) ?
            Math.max(parseFloat(newUniversity.tuition.replace(/[^0-9.]/g, '')), 0) : null,
          application_fee: !isNaN(parseFloat(newUniversity.application_fee?.replace(/[^0-9.]/g, ''))) ?
            Math.max(parseFloat(newUniversity.application_fee.replace(/[^0-9.]/g, '')), 0) : null,
          application_deadline: newUniversity.deadline ? new Date(newUniversity.deadline) : null
        };

        await createUniversity(universityData);
        resetForm();
        setIsAddUniversityOpen(false);
        toast.success('University added successfully!');
        fetchUniversities();
      } catch (error) {
        console.error('Error adding university:', error);
        toast.error(error?.response?.data?.message || 'Failed to add university');
      } finally {
        setLoading(false);
      }
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

  const handleFilter = () => {
    setCurrentPage(1);
    setIsFilterOpen(false);
    fetchUniversities();
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      program: '',
      min_acceptance_rate: null,
      max_acceptance_rate: null,
    });
  };


  const handleUpdateUniversity = async () => {
    try {
      setLoading(true);
      await updateUniversity(selectedUniversity._id, selectedUniversity);
      toast.success('University updated successfully');
      setIsEditUniversityOpen(false);
      setSelectedUniversity(null);
      fetchUniversities();
    } catch (error) {
      console.error('Error updating university:', error);
      toast.error(error?.response?.data?.message || 'Failed to update university');
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (field, value) => {
    if (field === 'min_acceptance_rate' || field === 'max_acceptance_rate') {

      if (value === '') {
        setFilters(prev => ({ ...prev, [field]: null }));
        return;
      }


      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        return; 
      }

      setFilters(prev => {
        const newFilters = { ...prev, [field]: numValue };

        if (field === 'min_acceptance_rate' &&
          newFilters.max_acceptance_rate !== null &&
          numValue > newFilters.max_acceptance_rate) {
          return prev;
        }
        if (field === 'max_acceptance_rate' &&
          newFilters.min_acceptance_rate !== null &&
          numValue < newFilters.min_acceptance_rate) {
          return prev;
        }

        return newFilters;
      });
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">University Management</h1>
          <Button onClick={() => setIsAddUniversityOpen(true)} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search universities..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Input
            placeholder="Program"
            className="w-40"
            value={filters.program}
            onChange={(e) => handleFilterChange('program', e.target.value)}
          />
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          {/* <TabsList>
            <TabsTrigger value="all">All Universities</TabsTrigger>
            <TabsTrigger value="top-tier">Top Tier</TabsTrigger>
            <TabsTrigger value="high-chance">High Chance</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList> */}
          <TabsContent value="all">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {universities.map((university) => (
                    <Card key={university._id}>
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
                            <span>{university.program}</span>
                          </div>
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Acceptance Rate: {university.acceptance_rate}%</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => university.website_url ? window.open(university.website_url, '_blank') : null}
                            disabled={!university.website_url}
                          >
                            <Globe className="mr-1 h-3.5 w-3.5" />
                            Website
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedUniversity(university);
                              setIsViewDetailsOpen(true);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {universities.length === 0 && !loading && (
                  <div className="col-span-full flex items-center justify-center h-40 bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">No universities found</p>
                  </div>
                )}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1 || loading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages || loading}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
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

      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>University Details</DialogTitle>
          </DialogHeader>
          {selectedUniversity && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-sm mt-1">{selectedUniversity.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-sm mt-1">{selectedUniversity.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">University Type</h3>
                    <p className="text-sm mt-1">{selectedUniversity.university_type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Acceptance Rate</h3>
                    <p className="text-sm mt-1">{selectedUniversity.acceptance_rate}%</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">International Ranking</h3>
                    <p className="text-sm mt-1">#{selectedUniversity.ranking?.international || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Tuition Fee (per year)</h3>
                    <p className="text-sm mt-1">${selectedUniversity.tuition_fees_per_year?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Application Fee</h3>
                    <p className="text-sm mt-1">${selectedUniversity.application_fee?.toLocaleString() || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Application Deadline</h3>
                  <p className="text-sm mt-1">
                    {selectedUniversity.application_deadline
                      ? new Date(selectedUniversity.application_deadline).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDetailsOpen(false);
                    setSelectedUniversity(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDetailsOpen(false);
                    setSelectedUniversity(selectedUniversity);
                    setIsEditUniversityOpen(true);
                  }}
                >
                  Edit University
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditUniversityOpen} onOpenChange={setIsEditUniversityOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit University</DialogTitle>
          </DialogHeader>
          {selectedUniversity && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-name">University Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedUniversity.name}
                    onChange={(e) => setSelectedUniversity(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={selectedUniversity.location}
                    onChange={(e) => setSelectedUniversity(prev => ({
                      ...prev,
                      location: e.target.value
                    }))}
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedUniversity.description}
                    onChange={(e) => setSelectedUniversity(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="edit-acceptance-rate">Acceptance Rate (%)</Label>
                    <Input
                      id="edit-acceptance-rate"
                      type="number"
                      min="0"
                      max="100"
                      value={selectedUniversity.acceptance_rate}
                      onChange={(e) => setSelectedUniversity(prev => ({
                        ...prev,
                        acceptance_rate: Math.min(100, Math.max(0, Number(e.target.value)))
                      }))}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="edit-ranking">International Ranking</Label>
                    <Input
                      id="edit-ranking"
                      type="number"
                      min="1"
                      value={selectedUniversity.ranking?.international}
                      onChange={(e) => setSelectedUniversity(prev => ({
                        ...prev,
                        ranking: {
                          ...prev.ranking,
                          international: Math.max(1, Number(e.target.value))
                        }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="edit-tuition">Tuition Fee (per year)</Label>
                    <Input
                      id="edit-tuition"
                      type="number"
                      min="0"
                      value={selectedUniversity.tuition_fees_per_year}
                      onChange={(e) => setSelectedUniversity(prev => ({
                        ...prev,
                        tuition_fees_per_year: Math.max(0, Number(e.target.value))
                      }))}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="edit-application-fee">Application Fee</Label>
                    <Input
                      id="edit-application-fee"
                      type="number"
                      min="0"
                      value={selectedUniversity.application_fee}
                      onChange={(e) => setSelectedUniversity(prev => ({
                        ...prev,
                        application_fee: Math.max(0, Number(e.target.value))
                      }))}
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="edit-deadline">Application Deadline</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={selectedUniversity.application_deadline ? new Date(selectedUniversity.application_deadline).toISOString().split('T')[0] : ''}
                    onChange={(e) => setSelectedUniversity(prev => ({
                      ...prev,
                      application_deadline: e.target.value
                    }))}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditUniversityOpen(false);
                    setSelectedUniversity(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateUniversity}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Universities</DialogTitle>
            <DialogDescription>
              Set filters to refine university search results
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="min-rate">Minimum Acceptance Rate (%)</Label>
                <Input
                  id="min-rate"
                  type="number"
                  min={0}
                  max={100}
                  value={filters.min_acceptance_rate || ''}
                  onChange={(e) => handleFilterChange('min_acceptance_rate', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="max-rate">Maximum Acceptance Rate (%)</Label>
                <Input
                  id="max-rate"
                  type="number"
                  min={0}
                  max={100}
                  value={filters.max_acceptance_rate || ''}
                  onChange={(e) => handleFilterChange('max_acceptance_rate', e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
            <Button onClick={handleFilter}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Universities;