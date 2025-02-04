import { defineType, defineField } from "sanity";

export const orderSchema = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    { name: "customerName", title: "Customer Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "zipCode", title: "Zip Code", type: "string" },
    { name: "paymentMethod", title: "Payment Method", type: "string" },
    { name: "totalAmount", title: "Total Amount", type: "number" },
    { name: "totalItems", title: "Total Items", type: "number" },
    { name: "status", title: "Status", type: "string", options: { list: ["Pending", "Shipped", "Delivered"] } },

    // Adding the orderDate field
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(), // Sets the current date and time
    }),

    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "product", title: "Product", type: "reference", to: [{ type: "products" }] },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Price", type: "number" },
          ],
        },
      ],
      initialValue: [],
    },
    {
      name: "paymentDetails",
      title: "Payment Details",
      type: "object",
      fields: [
        { name: "cardNumber", title: "Card Number", type: "string" },
        { name: "expiryDate", title: "Expiry Date", type: "string" },
        { name: "cvv", title: "CVV", type: "string" },
      ],
      hidden: ({ document }) => document?.paymentMethod !== "Credit Card",
      initialValue: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
    },
  ],
});
