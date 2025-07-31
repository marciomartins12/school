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
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, Edit, Trash2, Users, Mail, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interface para os dados do professor
interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  turmas: string[];
  status: 'ativo' | 'inativo';
  createdAt: string;
}

// Interface para o formulário de professor
interface TeacherForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  turmas: string[];
  password: string;
}

// Página de gerenciamento de professores
const ProfessoresAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Estados para gerenciar professores
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para o modal de cadastro/edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<TeacherForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    turmas: [],
    password: ''
  });

  // Listas simuladas
  const disciplinasDisponiveis = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química', 'Biologia', 'Inglês', 'Educação Física'];
  const turmasDisponiveis = ['Turma A', 'Turma B', 'Turma C', 'Turma D', 'Turma E'];

  // Carregar lista de professores ao montar o componente
  useEffect(() => {
    loadTeachers();
  }, []);

  // Filtrar professores quando o termo de busca mudar
  useEffect(() => {
    filterTeachers();
  }, [teachers, searchTerm]);

  // Função para carregar professores do backend
  const loadTeachers = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os professores
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTeachers: Teacher[] = [
        {
          id: '1',
          name: 'Prof. Carlos Silva',
          email: 'carlos.silva@escola.com',
          phone: '(11) 98888-1111',
          subject: 'Matemática',
          turmas: ['Turma A', 'Turma B'],
          status: 'ativo',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Profa. Maria Santos',
          email: 'maria.santos@escola.com',
          phone: '(11) 98888-2222',
          subject: 'Português',
          turmas: ['Turma A', 'Turma C'],
          status: 'ativo',
          createdAt: '2024-01-20'
        },
        {
          id: '3',
          name: 'Prof. João Oliveira',
          email: 'joao.oliveira@escola.com',
          phone: '(11) 98888-3333',
          subject: 'História',
          turmas: ['Turma B', 'Turma D'],
          status: 'ativo',
          createdAt: '2024-02-01'
        }
      ];
      
      setTeachers(mockTeachers);
      
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de professores.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para filtrar professores
  const filterTeachers = () => {
    let filtered = teachers;
    
    if (searchTerm) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTeachers(filtered);
  };

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      turmas: [],
      password: ''
    });
    setIsModalOpen(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      turmas: teacher.turmas,
      password: ''
    });
    setIsModalOpen(true);
  };

  // Função para gerenciar seleção de turmas
  const handleTurmaChange = (turma: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, turmas: [...formData.turmas, turma]});
    } else {
      setFormData({...formData, turmas: formData.turmas.filter(t => t !== turma)});
    }
  };

  // Função para salvar professor
  const handleSaveTeacher = async () => {
    if (!formData.name || !formData.email || !formData.subject || formData.turmas.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTeacher) {
        // Aqui você conectaria com o backend para atualizar o professor
        // PUT /api/teachers/{id}
        console.log('Atualizando professor:', editingTeacher.id, formData);
        
        const updatedTeachers = teachers.map(teacher =>
          teacher.id === editingTeacher.id
            ? { ...teacher, ...formData }
            : teacher
        );
        setTeachers(updatedTeachers);
        
        toast({
          title: "Sucesso",
          description: "Professor atualizado com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar novo professor
        // POST /api/teachers
        console.log('Criando novo professor:', formData);
        
        const newTeacher: Teacher = {
          id: Date.now().toString(),
          ...formData,
          status: 'ativo',
          createdAt: new Date().toISOString()
        };
        setTeachers([...teachers, newTeacher]);
        
        toast({
          title: "Sucesso",
          description: "Professor cadastrado com sucesso!",
        });
      }
      
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o professor.",
        variant: "destructive",
      });
    }
  };

  // Função para excluir professor
  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm('Tem certeza que deseja excluir este professor?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir o professor
      // DELETE /api/teachers/{id}
      console.log('Excluindo professor:', teacherId);
      
      const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
      setTeachers(updatedTeachers);
      
      toast({
        title: "Sucesso",
        description: "Professor excluído com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o professor.",
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
            <p className="text-muted-foreground">Carregando professores...</p>
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
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Professores</h1>
            <p className="text-muted-foreground mt-2">
              Cadastre, edite e atribua professores às turmas
            </p>
          </div>
          
          <Button onClick={openCreateModal} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Professor</span>
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar professor</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Digite o nome, email ou disciplina..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de professores */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Professores ({filteredTeachers.length})</CardTitle>
            <CardDescription>
              Todos os professores cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Turmas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-secondary/10 rounded-full">
                          <Users className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground">{teacher.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.turmas.map((turma) => (
                          <Badge key={turma} variant="outline" className="text-xs">
                            {turma}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={teacher.status === 'ativo' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                        {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(teacher)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher.id)}
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

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum professor encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de cadastro/edição */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? 'Editar Professor' : 'Cadastrar Novo Professor'}
              </DialogTitle>
              <DialogDescription>
                {editingTeacher 
                  ? 'Altere as informações do professor conforme necessário.'
                  : 'Preencha todas as informações para cadastrar um novo professor.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nome completo do professor"
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
                    placeholder="email@escola.com"
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

                {/* Disciplina */}
                <div className="space-y-2">
                  <Label>Disciplina Principal *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
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
              </div>

              {/* Turmas */}
              <div className="space-y-2">
                <Label>Turmas que leciona *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-border rounded-lg">
                  {turmasDisponiveis.map((turma) => (
                    <div key={turma} className="flex items-center space-x-2">
                      <Checkbox
                        id={turma}
                        checked={formData.turmas.includes(turma)}
                        onCheckedChange={(checked) => handleTurmaChange(turma, checked as boolean)}
                      />
                      <Label htmlFor={turma} className="text-sm">{turma}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Senha (apenas para criação) */}
              {!editingTeacher && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha Inicial *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Senha inicial para o professor"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveTeacher}>
                {editingTeacher ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ProfessoresAdmin;