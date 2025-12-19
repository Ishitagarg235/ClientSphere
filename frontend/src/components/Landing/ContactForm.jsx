import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactsAPI } from '../../services/api';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });

      await contactsAPI.submit(data);

      setMessage({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully.',
      });
      reset();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: 'Failed to send message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a project in mind or want to work with us? Fill out the form
          below and we’ll get back to you.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register('full_name', {
                required: 'Full name is required',
              })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              {...register('mobile', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit mobile number',
                },
              })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              City *
            </label>
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          {/* Message */}
          {message.text && (
            <div
              className={`mt-6 p-4 rounded-lg text-center ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
