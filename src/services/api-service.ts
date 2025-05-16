
import { Card, CardRequest, Charge, ChargeRequest, ApiError, MetricsData } from './api-types';
import { toast } from "sonner";

// Demo data storage
let cards: Card[] = [];
let charges: Charge[] = [];

// Demo metrics
const metrics: MetricsData = {
  successRate: 97.8,
  cardCount: 0,
  chargeCount: 0,
  avgResponseTime: 78,
  recentActivity: []
};

// Helper to generate random string
const generateRandomString = (length: number): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

class ApiService {
  // Card APIs
  async createCard(request: CardRequest): Promise<Card> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, Math.random() * 500 + 200));
    
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    
    const card: Card = {
      id: `card_${generateRandomString(16)}`,
      cardNumber: `4242${Math.floor(1000 + Math.random() * 9000)}${Math.floor(1000 + Math.random() * 9000)}${Math.floor(1000 + Math.random() * 9000)}`,
      expiryDate: `${(expiryDate.getMonth()+1).toString().padStart(2, '0')}/${expiryDate.getFullYear().toString().slice(-2)}`,
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      status: 'active',
      createdAt: now.toISOString(),
      meta: request.metadata
    };
    
    cards.push(card);
    metrics.cardCount++;
    this.logActivity('Card Created', `Card ${card.id} created for ${request.amount} ${request.currency}`);
    
    return card;
  }

  async getCard(cardId: string): Promise<Card> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, Math.random() * 300 + 100));
    
    const card = cards.find(c => c.id === cardId);
    if (!card) {
      const error: ApiError = {
        code: 'card_not_found',
        message: `Card with ID ${cardId} not found`
      };
      throw error;
    }
    
    return card;
  }

  // Charge APIs
  async createCharge(request: ChargeRequest): Promise<Charge> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, Math.random() * 600 + 300));
    
    const card = cards.find(c => c.id === request.cardId);
    if (!card) {
      const error: ApiError = {
        code: 'card_not_found',
        message: `Card with ID ${request.cardId} not found`
      };
      throw error;
    }
    
    if (card.status !== 'active') {
      const error: ApiError = {
        code: 'card_not_active',
        message: `Card with ID ${request.cardId} is ${card.status}`
      };
      throw error;
    }
    
    const now = new Date();
    const charge: Charge = {
      id: `ch_${generateRandomString(16)}`,
      cardId: request.cardId,
      amount: request.amount,
      currency: request.currency,
      status: 'pending',
      createdAt: now.toISOString(),
      metadata: request.metadata
    };
    
    charges.push(charge);
    
    // Simulate process delay and determine outcome
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      
      if (success) {
        charge.status = 'completed';
        charge.completedAt = new Date().toISOString();
        
        // Mark card as used
        card.status = 'used';
        card.usedAt = new Date().toISOString();
        
        this.logActivity('Charge Completed', `Charge ${charge.id} completed for ${charge.amount} ${charge.currency}`);
        toast.success(`Charge ${charge.id} completed successfully`);
      } else {
        charge.status = 'failed';
        this.logActivity('Charge Failed', `Charge ${charge.id} failed for ${charge.amount} ${charge.currency}`);
        toast.error(`Charge ${charge.id} failed`);
      }
      
      metrics.chargeCount++;
    }, Math.random() * 2000 + 1000);
    
    this.logActivity('Charge Created', `Charge ${charge.id} created for ${charge.amount} ${charge.currency}`);
    return charge;
  }

  async getCharge(chargeId: string): Promise<Charge> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, Math.random() * 300 + 100));
    
    const charge = charges.find(c => c.id === chargeId);
    if (!charge) {
      const error: ApiError = {
        code: 'charge_not_found',
        message: `Charge with ID ${chargeId} not found`
      };
      throw error;
    }
    
    return charge;
  }
  
  // Metrics
  getMetrics(): MetricsData {
    return {
      ...metrics,
      cardCount: cards.length,
      chargeCount: charges.length,
      avgResponseTime: Math.floor(70 + Math.random() * 20)
    };
  }
  
  private logActivity(action: string, details: string) {
    const activity = {
      timestamp: new Date().toISOString(),
      action,
      details
    };
    
    metrics.recentActivity = [activity, ...metrics.recentActivity.slice(0, 9)];
    console.log(`[GhostPay] ${action}: ${details}`);
  }
  
  // Reset demo data (for testing purposes)
  resetDemo() {
    cards = [];
    charges = [];
    metrics.recentActivity = [];
    metrics.cardCount = 0;
    metrics.chargeCount = 0;
    toast.success('Demo data has been reset');
  }
}

export const apiService = new ApiService();
