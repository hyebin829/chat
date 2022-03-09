import Header from "./components/header";
import Main from "./components/main";

import { CssBaseline, ThemeProvider } from "@mui/material";
import CustomMuiTheme from "./styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={CustomMuiTheme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
