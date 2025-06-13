
        // Mock pp.js - In a real app this would be a separate file
        window.products = [
            {
                id: 1,
                name: "طاولة مكتب خشبية",
                price: 899.99,
                images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
                description: "طاولة مكتب فاخرة من خشب السنديان"
            },
            {
                id: 2,
                name: "كرسي مكتب مريح",
                price: 349.99,
                images: ["https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
                description: "كرسي مكتب مريح مع دعم للظهر"
            },
            {
                id: 3,
                name: "خزانة ورقيات",
                price: 249.99,
                images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
                description: "خزانة ورقيات أنيقة للمكتب"
            },
            {
                id: 4,
                name: "رفوف مكتبية",
                price: 199.99,
                images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
                description: "رفوف مكتبية متعددة الاستخدامات"
            }
        ];
        
        // Render products
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('productsContainer');
            
            window.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">${product.price.toFixed(2)} ر.س</p>
                        <div class="product-actions">
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> إضافة إلى السلة
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(productCard);
            });
        });
    