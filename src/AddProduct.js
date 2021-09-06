import React from "react";
import "./AddProduct.css";
import { db } from "./firebase";
import { useState } from "react";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function AddProduct() {
  const [title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();

  const [open, setOpen] = useState(false);

  const addNewProduct = (e) => {
    e.preventDefault();

    var productCollection = db.collection("products");

    productCollection
      .add({
        title: title,
        image: imageUrl,
        price: parseInt(price),
        rating: parseInt(rating),
      })
      .then(() => {
        setTitle("");
        setImageUrl("");
        setPrice("");
        setRating("");

        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="addProduct">
      <h2>Add a new Product</h2>
      <form action="" className="addProduct__form">
        <h5>Title</h5>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h5>Image Url</h5>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <h5>Price</h5>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <h5>Rating</h5>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <h5></h5>
        <button onClick={addNewProduct}>Add Product</button>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Product Added"
          action={
            <React.Fragment>
              <IconButton
                className="addProduct__SnakbarCloseBtn"
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
    </div>
  );
}

export default AddProduct;
