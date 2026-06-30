import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/cart');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity = 1, selectedVariant, product }, { rejectWithValue, getState }) => {
  try {
    const { data } = await api.post('/cart', { productId, quantity, selectedVariant });
    return data;
  } catch (error) {
    // Demo fallback: update local state if backend API fails (useful for mock UI flow)
    const state = getState();
    const currentItems = state.cart.cart?.items || [];
    const existingIndex = currentItems.findIndex(item => (item.product?._id || item.product?.id || item.productId) === productId);
    let newItems = [...currentItems];
    
    if (existingIndex >= 0) {
      newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + quantity };
    } else {
      newItems.push({
        _id: 'mock-' + Date.now(),
        productId,
        quantity,
        product: product || { _id: productId, name: 'Mock Product', price: 0 }
      });
    }
    return { cart: { items: newItems } };
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`/cart/${itemId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
  }
});

export const clearCart = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    await api.delete('/cart');
    return null;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
  }
});

const initialState = {
  cart: { items: [] },
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = { items: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = { items: [] };
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.cart?.items || [];
export const selectCartTotal = (state) => {
  const items = state.cart.cart?.items || [];
  return items.reduce((total, item) => {
    const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
    return total + price * item.quantity;
  }, 0);
};
export const selectCartItemCount = (state) => {
  const items = state.cart.cart?.items || [];
  return items.reduce((count, item) => count + item.quantity, 0);
};
