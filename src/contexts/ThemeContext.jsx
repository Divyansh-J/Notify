// import React, { createContext, useState, useContext, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
//       setIsDarkMode(true);
//       document.documentElement.classList.add('dark');
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newIsDarkMode = !isDarkMode;
//     setIsDarkMode(newIsDarkMode);
//     localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    
//     if (newIsDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
