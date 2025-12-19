import { useEffect, useState } from 'react';
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
      console.error(err);
      setError('Failed to load client testimonials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="clients">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Happy Clients
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our clients have to say about working with us.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500">
          Loading client testimonials...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {/* Clients Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div
              key={client._id || client.name}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                
                {/* Client Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                  <img
                    src={`http://127.0.0.1:8000/${client.image_url}`}
                    alt={client.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/150?text=Client';
                    }}
                  />
                </div>

                {/* Testimonial */}
                <p className="text-gray-600 italic mb-6">
                  “{client.description}”
                </p>

                {/* Name & Role */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {client.name}
                </h3>
                <p className="text-blue-600 text-sm font-medium">
                  {client.designation}
                </p>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && clients.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No client testimonials available yet.
        </div>
      )}
    </section>
  );
};

export default HappyClients;
