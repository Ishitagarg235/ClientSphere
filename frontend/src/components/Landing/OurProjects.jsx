import { useState, useEffect } from 'react';
import { projectsAPI } from '../../services/api';

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Projects</h2>
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Projects</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
  Our Projects
</h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

              <div className="h-56 overflow-hidden">
  <img
    src={`http://127.0.0.1:8000/${project.image_url}`}
    alt={project.name}
    className="w-full h-full object-cover"
  />
</div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <button className="text-blue-400 hover:text-blue-800 font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProjects;