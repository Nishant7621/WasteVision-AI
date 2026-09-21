import React from 'react';
import { getCategoryColor, getRiskColor, getRiskLabel } from '../../utils/helpers';
import type { WasteCategory, RiskLevel } from '../../types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'category' | 'risk';
  category?: WasteCategory;
  risk?: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'default', 
    category, 
    risk, 
    size = 'md', 
    dot = false,
    className = '', 
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-slate-700',
      success: 'bg-forest-100 text-forest-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      category: category ? `bg-[${getCategoryColor(category)}]/10 text-[${getCategoryColor(category)}] border-[${getCategoryColor(category)}]/20` : 'bg-slate-100 text-slate-700',
      risk: risk ? `bg-[${getRiskColor(risk)}]/10 text-[${getRiskColor(risk)}] border-[${getRiskColor(risk)}]/20` : 'bg-slate-100 text-slate-700'
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm'
    };

    const baseStyle = 'inline-flex items-center gap-1 font-medium rounded-full border';

    return (
      <span
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {dot && (
          <span 
            className="w-1.5 h-1.5 rounded-full" 
            style={{ 
              backgroundColor: category ? getCategoryColor(category) : risk ? getRiskColor(risk) : 'currentColor' 
            }}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export const RiskBadge = ({ risk, size = 'md', showLabel = true }: { risk: RiskLevel; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean }) => (
  <Badge variant="risk" risk={risk} size={size} dot>
    {showLabel && getRiskLabel(risk)}
  </Badge>
);

export const CategoryBadge = ({ category, size = 'md', showLabel = true }: { category: WasteCategory; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean }) => (
  <Badge variant="category" category={category} size={size} dot>
    {showLabel && category}
  </Badge>
);