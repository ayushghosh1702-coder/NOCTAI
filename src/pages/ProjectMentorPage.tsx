import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MentorChat } from '../components/mentor/MentorChat';

export const ProjectMentorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, activeProject } = useApp();

  const currentProject = projects.find((p) => p.id === id) || activeProject;

  return (
    <div className="space-y-6">
      <MentorChat project={currentProject} />
    </div>
  );
};
