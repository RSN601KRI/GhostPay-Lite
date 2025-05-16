
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileJson, Download, Code } from 'lucide-react';
import { toast } from 'sonner';

const OpenApiSpec = () => {
  const [format, setFormat] = useState<string>('json');
  
  const handleDownload = () => {
    // In a real app, this would be a real file download
    toast.success(`Downloaded OpenAPI spec in ${format.toUpperCase()} format`);
  };

  const jsonSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "GhostPay-Lite API",
    "description": "A lightweight, microservice-based payment token API",
    "version": "0.1.0"
  },
  "paths": {
    "/cards": {
      "post": {
        "summary": "Issue a new single-use card",
        "operationId": "createCard",
        "responses": {
          "200": {
            "description": "Card created successfully"
          }
        }
      }
    },
    "/cards/{id}": {
      "get": {
        "summary": "Get card details",
        "operationId": "getCard",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Card details retrieved successfully"
          }
        }
      }
    },
    "/charges": {
      "post": {
        "summary": "Process a charge against a card",
        "operationId": "createCharge",
        "responses": {
          "200": {
            "description": "Charge processed successfully"
          }
        }
      }
    }
  }
}`;

  const yamlSpec = `openapi: 3.0.3
info:
  title: GhostPay-Lite API
  description: A lightweight, microservice-based payment token API
  version: 0.1.0
paths:
  /cards:
    post:
      summary: Issue a new single-use card
      operationId: createCard
      responses:
        '200':
          description: Card created successfully
  /cards/{id}:
    get:
      summary: Get card details
      operationId: getCard
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Card details retrieved successfully
  /charges:
    post:
      summary: Process a charge against a card
      operationId: createCharge
      responses:
        '200':
          description: Charge processed successfully`;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">OpenAPI Specification</h1>
        <p className="text-muted-foreground">
          Download the complete API specification to integrate with GhostPay-Lite
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>GhostPay-Lite API Spec</CardTitle>
                <Tabs value={format} onValueChange={setFormat} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                    <TabsTrigger value="yaml">YAML</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <pre className="p-4 overflow-auto bg-muted/50 text-xs md:text-sm font-mono max-h-[600px] rounded-b-lg">
                  {format === 'json' ? jsonSpec : yamlSpec}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Available Formats</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setFormat('json')}>
                    <FileJson className="mr-2 h-4 w-4" />
                    JSON Format (OpenAPI 3.0)
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setFormat('yaml')}>
                    <FileJson className="mr-2 h-4 w-4" />
                    YAML Format (OpenAPI 3.0)
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Specification
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Integration Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://github.com/glebshatilov" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/interactive-demo">
                  <Code className="mr-2 h-4 w-4" />
                  Try Interactive Demo
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpenApiSpec;
