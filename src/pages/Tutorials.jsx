import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://127.0.0.1:8000/api/tutorials').then((res) => res.json()),
      fetch('http://127.0.0.1:8000/api/categories').then((res) => res.json()),
    ])
      .then(([tutorialsData, categoriesData]) => {
        setTutorials(tutorialsData);
        setCategories(categoriesData);
        setLoading(false);
        // Initialize showFullDescription state for each tutorial
        const initialState = tutorialsData.reduce((acc, tutorial) => {
          acc[tutorial.id] = false;
          return acc;
        }, {});
        setShowFullDescription(initialState);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredTutorials = selectedCategory
    ? tutorials.filter((tutorial) => tutorial.category_id === selectedCategory)
    : tutorials;

  const openTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
  };

  const closeTutorial = () => {
    setSelectedTutorial(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-700 text-lg font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">{error}</div>
      </div>
    );
  }

  // Function to format description with HTML and clickable links
  const formatDescription = (text) => {
    // Replace newlines with <br /> tags
    let formattedText = text.replace(/\n/g, '<br />');
    
    // Wrap URLs in <a> tags if not already wrapped
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formattedText = formattedText.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">${url}</a>`
    );

    return formattedText;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Inline CSS for Smoother Flame Animation */}
      <style>
        {`
          @keyframes flameGlow {
            0% {
              box-shadow: 0 0 8px rgba(255, 107, 0, 0.4), 0 0 16px rgba(255, 147, 0, 0.3), 0 0 24px rgba(255, 0, 0, 0.2);
              transform: scale(1.03);
              opacity: 1;
            }
            25% {
              box-shadow: 0 0 12px rgba(255, 107, 0, 0.6), 0 0 20px rgba(255, 147, 0, 0.4), 0 0 28px rgba(255, 69, 0, 0.3);
              transform: scale(1.04);
              opacity: 0.98;
            }
            50% {
              box-shadow: 0 0 16px rgba(255, 107, 0, 0.7), 0 0 24px rgba(255, 147, 0, 0.5), 0 0 32px rgba(255, 69, 0, 0.4);
              transform: scale(1.05);
              opacity: 0.95;
            }
            75% {
              box-shadow: 0 0 12px rgba(255, 107, 0, 0.6), 0 0 20px rgba(255, 147, 0, 0.4), 0 0 28px rgba(255, 69, 0, 0.3);
              transform: scale(1.04);
              opacity: 0.98;
            }
            100% {
              box-shadow: 0 0 8px rgba(255, 107, 0, 0.4), 0 0 16px rgba(255, 147, 0, 0.3), 0 0 24px rgba(255, 0, 0, 0.2);
              transform: scale(1.03);
              opacity: 1;
            }
          }

          .flame-hover:hover {
            animation: flameGlow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      {/* Sidebar */}
      <aside className="w-72 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors duration-200 ${
                selectedCategory === null
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          My Tutorials
        </h1>
        {filteredTutorials.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No tutorials available in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flame-hover"
              >
                {tutorial.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${tutorial.image}`}
                    alt={tutorial.title}
                    className="w-full h-56 object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {tutorial.title}
                  </h2>
                  <p
                    className="text-gray-600 mb-4 max-h-24 overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(
                        showFullDescription[tutorial.id]
                          ? tutorial.description
                          : `${tutorial.description.slice(0, 100)}...`
                      ),
                    }}
                  />
                  <div className="flex space-x-4">
                    <a
                      href={tutorial.link}
                      className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Read Tutorial
                    </a>
                    <button
                      onClick={() => openTutorial(tutorial)}
                      className="inline-block px-5 py-2 bg-green-200 text-gray-700 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200"
                    >
                      Read Description (Full Page)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Full-Page Description Modal */}
      <AnimatePresence>
        {selectedTutorial && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {selectedTutorial.title}
                </h2>
                <button
                  onClick={closeTutorial}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              {selectedTutorial.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${selectedTutorial.image}`}
                  alt={selectedTutorial.title}
                  className="w-full h-64 object-cover mb-6 rounded-lg"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <p
                className="text-gray-700 mb-6 max-h-64 overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: formatDescription(selectedTutorial.description),
                }}
              />
              <div className="flex space-x-4">
                <a
                  href={selectedTutorial.link}
                  className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Read Tutorial
                </a>
                <button
                  onClick={closeTutorial}
                  className="inline-block px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tutorials;