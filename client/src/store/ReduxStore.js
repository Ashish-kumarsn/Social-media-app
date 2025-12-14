import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

// 🔒 Persist ONLY auth state
function saveToLocalStorage(state) {
  try {
    const authState = {
      authReducer: {
        authData: state.authReducer.authData,
      },
    };
    window.localStorage.setItem("store", JSON.stringify(authState));
  } catch (e) {
    console.error(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (!serializedStore) return undefined;

    const parsed = JSON.parse(serializedStore);

    // 🔒 validate shape
    if (!parsed?.authReducer?.authData) {
      return undefined;
    }

    return parsed;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
