import React from 'react';
import './PrimeAd.css'

function PrimeAd({image, name}) {
    return (
        <div className="primeAd">
            <a href="https://www.primevideo.com/detail/amzn1.dv.gti.00ad0da0-b823-0f6a-3a9a-4a675229451a">
                <div className="primeAd__headingText">
                    <h3>Prime Video Recommended for you</h3>
                    <p>{name}</p>

                </div>
                <img src={image} alt="" />

                <div className="primeAd__footer">
                    <p>Start watching on prime today</p>
                </div>
            </a>
            
        </div>
    )
}

export default PrimeAd
