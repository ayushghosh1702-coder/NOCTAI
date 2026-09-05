import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, UserProfile, RoadmapTask, TaskStatus, VivaQuestion, ProjectImprovement, MentorMessage } from '../types';
import { DEFAULT_USER_PROFILE, MOCK_PROJECTS } from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  user: UserProfile | null;
  userProfile?: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  activeProject: Project;
  savedProjectIds: string[];
  toggleSaveProject: (projectId: string) => void;
  updateTaskStatus: (projectId: string, phaseId: string, taskId: string, newStatus: TaskStatus) => void;
  addCustomTask: (projectId: string, phaseId: string, task: Omit<RoadmapTask, 'id' | 'status' | 'isCustom'>) => void;
  addImprovementToRoadmap: (projectId: string, improvementId: string) => void;
  saveVivaAnswerEvaluation: (projectId: string, questionId: string, answer: string, evalResult: NonNullable<VivaQuestion['evaluationResult']>) => void;
  updateDocumentationDraft: (projectId: string, section: keyof Project['documentationDrafts'], content: string) => void;
  mentorMessages: Record<string, MentorMessage[]>;
  addMentorMessage: (projectId: string, message: MentorMessage) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  loginAsDemo: () => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'pm_ai_user';
const LOCAL_STORAGE_KEY_PROJECTS = 'pm_ai_projects';
const LOCAL_STORAGE_KEY_SAVED = 'pm_ai_saved_ids';
const LOCAL_STORAGE_KEY_ACTIVE_PROJECT = 'pm_ai_active_project_id';
const LOCAL_STORAGE_KEY_CHAT = 'pm_ai_chat_history';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          (parsed.name?.toLowerCase().includes('arjun') ||
            parsed.college?.toLowerCase().includes('surathkal') ||
            parsed.college?.toLowerCase().includes('national institute'))
        ) {
          parsed.name = 'Ayush';
          parsed.college = 'PARUL UNIVERSITY';
          localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return DEFAULT_USER_PROFILE; // Default demo student
  });

  // 2. Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return MOCK_PROJECTS;
  });

  // 3. Saved Projects List
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved IDs', e);
      }
    }
    return ['ai-resume-analyzer', 'smart-agri-crop-disease'];
  });

  // 4. Active Project
  const [activeProjectId, setActiveProjectIdState] = useState<string>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVE_PROJECT);
    return saved || 'ai-resume-analyzer';
  });

  // 5. Mentor Chat Messages
  const [mentorMessages, setMentorMessages] = useState<Record<string, MentorMessage[]>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CHAT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved chats', e);
      }
    }
    return {
      'ai-resume-analyzer': [
        {
          id: 'msg_welcome',
          sender: 'mentor',
          text: `Welcome to **AI Resume Analyzer** mentorship! I'm your dedicated AI Project Mentor.\n\nI have full context on your tech stack (**FastAPI, React, SpaCy, PostgreSQL**) and your current roadmap phase (**Backend Development**).\n\nAsk me anything about system architecture, writing endpoints, training NER models, debugging errors, or preparing for your project viva.`,
          timestamp: 'Just now',
          suggestedActions: [
            'How should I implement the resume parsing feature?',
            'What should I build next?',
            'Give me an example of an architecture defense',
            'Help me debug CORS / FastAPI issues'
          ]
        },
        {
          id: 'msg_student_sample',
          sender: 'student',
          text: 'How should I implement the resume parsing feature?',
          timestamp: '2 mins ago'
        },
        {
          id: 'msg_mentor_sample',
          sender: 'mentor',
          text: `Start by creating a document upload endpoint in FastAPI. Then extract text from the uploaded PDF using **PDFMiner.six** or **PyMuPDF**, and pass the extracted content to your **SpaCy NLP processing pipeline**.\n\nHere is a production-tested skeleton endpoint:`,
          timestamp: '1 min ago',
          codeSnippet: {
            language: 'python',
            code: `@app.post("/api/v1/resumes/parse")
async def parse_resume(file: UploadFile = File(...)):
    # 1. Validate MIME type
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Unsupported document format")
    
    # 2. Extract text buffer
    contents = await file.read()
    raw_text = extract_pdf_stream(contents)
    
    # 3. Named Entity Recognition
    doc = nlp(raw_text)
    skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]
    
    return {"extracted_skills": skills, "status": "processed"}`
          },
          suggestedActions: [
            'How do I test multi-column resumes?',
            'What database schema should I use?',
            'How is the ATS score computed?'
          ]
        }
      ]
    };
  });

  // 6. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVE_PROJECT, activeProjectId);
  }, [activeProjectId]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CHAT, JSON.stringify(mentorMessages));
  }, [mentorMessages]);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActiveProjectId = (id: string) => {
    setActiveProjectIdState(id);
    if (user) {
      setUser((prev) => (prev ? { ...prev, currentProjectId: id } : prev));
    }
  };

  const toggleSaveProject = (projectId: string) => {
    setSavedProjectIds((prev) => {
      const isSaved = prev.includes(projectId);
      if (isSaved) {
        addToast('Project removed from saved projects', 'info');
        return prev.filter((id) => id !== projectId);
      } else {
        addToast('Project added to saved projects! View it anytime.', 'success');
        return [...prev, projectId];
      }
    });

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const updateTaskStatus = (
    projectId: string,
    phaseId: string,
    taskId: string,
    newStatus: TaskStatus
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;

        let totalTasks = 0;
        let completedTasks = 0;

        const updatedPhases = proj.roadmap.map((ph) => {
          const updatedTasks = ph.tasks.map((task) => {
            totalTasks += 1;
            if (ph.id === phaseId && task.id === taskId) {
              if (newStatus === 'completed') completedTasks += 1;
              return { ...task, status: newStatus };
            }
            if (task.status === 'completed') completedTasks += 1;
            return task;
          });
          return { ...ph, tasks: updatedTasks };
        });

        const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return {
          ...proj,
          progress: newProgress,
          roadmap: updatedPhases
        };
      })
    );
    addToast(`Task marked as ${newStatus.replace('-', ' ')}`, 'info');
  };

  const addCustomTask = (
    projectId: string,
    phaseId: string,
    taskData: Omit<RoadmapTask, 'id' | 'status' | 'isCustom'>
  ) => {
    const newTask: RoadmapTask = {
      id: `task_custom_${Date.now()}`,
      ...taskData,
      status: 'not-started',
      isCustom: true
    };

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          roadmap: proj.roadmap.map((ph) =>
            ph.id === phaseId ? { ...ph, tasks: [...ph.tasks, newTask] } : ph
          )
        };
      })
    );
    addToast('Custom task added to your roadmap!', 'success');
  };

  const addImprovementToRoadmap = (projectId: string, improvementId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;

        const imp = proj.improvements.find((i) => i.id === improvementId);
        if (!imp) return proj;

        const targetPhase = proj.roadmap[proj.roadmap.length - 1]; // add to last phase or development phase
        if (!targetPhase) return proj;

        const newTask: RoadmapTask = {
          id: `task_imp_${improvementId}_${Date.now()}`,
          title: `[Improvement] ${imp.title}`,
          description: imp.description,
          status: 'not-started',
          estimatedDays: imp.difficulty === 'Hard' ? 6 : imp.difficulty === 'Medium' ? 4 : 2,
          deliverable: `${imp.title} functional delivery`,
          isCustom: true
        };

        const updatedRoadmap = proj.roadmap.map((ph) =>
          ph.id === targetPhase.id ? { ...ph, tasks: [...ph.tasks, newTask] } : ph
        );

        const updatedImprovements = proj.improvements.map((i) =>
          i.id === improvementId ? { ...i, addedToRoadmap: true } : i
        );

        return {
          ...proj,
          improvements: updatedImprovements,
          roadmap: updatedRoadmap
        };
      })
    );
    addToast('Improvement successfully scheduled in roadmap tasks!', 'success');
  };

  const saveVivaAnswerEvaluation = (
    projectId: string,
    questionId: string,
    answer: string,
    evalResult: NonNullable<VivaQuestion['evaluationResult']>
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          vivaQuestions: proj.vivaQuestions.map((vq) =>
            vq.id === questionId
              ? { ...vq, studentAnswer: answer, evaluationResult: evalResult }
              : vq
          )
        };
      })
    );
    addToast(`Answer evaluated! Technical score: ${evalResult.technicalScore}%`, 'success');
  };

  const updateDocumentationDraft = (
    projectId: string,
    section: keyof Project['documentationDrafts'],
    content: string
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          documentationDrafts: {
            ...proj.documentationDrafts,
            [section]: content
          }
        };
      })
    );
    addToast(`Saved draft changes for ${section}!`, 'success');
  };

  const addMentorMessage = (projectId: string, message: MentorMessage) => {
    setMentorMessages((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), message]
    }));
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_USER_PROFILE);
    setActiveProjectId('ai-resume-analyzer');
    addToast('Logged in as Demo Student (Ayush)', 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : ({ ...DEFAULT_USER_PROFILE, ...updates } as UserProfile)));
    addToast('Profile updated successfully!', 'success');
  };

  const resetDemoData = () => {
    setUser(DEFAULT_USER_PROFILE);
    setProjects(MOCK_PROJECTS);
    setSavedProjectIds(['ai-resume-analyzer', 'smart-agri-crop-disease']);
    setActiveProjectId('ai-resume-analyzer');
    localStorage.clear();
    addToast('Demo data refreshed to default state', 'info');
  };

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0] || MOCK_PROJECTS[0];

  return (
    <AppContext.Provider
      value={{
        user,
        userProfile: user,
        setUser,
        projects,
        setProjects,
        activeProjectId,
        setActiveProjectId,
        activeProject,
        savedProjectIds,
        toggleSaveProject,
        updateTaskStatus,
        addCustomTask,
        addImprovementToRoadmap,
        saveVivaAnswerEvaluation,
        updateDocumentationDraft,
        mentorMessages,
        addMentorMessage,
        toasts,
        addToast,
        removeToast,
        loginAsDemo,
        logout,
        updateUserProfile,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
