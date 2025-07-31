import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Páginas
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AlunosAdmin from "./pages/admin/Alunos";
import ProfessoresAdmin from "./pages/admin/Professores";
import TurmasAdmin from "./pages/admin/Turmas";
import AnunciosAdmin from "./pages/admin/Anuncios";

// Professor pages
import ProfessorDashboard from "./pages/professor/Dashboard";
import Chamada from "./pages/professor/Chamada";
import LancarNotas from "./pages/professor/LancarNotas";
import VerAlunos from "./pages/professor/VerAlunos";
import EnviarAtividades from "./pages/professor/EnviarAtividades";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Redirect da raiz para login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas do Administrador */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/alunos" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <AlunosAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/professores" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <ProfessoresAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/turmas" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <TurmasAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/anuncios" 
              element={
                <ProtectedRoute allowedUserTypes={['admin']}>
                  <AnunciosAdmin />
                </ProtectedRoute>
              } 
            />

            {/* Rotas do Professor */}
            <Route 
              path="/professor/dashboard" 
              element={
                <ProtectedRoute allowedUserTypes={['professor']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor/chamada" 
              element={
                <ProtectedRoute allowedUserTypes={['professor']}>
                  <Chamada />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor/notas" 
              element={
                <ProtectedRoute allowedUserTypes={['professor']}>
                  <LancarNotas />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor/alunos" 
              element={
                <ProtectedRoute allowedUserTypes={['professor']}>
                  <VerAlunos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor/atividades" 
              element={
                <ProtectedRoute allowedUserTypes={['professor']}>
                  <EnviarAtividades />
                </ProtectedRoute>
              } 
            />

            {/* Rota 404 - sempre por último */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;