import React from 'react';
import './Home.css';
import Product from './Product';


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Events/May/MSD/RN10S/Updated/D23439348_MSD_WLD_RedmiNote10S_DesktopTallHero_3000x1200_3._CB668182081_.jpg"
                    className="home__image"/>

                <div className="home__row">
                    <Product id={672312} title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses' image='https://images-na.ssl-images-amazon.com/images/I/51CTIr1bJxL._SX325_BO1,204,203,200_.jpg' price={20.99} rating={3}/>
                    <Product id={672312} title="Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!" image="https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX312_BO1,204,203,200_.jpg" price={5} rating={4}/>
                    
                </div>

                <div className="home__row">
                <Product id={621322} title="Second World War Sandwich" image="https://images-na.ssl-images-amazon.com/images/I/51qcsX3-mSL._SX322_BO1,204,203,200_.jpg" price={8} rating={4}/>
                    <Product id={695342} title="Solidaire 550-Watt Mixer Grinder with 3 Jars (Black) (SLD-550-B)" image="https://images-na.ssl-images-amazon.com/images/I/518OwuNKGaL._SL1000_.jpg" price={28} rating={3}/>
                    <Product id={495930} title="Apple iPad Pro (11-inch, Wi-Fi, 128GB) - Space Grey (2nd Generation)" image="https://images-na.ssl-images-amazon.com/images/I/81p1L85KinL._SX679_.jpg" price={989.99} rating={5}/>
                </div>

                <div className="home__row">
                    <Product id={758493} title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)" image="https://images-na.ssl-images-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg" price={5999} rating={4}/>
                </div>
            </div>
            
        </div>
    )
}

export default Home
