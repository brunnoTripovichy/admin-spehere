const Heading2 = ({ children, className }) => {
    return (<h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold tracking-normal 
            leading-snug sm:leading-tight text-gray-900 dark:text-gray-200 
            mb-3 sm:mb-4 lg:mb-5 ${className}`}>
      {children}
    </h2>);
};
export default Heading2;
