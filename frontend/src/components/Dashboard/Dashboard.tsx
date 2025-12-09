import React, { useState } from 'react';
import axios from 'axios';

interface ScanResult {
  isSafe: boolean;
  flags: string[];
}

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleScan = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/scanner`,
        {
          prompt,
          checkType: 'injection',
        },
        {
          headers: {
            // In a real app, get the token from local storage or context
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      setResult(response.data);
    } catch (error) {
      console.error('Scan failed', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Security Dashboard</h1>

      {/* Launchpad for New Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-bold mb-2">Prompt Shield</h3>
          <p className="text-gray-600 mb-4">Real-time injection testing & jailbreak detection.</p>
          <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Launch Tool &rarr;</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-bold mb-2">RedTeam Kit</h3>
          <p className="text-gray-600 mb-4">Advanced adversarial testing & attack scenarios.</p>
          <a href="http://localhost:3006" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-medium">Launch Tool &rarr;</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-bold mb-2">Compliance Checker</h3>
          <p className="text-gray-600 mb-4">Automated policy scanning (GDPR, HIPAA, AI Act).</p>
          <a href="http://localhost:3004" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">Launch Tool &rarr;</a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Prompt Scanner</h2>
        <textarea
          className="w-full p-4 border rounded-md mb-4"
          rows={4}
          placeholder="Enter prompt to scan..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleScan}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Scan Prompt
        </button>
      </div>

      {result && (
        <div className={`p-6 rounded-lg shadow-md ${result.isSafe ? 'bg-green-50' : 'bg-red-50'}`}>
          <h2 className="text-xl font-semibold mb-2">Scan Result</h2>
          <p className="mb-2">
            Status:{' '}
            <span className={`font-bold ${result.isSafe ? 'text-green-700' : 'text-red-700'}`}>
              {result.isSafe ? 'SAFE' : 'UNSAFE'}
            </span>
          </p>
          {result.flags.length > 0 && (
            <div>
              <p className="font-semibold">Flags:</p>
              <ul className="list-disc list-inside">
                {result.flags.map((flag: string, index: number) => (
                  <li key={index} className="text-red-600">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
