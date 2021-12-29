import {Fragment, useState, useEffect} from "react";
import Logo from '../../components/logo/Logo';
import MobileMenu from "../../components/NavBar/MobileMenu"
import MainSearch from "../../components/NavBar/MainSearch"
import SEO from '../../components/SEO';

const Header = () => {
    const [ofcanvasShow, setOffcanvasShow] = useState(false);
    const onCanvasHandler = () => {
        setOffcanvasShow(prev => !prev);
    }
    const [searchbarShow, setSearchbarShow] = useState(false);
    const onSearchHandler = () => {
        setSearchbarShow(prev => !prev);
    }
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".header-section");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    return (
        <> 
        <SEO title="TOOLBOX" />
        <Fragment>
            <div className={`header-section bg-dark section ${
        scroll > headerTop ? "is-sticky" : ""
      }`}>
                <div className="header-inner">
                    <div className="container position-relative">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-2 col-auto order-0">
                                <Logo 
                                    text="TOOLBOX"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenu show={ofcanvasShow} onClose={onCanvasHandler}/>
            <MainSearch show={searchbarShow} onClose={onSearchHandler}/>
            </Fragment>
        </>
    )
}

export default Header;