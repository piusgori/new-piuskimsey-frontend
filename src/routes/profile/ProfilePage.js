import React, { Fragment } from 'react'
import Header from '../../components/ui/Header';
import ProfileComponent from './profile-components/ProfileComponent';

const ProfilePage = () => {
  return (
    <Fragment>
        <Header></Header>
        <ProfileComponent></ProfileComponent>
    </Fragment>
  )
}

export default ProfilePage;