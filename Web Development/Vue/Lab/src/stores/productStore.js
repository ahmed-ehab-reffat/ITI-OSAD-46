import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {useApi} from '@/composables/useApi';

const API_URL = 'http://localhost:3000/products';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const api = useApi(API_URL);

  /**
   * Fetch all products from json-server and populate the products array
   */
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    await api.getAll();

    if (api.error.value) {
      error.value = api.error.value;
    } else {
      products.value = api.data.value;
    }
    loading.value = false;
  };

  /**
   * Getter: returns a single product by ID
   */
  const getProductById = (id) => {
    return computed(() => products.value.find((p) => p.id === Number(id)));
  };

  /**
   * Action: decrease stock by 1 and send PUT to json-server with full updated product
   */
  const decreaseStock = async (productId) => {
    const product = products.value.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      product.stock--;
      // Send the full updated product object via PUT
      await api.update(productId, {...product});
      if (api.error.value) {
        // Revert on failure
        product.stock++;
        error.value = api.error.value;
      }
    }
  };

  const increaseStock = async (productId, amount = 1) => {
    const product = products.value.find((p) => p.id === productId);
    if (product) {
      product.stock += amount;
      await api.update(productId, {...product});
      if (api.error.value) {
        // Revert on failure
        product.stock -= amount;
        error.value = api.error.value;
      }
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    decreaseStock,
    increaseStock
  };
});
