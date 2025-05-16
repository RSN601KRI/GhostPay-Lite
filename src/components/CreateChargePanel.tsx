
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api-service";
import { Charge } from "@/services/api-types";
import { toast } from "sonner";
import { Loader2, Receipt } from "lucide-react";

interface CreateChargePanelProps {
  onChargeCreated: () => void;
}

export const CreateChargePanel: React.FC<CreateChargePanelProps> = ({ onChargeCreated }) => {
  const [cardId, setCardId] = useState<string>("");
  const [amount, setAmount] = useState<string>("50");
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState(false);
  const [createdCharge, setCreatedCharge] = useState<Charge | null>(null);

  const handleCreateCharge = async () => {
    if (!cardId) {
      toast.error("Please enter a card ID");
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setLoading(true);
    try {
      const charge = await apiService.createCharge({
        cardId,
        amount: parseFloat(amount),
        currency,
        metadata: { source: "dashboard" }
      });
      
      setCreatedCharge(charge);
      toast.success(`Charge ${charge.id} created successfully`);
      onChargeCreated();
    } catch (error: any) {
      toast.error(error.message || "Failed to create charge");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Process Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="cardId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Card ID
            </label>
            <input
              id="cardId"
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="card_1234567890abcdef"
              disabled={loading}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="charge-amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                id="charge-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-7 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="50.00"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="charge-currency" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Currency
            </label>
            <select
              id="charge-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              disabled={loading}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>

        {createdCharge && (
          <div className="mt-6 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="h-4 w-4 text-ghost-700" />
              <h3 className="text-sm font-medium">Created Charge</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Charge ID:</span>
                <span className="font-mono">{createdCharge.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card ID:</span>
                <span className="font-mono">{createdCharge.cardId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-mono">${createdCharge.amount} {createdCharge.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-mono uppercase ${
                  createdCharge.status === 'completed' ? 'text-green-600' : 
                  createdCharge.status === 'failed' ? 'text-red-600' : 
                  'text-amber-600'
                }`}>{createdCharge.status}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCreateCharge} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Create Charge"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
