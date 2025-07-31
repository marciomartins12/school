import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, School, Home, Users, GraduationCap, Calendar, BookOpen, FileText, Bell, CreditCard, ClipboardList, CheckSquare, UserCheck, DollarSign, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

// Componente de layout principal que será usado em todas as páginas internas
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  // Função para fazer logout
  const handleLogout = () => {
    // Aqui você pode adicionar lógica adicional antes do logout, como salvar dados pendentes
    logout();
  };

  // Definir cor do badge baseado no tipo de usuário
  //cor que tava mas troquei bg-destructive text-destructive-foreground
  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'admin':
        return 'bg-primary text-primary-foreground';
      case 'professor':
        return 'bg-secondary text-secondary-foreground';
      case 'aluno':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Definir itens de navegação baseado no tipo de usuário
  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.type) {
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
          { path: '/admin/alunos', label: 'Gerenciar Alunos', icon: GraduationCap },
          { path: '/admin/professores', label: 'Gerenciar Professores', icon: UserCheck },
          { path: '/admin/turmas', label: 'Turmas & Horários', icon: Calendar },
          { path: '/admin/anuncios', label: 'Anúncios', icon: Bell },
        ];
      case 'professor':
        return [
          { path: '/professor/dashboard', label: 'Dashboard', icon: Home },
          { path: '/professor/chamada', label: 'Fazer Chamada', icon: CheckSquare },
          { path: '/professor/notas', label: 'Lançar Notas', icon: ClipboardList },
          { path: '/professor/atividades', label: 'Enviar Atividades', icon: FileText },
          { path: '/professor/alunos', label: 'Ver Alunos', icon: Users },
        ];
      case 'aluno':
        return [
          { path: '/aluno/dashboard', label: 'Dashboard', icon: Home },
          { path: '/aluno/horarios', label: 'Meus Horários', icon: Calendar },
          { path: '/aluno/atividades', label: 'Atividades', icon: FileText },
          { path: '/aluno/notas', label: 'Minhas Notas', icon: ClipboardList },
          { path: '/aluno/faltas', label: 'Minhas Faltas', icon: BookOpen },
          { path: '/aluno/pagamento', label: 'Pagamentos', icon: CreditCard },
        ];
      default:
        return [];
    }
  };

  const location = useLocation();
  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar de navegação */}
      <aside className="w-64 bg-card border-r border-border shadow-sm">
        {/* Logo e cabeçalho da sidebar */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <School className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">EduSystem</h1>
              <p className="text-xs text-muted-foreground">Sistema Escolar</p>
            </div>
          </div>
        </div>

        {/* Informações do usuário */}
        {user && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-full">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.type)}`}>
                  {user.type === 'admin' ? 'Administrador' : 
                   user.type === 'professor' ? 'Professor' : 'Aluno'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Menu de navegação */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Botão de logout na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t border-border bg-card">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair do Sistema</span>
          </Button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <header className="bg-card border-b border-border shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {navigationItems.find(item => item.path === location.pathname)?.label || 'Sistema Escolar'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {user?.type === 'admin' ? 'Painel Administrativo' : 
                 user?.type === 'professor' ? 'Área do Professor' : 'Área do Aluno'}
              </p>
            </div>
          </div>
        </header>

        {/* Área de conteúdo principal */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-muted border-t border-border p-4">
          <div className="text-center text-xs text-muted-foreground">
             <p>&copy; 2025 EduSystem. Sistema desenvolvido por @marciomartins_12. </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;