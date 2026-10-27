import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export default function ViewToggle({ viewMode = 'grid', onViewChange }) {
  return (
    <div className="dark-view-toggle" role="group" aria-label="طريقة عرض المقالات">
      <button
        type="button"
        onClick={() => onViewChange('grid')}
        className={`view-toggle-action ${viewMode === 'grid' ? 'active' : ''}`}
        aria-pressed={viewMode === 'grid'}
        aria-label="عرض شبكي"
        title="عرض شبكي"
      >
        <LayoutGrid size={18} />
      </button>

      <button
        type="button"
        onClick={() => onViewChange('list')}
        className={`view-toggle-action ${viewMode === 'list' ? 'active' : ''}`}
        aria-pressed={viewMode === 'list'}
        aria-label="عرض قائمة"
        title="عرض قائمة"
      >
        <List size={18} />
      </button>
    </div>
  );
}
