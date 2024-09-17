

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import Pagination from './components/Pagination';
import './App.css';

function App() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('us');
    const [language, setLanguage] = useState('en');

    // Fetch news articles
    const fetchNews = async (page, query = '', selectedCategory = '', selectedCountry = 'us', selectedLanguage = 'en') => {
        try {
            const response = await axios.get(`https://gnews.io/api/v4/search?q=india&lang=en&country=us&max=10&apikey=cc700c5b2876b21533a312178959d73b`, {
                params: {
                    q: query || 'latest',
                    page: page,
                    category: selectedCategory,
                    country: selectedCountry,
                    language: selectedLanguage,
                    max: 10,
                    apiKey: 'cc700c5b2876b21533a312178959d73b',
                },
            });
            setArticles(response.data.articles);
            setTotalPages(Math.ceil(response.data.totalResults / 10));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchNews(1, searchQuery, category, country, language);
    };

    useEffect(() => {
        fetchNews(currentPage, searchQuery, category, country, language);
    }, [currentPage, searchQuery, category, country, language]);

    return (
        <div className="App">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-6">News App</h1>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="mb-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search news..."
                        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button type="submit" className="w-full md:w-auto bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                        Search
                    </button>
                </form>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                    >
                        <option value="">All Categories</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="sports">Sports</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                    </select>

                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                    >
                        <option value="us">United States</option>
                        <option value="gb">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="in">India</option>
                    </select>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                </div>

                {/* Display news articles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))
                    ) : (
                        <p className="text-center col-span-full">No news articles found</p>
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
                </div>
            </div>
        </div>
    );
}

export default App;

