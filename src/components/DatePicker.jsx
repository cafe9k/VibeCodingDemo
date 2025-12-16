function DatePicker({ 
  label, 
  value, 
  onChange, 
  required = false, 
  placeholder = '', 
  className = '' 
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 font-medium hover:border-gray-300"
          value={value}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
          📅
        </span>
      </div>
    </div>
  )
}

export default DatePicker

