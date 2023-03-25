import React from 'react';

export const LoadMoreBtn = ({ loadMore, isSubmitting }) => {
  return (
    <button
      type="button"
      className="Button"
      disabled={isSubmitting}
      onClick={loadMore}
    >
      Load More
    </button>
  );
};
