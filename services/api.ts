export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://fakestoreapi.com";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.request<Product[]>("/products");
    return response.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await this.request<Product>(`/products/${id}`);
    return response.data;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await this.request<Product[]>(
      `/products/category/${category}`
    );
    return response.data;
  }

  async getCategories(): Promise<string[]> {
    const response = await this.request<string[]>("/products/categories");
    return response.data;
  }
}

export const apiClient = new ApiClient();
