import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useLocalStorage} from '@/composables/useLocalStorage';
import {useProductStore} from '@/stores/productStore';

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage('cart', []);

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.qty, 0);
  });

  const addToCart = async (product) => {
    const productStore = useProductStore();

    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        qty: 1
      });
    }

    await productStore.decreaseStock(product.id);
  };

  const removeFromCart = async (id) => {
    const productStore = useProductStore();
    const index = items.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      const item = items.value[index];
      await productStore.increaseStock(item.id, item.qty);
      items.value.splice(index, 1);
    }
  };

  const clearCart = async () => {
    const productStore = useProductStore();
    for (const item of items.value) {
      await productStore.increaseStock(item.id, item.qty);
    }
    items.value = [];
  };

  return {items, totalItems, totalPrice, addToCart, removeFromCart, clearCart};
});
