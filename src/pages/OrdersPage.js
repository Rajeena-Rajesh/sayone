import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireconfig";
import Layout from "../Components/Layout";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }
  return (
    <Layout loading={loading}>
      <div className="p-2">
        {orders
          .filter((obj) => obj.userid == userId)
          .map((order) => {
            return (
              <table className="table mt-3 order">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {order.cartItems.map((item) => {
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
      </div>
    </Layout>
  );
}

export default OrdersPage;
