import React, { useState } from 'react';

const PostDesc = ({ text = '' }) => { // Default text to an empty string
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure text is a string and check its length
  const isLongText = typeof text === 'string' && text.length > 90;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="mb-2">
        {isLongText && !isExpanded ? `${text.slice(0, 90)}...` : text}
        {isLongText && (
          <button
            onClick={handleToggle}
            className="text-blue-500 ml-2"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </p>
    </div>
  );
};

export default PostDesc;
