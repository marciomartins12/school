import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Calendar, BookOpen, TrendingUp, Bell, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface para as estatísticas do dashboard
interface DashboardStats {
  totalAlunos: number;
  totalProfessores: number;
  totalTurmas: number;
  totalCursos: number;
}

// Interface para anúncios
interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success';
}

// Dashboard principal do administrador
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para os dados do dashboard
  const [stats, setStats] = useState<DashboardStats>({
    totalAlunos: 0,
    totalProfessores: 0,
    totalTurmas: 0,
    totalCursos: 0
  });
  
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do dashboard quando o componente for montado
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Função para carregar dados do dashboard
  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os dados reais
      // Por enquanto, vamos simular dados
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay da API
      
      // Dados simulados das estatísticas
      setStats({
        totalAlunos: 1247,
        totalProfessores: 89,
        totalTurmas: 42,
        totalCursos: 15
      });

      // Dados simulados dos anúncios recentes
      setRecentAnnouncements([
        {
          id: '1',
          title: 'Semana de Provas',
          message: 'A semana de provas do 2º bimestre começará no dia 15 de dezembro.',
          date: '2024-12-01',
          type: 'info'
        },
        {
          id: '2',
          title: 'Reunião de Pais',
          message: 'Reunião de pais e mestres agendada para o dia 20 de dezembro.',
          date: '2024-11-30',
          type: 'warning'
        },
        {
          id: '3',
          title: 'Matrícula 2025',
          message: 'Período de matrículas para 2025 abertas até 31 de janeiro.',
          date: '2024-11-28',
          type: 'success'
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
      title: 'Total de Alunos',
      value: stats.totalAlunos,
      icon: GraduationCap,
      description: 'Alunos matriculados',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Professores',
      value: stats.totalProfessores,
      icon: Users,
      description: 'Professores ativos',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Turmas',
      value: stats.totalTurmas,
      icon: Calendar,
      description: 'Turmas ativas',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Cursos',
      value: stats.totalCursos,
      icon: BookOpen,
      description: 'Cursos oferecidos',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  // Ações rápidas disponíveis
  const quickActions = [
    {
      title: 'Gerenciar Alunos',
      description: 'Cadastrar, editar e excluir alunos',
      action: () => navigateTo('/admin/alunos'),
      icon: GraduationCap
    },
    {
      title: 'Gerenciar Professores',
      description: 'Cadastrar e gerenciar professores',
      action: () => navigateTo('/admin/professores'),
      icon: Users
    },
    {
      title: 'Turmas e Horários',
      description: 'Configurar turmas e horários',
      action: () => navigateTo('/admin/turmas'),
      icon: Calendar
    },
    {
      title: 'Criar Anúncio',
      description: 'Criar novo anúncio para o sistema',
      action: () => navigateTo('/admin/anuncios'),
      icon: Bell
    }
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do sistema escolar e estatísticas importantes
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
                  <div className="text-2xl font-bold text-foreground">{card.value.toLocaleString()}</div>
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
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{action.title}</h4>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={action.action}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Anúncios recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Anúncios Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimos avisos criados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-4 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{announcement.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.type === 'info' ? 'bg-primary/10 text-primary' :
                      announcement.type === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>
                      {announcement.type === 'info' ? 'Info' :
                       announcement.type === 'warning' ? 'Aviso' : 'Sucesso'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigateTo('/admin/anuncios')}
              >
                Ver todos os anúncios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;