import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interface para anúncios
interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  targetAudience: 'todos' | 'alunos' | 'professores' | 'admin';
  isActive: boolean;
  createdAt: string;
  author: string;
}

interface AnnouncementForm {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  targetAudience: 'todos' | 'alunos' | 'professores' | 'admin';
}

// Página de gerenciamento de anúncios
const AnunciosAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // Estados
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<AnnouncementForm>({
    title: '',
    message: '',
    type: 'info',
    targetAudience: 'todos'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Função para carregar anúncios
  const loadAnnouncements = async () => {
    setIsLoading(true);
    
    try {
      // Aqui você conectaria com o backend para buscar os anúncios
      // GET /api/announcements
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'Semana de Provas - 2º Bimestre',
          message: 'A semana de provas do 2º bimestre começará no dia 15 de dezembro. Todos os alunos devem se preparar adequadamente.',
          type: 'info',
          targetAudience: 'alunos',
          isActive: true,
          createdAt: '2024-12-01T10:00:00Z',
          author: 'Admin'
        },
        {
          id: '2',
          title: 'Reunião de Pais e Mestres',
          message: 'Reunião de pais e mestres agendada para o dia 20 de dezembro às 19h no auditório principal.',
          type: 'warning',
          targetAudience: 'todos',
          isActive: true,
          createdAt: '2024-11-30T15:30:00Z',
          author: 'Admin'
        },
        {
          id: '3',
          title: 'Matrículas 2025 Abertas',
          message: 'O período de matrículas para 2025 está aberto até 31 de janeiro. Não percam o prazo!',
          type: 'success',
          targetAudience: 'todos',
          isActive: true,
          createdAt: '2024-11-28T09:15:00Z',
          author: 'Admin'
        },
        {
          id: '4',
          title: 'Falta de Água - Emergência',
          message: 'Devido a problemas na rede de abastecimento, as aulas do período da tarde estão suspensas hoje.',
          type: 'urgent',
          targetAudience: 'todos',
          isActive: false,
          createdAt: '2024-11-25T12:00:00Z',
          author: 'Admin'
        }
      ];
      
      setAnnouncements(mockAnnouncements);
      
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os anúncios.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingAnnouncement(null);
    setFormData({
      title: '',
      message: '',
      type: 'info',
      targetAudience: 'todos'
    });
    setIsModalOpen(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      targetAudience: announcement.targetAudience
    });
    setIsModalOpen(true);
  };

  // Função para salvar anúncio
  const handleSaveAnnouncement = async () => {
    if (!formData.title || !formData.message) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha o título e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingAnnouncement) {
        // Aqui você conectaria com o backend para atualizar o anúncio
        // PUT /api/announcements/{id}
        console.log('Atualizando anúncio:', editingAnnouncement.id, formData);
        
        const updatedAnnouncements = announcements.map(announcement =>
          announcement.id === editingAnnouncement.id
            ? { ...announcement, ...formData }
            : announcement
        );
        setAnnouncements(updatedAnnouncements);
        
        toast({
          title: "Sucesso",
          description: "Anúncio atualizado com sucesso!",
        });
      } else {
        // Aqui você conectaria com o backend para criar novo anúncio
        // POST /api/announcements
        console.log('Criando novo anúncio:', formData);
        
        const newAnnouncement: Announcement = {
          id: Date.now().toString(),
          ...formData,
          isActive: true,
          createdAt: new Date().toISOString(),
          author: 'Admin'
        };
        setAnnouncements([newAnnouncement, ...announcements]);
        
        toast({
          title: "Sucesso",
          description: "Anúncio criado com sucesso!",
        });
      }
      
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Erro ao salvar anúncio:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o anúncio.",
        variant: "destructive",
      });
    }
  };

  // Função para alternar status do anúncio
  const toggleAnnouncementStatus = async (announcementId: string) => {
    try {
      // Aqui você conectaria com o backend para alterar o status
      // PATCH /api/announcements/{id}/toggle-status
      console.log('Alternando status do anúncio:', announcementId);
      
      const updatedAnnouncements = announcements.map(announcement =>
        announcement.id === announcementId
          ? { ...announcement, isActive: !announcement.isActive }
          : announcement
      );
      setAnnouncements(updatedAnnouncements);
      
      toast({
        title: "Sucesso",
        description: "Status do anúncio alterado com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do anúncio.",
        variant: "destructive",
      });
    }
  };

  // Função para excluir anúncio
  const handleDeleteAnnouncement = async (announcementId: string) => {
    if (!confirm('Tem certeza que deseja excluir este anúncio?')) {
      return;
    }

    try {
      // Aqui você conectaria com o backend para excluir o anúncio
      // DELETE /api/announcements/{id}
      console.log('Excluindo anúncio:', announcementId);
      
      const updatedAnnouncements = announcements.filter(announcement => announcement.id !== announcementId);
      setAnnouncements(updatedAnnouncements);
      
      toast({
        title: "Sucesso",
        description: "Anúncio excluído com sucesso!",
      });
      
    } catch (error) {
      console.error('Erro ao excluir anúncio:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o anúncio.",
        variant: "destructive",
      });
    }
  };

  // Função para obter ícone do tipo de anúncio
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'urgent':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Função para obter cor do badge baseado no tipo
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-primary text-primary-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Função para obter texto do público-alvo
  const getAudienceText = (audience: string) => {
    switch (audience) {
      case 'todos':
        return 'Todos';
      case 'alunos':
        return 'Alunos';
      case 'professores':
        return 'Professores';
      case 'admin':
        return 'Administradores';
      default:
        return audience;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando anúncios...</p>
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
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Anúncios</h1>
            <p className="text-muted-foreground mt-2">
              Crie e gerencie avisos que aparecerão para todos os usuários do sistema
            </p>
          </div>
          
          <Button onClick={openCreateModal} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Anúncio</span>
          </Button>
        </div>

        {/* Lista de anúncios */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`transition-all ${announcement.isActive ? 'border-l-4 border-l-primary' : 'opacity-60'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(announcement.type)}`}>
                      {getTypeIcon(announcement.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {!announcement.isActive && (
                          <Badge variant="outline" className="text-xs">Inativo</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Por: {announcement.author}</span>
                        <span>•</span>
                        <span>{new Date(announcement.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {getAudienceText(announcement.targetAudience)}
                        </Badge>
                        <Badge className={`text-xs ${getTypeColor(announcement.type)}`}>
                          {announcement.type === 'info' ? 'Informação' :
                           announcement.type === 'warning' ? 'Aviso' :
                           announcement.type === 'success' ? 'Sucesso' : 'Urgente'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAnnouncementStatus(announcement.id)}
                    >
                      {announcement.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(announcement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{announcement.message}</p>
              </CardContent>
            </Card>
          ))}

          {announcements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nenhum anúncio criado</h3>
                <p className="text-muted-foreground mb-4">
                  Crie seu primeiro anúncio para manter todos informados sobre eventos importantes.
                </p>
                <Button onClick={openCreateModal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Anúncio
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modal de criação/edição */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement 
                  ? 'Altere as informações do anúncio conforme necessário.'
                  : 'Preencha as informações para criar um novo anúncio.'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Semana de Provas, Reunião de Pais..."
                />
              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Digite aqui a mensagem completa do anúncio..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tipo do anúncio */}
                <div className="space-y-2">
                  <Label>Tipo do Anúncio</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Informação</SelectItem>
                      <SelectItem value="warning">Aviso</SelectItem>
                      <SelectItem value="success">Sucesso</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Público-alvo */}
                <div className="space-y-2">
                  <Label>Público-alvo</Label>
                  <Select value={formData.targetAudience} onValueChange={(value: any) => setFormData({...formData, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="alunos">Apenas Alunos</SelectItem>
                      <SelectItem value="professores">Apenas Professores</SelectItem>
                      <SelectItem value="admin">Apenas Administradores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveAnnouncement}>
                {editingAnnouncement ? 'Atualizar' : 'Criar'} Anúncio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AnunciosAdmin;