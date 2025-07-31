import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, LogIn, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Página de login com seleção de tipo de usuário
const Login: React.FC = () => {
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  // Estados do formulário de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('aluno');
  const [isLoading, setIsLoading] = useState(false);

  // Se já estiver autenticado, redireciona para a página apropriada
  if (isAuthenticated && user) {
    switch (user.type) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'professor':
        return <Navigate to="/professor/dashboard" replace />;
      case 'aluno':
        return <Navigate to="/aluno/dashboard" replace />;
      default:
        break;
    }
  }

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos campos
    if (!email || !password || !userType) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Chama a função de login do contexto de autenticação
      const success = await login(email, password, userType);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a) ao sistema, ${userType}.`,
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no sistema",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com logo do sistema */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-primary rounded-full mb-4">
            <School className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">EduSystem</h1>
          <p className="text-muted-foreground mt-2">Sistema de Gestão Escolar</p>
        </div>

        {/* Formulário de login */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Acesso ao Sistema</CardTitle>
            <CardDescription>
              Faça login para acessar o sistema escolar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Seleção do tipo de usuário */}
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuário</Label>
                <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="aluno">Aluno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campo de email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@escola.com"
                  required
                />
              </div>

              {/* Campo de senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>

              {/* Botão de login */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </>
                )}
              </Button>
            </form>

            {/* Informações de demo */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo:</strong> Use qualquer email e senha para testar o sistema
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>&copy; 2025 EduSystem. Sistema desenvolvido por @marciomartins_12. </p>
        </div>
      </div>
    </div>
  );
};

export default Login;