export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'officer';
  location?: string;
  district?: string;
  farmSize?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('cropAdvisory_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setStoredUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cropAdvisory_user', JSON.stringify(user));
};

export const clearStoredUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cropAdvisory_user');
};

export const login = (email: string, password: string): User | null => {
  // Simulate login with stored users
  const usersStr = localStorage.getItem('cropAdvisory_users');
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  
  const user = users.find(u => u.email === email);
  if (user) {
    setStoredUser(user);
    return user;
  }
  
  // For demo purposes, allow demo login
  if (email === 'farmer@demo.com' && password === 'demo123') {
    const demoUser: User = {
      id: 'demo-farmer-1',
      name: 'Demo Farmer',
      email: 'farmer@demo.com',
      phone: '9876543210',
      role: 'farmer',
      location: 'Guntur',
      district: 'Guntur',
      farmSize: '5 acres',
      createdAt: new Date().toISOString(),
    };
    setStoredUser(demoUser);
    return demoUser;
  }
  
  if (email === 'officer@demo.com' && password === 'demo123') {
    const demoOfficer: User = {
      id: 'demo-officer-1',
      name: 'Demo Officer',
      email: 'officer@demo.com',
      phone: '9876543211',
      role: 'officer',
      district: 'Guntur',
      createdAt: new Date().toISOString(),
    };
    setStoredUser(demoOfficer);
    return demoOfficer;
  }
  
  return null;
};

export const register = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const usersStr = localStorage.getItem('cropAdvisory_users');
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem('cropAdvisory_users', JSON.stringify(users));
  setStoredUser(newUser);
  
  return newUser;
};

export const logout = (): void => {
  clearStoredUser();
};