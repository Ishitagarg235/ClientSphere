import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactsAPI } from '../../services/api';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });
      
      await contactsAPI.submit(data);
      
      setMessage({ 
        type: 'success', 
        text: 'Thank you! Your message has been sent successfully.' 
      });
      reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again.' 
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('full_name', { required: 'Full name is required' })}
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input-field"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                {...register('mobile', { 
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit mobile number'
                  }
                })}
                className="input-field"
                placeholder="Enter your mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
              )}
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                City *
              </label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
                className="input-field"
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* Success/Error Message */}
            {message.text && (
              <div className={`mt-4 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;