import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";


const Logo = ({image, text}) => {
    return(
        <div className="header-logo">
            <Link to={process.env.PUBLIC_URL + "/"}>
                {text ? <h1 className="text-white">{text}</h1> : 
                <img className="dark-logo" src={process.env.PUBLIC_URL + image} alt="Agency Logo" />}
            </Link>
        </div>
    )
}

Logo.propTypes = {
    image: PropTypes.string
};

export default Logo;
