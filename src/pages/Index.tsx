
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Login from "@/components/Login";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import SwaggerDoc from "@/components/SwaggerDoc";
import SwaggerHeader from "@/components/SwaggerHeader";
import { authService, User } from "@/services/auth-service";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    toast.info("You have been logged out");
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-soft">Loading GhostPay-Lite...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} />
      
      <div className="container mx-auto py-6 px-4 flex-1">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="dashboard" className="flex-1 sm:flex-none">Dashboard</TabsTrigger>
              <TabsTrigger value="api-docs" className="flex-1 sm:flex-none">API Documentation</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage virtual cards and payment processing
              </p>
            </div>
            
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="api-docs">
            <SwaggerHeader />
            <SwaggerDoc />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="mt-auto border-t py-4 px-6 text-center text-xs text-muted-foreground">
        <p>GhostPay-Lite v0.1.0 &copy; 2025 - A lightweight payment token API</p>
      </footer>
    </div>
  );
};

export default Index;
