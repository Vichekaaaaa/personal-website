import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <nav className="bg-gray-100 text-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center hover:text-blue-400">
          <img
            src="/logo.png"
            alt="NY Vicheka Logo"
            className="h-8 w-8"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/32')}
          />
          <span className="text-2xl font-bold hidden sm:inline ml-2">NY VICHEKA</span>
        </NavLink>
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-16 left-0 right-0 bg-gray-100 text-gray-800 p-4 md:hidden"
            >
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
                { to: '/tutorials', label: 'Tutorials' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded text-sm font-medium ${
                        isActive ? 'text-blue-400 bg-blue-200/20' : 'hover:text-blue-400 hover:bg-blue-200/10'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <ul className="hidden md:flex space-x-6">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/projects', label: 'Projects' },
            { to: '/tutorials', label: 'Tutorials' },
            { to: '/contact', label: 'Contact' },
          ].map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `py-2 px-3 rounded text-sm font-medium ${isActive ? 'text-blue-400' : 'hover:text-blue-400'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;