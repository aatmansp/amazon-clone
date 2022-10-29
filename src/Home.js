import React from 'react';
import './Home.css';
import PrimeAd from './PrimeAd';
import Product from './Product';
import {db} from './firebase';
import { useEffect ,useState} from 'react';
import { useStateValue } from './StateProvider';
import {Link} from 'react-router-dom';

function Home() {
    const [user]=useStateValue();
    const [products1,setProducts1]=useState([]);
    var ind=0;

    useEffect(()=>{
        var productCollection=db.collection('products');
        // console.log(productCollection);
        var arr1=[];
        productCollection.get()
        .then((snapShot)=>{
            // console.log(snapShot);
            snapShot.forEach((snap)=>{
                // console.log(snap.id+" "+JSON.stringify(snap.data()));
                // console.log(snap.data());
                arr1.push({
                    id:snap.id,
                    title:snap.data().title,
                    image:snap.data().image,
                    price:snap.data().price,
                    rating:snap.data().rating
                })
            });
            setProducts1(arr1);
            
        });
        // console.log(productCollection);
        // console.log(products1);
        
    },[user])
    // console.log(products1);

    return (
        <div className="home">
            <div className="home__container">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Events/May/MSD/RN10S/Updated/D23439348_MSD_WLD_RedmiNote10S_DesktopTallHero_3000x1200_3._CB668182081_.jpg" alt=""
                    className="home__image"/>
                
                <div className="home__row">
                    {products1?.slice(0,4).map(p=>(
                        <Product id={p.id} title={p.title} image={p.image} price={p.price} rating={p.rating}/>
                    ))}
                    
                    {/* Hardcoded test products */}
                    {/* <Product id={672329} title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses' image='https://images-na.ssl-images-amazon.com/images/I/51CTIr1bJxL._SX325_BO1,204,203,200_.jpg' price={20.99} rating={3}/>
                    <Product id={672309} title="Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!" image="https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX312_BO1,204,203,200_.jpg" price={5} rating={4}/>
                    <Product id={672344} title="Fire TV Stick (2020) with Alexa Voice Remote (includes TV controls) | Stream HD Quality Video with Dolby Atmos Audio | 2020 release" image="https://images-na.ssl-images-amazon.com/images/I/51jULzY76lL._SL1000_.jpg" price={39.99} rating={4}/>
                    <Product id={672345} title="OnePlus Buds Z (White)" image="https://images-na.ssl-images-amazon.com/images/I/51vwQzwM%2BZL._SL1500_.jpg" price={41.99} rating={4}/> */}                    
                </div>

                <div className="home__row">
                    <PrimeAd image="https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/f0431505d9327cc5c53635d793c3600531a049c8a17c59267010773493361018._RI_V_TTW_QL40_AC_SL1584_.jpg" name="The Conjuring 2"/>
                    {products1?.slice(4,6).map(p=>(
                        <Product id={p.id} title={p.title} image={p.image} price={p.price} rating={p.rating}/>
                    ))}

                    {/* Hardcoded test products */}
                    {/* <Product id={621322} title="Second World War Sandwich" image="https://images-na.ssl-images-amazon.com/images/I/51qcsX3-mSL._SX322_BO1,204,203,200_.jpg" price={8} rating={4}/>
                    <Product id={695342} title="Solidaire 550-Watt Mixer Grinder with 3 Jars (Black) (SLD-550-B)" image="https://images-na.ssl-images-amazon.com/images/I/518OwuNKGaL._SL1000_.jpg" price={28} rating={3}/> */}
                    
                </div>

                <div className="home__row">
                    {products1?.slice(6,11).map(p=>(
                        <Product id={p.id} title={p.title} image={p.image} price={p.price} rating={p.rating}/>
                    ))}
                    
                    {/* Hardcoded test products */}
                    {/* <Product id={495930} title="Apple iPad Pro (11-inch, Wi-Fi, 128GB) - Space Grey (2nd Generation)" image="https://images-na.ssl-images-amazon.com/images/I/81p1L85KinL._SX679_.jpg" price={989.99} rating={5}/>
                    <Product id={758493} title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)" image="https://images-na.ssl-images-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg" price={5999} rating={4}/>
                    <Product id={673958} title="OnePlus 9 5G (Arctic Sky, 8GB RAM, 128GB Storage) | Extra INR 3,000 OFF on Exchange | NCEMI upto 12 months" image="https://images-na.ssl-images-amazon.com/images/I/61fy%2Bu9uqPL._SL1500_.jpg" price={579} rating={3}/>
                    <Product id={674849} title="Echo Dot (3rd Gen, Black) Combo with Wipro 9W LED Smart Color Bulb - Smart Home Starter Kit" image="https://images-na.ssl-images-amazon.com/images/I/61EXU8BuGZL._SL1100_.jpg" price={49.99} rating={4}/> */}
                   
                </div>
                {/* <div className="home__viewAllLink">
                    <Link to="/allProducts"><p>View All</p></Link>
                </div> */}
            </div>
            
        </div>
    )
}

export default Home


// bg image : https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Events/May/MSD/RN10S/Updated/D23439348_MSD_WLD_RedmiNote10S_DesktopTallHero_3000x1200_3._CB668182081_.jpg
// https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/cnnjpp/May21/BAU_Hero/OP_9/OP_9_Incl_3000x1200._CB668916820_.jpg