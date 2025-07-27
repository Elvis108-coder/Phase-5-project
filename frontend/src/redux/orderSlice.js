import { createSlice } from '@reduxjs/toolkit';

// Initial state for orders
const initialState = {
  orders: [
    {
      id: 1,
      user: { username: "Alice" },
      total_amount: 1200,
      status: "Shipped",
      created_at: "2025-07-26T12:00:00Z",
      order_items: [
        {
          id: 1,
          quantity: 4,
          price: 1200,
          product: { name: "Shea Butter Body Cream" }
        }
      ]
    },
    {
      id: 2,
      user: { username: "Bob" },
      total_amount: 950,
      status: "Shipped",
      created_at: "2025-07-25T09:30:00Z",
      order_items: [
        {
          id: 2,
          quantity: 1,
          price: 950,
          product: { name: "Argan Oil" }
        }
      ]
    },
    {
      id: 3,
      user: { username: "Winter" },
      total_amount: 7600,
      status: "Shipped",
      created_at: "2025-07-27T09:30:00Z",
      order_items: [
        {
          id: 3,
          quantity: 1,
          price: 5000,
          product: { name: "Midnight Perfume" }
        },
        {
          id: 4,
          quantity: 4,
          price: 2600,
          product: { name: "Matte Lipstick" }
        },

      ]
    },{
      id: 4,
      user: { username: "Emma" },
      total_amount: 5499,
      status: "Shipped",
      created_at: "2025-07-25T09:30:00Z",
      order_items: [
        {
          id: 5,
          quantity: 1,
          price: 2000,
          product: { name: "Cerave Hydrating Cleanser" }
        },
        {
          id: 6,
          quantity: 1,
          price: 3499,
          product: { name: "Velvet Rose Perfume" }
        }
      ]
    },{
      id: 5,
      user: { username: "Anthony" },
      total_amount: 12000,
      status: "Shipped",
      created_at: "2025-07-25T09:30:00Z",
      order_items: [
        {
          id: 7,
          quantity: 1,
          price: 12000,
          product: { name: "SideEffect Perfume" }
        }
      ]
    },{
      id: 6,
      user: { username: "Ashley" },
      total_amount: 2596,
      status: "Shipped",
      created_at: "2025-07-25T09:30:00Z",
      order_items: [
        {
          id: 8,
          quantity: 1,
          price: 598,
          product: { name: "Glossy Pink NailPolish" }
        },
        {
          id: 9,
          quantity: 2,
          price: 999,
          product: { name: "Glow Boost Mask" }
        }
      ]
    },{
      id: 7,
      user: { username: "Jasmine" },
      total_amount: 1650,
      status: "Shipped",
      created_at: "2025-07-25T09:30:00Z",
      order_items: [
        {
          id: 10,
          quantity: 4,
          price: 950,
          product: { name: "Argan Oil" }
        },
        {
          id: 11,
          quantity: 1,
          price: 700,
          product: { name: "Blush Peony Roller Perfume" }
        }

      ]
    },
    {
      id: 8,
      user: { username: "JoyAnne" },
      total_amount: 3996,
      status: "Shipped",
      created_at: "2025-07-26T12:00:00Z",
      order_items: [
        {
          id: 1,
          quantity: 4,
          price: 999,
          product: { name: "Glow Boost Mask" }
        }
      ]
    },
  ],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} = orderSlice.actions;

export default orderSlice.reducer;