import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      console.log('API Response:', response); // Debug log
      setProjects(response.data || response); // Handle both {data} and raw response
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state with a skeleton loader for better UX
  if (loading) {
    return (
      <div className="container mx-auto p-4 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow bg-gray-100"
            >
              <div className="w-full h-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchProjects}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header with a gradient underline */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 relative">
        My Projects
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
      </h1>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Image with fallback */}
            {project.image ? (
              <img
                src={`http://127.0.0.1:8000/storage/${project.image}`}
                alt={project.title}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-52 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Visit Project
                </a>
              )}
            </div>

            {/* Hover overlay for subtle effect */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
          </div>
        ))}

        {/* Empty state */}
        {projects.length === 0 && !loading && !error && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">
              No projects available. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;