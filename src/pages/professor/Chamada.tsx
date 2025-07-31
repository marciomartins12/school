import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckSquare, Users, Save, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Interfaces para chamada
interface Student {
  id: string;
  name: string;
  matricula: string;
  present: boolean;
}

interface AttendanceRecord {
  id: string;
  turma: string;
  date: string;
  professor: string;
  totalAlunos: number;
  presentes: number;
  ausentes: number;
}

// Página de chamada do professor
const Chamada: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Estados para chamada
  const [selectedTurma, setSelectedTurma] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Turmas do professor (simuladas baseadas no contexto do usuário)
  const professorTurmas = user?.turmas || ['Turma A', 'Turma B', 'Turma C'];

  // Carregar histórico de chamadas ao montar o componente
  useEffect(() => {
    loadAttendanceHistory();
  }, []);

  // Carregar alunos quando turma for selecionada
  useEffect(() => {
    if (selectedTurma) {
      loadStudents();
    }
  }, [selectedTurma, selectedDate]);

  // Função para carregar histórico de chamadas
  const loadAttendanceHistory = async () => {
    try {
      // Aqui você conectaria com o backend para buscar histórico de chamadas
      // GET /api/professor/attendance/history/{professorId}
      
      const mockHistory: AttendanceRecord[] = [
        {
          id: '1',
          turma: 'Turma A',
          date: '2024-12-01',
          professor: user?.name || 'Professor',
          totalAlunos: 25,
          presentes: 23,
          ausentes: 2
        },
        {
          id: '2',
          turma: 'Turma B',
          date: '2024-12-01',
          professor: user?.name || 'Professor',
          totalAlunos: 28,
          presentes: 26,
          ausentes: 2
        }
      ];
      
      setAttendanceHistory(mockHistory);
      
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  // Função para carregar alunos da turma
  const loadStudents = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar alunos da turma
      // GET /api/turmas/{turmaId}/students
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar se já existe chamada para esta data
      const existingAttendance = attendanceHistory.find(
        record => record.turma === selectedTurma && record.date === selectedDate
      );
      
      // Dados simulados de alunos
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Ana Silva Costa',
          matricula: '2024001',
          present: existingAttendance ? true : false // Se já tem chamada, marcar como presente
        },
        {
          id: '2',
          name: 'João Santos Oliveira',
          matricula: '2024002',
          present: existingAttendance ? true : false
        },
        {
          id: '3',
          name: 'Maria Fernanda Lima',
          matricula: '2024003',
          present: existingAttendance ? false : false // Exemplo: aluno faltou
        },
        {
          id: '4',
          name: 'Pedro Henrique Silva',
          matricula: '2024004',
          present: existingAttendance ? true : false
        },
        {
          id: '5',
          name: 'Carla Beatriz Santos',
          matricula: '2024005',
          present: existingAttendance ? true : false
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

  // Função para alterar presença de um aluno
  const toggleStudentPresence = (studentId: string) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, present: !student.present }
        : student
    ));
  };

  // Função para marcar todos como presentes
  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, present: true })));
  };

  // Função para marcar todos como ausentes
  const markAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, present: false })));
  };

  // Função para salvar chamada
  const saveAttendance = async () => {
    if (!selectedTurma || !selectedDate || students.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Selecione uma turma, data e carregue os alunos.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Aqui você conectaria com o backend para salvar a chamada
      // POST /api/professor/attendance
      const attendanceData = {
        turma: selectedTurma,
        date: selectedDate,
        professor: user?.name,
        students: students.map(student => ({
          studentId: student.id,
          present: student.present
        }))
      };
      
      console.log('Salvando chamada:', attendanceData);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Atualizar histórico local
      const presentes = students.filter(s => s.present).length;
      const ausentes = students.length - presentes;
      
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        turma: selectedTurma,
        date: selectedDate,
        professor: user?.name || 'Professor',
        totalAlunos: students.length,
        presentes,
        ausentes
      };
      
      // Remover registro existente se houver e adicionar o novo
      const updatedHistory = attendanceHistory.filter(
        record => !(record.turma === selectedTurma && record.date === selectedDate)
      );
      updatedHistory.unshift(newRecord);
      setAttendanceHistory(updatedHistory);
      
      toast({
        title: "Sucesso",
        description: "Chamada salva com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao salvar chamada:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a chamada.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Calcular estatísticas da chamada atual
  const presentCount = students.filter(s => s.present).length;
  const absentCount = students.length - presentCount;
  const attendancePercentage = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fazer Chamada</h1>
          <p className="text-muted-foreground mt-2">
            Registre a presença dos alunos nas suas turmas
          </p>
        </div>

        {/* Filtros de seleção */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Seleção de turma */}
              <div className="space-y-2">
                <Label htmlFor="turma">Selecionar Turma *</Label>
                <Select value={selectedTurma} onValueChange={setSelectedTurma}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {professorTurmas.map(turma => (
                      <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seleção de data */}
              <div className="space-y-2">
                <Label htmlFor="date">Data da Chamada *</Label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Botão para carregar */}
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button 
                  onClick={loadStudents} 
                  disabled={!selectedTurma || !selectedDate || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Carregando...' : 'Carregar Alunos'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de alunos para chamada */}
        {students.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5" />
                    <span>Chamada - {selectedTurma}</span>
                  </CardTitle>
                  <CardDescription>
                    Data: {new Date(selectedDate).toLocaleDateString('pt-BR')} • {students.length} alunos
                  </CardDescription>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={markAllPresent}>
                    Marcar Todos Presentes
                  </Button>
                  <Button variant="outline" size="sm" onClick={markAllAbsent}>
                    Marcar Todos Ausentes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Estatísticas da chamada */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{students.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{presentCount}</div>
                  <div className="text-sm text-muted-foreground">Presentes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{absentCount}</div>
                  <div className="text-sm text-muted-foreground">Ausentes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{attendancePercentage}%</div>
                  <div className="text-sm text-muted-foreground">Presença</div>
                </div>
              </div>

              {/* Lista de alunos */}
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        id={student.id}
                        checked={student.present}
                        onCheckedChange={() => toggleStudentPresence(student.id)}
                      />
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-sm text-muted-foreground">Matrícula: {student.matricula}</div>
                      </div>
                    </div>
                    
                    <Badge className={student.present ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                      {student.present ? 'Presente' : 'Ausente'}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Botão para salvar */}
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={saveAttendance} 
                  disabled={isSaving}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? 'Salvando...' : 'Salvar Chamada'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico de chamadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Histórico de Chamadas</span>
            </CardTitle>
            <CardDescription>
              Últimas chamadas realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {attendanceHistory.length > 0 ? (
              <div className="space-y-3">
                {attendanceHistory.map((record) => (
                  <div key={record.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{record.turma}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(record.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-success">{record.presentes}</div>
                          <div className="text-muted-foreground">Presentes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-destructive">{record.ausentes}</div>
                          <div className="text-muted-foreground">Ausentes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-primary">
                            {Math.round((record.presentes / record.totalAlunos) * 100)}%
                          </div>
                          <div className="text-muted-foreground">Presença</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma chamada realizada ainda</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Chamada;