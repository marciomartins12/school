import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Save, GraduationCap, BookOpen, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Interface para os dados dos alunos
interface Student {
  id: string;
  name: string;
  email: string;
  turma: string;
  notas: {
    [disciplina: string]: {
      nota1?: number;
      nota2?: number;
      nota3?: number;
      nota4?: number;
      media?: number;
    };
  };
}

// Interface para as disciplinas
interface Disciplina {
  id: string;
  nome: string;
  codigo: string;
}

// Página de lançamento de notas do professor
const LancarNotas: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Estados para gerenciar dados
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTurma, setSelectedTurma] = useState<string>('');
  const [selectedDisciplina, setSelectedDisciplina] = useState<string>('');
  const [selectedBimestre, setSelectedBimestre] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados simulados das turmas e disciplinas
  const turmasDisponiveis = user?.turmas || ['Turma A', 'Turma B', 'Turma C'];
  const disciplinasDisponiveis: Disciplina[] = [
    { id: '1', nome: 'Matemática', codigo: 'MAT' },
    { id: '2', nome: 'Português', codigo: 'POR' },
    { id: '3', nome: 'História', codigo: 'HIS' },
    { id: '4', nome: 'Geografia', codigo: 'GEO' },
    { id: '5', nome: 'Ciências', codigo: 'CIE' },
  ];

  const bimestres = [
    { value: '1', label: '1º Bimestre' },
    { value: '2', label: '2º Bimestre' },
    { value: '3', label: '3º Bimestre' },
    { value: '4', label: '4º Bimestre' },
  ];

  // Carregar dados quando o componente for montado
  useEffect(() => {
    loadStudentsData();
  }, []);

  // Filtrar alunos quando os critérios mudarem
  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedTurma]);

  // Função para carregar dados dos alunos
  const loadStudentsData = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os alunos das turmas do professor
      // GET /api/professor/{professorId}/students
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados dos alunos
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Ana Silva Costa',
          email: 'ana.silva@email.com',
          turma: 'Turma A',
          notas: {
            'Matemática': { nota1: 8.5, nota2: 7.0, nota3: 9.0, media: 8.2 },
            'Português': { nota1: 7.5, nota2: 8.0, nota3: 8.5, media: 8.0 },
          }
        },
        {
          id: '2',
          name: 'João Santos Oliveira',
          email: 'joao.santos@email.com',
          turma: 'Turma A',
          notas: {
            'Matemática': { nota1: 6.0, nota2: 7.5, nota3: 8.0, media: 7.2 },
            'Português': { nota1: 9.0, nota2: 8.5, nota3: 9.5, media: 9.0 },
          }
        },
        {
          id: '3',
          name: 'Maria Fernanda Lima',
          email: 'maria.lima@email.com',
          turma: 'Turma B',
          notas: {
            'Matemática': { nota1: 9.5, nota2: 9.0, nota3: 9.8, media: 9.4 },
            'Português': { nota1: 8.0, nota2: 8.5, nota3: 8.0, media: 8.2 },
          }
        },
        {
          id: '4',
          name: 'Pedro Henrique Silva',
          email: 'pedro.silva@email.com',
          turma: 'Turma B',
          notas: {
            'Matemática': { nota1: 7.0, nota2: 6.5, nota3: 7.5, media: 7.0 },
            'Português': { nota1: 6.5, nota2: 7.0, nota3: 7.0, media: 6.8 },
          }
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
    if (selectedTurma) {
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

  // Função para atualizar nota de um aluno
  const handleUpdateNota = (studentId: string, nota: number) => {
    if (!selectedDisciplina) {
      toast({
        title: "Erro",
        description: "Selecione uma disciplina primeiro.",
        variant: "destructive",
      });
      return;
    }

    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        const notaKey = `nota${selectedBimestre}` as keyof typeof student.notas[string];
        const disciplinaNome = disciplinasDisponiveis.find(d => d.id === selectedDisciplina)?.nome || '';
        
        return {
          ...student,
          notas: {
            ...student.notas,
            [disciplinaNome]: {
              ...student.notas[disciplinaNome],
              [notaKey]: nota
            }
          }
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
  };

  // Função para calcular média automaticamente
  const calcularMedia = (notas: any) => {
    const valores = [notas.nota1, notas.nota2, notas.nota3, notas.nota4].filter(n => n !== undefined);
    if (valores.length === 0) return 0;
    return valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
  };

  // Função para salvar todas as notas
  const handleSaveNotas = async () => {
    if (!selectedTurma || !selectedDisciplina) {
      toast({
        title: "Erro de validação",
        description: "Selecione uma turma e disciplina primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Aqui você conectaria com o backend para salvar as notas
      // PUT /api/professor/notas
      console.log('Salvando notas:', {
        turma: selectedTurma,
        disciplina: selectedDisciplina,
        bimestre: selectedBimestre,
        notas: filteredStudents.map(student => ({
          studentId: student.id,
          nota: student.notas[disciplinasDisponiveis.find(d => d.id === selectedDisciplina)?.nome || '']?.[`nota${selectedBimestre}` as keyof typeof student.notas[string]]
        }))
      });
      
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: "Notas salvas com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as notas.",
        variant: "destructive",
      });
    }
  };

  // Função para obter cor baseada na nota
  const getNotaColor = (nota: number) => {
    if (nota >= 9) return 'text-success';
    if (nota >= 7) return 'text-warning';
    if (nota >= 5) return 'text-accent';
    return 'text-destructive';
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lançar Notas</h1>
            <p className="text-muted-foreground mt-2">
              Registre as notas dos alunos por disciplina e bimestre
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {filteredStudents.length} aluno(s)
            </span>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Seleção da turma */}
              <div>
                <Label>Turma *</Label>
                <Select value={selectedTurma} onValueChange={setSelectedTurma}>
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
              
              {/* Seleção da disciplina */}
              <div>
                <Label>Disciplina *</Label>
                <Select value={selectedDisciplina} onValueChange={setSelectedDisciplina}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinasDisponiveis.map(disciplina => (
                      <SelectItem key={disciplina.id} value={disciplina.id}>
                        {disciplina.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Seleção do bimestre */}
              <div>
                <Label>Bimestre</Label>
                <Select value={selectedBimestre} onValueChange={setSelectedBimestre}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bimestres.map(bimestre => (
                      <SelectItem key={bimestre.value} value={bimestre.value}>
                        {bimestre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Busca por aluno */}
              <div>
                <Label htmlFor="search">Buscar aluno</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome do aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de notas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Lançamento de Notas</span>
                </CardTitle>
                <CardDescription>
                  {selectedTurma && selectedDisciplina
                    ? `${selectedTurma} - ${disciplinasDisponiveis.find(d => d.id === selectedDisciplina)?.nome} - ${bimestres.find(b => b.value === selectedBimestre)?.label}`
                    : 'Selecione uma turma e disciplina para começar'
                  }
                </CardDescription>
              </div>
              
              {selectedTurma && selectedDisciplina && (
                <Button onClick={handleSaveNotas} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Salvar Notas</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedTurma && selectedDisciplina ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead className="text-center">
                      Nota - {bimestres.find(b => b.value === selectedBimestre)?.label}
                    </TableHead>
                    <TableHead className="text-center">Média Atual</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const disciplinaNome = disciplinasDisponiveis.find(d => d.id === selectedDisciplina)?.nome || '';
                    const notasStudent = student.notas[disciplinaNome] || {};
                    const notaAtual = notasStudent[`nota${selectedBimestre}` as keyof typeof notasStudent] as number || 0;
                    const media = calcularMedia(notasStudent);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <GraduationCap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.turma}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={notaAtual || ''}
                            onChange={(e) => handleUpdateNota(student.id, parseFloat(e.target.value) || 0)}
                            className="w-20 text-center"
                            placeholder="0.0"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-medium ${getNotaColor(media)}`}>
                            {media.toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={media >= 7 ? "default" : media >= 5 ? "secondary" : "destructive"}
                          >
                            {media >= 7 ? 'Aprovado' : media >= 5 ? 'Recuperação' : 'Reprovado'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Selecione uma turma e disciplina</h3>
                <p className="text-muted-foreground">
                  Para começar a lançar notas, selecione uma turma e disciplina nos filtros acima.
                </p>
              </div>
            )}

            {selectedTurma && selectedDisciplina && filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum aluno encontrado para os filtros selecionados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LancarNotas;