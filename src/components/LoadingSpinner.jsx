function LoadingSpinner({ size = 'md', text = '加载中...' }) {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-ctrip-bg">
      <span className={`loading loading-spinner text-ctrip-blue ${sizeClasses[size]}`}></span>
      {text && <p className="mt-4 text-base text-ctrip-gray">{text}</p>}
    </div>
  )
}

export default LoadingSpinner

