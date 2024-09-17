
import React from 'react';

const NewsCard = ({ article }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {article.title}
                </h2>
                <p className="text-gray-600 mt-2">
                    {article.description.length > 100 
                        ? article.description.slice(0, 100) + '...' 
                        : article.description
                    }
                </p>
                <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 mt-4 block font-medium hover:underline"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default NewsCard;
