import classNames from 'classnames';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import styles from './logo.module.scss';

export const Logo = () => {
  const ref = useRef<SVGSVGElement>(null)

  const [animationEnd, setAnimationEnd] = useState(false)

  const handleAnimationEnd = debounce(() => {
    setAnimationEnd(true)
  }, 100, {
    leading: false,
    trailing: true,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: 无需依赖
  useEffect(() => {
    ref.current?.querySelectorAll('rect, path').forEach((item, index, array) => {
      const el = item as SVGGeometryElement
      const len = Math.ceil(el.getTotalLength());
      el.style.setProperty('--len', len.toString())
      el.style.setProperty('--index', index.toString())
    })
    ref.current?.addEventListener('animationend', handleAnimationEnd)
    return () => {
      ref.current?.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [])

  return (
    <div className={classNames(styles.logo, {
      [styles.animationEnd]: animationEnd,
    })}>
      <img src={require('./kit-module.svg')} alt="" draggable={false} />
      <svg ref={ref} className={styles.line} viewBox="0 0 1024 1024">
        <title>lines</title>
        <rect width="900" height="900" x="62" y="62" fill="none" fillRule="evenodd" strokeWidth="12.427" rx="180.8" />
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.364">
          <path
            d="M423.182 583.845c63.262 0 114.545-51.265 114.545-114.505 0-63.24-51.283-114.506-114.545-114.506S308.636 406.1 308.636 469.34s51.284 114.505 114.546 114.505Z" />
          <path
            d="M588.455 582.755c63.562 0 115.09-51.51 115.09-115.051 0-63.54-51.528-115.05-115.09-115.05-63.563 0-115.091 51.51-115.091 115.05s51.528 115.05 115.09 115.05Z" />
          <path
            d="M727.545 590.389c56.032 0 101.455-45.407 101.455-101.42 0-56.012-45.423-101.419-101.455-101.419-56.031 0-101.454 45.407-101.454 101.42 0 56.012 45.423 101.419 101.454 101.419ZM508.818 923c63.563 0 115.091-51.51 115.091-115.05 0-63.542-51.528-115.052-115.09-115.052-63.564 0-115.092 51.51-115.092 115.051C393.727 871.49 445.255 923 508.818 923Z" />
          <path
            d="M600.455 445.348c56.935 0 103.09-46.14 103.09-103.055 0-56.916-46.155-103.055-103.09-103.055-56.936 0-103.091 46.14-103.091 103.055 0 56.916 46.155 103.055 103.09 103.055Z" />
          <path
            d="M502.818 373.373c30.125 0 54.546-24.412 54.546-54.526 0-30.114-24.421-54.527-54.546-54.527-30.124 0-54.545 24.413-54.545 54.527s24.42 54.526 54.545 54.526Z" />
          <path
            d="M490.273 346.11c56.935 0 103.09-46.14 103.09-103.055 0-56.916-46.155-103.055-103.09-103.055-56.936 0-103.091 46.14-103.091 103.055 0 56.916 46.155 103.055 103.09 103.055Z" />
          <path d="M305.364 239.238h385.09v470.018h-385.09Z" />
          <path
            d="M458.09 756.149c133.152 0 241.092-107.902 241.092-241.007 0-133.104-107.94-241.007-241.091-241.007C324.94 274.135 217 382.038 217 515.142c0 133.105 107.94 241.007 241.09 241.007Z" />
          <path
            d="M565 756.149c142.79 0 258.545-115.714 258.545-258.455 0-142.741-115.754-258.456-258.545-258.456-142.79 0-258.545 115.715-258.545 258.456 0 142.74 115.754 258.455 258.545 258.455Z" />
          <path
            d="M433 709.256c29.522 0 53.455-23.924 53.455-53.436S462.522 602.384 433 602.384s-53.455 23.924-53.455 53.436 23.933 53.436 53.455 53.436ZM583 709.256c27.413 0 49.636-22.215 49.636-49.619S610.413 610.018 583 610.018c-27.413 0-49.636 22.215-49.636 49.62 0 27.403 22.223 49.618 49.636 49.618Z" />
        </g>
      </svg>
      <picture>
        <source srcSet={require('./entity.webp')} type="image/webp" />
        <img className={styles.entity} src={require('./entity.png')} alt="" draggable={false} />
      </picture>
    </div>
  );
};