import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interfaces
interface Turma {
  id: string;
  name: string;
  curso: string;
  sala: string;
  professor: string;
  totalAlunos: number;
  status: 'ativa' | 'inativa';
  createdAt: string;
}

interface Horario {
  id: string;
  turma: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  disciplina: string;
  professor: string;
}

interface TurmaForm {
  name: string;
  curso: string;
  sala: string;
  professor: string;
}

interface HorarioForm {
  turma: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  disciplina: string;
  professor: string;
}

// Página de gerenciamento de turmas e horários
const TurmasAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Estados para turmas
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [isTurmaModalOpen, setIsTurmaModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null);
  const [turmaFormData, setTurmaFormData] = useState<TurmaForm>({
    name: '',
    curso: '',
    sala: '',
    professor: ''
  });

  // Estados para horários
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);
  const [editingHorario, setEditingHorario] = useState<Horario | null>(null);
  const [horarioFormData, setHorarioFormData] = useState<HorarioForm>({
    turma: '',
    diaSemana: '',
    horaInicio: '',
    horaFim: '',
    disciplina: '',
    professor: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  // Dados simulados
  const cursosDisponiveis = ['Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio', 'Pré-Vestibular'];
  const salasDisponiveis = ['Sala 101', 'Sala 102', 'Sala 103', 'Sala 201', 'Sala 202', 'Laboratório', 'Auditório'];
  const professoresDisponiveis = ['Prof. Carlos Silva', 'Profa. Maria Santos', 'Prof. João Oliveira', 'Profa. Ana Costa'];
  const disciplinasDisponiveis = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química'];
  const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar turmas e horários
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados de turmas
      const mockTurmas: Turma[] = [
        {
          id: '1',
          name: 'Turma A',
          curso: 'Ensino Médio',
          sala: 'Sala 101',
          professor: 'Prof. Carlos Silva',
          totalAlunos: 25,
          status: 'ativa',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Turma B',
          curso: 'Ensino Médio',
          sala: 'Sala 102',
          professor: 'Profa. Maria Santos',
          totalAlunos: 28,
          status: 'ativa',
          createdAt: '2024-01-20'
        }
      ];

      // Dados simulados de horários
      const mockHorarios: Horario[] = [
        {
          id: '1',
          turma: 'Turma A',
          diaSemana: 'Segunda-feira',
          horaInicio: '08:00',
          horaFim: '09:00',
          disciplina: 'Matemática',
          professor: 'Prof. Carlos Silva'
        },
        {
          id: '2',
          turma: 'Turma A',
          diaSemana: 'Segunda-feira',
          horaInicio: '09:00',
          horaFim: '10:00',
          disciplina: 'Português',
          professor: 'Profa. Maria Santos'
        }
      ];
      
      setTurmas(mockTurmas);
      setHorarios(mockHorarios);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Funções para gerenciar turmas
  const openCreateTurmaModal = () => {
    setEditingTurma(null);
    setTurmaFormData({ name: '', curso: '', sala: '', professor: '' });
    setIsTurmaModalOpen(true);
  };

  const openEditTurmaModal = (turma: Turma) => {
    setEditingTurma(turma);
    setTurmaFormData({
      name: turma.name,
      curso: turma.curso,
      sala: turma.sala,
      professor: turma.professor
    });
    setIsTurmaModalOpen(true);
  };

  const handleSaveTurma = async () => {
    if (!turmaFormData.name || !turmaFormData.curso || !turmaFormData.sala || !turmaFormData.professor) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTurma) {
        // Aqui você conectaria com o backend para atualizar a turma
        // PUT /api/turmas/{id}
        console.log('Atualizando turma:', editingTurma.id, turmaFormData);
        
        const updatedTurmas = turmas.map(turma =>
          turma.id === editingTurma.id
            ? { ...turma, ...turmaFormData }
            : turma
        );
        setTurmas(updatedTurmas);
        
        toast({
          title: "Sucesso",
          description: "Turma atualizada com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar nova turma
        // POST /api/turmas
        console.log('Criando nova turma:', turmaFormData);
        
        const newTurma: Turma = {
          id: Date.now().toString(),
          ...turmaFormData,
          totalAlunos: 0,
          status: 'ativa',
          createdAt: new Date().toISOString()
        };
        setTurmas([...turmas, newTurma]);
        
        toast({
          title: "Sucesso",
          description: "Turma criada com sucesso!",
        });
      }
      
      setIsTurmaModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a turma.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTurma = async (turmaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta turma?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir a turma
      // DELETE /api/turmas/{id}
      console.log('Excluindo turma:', turmaId);
      
      const updatedTurmas = turmas.filter(turma => turma.id !== turmaId);
      setTurmas(updatedTurmas);
      
      toast({
        title: "Sucesso",
        description: "Turma excluída com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir turma:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a turma.",
        variant: "destructive",
      });
    }
  };

  // Funções para gerenciar horários
  const openCreateHorarioModal = () => {
    setEditingHorario(null);
    setHorarioFormData({
      turma: '',
      diaSemana: '',
      horaInicio: '',
      horaFim: '',
      disciplina: '',
      professor: ''
    });
    setIsHorarioModalOpen(true);
  };

  const openEditHorarioModal = (horario: Horario) => {
    setEditingHorario(horario);
    setHorarioFormData({ ...horario });
    setIsHorarioModalOpen(true);
  };

  const handleSaveHorario = async () => {
    if (!horarioFormData.turma || !horarioFormData.diaSemana || !horarioFormData.horaInicio || 
        !horarioFormData.horaFim || !horarioFormData.disciplina || !horarioFormData.professor) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingHorario) {
        // Aqui você conectaria com o backend para atualizar o horário
        // PUT /api/horarios/{id}
        console.log('Atualizando horário:', editingHorario.id, horarioFormData);
        
        const updatedHorarios = horarios.map(horario =>
          horario.id === editingHorario.id
            ? { ...horario, ...horarioFormData }
            : horario
        );
        setHorarios(updatedHorarios);
        
        toast({
          title: "Sucesso",
          description: "Horário atualizado com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar novo horário
        // POST /api/horarios
        console.log('Criando novo horário:', horarioFormData);
        
        const newHorario: Horario = {
          id: Date.now().toString(),
          ...horarioFormData
        };
        setHorarios([...horarios, newHorario]);
        
        toast({
          title: "Sucesso",
          description: "Horário criado com sucesso!",
        });
      }
      
      setIsHorarioModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar horário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o horário.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHorario = async (horarioId: string) => {
    if (!confirm('Tem certeza que deseja excluir este horário?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir o horário
      // DELETE /api/horarios/{id}
      console.log('Excluindo horário:', horarioId);
      
      const updatedHorarios = horarios.filter(horario => horario.id !== horarioId);
      setHorarios(updatedHorarios);
      
      toast({
        title: "Sucesso",
        description: "Horário excluído com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir horário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o horário.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados...</p>
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
          <h1 className="text-3xl font-bold text-foreground">Turmas e Horários</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as turmas da escola e configure os horários de aulas
          </p>
        </div>

        {/* Tabs para alternar entre turmas e horários */}
        <Tabs defaultValue="turmas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="turmas">Turmas</TabsTrigger>
            <TabsTrigger value="horarios">Horários</TabsTrigger>
          </TabsList>

          {/* Tab de Turmas */}
          <TabsContent value="turmas" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Gerenciar Turmas</h2>
                <p className="text-muted-foreground">Criar e editar turmas da escola</p>
              </div>
              <Button onClick={openCreateTurmaModal} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nova Turma</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Turmas ({turmas.length})</CardTitle>
                <CardDescription>Todas as turmas cadastradas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Sala</TableHead>
                      <TableHead>Professor Responsável</TableHead>
                      <TableHead>Alunos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {turmas.map((turma) => (
                      <TableRow key={turma.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <BookOpen className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{turma.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{turma.curso}</TableCell>
                        <TableCell>{turma.sala}</TableCell>
                        <TableCell>{turma.professor}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{turma.totalAlunos}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={turma.status === 'ativa' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                            {turma.status.charAt(0).toUpperCase() + turma.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditTurmaModal(turma)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTurma(turma.id)}
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Horários */}
          <TabsContent value="horarios" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Gerenciar Horários</h2>
                <p className="text-muted-foreground">Configurar horários de aulas das turmas</p>
              </div>
              <Button onClick={openCreateHorarioModal} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Horário</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Horários ({horarios.length})</CardTitle>
                <CardDescription>Todos os horários de aulas configurados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turma</TableHead>
                      <TableHead>Dia da Semana</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {horarios.map((horario) => (
                      <TableRow key={horario.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{horario.turma}</span>
                          </div>
                        </TableCell>
                        <TableCell>{horario.diaSemana}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{horario.horaInicio} - {horario.horaFim}</span>
                          </div>
                        </TableCell>
                        <TableCell>{horario.disciplina}</TableCell>
                        <TableCell>{horario.professor}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditHorarioModal(horario)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteHorario(horario.id)}
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal de Turma */}
        <Dialog open={isTurmaModalOpen} onOpenChange={setIsTurmaModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTurma ? 'Editar Turma' : 'Criar Nova Turma'}
              </DialogTitle>
              <DialogDescription>
                {editingTurma 
                  ? 'Altere as informações da turma conforme necessário.'
                  : 'Preencha as informações para criar uma nova turma.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="turmaName">Nome da Turma *</Label>
                <Input
                  id="turmaName"
                  value={turmaFormData.name}
                  onChange={(e) => setTurmaFormData({...turmaFormData, name: e.target.value})}
                  placeholder="Ex: Turma A, 1º Ano A"
                />
              </div>

              <div className="space-y-2">
                <Label>Curso *</Label>
                <Select value={turmaFormData.curso} onValueChange={(value) => setTurmaFormData({...turmaFormData, curso: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {cursosDisponiveis.map(curso => (
                      <SelectItem key={curso} value={curso}>{curso}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sala *</Label>
                <Select value={turmaFormData.sala} onValueChange={(value) => setTurmaFormData({...turmaFormData, sala: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {salasDisponiveis.map(sala => (
                      <SelectItem key={sala} value={sala}>{sala}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Professor Responsável *</Label>
                <Select value={turmaFormData.professor} onValueChange={(value) => setTurmaFormData({...turmaFormData, professor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professoresDisponiveis.map(professor => (
                      <SelectItem key={professor} value={professor}>{professor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsTurmaModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveTurma}>
                {editingTurma ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Horário */}
        <Dialog open={isHorarioModalOpen} onOpenChange={setIsHorarioModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingHorario ? 'Editar Horário' : 'Criar Novo Horário'}
              </DialogTitle>
              <DialogDescription>
                {editingHorario 
                  ? 'Altere as informações do horário conforme necessário.'
                  : 'Preencha as informações para criar um novo horário de aula.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Turma *</Label>
                <Select value={horarioFormData.turma} onValueChange={(value) => setHorarioFormData({...horarioFormData, turma: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {turmas.map(turma => (
                      <SelectItem key={turma.id} value={turma.name}>{turma.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Dia da Semana *</Label>
                <Select value={horarioFormData.diaSemana} onValueChange={(value) => setHorarioFormData({...horarioFormData, diaSemana: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {diasSemana.map(dia => (
                      <SelectItem key={dia} value={dia}>{dia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaInicio">Hora Início *</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={horarioFormData.horaInicio}
                    onChange={(e) => setHorarioFormData({...horarioFormData, horaInicio: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaFim">Hora Fim *</Label>
                  <Input
                    id="horaFim"
                    type="time"
                    value={horarioFormData.horaFim}
                    onChange={(e) => setHorarioFormData({...horarioFormData, horaFim: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Disciplina *</Label>
                <Select value={horarioFormData.disciplina} onValueChange={(value) => setHorarioFormData({...horarioFormData, disciplina: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinasDisponiveis.map(disciplina => (
                      <SelectItem key={disciplina} value={disciplina}>{disciplina}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Professor *</Label>
                <Select value={horarioFormData.professor} onValueChange={(value) => setHorarioFormData({...horarioFormData, professor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professoresDisponiveis.map(professor => (
                      <SelectItem key={professor} value={professor}>{professor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsHorarioModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveHorario}>
                {editingHorario ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TurmasAdmin;