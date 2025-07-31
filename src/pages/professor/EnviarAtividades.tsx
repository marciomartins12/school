import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus, Send, Calendar, Download, Trash2, Edit, Upload, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Interface para as atividades
interface Activity {
  id: string;
  titulo: string;
  descricao: string;
  turma: string;
  disciplina: string;
  dataVencimento: string;
  anexos: string[];
  status: 'rascunho' | 'enviada' | 'vencida';
  totalAlunos: number;
  alunosEntregues: number;
  criadaEm: string;
}

// Interface para o formulário de atividade
interface ActivityForm {
  titulo: string;
  descricao: string;
  turma: string;
  disciplina: string;
  dataVencimento: string;
  anexos: File[];
}

// Página de envio de atividades do professor
const EnviarAtividades: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Estados para gerenciar atividades
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTurma, setSelectedTurma] = useState<string>('todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  
  // Estados para o modal de criação/edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState<ActivityForm>({
    titulo: '',
    descricao: '',
    turma: '',
    disciplina: '',
    dataVencimento: '',
    anexos: []
  });

  // Dados simulados
  const turmasDisponiveis = user?.turmas || ['Turma A', 'Turma B', 'Turma C'];
  const disciplinasDisponiveis = [
    'Matemática',
    'Português', 
    'História',
    'Geografia',
    'Ciências',
    'Inglês'
  ];

  // Carregar atividades ao montar o componente
  useEffect(() => {
    loadActivities();
  }, []);

  // Filtrar atividades quando os critérios mudarem
  useEffect(() => {
    filterActivities();
  }, [activities, searchTerm, selectedTurma, selectedStatus]);

  // Função para carregar atividades do backend
  const loadActivities = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar as atividades do professor
      // GET /api/professor/{professorId}/activities
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados das atividades
      const mockActivities: Activity[] = [
        {
          id: '1',
          titulo: 'Exercícios de Álgebra',
          descricao: 'Lista de exercícios sobre equações do segundo grau e sistemas lineares.',
          turma: 'Turma A',
          disciplina: 'Matemática',
          dataVencimento: '2024-12-15',
          anexos: ['exercicios_algebra.pdf', 'gabarito.pdf'],
          status: 'enviada',
          totalAlunos: 25,
          alunosEntregues: 18,
          criadaEm: '2024-12-01'
        },
        {
          id: '2',
          titulo: 'Redação sobre Meio Ambiente',
          descricao: 'Escreva uma redação de 30 linhas sobre sustentabilidade e preservação ambiental.',
          turma: 'Turma B',
          disciplina: 'Português',
          dataVencimento: '2024-12-10',
          anexos: ['modelo_redacao.pdf'],
          status: 'vencida',
          totalAlunos: 23,
          alunosEntregues: 23,
          criadaEm: '2024-11-25'
        },
        {
          id: '3',
          titulo: 'Projeto de História do Brasil',
          descricao: 'Pesquisa sobre a Era Vargas e suas principais características políticas e sociais.',
          turma: 'Turma C',
          disciplina: 'História',
          dataVencimento: '2024-12-20',
          anexos: ['orientacoes_projeto.pdf'],
          status: 'enviada',
          totalAlunos: 27,
          alunosEntregues: 12,
          criadaEm: '2024-12-02'
        },
        {
          id: '4',
          titulo: 'Atividade Geografia Física',
          descricao: 'Rascunho de atividade sobre relevo e hidrografia.',
          turma: 'Turma A',
          disciplina: 'Geografia',
          dataVencimento: '2024-12-18',
          anexos: [],
          status: 'rascunho',
          totalAlunos: 25,
          alunosEntregues: 0,
          criadaEm: '2024-12-03'
        }
      ];
      
      setActivities(mockActivities);
      
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de atividades.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para filtrar atividades
  const filterActivities = () => {
    let filtered = activities;
    
    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por turma
    if (selectedTurma !== 'todas') {
      filtered = filtered.filter(activity => activity.turma === selectedTurma);
    }
    
    // Filtrar por status
    if (selectedStatus !== 'todas') {
      filtered = filtered.filter(activity => activity.status === selectedStatus);
    }
    
    setFilteredActivities(filtered);
  };

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingActivity(null);
    setFormData({
      titulo: '',
      descricao: '',
      turma: '',
      disciplina: '',
      dataVencimento: '',
      anexos: []
    });
    setIsModalOpen(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      titulo: activity.titulo,
      descricao: activity.descricao,
      turma: activity.turma,
      disciplina: activity.disciplina,
      dataVencimento: activity.dataVencimento,
      anexos: [] // Não carregamos arquivos existentes no formulário
    });
    setIsModalOpen(true);
  };

  // Função para salvar atividade
  const handleSaveActivity = async () => {
    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.turma || !formData.disciplina || !formData.dataVencimento) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingActivity) {
        // Aqui você conectaria com o backend para atualizar a atividade
        // PUT /api/professor/activities/{activityId}
        console.log('Atualizando atividade:', editingActivity.id, formData);
        
        // Simular atualização local
        const updatedActivities = activities.map(activity =>
          activity.id === editingActivity.id
            ? { 
                ...activity, 
                titulo: formData.titulo,
                descricao: formData.descricao,
                turma: formData.turma,
                disciplina: formData.disciplina,
                dataVencimento: formData.dataVencimento
              }
            : activity
        );
        setActivities(updatedActivities);
        
        toast({
          title: "Sucesso",
          description: "Atividade atualizada com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar nova atividade
        // POST /api/professor/activities
        console.log('Criando nova atividade:', formData);
        
        // Simular criação local
        const newActivity: Activity = {
          id: Date.now().toString(),
          titulo: formData.titulo,
          descricao: formData.descricao,
          turma: formData.turma,
          disciplina: formData.disciplina,
          dataVencimento: formData.dataVencimento,
          anexos: formData.anexos.map(file => file.name),
          status: 'rascunho',
          totalAlunos: 25, // Simular contagem de alunos
          alunosEntregues: 0,
          criadaEm: new Date().toISOString()
        };
        setActivities([newActivity, ...activities]);
        
        toast({
          title: "Sucesso",
          description: "Atividade criada com sucesso!",
        });
      }
      
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a atividade.",
        variant: "destructive",
      });
    }
  };

  // Função para enviar atividade (mudar status para enviada)
  const handleSendActivity = async (activityId: string) => {
    try {
      // Aqui você conectaria com o backend para enviar a atividade
      // POST /api/professor/activities/{activityId}/send
      console.log('Enviando atividade:', activityId);
      
      // Simular envio local
      const updatedActivities = activities.map(activity =>
        activity.id === activityId
          ? { ...activity, status: 'enviada' as const }
          : activity
      );
      setActivities(updatedActivities);
      
      toast({
        title: "Sucesso",
        description: "Atividade enviada para os alunos!",
      });
      
    } catch (error) {
      console.error('Erro ao enviar atividade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a atividade.",
        variant: "destructive",
      });
    }
  };

  // Função para excluir atividade
  const handleDeleteActivity = async (activityId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta atividade?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir a atividade
      // DELETE /api/professor/activities/{activityId}
      console.log('Excluindo atividade:', activityId);
      
      // Simular exclusão local
      const updatedActivities = activities.filter(activity => activity.id !== activityId);
      setActivities(updatedActivities);
      
      toast({
        title: "Sucesso",
        description: "Atividade excluída com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir atividade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a atividade.",
        variant: "destructive",
      });
    }
  };

  // Função para lidar com upload de arquivos
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData({ ...formData, anexos: [...formData.anexos, ...newFiles] });
    }
  };

  // Função para remover arquivo
  const removeFile = (index: number) => {
    const newFiles = formData.anexos.filter((_, i) => i !== index);
    setFormData({ ...formData, anexos: newFiles });
  };

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviada':
        return 'bg-success text-success-foreground';
      case 'rascunho':
        return 'bg-secondary text-secondary-foreground';
      case 'vencida':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Função para obter label do status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'enviada':
        return 'Enviada';
      case 'rascunho':
        return 'Rascunho';
      case 'vencida':
        return 'Vencida';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando atividades...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Enviar Atividades</h1>
            <p className="text-muted-foreground mt-2">
              Crie e gerencie atividades para suas turmas
            </p>
          </div>
          
          <Button onClick={openCreateModal} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nova Atividade</span>
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Busca */}
              <div>
                <Label htmlFor="search">Buscar atividades</Label>
                <Input
                  id="search"
                  placeholder="Título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filtro por turma */}
              <div>
                <Label>Filtrar por turma</Label>
                <Select value={selectedTurma} onValueChange={setSelectedTurma}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as turmas</SelectItem>
                    {turmasDisponiveis.map(turma => (
                      <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtro por status */}
              <div>
                <Label>Filtrar por status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todos os status</SelectItem>
                    <SelectItem value="rascunho">Rascunho</SelectItem>
                    <SelectItem value="enviada">Enviada</SelectItem>
                    <SelectItem value="vencida">Vencida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de atividades */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Atividades ({filteredActivities.length})</CardTitle>
            <CardDescription>
              Gerencie todas as atividades criadas e enviadas para suas turmas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atividade</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-center">Entregas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{activity.titulo}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {activity.descricao}
                        </div>
                        {activity.anexos.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span>{activity.anexos.length} anexo(s)</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{activity.turma}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{activity.disciplina}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(activity.dataVencimento).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {activity.alunosEntregues}/{activity.totalAlunos}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(activity.status)}>
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {activity.status === 'rascunho' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendActivity(activity.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(activity)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredActivities.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma atividade encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de criação/edição */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingActivity ? 'Editar Atividade' : 'Criar Nova Atividade'}
              </DialogTitle>
              <DialogDescription>
                {editingActivity 
                  ? 'Altere as informações da atividade conforme necessário.'
                  : 'Preencha as informações para criar uma nova atividade para seus alunos.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <Label htmlFor="titulo">Título da Atividade *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ex: Exercícios de Matemática"
                />
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Descreva detalhadamente a atividade, instruções e critérios de avaliação..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Turma */}
                <div>
                  <Label>Turma *</Label>
                  <Select value={formData.turma} onValueChange={(value) => setFormData({...formData, turma: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {turmasDisponiveis.map(turma => (
                        <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Disciplina */}
                <div>
                  <Label>Disciplina *</Label>
                  <Select value={formData.disciplina} onValueChange={(value) => setFormData({...formData, disciplina: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {disciplinasDisponiveis.map(disciplina => (
                        <SelectItem key={disciplina} value={disciplina}>{disciplina}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data de vencimento */}
                <div>
                  <Label htmlFor="dataVencimento">Data de Vencimento *</Label>
                  <Input
                    id="dataVencimento"
                    type="date"
                    value={formData.dataVencimento}
                    onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                  />
                </div>
              </div>

              {/* Upload de arquivos */}
              <div>
                <Label htmlFor="anexos">Anexos (opcional)</Label>
                <div className="mt-2">
                  <Input
                    id="anexos"
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Você pode anexar PDFs, imagens ou documentos relacionados à atividade
                  </p>
                </div>

                {/* Lista de arquivos selecionados */}
                {formData.anexos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <Label className="text-sm">Arquivos selecionados:</Label>
                    {formData.anexos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveActivity}>
                {editingActivity ? 'Atualizar' : 'Criar Atividade'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EnviarAtividades;