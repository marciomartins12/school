import { Navigate } from 'react-router-dom';

// Página inicial que redireciona para login
const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
