import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('/api/registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch registrations');
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registration Data</h2>
      {registrations.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No registrations found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Destination</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Travelers</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Special Requests</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrations.map((registration) => (
                <tr key={registration._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800">{registration.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    <a href={`mailto:${registration.email}`} className="text-blue-600 hover:underline">
                      {registration.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">{registration.destination}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{registration.travelers}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {new Date(registration.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 max-w-xs">
                    {registration.specialRequests || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {new Date(registration.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationList;