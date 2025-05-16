
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlayCircle, Check, AlertOctagon } from 'lucide-react';
import { toast } from 'sonner';

type ApiEndpoint = 'create-card' | 'get-card' | 'create-charge';

interface FormValues {
  'create-card': {
    amount: string;
    currency: string;
    metadata: string;
  };
  'get-card': {
    cardId: string;
  };
  'create-charge': {
    cardId: string;
    amount: string;
    description: string;
  };
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const InteractiveDemo = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<ApiEndpoint>('create-card');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  
  const [formValues, setFormValues] = useState<FormValues>({
    'create-card': {
      amount: '100',
      currency: 'USD',
      metadata: '{"purpose": "Office supplies"}'
    },
    'get-card': {
      cardId: 'card_1234567890abcdef'
    },
    'create-charge': {
      cardId: 'card_1234567890abcdef',
      amount: '50',
      description: 'Office supplies purchase'
    }
  });

  const handleInputChange = (endpoint: ApiEndpoint, field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [endpoint]: {
        ...prev[endpoint],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    // Simulate API call
    setTimeout(() => {
      let mockResponse: ApiResponse;

      switch (activeEndpoint) {
        case 'create-card':
          mockResponse = {
            success: true,
            data: {
              id: 'card_' + Math.random().toString(36).substring(2, 15),
              amount: parseFloat(formValues['create-card'].amount),
              currency: formValues['create-card'].currency,
              status: 'active',
              created: new Date().toISOString()
            }
          };
          break;
        case 'get-card':
          mockResponse = {
            success: true,
            data: {
              id: formValues['get-card'].cardId,
              amount: 100,
              currency: 'USD',
              status: 'active',
              created: new Date().toISOString(),
              used: false
            }
          };
          break;
        case 'create-charge':
          // Sometimes return an error to show error handling
          if (Math.random() > 0.7) {
            mockResponse = {
              success: false,
              error: 'Card has insufficient funds'
            };
            toast.error('API returned an error!');
          } else {
            mockResponse = {
              success: true,
              data: {
                id: 'ch_' + Math.random().toString(36).substring(2, 15),
                card_id: formValues['create-charge'].cardId,
                amount: parseFloat(formValues['create-charge'].amount),
                status: 'succeeded',
                description: formValues['create-charge'].description,
                created: new Date().toISOString()
              }
            };
            toast.success('API call succeeded!');
          }
          break;
      }

      setResponse(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Interactive API Demo</h1>
        <p className="text-muted-foreground">
          Try out the GhostPay-Lite API endpoints with this interactive playground
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>API Request</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeEndpoint} onValueChange={(value) => setActiveEndpoint(value as ApiEndpoint)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create-card">Create Card</TabsTrigger>
                <TabsTrigger value="get-card">Get Card</TabsTrigger>
                <TabsTrigger value="create-charge">Create Charge</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="create-card" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input 
                      id="amount" 
                      value={formValues['create-card'].amount} 
                      onChange={(e) => handleInputChange('create-card', 'amount', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input 
                      id="currency" 
                      value={formValues['create-card'].currency} 
                      onChange={(e) => handleInputChange('create-card', 'currency', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metadata">Metadata (JSON)</Label>
                    <Input 
                      id="metadata" 
                      value={formValues['create-card'].metadata} 
                      onChange={(e) => handleInputChange('create-card', 'metadata', e.target.value)} 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="get-card" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardId">Card ID</Label>
                    <Input 
                      id="cardId" 
                      value={formValues['get-card'].cardId} 
                      onChange={(e) => handleInputChange('get-card', 'cardId', e.target.value)} 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="create-charge" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chargeCardId">Card ID</Label>
                    <Input 
                      id="chargeCardId" 
                      value={formValues['create-charge'].cardId} 
                      onChange={(e) => handleInputChange('create-charge', 'cardId', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chargeAmount">Amount</Label>
                    <Input 
                      id="chargeAmount" 
                      value={formValues['create-charge'].amount} 
                      onChange={(e) => handleInputChange('create-charge', 'amount', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chargeDescription">Description</Label>
                    <Input 
                      id="chargeDescription" 
                      value={formValues['create-charge'].description} 
                      onChange={(e) => handleInputChange('create-charge', 'description', e.target.value)} 
                    />
                  </div>
                </TabsContent>
                
                <div className="p-4 pt-0">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {isLoading ? 'Sending Request...' : 'Send API Request'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="border-b">
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              {isLoading ? (
                <div className="min-h-[300px] flex items-center justify-center">
                  <div className="animate-pulse-soft text-muted-foreground">Processing request...</div>
                </div>
              ) : response ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${response.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {response.success ? <Check className="h-5 w-5" /> : <AlertOctagon className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="font-medium">{response.success ? 'Request Successful' : 'Request Failed'}</div>
                      <div className="text-xs text-muted-foreground">
                        {response.success ? 'API returned a successful response' : response.error}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-md">
                    <div className="font-mono text-xs overflow-auto max-h-[300px]">
                      <pre>{JSON.stringify(response.success ? response.data : { error: response.error }, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                  <div className="mb-2">No request sent yet</div>
                  <div className="text-sm">Select an endpoint and click "Send API Request"</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveDemo;
