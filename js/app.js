// app.js
import { cart } from './cart.js';
import { products, getProductById } from './products.js';

// تهيئة السلة
cart.updateCounter();

// معالجة الأحداث
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
        const product = getProductById(productId);
        if (product) {
            cart.addItem(product);
            showNotification('تمت إضافة المنتج إلى السلة');
        }
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}