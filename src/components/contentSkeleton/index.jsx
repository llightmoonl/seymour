import React from 'react';
import Styles from './contentSkeleton.module.scss';

function contentSkeleton() {
  return (
    <div className={Styles.content}>
      <h1 className={Styles.content__title}></h1>
      <div className={Styles.content__main}></div>
      <div className={Styles.docs__edit}></div>
    </div>
  )
}

export default contentSkeleton;