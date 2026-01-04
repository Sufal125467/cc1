
import React, { useState, useEffect } from 'react';
import { User, Employee, AppSection } from './types';
import { INITIAL_EMPLOYEES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import AuthForm from './components/AuthForm';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize data from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('salario_user');
    const savedEmployees = localStorage.getItem('salario_employees');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(INITIAL_EMPLOYEES);
      localStorage.setItem('salario_employees', JSON.stringify(INITIAL_EMPLOYEES));
    }
  }, []);

  const handleLogin = (email: string, pass: string) => {
    // Simulated database check
    const savedAccounts = JSON.parse(localStorage.getItem('salario_accounts') || '[]');
    const account = savedAccounts.find((a: any) => a.email === email && a.password === pass);

    if (account) {
      const userData = { id: account.id, username: account.username, email: account.email };
      setUser(userData);
      localStorage.setItem('salario_user', JSON.stringify(userData));
      setAuthError(null);
    } else {
      setAuthError("Credentials not found. Please check your email and password.");
    }
  };

  const handleSignup = (name: string, email: string, pass: string) => {
    const newAccount = { id: Date.now().toString(), username: name, email, password: pass };
    const savedAccounts = JSON.parse(localStorage.getItem('salario_accounts') || '[]');
    
    if (savedAccounts.some((a: any) => a.email === email)) {
      setAuthError("Email already registered.");
      return;
    }

    savedAccounts.push(newAccount);
    localStorage.setItem('salario_accounts', JSON.stringify(savedAccounts));
    
    const userData = { id: newAccount.id, username: name, email };
    setUser(userData);
    localStorage.setItem('salario_user', JSON.stringify(userData));
    setAuthError(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('salario_user');
  };

  const handleAddEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp = { ...emp, id: Date.now().toString() };
    const updated = [newEmp, ...employees];
    setEmployees(updated);
    localStorage.setItem('salario_employees', JSON.stringify(updated));
  };

  const handleRemoveEmployee = (id: string) => {
    if (confirm("Are you sure you want to remove this employee record?")) {
      const updated = employees.filter(e => e.id !== id);
      setEmployees(updated);
      localStorage.setItem('salario_employees', JSON.stringify(updated));
    }
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} onSignup={handleSignup} error={authError} />;
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 p-8 lg:p-12 pb-32">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
          {activeSection === AppSection.DASHBOARD && (
            <Dashboard employees={employees} />
          )}
          
          {(activeSection === AppSection.EMPLOYEES || activeSection === AppSection.PAYROLL) && (
            <EmployeeManagement 
              employees={employees} 
              onAddEmployee={handleAddEmployee} 
              onRemoveEmployee={handleRemoveEmployee}
            />
          )}

          {activeSection === AppSection.SETTINGS && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-4xl">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">System Settings</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Configure your payroll cycles, tax rates, and company preferences.</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-400 uppercase font-bold">Currency</span>
                  <div className="font-bold">USD ($)</div>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
                   <span className="text-xs text-slate-400 uppercase font-bold">Tax Mode</span>
                   <div className="font-bold">Flat 20%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AIChatbot employees={employees} />
    </div>
  );
};

export default App;
