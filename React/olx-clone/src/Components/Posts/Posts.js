import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [Products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  console.log(setPostDetails);
  const History = useHistory()
  useEffect(() => {
    firebase.firestore().collection('products').get().then((data) => {
      const allPost = data.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            Products.map(product => {
              return <div
                className="card" onClick={() => {
                  setPostDetails(product)
                  History.push('/view')
                }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.Price}</p>
                  <span className="kilometer">{product.Category}</span>
                  <p className="name"> {product.Name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            Products.map(product => {
              return <div
                className="card" onClick={() => {
                  setPostDetails(product)
                  History.push('/view')
                }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.Price}</p>
                  <span className="kilometer">{product.Category}</span>
                  <p className="name"> {product.Name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
