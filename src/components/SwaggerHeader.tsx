
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileJson, ExternalLink, Github } from 'lucide-react';

const SwaggerHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 mb-4 border-b">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">API Documentation</h1>
        <p className="text-muted-foreground">
          GhostPay-Lite RESTful API specification for virtual card issuance and payment processing
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="flex items-center gap-1 py-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            v0.1.0
          </Badge>
          <Badge variant="outline" className="py-1.5">OpenAPI 3.0</Badge>
          <Badge variant="outline" className="py-1.5">RESTful</Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" className="h-9">
          <FileJson className="mr-2 h-4 w-4" />
          Download OpenAPI Spec
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <Github className="mr-2 h-4 w-4" />
          View on GitHub
        </Button>
        <Button className="h-9">
          <ExternalLink className="mr-2 h-4 w-4" />
          Interactive Demo
        </Button>
      </div>
    </div>
  );
};

export default SwaggerHeader;
