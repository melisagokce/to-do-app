import { combineReducers, legacy_createStore as createStore } from "redux";
import taskReducer from "./reducers/taskReducer";
import appSettingsReducer from "./reducers/appSettingsReducer";
import ITaskProps from "../models/ITaskProps";
import IAppSettingsProps from "../models/IAppSettingsProps";

const reducers = combineReducers({
  taskReducer: taskReducer,
  appSettingsReducer: appSettingsReducer
});

export type RootState = {
  taskReducer: ITaskProps;
  appSettingsReducer: IAppSettingsProps;
};

const store = createStore(reducers);

export default store;
