import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StatCard= ({ key, icon, iconBg, count, title, bgColor , redirect }) => {
  return (
    <Link key={key} to={redirect} >
    <div className={cn('rounded-lg p-6 cursor-pointer', bgColor)}>
      <div className="flex flex-col space-y-3">
        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', iconBg)}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
    </Link>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  iconBg: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default StatCard;