import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DocumentationEditor } from '../components/documentation/DocumentationEditor';

export const ProjectDocumentationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, activeProject } = useApp();

  const currentProject = projects.find((p) => p.id === id) || activeProject;

  return (
    <div className="space-y-6">
      <DocumentationEditor project={currentProject} />
    </div>
  );
};
