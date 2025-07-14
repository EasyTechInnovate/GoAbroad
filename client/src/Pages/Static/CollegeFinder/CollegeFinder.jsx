
import { useState } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import Navigation from '@/components/static/Navigation';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Slider } from '@/Pages/Admin/components/ui/slider';

const CollegeFinder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    degree: '',
    country: '',
    fieldOfStudy: '',

    // Step 2
    highestEducation: '',
    schoolName: '',
    schoolBoard: '',
    score: '',
    topTenPercent: false,

    // Step 3
    englishTest: '',
    aptitudeTest: '',
    apExams: false,

    // Step 4
    coCurricularRating: [3],
    extraCurricularRating: [3],
    internshipDuration: '',
    internshipUnit: 'Weeks'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Universities will be suggested based on your profile!');
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-primary/5">
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <GraduationCap className="h-8 w-8" />
          TAKE US THROUGH YOUR DREAM EDUCATION
        </CardTitle>
        <CardDescription className="text-lg">Step 1 of 4</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div>
          <Label className="text-base font-medium text-foreground">What degree do you plan to study? *</Label>
          <RadioGroup
            value={formData.degree}
            onValueChange={(value) => handleInputChange('degree', value)}
            className="mt-3"
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="bachelor" id="bachelor" className="border-primary" />
              <Label htmlFor="bachelor" className="cursor-pointer">Bachelor&apos;s</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="master" id="master" className="border-primary" />
              <Label htmlFor="master" className="cursor-pointer">Master&apos;s</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">Where do you want to study? *</Label>
          <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
            <SelectTrigger className="mt-3 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="united-states">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="france">France</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">What are you planning to study? *</Label>
          <Select value={formData.fieldOfStudy} onValueChange={(value) => handleInputChange('fieldOfStudy', value)}>
            <SelectTrigger className="mt-3 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select field of study" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="liberal-arts">Liberal Arts</SelectItem>
              <SelectItem value="law">Law</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-6">
          <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 px-8">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-primary/5">
        <CardTitle className="text-2xl font-bold text-primary">TELL US ALL ABOUT YOUR SCHOOL DAYS</CardTitle>
        <CardDescription className="text-lg">Step 2 of 4</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div>
          <Label className="text-base font-medium text-foreground">What is your highest level of education? *</Label>
          <Select value={formData.highestEducation} onValueChange={(value) => handleInputChange('highestEducation', value)}>
            <SelectTrigger className="mt-3 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="grade-10">Grade 10</SelectItem>
              <SelectItem value="grade-11">Grade 11</SelectItem>
              <SelectItem value="grade-12">Grade 12</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">What is the name of your school? *</Label>
          <Select value={formData.schoolName} onValueChange={(value) => handleInputChange('schoolName', value)}>
            <SelectTrigger className="mt-3 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="school1">Delhi Public School</SelectItem>
              <SelectItem value="school2">Kendriya Vidyalaya</SelectItem>
              <SelectItem value="school3">St. Mary&apos;s School</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">School board *</Label>
          <Select value={formData.schoolBoard} onValueChange={(value) => handleInputChange('schoolBoard', value)}>
            <SelectTrigger className="mt-3 border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select a board" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="cbse">CBSE</SelectItem>
              <SelectItem value="icse">ICSE</SelectItem>
              <SelectItem value="state-board">State Board</SelectItem>
              <SelectItem value="ib">IB</SelectItem>
              <SelectItem value="igcse">IGCSE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">Your score *</Label>
          <div className="flex items-center space-x-2 mt-3">
            <Input
              type="number"
              placeholder="85"
              value={formData.score}
              onChange={(e) => handleInputChange('score', e.target.value)}
              className="flex-1 border-primary/20 focus:border-primary"
            />
            <span className="text-muted-foreground">out of 100%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
          <Checkbox
            id="top-ten"
            checked={formData.topTenPercent}
            onCheckedChange={(checked) => handleInputChange('topTenPercent', checked)}
            className="border-primary"
          />
          <Label htmlFor="top-ten" className="text-base cursor-pointer">Are you in top 10% of your class?</Label>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={prevStep} variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 px-8">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-primary/5">
        <CardTitle className="text-2xl font-bold text-primary">FILL UP YOUR TEST SCORES</CardTitle>
        <CardDescription className="text-lg">Step 3 of 4</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div>
          <Label className="text-base font-medium text-foreground">Which English test did you take? *</Label>
          <RadioGroup
            value={formData.englishTest}
            onValueChange={(value) => handleInputChange('englishTest', value)}
            className="mt-3"
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="toefl" id="toefl" className="border-primary" />
              <Label htmlFor="toefl" className="cursor-pointer">TOEFL</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="ielts" id="ielts" className="border-primary" />
              <Label htmlFor="ielts" className="cursor-pointer">IELTS</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="pte" id="pte" className="border-primary" />
              <Label htmlFor="pte" className="cursor-pointer">PTE</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">Which aptitude test did you take? *</Label>
          <RadioGroup
            value={formData.aptitudeTest}
            onValueChange={(value) => handleInputChange('aptitudeTest', value)}
            className="mt-3"
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="sat" id="sat" className="border-primary" />
              <Label htmlFor="sat" className="cursor-pointer">SAT</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="act" id="act" className="border-primary" />
              <Label htmlFor="act" className="cursor-pointer">ACT</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <RadioGroupItem value="academic" id="academic" className="border-primary" />
              <Label htmlFor="academic" className="cursor-pointer">Academic</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
          <Checkbox
            id="ap-exams"
            checked={formData.apExams}
            onCheckedChange={(checked) => handleInputChange('apExams', checked)}
            className="border-primary"
          />
          <Label htmlFor="ap-exams" className="text-base cursor-pointer">Did you take any AP exams/ Honors courses?</Label>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={prevStep} variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 px-8">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-primary/5">
        <CardTitle className="text-2xl font-bold text-primary">SOMETIMES IT&apos;S GOOD TO SHOW OFF</CardTitle>
        <CardDescription className="text-lg">Step 4 of 4</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div>
          <Label className="text-base font-medium text-foreground">Co-curriculars</Label>
          <div className="mt-4 space-y-3">
            <Label className="text-sm text-muted-foreground">Rate your performance in Co-curricular *</Label>
            <div className="space-y-3">
              <Slider
                value={formData.coCurricularRating}
                onValueChange={(value) => handleInputChange('coCurricularRating', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1</span>
                <span className="font-bold text-primary text-lg">{formData.coCurricularRating[0]}</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">Extra-curriculars</Label>
          <div className="mt-4 space-y-3">
            <Label className="text-sm text-muted-foreground">Rate your performance in Extra-curricular *</Label>
            <div className="space-y-3">
              <Slider
                value={formData.extraCurricularRating}
                onValueChange={(value) => handleInputChange('extraCurricularRating', value)}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1</span>
                <span className="font-bold text-primary text-lg">{formData.extraCurricularRating[0]}</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-foreground">Internship/Work Experience</Label>
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground">Duration of internship (if any) *</Label>
            <div className="flex items-center space-x-2 mt-3">
              <Input
                type="number"
                placeholder="e.g: 4"
                value={formData.internshipDuration}
                onChange={(e) => handleInputChange('internshipDuration', e.target.value)}
                className="flex-1 border-primary/20 focus:border-primary"
              />
              <Select value={formData.internshipUnit} onValueChange={(value) => handleInputChange('internshipUnit', value)}>
                <SelectTrigger className="w-32 border-primary/20 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20">
                  <SelectItem value="Weeks">Weeks</SelectItem>
                  <SelectItem value="Months">Months</SelectItem>
                  <SelectItem value="Years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={prevStep} variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 px-8">
            Find Universities <Search className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            College Finder
          </h1>
          <p className="text-xl text-muted-foreground">
            Find your perfect university match through our guided questionnaire
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${currentStep >= step
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-muted'
                    }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors ${currentStep > step ? 'bg-primary' : 'bg-muted'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Render current step */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </main>

      <Footer />
    </div>
  );
};

export default CollegeFinder;
