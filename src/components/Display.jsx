
const Display = ({ firstValue, operator, displayValue }) => {
  return (
    <div className="p-6 text-right bg-gradient-to-b from-transparent to-black/20">
      <div className="text-gray-400 text-sm h-6 mb-1 tracking-wider font-medium">
        {firstValue !== null ? `${firstValue} ${operator || ''}` : ''}
      </div>
      <div className="text-white text-3xl font-light tracking-tight truncate">
        {displayValue}
      </div>
    </div>
  );
};

export default Display;