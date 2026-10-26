import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to="/" className="breadcrumbs-link">Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="breadcrumbs-separator" aria-hidden="true">
                <ChevronRight size={12} />
              </li>
              <li className="breadcrumbs-item">
                {isLast || !item.path ? (
                  <span className="breadcrumbs-current" aria-current="page">{item.label}</span>
                ) : (
                  <Link to={item.path} className="breadcrumbs-link">{item.label}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
