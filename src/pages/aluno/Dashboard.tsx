import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  CreditCard, 
  Bell,
  Clock,
  TrendingUp,
  CheckSquare
} from 'lucide-react';

// Dashboard do aluno - página principal
const AlunoDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do dashboard
  useEffect(() => {
    const loadData = async () => {
      // Aqui você conectaria com o backend para buscar dados do aluno
      // GET /api/aluno/{alunoId}/dashboard
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Ações rápidas do aluno
  const quickActions = [
    {
      title: 'Ver Horários',
      description: 'Consulte seus horários de aula',
      action: () => navigate('/aluno/horarios'),
      icon: Calendar,
      color: 'text-primary'
    },
    {
      title: 'Minhas Atividades',
      description: 'Veja atividades pendentes',
      action: () => navigate('/aluno/atividades'),
      icon: FileText,
      color: 'text-secondary'
    },
    {
      title: 'Minhas Notas',
      description: 'Consulte suas notas',
      action: () => navigate('/aluno/notas'),
      icon: BookOpen,
      color: 'text-accent'
    },
    {
      title: 'Pagamentos',
      description: 'Status das mensalidades',
      action: () => navigate('/aluno/pagamento'),
      icon: CreditCard,
      color: 'text-success'
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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Aqui está um resumo das suas atividades acadêmicas
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Turma
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{user?.turmas?.[0] || 'N/A'}</div>
              <p className="text-xs text-muted-foreground mt-1">Sua turma atual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Média Geral
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8.5</div>
              <p className="text-xs text-muted-foreground mt-1">Aprovado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Frequência
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">92%</div>
              <p className="text-xs text-muted-foreground mt-1">3 faltas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Atividades Pendentes
              </CardTitle>
              <FileText className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-muted-foreground mt-1">Para entregar</p>
            </CardContent>
          </Card>
        </div>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" 
                  onClick={action.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
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
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Matemática</h4>
                <Badge variant="outline">Sala 101</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Prof. João Santos</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3" />
                <span>08:00 - 09:00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avisos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Avisos Importantes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Semana de Provas</h4>
                <Badge variant="destructive">Importante</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                A semana de provas do 4º bimestre será de 16 a 20 de dezembro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlunoDashboard;