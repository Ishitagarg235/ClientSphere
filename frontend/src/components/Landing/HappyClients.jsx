import { useState, useEffect } from 'react';
import { clientsAPI } from '../../services/api';

const HappyClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientsAPI.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Happy Clients</h2>
          <div className="text-center">Loading clients...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Happy Clients</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Happy Clients</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="card p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                  <img
                    src={`http://127.0.0.1:8000/${client.image_url}`}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-600 italic mb-4">
                  "{client.description}"
                </p>
                
                <h3 className="text-xl font-bold text-gray-800">
                  {client.name}
                </h3>
                <p className="text-blue-600 font-semibold">
                  {client.designation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center text-gray-500">
            No client testimonials available yet.
          </div>
        )}
      </div>
    </section>
  );
};
