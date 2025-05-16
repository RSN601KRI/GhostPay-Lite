
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Gauge, Github, FileJson, Code, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth-service';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.getCurrentUser() !== null;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">GhostPay-Lite</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              A lightweight, microservice-based payment token API that issues single use virtual cards and processes charges
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-white text-ghost-800 hover:bg-white/90">
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild>
                <Link to="/api-docs">API Documentation</Link>
              </Button>
            </div>
          </div>
          
          {/* Visual element */}
          <div className="relative mt-12 max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 shadow-lg animate-float">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-left">
                <div className="col-span-2">
                  <div className="font-medium opacity-80">Card Token</div>
                  <div className="font-mono">card_7h8j2k3l4m5n6p</div>
                </div>
                <div>
                  <div className="font-medium opacity-80">Amount</div>
                  <div>$250.00</div>
                </div>
                <div>
                  <div className="font-medium opacity-80">Status</div>
                  <div className="text-green-300">Active</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 shadow-lg w-2/3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-xs opacity-80">Response Time: 42ms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ghost-100 text-ghost-800 mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Card Issuance</h3>
              <p className="text-muted-foreground">
                Issue single-use virtual payment cards with configurable limits and restrictions.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ghost-100 text-ghost-800 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                JWT authentication, encryption at rest and in transit, and dynamic secret rotation.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ghost-100 text-ghost-800 mb-4">
                <Gauge className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-muted-foreground">
                Optimized for high throughput, reliability, and sub-100ms response times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Resources Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">API Resources</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to integrate and build with GhostPay-Lite API
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/api-docs/spec" className="feature-card bg-card hover:bg-card/90">
              <div className="flex items-center mb-4 text-ghost-700">
                <FileJson className="mr-2 h-5 w-5" />
                <h3 className="text-xl font-semibold">OpenAPI Specification</h3>
              </div>
              <p className="text-muted-foreground">
                Download the complete OpenAPI specification in JSON or YAML format.
              </p>
            </Link>
            
            <a 
              href="https://github.com/glebshatilov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="feature-card bg-card hover:bg-card/90"
            >
              <div className="flex items-center mb-4 text-ghost-700">
                <Github className="mr-2 h-5 w-5" />
                <h3 className="text-xl font-semibold">GitHub Repository</h3>
              </div>
              <p className="text-muted-foreground">
                View source code, contribute, or fork the project on GitHub.
              </p>
            </a>
            
            <Link to="/interactive-demo" className="feature-card bg-card hover:bg-card/90">
              <div className="flex items-center mb-4 text-ghost-700">
                <Code className="mr-2 h-5 w-5" />
                <h3 className="text-xl font-semibold">Interactive Demo</h3>
              </div>
              <p className="text-muted-foreground">
                Test the API with an interactive playground to see it in action.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
