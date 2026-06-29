import React, { useState, useEffect } from 'react';

export default function App() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ service: '', status: 'pending' });
  const [showHistory, setShowHistory] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage on app start
  useEffect(() => {
    try {
      const savedRequests = localStorage.getItem('serviceRequests');
      if (savedRequests) {
        const parsed = JSON.parse(savedRequests);
        setRequests(parsed);
      }
      setLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoaded(true);
    }
  }, []);

  // Save to localStorage whenever requests change
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem('serviceRequests', JSON.stringify(requests));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [requests, loaded]);

  const addRequest = () => {
    if (formData.service.trim()) {
      const newRequest = {
        id: Date.now(),
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

  const getStatusStyle = (status) => {
    const styles = {
      pending: { backgroundColor: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' },
      approved: { backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' },
      completed: { backgroundColor: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' },
    };
    return styles[status] || styles.pending;
  };

  // Get completed requests
  const completedRequests = requests.filter(r => r.status === 'completed');
  const activeRequests = requests.filter(r => r.status !== 'completed');

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: completedRequests.length,
  };

  if (!loaded) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111' }}>Corporate Services Dashboard</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>Manage office requests efficiently</p>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <StatCard title="Total Requests" value={stats.total} color="#3b82f6" />
          <StatCard title="Pending" value={stats.pending} color="#eab308" />
          <StatCard title="Approved" value={stats.approved} color="#6366f1" />
          <StatCard title="Completed" value={stats.completed} color="#22c55e" />
        </div>

        {/* Add Request Form */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#111' }}>New Service Request</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Enter service name..."
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addRequest()}
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', minWidth: '200px' }}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={addRequest}
              style={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              Add Request
            </button>
          </div>
        </div>

        {/* Active Requests */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', padding: '32px', borderBottom: '1px solid #e5e7eb', color: '#111' }}>Active Requests</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Service</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Date</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px 24px', textAlign: 'center', color: '#999' }}>
                      No active requests. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  activeRequests.map((request) => (
                    <tr key={request.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px 24px', color: '#111', fontWeight: '600' }}>#{request.id}</td>
                      <td style={{ padding: '16px 24px', color: '#111' }}>{request.service}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <select
                          value={request.status}
                          onChange={(e) => updateStatus(request.id, e.target.value)}
                          style={{ ...getStatusStyle(request.status), border: 'none', cursor: 'pointer' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#666' }}>{request.date}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <button
                          onClick={() => deleteRequest(request.id)}
                          style={{ color: '#dc2626', fontWeight: '600', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '16px' }}
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

        {/* History Toggle */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{ backgroundColor: '#7c3aed', color: '#fff', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            {showHistory ? '✓ Hide' : '📋 Show'} Completion History ({completedRequests.length})
          </button>
        </div>

        {/* Completion History */}
        {showHistory && (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', padding: '32px', borderBottom: '1px solid #e5e7eb', color: '#111' }}>Completion History</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>ID</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Service</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: '#111' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedRequests.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '48px 24px', textAlign: 'center', color: '#999' }}>
                        No completed requests yet.
                      </td>
                    </tr>
                  ) : (
                    completedRequests.map((request) => (
                      <tr key={request.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fce4' }}>
                        <td style={{ padding: '16px 24px', color: '#111', fontWeight: '600' }}>#{request.id}</td>
                        <td style={{ padding: '16px 24px', color: '#111' }}>{request.service}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={getStatusStyle(request.status)}>
                            ✓ Completed
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#666' }}>{request.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ backgroundColor: color, borderRadius: '8px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '24px', color: '#fff' }}>
      <p style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>{title}</p>
      <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>{value}</p>
    </div>
  );
}