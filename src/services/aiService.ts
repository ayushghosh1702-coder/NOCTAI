import { Project, UserProfile, VivaQuestion, ProjectImprovement, RoadmapPhase } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';

export interface GenerationProgressCallback {
  (step: string, percent: number): void;
}

export interface VivaAnswerEvaluation {
  technicalScore: number;
  clarityScore: number;
  confidenceScore: number;
  feedback: string;
  missingPoints: string[];
}

export interface MentorChatResponse {
  text: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  suggestedActions?: string[];
}

class AIService {
  /**
   * Generates tailored project recommendations based on student input.
   * Simulates realistic LLM pipeline with step-by-step status callbacks.
   */
  async generateProjects(
    profile: Partial<UserProfile>,
    onProgress?: GenerationProgressCallback
  ): Promise<Project[]> {
    if (onProgress) {
      onProgress('Analyzing your skills and technical competencies...', 20);
      await new Promise((r) => setTimeout(r, 600));
      
      onProgress('Finding suitable project domains and matching industry benchmarks...', 45);
      await new Promise((r) => setTimeout(r, 700));

      onProgress('Checking project feasibility, budget constraints, and timeline...', 75);
      await new Promise((r) => setTimeout(r, 700));

      onProgress('Preparing personalized final-year project blueprints...', 95);
      await new Promise((r) => setTimeout(r, 500));
    }

    // Dynamic scoring based on user skills & interests
    const userSkills = profile.skills || ['Python', 'React'];
    const userInterests = profile.interests || ['AI/ML'];

    const scoredProjects = MOCK_PROJECTS.map((proj) => {
      let score = 75;
      const skillOverlap = proj.requiredSkills.filter((s) => userSkills.includes(s)).length;
      score += skillOverlap * 5;
      if (userInterests.includes(proj.domain)) {
        score += 8;
      }
      if (profile.availableTime && proj.duration.includes(profile.availableTime.split(' ')[0])) {
        score += 4;
      }
      return {
        ...proj,
        matchScore: Math.min(98, Math.max(78, score))
      };
    });

    // Return sorted by matchScore
    return scoredProjects.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Computes feasibility metrics for a specific project given student constraints
   */
  async analyzeFeasibility(
    project: Project,
    profile: Partial<UserProfile>
  ): Promise<Project['feasibility']> {
    await new Promise((r) => setTimeout(r, 400));
    
    // Dynamic calculation
    const skillFit = Math.min(96, 75 + (profile.skills?.length || 4) * 3);
    const timeFit = project.duration === profile.availableTime ? 92 : 85;
    const budgetFit = 90;
    const teamFit = profile.teamSize === '1' ? 80 : 92;
    const technologyFit = 89;

    const overall = Math.round((skillFit * 0.35) + (timeFit * 0.25) + (budgetFit * 0.15) + (teamFit * 0.1) + (technologyFit * 0.15));

    return {
      overall,
      skillFit,
      timeFit,
      budgetFit,
      teamFit,
      technologyFit,
      verdict: overall >= 85 ? 'High Feasibility — Highly recommended for your profile' : 'Moderate Feasibility — Plan carefully for dependencies',
      keyChallenge: project.feasibility.keyChallenge
    };
  }

  /**
   * Generates AI mentor conversational guidance for project-specific queries
   */
  async mentorChat(
    project: Project,
    userQuery: string,
    history: { sender: string; text: string }[]
  ): Promise<MentorChatResponse> {
    await new Promise((r) => setTimeout(r, 650));
    const query = userQuery.toLowerCase();

    // Contextual responses based on student questions
    if (query.includes('parsing') || query.includes('resume') || query.includes('pdf')) {
      return {
        text: `For resume parsing in ${project.title}, here is the recommended architecture:\n\n1. Use **PDFMiner.six** or **PyMuPDF** to extract layout-aware text streams (this prevents two-column resumes from scrambling text together).\n2. Feed the extracted clean strings into a **SpaCy NER pipeline** configured with an **EntityRuler** loaded with technical skill dictionaries.\n3. Return a structured JSON document holding candidate contact details, recognized skills, and work timeline blocks.`,
        codeSnippet: {
          language: 'python',
          code: `# FastAPI resume upload & parse endpoint
from fastapi import FastAPI, UploadFile, File, HTTPException
import fitz # PyMuPDF
import spacy

nlp = spacy.load("en_core_web_md")
app = FastAPI()

@app.post("/api/v1/resumes/parse")
async def parse_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file format")
    
    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    full_text = "\\n".join([page.get_text() for page in doc])
    
    doc_nlp = nlp(full_text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc_nlp.ents]
    
    return {"status": "success", "length": len(full_text), "entities": entities}`
        },
        suggestedActions: [
          'How do I test with multi-column PDFs?',
          'How should I calculate the ATS score?',
          'What database schema should I use?'
        ]
      };
    }

    if (query.includes('build next') || query.includes('what next') || query.includes('next step')) {
      return {
        text: `Looking at your project status (${project.progress || 68}% completed, currently in **${project.currentStage || 'Backend Development'}**):\n\nHere is your immediate priority:\n1. Complete the **REST API authentication & file upload routes**.\n2. Connect the **SpaCy skill extraction module** with the database save pipeline.\n3. Build the frontend **drag-and-drop resume upload component** with an upload progress bar.\n\nWould you like me to generate the React component boilerplate or the Pydantic schema for the API response?`,
        suggestedActions: [
          'Show me the Pydantic schema',
          'Help me write the React upload component',
          'How do I handle upload errors gracefully?'
        ]
      };
    }

    if (query.includes('debug') || query.includes('error') || query.includes('fastapi') || query.includes('cors')) {
      return {
        text: `Common backend debugging tip for ${project.title}:\n\nIf you are encountering CORS issues when connecting React to FastAPI, ensure you have mounted \`CORSMiddleware\` before defining your route endpoints. Also make sure your Vite proxy or fetch headers include \`Content-Type: multipart/form-data\` properly when sending files.`,
        codeSnippet: {
          language: 'python',
          code: `from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`
        },
        suggestedActions: [
          'Explain how multipart uploads work',
          'How do I secure JWT tokens in cookies vs headers?',
          'Show me test cases with pytest'
        ]
      };
    }

    if (query.includes('viva') || query.includes('presentation') || query.includes('examiner')) {
      return {
        text: `For your project viva, examiners typically probe three critical dimensions:\n\n1. **Architecture Trade-offs**: Why did you pick this specific stack instead of conventional alternatives? (e.g. FastAPI over Django, PostgreSQL over MongoDB)\n2. **Edge Cases**: What happens when an uploaded file is corrupted, encrypted, or 20MB in size?\n3. **Individual Contribution**: Which specific algorithms or components did you personally design and test?\n\nTip: You can practice answering these in the **Viva Preparation** tab with instant AI feedback!`,
        suggestedActions: [
          'Go to Viva Preparation',
          'Give me an example of an architecture defense',
          'What questions will external examiners ask?'
        ]
      };
    }

    // Default intelligent response
    return {
      text: `Regarding **${project.title}**: ${userQuery}\n\nTo ensure your project meets college evaluation standards, remember to document both your **system architecture diagram** and your **performance benchmarks** (e.g., latency per request, memory footprint, and test accuracy). This makes your presentation stand out significantly over surface-level projects.`,
      suggestedActions: [
        'Explain this in detail',
        'Give me a code example',
        'What should I build next?',
        'Suggest improvements'
      ]
    };
  }

  /**
   * Evaluates student's spoken/written viva answer and provides structured scoring and feedback
   */
  async evaluateVivaAnswer(
    question: VivaQuestion,
    studentAnswer: string
  ): Promise<VivaAnswerEvaluation> {
    await new Promise((r) => setTimeout(r, 700));
    
    const wordCount = studentAnswer.trim().split(/\s+/).length;
    const answerLower = studentAnswer.toLowerCase();

    // Check how many sample evaluation keypoints are reflected in the answer
    const keypointsMatched = question.sampleEvaluationKeypoints.filter((point) => {
      const words = point.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
      return words.some((w) => answerLower.includes(w));
    });

    const matchRatio = keypointsMatched.length / Math.max(1, question.sampleEvaluationKeypoints.length);

    let technicalScore = Math.min(98, Math.max(55, Math.round(60 + matchRatio * 35 + (wordCount > 30 ? 5 : 0))));
    let clarityScore = wordCount > 25 ? 90 : 70;
    let confidenceScore = wordCount > 40 ? 92 : 78;

    const missingPoints = question.sampleEvaluationKeypoints.filter(
      (_, idx) => !keypointsMatched.includes(question.sampleEvaluationKeypoints[idx])
    );

    let feedback = '';
    if (technicalScore >= 85) {
      feedback = 'Excellent answer! You demonstrated solid architectural understanding, referenced concrete technical mechanics, and justified your choices logically.';
    } else if (technicalScore >= 70) {
      feedback = 'Good response! You captured the main objective, but to score top marks during the final viva, make sure to explicitly cite technical metrics, concurrency mechanisms, and concrete library names.';
    } else {
      feedback = 'A bit brief. External examiners expect you to explain the "why" and underlying mechanisms rather than just giving a surface-level statement. Review the suggested points below.';
    }

    return {
      technicalScore,
      clarityScore,
      confidenceScore,
      feedback,
      missingPoints: missingPoints.length > 0 ? missingPoints : ['Consider quantifying performance improvements with real numbers (e.g. 40% latency reduction)']
    };
  }

  /**
   * Generates or regenerates academic project report sections
   */
  async generateDocumentation(
    project: Project,
    section: keyof Project['documentationDrafts']
  ): Promise<string> {
    await new Promise((r) => setTimeout(r, 600));
    const existing = project.documentationDrafts[section];
    if (existing) {
      return existing;
    }
    return `Draft for ${String(section)} generated for ${project.title}. This academic draft incorporates methodology, technical objectives, and experimental verification criteria.`;
  }

  /**
   * Generates new innovative feature improvements
   */
  async generateImprovements(project: Project): Promise<ProjectImprovement[]> {
    await new Promise((r) => setTimeout(r, 500));
    return project.improvements;
  }

  /**
   * Generates project recommendations from generator form parameters
   */
  async generateProjectRecommendations(params: {
    skills: string[];
    domain: string;
    experienceLevel: string;
    availableTimeWeeks: number;
    teamSize: number;
    budget: string;
    careerGoal: string;
  }): Promise<Project[]> {
    // Artificial delay to allow loading step presentation
    await new Promise((r) => setTimeout(r, 3800));

    // Calculate match scores according to skills and domain
    const scored = MOCK_PROJECTS.map((proj) => {
      let score = 75;
      const skillMatches = proj.requiredSkills.filter((s) =>
        params.skills.some((userSkill) => userSkill.toLowerCase() === s.toLowerCase())
      ).length;
      score += skillMatches * 6;

      if (proj.domain.toLowerCase() === params.domain.toLowerCase()) {
        score += 10;
      }
      if (proj.difficulty.toLowerCase() === params.experienceLevel.toLowerCase()) {
        score += 5;
      }
      const finalScore = Math.min(96, Math.max(76, score));
      return {
        ...proj,
        matchScore: finalScore
      };
    });

    // Return top 3 recommendations
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }
}

export const aiService = new AIService();
