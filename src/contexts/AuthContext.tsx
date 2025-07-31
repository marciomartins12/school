import React, { createContext, useContext, useState, useEffect } from 'react';

// Definição dos tipos de usuário do sistema escolar
export type UserType = 'admin' | 'professor' | 'aluno';

// Interface para os dados do usuário logado
export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  // Campos específicos para cada tipo de usuário
  turmas?: string[]; // Para professores e alunos
  curso?: string; // Para alunos
}

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para fazer login simulado (sem backend real)
  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    // Aqui você conectaria com o backend para autenticar o usuário
    // Por enquanto, vamos simular uma autenticação bem-sucedida
    
    try {
      // Simulação de diferentes usuários baseado no tipo
      let userData: User;
      
      switch (type) {
        case 'admin':
          userData = {
            id: 'admin-1',
            name: 'Maria Silva',
            email: email,
            type: 'admin'
          };
          break;
        case 'professor':
          userData = {
            id: 'prof-1',
            name: 'João Santos',
            email: email,
            type: 'professor',
            turmas: ['Turma A', 'Turma B', 'Turma C']
          };
          break;
        case 'aluno':
          userData = {
            id: 'aluno-1',
            name: 'Ana Costa',
            email: email,
            type: 'aluno',
            turmas: ['Turma A'],
            curso: 'Ensino Médio'
          };
          break;
        default:
          return false;
      }

      // Simular um delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(userData);
      setIsAuthenticated(true);
      
      // Salvar dados do usuário no localStorage para persistir entre sessões
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Limpar dados do localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  // Verificar se há usuário logado ao carregar a aplicação
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};