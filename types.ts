
export interface Employee {
  id: string;
  fullName: string;
  email: string;
  position: string;
  monthlyIncome: number;
  dateOfJoining: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  EMPLOYEES = 'EMPLOYEES',
  PAYROLL = 'PAYROLL',
  SETTINGS = 'SETTINGS'
}
