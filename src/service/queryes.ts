export interface userData {
  results?: {
    title?: string;
    description: string;
    image: string;
    id: number;
  }[];
}

export interface productData {
  results?: {
    title?: string;
    image: string;
    price: string;
    id: number;
  }[];
}
export interface productDataType {
  title?: string;
  image: string;
  price: string;
  id?: number;
}

export const getBanner = async () => {
  const res = await fetch("http://localhost:8000/banner/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data: userData = await res.json();

  return data;
};

export const getProducts = async () => {
  const res = await fetch("http://localhost:8000/product/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data: productData = await res.json();

  return data;
};

export const getProductById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/product/${id}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
