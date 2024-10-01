import i18n from "../../localization/i18n";
import IAppSettingsProps from "../../models/IAppSettingsProps";
import store from "../store";

class AppSettingActions {
  static getViewMode(): IAppSettingsProps {
    return (store.getState()).appSettingsReducer;
  }

  static changeMode(darkMode: boolean) {
    store.dispatch({ type: 'APPSETTINGS_REDUCER/CHANGE_VIEW_MODE', payload: {darkMode} });
  }

  static changeLanguage(language: string) {
    i18n.changeLanguage(language);
    store.dispatch({ type: 'APPSETTINGS_REDUCER/CHANGE_LANGUAGE', payload: {language} });
  }

}

export default AppSettingActions;