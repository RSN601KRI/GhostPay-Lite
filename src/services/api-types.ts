
export interface Card {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  status: 'active' | 'used' | 'expired';
  createdAt: string;
  usedAt?: string;
  meta?: Record<string, any>;
}

export interface CardRequest {
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface Charge {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  metadata?: Record<string, any>;
}

export interface ChargeRequest {
  cardId: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface MetricsData {
  successRate: number;
  cardCount: number;
  chargeCount: number;
  avgResponseTime: number;
  recentActivity: {
    timestamp: string;
    action: string;
    details: string;
  }[];
}
