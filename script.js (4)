const list = document.querySelectorAll('.list');
const indicator = document.querySelector('.indicator');
const centerIcon = document.getElementById('center-icon');

// متغيرات التحكم بالوقت للحالة
let statusTimeout;
let statusInterval;

// دالة تهيئة الهيدر وقراءة بيانات المتجر والحالة
function initStoreHeader() {
    const profile = JSON.parse(localStorage.getItem('storeProfile')) || { name: "اسم المتجر", logo: "", status: "" };
    
    if(document.getElementById('storeBrandName')) document.getElementById('storeBrandName').innerText = profile.name;
    if(profile.logo && document.getElementById('storeLogo')) document.getElementById('storeLogo').src = profile.logo;
    
    const logoRing = document.getElementById('logoRing');
    if(profile.status && logoRing) {
        logoRing.classList.add('active-status');
    } else if(logoRing) {
        logoRing.classList.remove('active-status');
    }
}

// دالة تشغيل وعرض الحالة عند الضغط على الدائرة
function viewStatus() {
    const profile = JSON.parse(localStorage.getItem('storeProfile')) || {};
    if (!profile.status) return; // إذا لم يرفع الأدمن حالة فلن يحدث شيء

    const modal = document.getElementById('statusModal');
    const img = document.getElementById('statusImage');
    const progress = document.getElementById('statusProgress');
    
    img.src = profile.status;
    modal.classList.remove('hidden');
    
    // إدارة حركة شريط التقدم (مدته 5 ثوانٍ)
    progress.style.width = '0%';
    let startTime = Date.now();
    clearInterval(statusInterval);
    
    statusInterval = setInterval(() => {
        let passed = Date.now() - startTime;
        let percent = Math.min((passed / 5000) * 100, 100);
        progress.style.width = percent + '%';
        if(percent >= 100) clearInterval(statusInterval);
    }, 30);

    // إغلاق تلقائي بعد 5 ثوانٍ
    clearTimeout(statusTimeout);
    statusTimeout = setTimeout(() => {
        closeStatus();
    }, 5000);
}

// دالة إغلاق شاشة الحالة
function closeStatus() {
    const modal = document.getElementById('statusModal');
    if(modal) modal.classList.add('hidden');
    clearInterval(statusInterval);
    clearTimeout(statusTimeout);
}

// تشغيل التهيئة عند بدء تحميل الصفحة
setTimeout(initStoreHeader, 50);

const centerText = document.getElementById('center-text');
const displayBox = document.getElementById('display-box');

if (!document.getElementById('dynamic-grid')) {
    const gridDiv = document.createElement('div');
    gridDiv.id = 'dynamic-grid';
    displayBox.appendChild(gridDiv);
}
function moveUI(element) {
    const itemLeft = element.offsetLeft;
    indicator.style.left = `${itemLeft}px`;

    const iconName = element.getAttribute('data-icon');
    const textName = element.getAttribute('data-text');
    
    displayBox.style.opacity = "0";
    displayBox.style.transform = "scale(0.8)";
    setTimeout(() => {
    centerIcon.setAttribute('name', iconName);
    centerText.innerText = textName;
    
        const gridDiv = document.getElementById('dynamic-grid');
            if (textName === "الرئيسية") {
        loadSections();
    // ... الكود السابق
    } else if (textName === "الدردشة") {
        loadChat(); 
    } else if (textName === "مصمم الهداياء") {
        loadGiftDesigner(); // استدعاء الوظيفة الجديدة
        // ... الكود السابق داخل الدالة ...
    } else if (textName === "حسب الطلب") {
        loadCustomOrder(); 
    } 
    // أضف هذا الجزء الجديد هنا فقط 👇
    else if (textName === "السلة") {
        loadCart(); 
    } 
    // نهاية الجزء الجديد 👆
    else {
        // ... الكود اللاحق ...

        centerIcon.style.display = "block";

        centerText.style.display = "block";
        if (gridDiv) gridDiv.innerHTML = "";
    }

    displayBox.style.opacity = "1";
    displayBox.style.transform = "scale(1)";
}, 250);
}



// وظيفة جلب الأقسام من لوحة التحكم
function loadSections() {
    const data = JSON.parse(localStorage.getItem('storeData')) || [];
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = "";
    
    // إخفاء الأيقونة الكبيرة والنص الرئيسي لتوفير مساحة للشبكة
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    data.forEach(section => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
    <img src="${section.image || 'https://via.placeholder.com/150'}" class="card-img">
    <div class="card-name">${section.name}</div>
`;


        grid.appendChild(card);
    });
}

// وظيفة جلب المنتجات داخل القسم
// وظيفة لجلب المنتجات وصورها عند الدخول للقسم (التعديل الصحيح)
function loadProducts(sectionId) {
    const data = JSON.parse(localStorage.getItem('storeData')) || [];
    const section = data.find(s => s.id === sectionId);
    const grid = document.getElementById('dynamic-grid');

    // مسح الشبكة وإضافة زر الرجوع
    grid.innerHTML = `<button class="back-btn" onclick="loadSections()">← عودة للأقسام</button><div style="width:100%; height:0; grid-column: span 2;"></div>`;

            if (section && section.products) {
            // عرض كافة المنتجات المضافة في هذا القسم
            section.products.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${prod.image || 'https://via.placeholder.com/150'}" class="card-img">
            
                    <div class="card-info" style="display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 10px;">
                        <span style="font-weight: bold; color: white;">${prod.name}</span>
                        ${prod.price ? `<span style="color: #ff4d44; font-weight: bold;">${prod.price} ر.س</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${prod.name}', '${prod.price || 0}', '${prod.image || ''}', this)" style="margin-bottom: 15px; background: var(--accent); color: white; border: none; padding: 8px 15px; border-radius: 20px; font-weight: bold; display: flex; align-items: center; gap: 5px; cursor: pointer; transition: 0.2s;">
                        <span class="button-text">إضافة للسلة</span>
                        <ion-icon name="cart-outline"></ion-icon>
                    </button>
                `;
                grid.appendChild(card);
            });
        }

}


// باقي كود التنقل الأصلي كما هو
function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    moveUI(this);
}

list.forEach((item) => item.addEventListener('click', activeLink));

window.addEventListener('load', () => {
    const activeItem = document.querySelector('.list.active');
    moveUI(activeItem);
});
// مثال لكيفية تصميم كروت المنتجات داخل دالة الصفحة الرئيسية
// وظيفة جلب الأقسام من لوحة التحكم وعرضها ديناميكياً
function loadSections() {
    const data = JSON.parse(localStorage.getItem('storeData')) || [];
    const grid = document.getElementById('dynamic-grid');
    if (!grid) return;
    
    grid.innerHTML = "";
    
    // إخفاء الأيقونة الكبيرة والنص الرئيسي لتوفير مساحة للشبكة
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    if (data.length === 0) {
        grid.innerHTML = `<div style="text-align:center; width:100%; color:var(--text); padding:20px;">لا توجد أقسام مضافة حالياً ✨</div>`;
        return;
    }

    data.forEach(section => {
        const card = document.createElement('div');
        card.className = 'category-card';
        // إضافة حدث onclick لفتح المنتجات الخاصة بهذا القسم عند النقر عليه
        card.onclick = () => loadProducts(section.id);
        card.innerHTML = `
            <img src="${section.image || 'https://via.placeholder.com/150'}" class="card-img">
            <div class="card-name">${section.name}</div>
        `;
        grid.appendChild(card);
    });
}



// ابحث عن هذا الجزء داخل دالة loadProducts وقم بتحديث الزر:
card.innerHTML = `
    <img src="${prod.image || 'https://via.placeholder.com/150'}" class="card-img">
    <div class="card-info"><span>${prod.name}</span></div>
    <button class="add-to-cart-btn" onclick="addToCart('${prod.name}', '${prod.image}', this)"> 
        <span class="button-text">إضافة للسلة</span>
        <ion-icon name="cart-outline"></ion-icon>
    </button>
`;
// لاحظ إضافة "this" في الأعلى ليرتبط الأنميشن بنفس الزر الذي ضغطت عليه



function loadChat() {
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = ""; 
    
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    const wrapper = document.createElement('div');
    wrapper.className = 'social-wrapper';

    // قائمة البيانات المحدثة
    const contacts = [
        { name: "أنستجرام", icon: "logo-instagram", colorClass: "instagram-bg", link: "https://instagram.com/YOUR_USER" },
        { name: "تيك توك", icon: "logo-tiktok", colorClass: "tiktok-bg", link: "https://tiktok.com/@YOUR_USER" },
        { name: "المدير", icon: "person-circle-outline", colorClass: "whatsapp-bg", link: "https://wa.me/966000000000" },
        { name: "مندوبة المبيعات", icon: "woman-outline", colorClass: "whatsapp-bg", link: "https://wa.me/966000000000" },
        { name: "مندوبة المشتريات", icon: "bag-handle-outline", colorClass: "whatsapp-bg", link: "https://wa.me/966000000000" },
        { name: "حسب الطلب", icon: "clipboard-outline", colorClass: "whatsapp-bg", link: "https://wa.me/966000000000" },
        { name: "مصمم الهدايا", icon: "gift-outline", colorClass: "whatsapp-bg", link: "https://wa.me/966000000000" }
    ];

    contacts.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'social-item';
        itemDiv.innerHTML = `
            <div class="icon ${item.colorClass}">
                <ion-icon name="${item.icon}"></ion-icon>
            </div>
            <span>${item.name}</span>
        `;
        
        itemDiv.onclick = () => window.open(item.link, '_blank');
        wrapper.appendChild(itemDiv);
    });

    grid.appendChild(wrapper);
}
// --- وظيفة عرض قسم "حسب الطلب" ---
function loadCustomOrder() {
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = ""; // مسح المحتوى القديم من الشاشة
    
    // إخفاء الأيقونة المنتصف
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    // إنشاء حاوية القسم الجديد
    const container = document.createElement('div');
    container.className = 'custom-order-wrapper'; // نربطها بالتنسيق والأنيميشن في CSS

    // إضافة مربع النص وزر الطلب
    // استخدمنا onfocus و onblur لإخفاء وإظهار النص الترحيبي بذكاء عند النقر
    container.innerHTML = `
        <div class="custom-input-box">
            <textarea id="custom-text" placeholder="صِف قطعة أحلامك.. ودع الباقي علينا ✨" onfocus="this.placeholder=''" onblur="this.placeholder='صِف قطعة أحلامك.. ودع الباقي علينا ✨'"></textarea>
        </div>
        <button class="order-submit-btn" onclick="sendToWhatsApp()">
            <ion-icon name="logo-whatsapp"></ion-icon>
            أطلب الآن
        </button>
    `;

    grid.appendChild(container); // عرض العناصر على الشاشة
}

// --- وظيفة إرسال الطلب إلى الواتساب ---
function sendToWhatsApp() {
    const text = document.getElementById('custom-text').value;
    const phoneNumber = "966500000000"; // ⚠️ تنبيه: ضع رقم الواتساب الخاص بك هنا (مع رمز الدولة بدون أصفار أو +)

    // التحقق من أن العميل كتب شيئاً قبل الإرسال
    if (text.trim() === "") {
        alert("يرجى وصف طلبك أولاً قبل الإرسال ✨");
        return; // إيقاف العملية إذا كان المربع فارغاً
    }

    // تجهيز النص وتشفيره ليتناسب مع رابط الواتساب (يحول المسافات لرموز يفهمها المتصفح)
    const message = encodeURIComponent("طلب جديد (حسب الطلب):\n\n" + text);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank'); // فتح نافذة الواتساب
}
// وظيفة عرض قسم "مصمم الهدايا"
function loadGiftDesigner() {
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = ""; 
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    const container = document.createElement('div');
    container.className = 'gift-designer-wrapper';

    container.innerHTML = `
        <div class="gift-main-box">
            <div class="gift-icon-header">
                <ion-icon name="gift"></ion-icon>
            </div>
            <div class="gift-input-group">
                <input type="text" id="gift-target" placeholder="ماذا تريد أن تهدي؟" onfocus="this.placeholder=''" onblur="this.placeholder='ماذا تريد أن تهدي؟'">
                <textarea id="gift-details" placeholder="صِف تفاصيل الهدية.. (الألوان، المناسبة، الميزانية)" onfocus="this.placeholder=''" onblur="this.placeholder='صِف تفاصيل الهدية.. (الألوان، المناسبة، الميزانية)'"></textarea>
            </div>
        </div>
        <button class="gift-submit-btn" onclick="sendGiftToWhatsApp()">
            <ion-icon name="logo-whatsapp"></ion-icon>
            إرسال التصميم للمنسق
        </button>
    `;
    grid.appendChild(container);
}

// إرسال الطلب للواتساب
function sendGiftToWhatsApp() {
    const target = document.getElementById('gift-target').value;
    const details = document.getElementById('gift-details').value;
    const phoneNumber = "966500000000"; // استبدله برقمك

    if (target.trim() === "" || details.trim() === "") {
        alert("يرجى كتابة ما تريد إهداؤه ووصف الهدية ✨");
        return;
    }

    const message = encodeURIComponent(`🎁 *طلب تصميم هدية جديد*:\n\n*الهدية:* ${target}\n*التفاصيل:* ${details}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}
// =========================================
// وظائف إدارة "السلة" والتحكم بالبيانات
// =========================================

function addToCart(name, price, image, btn) {
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    
    // التحقق إذا كان المنتج مضافاً مسبقاً لتحديث الكمية فقط
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // إضافة المنتج الجديد بالسعر الممرر من الزر
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cartData', JSON.stringify(cart));
    
    // حركة بصرية لتأكيد الإضافة على الزر نفسه
    if (btn) {
        const originalText = btn.querySelector('.button-text').innerText;
        btn.querySelector('.button-text').innerText = "تمت الإضافة! ✓";
        btn.style.background = "#25D366"; // يتحول للون الأخضر مؤقتاً
        setTimeout(() => {
            btn.querySelector('.button-text').innerText = originalText;
            btn.style.background = ""; // يعود للون الأصلي
        }, 1200);
    }
}


// 2. وظيفة بناء وعرض واجهة السلة داخل الشبكة الديناميكية
function loadCart() {
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = ""; // تصفية الشاشة القديمة
    
    centerIcon.style.display = "none";
    centerText.style.display = "none";

    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    const container = document.createElement('div');
    container.className = 'cart-wrapper';

    // حالة السلة فارغة
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-msg">
                <ion-icon name="basket-outline" style="font-size: 4rem; color: var(--accent); margin-bottom: 10px;"></ion-icon>
                <p>سلتك فارغة حالياً.. املأها بالمنتجات الرائعة ✨</p>
            </div>
        `;
        grid.appendChild(container);
        return;
    }

    let cartItemsHTML = '';
    let totalOrderPrice = 0;

    // بناء قائمة المنتجات المضافة وحساب الإجمالي
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalOrderPrice += itemTotal;

        cartItemsHTML += `
            <div class="cart-item-row">
                <img src="${item.image || 'https://via.placeholder.com/150'}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ر.س</div>
                </div>
                <div class="cart-qty-controls">
                    <button class="cart-qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    <span class="cart-qty-num">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="changeQty(${index}, -1)">-</button>
                </div>
                <button class="cart-del-btn" onclick="removeFromCart(${index})">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </div>
        `;
    });

    // دمج محتويات السلة مع الفاتورة وزر الواتساب
    container.innerHTML = `
        <div class="cart-items-list">
            ${cartItemsHTML}
        </div>
        <div class="cart-total-box">
            <span class="cart-total-title">إجمالي الحساب:</span>
            <span class="cart-total-value">${totalOrderPrice} ر.س</span>
        </div>
        <button class="cart-checkout-btn" onclick="sendCartToWhatsApp()">
            <ion-icon name="logo-whatsapp"></ion-icon>
            إرسال الطلب عبر الواتساب
        </button>
    `;

    grid.appendChild(container);
}

// 3. التحكم بالكميات (زيادة / نقصان) تلقائياً
function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // الحذف المباشر عند وصول الكمية لـ 0
        }
        localStorage.setItem('cartData', JSON.stringify(cart));
        loadCart(); // إعادة إنعاش الشاشة لتحديث الأرقام فوراً
    }
}

// 4. دالة حذف منتج بالكامل من السلة عبر سلة المهملات
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cartData', JSON.stringify(cart));
    loadCart();
}

// 5. تحويل الفاتورة بالكامل لنص منسق مجهز للواتساب
function sendCartToWhatsApp() {
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cart.length === 0) return;

    const phoneNumber = "966500000000"; // ⚠️ ضع رقم الواتساب الخاص بك هنا بدون أصفار أو علامة +
    let message = "🛒 *طلب شراء جديد من السلة*:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. *${item.name}*\n`;
        message += `   الكمية: ${item.quantity} | السعر: ${itemTotal} ر.س\n\n`;
    });

    message += `\n💰 *الإجمالي الكلي للفاتورة:* ${total} ر.س`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
