import { cn } from '@/lib/utils';



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
  return (
    <div className={cn('flex items-start gap-2 sm:gap-3', className)}>
      {icon && <div className="text-primary-1 mt-1 flex-shrink-0">{icon}</div>}
      <div className="flex flex-col min-w-0">
        {label && <span className="text-sm text-gray-500">{label}</span>}
        <div className="font-medium break-words">{value}</div>
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