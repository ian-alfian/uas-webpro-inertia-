import { ref, computed } from 'vue';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export const cartItems = ref<CartItem[]>([]);

export const addToCart = (product: MenuItem) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
};

export const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
};

export const updateQuantity = (id: number, amount: number) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    item.quantity += amount;
    if (item.quantity < 1) {
      removeFromCart(id);
    }
  }
};

export const totalItems = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

export const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
