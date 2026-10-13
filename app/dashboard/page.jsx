'use client'

import{ useState } from 'react';
import { HeartHandshake } from 'lucide-react'; 
import { Menu } from 'lucide-react';
import { Users} from 'lucide-react';

// Sample dummy customer data aligned with assignment requirements
const INITIAL_CUSTOMERS = [
  {
    id: 'c1',
    name: 'Andrew Peterson',
    gender:'male',
    age: 29,
    country:"india",
    city: 'Bengaluru',
    maritalStatus: 'Never Married',
    status: 'In Progress',
    email: 'andrew.p@example.com',
    phone: '+91 98765 43210',
    height: "160cm",
    education: '',
    income: '',
    currentCompany: '',
    designation: '',
    languageKnown: '',
    siblings: '',
    caste: '',
    religin: '',
    want_kids: '',
    open_to_relocate: '',
    open_to_pets:''
  },
  /*
  • First Name, Last Name
• Gender
• Date of Birth
• Country, City
• Height
• Email, Phone Number
• Undergraduate College, Degree
• Income
• Current Company, Designation
• Marital Status
• Languages Known
• Siblings

• Caste, Religion
• Want Kids (Yes/No/Maybe)
• Open to Relocate (Yes/No/Maybe)
• Open to Pets (Yes/No/Maybe)
  
  
  */
  {
    id: 'c2',
    name: 'Brooklyn Simmons',
    age: 27,
    city: 'Mumbai',
    maritalStatus: 'Never Married',
    status: 'Matched',
    email: 'brooklyn.s@example.com',
    phone: '+91 98123 45678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c3',
    name: 'Leslie Alexander',
    age: 31,
    city: 'Delhi',
    maritalStatus: 'Divorced',
    status: 'In Progress',
    email: 'leslie.a@example.com',
    phone: '+91 99887 76655',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c4',
    name: 'Jacob Jones',
    age: 28,
    city: 'Pune',
    maritalStatus: 'Never Married',
    status: 'Matched',
    email: 'jacob.j@example.com',
    phone: '+91 97654 32109',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c5',
    name: 'Dianne Russell',
    age: 26,
    city: 'Hyderabad',
    maritalStatus: 'Never Married',
    status: 'In Progress',
    email: 'dianne.r@example.com',
    phone: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c6',
    name: 'Marvin McKinney',
    age: 32,
    city: 'Bengaluru',
    maritalStatus: 'Widowed',
    status: 'On Hold',
    email: 'marvin.m@example.com',
    phone: '+91 94567 89012',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c7',
    name: 'Kathryn Murphy',
    age: 30,
    city: 'Chennai',
    maritalStatus: 'Never Married',
    status: 'Matched',
    email: 'kathryn.m@example.com',
    phone: '+91 93210 98765',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c8',
    name: 'Arlene McCoy',
    age: 29,
    city: 'Kolkata',
    maritalStatus: 'Never Married',
    status: 'In Progress',
    email: 'arlene.m@example.com',
    phone: '+91 92345 67890',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
];

export default function MatchmakerDashboard({ onSelectCustomer }) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'IN_PROGRESS', 'MATCHED'
  const [searchQuery, setSearchQuery] = useState('');

  // Matchmaker profile details (Left Sidebar)
  const employee = {
    name: 'Jerald Roy J',
    id: 'EMP-4082',
    role: 'Junior Matchmaker',
    totalClients: INITIAL_CUSTOMERS.length,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  };

  // Filter customers based on search and active tab
  const filteredCustomers = INITIAL_CUSTOMERS.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'IN_PROGRESS') {
      return matchesSearch && customer.status === 'In Progress';
    }
    if (activeTab === 'MATCHED') {
      return matchesSearch && customer.status === 'Matched';
    }
    return matchesSearch;
  });

  // Calculate quick stats
  const countInProgress = INITIAL_CUSTOMERS.filter((c) => c.status === 'In Progress').length;
  const countMatched = INITIAL_CUSTOMERS.filter((c) => c.status === 'Matched').length;

  // Helper function to pick status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Matched':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'On Hold':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    
    <div className="w-full min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row font-sans antialiased overflow-x-hidden items-center justify-center">
      <div className="w-full max-w-[1560px] min-h-screen md:min-h-[88vh] bg-white shadow-xl md:rounded-3xl border border-slate-200 overflow-hidden flex flex-col md:flex-row my-auto">
      {/* ================= LEFT DIVISION: EMPLOYEE DETAILS & NAVIGATION ================= */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header */}
          <div className="flex items-center gap-3 mb-8">
             <HeartHandshake className="w-6 h-6 text-black" />
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-none">Match CRM</h1>
              <span className="text-xs text-slate-400 font-medium">Internal Portal</span>
            </div>
          </div>

          {/* Employee Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <h2 className="font-semibold text-slate-800 text-sm truncate">{employee.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{employee.role}</p>
              <span className="inline-block mt-1 text-[10px] font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                ID: {employee.id}
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </p>
            
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
             <Menu className="w-6 h-6" />
              Dashboard
            </button>

            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 shadow-md shadow-blue-500/20">
              <div className="flex items-center gap-3">
               <Users className="w-5 h-5" />
                Assigned Clients
              </div>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {employee.totalClients}
              </span>
            </button>

          
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-200 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span>System Status</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
            </span>
          </div>
          <p>© 2026 TDC Matchmaking</p>
        </div>
      </aside>

      {/* ================= RIGHT DIVISION: CLIENTS GRID & CONTROLS ================= */}
      <main className ="flex-1 bg-[#F4F5F7] p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
        <div>
          
          {/* Top Header & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Assigned Clients</h2>
              <p className="text-sm text-slate-500 mt-1">Manage and view active matchmaking candidate profiles</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Filter Toggle Buttons Section */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Clients ({INITIAL_CUSTOMERS.length})
              </button>

              <button
                onClick={() => setActiveTab('IN_PROGRESS')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'IN_PROGRESS'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === 'IN_PROGRESS' ? 'bg-white' : 'bg-amber-500'}`}></span>
                Still Working On ({countInProgress})
              </button>

              <button
                onClick={() => setActiveTab('MATCHED')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'MATCHED'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === 'MATCHED' ? 'bg-white' : 'bg-emerald-500'}`}></span>
                Completed Successfully ({countMatched})
              </button>
            </div>

            <div className="text-xs text-slate-400 font-medium px-3">
              Showing {filteredCustomers.length} results
            </div>
          </div>

          {/* ================= CLIENTS SQUARED CARDS GRID ================= */}
          {filteredCustomers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center my-8">
              <p className="text-slate-500 text-sm font-medium">No clients found matching your filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => onSelectCustomer && onSelectCustomer(customer.id)}
                  className="group bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between h-auto sm:aspect-square"
                >
                  {/* Top Header of Card */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Replace the <img> tag with this circular initials placeholder */}
<div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
  {customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)}
</div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                            {customer.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">{customer.age} yrs • {customer.city}</p>
                        </div>
                      </div>

                      {/* Options icon */}
                      <button className="text-slate-300 hover:text-slate-600 p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>

                    {/* Contact / Info Details */}
                    <div className="space-y-1.5 my-3 text-xs text-slate-500">
                      <div className="flex items-center gap-2 truncate">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status Tags & Marital Status */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mx-auto">
                  
                    
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </main>
        </div>
    </div>
  );
}