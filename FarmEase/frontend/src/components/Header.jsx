import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/loginSlice";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const cartCount = useSelector((state) => state.login.cartCount);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Debug logs
    console.log("Header - Current cart count:", cartCount);
    console.log("Header - User state:", user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="FarmEase Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold text-green-800">FarmEase</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-green-800 transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-600 hover:text-green-800 transition-colors">
                            Products
                        </Link>
                        {user?.isFarmer && (
                            <Link to="/create-product" className="text-gray-600 hover:text-green-800 transition-colors">
                                Sell
                            </Link>
                        )}
                    </nav>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/cart" className="relative">
                                    <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-green-800 transition-colors" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors">
                                        <User className="w-6 h-6" />
                                        <span>{user.username}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-green-800 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <nav className="flex flex-col gap-4">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-green-800 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-600 hover:text-green-800 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            {user?.isFarmer && (
                                <Link
                                    to="/create-product"
                                    className="text-gray-600 hover:text-green-800 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sell
                                </Link>
                            )}
                        </nav>
                        <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                            {user ? (
                                <>
                                    <Link
                                        to="/cart"
                                        className="flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <ShoppingCart className="w-6 h-6" />
                                        <span>Cart</span>
                                        {cartCount > 0 && (
                                            <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-gray-600 hover:text-green-800 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 