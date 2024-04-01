declare global {
  interface Window {
    electron: {
      viz: {
        showOpenWindow: () => Promise<any>;
      },
      tutorial: {
        showtTutorialWindow: () => Promise<any>;
      }
    };
  }
}
