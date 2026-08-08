import { useEffect, useState } from "react";
import { dummyOrders } from "../../public/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-14 pb-16">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">My Orders</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="mt-8 space-y-6">
        {myOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          myOrders.map((order, index) => (
            <div key={order._id || index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">Payment Type: {order.paymentType}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Total Amount: <span className="font-semibold text-primary">${order.amount}</span></p>
                  <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {order.items.map((item, itemIndex) => (
                  <div key={item._id || itemIndex} className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <img src={item.product.image?.[0]} alt={item.product.name} className="h-16 w-16 object-cover" />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-800">{item.product.name}</h2>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>Qty: {item.quantity || 1}</p>
                      <p>Status: {order.status}</p>
                    </div>

                    <p className="text-base font-semibold text-primary">
                      Amount: ${item.product.offerPrice * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;