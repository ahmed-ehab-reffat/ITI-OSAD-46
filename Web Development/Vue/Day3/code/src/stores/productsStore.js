import { useApi } from "@/composables/useApi";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
const MOCK_DATA = [
  {
    id: 101,
    title: "Orbit Wireless Headphones",
    description:
      "Comfort-focused wireless headphones with clear mids, punchy bass, and 30-hour battery life.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Black wireless headphones on a white background",
    tags: ["audio", "wireless", "best-seller"],
    stock: 12,
  },
  {
    id: 102,
    title: "Pulse Smartwatch",
    description:
      "Track heart rate, sleep, and daily activity with a bright display and water-resistant build.",
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Smartwatch close-up on a soft background",
    tags: ["wearables", "fitness", "new"],
    stock: 5,
  },
  {
    id: 103,
    title: "Aero Mechanical Keyboard",
    description:
      "Low-profile mechanical keyboard with hot-swappable switches and subtle RGB backlight.",
    price: 149.0,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mechanical keyboard on a desk",
    tags: ["accessories", "keyboard", "gaming"],
    stock: 0,
  },
  {
    id: 104,
    title: "Nova 4K Webcam",
    description:
      "Ultra-clear 4K webcam with dual microphones and auto-light correction for meetings.",
    price: 109.0,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Webcam mounted on top of a monitor",
    tags: ["video", "work", "creator"],
    stock: 18,
  },
];

// V1 using mock data
// export const useProductsStore = defineStore("products", () => {
//   //State (Some form of data)
//   const products = ref([]);
//   const featuredProduct = ref({});
//   const relatedProducts = ref([]);
//   //Getters (Computed properties / Manipulator functions calcDisocunt)

//   //Actions (Mutates MY DATA)
//   //   for example , CRUD
//   const getAllProducts = () => {
//     products.value = MOCK_DATA;
//   };
//   const getProductById = (id) => {
//     featuredProduct.value = products.value.find((p) => p.id === id);
//   };
//   const getRelatedProducts = (id) => {
//     relatedProducts.value = products.value.filter((p) => p.id !== id);
//   };
//   return {
//     //State
//     products,
//     featuredProduct,
//     relatedProducts,
//     //Getters
//     //Actions
//     getProductById,
//     getAllProducts,
//     getRelatedProducts,
//   };
// });
export const useProductsStore = defineStore("products", () => {
  //State (Some form of data)

  //   const products = ref([]);
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
    fetchData: fetchProducts,
  } = useApi("http://localhost:3000", "products");

  const featuredProduct = ref({}); // /products/:id
  const relatedProducts = ref([]); //products/:id/related

  //Getters (Computed properties / Manipulator functions calcDisocunt)

  //Actions (Mutates MY DATA)
  const getProductById = (id) => {
    console.log(`Getting product by id ${id}`);

    featuredProduct.value = products.value.find((p) => p.id == id);
    console.log(featuredProduct.value);
  };
  const getRelatedProducts = (id) => {
    relatedProducts.value = products.value.filter((p) => p.id != id);
  };
  return {
    //State
    products,
    featuredProduct,
    relatedProducts,
    loading: productsLoading,
    error: productsError,
    //Getters
    //Actions
    getProductById,
    fetchProducts,
    getRelatedProducts,
  };
});
