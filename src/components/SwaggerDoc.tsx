
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SwaggerDoc: React.FC = () => {
  return (
    <Card className="w-full shadow-md border-border/50">
      <CardHeader className="bg-secondary/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold tracking-tight">
            GhostPay-Lite API
          </CardTitle>
          <Badge variant="outline" className="text-xs font-mono">OpenAPI 3.0</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          A lightweight, microservice-based payment token API
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="cards" className="w-full">
          <div className="border-b">
            <TabsList className="h-10 bg-background">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="charges">Charges</TabsTrigger>
              <TabsTrigger value="schemas">Schemas</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="cards" className="p-4">
            <div className="space-y-6">
              <EndpointSection 
                method="POST" 
                path="/cards" 
                description="Issue a single-use virtual card"
                requestBody={{
                  type: "object",
                  properties: {
                    amount: {
                      type: "number",
                      description: "Amount to authorize on the card"
                    },
                    currency: {
                      type: "string",
                      description: "Three-letter ISO currency code"
                    },
                    metadata: {
                      type: "object",
                      description: "Additional data to attach to the card"
                    }
                  },
                  required: ["amount", "currency"]
                }}
                responses={{
                  "200": {
                    description: "Card created successfully",
                    schema: {
                      $ref: "#/components/schemas/Card"
                    }
                  },
                  "400": {
                    description: "Invalid request parameters",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "401": {
                    description: "Unauthorized - Invalid or missing API key",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "429": {
                    description: "Too many requests - Rate limit exceeded",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }}
              />
              
              <EndpointSection 
                method="GET" 
                path="/cards/{id}" 
                description="Get card details and status"
                parameters={[
                  {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Unique card identifier",
                    schema: {
                      type: "string"
                    }
                  }
                ]}
                responses={{
                  "200": {
                    description: "Card found",
                    schema: {
                      $ref: "#/components/schemas/Card"
                    }
                  },
                  "404": {
                    description: "Card not found",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "401": {
                    description: "Unauthorized - Invalid or missing API key",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="charges" className="p-4">
            <div className="space-y-6">
              <EndpointSection 
                method="POST" 
                path="/charges" 
                description="Process a payment on a virtual card"
                requestBody={{
                  type: "object",
                  properties: {
                    cardId: {
                      type: "string",
                      description: "ID of the card to charge"
                    },
                    amount: {
                      type: "number",
                      description: "Amount to charge"
                    },
                    currency: {
                      type: "string",
                      description: "Three-letter ISO currency code"
                    },
                    metadata: {
                      type: "object",
                      description: "Additional data to attach to the charge"
                    }
                  },
                  required: ["cardId", "amount", "currency"]
                }}
                responses={{
                  "200": {
                    description: "Charge created successfully",
                    schema: {
                      $ref: "#/components/schemas/Charge"
                    }
                  },
                  "400": {
                    description: "Invalid request parameters",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "401": {
                    description: "Unauthorized - Invalid or missing API key",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "404": {
                    description: "Card not found",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }}
              />
              
              <EndpointSection 
                method="GET" 
                path="/charges/{id}" 
                description="Get charge details and status"
                parameters={[
                  {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Unique charge identifier",
                    schema: {
                      type: "string"
                    }
                  }
                ]}
                responses={{
                  "200": {
                    description: "Charge found",
                    schema: {
                      $ref: "#/components/schemas/Charge"
                    }
                  },
                  "404": {
                    description: "Charge not found",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  },
                  "401": {
                    description: "Unauthorized - Invalid or missing API key",
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="schemas" className="p-4">
            <div className="space-y-6">
              <SchemaSection 
                name="Card"
                description="Virtual card representation"
                schema={{
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier for the card"
                    },
                    cardNumber: {
                      type: "string",
                      description: "Masked card number"
                    },
                    expiryDate: {
                      type: "string",
                      description: "Card expiry date in MM/YY format"
                    },
                    cvv: {
                      type: "string",
                      description: "Card verification value"
                    },
                    status: {
                      type: "string",
                      enum: ["active", "used", "expired"],
                      description: "Current card status"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when card was created"
                    },
                    usedAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when card was used (if applicable)"
                    },
                    meta: {
                      type: "object",
                      description: "Additional metadata"
                    }
                  },
                  required: ["id", "cardNumber", "expiryDate", "cvv", "status", "createdAt"]
                }}
              />
              
              <SchemaSection 
                name="Charge"
                description="Payment charge representation"
                schema={{
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier for the charge"
                    },
                    cardId: {
                      type: "string",
                      description: "ID of the card charged"
                    },
                    amount: {
                      type: "number",
                      description: "Charge amount"
                    },
                    currency: {
                      type: "string",
                      description: "Three-letter ISO currency code"
                    },
                    status: {
                      type: "string",
                      enum: ["pending", "completed", "failed"],
                      description: "Current charge status"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when charge was created"
                    },
                    completedAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when charge was completed (if applicable)"
                    },
                    metadata: {
                      type: "object",
                      description: "Additional metadata"
                    }
                  },
                  required: ["id", "cardId", "amount", "currency", "status", "createdAt"]
                }}
              />
              
              <SchemaSection 
                name="Error"
                description="Error response structure"
                schema={{
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      description: "Error code identifier"
                    },
                    message: {
                      type: "string",
                      description: "Human-readable error message"
                    },
                    details: {
                      type: "object",
                      description: "Additional error details"
                    }
                  },
                  required: ["code", "message"]
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="auth" className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                GhostPay-Lite uses JWT bearer token authentication. All API requests must include an
                <code className="mx-1 px-1 py-0.5 bg-muted rounded text-xs font-mono">Authorization</code>
                header with a valid JWT token.
              </p>
              
              <div className="text-sm bg-muted/50 p-3 rounded border">
                <p className="font-semibold mb-1">Example Header:</p>
                <pre className="text-xs overflow-x-auto">Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...</pre>
              </div>
              
              <h4 className="font-semibold mt-4">Role-Based Access Control</h4>
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left py-2 px-3">Role</th>
                    <th className="text-left py-2 px-3">Access Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">admin</td>
                    <td className="py-2 px-3">Full access to all API endpoints</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">merchant</td>
                    <td className="py-2 px-3">Can create cards, view own cards, create and view charges</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">user</td>
                    <td className="py-2 px-3">Can view own cards, limited charge creation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface EndpointSectionProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    in: string;
    required: boolean;
    description: string;
    schema: {
      type: string;
    }
  }>;
  requestBody?: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  responses: Record<string, {
    description: string;
    schema?: {
      $ref: string;
    }
  }>;
}

const EndpointSection: React.FC<EndpointSectionProps> = ({ method, path, description, parameters, requestBody, responses }) => {
  const methodColor = {
    GET: 'bg-blue-100 text-blue-800 border-blue-200',
    POST: 'bg-green-100 text-green-800 border-green-200',
    PUT: 'bg-amber-100 text-amber-800 border-amber-200',
    DELETE: 'bg-red-100 text-red-800 border-red-200',
    PATCH: 'bg-purple-100 text-purple-800 border-purple-200'
  }[method];
  
  return (
    <div className="border rounded-md">
      <div className="flex items-center p-3 bg-muted/30 border-b">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${methodColor} border`}>
          {method}
        </span>
        <code className="ml-3 font-mono text-sm">{path}</code>
      </div>
      <div className="p-3">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {parameters && parameters.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Parameters</h4>
            <div className="bg-muted/30 rounded border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1.5 px-3">Name</th>
                    <th className="text-left py-1.5 px-3">Located in</th>
                    <th className="text-left py-1.5 px-3">Required</th>
                    <th className="text-left py-1.5 px-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param) => (
                    <tr key={param.name} className="border-b last:border-0">
                      <td className="py-1.5 px-3 font-mono">{param.name}</td>
                      <td className="py-1.5 px-3">{param.in}</td>
                      <td className="py-1.5 px-3">{param.required ? 'Yes' : 'No'}</td>
                      <td className="py-1.5 px-3">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {requestBody && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Request Body</h4>
            <div className="bg-muted/30 p-3 rounded border">
              <div className="text-xs">
                <span className="font-semibold">Content Type: </span>
                <span className="font-mono">application/json</span>
              </div>
              <div className="mt-2 text-xs">
                {Object.entries(requestBody.properties).map(([key, value]: [string, any]) => (
                  <div key={key} className="mb-1">
                    <span className="font-mono">{key}</span>
                    {requestBody.required?.includes(key) && <span className="text-red-500 ml-1">*</span>}
                    <span className="text-muted-foreground"> ({value.type}) - {value.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium mb-2">Responses</h4>
          <div className="bg-muted/30 rounded border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1.5 px-3">Code</th>
                  <th className="text-left py-1.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(responses).map(([code, response]) => (
                  <tr key={code} className="border-b last:border-0">
                    <td className="py-1.5 px-3 font-mono">{code}</td>
                    <td className="py-1.5 px-3">
                      {response.description}
                      {response.schema && (
                        <div className="mt-1 text-muted-foreground">
                          Schema: {response.schema.$ref.replace('#/components/schemas/', '')}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SchemaProps {
  name: string;
  description: string;
  schema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

const SchemaSection: React.FC<SchemaProps> = ({ name, description, schema }) => {
  return (
    <div className="border rounded-md">
      <div className="flex items-center p-3 bg-muted/30 border-b">
        <h3 className="font-semibold">{name}</h3>
      </div>
      <div className="p-3">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="bg-muted/30 rounded border p-3">
          <div className="text-xs mb-2">
            <span className="font-semibold">Type: </span>
            <span className="font-mono">{schema.type}</span>
          </div>
          
          <h4 className="text-xs font-medium mb-1">Properties:</h4>
          <div className="text-xs space-y-1">
            {Object.entries(schema.properties).map(([key, value]: [string, any]) => (
              <div key={key} className="ml-2">
                <span className="font-mono">{key}</span>
                {schema.required?.includes(key) && <span className="text-red-500 ml-1">*</span>}
                <span className="text-muted-foreground"> ({value.type}{value.format ? `, ${value.format}` : ''})</span>
                {value.description && <div className="ml-4 text-muted-foreground">{value.description}</div>}
                {value.enum && (
                  <div className="ml-4 text-muted-foreground">
                    Enum: [ {value.enum.map((e: string) => `"${e}"`).join(', ')} ]
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwaggerDoc;
