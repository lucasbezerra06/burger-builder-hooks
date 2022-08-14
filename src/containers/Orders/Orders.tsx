import React from "react";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useAuthStore } from "../../stores/authStore";

export type OrderType = z.infer<typeof orderValidator>;

const orderValidator = z.object({
  id: z.string().optional(),
  ingredients: z.record(z.number()).nullable(),
  orderData: z.record(z.string()),
  price: z.number(),
  userId: z.string().nullable(),
});

const useOrders = () => {
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);

  return useQuery(["orders", token], async () => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        id: key,
        price: Number.parseFloat(response.data[key]),
        ...response.data[key],
      });
    }
    return z.array(orderValidator).parse(fetchedOrders);
  });
};

const Orders: React.FC = () => {
  const { data: orders, isLoading } = useOrders();

  let ordersList: JSX.Element | JSX.Element[] = [];
  if (isLoading) {
    ordersList = <Spinner />;
  } else if (orders) {
    ordersList = orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }

  return <div>{ordersList}</div>;
};

export default withErrorHandler(Orders, axios);
