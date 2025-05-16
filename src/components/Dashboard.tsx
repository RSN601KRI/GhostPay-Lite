
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiService } from "@/services/api-service";
import { authService } from "@/services/auth-service";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { MetricsPanel } from "./MetricsPanel";
import { CreateCardPanel } from "./CreateCardPanel";
import { CreateChargePanel } from "./CreateChargePanel";
import { RecentActivityPanel } from "./RecentActivityPanel";

const Dashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState(apiService.getMetrics());
  const user = authService.getCurrentUser();

  useEffect(() => {
    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(apiService.getMetrics());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleResetDemo = () => {
    apiService.resetDemo();
    setMetrics(apiService.getMetrics());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <MetricsPanel metrics={metrics} />

        <Card className="w-full md:w-1/3 shadow-md border-border/50">
          <CardHeader className="bg-ghost-900 text-white pb-6">
            <CardTitle className="text-lg">API Key</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Your API Key ({user?.role})</span>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
              <div className="bg-muted/50 p-2 rounded border font-mono text-sm break-all">
                {user?.apiKey}
              </div>
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Rotate Key
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Tabs defaultValue="create-card" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create-card">Create Card</TabsTrigger>
            <TabsTrigger value="get-card">Get Card</TabsTrigger>
          </TabsList>
          <TabsContent value="create-card">
            <CreateCardPanel onCardCreated={() => setMetrics(apiService.getMetrics())} />
          </TabsContent>
          <TabsContent value="get-card">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Get Card Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="cardId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Card ID
                    </label>
                    <input
                      id="cardId"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="card_1234567890abcdef"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Card</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="create-charge" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create-charge">Create Charge</TabsTrigger>
            <TabsTrigger value="get-charge">Get Charge</TabsTrigger>
          </TabsList>
          <TabsContent value="create-charge">
            <CreateChargePanel onChargeCreated={() => setMetrics(apiService.getMetrics())} />
          </TabsContent>
          <TabsContent value="get-charge">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Get Charge Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="chargeId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Charge ID
                    </label>
                    <input
                      id="chargeId"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="ch_1234567890abcdef"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Charge</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <RecentActivityPanel activities={metrics.recentActivity} />

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleResetDemo}>
          Reset Demo Data
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
