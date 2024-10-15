import { Provider } from "react-redux";
import Layout from "./presentation/layout/MainLayout";
import { store } from "./data/local/redux/store";
import { BrowserRouter } from "react-router-dom";
import history from "./routes/history";
import Routes from "./routes";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            display : "flex",
            flexDirection : 'column',
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2000}
          auto
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <BrowserRouter history={history}>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
