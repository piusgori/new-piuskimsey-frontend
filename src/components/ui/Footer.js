import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faFirefoxBrowser } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className={classes.container}>
        <div className={classes.eachContainer}>
            <h1 className={classes.title}>NewsLetter</h1>
            <p className={classes.text}>Get the latest updates</p>
            {/* <h4 className={classes.loading}>Loading...</h4> */}
            {/* <h4 className={classes.success}>Success</h4> */}
            {/* <h4 className={classes.error}>Error message</h4> */}
            <div className={classes.inputContainer}>
                <input className={classes.input} type='email' name='email' placeholder='Enter Your Email'></input>
                <button className={classes.button}><FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon></button>
            </div>
        </div>
        <div className={classes.eachContainer}>
            <h1 className={classes.title}>Follow us</h1>
            <p className={classes.text}>Find us on our Social Media Platforms</p>
            <div className={classes.iconContainer}>
                <p><a className={classes.icon} href='https://www.facebook.com/ian.pius.12' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a></p>
                <p><a className={classes.icon} href="https://www.instagram.com/p.i_u.s/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a></p>
                <p><a className={classes.icon} href='https://twitter.com/IanPius3?t=-Lf6Ul4gQdTTUQ7QVZwXUA&s=08' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a></p>
                <p><a className={classes.icon} href='https://www.linkedin.com/in/ian-pius-13b08b231' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a></p>
                <p><a className={classes.icon} href='https://piusgori.xyz' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faFirefoxBrowser} /></a></p>
            </div>
        </div>
    </div>
  )
}

export default Footer;