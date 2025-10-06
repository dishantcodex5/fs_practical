import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-green-100 py-16 px-4 md:px-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-repeat opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-6"
          >
            About FarmEase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Our platform connects farmers directly with consumers, ensuring fresh
            and high-quality products reach your doorstep. By eliminating
            middlemen, we empower farmers with fair pricing and provide customers
            with farm-to-table goodness.
          </motion.p>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mx-auto mb-20 max-w-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Sustainable Farming"
            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">For Farmers</h3>
            <p className="text-gray-600 leading-relaxed">
              List your products easily, reach more customers, and get fair prices for your produce. 
              Our platform empowers you to grow your farming business sustainably.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">For Consumers</h3>
            <p className="text-gray-600 leading-relaxed">
              Access fresh, locally sourced products directly from farmers. 
              Support sustainable agriculture while enjoying the best quality produce.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;