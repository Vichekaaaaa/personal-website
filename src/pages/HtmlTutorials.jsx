import { useOutletContext } from 'react-router-dom'

function HtmlTutorials() {
  const { tutorials, loading } = useOutletContext()
  const filteredTutorials = tutorials.filter(tutorial => tutorial.category === 'html')

  if (loading) return <div className="text-center text-lg">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">HTML TUTORIALS</h1>
      <p className="text-gray-600 mb-6">Download Video Related Source Code & Notes</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map(tutorial => (
            <div key={tutorial.id} className="border rounded-lg shadow-md overflow-hidden">
              <img
                src={tutorial.image || 'https://via.placeholder.com/300x150?text=HTML+Tutorial'}
                alt={tutorial.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{tutorial.title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">{tutorial.description}</p>
                <p className="text-gray-500 text-xs">{new Date(tutorial.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No HTML tutorials available.</p>
        )}
      </div>
    </div>
  )
}

export default HtmlTutorials