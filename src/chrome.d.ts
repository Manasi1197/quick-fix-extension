
// Type definitions for Chrome extension API
interface Chrome {
  storage: {
    local: {
      get: (keys: string | string[] | object, callback: (items: { [key: string]: any }) => void) => void;
      set: (items: object, callback?: () => void) => void;
    };
  };
  extension?: {
    getURL: (path: string) => string;
  };
}

declare global {
  var chrome: Chrome;
}

export {};
