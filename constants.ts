
import { Employee } from './types';

export const COLORS = {
  primary: '#10b981', // Emerald 500
  primaryDark: '#059669', // Emerald 600
  slate: '#64748b',
  danger: '#ef4444',
  warning: '#f59e0b',
};

export const COMPANY_BUDGET = 50000;

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    position: 'Senior Developer',
    monthlyIncome: 8500,
    dateOfJoining: '2023-01-15',
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'm.chen@company.com',
    position: 'Product Designer',
    monthlyIncome: 7200,
    dateOfJoining: '2023-03-20',
  },
  {
    id: '3',
    fullName: 'Elena Rodriguez',
    email: 'e.rodriguez@company.com',
    position: 'HR Manager',
    monthlyIncome: 6500,
    dateOfJoining: '2022-11-05',
  }
];
