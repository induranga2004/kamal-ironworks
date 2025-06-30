import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BlogPostCard = ({ 
  id, 
  slug,
  title, 
  excerpt, 
  coverImage, 
  date, 
  author,
  categories = [] 
}) => {
  const { t, i18n } = useTranslation();
  const formattedDate = formatDistance(
    new Date(date),
    new Date(),
    { addSuffix: true }
  );

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Blog Post Image */}
      <Link to={`/blog/${slug || id}`} className="h-56 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/blog/category/${category}`}
                className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-200"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3">
          <Link to={`/blog/${slug || id}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
        
        {/* Date and Author */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          {author && (
            <div className="flex items-center">
              {author.avatar && (
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="h-6 w-6 rounded-full mr-2" 
                />
              )}
              <span className="text-sm text-gray-700">{author.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Grid of blog posts
export const BlogPostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
};

export default BlogPostCard;
