// import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Users, 
  Compass,  
  Info,
} from 'lucide-react';

import { profile, assigned_clients } from '@/data/profile';
import MatchButton from '@/components/matchButton';
import Link from 'next/link';

// Core Matching Engine 
 async function calculateMatches(customer) {
   try {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-ultra-550b-a55b:free', // Highly stable free model route on OpenRouter
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'system',
            content: ' You are an expert matchmaking CRM assistant. Analyze the target customer against the candidate pool and provide concise compatibility insights the matching should be done only with opposite gender. Give me the top 3 matches with a couple of points on why they match, along with basic details like first_name, last_name, dob, designation, gender and height_cm .Return ONLY a JSON object with this exact key structure: { "matches": [  { "id": number"first_name": "string","last_name": "string","match_score": number (e.g. 92),"designation": "string", "age": number,"height_cm": number,"reasons": ["Point 1", "Point 2", "Point 3"]   }',
          },
          {
            role: 'user',
            content: `
              TARGET CUSTOMER: ${JSON.stringify(customer)}
              CANDIDATES: ${JSON.stringify(profile.slice(0, 5))}
            `,
          },
        ],
      }),
    });

     const data = await response.json();
     // 1. Get the raw JSON string from OpenRouter's message content
const rawContent = data.choices?.[0]?.message?.content;

if (!rawContent) {
  console.error('No content returned from OpenRouter:', data);
  return [];
}

// 2. Parse the string into a JavaScript object
const parsedData = JSON.parse(rawContent);

// 3. Return the matches array
return parsedData.matches || [];
    
   } catch (err) {
     console.error('Gemini AI fetch error:', err);
    return 'Could not load AI insights at this time.';
  }
}

export default async function CustomerDetailPage({ params }) {
  const {id} = await params
  const findClient = [...assigned_clients]
  const customer = findClient.find((profile) => profile.id == id)

 const matches = await calculateMatches(customer) || []
  

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-16">
      

     
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <Link 
  href="/dashboard" // Change this to your exact route path
  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 mb-6 transition-colors"
>
  <span>←</span> Back to Customers
</Link>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        
        <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-white border border-indigo-100/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Matchmaking Engine Active
              </h2>
             
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Profile
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
        {/* left column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Hero Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                  {customer.first_name}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {customer.first_name} {customer.last_name}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      customer.gender === "Male" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-pink-50 text-pink-700 border border-pink-100"
                    }`}>
                      {customer.gender}, dob {customer.date_of_birth}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customer.designation} at <strong className="text-slate-700">{customer.company}</strong></span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customer.city}, {customer.country}</span>
                  </p>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">Income</span>
                  <span className="text-sm font-bold text-slate-800">${customer.annual_income_usd}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">Height</span>
                  <span className="text-sm font-bold text-slate-800">{customer.height_cm}cm</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">ph number</span>
                  <span className="text-sm font-bold text-slate-800">{customer.phone_number}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">caste</span>
                  <span className="text-sm font-bold text-slate-800">{customer.caste}</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: Personal & Contact Information */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2 mb-4">
                <User className="w-4 h-4" /> Personal & Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Full Name</span>
                  <span className="font-semibold text-slate-800">{customer.first_name} {customer.last_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Gender</span>
                  <span className="font-semibold text-slate-800">{customer.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Date of Birth</span>
                  <span className="font-semibold text-slate-800">{customer.date_of_birth}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Height</span>
                  <span className="font-semibold text-slate-800">{customer.height}cm</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Current Location</span>
                  <span className="font-semibold text-slate-800">{customer.city}, {customer.country}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Marital Status</span>
                  <span className="font-semibold text-slate-800">{customer.marital_status}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Email Address</span>
                  <span className="font-semibold text-slate-800">{customer.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Phone Number</span>
                  <span className="font-semibold text-slate-800">{customer.phone_number}</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: Career & Financials */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4" /> Education & Career
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Degree</span>
                  <span className="font-semibold text-slate-800">{customer.degree}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Undergraduate College</span>
                  <span className="font-semibold text-slate-800">{customer.undergraduate_college}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Current Company</span>
                  <span className="font-semibold text-slate-800">{customer.current_company}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Designation</span>
                  <span className="font-semibold text-slate-800">{customer.designation}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Annual Income</span>
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs inline-block mt-0.5">
                    ${customer.annual_income_usd}
                  </span>
                </div>
              </div>
            </div>

           
            {/* SECTION 3: Cultural & Family Background (Indian Matrimonial Specifics) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2 mb-4">
                <Users className="w-4 h-4" /> Cultural & Family Background
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Religion & Caste</span>
                  <span className="font-semibold text-slate-800">{customer.religion} ({customer.caste})</span>
                </div>
               
                <div>
                  <span className="text-slate-400 text-xs block">Family Setup</span>
                  <span className="font-semibold text-slate-800">{customer.familyType}</span>
                </div>
                {/* <div>
                  <span className="text-slate-400 text-xs block">Languages Known</span>
                  <span className="font-semibold text-slate-800">{customer.languages.join(", ")}</span>
                </div> */}
                <div>
                  <span className="text-slate-400 text-xs block">Siblings</span>
                  <span className="font-semibold text-slate-800">{customer.siblings}</span>
                </div>
              </div>
            </div>

            {/* SECTION 4: Lifestyle & Preferences */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2 mb-4">
                <Compass className="w-4 h-4" /> Lifestyle & Key Expectations
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block">Want Kids?</span>
                  <span className="text-sm font-bold text-slate-800">{customer.want_kids == "not_specified" ? "yes" : customer.want_kids}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block">Open to Relocate?</span>
                  <span className="text-sm font-bold text-slate-800">{customer.open_to_relocate == "not_specified" ? "yes" :customer.open_to_relocate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block">Open to Pets?</span>
                  <span className="text-sm font-bold text-slate-800">{customer.open_to_pets == "not_specified" ? "yes" : customer.open_to_pets}</span>
                </div>
              </div>
            </div>

          </div>

         {/* right column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className=" top-20">
              
              {/* Top Matches Header Card */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    Top 3 Recommended Matches
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Generated via algorithm for {customer.first_name}
                  </p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  3 Profiles
                </span>
              </div>

            

              {/* Informational Footer Box */}
              <div className="mt-5 p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 text-xs text-slate-500 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  Clicking <strong>Send Match</strong> triggers automated email & WhatsApp introductions to both the candidate and customer with full biodata attachments.
                </p>
              </div>

            </div>
            {/* actual column part */}
            {/* MATCH CARDS LIST (Stacked vertically or in a grid inside the right panel) */}
<div className="space-y-4">
  {matches && matches.length > 0 ? (
    matches.map((item) => (
      <div 
        key={item.id} 
        className="bg-white border border-[#ebd0a0] rounded-xl p-4 shadow-xs flex flex-col justify-between"
      >
        <div>
          {/* Header: Name, Designation & Circular Match Score Badge */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h4 className="font-bold text-gray-900 text-base">
                {item.first_name} {item.last_name}
              </h4>
              <p className="text-xs text-gray-500 font-medium">{item.designation || 'N/A'}</p>
            </div>

            {/* Circular Score Badge */}
            <div className="relative w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-500 flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-bold text-emerald-700 leading-none">
                {item.match_score}%
              </span>
              <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-medium">
                Match
              </span>
            </div>
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Age: {item.age}
            </span>
            <span className="bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Height: {item.height_cm} cm
            </span>
          </div>

          {/* Compatibility Reasons */}
          <div className="space-y-1 mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Why they match
            </p>
            <ul className="space-y-1">
              {item.reasons?.map((reason, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5 leading-snug">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

       <MatchButton candidateName={item.first_name}></MatchButton>
      </div>
    ))
  ) : (
    <div className="text-center py-8 text-gray-600 text-sm">
      Calculating matches...
    </div>
  )}
</div>
          </div>

        </div>
      </main>
    </div>
  );
}