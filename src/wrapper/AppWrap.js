import React from 'react'
import {NavigationDots, SocialMedia} from '../components'

const year = new Date().getFullYear()
const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className='app__wrapper app_flex'>
            <Component/>
            <div className='copyright'>
                <p className='p-text'>@{year} WELI</p>
                <p className='p-text'>All right reserved</p>
            </div>
        </div>
        <NavigationDots active={idName}/>
    </div>
  );
};

export default AppWrap