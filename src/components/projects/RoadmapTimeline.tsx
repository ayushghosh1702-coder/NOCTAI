import React, { useState } from 'react';
import { Project, RoadmapPhase, TaskStatus, RoadmapTask } from '../../types';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../ui/ProgressBar';
import {
  CheckCircle2,
  Clock,
  Circle,
  Plus,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

interface RoadmapTimelineProps {
  project: Project;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ project }) => {
  const { updateTaskStatus, addCustomTask } = useApp();
  const [activePhaseFilter, setActivePhaseFilter] = useState<string>('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState(project.roadmap[0]?.id || '');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDeliverable, setNewTaskDeliverable] = useState('');
  const [newTaskDays, setNewTaskDays] = useState(3);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-indigo-600 fill-indigo-100" />;
      default:
        return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addCustomTask(project.id, selectedPhaseId, {
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'Custom student implementation task',
      deliverable: newTaskDeliverable.trim() || 'Functional code unit',
      estimatedDays: Number(newTaskDays) || 3
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDeliverable('');
    setShowAddTaskModal(false);
  };

  // Calculate task counts
  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;

  project.roadmap.forEach((phase) => {
    phase.tasks.forEach((t) => {
      totalTasks++;
      if (t.status === 'completed') completedTasks++;
      if (t.status === 'in-progress') inProgressTasks++;
    });
  });

  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredPhases =
    activePhaseFilter === 'all'
      ? project.roadmap
      : project.roadmap.filter((p) => p.id === activePhaseFilter);

  return (
    <div className="space-y-6">
      {/* Top Banner: Progress and Stats */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Interactive Development Timeline
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Project Roadmap & Task Milestones
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mark tasks as you develop. Progress updates dynamically and influences your AI Mentor advice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedPhaseId(project.roadmap[2]?.id || project.roadmap[0]?.id || '');
                setShowAddTaskModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Task</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Overall Progress</span>
              <span className="text-indigo-600">{progressPercentage}% Completed</span>
            </div>
            <ProgressBar progress={progressPercentage} size="md" color="indigo" />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {completedTasks}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Completed</p>
              <p className="text-[11px] text-slate-500">of {totalTasks} total tasks</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {inProgressTasks}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">In Progress</p>
              <p className="text-[11px] text-slate-500">Active sprint tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActivePhaseFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activePhaseFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
          }`}
        >
          All Phases ({project.roadmap.length})
        </button>
        {project.roadmap.map((ph) => (
          <button
            key={ph.id}
            onClick={() => setActivePhaseFilter(ph.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              activePhaseFilter === ph.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
            }`}
          >
            Phase {ph.phaseNumber}: {ph.name}
          </button>
        ))}
      </div>

      {/* Timeline Phases */}
      <div className="space-y-6">
        {filteredPhases.map((phase) => {
          const phaseTotal = phase.tasks.length;
          const phaseCompleted = phase.tasks.filter((t) => t.status === 'completed').length;
          const phasePercent = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;

          return (
            <div
              key={phase.id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden"
            >
              {/* Phase Header */}
              <div className="bg-slate-50/70 p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-xs shrink-0 border border-indigo-200">
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">{phase.name}</h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">
                      {phaseCompleted}/{phaseTotal} Done
                    </p>
                    <p className="text-[10px] text-slate-500">{phasePercent}% Complete</p>
                  </div>
                  <div className="w-16">
                    <ProgressBar progress={phasePercent} size="sm" color="indigo" />
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="divide-y divide-slate-100">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => {
                          const nextStatus: TaskStatus =
                            task.status === 'not-started'
                              ? 'in-progress'
                              : task.status === 'in-progress'
                              ? 'completed'
                              : 'not-started';
                          updateTaskStatus(project.id, phase.id, task.id, nextStatus);
                        }}
                        className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
                        title="Click to cycle status"
                      >
                        {getStatusIcon(task.status)}
                      </button>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`text-sm font-bold ${
                              task.status === 'completed'
                                ? 'text-slate-500 line-through'
                                : 'text-slate-900'
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.isCustom && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              Custom
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span>Deliverable: <strong className="text-slate-700 font-semibold">{task.deliverable}</strong></span>
                          <span>•</span>
                          <span>Est: {task.estimatedDays} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Dropdown / Buttons */}
                    <div className="flex items-center gap-2 shrink-0 sm:self-center pl-8 sm:pl-0">
                      {(['not-started', 'in-progress', 'completed'] as TaskStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateTaskStatus(project.id, phase.id, task.id, status)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            task.status === status
                              ? getStatusBadge(status)
                              : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {status === 'not-started'
                            ? 'Not Started'
                            : status === 'in-progress'
                            ? 'In Progress'
                            : 'Completed'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Custom Milestone Task</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add a specialized feature or university-mandated task to your development roadmap.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Phase</label>
                <select
                  value={selectedPhaseId}
                  onChange={(e) => setSelectedPhaseId(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {project.roadmap.map((ph) => (
                    <option key={ph.id} value={ph.id}>
                      Phase {ph.phaseNumber}: {ph.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement WebSockets for real-time progress"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Explain what needs to be constructed..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deliverable</label>
                  <input
                    type="text"
                    placeholder="e.g. WebSocket router in FastAPI"
                    value={newTaskDeliverable}
                    onChange={(e) => setNewTaskDeliverable(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Days</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newTaskDays}
                    onChange={(e) => setNewTaskDays(Number(e.target.value))}
                    className="w-full text-xs rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Add to Roadmap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
