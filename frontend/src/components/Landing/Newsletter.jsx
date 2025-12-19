import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { newsletterAPI } from '../../services/api';

const Newsletter = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });
      
      await newsletterAPI.subscribe(data);
      
      setMessage({ 
        type: 'success', 
        text: 'Successfully subscribed to our newsletter!' 
      });
      reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to subscribe. Please try again.' 
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Stay updated with our latest projects and news. Get exclusive insights delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 justify-center items-start">
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-200 text-sm mt-2 text-left">{errors.email.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 rounded-lg inline-block ${
              message.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;