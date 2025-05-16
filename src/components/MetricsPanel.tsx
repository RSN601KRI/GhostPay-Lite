
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleAlert, CircleClock, Activity, Zap } from "lucide-react";
import { MetricsData } from "@/services/api-types";

interface MetricsPanelProps {
  metrics: MetricsData;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  const isGoodSuccessRate = metrics.successRate > 95;
  
  return (
    <Card className="w-full md:w-2/3 shadow-md border-border/50">
      <CardHeader className="bg-ghost-800 text-white pb-4">
        <CardTitle className="text-lg">System Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-center p-3 bg-background rounded-lg border">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 mb-2">
              <CircleCheck className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold">{metrics.successRate}%</div>
            <div className="text-xs text-muted-foreground text-center">Success Rate</div>
            <div className={`text-xs mt-1 ${isGoodSuccessRate ? 'text-green-600' : 'text-amber-600'}`}>
              {isGoodSuccessRate ? 'Good' : 'Warning'}
            </div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background rounded-lg border">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 mb-2">
              <CircleClock className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}<span className="text-sm ml-1">ms</span></div>
            <div className="text-xs text-muted-foreground text-center">Avg Response</div>
            <div className="text-xs mt-1 text-green-600">Good</div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background rounded-lg border">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-800 mb-2">
              <Activity className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold">{metrics.cardCount}</div>
            <div className="text-xs text-muted-foreground text-center">Cards Issued</div>
            <div className="text-xs mt-1 text-muted-foreground">Total</div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background rounded-lg border">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-800 mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold">{metrics.chargeCount}</div>
            <div className="text-xs text-muted-foreground text-center">Charges Processed</div>
            <div className="text-xs mt-1 text-muted-foreground">Total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
