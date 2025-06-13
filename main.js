// بيانات المنتجات (يمكن استبدالها بطلب API)
const products = [
    {
        id: 1,
        name: 'كنبة فاخرة',
        price: 1499,
        image: 'https://i.ibb.co/vv3WbSMm/IMG-20250226-WA0042.jpg',
        description: 'كنبة جلدية فاخرة بتصميم إيطالي'
    },
    {
        id: 2,
        name: 'طاولة طعام',
        price: 899,
        image: 'images/product2.jpg',
        description: 'طاولة طعام خشبية لـ 6 أشخاص'
    }
];

// توليد المنتجات
function renderProducts() {
    const container = document.querySelector('.products-grid');
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price-container">
                    <span class="product-price">${product.price.toLocaleString()} ر.س</span>
                    <button class="add-to-cart" 
                            data-id="${product.id}"
                            onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> إضافة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// دالة إضافة إلى السلة (مثال)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    console.log('تمت إضافة المنتج:', product);
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    let count = parseInt(countElement.textContent) || 0;
    countElement.textContent = count + 1;
}