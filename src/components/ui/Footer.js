import React, { useContext, useState } from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { faTiktok, faInstagram, faLinkedin, faTwitter, faFirefoxBrowser } from '@fortawesome/free-brands-svg-icons';
import { AppContext } from '../../services/app-context';

const Footer = () => {

    const { isLoading, sendEmail } = useContext(AppContext)

    const [emailInput, setEmailInput] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailError, setEmailError] = useState();
    const [message, setMessage] = useState();

    const checkEmailIsValid = () => {
        //eslint-disable-next-line
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const result = emailInput.match(pattern);
        if(!result){
          setEmailIsValid(false);
          setEmailError('Please enter a valid E-Mail address');
        } else if(result) {
          setEmailIsValid(true);
          setEmailError(null);
        }
      }

      const sendEmailHandler = async () => {
        checkEmailIsValid();
        if(!emailIsValid){
            return;
        }
        try {
            const data = await sendEmail(emailInput);
            setMessage(data.message);
        } catch (err) {
            setEmailIsValid(false);
            setEmailError('An unexpected error has occurred');
        }
      }

  return (
    <div className={classes.container}>
        <div className={classes.eachContainer}>
            <h1 className={classes.title}>NewsLetter</h1>
            <p className={classes.text}>Get the latest updates</p>
            {isLoading && <h4 className={classes.loading}>Loading...</h4>}
            {!isLoading && emailIsValid && message && <h4 className={classes.success}>{message}</h4>}
            {!isLoading && !emailIsValid && <h4 className={classes.error}>{emailError}</h4>}
            <div className={classes.inputContainer}>
                <input value={emailInput} onChange={(event) => {setEmailInput(event.target.value)}} className={classes.input} type='email' name='email' placeholder='Enter Your Email'></input>
                <button onClick={sendEmailHandler} className={classes.button}><FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon></button>
            </div>
        </div>
        <div className={classes.eachContainer}>
            <h1 className={classes.title}>Follow us</h1>
            <p className={classes.text}>Find us on our Social Media Platforms</p>
            <div className={classes.iconContainer}>
                <p><a className={classes.icon} href='https://www.facebook.com/ian.pius.12' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon></a></p>
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