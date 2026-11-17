import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryCard({ category, onSelectCategory }) {
  const navigate = useNavigate();

  if (!category) return null;

  const handleClick = () => {
    if (onSelectCategory) {
      onSelectCategory(category.name);
    } else {
      navigate(`/events?category=${encodeURIComponent(category.name)}`);
    }
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Explore ${category.name} events`}
    >
      <div className="category-card-thumb">
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>

      <h3 className="category-card-title">{category.name}</h3>
      <p className="category-card-desc">{category.description}</p>

      <div className="category-card-count">
        <span>{category.count} Upcoming Events</span>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default CategoryCard;
