import { useEffect, useState } from 'react'
import CommunityBox from '../utils/CommunityBox'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Community = () => {
    const communities = [
        { id: 1, name: 'Yantra Mitra', desc: 'Learn about modern farming tools.', icon: '🚜' },
        { id: 2, name: 'Annadata Ki Kahani', desc: 'Stories of inspiring farmers.', icon: '📖' },
        { id: 3, name: 'Hariyali Samvad', desc: 'Discussions on sustainable farming.', icon: '🌱' },
        { id: 4, name: 'Shiksha Aur Kheti', desc: 'Education and farming insights.', icon: '📚' },
        { id: 5, name: 'Bazaar', desc: 'Marketplace updates and resources.', icon: '🏪' },
        { id: 6, name: 'Videsh Bazaar', desc: 'Export opportunities for farmers.', icon: '🌍' },
        { id: 7, name: 'Jaivik Mandi', desc: 'Connect to organic produce markets.', icon: '🥬' },
        { id: 8, name: 'Kheti Salah', desc: 'Expert agricultural advice and solutions.', icon: '👨‍🌾' }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <section id="communities" className="py-16 bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Join Our Communities
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Connect with farmers, experts, and agricultural enthusiasts in our diverse communities
                    </p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {communities.map((community) => (
                        <motion.div
                            key={community.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link to={`chatbox${community.id}`} className="block">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl 
                                            transition-all duration-300 border border-green-100">
                                    <div className="text-4xl mb-4">{community.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {community.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {community.desc}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Community