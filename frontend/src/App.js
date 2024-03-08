import ThemeProvider from './theme'
import Router from './router'

// console.log = function () { }

// const interCeptor = () => {
//   server.interceptors.request.use((config) => {
//     const token = authHeader();
//     config.headers.Authorization = token;
//     return config;
//   }, null, { synchronous: true });
// }

const App = () => {
  // interCeptor()
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App;
