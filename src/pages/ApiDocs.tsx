
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, FileText, Link } from "lucide-react";
import { toast } from "sonner";
import { Link as RouterLink } from "react-router-dom";
import SwaggerHeader from '@/components/SwaggerHeader';

const ApiDocs = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <SwaggerHeader />
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="javascript" className="w-full">
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Implementation Examples</CardTitle>
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <TabsContent value="javascript" className="p-6 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`// Initialize the API client with your API key
const ghostpay = new GhostPayClient('your_api_key_here');

// Or manually set the authentication header
const headers = {
  'Authorization': 'Bearer your_api_key_here',
  'Content-Type': 'application/json'
};`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`// Initialize the API client with your API key
const ghostpay = new GhostPayClient('your_api_key_here');

// Or manually set the authentication header
const headers = {
  'Authorization': 'Bearer your_api_key_here',
  'Content-Type': 'application/json'
};`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Card</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`// Create a single-use virtual card
async function createCard() {
  const response = await fetch('https://api.ghostpay-lite.com/cards', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: 100,
      currency: 'USD',
      metadata: {
        purpose: 'Office supplies'
      }
    })
  });

  const card = await response.json();
  console.log('Created card:', card);
  return card;
}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`// Create a single-use virtual card
async function createCard() {
  const response = await fetch('https://api.ghostpay-lite.com/cards', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: 100,
      currency: 'USD',
      metadata: {
        purpose: 'Office supplies'
      }
    })
  });

  const card = await response.json();
  console.log('Created card:', card);
  return card;
}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Get Card Details</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`// Retrieve details for an existing card
async function getCard(cardId) {
  const response = await fetch(\`https://api.ghostpay-lite.com/cards/\${cardId}\`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer your_api_key_here'
    }
  });

  const card = await response.json();
  console.log('Card details:', card);
  return card;
}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`// Retrieve details for an existing card
async function getCard(cardId) {
  const response = await fetch(\`https://api.ghostpay-lite.com/cards/\${cardId}\`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer your_api_key_here'
    }
  });

  const card = await response.json();
  console.log('Card details:', card);
  return card;
}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Charge</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`// Process a charge on a card
async function createCharge() {
  const response = await fetch('https://api.ghostpay-lite.com/charges', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId: 'card_1234567890abcdef',
      amount: 50,
      currency: 'USD',
      description: 'Office supplies purchase'
    })
  });

  const charge = await response.json();
  console.log('Created charge:', charge);
  return charge;
}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`// Process a charge on a card
async function createCharge() {
  const response = await fetch('https://api.ghostpay-lite.com/charges', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId: 'card_1234567890abcdef',
      amount: 50,
      currency: 'USD',
      description: 'Office supplies purchase'
    })
  });

  const charge = await response.json();
  console.log('Created charge:', charge);
  return charge;
}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="python" className="p-6 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`import requests

# Set your API key
api_key = "your_api_key_here"

# Set headers for authentication
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`import requests

# Set your API key
api_key = "your_api_key_here"

# Set headers for authentication
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Card</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`def create_card():
    url = "https://api.ghostpay-lite.com/cards"
    
    payload = {
        "amount": 100,
        "currency": "USD",
        "metadata": {
            "purpose": "Office supplies"
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    card = response.json()
    
    print("Created card:", card)
    return card`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`def create_card():
    url = "https://api.ghostpay-lite.com/cards"
    
    payload = {
        "amount": 100,
        "currency": "USD",
        "metadata": {
            "purpose": "Office supplies"
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    card = response.json()
    
    print("Created card:", card)
    return card`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Get Card Details</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`def get_card(card_id):
    url = f"https://api.ghostpay-lite.com/cards/{card_id}"
    
    response = requests.get(url, headers=headers)
    card = response.json()
    
    print("Card details:", card)
    return card`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`def get_card(card_id):
    url = f"https://api.ghostpay-lite.com/cards/{card_id}"
    
    response = requests.get(url, headers=headers)
    card = response.json()
    
    print("Card details:", card)
    return card`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Charge</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`def create_charge():
    url = "https://api.ghostpay-lite.com/charges"
    
    payload = {
        "cardId": "card_1234567890abcdef",
        "amount": 50,
        "currency": "USD",
        "description": "Office supplies purchase"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    charge = response.json()
    
    print("Created charge:", charge)
    return charge`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`def create_charge():
    url = "https://api.ghostpay-lite.com/charges"
    
    payload = {
        "cardId": "card_1234567890abcdef",
        "amount": 50,
        "currency": "USD",
        "description": "Office supplies purchase"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    charge = response.json()
    
    print("Created charge:", charge)
    return charge`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="curl" className="p-6 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Card</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`curl -X POST "https://api.ghostpay-lite.com/cards" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100,
    "currency": "USD",
    "metadata": {
      "purpose": "Office supplies"
    }
  }'`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`curl -X POST "https://api.ghostpay-lite.com/cards" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100,
    "currency": "USD",
    "metadata": {
      "purpose": "Office supplies"
    }
  }'`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Get Card Details</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`curl -X GET "https://api.ghostpay-lite.com/cards/card_1234567890abcdef" \\
  -H "Authorization: Bearer your_api_key_here"`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`curl -X GET "https://api.ghostpay-lite.com/cards/card_1234567890abcdef" \\
  -H "Authorization: Bearer your_api_key_here"`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Create a Charge</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`curl -X POST "https://api.ghostpay-lite.com/charges" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cardId": "card_1234567890abcdef",
    "amount": 50,
    "currency": "USD",
    "description": "Office supplies purchase"
  }'`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-xs md:text-sm font-mono overflow-x-auto p-2">
{`curl -X POST "https://api.ghostpay-lite.com/charges" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cardId": "card_1234567890abcdef",
    "amount": 50,
    "currency": "USD",
    "description": "Office supplies purchase"
  }'`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <RouterLink to="/api-docs/spec">
                  <FileText className="mr-2 h-4 w-4" />
                  OpenAPI Specification
                </RouterLink>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <RouterLink to="/interactive-demo">
                  <Link className="mr-2 h-4 w-4" />
                  Try Interactive Demo
                </RouterLink>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://github.com/glebshatilov" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Client Libraries
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-1">
                <h3 className="font-medium">Error Handling</h3>
                <p className="text-muted-foreground">Always implement proper error handling for all API calls.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">API Keys</h3>
                <p className="text-muted-foreground">Keep API keys secure and never expose them in client-side code.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Rate Limiting</h3>
                <p className="text-muted-foreground">Implement exponential backoff for failed requests to avoid rate limit issues.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Webhook Validation</h3>
                <p className="text-muted-foreground">Always verify webhook signatures to prevent security vulnerabilities.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
