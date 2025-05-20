import { useState, useEffect } from 'react';

function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="container mx-auto p-6 text-gray-800">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4 mr-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full text-left px-2 py-1 hover:bg-gray-300 rounded"
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <button
                onClick={() => setSelectedCategory(category.id)}
                className="w-full text-left px-2 py-1 hover:bg-gray-300 rounded"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Tutorials</h1>
        {filteredTutorials.length === 0 ? (
          <p className="text-gray-600">No tutorials available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {tutorial.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${tutorial.image}`}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <a
                    href={tutorial.link}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Read Tutorial
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Tutorials;