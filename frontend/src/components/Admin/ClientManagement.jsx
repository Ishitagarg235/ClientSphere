import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { clientsAPI } from '../../services/api';

const ClientManagement = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [clients, setClients] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await clientsAPI.getAll();
      setClients(data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('designation', data.designation);
      formData.append('description', data.description);
      formData.append('image', data.image[0]);

      await clientsAPI.add(formData);
      
      setMessage({ 
        type: 'success', 
        text: 'Client added successfully!' 
      });
      reset();
      fetchClients();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to add client. Please try again.' 
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Management</h2>
      
      {/* Add Client Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Client</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Client Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Client name is required' })}
              className="input-field"
              placeholder="Enter client name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Designation *
            </label>
            <input
              type="text"
              {...register('designation', { required: 'Designation is required' })}
              className="input-field"
              placeholder="e.g., CEO, Web Developer, Designer"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Testimonial/Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field"
              rows="4"
              placeholder="Enter client testimonial"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Client Image *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: 'Image is required' })}
              className="input-field"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding...' : 'Add Client'}
          </button>

          {message.text && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
        </form>
      </div>

      {/* Existing Clients */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Clients ({clients.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client, index) => (
            <div key={index} className="border rounded-lg p-4 text-center">
              <img
                src={`http://127.0.0.1:8000/${client.image_url}`}
                alt={client.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              />
              <h4 className="font-semibold text-gray-800">{client.name}</h4>
              <p className="text-sm text-blue-600">{client.designation}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {client.description}
              </p>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <p className="text-gray-500 text-center">No clients added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;