import AppRouter from "src/router";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const App = () => {
  return (
    <>
      <Provider store={store().store}>
        <PersistGate loading={"Loading"} persistor={store().persistor}>
          <ToastContainer
            autoClose={1500}
            hideProgressBar={true}
            position={'top-center'}
          />
          <AppRouter />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
