import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserType } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: UserType[]; // Tipos de usuário permitidos para acessar esta rota
}

// Componente para proteger rotas que requerem autenticação
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserTypes 
}) => {
  const { isAuthenticated, user } = useAuth();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se há tipos de usuário específicos permitidos, verifica se o usuário atual está incluído
  if (allowedUserTypes && user && !allowedUserTypes.includes(user.type)) {
    // Redireciona para a página apropriada baseada no tipo do usuário
    switch (user.type) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'professor':
        return <Navigate to="/professor/dashboard" replace />;
      case 'aluno':
        return <Navigate to="/aluno/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Se passou por todas as verificações, renderiza o componente filho
  return <>{children}</>;
};

export default ProtectedRoute;