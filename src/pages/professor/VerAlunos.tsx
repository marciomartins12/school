import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Users, GraduationCap, TrendingUp, TrendingDown, Mail, Phone, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Interface para os dados dos alunos
interface StudentDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  turma: string;
  curso: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  // Dados de desempenho
  mediaGeral: number;
  frequencia: number;
  totalFaltas: number;
  disciplinas: {
    nome: string;
    media: number;
    faltas: number;
    ultimaAvaliacao: string;
  }[];
  // Informações adicionais
  responsavel: {
    nome: string;
    telefone: string;
    email: string;
  };
  observacoes: string;
}

// Página de visualização de alunos do professor
const VerAlunos: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Estados para gerenciar dados
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTurma, setSelectedTurma] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Dados simulados das turmas
  const turmasDisponiveis = user?.turmas || ['Turma A', 'Turma B', 'Turma C'];

  // Carregar dados quando o componente for montado
  useEffect(() => {
    loadStudentsData();
  }, []);

  // Filtrar alunos quando os critérios mudarem
  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedTurma]);

  // Função para carregar dados detalhados dos alunos
  const loadStudentsData = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os dados detalhados dos alunos
      // GET /api/professor/{professorId}/students-details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados dos alunos com informações detalhadas
      const mockStudents: StudentDetail[] = [
        {
          id: '1',
          name: 'Ana Silva Costa',
          email: 'ana.silva@email.com',
          phone: '(11) 99999-1111',
          birthDate: '2005-03-15',
          turma: 'Turma A',
          curso: 'Ensino Médio',
          status: 'ativo',
          mediaGeral: 8.5,
          frequencia: 92,
          totalFaltas: 3,
          disciplinas: [
            { nome: 'Matemática', media: 8.5, faltas: 1, ultimaAvaliacao: '2024-11-25' },
            { nome: 'Português', media: 9.0, faltas: 0, ultimaAvaliacao: '2024-11-20' },
            { nome: 'História', media: 7.5, faltas: 2, ultimaAvaliacao: '2024-11-18' },
            { nome: 'Geografia', media: 8.0, faltas: 0, ultimaAvaliacao: '2024-11-22' },
          ],
          responsavel: {
            nome: 'Carlos Silva',
            telefone: '(11) 98888-1111',
            email: 'carlos.silva@email.com'
          },
          observacoes: 'Aluna dedicada, participativa nas aulas. Demonstra interesse especial em matemática.'
        },
        {
          id: '2',
          name: 'João Santos Oliveira',
          email: 'joao.santos@email.com',
          phone: '(11) 99999-2222',
          birthDate: '2006-07-22',
          turma: 'Turma A',
          curso: 'Ensino Médio',
          status: 'ativo',
          mediaGeral: 7.2,
          frequencia: 88,
          totalFaltas: 5,
          disciplinas: [
            { nome: 'Matemática', media: 7.0, faltas: 2, ultimaAvaliacao: '2024-11-25' },
            { nome: 'Português', media: 8.0, faltas: 1, ultimaAvaliacao: '2024-11-20' },
            { nome: 'História', media: 6.5, faltas: 1, ultimaAvaliacao: '2024-11-18' },
            { nome: 'Geografia', media: 7.3, faltas: 1, ultimaAvaliacao: '2024-11-22' },
          ],
          responsavel: {
            nome: 'Maria Santos',
            telefone: '(11) 98888-2222',
            email: 'maria.santos@email.com'
          },
          observacoes: 'Aluno com potencial, mas precisa melhorar a frequência. Demonstra dificuldade em História.'
        },
        {
          id: '3',
          name: 'Maria Fernanda Lima',
          email: 'maria.lima@email.com',
          phone: '(11) 99999-3333',
          birthDate: '2004-12-08',
          turma: 'Turma B',
          curso: 'Pré-Vestibular',
          status: 'ativo',
          mediaGeral: 9.2,
          frequencia: 98,
          totalFaltas: 1,
          disciplinas: [
            { nome: 'Matemática', media: 9.5, faltas: 0, ultimaAvaliacao: '2024-11-25' },
            { nome: 'Português', media: 9.0, faltas: 0, ultimaAvaliacao: '2024-11-20' },
            { nome: 'História', media: 8.8, faltas: 1, ultimaAvaliacao: '2024-11-18' },
            { nome: 'Geografia', media: 9.5, faltas: 0, ultimaAvaliacao: '2024-11-22' },
          ],
          responsavel: {
            nome: 'Roberto Lima',
            telefone: '(11) 98888-3333',
            email: 'roberto.lima@email.com'
          },
          observacoes: 'Excelente aluna! Demonstra excepcional dedicação e aproveitamento em todas as disciplinas.'
        },
        {
          id: '4',
          name: 'Pedro Henrique Silva',
          email: 'pedro.silva@email.com',
          phone: '(11) 99999-4444',
          birthDate: '2005-09-10',
          turma: 'Turma B',
          curso: 'Ensino Médio',
          status: 'ativo',
          mediaGeral: 6.8,
          frequencia: 85,
          totalFaltas: 7,
          disciplinas: [
            { nome: 'Matemática', media: 6.5, faltas: 3, ultimaAvaliacao: '2024-11-25' },
            { nome: 'Português', media: 7.0, faltas: 2, ultimaAvaliacao: '2024-11-20' },
            { nome: 'História', media: 6.0, faltas: 1, ultimaAvaliacao: '2024-11-18' },
            { nome: 'Geografia', media: 7.8, faltas: 1, ultimaAvaliacao: '2024-11-22' },
          ],
          responsavel: {
            nome: 'Ana Silva',
            telefone: '(11) 98888-4444',
            email: 'ana.silva.responsavel@email.com'
          },
          observacoes: 'Aluno precisa de acompanhamento mais próximo. Demonstra dificuldades principalmente em matemática.'
        }
      ];
      
      setStudents(mockStudents);
      
    } catch (error) {
      console.error('Erro ao carregar dados dos alunos:', error);
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
    
    // Filtrar por turma
    if (selectedTurma !== 'todas') {
      filtered = filtered.filter(student => student.turma === selectedTurma);
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStudents(filtered);
  };

  // Função para visualizar detalhes do aluno
  const handleViewDetails = (student: StudentDetail) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  // Função para obter cor do status
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

  // Função para obter cor da média
  const getMediaColor = (media: number) => {
    if (media >= 9) return 'text-success';
    if (media >= 7) return 'text-warning';
    if (media >= 5) return 'text-accent';
    return 'text-destructive';
  };

  // Função para obter cor da frequência
  const getFrequenciaColor = (frequencia: number) => {
    if (frequencia >= 90) return 'text-success';
    if (frequencia >= 75) return 'text-warning';
    return 'text-destructive';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados dos alunos...</p>
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
            <h1 className="text-3xl font-bold text-foreground">Meus Alunos</h1>
            <p className="text-muted-foreground mt-2">
              Visualize o desempenho e informações detalhadas dos seus alunos
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {filteredStudents.length} aluno(s)
            </span>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca por nome */}
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
              Informações gerais e desempenho dos alunos das suas turmas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead className="text-center">Média Geral</TableHead>
                  <TableHead className="text-center">Frequência</TableHead>
                  <TableHead className="text-center">Total Faltas</TableHead>
                  <TableHead className="text-center">Status</TableHead>
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
                          <div className="text-sm text-muted-foreground flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.turma}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`font-medium ${getMediaColor(student.mediaGeral)}`}>
                          {student.mediaGeral.toFixed(1)}
                        </span>
                        {student.mediaGeral >= 8 ? 
                          <TrendingUp className="h-4 w-4 text-success" /> : 
                          student.mediaGeral >= 6 ?
                          <span className="h-4 w-4" /> :
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        }
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <span className={`font-medium ${getFrequenciaColor(student.frequencia)}`}>
                          {student.frequencia}%
                        </span>
                        <Progress 
                          value={student.frequencia} 
                          className="w-16 mx-auto h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={student.totalFaltas <= 3 ? "secondary" : student.totalFaltas <= 6 ? "destructive" : "destructive"}
                      >
                        {student.totalFaltas}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(student)}
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum aluno encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de detalhes do aluno */}
        {showDetails && selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Header do modal */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedStudent.name}</h2>
                    <p className="text-muted-foreground">{selectedStudent.turma} - {selectedStudent.curso}</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Fechar
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Informações pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(selectedStudent.birthDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Responsável</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium">{selectedStudent.responsavel.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.responsavel.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.responsavel.email}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Desempenho por disciplina */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Desempenho por Disciplina</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disciplina</TableHead>
                          <TableHead className="text-center">Média</TableHead>
                          <TableHead className="text-center">Faltas</TableHead>
                          <TableHead className="text-center">Última Avaliação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent.disciplinas.map((disciplina, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{disciplina.nome}</TableCell>
                            <TableCell className="text-center">
                              <span className={`font-medium ${getMediaColor(disciplina.media)}`}>
                                {disciplina.media.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={disciplina.faltas <= 2 ? "secondary" : "destructive"}>
                                {disciplina.faltas}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {new Date(disciplina.ultimaAvaliacao).toLocaleDateString('pt-BR')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Observações */}
                {selectedStudent.observacoes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Observações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedStudent.observacoes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VerAlunos;