import React, { useState } from 'react';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import {
  FileText,
  Copy,
  Check,
  RefreshCw,
  Save,
  Download,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';

interface DocumentationEditorProps {
  project: Project;
}

export const DocumentationEditor: React.FC<DocumentationEditorProps> = ({ project }) => {
  const { updateDocumentationDraft, addToast } = useApp();
  const [selectedSection, setSelectedSection] =
    useState<keyof Project['documentationDrafts']>('abstract');
  const [currentText, setCurrentText] = useState(
    project.documentationDrafts.abstract || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const sections: { key: keyof Project['documentationDrafts']; label: string; desc: string }[] = [
    { key: 'abstract', label: 'Abstract', desc: '150-250 word executive project summary' },
    { key: 'introduction', label: 'Introduction', desc: 'Academic background & domain context' },
    { key: 'problemStatement', label: 'Problem Statement', desc: 'Core pain points & industry failure modes' },
    { key: 'objectives', label: 'Objectives', desc: 'Target measurable milestones & scope' },
    { key: 'methodology', label: 'Methodology', desc: 'Algorithmic approach & pipeline flow' },
    { key: 'systemRequirements', label: 'System Requirements', desc: 'Hardware & software environment prerequisites' },
    { key: 'futureScope', label: 'Future Scope', desc: 'Next-generation enhancements & scalability' },
    { key: 'conclusion', label: 'Conclusion', desc: 'Summary of contributions & outcomes' }
  ];

  const handleSelectSection = (key: keyof Project['documentationDrafts']) => {
    setSelectedSection(key);
    setCurrentText(project.documentationDrafts[key] || '');
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await aiService.generateDocumentation(project, selectedSection);
      setCurrentText(generated);
      updateDocumentationDraft(project.id, selectedSection, generated);
      addToast(`Regenerated draft for ${selectedSection}`, 'success');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    updateDocumentationDraft(project.id, selectedSection, currentText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setHasCopied(true);
    addToast('Copied section draft to clipboard!', 'info');
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleExportFullReport = () => {
    const fullDoc = Object.entries(project.documentationDrafts)
      .map(([k, v]) => `## ${k.toUpperCase()}\n\n${v}\n\n---\n`)
      .join('\n');

    const blob = new Blob([`# ${project.title} - Academic Project Synopsis\n\n${fullDoc}`], {
      type: 'text/markdown'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}-project-report-draft.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Project synopsis downloaded as Markdown!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Academic Synopsis & Report Generator
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              IEEE / University Format
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Project Documentation Drafts
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Auto-generate IEEE-compliant project report drafts. Review and edit each section before exporting to Word, LaTeX, or Markdown.
          </p>
        </div>

        <button
          onClick={handleExportFullReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Report (.MD)</span>
        </button>
      </div>

      {/* Editor Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sections Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Report Chapters
          </p>
          {sections.map((sec) => {
            const isSelected = selectedSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => handleSelectSection(sec.key)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {sec.label}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{sec.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Area / Live Draft Editor */}
        <div className="lg:col-span-8 rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-4">
          {/* Editor Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Chapter Editing
              </span>
              <h4 className="text-base font-extrabold text-slate-900">
                {sections.find((s) => s.key === selectedSection)?.label}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors disabled:opacity-50"
                title="Regenerate with AI"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-indigo-600' : ''}`} />
                <span>{isGenerating ? 'Regenerating...' : 'Regenerate'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>

          {/* Academic Draft Notice */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <strong>Draft Note:</strong> Academic guidelines require you to review, personalize, and calibrate this draft with your team's specific test results and dataset sizes before submission to your college project guide.
            </p>
          </div>

          {/* Editable Text Area */}
          <div>
            <textarea
              rows={16}
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder="Draft content..."
              className="w-full text-xs sm:text-sm font-mono leading-relaxed p-4 rounded-xl border border-slate-300 text-slate-800 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition-colors resize-y"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Word count: {currentText.trim() ? currentText.trim().split(/\s+/).length : 0} words</span>
            <span>Auto-synced with Project Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};
