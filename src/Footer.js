import React from 'react';
import './Footer.css';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

function Footer() {

    const history = useHistory();

    const handleBackToTop=(e)=>{
        // e.preventDefault();
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    return (
        <div className="footer">
            <div className="footer__backToTopButtonDiv">
                <button className="footer__backToTopButton" onClick={handleBackToTop}>Back to top</button>
            </div>

            <div className="footer__verticalColumn">
                <div className="footer__linkColumn">
                    <div className="footer__linkColumnHead">
                        <h4>Get to Know Us</h4>
                    </div>
                    <div className="footer__links">
                        <a href="https://www.aboutamazon.in/?utm_source=gateway&utm_medium=footer"><span>About us</span></a>
                        <a href="https://amazon.jobs/"><span>Career</span></a>
                        <a href="https://press.aboutamazon.in/?utm_source=gateway&utm_medium=footer"><span>Press Releases</span></a>
                        <a href="https://www.amazon.in/gp/browse.html?node=8872558031&ref_=footer_cares"><span>Amazon Cares</span></a>
                        <a href="https://www.amazon.in/gp/browse.html?node=4594605031&ref_=footer_smile"><span>Get a smile</span></a>
                    </div>
                </div>

                <div className="footer__linkColumn">
                    <div className="footer__linkColumnHead">
                        <h4>Connect with us</h4>
                    </div>
                    <div className="footer__links">
                        <a href="http://www.amazon.in/gp/redirect.html/ref=footer_fb?location=http://www.facebook.com/AmazonIN&token=2075D5EAC7BB214089728E2183FD391706D41E94&6"><span>Facebook</span></a>
                        <a href="http://www.amazon.in/gp/redirect.html/ref=footer_twitter?location=http://twitter.com/AmazonIN&token=A309DFBFCB1E37A808FF531934855DC817F130B6&6"><span>Twitter</span></a>
                        <a href="http://www.amazon.in/gp/redirect.html?location=https://www.instagram.com/amazondotin&token=264882C912E9D005CB1D9B61F12E125D5DF9BFC7&source=standards"><span>Instagram</span></a>
                        <Link to="/addProduct"><span>Add Product</span></Link>
                    </div>
                </div>

                <div className="footer__linkColumn">
                    <div className="footer__linkColumnHead">
                        <h4>Make Money with Us</h4>
                    </div>
                    <div className="footer__links">
                        <a href="https://www.amazon.in/b/?node=2838698031&ld=AZINSOANavDesktopFooter&ref_=nav_footer_sell"><span>Sell on Amazon</span></a>
                        <a href="https://accelerator.amazon.in/?ref_=map_1_b2b_GW_FT"><span>Sell under Amazon Accelerator</span></a>
                        <a href="https://sell.amazon.in/grow-your-business/amazon-global-selling.htmll?ld=AZIN_Footer_V1&ref=AZIN_Footer_V1"><span>Amazon Global Selling</span></a>
                        <a href="https://affiliate-program.amazon.in/?utm_campaign=assocshowcase&utm_medium=footer&utm_source=GW&ref_=footer_assoc"><span>Become an Affiliate</span></a>
                        <a href="http://services.amazon.in/services/fulfilment-by-amazon/benefits.html/ref=az_footer_fba?ld=AWRGINFBAfooter"><span>Fulfilment by Amazon</span></a>
                        <a href="https://advertising.amazon.in/?ref=Amz.in"><span>Advertise Your Products</span></a>
                        <a href="https://www.amazonpay.in/merchant"><span>Amazon PayMerchants</span></a>
                    </div>
                </div>

                <div className="footer__linkColumn">
                    <div className="footer__linkColumnHead">
                        <h4>Let Us Help You</h4>
                    </div>
                    <div className="footer__links">
                        <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&ref_=footer_covid"><span>COVID-19 and Amazon</span></a>
                        <a href="https://www.amazon.in/gp/css/homepage.html?ref_=footer_ya"><span>Your Account</span></a>
                        <a href="https://www.amazon.in/gp/css/returns/homepage.html?ref_=footer_hy_f_4"><span>Returns Centre</span></a>
                        <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=201083470&ref_=footer_swc"><span>100% Purchase Protection</span></a>
                        <a href="https://www.amazon.in/gp/browse.html?node=6967393031&ref_=footer_mobapp"><span>Amazon App Download</span></a>
                        <a href="https://www.amazon.in/gp/BIT/theamazonapp/ref=footer_assistant_download_copy"><span>Amazon Assistant Download</span></a>
                        <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590&ref_=footer_gw_m_b_he"><span>Help</span></a>
                    </div>
                </div>
                

            </div>

            
        </div>
    )
}

export default Footer
