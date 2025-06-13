
        // التحكم في القائمة الجانبية
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const closeBtn = document.querySelector('.close-btn');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
        
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !e.target.closest('.menu-toggle')) {
                sidebar.classList.remove('active');
            }
        });
        
        // إغلاق القائمة عند تغيير حجم الشاشة
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
        });
        
        // بيانات المنتجات
        const products = [
            {
                id: 1,
                name: 'مكتب عصري',
                price: 880,
                description: 'مكتب عصري بتصميم أنيق مع مساحة تخزين واسعة. مثالي للمكاتب المنزلية والمكاتب الصغيرة.',
                images: [
                    'images/1.jpg',
                    'images/1.jpg',
                    'images/1.jpg'
                ],
                specs: {
                    المادة: 'خشب وزجاج',
                    الأبعاد: '160x80x75 سم',
                    الألوان: ['أبيض', 'بني']
                },
                category: 'كراسي',
                related: [2, 3]
            },
            {
                id: 2,
                name: 'طاولة مكتب زجاجية',
                price: 2200,
                description: 'طاولة مكتب زجاجية فاخرة مع قاعدة معدنية متينة. تصميم عصري وأنيق يناسب المكاتب التنفيذية.',
                images: [
                    'images/office-table.jpg',
                    'images/office-table.jpg',
                    'images/office-table.jpg'
                ],
                specs: {
                    المادة: 'زجاج وفولاذ',
                    الأبعاد: '180x90x75 سم',
                    الألوان: ['شفاف', 'أسود']
                },
                category: 'طاولات',
                related: [1, 3]
            },
            {
                id: 3,
                name: 'خزانة ملفات حديثة',
                price: 1500,
                description: 'خزانة ملفات حديثة بسعة كبيرة وأدراج متعددة. مثالية لتنظيم المستندات والملفات في المكتب.',
                images: [
                    'images/2.jpg',
                    'images/2.jpg',
                    'images/2.jpg'
                ],
                specs: {
                    المادة: 'خشب صناعي',
                    الأبعاد: '120x40x180 سم',
                    الألوان: ['أبيض', 'رمادي']
                },
                category: 'خزانات',
                related: [1, 2]
            },
            {
                id: 4,
                name: 'خزانة ملفات حديثة',
                price: 1500,
                description: 'خزانة ملفات حديثة بتصميم عصري ومتانة عالية. مثالية لتنظيم المستندات والملفات في المكتب.',
                images: [
                    'images/3.jpg',
                    'images/3.jpg',
                    'images/3.jpg'
                ],
                specs: {
                    المادة: 'خشب ومعدن',
                    الأبعاد: '100x35x170 سم',
                    الألوان: ['بني', 'أسود']
                },
                category: 'خزانات',
                related: [1, 2]
            }
        ];

        // تهيئة التطبيق
        document.addEventListener('DOMContentLoaded', () => {
            const productsContainer = document.getElementById('productsContainer');
            const productDetailPage = document.getElementById('productDetailPage');
            const productDetailContent = document.getElementById('productDetailContent');
            const backButton = document.getElementById('backButton');
            
            // تهيئة التطبيق
            initApp();
            
            function initApp() {
                renderProducts();
                handleRouting();
            }

            // عرض المنتجات
            function renderProducts() {
                productsContainer.innerHTML = products.map(product => `
                    <div class="product-card" data-id="${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <span class="product-price">${product.price} درهم</span>
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
                productDetailContent.innerHTML = `
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
                    <div class="product-info-detail">
                        <h1>${product.name}</h1>
                        <div class="product-price-detail">${product.price} درهم</div>
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
                productDetailPage.style.display = 'block';
                addRelatedProductsListeners();
            }

            // تغيير الصورة الرئيسية
            window.changeMainImage = function(src, element) {
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
                                        <span class="product-price">${product.price} درهم</span>
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
            window.addToCart = function(productId) {
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
                    productDetailPage.style.display = 'none';
                }
            }

            // زر العودة
            backButton.addEventListener('click', () => {
                window.history.back();
            });

            // الأحداث
            window.addEventListener('hashchange', handleRouting);
        });
    