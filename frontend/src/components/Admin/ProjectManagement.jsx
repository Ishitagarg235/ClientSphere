import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { projectsAPI } from '../../services/api';

const ProjectManagement = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [projects, setProjects] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('image', data.image[0]);

      await projectsAPI.add(formData);
      
      setMessage({ 
        type: 'success', 
        text: 'Project added successfully!' 
      });
      reset();
      fetchProjects();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to add project. Please try again.' 
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Management</h2>
      
      {/* Add Project Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Project</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Project name is required' })}
              className="input-field"
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field"
              rows="4"
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project Image *
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
            {submitting ? 'Adding...' : 'Add Project'}
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

      {/* Existing Projects */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Projects ({projects.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4">
              <img
                src={`http://127.0.0.1:8000/${project.image_url}`}
                alt={project.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-semibold text-gray-800">{project.name}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-gray-500 text-center">No projects added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;