import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { useMediaQuery } from "@mui/material";
import '@fortawesome/fontawesome-free/css/all.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);


const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: !prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  console.log(theme)
  return (
    <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
  )
}

root.render(<Root />);
console.log('LETS REGISTER')
serviceWorkerRegistration.register({onSuccess(registration) {
  console.log('serviceWorkerRegistration onSuccess',registration)
},
onUpdate(registration) {
  console.log('serviceWorkerRegistration onUpdate',registration)
},});
