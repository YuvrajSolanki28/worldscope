import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export function NotFound() {
  return (
    <div className="page-fade-in page-container py-12">
      <EmptyState icon={<Compass className="h-6 w-6" />} title="Page not found" message="The page you're looking for doesn't exist.">
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </EmptyState>
    </div>);

}