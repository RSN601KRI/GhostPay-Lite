
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api-service";
import { Card as CardType } from "@/services/api-types";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";

interface CreateCardPanelProps {
  onCardCreated: () => void;
}

export const CreateCardPanel: React.FC<CreateCardPanelProps> = ({ onCardCreated }) => {
  const [amount, setAmount] = useState<string>("100");
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState(false);
  const [createdCard, setCreatedCard] = useState<CardType | null>(null);

  const handleCreateCard = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setLoading(true);
    try {
      const card = await apiService.createCard({
        amount: parseFloat(amount),
        currency,
        metadata: { source: "dashboard" }
      });
      
      setCreatedCard(card);
      toast.success(`Card ${card.id} created successfully`);
      onCardCreated();
    } catch (error) {
      toast.error("Failed to create card");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Issue Single-Use Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-7 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="100.00"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="currency" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Currency
            </label>
            <select
              id="currency"
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

        {createdCard && (
          <div className="mt-6 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-ghost-700" />
              <h3 className="text-sm font-medium">Created Card</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card ID:</span>
                <span className="font-mono">{createdCard.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card Number:</span>
                <span className="font-mono">{createdCard.cardNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expiry:</span>
                <span className="font-mono">{createdCard.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CVV:</span>
                <span className="font-mono">{createdCard.cvv}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-mono uppercase text-green-600">{createdCard.status}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCreateCard} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Card...
            </>
          ) : (
            "Create Card"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
