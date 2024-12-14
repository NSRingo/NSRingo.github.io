import classNames from 'classnames';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import styles from './logo.module.scss';

export const Logo = () => {
  const ref = useRef<SVGSVGElement>(null)

  const [animationEnd, setAnimationEnd] = useState(false)

  const handleAnimationEnd = debounce(() => {
    setAnimationEnd(true)
  }, 300, {
    leading: false,
    trailing: true,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: 无需依赖
  useEffect(() => {
    ref.current?.querySelectorAll('rect, path').forEach((item, index, array) => {
      const el = item as SVGGeometryElement
      const len = Math.ceil(el.getTotalLength());
      el.style.setProperty('--len', len.toString())
      let delay = `${index * 0.1}s`
      if (index === array.length - 1) {
        delay = `${index * 0.1 + 0.2}s`
      }
      el.style.setProperty('--delay', delay)
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
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.364" transform="translate(217, 140)">
          <path d="M88.3636364,99.2381616 L473.454545,99.2381616 L473.454545,569.256267 L88.3636364,569.256267 Z" />
          <path d="M241.090909,616.149025 C374.241741,616.149025 482.181818,508.246532 482.181818,375.142061 C482.181818,242.037591 374.241741,134.135097 241.090909,134.135097 C107.940077,134.135097 0,242.037591 0,375.142061 C0,508.246532 107.940077,616.149025 241.090909,616.149025 Z" />
          <path d="M348,616.149025 C490.790712,616.149025 606.545455,500.434587 606.545455,357.693593 C606.545455,214.9526 490.790712,99.2381616 348,99.2381616 C205.209288,99.2381616 89.4545455,214.9526 89.4545455,357.693593 C89.4545455,500.434587 205.209288,616.149025 348,616.149025 Z" />
          <path d="M291.818182,783 C355.381136,783 406.909091,731.489986 406.909091,667.949164 C406.909091,604.408342 355.381136,552.898329 291.818182,552.898329 C228.255228,552.898329 176.727273,604.408342 176.727273,667.949164 C176.727273,731.489986 228.255228,783 291.818182,783 Z" />
          <path d="M273.272727,206.110028 C330.208264,206.110028 376.363636,159.970727 376.363636,103.055014 C376.363636,46.1393013 330.208264,0 273.272727,0 C216.33719,0 170.181818,46.1393013 170.181818,103.055014 C170.181818,159.970727 216.33719,206.110028 273.272727,206.110028 Z" />
          <path d="M206.181818,443.845404 C269.443526,443.845404 320.727273,392.579514 320.727273,329.339833 C320.727273,266.100152 269.443526,214.834262 206.181818,214.834262 C142.92011,214.834262 91.6363636,266.100152 91.6363636,329.339833 C91.6363636,392.579514 142.92011,443.845404 206.181818,443.845404 Z" />
          <path d="M371.454545,442.754875 C435.017499,442.754875 486.545455,391.244861 486.545455,327.704039 C486.545455,264.163217 435.017499,212.653203 371.454545,212.653203 C307.891592,212.653203 256.363636,264.163217 256.363636,327.704039 C256.363636,391.244861 307.891592,442.754875 371.454545,442.754875 Z" />
          <path d="M383.454545,305.348189 C440.390082,305.348189 486.545455,259.208888 486.545455,202.293175 C486.545455,145.377463 440.390082,99.2381616 383.454545,99.2381616 C326.519009,99.2381616 280.363636,145.377463 280.363636,202.293175 C280.363636,259.208888 326.519009,305.348189 383.454545,305.348189 Z" />
          <path d="M285.818182,233.373259 C315.942805,233.373259 340.363636,208.96093 340.363636,178.846797 C340.363636,148.732663 315.942805,124.320334 285.818182,124.320334 C255.693559,124.320334 231.272727,148.732663 231.272727,178.846797 C231.272727,208.96093 255.693559,233.373259 285.818182,233.373259 Z" />
          <path d="M216,569.256267 C245.52213,569.256267 269.454545,545.332185 269.454545,515.820334 C269.454545,486.308483 245.52213,462.384401 216,462.384401 C186.47787,462.384401 162.545455,486.308483 162.545455,515.820334 C162.545455,545.332185 186.47787,569.256267 216,569.256267 Z" />
          <path d="M366,569.256267 C393.413407,569.256267 415.636364,547.041048 415.636364,519.637187 C415.636364,492.233325 393.413407,470.018106 366,470.018106 C338.586593,470.018106 316.363636,492.233325 316.363636,519.637187 C316.363636,547.041048 338.586593,569.256267 366,569.256267 Z" />
          <path d="M510.545455,450.388579 C566.577253,450.388579 612,404.981648 612,348.969359 C612,292.957071 566.577253,247.550139 510.545455,247.550139 C454.513656,247.550139 409.090909,292.957071 409.090909,348.969359 C409.090909,404.981648 454.513656,450.388579 510.545455,450.388579 Z" />
        </g>
      </svg>
      <picture>
        <source srcSet={require('./entity.webp')} type="image/webp" />
        <img className={styles.entity} src={require('./entity.png')} alt="" draggable={false} />
      </picture>
    </div>
  );
};