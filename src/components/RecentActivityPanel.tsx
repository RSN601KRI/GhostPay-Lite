
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface ActivityItem {
  timestamp: string;
  action: string;
  details: string;
}

interface RecentActivityPanelProps {
  activities: ActivityItem[];
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({ activities }) => {
  return (
    <Card className="w-full shadow-md border-border/50">
      <CardHeader className="bg-secondary/50">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {activities.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="bg-muted/30">
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Action</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="border-b hover:bg-muted/20">
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {format(new Date(activity.timestamp), "MMM dd, HH:mm:ss")}
                  </td>
                  <td className="py-3 px-4 text-xs font-medium">
                    {activity.action}
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {activity.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No activity recorded yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};
