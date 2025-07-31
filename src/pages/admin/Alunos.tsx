import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, GraduationCap, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interface para os dados do aluno
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  turma: string;
  curso: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  createdAt: string;
}

// Interface para o formulário de aluno
interface StudentForm {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  turma: string;
  curso: string;
  password: string;
}

// Página de gerenciamento de alunos
const AlunosAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Estados para gerenciar alunos
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTurma, setSelectedTurma] = useState<string>('todas');
  
  // Estados para o modal de cadastro/edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentForm>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    turma: '',
    curso: '',
    password: ''
  });

  // Listas simuladas para selects
  const turmasDisponiveis = ['Turma A', 'Turma B', 'Turma C', 'Turma D', 'Turma E'];
  const cursosDisponiveis = ['Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio', 'Pré-Vestibular'];

  // Carregar lista de alunos ao montar o componente
  useEffect(() => {
    loadStudents();
  }, []);

  // Filtrar alunos quando os critérios de busca mudarem
  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedTurma]);

  // Função para carregar alunos do backend
  const loadStudents = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os alunos
      // Simulando dados de alunos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Ana Silva Costa',
          email: 'ana.silva@email.com',
          phone: '(11) 99999-1111',
          birthDate: '2005-03-15',
          turma: 'Turma A',
          curso: 'Ensino Médio',
          status: 'ativo',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'João Santos Oliveira',
          email: 'joao.santos@email.com',
          phone: '(11) 99999-2222',
          birthDate: '2006-07-22',
          turma: 'Turma B',
          curso: 'Ensino Médio',
          status: 'ativo',
          createdAt: '2024-01-20'
        },
        {
          id: '3',
          name: 'Maria Fernanda Lima',
          email: 'maria.lima@email.com',
          phone: '(11) 99999-3333',
          birthDate: '2004-12-08',
          turma: 'Turma C',
          curso: 'Pré-Vestibular',
          status: 'ativo',
          createdAt: '2024-02-01'
        }
      ];
      
      setStudents(mockStudents);
      
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de alunos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para filtrar alunos
  const filterStudents = () => {
    let filtered = students;
    
    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por turma
    if (selectedTurma !== 'todas') {
      filtered = filtered.filter(student => student.turma === selectedTurma);
    }
    
    setFilteredStudents(filtered);
  };

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      turma: '',
      curso: '',
      password: ''
    });
    setIsModalOpen(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      birthDate: student.birthDate,
      turma: student.turma,
      curso: student.curso,
      password: '' // Não mostramos a senha atual
    });
    setIsModalOpen(true);
  };

  // Função para salvar aluno (criar ou editar)
  const handleSaveStudent = async () => {
    // Validação básica
    if (!formData.name || !formData.email || !formData.turma || !formData.curso) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingStudent) {
        // Aqui você conectaria com o backend para atualizar o aluno
        // PUT /api/students/{id}
        console.log('Atualizando aluno:', editingStudent.id, formData);
        
        // Simular atualização local
        const updatedStudents = students.map(student =>
          student.id === editingStudent.id
            ? { ...student, ...formData }
            : student
        );
        setStudents(updatedStudents);
        
        toast({
          title: "Sucesso",
          description: "Aluno atualizado com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar novo aluno
        // POST /api/students
        console.log('Criando novo aluno:', formData);
        
        // Simular criação local
        const newStudent: Student = {
          id: Date.now().toString(),
          ...formData,
          status: 'ativo',
          createdAt: new Date().toISOString()
        };
        setStudents([...students, newStudent]);
        
        toast({
          title: "Sucesso",
          description: "Aluno cadastrado com sucesso!",
        });
      }
      
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o aluno.",
        variant: "destructive",
      });
    }
  };

  // Função para excluir aluno
  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir o aluno
      // DELETE /api/students/{id}
      console.log('Excluindo aluno:', studentId);
      
      // Simular exclusão local
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);
      
      toast({
        title: "Sucesso",
        description: "Aluno excluído com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o aluno.",
        variant: "destructive",
      });
    }
  };

  // Função para obter cor do badge de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-success text-success-foreground';
      case 'inativo':
        return 'bg-muted text-muted-foreground';
      case 'suspenso':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando alunos...</p>
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
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Alunos</h1>
            <p className="text-muted-foreground mt-2">
              Cadastre, edite e gerencie todos os alunos da escola
            </p>
          </div>
          
          <Button onClick={openCreateModal} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Aluno</span>
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca por nome/email */}
              <div className="flex-1">
                <Label htmlFor="search">Buscar aluno</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Digite o nome ou email do aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Filtro por turma */}
              <div className="w-full md:w-48">
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
            </div>
          </CardContent>
        </Card>

        {/* Tabela de alunos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Alunos ({filteredStudents.length})</CardTitle>
            <CardDescription>
              Todos os alunos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{student.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.turma}</TableCell>
                    <TableCell>{student.curso}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
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

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum aluno encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de cadastro/edição */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStudent ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
              </DialogTitle>
              <DialogDescription>
                {editingStudent 
                  ? 'Altere as informações do aluno conforme necessário.'
                  : 'Preencha todas as informações para cadastrar um novo aluno.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nome completo do aluno"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>

              {/* Data de nascimento */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
              </div>

              {/* Turma */}
              <div className="space-y-2">
                <Label>Turma *</Label>
                <Select value={formData.turma} onValueChange={(value) => setFormData({...formData, turma: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {turmasDisponiveis.map(turma => (
                      <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Curso */}
              <div className="space-y-2">
                <Label>Curso *</Label>
                <Select value={formData.curso} onValueChange={(value) => setFormData({...formData, curso: value})}>
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

              {/* Senha (apenas para criação) */}
              {!editingStudent && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password">Senha Inicial *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Senha inicial para o aluno"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveStudent}>
                {editingStudent ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AlunosAdmin;