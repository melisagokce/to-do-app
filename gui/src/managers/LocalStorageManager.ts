class LocalStorageManager {
    private static languageKey = 'language';
    private static darkModeKey = 'darkmode';
  
    static setLanguage(language: string): void {
      localStorage.setItem(LocalStorageManager.languageKey, language.toLowerCase());
    }
  
    static getLanguage(): string | null {
      return localStorage.getItem(LocalStorageManager.languageKey);
    }
  
    static setDarkMode(isDarkMode: boolean): void {
      localStorage.setItem(LocalStorageManager.darkModeKey, JSON.stringify(isDarkMode));
    }
  
    static getDarkMode(): boolean {
      const darkMode = localStorage.getItem(LocalStorageManager.darkModeKey);
      return darkMode ? JSON.parse(darkMode) : false;
    }
    
    static clearSettings(): void {
      localStorage.removeItem(LocalStorageManager.languageKey);
      localStorage.removeItem(LocalStorageManager.darkModeKey);
    }
  }

  export default LocalStorageManager;
  