declare module "*.svg" {
  import React = require("react");
  export const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
