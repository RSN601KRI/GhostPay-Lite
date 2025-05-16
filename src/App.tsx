
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import OpenApiSpec from "./pages/OpenApiSpec";
import InteractiveDemo from "./pages/InteractiveDemo";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";

// Create a custom theme-enabled QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <div className="min-h-screen bg-background transition-all duration-300">
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/api-docs/spec" element={<OpenApiSpec />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/interactive-demo" element={<InteractiveDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
