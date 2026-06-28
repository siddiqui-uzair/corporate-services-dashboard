import React, { useState } from 'react';

export default function App() {
  const [requests, setRequests] = useState([
    { id: 1, service: 'Room Booking', status: 'pending', date: '2024-06-28' },
    { id: 2, service: 'Maintenance', status: 'approved', date: '2024-06-27' },
    { id: 3, service: 'Catering', status: 'completed', date: '2024-06-26' },
  ]);

  const [formData, setFormData] = useState({ service: '', status: 'pending' });

  const addRequest = () => {
    if (formData.service.trim()) {
      const newRequest = {
        id: Math.max(...requests.map(r => r.id), 0) + 1,
        service: formData.service,
        status: formData.status,
        date: new Date().toISOString().split('T')[0],
      };
      setRequests([newRequest, ...requests]);
      setFormData({ service: '', status: 'pending' });
    }
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Corporate Services Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage office requests efficiently</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Requests" value={stats.total} color="bg-blue-500" />
          <StatCard title="Pending" value={stats.pending} color="bg-yellow-500" />
          <StatCard title="Approved" value={stats.approved} color="bg-indigo-500" />
          <StatCard title="Completed" value={stats.completed} color="bg-green-500" />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">New Service Request</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter service name..."
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addRequest()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={addRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Add Request
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-bold p-8 border-b text-gray-900">Service Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No service requests yet. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-semibold">#{request.id}</td>
                      <td className="px-6 py-4 text-gray-900">{request.service}</td>
                      <td className="px-6 py-4">
                        <select
                          value={request.status}
                          onChange={(e) => updateStatus(request.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer border-0 ${getStatusColor(request.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{request.date}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteRequest(request.id)}
                          className="text-red-600 hover:text-red-900 font-semibold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white`}>
      <p className="text-sm font-semibold opacity-90">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}