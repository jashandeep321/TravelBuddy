import { useCart } from '../Context/CartContext';

// Inside your component
const { addToCart } = useCart();

<button
  className="btn btn-primary px-4 py-2 fs-5"
  onClick={() => addToCart(pkg)}
>
  Book Package
</button>
