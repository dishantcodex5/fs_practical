import ProductBox from './ProductBox'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader2, Filter } from 'lucide-react'

const ShowProducts = () => {
    const categories = ['All', 'Fruits', 'Vegetables', 'Dairy Products', 'Farm Core', 'Dryfruits']
    const [searchParams, setSearchParams] = useSearchParams();
    const [searched, setSearched] = useState(searchParams.get('search'))
    const [category, setCategory] = useState(searchParams.get('category'))
    const [region, setRegion] = useState(searchParams.get('region'))
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setSearched(searchParams.get('search'))
        setCategory(searchParams.get('category'))
        setRegion(searchParams.get('region'))
    }, [searchParams])

    const onCatClick = (e) => {
        let cat = e.target.innerHTML
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('category', cat);
            newParams.delete('search'); 
            return newParams;
        });
    }

    useEffect(() => {
        setLoading(true)
        if (searched){
            axios.post(`${import.meta.env.VITE_BACKEND_API}/product/search`, {search: searched}, {
                withCredentials: true
            })
            .then((res) => {
                if (res.status < 400){
                    setProducts(res.data)
                }
                else{
                    console.log('bad request while searching product')
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }
        else{
            axios.post(`${import.meta.env.VITE_BACKEND_API}/product/filter`, {category, region}, {
                withCredentials: true
            })
            .then((res) => {
                if (res.status < 400){
                    setProducts(res.data)
                }
                else{
                    console.log('bad request while searching product')
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }
    }, [searched, category, region])

    const handleProductDelete = (deletedProductId) => {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== deletedProductId));
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 to-green-100">
            {/* Loading Overlay */}
            {loading && (
                <>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                            <p className="text-gray-700 font-medium">Loading products...</p>
                        </div>
                    </div>
                </>
            )}

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Our Products</h1>
                    <p className="text-gray-600">Fresh from the farm to your table</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar Filter */}
                    <div className="lg:w-64 lg:shrink-0">
                        <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg lg:sticky lg:top-24">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-green-700" />
                                <h2 className="text-xl font-semibold text-green-800">Categories</h2>
                            </div>
                            <div className="flex flex-wrap lg:flex-col gap-2">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={onCatClick}
                                        className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium
                                            ${category === cat 
                                                ? 'bg-green-100 text-green-700'
                                                : 'hover:bg-green-50 text-gray-600'
                                            } ${index === 0 ? 'lg:w-full' : 'lg:w-full'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr">
                                {products.map((product) => (
                                    <ProductBox 
                                        key={product._id}
                                        product={product}
                                        onDelete={handleProductDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                                    <p className="text-gray-600">
                                        {searched 
                                            ? `No products match your search "${searched}"`
                                            : "No products available in this category yet"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducts;