export interface Coordinator {
  id: string;
  name: string;
  age: number;
  avatar: string;
  hobbies: string[];
  serviceType: 'スポット型' | '担当者固定型' | '両方対応';
  supportMenus: string[];
  availableTimes: string[];
  experience: string;
  description: string;
  location: string;
}

export interface User {
  id: string;
  type: '当事者' | '家族' | 'コーディネーター';
  name: string;
  age?: number;
  avatar?: string;
}

export interface Match {
  id: string;
  coordinatorId: string;
  userId: string;
  createdAt: Date;
}

export type SwipeDirection = 'left' | 'right';

export interface FilterOptions {
  serviceType?: string[];
  supportMenus?: string[];
  availableTimes?: string[];
} 