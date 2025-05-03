import { cn } from '@/lib/utils';
import React from 'react';

const ProfileDetailsCard = ({ title, children, className }) => {
  return (
    <div className={cn('bg-white rounded-lg p-4 sm:p-5 shadow-sm', className)}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};


import PropTypes from 'prop-types';

export const DataField = ({ icon, label, value, className }) => {
  // Create a cloned icon with white stroke color if an icon is provided
  const iconWithWhiteStroke = icon ? React.cloneElement(icon, { 
    stroke: 'white',  // Make the outline white
    className: cn(icon.props.className, 'w-5 h-5')
  }) : null;

  return (
    <div className={cn('flex items-start gap-2 sm:gap-3', className)}>
      {icon && <div className="bg-primary-1 text-white p-1.5 rounded-md flex-shrink-0">{iconWithWhiteStroke}</div>}
      <div className="flex flex-col min-w-0">
        {label && <span className="text-base font-medium">{label}</span>}
        <div className="text-sm text-gray-500 break-words">{value}</div>
      </div>
    </div>
  );
}


DataField.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};


ProfileDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ProfileDetailsCard;