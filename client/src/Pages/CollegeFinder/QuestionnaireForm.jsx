import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navigation from '@/components/static/Navigation';
import Footer from '@/components/static/Footer';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Brain,
  Sparkles,
  CheckCircle,
  Clock,
  User,
  GraduationCap,
  Briefcase,
  Globe,
  DollarSign,
  Award,
  Target,
  ArrowRight,
  AlertCircle,
  Loader2,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  MapPin,
  Calendar,
  FileText,
  Building2,
  Lightbulb,
  Shield,
  Rocket,
  ChevronRight,
  Check
} from 'lucide-react';
import collegeData from '@/data/collegeData';
import {
  validateUniversityData,
  getProgramDisplayNames,
  getInternalProgramName,
  getUniversityRecommendations,
  getProgramStats
} from '@/lib/universityDataLoader';

// Custom hook to handle form inputs without cursor jumping
const useFormInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  return [value, handleChange, inputRef];
};

// InputField component that doesn't lose cursor focus
const InputField = ({ label, field, type = 'text', options = null, required = false, placeholder = '', description = '', value, onChange, hasError }) => {
  const inputRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    onChange(field, newValue);
  }, [field, onChange]);

  const handleRadioClick = useCallback((option) => {
    onChange(field, option);
  }, [field, onChange]);

  if (type === 'select') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <select
          ref={inputRef}
          value={value || ''}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
            hasError
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : value
              ? 'border-[#145044] focus:border-[#145044] focus:ring-[#145044]/20'
              : 'border-gray-300 focus:border-[#145044] focus:ring-[#145044]/20'
          }`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {hasError && (
          <p className="text-red-600 text-xs flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {hasError}
          </p>
        )}
      </div>
    );
  }

  if (type === 'radio') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <div className="grid grid-cols-2 gap-2">
          {options.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => handleRadioClick(option)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                value === option
                  ? 'border-[#145044] bg-[#145044] text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-[#145044]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {hasError && (
          <p className="text-red-600 text-xs flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {hasError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <input
        ref={inputRef}
        type={type}
        value={value || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
          hasError
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : value
            ? 'border-[#145044] focus:border-[#145044] focus:ring-[#145044]/20'
            : 'border-gray-300 focus:border-[#145044] focus:ring-[#145044]/20'
        }`}
      />
      {hasError && (
        <p className="text-red-600 text-xs flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {hasError}
        </p>
      )}
    </div>
  );
};

const QuestionnaireForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataValidation, setDataValidation] = useState(null);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [formData, setFormData] = useState({
    // Base Questions (1-23)
    program: '',
    stemRequired: '',
    f1Required: '',
    gpa: '',
    gpaScale: '',
    university: '',
    universityTier: '',
    degree: '',
    mathProgrammingStats: '',
    degreeLength: '',
    mastersDegree: '',
    mastersDetails: '',
    greTotal: '',
    greQuant: '',
    greVerbal: '',
    greAWA: '',
    gmatTotal: '',
    gmatQuant: '',
    gmatVerbal: '',
    gmatAWA: '',
    gmatIR: '',
    englishTest: '',
    englishScore: '',
    intakeYear: '',
    intakeSeason: '',
    // Advanced Questions (24-37)
    workExperience: '',
    industries: '',
    brandFirms: '',
    leadership: '',
    promotions: '',
    research: '',
    publications: '',
    certifications: '',
    citizenship: '',
    gender: '',
    demographicGroup: '',
    budgetConstraints: '',
    maxBudget: '',
    scholarships: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load and validate university data on component mount
  useEffect(() => {
    console.log('🚀 Loading university data...');

    try {
      // Validate data
      const validation = validateUniversityData();
      setDataValidation(validation);

      if (validation.isValid) {
        // Load available programs
        const programs = getProgramDisplayNames();
        setAvailablePrograms(programs);
        setDataLoaded(true);

        console.log('✅ University data loaded successfully!');
        console.log(`📊 Available programs: ${programs.length}`);
        console.log('🎓 Programs:', programs);
      } else {
        console.error('❌ Data validation failed:', validation.issues);
      }
    } catch (error) {
      console.error('❌ Error loading university data:', error);
      setDataValidation({
        isValid: false,
        issues: ['Failed to load data: ' + error.message]
      });
    }
  }, []);

  // Stable callback for handling input changes
  const handleInputChange = useCallback((field, value) => {
    console.log(`📝 Field updated: ${field} = ${value}`);

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Initialize Gemini AI
  const initializeGemini = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('🔑 Gemini API Key:', apiKey ? 'Available' : 'Missing');

    if (!apiKey) {
      console.warn('⚠️ Gemini API key not found. Using mock responses.');
      return null;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      console.log('✅ Gemini AI initialized successfully');
      return genAI;
    } catch (error) {
      console.error('❌ Error initializing Gemini AI:', error);
      return null;
    }
  };

  const generateRecommendations = async () => {
    console.log('🚀 Starting recommendation generation...');
    setIsSubmitting(true);

    try {
      // Generate university recommendations using real data
      console.log('📊 User profile for recommendations:', formData);

      const userProfile = {
        program: formData.program,
        gpa: formData.gpa,
        testScores: {
          gre: formData.greScore,
          gmat: formData.gmatScore,
          english: formData.englishScore
        },
        preferences: {
          budget: formData.budget,
          regions: formData.preferredRegions,
          ranking: formData.rankingImportance
        }
      };

      const recommendations = getUniversityRecommendations(userProfile);
      console.log('🎯 Generated recommendations:', recommendations);

      if (recommendations.total === 0) {
        console.warn('⚠️ No universities found for user profile');
        alert('No universities found matching your criteria. Please try different program or preferences.');
        setIsSubmitting(false);
        return;
      }

      // Navigate to results with real recommendations
      navigate('/college-finder/results', {
        state: {
          recommendations,
          responses: formData,
          aiInsights: `Based on your profile, we found ${recommendations.total} matching universities across different probability tiers.`
        }
      });
    } catch (error) {
      console.error('❌ Error generating recommendations:', error);
      alert('Error generating recommendations. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Program & Requirements</h2>
              <p className="text-gray-600 text-sm">Tell us about your target program and visa requirements</p>
            </div>

            <InputField
              label="1. Which program do you want to apply for?"
              field="program"
              type="select"
              options={availablePrograms}
              required
              description="Choose your target program for higher education"
              value={formData.program}
              onChange={handleInputChange}
              hasError={errors.program}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="2. Do you require only STEM-designated programs?"
                field="stemRequired"
                type="radio"
                options={['Yes', 'No']}
                required
                description="STEM programs offer extended OPT work authorization"
                value={formData.stemRequired}
                onChange={handleInputChange}
                hasError={errors.stemRequired}
              />

              <InputField
                label="3. Do you require only F-1 visa eligible programs?"
                field="f1Required"
                type="radio"
                options={['Yes', 'No']}
                required
                description="Essential for international student visa status"
                value={formData.f1Required}
                onChange={handleInputChange}
                hasError={errors.f1Required}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Academic Background</h2>
              <p className="text-gray-600 text-sm">Share your educational background and achievements</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="4. What is your undergraduate GPA?"
                field="gpa"
                type="number"
                placeholder="e.g., 3.5 or 8.5"
                required
                description="Your cumulative grade point average"
                value={formData.gpa}
                onChange={handleInputChange}
                hasError={errors.gpa}
              />

              <InputField
                label="GPA Scale"
                field="gpaScale"
                type="select"
                options={['4.0', '10.0', 'Percentage']}
                required
                description="The grading scale used by your university"
                value={formData.gpaScale}
                onChange={handleInputChange}
                hasError={errors.gpaScale}
              />
            </div>

            <InputField
              label="5. What is the name of your undergraduate university?"
              field="university"
              placeholder="e.g., Delhi University, IIT Bombay"
              required
              description="Full name of your undergraduate institution"
              value={formData.university}
              onChange={handleInputChange}
              hasError={errors.university}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Scores & Language</h2>
              <p className="text-gray-600 text-sm">Share your standardized test scores and language proficiency</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="6. Have you taken the GRE?"
                field="greStatus"
                type="radio"
                options={['Yes', 'No', 'Planning to take']}
                required
                description="Graduate Record Examination"
                value={formData.greStatus}
                onChange={handleInputChange}
                hasError={errors.greStatus}
              />

              <InputField
                label="7. GRE Score (if taken)"
                field="greScore"
                placeholder="e.g., 320"
                description="Total GRE score out of 340"
                value={formData.greScore}
                onChange={handleInputChange}
                hasError={errors.greScore}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="8. Have you taken the GMAT?"
                field="gmatStatus"
                type="radio"
                options={['Yes', 'No', 'Planning to take']}
                description="Graduate Management Admission Test"
                value={formData.gmatStatus}
                onChange={handleInputChange}
                hasError={errors.gmatStatus}
              />

              <InputField
                label="9. GMAT Score (if taken)"
                field="gmatScore"
                placeholder="e.g., 650"
                description="Total GMAT score out of 800"
                value={formData.gmatScore}
                onChange={handleInputChange}
                hasError={errors.gmatScore}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="10. English Test Type"
                field="englishTest"
                type="select"
                options={['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'Native Speaker', 'Not taken yet']}
                required
                description="English proficiency test taken"
                value={formData.englishTest}
                onChange={handleInputChange}
                hasError={errors.englishTest}
              />

              <InputField
                label="11. English Test Score"
                field="englishScore"
                placeholder="e.g., 7.5 (IELTS) or 100 (TOEFL)"
                description="Your English test score"
                value={formData.englishScore}
                onChange={handleInputChange}
                hasError={errors.englishScore}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Work Experience & Skills</h2>
              <p className="text-gray-600 text-sm">Tell us about your professional background and technical skills</p>
            </div>

            <InputField
              label="12. Total work experience"
              field="workExperience"
              type="select"
              options={['No experience', '0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years']}
              required
              description="Total full-time work experience"
              value={formData.workExperience}
              onChange={handleInputChange}
              hasError={errors.workExperience}
            />

            <InputField
              label="13. Current job title/role"
              field="currentRole"
              placeholder="e.g., Software Engineer, Marketing Analyst"
              description="Your current or most recent job title"
              value={formData.currentRole}
              onChange={handleInputChange}
              hasError={errors.currentRole}
            />

            <InputField
              label="14. Industry experience"
              field="industry"
              type="select"
              options={['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Consulting', 'Retail', 'Government', 'Non-profit', 'Other']}
              required
              description="Primary industry you've worked in"
              value={formData.industry}
              onChange={handleInputChange}
              hasError={errors.industry}
            />

            <InputField
              label="15. Technical skills (comma-separated)"
              field="technicalSkills"
              placeholder="e.g., Python, SQL, Machine Learning, Excel"
              description="List your key technical skills"
              value={formData.technicalSkills}
              onChange={handleInputChange}
              hasError={errors.technicalSkills}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="16. Leadership experience"
                field="leadership"
                type="radio"
                options={['Yes', 'No']}
                required
                description="Have you led teams or projects?"
                value={formData.leadership}
                onChange={handleInputChange}
                hasError={errors.leadership}
              />

              <InputField
                label="17. Research experience"
                field="research"
                type="radio"
                options={['Yes', 'No']}
                description="Academic or professional research experience"
                value={formData.research}
                onChange={handleInputChange}
                hasError={errors.research}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Financial Planning</h2>
              <p className="text-gray-600 text-sm">Help us understand your budget and funding sources</p>
            </div>

            <InputField
              label="18. Budget for total education cost"
              field="budget"
              type="select"
              options={['$30,000 - $50,000', '$50,000 - $80,000', '$80,000 - $120,000', '$120,000 - $200,000', '$200,000+']}
              required
              description="Total budget including tuition, living expenses for entire program"
              value={formData.budget}
              onChange={handleInputChange}
              hasError={errors.budget}
            />

            <InputField
              label="19. Primary funding source"
              field="funding"
              type="select"
              options={['Self-funded', 'Family support', 'Education loan', 'Scholarship/Assistantship', 'Employer sponsorship', 'Mix of sources']}
              required
              description="How will you finance your education?"
              value={formData.funding}
              onChange={handleInputChange}
              hasError={errors.funding}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="20. Need scholarship/assistantship?"
                field="needScholarship"
                type="radio"
                options={['Yes, essential', 'Yes, preferred', 'No']}
                required
                description="Financial aid requirement"
                value={formData.needScholarship}
                onChange={handleInputChange}
                hasError={errors.needScholarship}
              />

              <InputField
                label="21. Open to education loans?"
                field="openToLoans"
                type="radio"
                options={['Yes', 'No', 'Maybe']}
                description="Willingness to take education loans"
                value={formData.openToLoans}
                onChange={handleInputChange}
                hasError={errors.openToLoans}
              />
            </div>

            <InputField
              label="22. Cost preference priority"
              field="costPriority"
              type="select"
              options={['Low cost is most important', 'Balanced cost and quality', 'Quality over cost', 'Cost is not a concern']}
              required
              description="How important is cost in your decision?"
              value={formData.costPriority}
              onChange={handleInputChange}
              hasError={errors.costPriority}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Location & Lifestyle</h2>
              <p className="text-gray-600 text-sm">Tell us about your location preferences and lifestyle needs</p>
            </div>

            <InputField
              label="23. Preferred regions in US"
              field="preferredRegions"
              type="checkbox"
              options={['Northeast (NY, MA, PA)', 'Southeast (FL, GA, NC)', 'Midwest (IL, MI, OH)', 'Southwest (TX, AZ)', 'West Coast (CA, WA, OR)', 'Mountain States (CO, UT)']}
              description="Select all regions you'd consider (multiple allowed)"
              value={formData.preferredRegions}
              onChange={handleInputChange}
              hasError={errors.preferredRegions}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="24. City size preference"
                field="citySize"
                type="select"
                options={['Large metropolitan (NYC, LA, Chicago)', 'Mid-size city (Austin, Seattle)', 'Small city/college town', 'No preference']}
                required
                description="What type of city do you prefer?"
                value={formData.citySize}
                onChange={handleInputChange}
                hasError={errors.citySize}
              />

              <InputField
                label="25. Climate preference"
                field="climate"
                type="select"
                options={['Warm/tropical', 'Mild/temperate', 'Cold/continental', 'No preference']}
                description="Weather preference"
                value={formData.climate}
                onChange={handleInputChange}
                hasError={errors.climate}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="26. Important campus factors"
                field="campusFactors"
                type="checkbox"
                options={['Large campus', 'Small campus', 'Urban setting', 'Suburban setting', 'Strong diversity', 'Research facilities', 'Industry connections']}
                description="What matters most in a campus? (multiple allowed)"
                value={formData.campusFactors}
                onChange={handleInputChange}
                hasError={errors.campusFactors}
              />

              <InputField
                label="27. Public vs Private preference"
                field="universityType"
                type="select"
                options={['Public universities preferred', 'Private universities preferred', 'No preference']}
                description="University type preference"
                value={formData.universityType}
                onChange={handleInputChange}
                hasError={errors.universityType}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Career Goals & Timeline</h2>
              <p className="text-gray-600 text-sm">Share your career aspirations and program timeline</p>
            </div>

            <InputField
              label="28. Primary career goal after graduation"
              field="careerGoal"
              type="select"
              options={['Work in US (full-time)', 'Return to home country', 'Start own business/startup', 'Pursue PhD/further research', 'Consulting career', 'Not decided yet']}
              required
              description="What's your main goal after completing the program?"
              value={formData.careerGoal}
              onChange={handleInputChange}
              hasError={errors.careerGoal}
            />

            <InputField
              label="29. Target job roles/positions"
              field="targetRoles"
              placeholder="e.g., Data Scientist, Product Manager, Software Engineer"
              description="Specific roles you're targeting (comma-separated)"
              value={formData.targetRoles}
              onChange={handleInputChange}
              hasError={errors.targetRoles}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="30. Preferred intake semester"
                field="intake"
                type="select"
                options={['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Fall 2026']}
                required
                description="When do you want to start?"
                value={formData.intake}
                onChange={handleInputChange}
                hasError={errors.intake}
              />

              <InputField
                label="31. Program duration preference"
                field="duration"
                type="select"
                options={['1 year', '1.5 years', '2 years', 'No preference']}
                description="Preferred program length"
                value={formData.duration}
                onChange={handleInputChange}
                hasError={errors.duration}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="32. Industry focus post-graduation"
                field="targetIndustry"
                type="select"
                options={['Technology/Software', 'Finance/Banking', 'Consulting', 'Healthcare/Biotech', 'Energy/Utilities', 'Manufacturing', 'Startups', 'Academia/Research']}
                description="Target industry for career"
                value={formData.targetIndustry}
                onChange={handleInputChange}
                hasError={errors.targetIndustry}
              />

              <InputField
                label="33. Salary expectations (USD)"
                field="salaryExpectation"
                type="select"
                options={['$60k - $80k', '$80k - $120k', '$120k - $150k', '$150k - $200k', '$200k+', 'Not sure']}
                description="Expected starting salary after graduation"
                value={formData.salaryExpectation}
                onChange={handleInputChange}
                hasError={errors.salaryExpectation}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Additional Preferences</h2>
              <p className="text-gray-600 text-sm">Final questions to personalize your recommendations</p>
            </div>

            <InputField
              label="34. University ranking importance"
              field="rankingImportance"
              type="select"
              options={['Very important (Top 50 only)', 'Important (Top 100)', 'Somewhat important', 'Not important']}
              required
              description="How important are university rankings to you?"
              value={formData.rankingImportance}
              onChange={handleInputChange}
              hasError={errors.rankingImportance}
            />

            <InputField
              label="35. Specific universities of interest"
              field="targetUniversities"
              placeholder="e.g., Stanford, MIT, CMU, UC Berkeley"
              description="List any specific universities you're interested in (optional)"
              value={formData.targetUniversities}
              onChange={handleInputChange}
              hasError={errors.targetUniversities}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="36. Research vs Coursework focus"
                field="programFocus"
                type="select"
                options={['Research-heavy (thesis)', 'Coursework-focused', 'Balanced mix', 'No preference']}
                description="What type of program structure do you prefer?"
                value={formData.programFocus}
                onChange={handleInputChange}
                hasError={errors.programFocus}
              />

              <InputField
                label="37. Any specific concerns/requirements?"
                field="additionalRequirements"
                placeholder="e.g., visa sponsorship, disability support, family considerations"
                description="Anything else we should know?"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                hasError={errors.additionalRequirements}
              />
            </div>

            <div className="bg-[#145044]/5 border border-[#145044]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-[#145044] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#145044] mb-1">Ready for AI Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Once you submit, our AI will analyze your profile against our database of {dataValidation?.stats?.totalRecords || '1000+'} university programs
                    to provide personalized recommendations with admission probability scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">More steps coming soon...</h2>
          </div>
        );
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-[#145044] rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="h-8 w-8 text-white" />
            <Loader2 className="absolute h-6 w-6 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Processing Your Profile</h2>
          <p className="text-gray-600 mb-6">AI is analyzing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Clean, Professional Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#145044] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              University Questionnaire
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete our assessment to receive AI-powered university recommendations.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step
                      ? 'bg-[#145044] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 8 && (
                    <div className={`w-12 h-0.5 mx-2 transition-colors ${
                      currentStep > step ? 'bg-[#145044]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              Step {currentStep} of 8
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 md:p-8">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="w-full md:w-auto order-2 md:order-1"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Previous
              </Button>

              <div className="flex items-center space-x-2 order-1 md:order-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step <= currentStep ? 'bg-[#145044]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                className="w-full md:w-auto bg-[#145044] hover:bg-[#0f3c34] order-3"
              >
                {currentStep === 8 ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Universities
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuestionnaireForm;