import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    rootSize: number,
    colors: {
      main: string;
      secondary: string;
    };
  }
}