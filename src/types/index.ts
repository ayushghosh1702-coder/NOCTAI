export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TeamSize = '1' | '2' | '3' | '4' | '5+';
export type BudgetBracket = '₹0–₹1,000' | '₹1,000–₹5,000' | '₹5,000–₹10,000' | '₹10,000+';
export type AvailableTime = '4 weeks' | '6 weeks' | '8 weeks' | '10 weeks' | '12 weeks' | '16+ weeks';
export type TaskStatus = 'not-started' | 'in-progress' | 'completed';
export type FeatureTier = 'mvp' | 'advanced' | 'innovative' | 'industry';
export type VivaCategory = 'basic' | 'technical' | 'architecture' | 'database' | 'aiml' | 'advanced';
export type ImprovementCategory = 'innovation' | 'performance' | 'security' | 'ux' | 'scalability';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  degree: string;
  year: string;
  skills: string[];
  interests: string[];
  experience: ExperienceLevel;
  teamSize: TeamSize;
  budget: BudgetBracket;
  availableTime: AvailableTime;
  careerGoal: string;
  profileCompleted: boolean;
  avatarUrl?: string;
  currentProjectId?: string;
}

export interface FeasibilityBreakdown {
  overall: number; // 0 - 100
  skillFit: number;
  timeFit: number;
  budgetFit: number;
  teamFit: number;
  technologyFit: number;
  verdict: string;
  keyChallenge: string;
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  tier: FeatureTier;
  difficulty: 'Low' | 'Medium' | 'High';
  expectedImpact: 'Moderate' | 'High' | 'Transformative';
}

export interface TechnologyItem {
  category: 'Frontend' | 'Backend' | 'Database' | 'AI / ML' | 'Authentication' | 'Deployment' | 'Cloud & Storage' | 'APIs & Libraries';
  name: string;
  badge: string;
  whyUseThis: string;
  alternatives?: string[];
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'client' | 'api' | 'service' | 'storage' | 'external';
  description: string;
  technologies: string[];
}

export interface ArchitectureFlow {
  from: string;
  to: string;
  label: string;
  protocol: string;
}

export interface SystemArchitecture {
  summary: string;
  nodes: ArchitectureNode[];
  flows: ArchitectureFlow[];
  dataFlowDescription: string;
  securityPractices: string[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  estimatedDays: number;
  deliverable: string;
  isCustom?: boolean;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  name: string;
  description: string;
  duration: string;
  tasks: RoadmapTask[];
}

export interface VivaQuestion {
  id: string;
  question: string;
  category: VivaCategory;
  suggestedAnswer: string;
  sampleEvaluationKeypoints: string[];
  studentAnswer?: string;
  evaluationResult?: {
    technicalScore: number; // 0 - 100
    clarityScore: number;
    confidenceScore: number;
    feedback: string;
    missingPoints: string[];
  };
}

export interface ProjectImprovement {
  id: string;
  title: string;
  category: ImprovementCategory;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  addedToRoadmap?: boolean;
  technicalSteps: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl?: string;
  matchScore: number; // 0 - 100
  difficulty: ExperienceLevel;
  duration: AvailableTime;
  budget: string;
  domain: string;
  requiredSkills: string[];
  technologies: string[];
  careerRelevance: string;
  problemStatement: string;
  objectives: string[];
  targetUsers: string[];
  expectedOutcome: string;
  whyThisProject: string;
  feasibility: FeasibilityBreakdown;
  features: ProjectFeature[];
  techStack: TechnologyItem[];
  architecture: SystemArchitecture;
  roadmap: RoadmapPhase[];
  vivaQuestions: VivaQuestion[];
  improvements: ProjectImprovement[];
  documentationDrafts: {
    abstract: string;
    introduction: string;
    problemStatement: string;
    objectives: string;
    methodology: string;
    systemRequirements: string;
    futureScope: string;
    conclusion: string;
  };
  isSaved?: boolean;
  progress?: number;
  completedStages?: string[];
  currentStage?: string;
  nextStage?: string;
}

export interface MentorMessage {
  id: string;
  sender: 'student' | 'mentor';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  suggestedActions?: string[];
}
