import React, { useState } from 'react';
import { Project, VivaQuestion, VivaCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import kuchuPuchuAvatar from '../../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import vivaBannerImage from '../../assets/images/engineering_lab_banner_1788586156748.jpg';
import {
  Mic,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface VivaCoachProps {
  project: Project;
}

export const VivaCoach: React.FC<VivaCoachProps> = ({ project }) => {
  const { saveVivaAnswerEvaluation } = useApp();
  const [activeCategory, setActiveCategory] = useState<VivaCategory | 'all'>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<VivaQuestion>(
    project.vivaQuestions[0]
  );
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<string[]>([]);
  const [studentInput, setStudentInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const categories: { label: string; value: VivaCategory | 'all' }[] = [
    { label: 'All Questions', value: 'all' },
    { label: 'Architecture', value: 'architecture' },
    { label: 'Technical', value: 'technical' },
    { label: 'AI / ML', value: 'aiml' },
    { label: 'Database', value: 'database' },
    { label: 'Basic', value: 'basic' },
    { label: 'Advanced', value: 'advanced' }
  ];

  const filteredQuestions =
    activeCategory === 'all'
      ? project.vivaQuestions
      : project.vivaQuestions.filter((q) => q.category === activeCategory);

  const toggleReveal = (qId: string) => {
    setRevealedAnswerIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInput.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const evalResult = await aiService.evaluateVivaAnswer(selectedQuestion, studentInput);
      saveVivaAnswerEvaluation(project.id, selectedQuestion.id, studentInput, evalResult);
      // update local question reference
      setSelectedQuestion((prev) => ({
        ...prev,
        studentAnswer: studentInput,
        evaluationResult: evalResult
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="relative h-28 sm:h-36 w-full overflow-hidden">
          <img
            src={vivaBannerImage}
            alt="Students Viva Defense Preparation"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-indigo-950/40" />
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Viva Voce Defense Simulator
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
                Examiner Mode
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ace Your Final-Year Project Viva Defense
            </h3>
            <p className="text-xs text-slate-200 line-clamp-1 max-w-xl mt-0.5">
              Practice cross-questioning with Kuchu Puchu before facing your external college evaluation committee.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-indigo-300 shadow-2xs shrink-0">
              <img
                src={kuchuPuchuAvatar}
                alt="Kuchu Puchu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Evaluated by Kuchu Puchu AI</p>
              <p className="text-[11px] text-slate-500">Grading rubric calibrated against IEEE & university accreditation standards</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 shrink-0 self-start sm:self-auto">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>{project.vivaQuestions.length} Defense Questions</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeCategory === cat.value
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Question List (Left) and Defense Arena (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Questions Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Questions ({filteredQuestions.length})
          </p>
          {filteredQuestions.map((q, idx) => {
            const isSelected = selectedQuestion?.id === q.id;
            const hasEvaluated = Boolean(q.evaluationResult);

            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestion(q);
                  setStudentInput(q.studentAnswer || '');
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3 group ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {q.category}
                    </span>
                    {hasEvaluated && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Score: {q.evaluationResult?.technicalScore}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-2">
                    {q.question}
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Defense & Answer Workspace */}
        <div className="lg:col-span-7 rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-6">
          {selectedQuestion ? (
            <>
              {/* Question Header */}
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Category: {selectedQuestion.category.toUpperCase()}
                  </span>
                  <button
                    onClick={() => toggleReveal(selectedQuestion.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
                  >
                    {revealedAnswerIds.includes(selectedQuestion.id) ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Model Answer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show Model Answer</span>
                      </>
                    )}
                  </button>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedQuestion.question}
                </h4>
              </div>

              {/* Revealed Model Answer Card */}
              {revealedAnswerIds.includes(selectedQuestion.id) && (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Technical Answer (Examiner Expectation)</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {selectedQuestion.suggestedAnswer}
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      Key Concepts Examiners Look For:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-emerald-800">
                      {selectedQuestion.sampleEvaluationKeypoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Try Answering Form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Try Answering in Your Own Words</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Type your answer as if speaking to an external evaluator
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={studentInput}
                  onChange={(e) => setStudentInput(e.target.value)}
                  placeholder="e.g., We chose FastAPI over Django because of its asynchronous ASGI throughput which avoids worker thread blocking when ingesting PDF streams..."
                  className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handleEvaluateAnswer}
                    disabled={!studentInput.trim() || isEvaluating}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEvaluating ? 'Evaluating Answer...' : 'Evaluate My Answer'}</span>
                  </button>
                </div>
              </div>

              {/* Evaluation Feedback Scorecard */}
              {selectedQuestion.evaluationResult && (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-indigo-300 shadow-2xs shrink-0">
                        <img
                          src={kuchuPuchuAvatar}
                          alt="Kuchu Puchu"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Kuchu Puchu's Viva Evaluation
                        </p>
                        <p className="text-[10px] text-slate-500">Live Examiner Assessment</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
                      Overall: {selectedQuestion.evaluationResult.technicalScore}%
                    </span>
                  </div>

                  {/* 3 Metric Gauges */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                      <p className="text-base font-extrabold text-indigo-600">
                        {selectedQuestion.evaluationResult.technicalScore}%
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                        Technical Depth
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                      <p className="text-base font-extrabold text-emerald-600">
                        {selectedQuestion.evaluationResult.clarityScore}%
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                        Clarity
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                      <p className="text-base font-extrabold text-blue-600">
                        {selectedQuestion.evaluationResult.confidenceScore}%
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                        Confidence
                      </p>
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <p className="text-xs text-slate-700 leading-relaxed p-3 rounded-lg bg-white border border-slate-200">
                    {selectedQuestion.evaluationResult.feedback}
                  </p>

                  {/* Missing Points Checklist */}
                  {selectedQuestion.evaluationResult.missingPoints.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Key Points to Add for Full Marks:</span>
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {selectedQuestion.evaluationResult.missingPoints.map((mp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{mp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-slate-500">Select a question to practice.</p>
          )}
        </div>
      </div>
    </div>
  );
};
