import Community from './Community.jsx'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel.jsx'
import { motion } from 'framer-motion' // Add this import

function Home() {
    const navigate = useNavigate()
    const categories = ['All', 'Fruits', 'Vegetables', 'Dairy Products', 'Farm Core', 'Dryfruits']

    const clickHandler = (e) => {
        navigate(`/showproducts?search=${encodeURIComponent('')}&category=${encodeURIComponent(`${e.target.innerHTML}`)}&region=${encodeURIComponent('All')}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Carousel />

            {/* Categories Section */}
            <section id="categories" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Browse by Categories
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {categories.map((category, index) => (
                            <motion.button
                                key={index}
                                onClick={clickHandler}
                                className="relative group bg-white text-green-700 py-3 px-6 rounded-xl
                                         border-2 border-green-100 shadow-lg hover:shadow-xl
                                         transition-all duration-300 hover:-translate-y-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 font-medium">{category}</span>
                                <div className="absolute inset-0 bg-green-600 rounded-xl origin-left 
                                              scale-x-0 group-hover:scale-x-100 transition-transform 
                                              duration-300 ease-out -z-0" />
                                <span className="absolute inset-0 rounded-xl bg-gradient-to-r 
                                               from-green-500 to-green-600 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 -z-1" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Communities Section */}
            <Community />

            {/* Reviews Section */}
            <section id="reviews" className="py-16 bg-gradient-to-b from-white to-green-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        What Our Community Says
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                text: "FarmEase has revolutionized the way we sell our crops. No middlemen, better profits!",
                                author: "Ramesh Kumar",
                                role: "Farmer"
                            },
                            {
                                text: "As a consumer, I feel more connected to farmers and get fresh produce directly.",
                                author: "Priya Sharma",
                                role: "Consumer"
                            },
                            {
                                text: "This platform is bridging the gap between farmers and urban markets seamlessly.",
                                author: "Ankit Verma",
                                role: "Entrepreneur"
                            },
                            {
                                text: "Finally, a platform that values the hard work of farmers. Kudos to the team!",
                                author: "Sunita Devi",
                                role: "Farmer"
                            },
                            {
                                text: "FarmEase provides transparency and trust in every transaction.",
                                author: "Ravi Patel",
                                role: "Retailer"
                            },
                            {
                                text: "The ease of use and direct connection with farmers is unparalleled.",
                                author: "Neha Kapoor",
                                role: "Consumer"
                            }
                        ].map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl 
                                         transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start mb-4">
                                    <svg className="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                                    </svg>
                                    <p className="text-gray-600 italic">{review.text}</p>
                                </div>
                                <div className="flex justify-end items-center border-t border-gray-100 pt-4">
                                    <div className="text-right">
                                        <h3 className="font-semibold text-gray-800">{review.author}</h3>
                                        <p className="text-sm text-green-600">{review.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
