import React, { useState } from 'react';
import { SystemArchitecture, ArchitectureNode } from '../../types';
import {
  User,
  Layout,
  Server,
  Lock,
  Cpu,
  Database,
  Cloud,
  ArrowDown,
  ShieldAlert,
  Layers,
  Info
} from 'lucide-react';

interface ArchitectureDiagramProps {
  architecture: SystemArchitecture;
  projectTitle: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  architecture,
  projectTitle
}) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(architecture.nodes[1] || architecture.nodes[0]);

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'client':
        return Layout;
      case 'api':
        return Server;
      case 'service':
        return Cpu;
      case 'storage':
        return Database;
      case 'external':
        return Cloud;
      default:
        return Layers;
    }
  };

  const getNodeTypeBadge = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'client':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'api':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'service':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'storage':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'external':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual System Architecture Canvas */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Interactive System Architecture & Microservice Topology
            </h3>
            <p className="text-xs text-slate-500">
              Click any node in the pipeline to inspect data contracts, libraries, and communication protocols.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
            {architecture.nodes.length} Connected Subsystems
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Node Flow Stack */}
          <div className="lg:col-span-7 flex flex-col items-center gap-2">
            {architecture.nodes.map((node, index) => {
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode?.id === node.id;

              return (
                <React.Fragment key={node.id}>
                  {/* Node Card */}
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full max-w-md p-4 rounded-xl text-left transition-all duration-200 border flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-4 ring-indigo-500/15'
                        : 'bg-slate-50/80 hover:bg-white text-slate-900 border-slate-200 hover:border-indigo-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : 'bg-white text-indigo-600 shadow-2xs border border-slate-200/80'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold truncate">{node.name}</p>
                        </div>
                        <p
                          className={`text-xs truncate ${
                            isSelected ? 'text-indigo-100' : 'text-slate-500'
                          }`}
                        >
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white border-white/30'
                          : getNodeTypeBadge(node.type)
                      }`}
                    >
                      {node.type}
                    </span>
                  </button>

                  {/* Flow Arrow with Protocol Label */}
                  {index < architecture.nodes.length - 1 && (
                    <div className="flex flex-col items-center my-0.5 py-1 text-slate-400">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600">
                        <span>↓</span>
                        <span>
                          {architecture.flows[index]?.label || 'REST / JSON'}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-5 sticky top-24 rounded-2xl bg-slate-50/80 p-5 border border-slate-200/90 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Info className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Subsystem Inspector</span>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-base font-extrabold text-slate-900">
                      {selectedNode.name}
                    </h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getNodeTypeBadge(selectedNode.type)}`}>
                      {selectedNode.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Engineered Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Role in System Pipeline
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Operates as an isolated decoupled boundary. In high-throughput scenarios, requests are buffered via asynchronous message workers to prevent blocking client requests.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Select a node from the stack to see details.</p>
            )}
          </div>
        </div>
      </div>

      {/* Architecture Explanation & Flow Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <Layers className="w-4 h-4" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              End-to-End Data Lifecycle
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
            {architecture.dataFlowDescription}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <ShieldAlert className="w-4 h-4" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Security & Defense Standards
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            {architecture.securityPractices.map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
