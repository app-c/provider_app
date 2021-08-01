/* eslint-disable @typescript-eslint/no-empty-interface */
import "styled-components";
import themes from "./themes";

declare module "styled-components" {
   type ThemeType = typeof themes;

   export interface DefautlTheme extends ThemeType {}
}
