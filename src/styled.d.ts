import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    rootSize: number,
    colors: {
      main: string;
      secondary: string;
      link: {
        main: string,
        secondary?: string,
      },
      text: {
        main: string,
      }
    }
  }
}