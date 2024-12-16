declare module 'csstype' {
  interface Properties {
    [key: `--${string}`]: string | number;
  }
}

declare module '@theme-assets/*' {
  const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | string;
  export default SvgIcon;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.webp' {
  const content: string;
  export default content;
}
