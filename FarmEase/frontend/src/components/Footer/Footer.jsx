import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer id="footer" className="bg-gradient-to-br from-green-800 to-green-900 text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
                {/* Brand Section */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">FarmEase</h2>
                    <p className="text-green-100/90 leading-relaxed">
                        Empowering farmers and connecting them directly to consumers.
                        Fair prices, zero middlemen.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
                    <ul className="space-y-3">
                        <li 
                            className="cursor-pointer hover:text-green-300 transition-colors duration-200 flex items-center gap-2" 
                            onClick={() => {
                                navigate('/aboutus');
                                document.querySelector('#header')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                            About Us
                        </li>
                        <li 
                            className="cursor-pointer hover:text-green-300 transition-colors duration-200 flex items-center gap-2" 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                            Categories
                        </li>
                        <li 
                            className="cursor-pointer hover:text-green-300 transition-colors duration-200 flex items-center gap-2" 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.querySelector('#communities')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                            Communities
                        </li>
                        <li 
                            className="cursor-pointer hover:text-green-300 transition-colors duration-200 flex items-center gap-2" 
                            onClick={() => {
                                navigate(`/showproducts?search=&category=All&region=All`);
                                setTimeout(() => {
                                    document.querySelector('#header')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                            Products
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <div className="space-y-4">
                        <p className="flex items-start gap-3 text-green-100/90">
                            <span className="text-lg">📍</span>
                            <span>FarmEase HQ, Rural India</span>
                        </p>
                        <p className="flex items-start gap-3 text-green-100/90">
                            <span className="text-lg">📞</span>
                            <span>+91-6355121720</span>
                        </p>
                        <p className="flex items-start gap-3 text-green-100/90">
                            <span className="text-lg">📧</span>
                            <span>farmease.business@gmail.com</span>
                        </p>
                    </div>

                    {/* Social Media Links */}
                    <div className="pt-4">
                        <p className="text-sm font-medium mb-4">Follow us on social media</p>
                        <div className="flex gap-6">
                            <a 
                                href="#" 
                                className="hover:text-green-300 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a 
                                href="#" 
                                className="hover:text-green-300 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a 
                                href="#" 
                                className="hover:text-green-300 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            
        </footer>
    );
};

export default Footer;
