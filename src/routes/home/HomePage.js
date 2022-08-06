import React, { Fragment } from 'react'
import Top from './home-components/Top';
import Header from '../../components/ui/Header';
import Processes from './home-components/Processes';
import LatestProducts from './home-components/LatestProducts';
import AboutUs from './home-components/AboutUs';
import Footer from '../../components/ui/Footer';
import { title } from '../../utils/title';

const HomePage = () => {
  title('Pius & Joskimsey');
  return (
    <Fragment>
      <Header></Header>
      <Top></Top>
      <Processes></Processes>
      <LatestProducts></LatestProducts>
      <AboutUs></AboutUs>
      <Footer></Footer>
    </Fragment>
  )
}

export default HomePage;