import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import ContactFromContainer from '../container/ContactFromContainer/ContactFromContainer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Contact = () => {
    return (
        <React.Fragment>
            <Header />
            <ContactFromContainer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Contact;

