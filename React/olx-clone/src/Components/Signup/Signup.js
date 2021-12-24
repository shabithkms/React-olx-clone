import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import "./Signup.css";
export default function Signup() {
  const History = useHistory();
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firebase);
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then((result) => {
        result.user.updateProfile({ displayName: Username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              name: Username,
              phone: Phone,
            })
            .then(() => {
              History.push("/login");
            }).catch((err)=>{
              alert(err.message)
            })
        }).catch((err)=>{
          alert(err.message)
        })
      }).catch((err)=>{
        alert(err.message)
      })
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="uname"
            name="name"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="pswd">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="pswd"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>{
          History.push('/login')
        }}> Login</a>
      </div>
    </div>
  );
}
