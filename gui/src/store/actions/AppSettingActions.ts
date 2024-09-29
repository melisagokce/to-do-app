import IAppSettingsProps from "../../models/IAppSettingsProps";
import store from "../store";

class AppSettingActions {
  static getViewMode(): IAppSettingsProps {
    return (store.getState()).appSettingsReducer;
  }

  static changeMode(darkMode: boolean) {
    store.dispatch({ type: 'APPSETTINGS_REDUCER/CHANGE_VIEW_MODE', payload: {darkMode} });
  }

}

export default AppSettingActions;