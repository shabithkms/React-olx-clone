import React, { Fragment, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext,AuthContext } from "../../store/Context";
import { useContext } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";


const Create = () => {
  const {firebase} =useContext(FirebaseContext)
  const {user} =useContext(AuthContext)
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Image, setImage] = useState("");
  const date=new Date()
  const History=useHistory()
  const handleSubmit=()=>{
    firebase.storage().ref(`/image/${Image.name}`).put(Image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log("url",url);
        firebase.firestore().collection('products').add({
          Name,
          Category,
          Price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then((response)=>{
          alert("Added successfully")
          History.push('/')
        })
      }).catch((err)=>{
        console.log("2");
        console.log(err.message);
      })
    }).catch((err)=>{
      console.log(err.message);
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={Category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={Price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            name="Price"
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={Image ? URL.createObjectURL(Image) : ""}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
