import { apiClient, Product } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  products: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: ProductsState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null,
  categories: [],
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await apiClient.getProducts();
      return products;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (productId: number, { rejectWithValue }) => {
    try {
      const product = await apiClient.getProductById(productId);
      return product;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch product details";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await apiClient.getCategories();
      return categories;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch categories";
      return rejectWithValue(errorMessage);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product detail
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productDetail = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductDetail, clearError } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
