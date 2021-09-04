import React from 'react';
import './AddProduct.css';
import {db} from './firebase';
import { useState} from "react";

function AddProduct() {

    const [title,setTitle]=useState();
    const [imageUrl,setImageUrl]=useState();
    const [price,setPrice]=useState();
    const [rating,setRating]=useState();

    const addNewProduct=((e)=>{
        e.preventDefault();
    })

    return (
        <div className="addProduct">
            <h2>Add a new Product</h2>
            <form action="" className="addProduct__form">
                        <h5>Title</h5>
                        <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>

                        <h5>Image Url</h5>
                        <input type="text" value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/>

                        <h5>Price</h5>
                        <input type="number" value={price} onChange={e=>setPrice(e.target.value)}/>

                        <h5>Rating</h5>
                        <input type="number" value={rating} onChange={e=>setRating(e.target.value)}/>
                        
                        <h5></h5>
                        <button onClick={addNewProduct}>Add Product</button>
                    </form>
        </div>
    )
}

export default AddProduct
