import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { GuidesPage } from "./pages/GuidesPage";
import { ChatPage } from "./pages/ChatPage";
import { DiagnosticsPage } from "./pages/DiagnosticsPage";
import { VideosPage } from "./pages/VideosPage";
import { CommunityPage } from "./pages/CommunityPage";
import { KnowledgeBasePage } from "./pages/KnowledgeBasePage";
import { CommunitySupportPage } from "./pages/CommunitySupportPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import HardwarePage from "./pages/HardwarePage";
import SoftwarePage from "./pages/SoftwarePage";
import NetworkPage from "./pages/NetworkPage";
import SecurityPage from "./pages/SecurityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes - only accessible after login */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/guides" element={
              <ProtectedRoute>
                <GuidesPage />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/diagnostics" element={
              <ProtectedRoute>
                <DiagnosticsPage />
              </ProtectedRoute>
            } />
            <Route path="/videos" element={
              <ProtectedRoute>
                <VideosPage />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } />
            <Route path="/knowledge" element={
              <ProtectedRoute>
                <KnowledgeBasePage />
              </ProtectedRoute>
            } />
            <Route path="/community-support" element={
              <ProtectedRoute>
                <CommunitySupportPage />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/hardware" element={
              <ProtectedRoute>
                <HardwarePage />
              </ProtectedRoute>
            } />
            <Route path="/network" element={
              <ProtectedRoute>
                <NetworkPage />
              </ProtectedRoute>
            } />
            <Route path="/software" element={
              <ProtectedRoute>
                <SoftwarePage />
              </ProtectedRoute>
            } />
            <Route path="/security" element={
              <ProtectedRoute>
                <SecurityPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
