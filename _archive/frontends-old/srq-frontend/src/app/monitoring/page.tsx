'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Layers,
  Lock,
  FileText,
  Target,
  Lightbulb,
  PenTool,
  Factory,
  Rocket,
  Zap as ZapIcon,
  RefreshCw,
  Briefcase,
  ClipboardList,
  Monitor,
  Settings,
  CheckCircle,
  Circle,
  Unlock,
  Clock,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

// Types pour le Master SOP
type PhaseStatus = 'completed' | 'in-progress' | 'not-started' | 'blocked' | 'at-risk';
type GateStatus = 'passed' | 'pending' | 'blocked' | 'not-applicable';

interface Criterion {
  id: string;
  name: string;
  completed: boolean;
}

interface Dimension {
  completionPercent: number;
  criteria: Criterion[];
}

interface Gate {
  id: string;
  name: string;
  description: string;
  status: GateStatus;
  criteria: Criterion[];
}

interface SubSOP {
  id: string;
  code: string;
  name: string;
  description: string;
  dimension: 'business' | 'administrative' | 'technology' | 'engineering';
  status: PhaseStatus;
  completionPercent: number;
  owner?: string;
}

interface Phase {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: PhaseStatus;
  completionPercent: number;
  dimensions: {
    business: Dimension;
    administrative: Dimension;
    technology: Dimension;
    engineering: Dimension;
  };
  gate: Gate;
  subSOPs: SubSOP[];
}

// Données mock du projet SOP
const mockSOPProject = {
  name: 'Qatar 100MW Bitcoin Mining Facility',
  capacity: '100MW',
  location: 'Doha, Qatar',
  owner: 'Hearst Corporation',
  currentPhase: 'deployment' as const,
  overallProgress: 67.5,
  phases: [
    {
      id: 'strategic-intent',
      name: 'Strategic Intent',
      shortName: 'Intent',
      description: 'Définition de la vision stratégique et business case',
      status: 'completed' as const,
      completionPercent: 100,
      dimensions: {
        business: {
          completionPercent: 100,
          criteria: [
            { id: 'b1', name: 'Business case validé', completed: true },
            { id: 'b2', name: 'ROI calculé', completed: true },
          ],
        },
        administrative: {
          completionPercent: 100,
          criteria: [{ id: 'a1', name: 'Autorisations préliminaires', completed: true }],
        },
        technology: {
          completionPercent: 100,
          criteria: [{ id: 't1', name: 'Stack technologique sélectionné', completed: true }],
        },
        engineering: {
          completionPercent: 100,
          criteria: [{ id: 'e1', name: 'Faisabilité technique validée', completed: true }],
        },
      },
      gate: {
        id: 'gate-1',
        name: 'Gate 1: Strategic Approval',
        description: 'Validation de la stratégie et du business case',
        status: 'passed' as const,
        criteria: [
          { id: 'g1', name: 'Business case approuvé', completed: true },
          { id: 'g2', name: 'Budget alloué', completed: true },
        ],
      },
      subSOPs: [],
    },
    {
      id: 'deployment',
      name: 'Deployment',
      shortName: 'Deploy',
      description: 'Installation et construction sur site',
      status: 'in-progress' as const,
      completionPercent: 70,
      dimensions: {
        business: {
          completionPercent: 80,
          criteria: [
            { id: 'b1', name: 'Contrats fournisseurs signés', completed: true },
            { id: 'b2', name: 'Financement sécurisé', completed: true },
            { id: 'b3', name: 'Planning respecté', completed: false },
          ],
        },
        administrative: {
          completionPercent: 75,
          criteria: [
            { id: 'a1', name: 'Permis de construire obtenu', completed: true },
            { id: 'a2', name: 'Conformité HSE', completed: true },
            { id: 'a3', name: 'Assurances actives', completed: false },
          ],
        },
        technology: {
          completionPercent: 65,
          criteria: [
            { id: 't1', name: 'Infrastructure IT déployée', completed: true },
            { id: 't2', name: 'Réseau configuré', completed: true },
            { id: 't3', name: 'Systèmes de monitoring actifs', completed: false },
          ],
        },
        engineering: {
          completionPercent: 60,
          criteria: [
            { id: 'e1', name: 'Installation électrique complète', completed: true },
            { id: 'e2', name: 'Système de refroidissement installé', completed: false },
            { id: 'e3', name: 'Containers positionnés', completed: false },
          ],
        },
      },
      gate: {
        id: 'gate-5',
        name: 'Gate 5: Deployment Completion',
        description: 'Validation de l installation complète',
        status: 'pending' as const,
        criteria: [
          { id: 'g1', name: 'Installation à 100%', completed: false },
          { id: 'g2', name: 'Tests de sécurité passés', completed: false },
          { id: 'g3', name: 'Documentation complète', completed: false },
        ],
      },
      subSOPs: [
        {
          id: 'sop-deploy-1',
          code: 'SOP-005',
          name: 'Installation Procedure',
          description: 'Procédure d installation des équipements',
          dimension: 'engineering',
          status: 'in-progress',
          completionPercent: 65,
          owner: 'Engineering Team',
        },
        {
          id: 'sop-deploy-2',
          code: 'SOP-006',
          name: 'Safety Protocol',
          description: 'Protocole de sécurité sur site',
          dimension: 'administrative',
          status: 'completed',
          completionPercent: 100,
          owner: 'HSE Manager',
        },
      ],
    },
  ] as Phase[],
};

export default function ProjectMonitoring() {
  const [activeTab, setActiveTab] = useState<'overview' | 'gates' | 'sops'>('overview');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const project = mockSOPProject;
  const displayPhase = selectedPhase
    ? project.phases.find((p) => p.id === selectedPhase) || project.phases.find((p) => p.status === 'in-progress')!
    : project.phases.find((p) => p.status === 'in-progress')!;

  // Stats calculées
  const completedPhases = project.phases.filter((p) => p.status === 'completed').length;
  const passedGates = project.phases.filter((p) => p.gate.status === 'passed').length;
  const pendingGates = project.phases.filter((p) => p.gate.status === 'pending').length;
  const allSubSOPs = project.phases.flatMap((p) => p.subSOPs);
  const completedSubSOPs = allSubSOPs.filter((s) => s.status === 'completed').length;

  const getPhaseIcon = (phaseId: string) => {
    const icons = {
      'strategic-intent': Target,
      'pre-conception': Lightbulb,
      conception: PenTool,
      industrialisation: Factory,
      deployment: Rocket,
      commissioning: ZapIcon,
      'steady-state': RefreshCw,
    };
    return icons[phaseId as keyof typeof icons] || Target;
  };

  const getDimensionIcon = (dimension: string) => {
    const icons = {
      business: Briefcase,
      administrative: ClipboardList,
      technology: Monitor,
      engineering: Settings,
    };
    return icons[dimension as keyof typeof icons] || Briefcase;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                  <Layers className="w-4 h-4 text-hearst-green" />
                  <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">Master SOP</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 border border-grey-100 rounded-lg">
                  <span className="text-xs font-semibold text-grey-400 uppercase tracking-wide">
                    Lifecycle Governance
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
              <div className="flex items-center gap-4 text-sm text-grey-400">
                <span>Capacity: {project.capacity}</span>
                <span>•</span>
                <span>Location: {project.location}</span>
                <span>•</span>
                <span>Owner: {project.owner}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Overall Progress</p>
              <p className="text-3xl font-bold text-white font-mono">{project.overallProgress}%</p>
              <div className="w-32 h-2 bg-dark-600 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                  style={{ width: `${project.overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-dark-700 border border-grey-100 rounded-xl p-2">
          {[
            { id: 'overview', icon: Layers, label: 'Overview' },
            { id: 'gates', icon: Lock, label: 'Validation Gates' },
            { id: 'sops', icon: FileText, label: 'Sub-SOPs' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-normal ${
                  activeTab === tab.id
                    ? 'bg-hearst-green text-black'
                    : 'text-grey-400 hover:bg-dark-600 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Timeline des 7 phases */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Lifecycle Progress</h3>
                <p className="text-sm text-grey-400">
                  {completedPhases} of {project.phases.length} phases completed
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 right-0 top-6 h-1 bg-dark-600" />
                <div
                  className="absolute left-0 top-6 h-1 bg-hearst-green transition-all duration-slow"
                  style={{ width: `${(completedPhases / project.phases.length) * 100}%` }}
                />

                {/* Phase nodes */}
                <div className="relative flex justify-between">
                  {project.phases.map((phase, index) => {
                    const Icon = getPhaseIcon(phase.id);
                    const isActive = phase.status === 'in-progress';
                    const isCompleted = phase.status === 'completed';

                    return (
                      <button
                        key={phase.id}
                        onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-normal
                          ${
                            isCompleted
                              ? 'bg-hearst-green text-black'
                              : isActive
                              ? 'bg-black border-2 border-hearst-green text-hearst-green'
                              : 'bg-dark-600 text-grey-400 border-2 border-dark-600'
                          }
                          ${selectedPhase === phase.id ? 'ring-4 ring-hearst-green/30' : ''}
                          group-hover:scale-110
                        `}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wide mb-1">
                          {phase.shortName}
                        </span>
                        <span
                          className={`
                          text-[10px] px-2 py-0.5 rounded-full font-bold
                          ${isCompleted ? 'bg-hearst-green/20 text-hearst-green' : 'bg-dark-600 text-grey-400'}
                        `}
                        >
                          {phase.completionPercent}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Phase Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Current Phase Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Phase Name</p>
                      <p className="text-lg font-semibold text-white">{displayPhase.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Description</p>
                      <p className="text-sm text-grey-300">{displayPhase.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Status</p>
                      <div className="flex items-center gap-2">
                        {displayPhase.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-hearst-green" />
                        )}
                        {displayPhase.status === 'in-progress' && <Clock className="w-4 h-4 text-hearst-green" />}
                        <span className="text-sm font-semibold text-white capitalize">
                          {displayPhase.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Dimensions */}
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">4 Dimensions Obligatoires</h4>
                    {Object.entries(displayPhase.dimensions).map(([key, dimension]) => {
                      const Icon = getDimensionIcon(key);
                      const criteriaCompleted = dimension.criteria.filter((c) => c.completed).length;

                      return (
                        <div key={key} className="bg-dark-600 border border-grey-100 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-hearst-green" />
                              <span className="text-sm font-semibold text-white capitalize">{key}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-grey-400">
                                {criteriaCompleted} of {dimension.criteria.length} criteria
                              </p>
                              <p className="text-sm font-bold text-white font-mono">{dimension.completionPercent}%</p>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                              style={{ width: `${dimension.completionPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Validation Gate */}
                <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Validation Gate</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Gate Name</p>
                      <p className="text-sm font-semibold text-white">{displayPhase.gate.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1 uppercase tracking-wide">Status</p>
                      <div className="flex items-center gap-2">
                        {displayPhase.gate.status === 'passed' ? (
                          <>
                            <Unlock className="w-4 h-4 text-hearst-green" />
                            <span className="text-sm font-semibold text-hearst-green">Passed</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-grey-400" />
                            <span className="text-sm font-semibold text-grey-400">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-2 uppercase tracking-wide">Criteria</p>
                      <div className="space-y-2">
                        {displayPhase.gate.criteria.map((criterion) => (
                          <div key={criterion.id} className="flex items-center gap-2">
                            {criterion.completed ? (
                              <CheckCircle className="w-4 h-4 text-hearst-green flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-grey-400 flex-shrink-0" />
                            )}
                            <span className="text-xs text-grey-300">{criterion.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-grey-400">Passed Gates</span>
                      <span className="text-sm font-bold text-hearst-green">{passedGates}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-grey-400">Pending Gates</span>
                      <span className="text-sm font-bold text-grey-400">{pendingGates}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gates' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Validation Gates</h3>
                <p className="text-sm text-grey-400">All Phase Gates • Master SOP Lifecycle</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                  <Unlock className="w-4 h-4 text-hearst-green" />
                  <span className="text-xs font-semibold text-hearst-green">{passedGates} Passed</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 border border-grey-100 rounded-lg">
                  <Lock className="w-4 h-4 text-grey-400" />
                  <span className="text-xs font-semibold text-grey-400">{project.phases.length} Total</span>
                </div>
              </div>
            </div>

            {/* Gates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.phases.map((phase) => {
                const Icon = getPhaseIcon(phase.id);
                const completedCriteria = phase.gate.criteria.filter((c) => c.completed).length;
                const gateProgress = (completedCriteria / phase.gate.criteria.length) * 100;

                return (
                  <div key={phase.id} className="bg-dark-700 border border-grey-100 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-black p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-hearst-green" />
                        <span className="text-sm font-bold text-white">{phase.gate.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {phase.gate.status === 'passed' ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-hearst-green" />
                            <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">
                              Passed
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-grey-400" />
                            <span className="text-xs font-semibold text-grey-400 uppercase tracking-wide">Pending</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">{phase.name}</p>
                        <p className="text-xs text-grey-400">{phase.gate.description}</p>
                      </div>

                      {/* Criteria */}
                      <div>
                        <p className="text-xs text-grey-400 mb-2 uppercase tracking-wide">
                          Criteria ({completedCriteria}/{phase.gate.criteria.length})
                        </p>
                        <div className="space-y-2">
                          {phase.gate.criteria.slice(0, 3).map((criterion) => (
                            <div key={criterion.id} className="flex items-center gap-2">
                              {criterion.completed ? (
                                <CheckCircle className="w-3 h-3 text-hearst-green flex-shrink-0" />
                              ) : (
                                <Circle className="w-3 h-3 text-grey-400 flex-shrink-0" />
                              )}
                              <span className="text-xs text-grey-300">{criterion.name}</span>
                            </div>
                          ))}
                          {phase.gate.criteria.length > 3 && (
                            <p className="text-xs text-grey-400 ml-5">
                              +{phase.gate.criteria.length - 3} more criteria
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-grey-400">Progress</span>
                          <span className="text-xs font-bold text-white font-mono">{gateProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                            style={{ width: `${gateProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'sops' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Sub-SOP Documents</h3>
                <p className="text-sm text-grey-400">All Required Documents • Master SOP Lifecycle</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-hearst-green" />
                  <span className="text-xs font-semibold text-hearst-green">{completedSubSOPs} Completed</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 border border-grey-100 rounded-lg">
                  <FileText className="w-4 h-4 text-grey-400" />
                  <span className="text-xs font-semibold text-grey-400">{allSubSOPs.length} Total</span>
                </div>
              </div>
            </div>

            {/* SOPs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSubSOPs.map((sop) => {
                const Icon = getDimensionIcon(sop.dimension);

                return (
                  <div key={sop.id} className="bg-dark-700 border border-grey-100 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-black p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-hearst-green" />
                        <span className="text-sm font-bold text-white">{sop.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {sop.status === 'completed' && (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-hearst-green" />
                            <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">
                              Complete
                            </span>
                          </>
                        )}
                        {sop.status === 'in-progress' && (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-hearst-green animate-pulse-green" />
                            <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">
                              In Progress
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">{sop.name}</p>
                        <p className="text-xs text-grey-400 line-clamp-2">{sop.description}</p>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-grey-400">Progress</span>
                          <span className="text-xs font-bold text-white font-mono">{sop.completionPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                            style={{ width: `${sop.completionPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Owner */}
                      {sop.owner && (
                        <div className="flex items-center gap-2 text-xs text-grey-400">
                          <span>Owner:</span>
                          <span className="font-semibold text-grey-300">{sop.owner}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
