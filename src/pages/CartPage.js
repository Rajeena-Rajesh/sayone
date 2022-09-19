import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireconfig";
import { toast } from "react-toastify";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeorder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("order placed successfully");
      handleClose();
    } catch (error) {
      toast.error("Order failed");
      console.log("order failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    src={item.imageURL}
                    alt="image"
                    height="80px"
                    width="80px"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    onClick={() => {
                      deleteFromCart(item);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h2 className="total-amount">Total Amount={totalAmount} RS/-</h2>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>REGISTER</h2>
            <hr />

            <input
              type="text"
              value={name}
              placeholder="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              rows={3}
              value={address}
              placeholder="address"
              className="form-control"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              value={pincode}
              placeholder="pincode"
              className="form-control"
              onChange={(e) => setPincode(e.target.value)}
            />

            <input
              type="number"
              value={phoneNumber}
              placeholder="phone number"
              className="form-control"
              onChange={(e) => setphoneNumber(e.target.value)}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeorder}>ORDER NOW</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
