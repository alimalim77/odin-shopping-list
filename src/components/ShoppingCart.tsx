import { Button, Offcanvas, Stack } from "react-bootstrap";
import {
  calculateTotal,
  useShoppingCartContext,
} from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import axios from "axios";
import { useState } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [cart, setCart] = useState({
    name: "SwipeCart Buy",
    creator: "ABC",
    img: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  });

  const { closeCart, cartItems } = useShoppingCartContext();
  const total = calculateTotal(cartItems);

  console.log(cartItems);

  const initPay = (data: { amount: any; currency: any; id: any }) => {
    const options = {
      key: import.meta.env.VITE_TEST_KEY,
      amount: total,
      currency: data.currency,
      name: cart.name,
      description: "Test",
      image: cart.img,
      order_id: data.id,
      handler: async (response: any) => {
        try {
          const verifyURL = `${import.meta.env.VITE_PORT}/api/payment/verify`;
          const { data } = await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    //Original Working Code
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      console.log(import.meta.env.PORT);
      const orderURL = `${import.meta.env.VITE_PORT}/api/payment/orders`;
      const { data } = await axios.post(orderURL, { amount: total });
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(total);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">Total: {total}</div>
          <Button onClick={handlePay}>Checkout</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
