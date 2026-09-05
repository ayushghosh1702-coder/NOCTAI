import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { VivaCoach } from '../components/viva/VivaCoach';

export const ProjectVivaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, activeProject } = useApp();

  const currentProject = projects.find((p) => p.id === id) || activeProject;

  return (
    <div className="space-y-6">
      <VivaCoach project={currentProject} />
    </div>
  );
};
