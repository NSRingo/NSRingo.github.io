declare namespace React {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}
