
import { toast } from "sonner";

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'merchant' | 'user';
  apiKey: string;
}

const DEMO_USERS: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    role: 'admin',
    apiKey: 'gp_live_admin_9a8b7c6d5e4f3g2h1i',
  },
  {
    id: 'merchant-1',
    username: 'merchant',
    role: 'merchant',
    apiKey: 'gp_live_merchant_1a2b3c4d5e6f7g8h9i',
  },
  {
    id: 'user-1',
    username: 'user',
    role: 'user',
    apiKey: 'gp_live_user_a1b2c3d4e5f6g7h8i9j',
  }
];

class AuthService {
  private currentUser: User | null = null;

  login(username: string, password: string): Promise<User> {
    // Simple demo authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = DEMO_USERS.find(u => u.username === username);
        if (user && password === 'ghostpay') {
          this.currentUser = user;
          localStorage.setItem('ghostpay_user', JSON.stringify(user));
          toast.success(`Logged in as ${user.username}`);
          resolve(user);
        } else {
          toast.error('Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('ghostpay_user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const storedUser = localStorage.getItem('ghostpay_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: 'admin' | 'merchant' | 'user'): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (user.role === 'admin') return true;  // Admin can do everything
    return user.role === role;
  }
}

export const authService = new AuthService();
