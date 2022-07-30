import React from 'react';
import classes from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={classes.container}>
        <div className={classes.aboutContainer}>
            <h1 className={classes.aboutTitle}>Who are we?</h1>
            <p className={classes.aboutText}>A top class of young organization ready to provide a platform form all who have small business activities</p>
        </div>
        <div className={classes.aboutContainer}>
            <h1 className={classes.aboutTitle}>Our Ambition</h1>
            <p className={classes.aboutText}>Spread out to the whole country to ease the activities of those who need it</p>
        </div>
    </div>
  )
}

export default AboutUs