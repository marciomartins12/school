import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  CheckSquare, 
  GraduationCap, 
  FileText,
  Bell,
  Clock,
  TrendingUp
} from 'lucide-react';

// Interfaces para os dados do dashboard do professor
interface ProfessorStats {
  totalTurmas: number;
  totalAlunos: number;
  aulasSemana: number;
  atividadesPendentes: number;
}

interface NextClass {
  id: string;
  turma: string;
  disciplina: string;
  horario: string;
  sala: string;
}

interface RecentActivity {
  id: string;
  type: 'chamada' | 'nota' | 'atividade';
  description: string;
  turma: string;
  date: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
}

// Dashboard do professor
const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Estados para os dados do dashboard
  const [stats, setStats] = useState<ProfessorStats>({
    totalTurmas: 0,
    totalAlunos: 0,
    aulasSemana: 0,
    atividadesPendentes: 0
  });
  
  const [nextClasses, setNextClasses] = useState<NextClass[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do dashboard quando o componente for montado
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Função para carregar dados do dashboard
  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os dados específicos do professor
      // GET /api/professor/dashboard/{professorId}
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados das estatísticas
      setStats({
        totalTurmas: user?.turmas?.length || 3,
        totalAlunos: 67,
        aulasSemana: 18,
        atividadesPendentes: 5
      });

      // Próximas aulas simuladas
      setNextClasses([
        {
          id: '1',
          turma: 'Turma A',
          disciplina: 'Matemática',
          horario: '08:00 - 09:00',
          sala: 'Sala 101'
        },
        {
          id: '2',
          turma: 'Turma B',
          disciplina: 'Matemática',
          horario: '09:00 - 10:00',
          sala: 'Sala 102'
        },
        {
          id: '3',
          turma: 'Turma C',
          disciplina: 'Matemática',
          horario: '10:00 - 11:00',
          sala: 'Sala 103'
        }
      ]);

      // Atividades recentes simuladas
      setRecentActivities([
        {
          id: '1',
          type: 'chamada',
          description: 'Chamada realizada',
          turma: 'Turma A',
          date: '2024-12-01'
        },
        {
          id: '2',
          type: 'nota',
          description: 'Notas lançadas - Prova de Matemática',
          turma: 'Turma B',
          date: '2024-11-30'
        },
        {
          id: '3',
          type: 'atividade',
          description: 'Atividade "Exercícios de Álgebra" enviada',
          turma: 'Turma C',
          date: '2024-11-29'
        }
      ]);

      // Anúncios simulados
      setAnnouncements([
        {
          id: '1',
          title: 'Reunião Pedagógica',
          message: 'Reunião pedagógica na próxima sexta-feira às 16h.',
          type: 'info',
          date: '2024-12-01'
        },
        {
          id: '2',
          title: 'Entrega de Notas',
          message: 'Lembrete: prazo para entrega de notas até dia 15.',
          type: 'warning',
          date: '2024-11-30'
        }
      ]);
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para navegar para diferentes seções
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Cards de estatísticas
  const statsCards = [
    {
      title: 'Minhas Turmas',
      value: stats.totalTurmas,
      icon: BookOpen,
      description: 'Turmas que leciono',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total de Alunos',
      value: stats.totalAlunos,
      icon: Users,
      description: 'Alunos nas minhas turmas',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Aulas na Semana',
      value: stats.aulasSemana,
      icon: Calendar,
      description: 'Aulas desta semana',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Atividades Pendentes',
      value: stats.atividadesPendentes,
      icon: FileText,
      description: 'Para correção',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  // Ações rápidas disponíveis
  const quickActions = [
    {
      title: 'Fazer Chamada',
      description: 'Registrar presença dos alunos',
      action: () => navigateTo('/professor/chamada'),
      icon: CheckSquare,
      color: 'text-primary'
    },
    {
      title: 'Lançar Notas',
      description: 'Registrar avaliações',
      action: () => navigateTo('/professor/notas'),
      icon: GraduationCap,
      color: 'text-secondary'
    },
    {
      title: 'Enviar Atividade',
      description: 'Criar nova atividade',
      action: () => navigateTo('/professor/atividades'),
      icon: FileText,
      color: 'text-accent'
    },
    {
      title: 'Ver Alunos',
      description: 'Lista de alunos das turmas',
      action: () => navigateTo('/professor/alunos'),
      icon: Users,
      color: 'text-success'
    }
  ];

  // Função para obter ícone da atividade
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'chamada':
        return <CheckSquare className="h-4 w-4 text-primary" />;
      case 'nota':
        return <GraduationCap className="h-4 w-4 text-secondary" />;
      case 'atividade':
        return <FileText className="h-4 w-4 text-accent" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header do dashboard */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Aqui está um resumo das suas atividades como professor
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Ações Rápidas</span>
              </CardTitle>
              <CardDescription>
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={action.action}>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{action.title}</h4>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Próximas aulas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Próximas Aulas</span>
              </CardTitle>
              <CardDescription>
                Suas aulas de hoje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextClasses.map((aula) => (
                <div key={aula.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{aula.turma}</h4>
                    <Badge variant="outline" className="text-xs">
                      {aula.sala}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{aula.disciplina}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{aula.horario}</span>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigateTo('/professor/horarios')}
              >
                Ver todos os horários
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Atividades recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Atividades Recentes</span>
              </CardTitle>
              <CardDescription>
                Suas últimas ações no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="p-2 bg-muted rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{activity.description}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{activity.turma}</span>
                      <span>•</span>
                      <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Anúncios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Avisos</span>
              </CardTitle>
              <CardDescription>
                Anúncios importantes da escola
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{announcement.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.type === 'info' ? 'bg-primary/10 text-primary' :
                      announcement.type === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>
                      {announcement.type === 'info' ? 'Info' :
                       announcement.type === 'warning' ? 'Aviso' : 'Importante'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorDashboard;