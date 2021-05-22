import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '易于使用',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        elecrun 就像 Electron 命令一样简单，但支持更多功能
      </>
    ),
  },
  {
    title: 'ESM, Typescript 和更多',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        elecrun 支持直接在代码中使用 ESM 模块规范和 Typescript 而无需其他配置
      </>
    ),
  },
  {
    title: '基于 Vite 和 ESBuild',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        基于次世代的前端和 Node.js 打包工具，将获得前所未有的热更新和打包速度
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
