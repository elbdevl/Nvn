// ملف office.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: ' مكتب عصري',
            price: 880,
            image: 'images/1.jpg',
            category: 'كراسي'
        },
        {
            id: 2,
            name: 'طاولة مكتب زجاجية',
            price: 2200,
            image: 'images/office-table.jpg',
            category: 'طاولات'
        },
        {
            id: 3,
            name: 'خزانة ملفات حديثة',
            price: 1500,
            image: 'images/2.jpg',
            category: 'خزانات'
        },
        {
            id: 4,
            name: 'خزانة ملفات حديثة',
            price: 1500,
            image: 'images/3.jpg',
            category: 'خزانات'
        }
    ];

    const productsContainer = document.getElementById('productsContainer');

    function renderProducts() {
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price} درهم</p>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> إضافة للسلة
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // إضافة منتجات إلى DOM
    renderProducts();

    // معالجة أحداث إضافة للسلة
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = products.find(p => p.id == productId);
            alert(`تمت إضافة ${product.name} إلى السلة`);
        });
    });

});