import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaDiscord,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaSkype,
  FaReddit,
} from 'react-icons/fa';

function Contact() {
  const [contactMethods, setContactMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContactMethods = async () => {
    try {
      const response = await axios.get('/api/contact-methods');
      console.log('Fetched contact methods:', response.data);
      setContactMethods(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching contact methods:', error.response ? error.response.data : error.message);
      setError('Failed to load contact methods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMethods();
  }, []);

  // Map icon names to React Icons components with colors
  const iconMap = {
    'fa-phone': <FaPhone className="text-green-500 text-2xl" />,
    'fa-envelope': <FaEnvelope className="text-blue-500 text-2xl" />,
    'fa-twitter': <FaTwitter className="text-blue-400 text-2xl" />,
    'fa-facebook': <FaFacebook className="text-blue-600 text-2xl" />,
    'fa-instagram': <FaInstagram className="text-pink-500 text-2xl" />,
    'fa-whatsapp': <FaWhatsapp className="text-green-500 text-2xl" />,
    'fa-telegram': <FaTelegram className="text-blue-500 text-2xl" />,
    'fa-linkedin': <FaLinkedin className="text-blue-700 text-2xl" />,
    'fa-github': <FaGithub className="text-gray-800 text-2xl" />,
    'fa-youtube': <FaYoutube className="text-red-600 text-2xl" />,
    'fa-discord': <FaDiscord className="text-purple-600 text-2xl" />,
    'fa-tiktok': <FaTiktok className="text-black text-2xl" />,
    'fa-snapchat': <FaSnapchat className="text-yellow-400 text-2xl" />,
    'fa-pinterest': <FaPinterest className="text-red-700 text-2xl" />,
    'fa-skype': <FaSkype className="text-blue-400 text-2xl" />,
    'fa-reddit': <FaReddit className="text-orange-600 text-2xl" />,
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      rotate: 1,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Animation variants for icons
  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        repeat: 1,
      },
    },
  };

  // Animation variants for background
  const backgroundVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 15,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      style={{
        background: 'linear-gradient(45deg, #e0f7ff, #f0f4f8, #d1e9ff, #f0f4f8)',
        backgroundSize: '200% 200%',
      }}
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="text-lg text-gray-600"
          >
            Reach out to us using the methods below!
          </motion.p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
              role="alert"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Methods */}
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </motion.div>
          ) : contactMethods.length > 0 ? (
            <motion.div
              className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.id}
                  href={method.url}
                  target={method.type === 'social' ? '_blank' : '_self'}
                  rel={method.type === 'social' ? 'noopener noreferrer' : ''}
                  className="group block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon with Circular Background */}
                    <motion.div
                      className="flex-shrink-0 bg-gray-100 rounded-full p-3 group-hover:bg-gray-200 transition-colors duration-300"
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {method.icon && iconMap[method.icon] ? iconMap[method.icon] : null}
                    </motion.div>
                    {/* Title and Type */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500">{method.type.charAt(0).toUpperCase() + method.type.slice(1)}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded text-center"
            >
              <p>No contact methods available.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Contact;