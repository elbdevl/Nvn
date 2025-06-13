
        // بيانات المنتجات
        const products = [
            {
                id: 1,
                name: "كنبة فاخرة",
                price: 1400099,
                description: "كنبة جلدية فاخرة بتصميم إيطالي",
                images: [
                    "images/1.jpg",
                    "images/2.jpg",
                    "https://via.placeholder.com/600x400/3498db/fff?text=Image+3"
                ],
                specs: {
                    المادة: "جلد طبيعي",
                    الأبعاد: "220x90x75 سم",
                    الألوان: ["بني", "أسود"]
                },
                related: [2, 3]
            },
            {
                id: 2,
                name: "طاولة اجتماعات",
                price: 2999,
                description: "طاولة اجتماعات بتصميم عصري",
                images: [
                    "images/3.jpg",
                    "https://via.placeholder.com/600x400/2ecc71/fff?text=Image+2"
                ],
                specs: {
                    المادة: "خشب بلوط",
                    الأبعاد: "300x100x75 سم",
                    الألوان: ["أبيض", "رمادي"]
                },
                related: [1, 3]
            },
            {
                id: 3,
                name: "كرسي مكتب",
                price: 899,
                description: "كرسي مكتب مريح مع دعم ظهر ممتاز",
                images: [
                    "https://via.placeholder.com/600x400/9b59b6/fff?text=Image+1",
                    "https://via.placeholder.com/600x400/34495e/fff?text=Image+2"
                ],
                specs: {
                    المادة: "قماش + إسفنج",
                    الأبعاد: "60x60x110 سم",
                    الألوان: ["أسود", "أحمر"]
                },
                related: [1, 2]
            },
             {
                id: 4,
                name: "كرسي مكتب",
                price: 899,
                description: "كرسي مكتب مريح مع دعم ظهر ممتاز",
                images: [
                    "images/3.jpg",
                    "https://via.placeholder.com/600x400/34495e/fff?text=Image+2",
                    "images/3.jpg",
                    "images/3.jpg",
                    "images/3.jpg",
                    "images/3.jpg",
                ],
                specs: {
                    المادة: "قماش + إسفنج",
                    الأبعاد: "60x60x110 سم",
                    الألوان: ["أسود", "أحمر"]
                },
                related: [1, 2]
            }
        ];

        // تهيئة التطبيق
        function initApp() {
            renderProducts();
            handleRouting();
        }

        // عرض المنتجات
        function renderProducts() {
            const container = document.getElementById('productsContainer');
            
            container.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-price">${product.price.toLocaleString()} درهم</span>
                        <div class="product-actions">
                            <button class="add-to-cart" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> إضافة للسلة
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            addProductEventListeners();
        }

        // عرض تفاصيل المنتج
        function showProductDetail(id) {
            const product = products.find(p => p.id == id);
            const container = document.getElementById('productDetailContent');
            
            container.innerHTML = `
                <div class="product-gallery">
                    <img src="${product.images[0]}" class="main-image" id="mainImage">
                    <div class="thumbnails-grid">
                        ${product.images.map((img, index) => `
                            <img src="${img}" 
                                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                                 onclick="changeMainImage('${img}', this)">
                        `).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="product-price">${product.price.toLocaleString()} درهم</div>
                    <p class="description">${product.description}</p>
                    <div class="product-specs">
                        ${Object.entries(product.specs).map(([key, value]) => `
                            <div class="spec-item">
                                <span>${key}</span>
                                <span>${Array.isArray(value) ? value.join('، ') : value}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> إضافة إلى السلة
                    </button>
                    
                    ${renderRelatedProducts(product.related)}
                </div>
            `;

            document.querySelector('.products-page').style.display = 'none';
            document.getElementById('productDetailPage').style.display = 'block';
            addRelatedProductsListeners();
        }

        // تغيير الصورة الرئيسية
        function changeMainImage(src, element) {
            document.getElementById('mainImage').src = src;
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            element.classList.add('active');
        }

        // عرض المنتجات المقترحة
        function renderRelatedProducts(relatedIds) {
            const relatedProducts = products.filter(p => relatedIds.includes(p.id));
            
            return `
                <div class="related-products">
                    <h3 class="related-title">قد يعجبك أيضاً</h3>
                    <div class="products-grid related-grid">
                        ${relatedProducts.map(product => `
                            <div class="product-card" data-id="${product.id}">
                                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                                <div class="product-info">
                                    <h3 class="product-title">${product.name}</h3>
                                    <span class="product-price">${product.price.toLocaleString()} درهم</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // إضافة Event Listeners للمنتجات
        function addProductEventListeners() {
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.add-to-cart')) {
                        const id = card.dataset.id;
                        window.location.hash = `#product/${id}`;
                    }
                });
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToCart(e.target.dataset.id);
                });
            });
        }

        // إضافة Event Listeners للمنتجات المقترحة
        function addRelatedProductsListeners() {
            document.querySelectorAll('.related-products .product-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.dataset.id;
                    window.location.hash = `#product/${id}`;
                });
            });
        }

        // إدارة السلة
        function addToCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = products.find(p => p.id == productId);
            
            const existingItem = cart.find(item => item.id == productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            showCartNotification();
        }

        // إشعار الإضافة للسلة
        function showCartNotification() {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.background = '#3BE5DB';
            notification.style.color = 'white';
            notification.style.padding = '15px 25px';
            notification.style.borderRadius = '30px';
            notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            notification.innerText = 'تمت إضافة المنتج إلى السلة ✔️';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // التوجيه
        function handleRouting() {
            const path = window.location.hash.substr(1);
            if (path.startsWith('product/')) {
                const productId = path.split('/')[1];
                showProductDetail(productId);
            } else {
                document.querySelector('.products-page').style.display = 'block';
                document.getElementById('productDetailPage').style.display = 'none';
            }
        }

        // الأحداث
        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('load', initApp);
        