// University Models for GoAbroad App
// These models define the data structures for university-related features

export interface University {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  logo: string;
  images: string[];
  country: string;
  city: string;
  state?: string;
  address: string;
  website: string;
  email: string;
  phone?: string;
  foundedYear?: number;
  type: 'public' | 'private' | 'community' | 'research';
  ranking: {
    global?: number;
    national?: number;
    subject?: { [key: string]: number };
  };
  acceptanceRate?: number;
  tuitionFees: {
    domestic?: number;
    international?: number;
    currency: string;
  };
  livingExpenses: {
    accommodation: number;
    food: number;
    transportation: number;
    other: number;
    total: number;
    currency: string;
  };
  programs: UniversityProgram[];
  requirements: UniversityRequirements;
  scholarships: Scholarship[];
  applicationDeadlines: ApplicationDeadline[];
  isBookmarked: boolean;
  isApplied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityProgram {
  id: string;
  name: string;
  degree: 'bachelor' | 'master' | 'phd' | 'diploma' | 'certificate';
  duration: string;
  department: string;
  description: string;
  requirements: string[];
  tuitionFee: number;
  currency: string;
  intakeSeasons: string[];
  applicationDeadline: string;
  startDate: string;
}

export interface UniversityRequirements {
  academic: {
    minimumGPA?: number;
    minimumIELTS?: number;
    minimumTOEFL?: number;
    minimumGRE?: number;
    minimumGMAT?: number;
    requiredSubjects?: string[];
  };
  documents: {
    transcripts: boolean;
    recommendationLetters: number;
    statementOfPurpose: boolean;
    resume: boolean;
    portfolio?: boolean;
    other?: string[];
  };
  application: {
    applicationFee: number;
    currency: string;
    onlineApplication: boolean;
    interviewRequired: boolean;
    additionalTests?: string[];
  };
}

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  type: 'merit' | 'need' | 'athletic' | 'international' | 'departmental';
  eligibility: string[];
  applicationDeadline: string;
  renewable: boolean;
  requirements: string[];
}

export interface ApplicationDeadline {
  program: string;
  intake: string;
  deadline: string;
  status: 'open' | 'closed' | 'upcoming';
}

export interface UniversityApplication {
  id: string;
  universityId: string;
  programId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
  submittedAt?: string;
  documents: ApplicationDocument[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationDocument {
  id: string;
  type: 'transcript' | 'recommendation' | 'sop' | 'resume' | 'portfolio' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
  status: 'uploaded' | 'verified' | 'rejected';
  feedback?: string;
}

export interface UniversitySearchRequest {
  query?: string;
  country?: string;
  city?: string;
  type?: string;
  degree?: string;
  program?: string;
  tuitionRange?: {
    min: number;
    max: number;
  };
  ranking?: {
    min: number;
    max: number;
  };
  acceptanceRate?: {
    min: number;
    max: number;
  };
  sortBy?: 'name' | 'ranking' | 'tuition' | 'acceptance_rate';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UniversitySearchResponse {
  universities: University[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: {
    countries: string[];
    cities: string[];
    types: string[];
    degrees: string[];
    programs: string[];
  };
}

export interface UniversityDetailResponse {
  university: University;
  relatedUniversities: University[];
  studentReviews: UniversityReview[];
  admissionStatistics: AdmissionStatistics;
}

export interface UniversityReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  program: string;
  graduationYear?: number;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  helpfulCount: number;
  createdAt: string;
}

export interface AdmissionStatistics {
  totalApplications: number;
  acceptedApplications: number;
  acceptanceRate: number;
  averageGPA: number;
  averageIELTS: number;
  averageTOEFL: number;
  averageGRE: number;
  demographics: {
    domestic: number;
    international: number;
    byCountry: { [key: string]: number };
  };
}

export interface BookmarkUniversityRequest {
  universityId: string;
  isBookmarked: boolean;
}

export interface BookmarkUniversityResponse {
  isBookmarked: boolean;
  message: string;
}

export interface SubmitApplicationRequest {
  universityId: string;
  programId: string;
  documents: {
    type: string;
    url: string;
  }[];
  notes?: string;
}

export interface SubmitApplicationResponse {
  application: UniversityApplication;
  message: string;
}

export interface UniversityComparison {
  universities: University[];
  comparisonData: {
    tuitionFees: { [key: string]: number };
    rankings: { [key: string]: number };
    acceptanceRates: { [key: string]: number };
    programs: { [key: string]: string[] };
    requirements: { [key: string]: UniversityRequirements };
  };
}

export interface UniversityAnalytics {
  universityId: string;
  totalViews: number;
  totalApplications: number;
  totalBookmarks: number;
  popularPrograms: string[];
  topSourceCountries: string[];
  applicationTrends: {
    month: string;
    applications: number;
  }[];
}
