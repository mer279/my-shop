let data = JSON.parse(localStorage.getItem('storeData')) || [];
let currentSectionId = null;

function render() {
    const grid = document.getElementById('items-grid');
    const title = document.getElementById('view-title');
    const backBtn = document.getElementById('back-btn');
    grid.innerHTML = "";

        if (currentSectionId === null) {
        title.innerText = "الأقسام الأساسية";
        backBtn.classList.add('hidden');
        if (document.getElementById('itemPrice')) document.getElementById('itemPrice').classList.add('hidden');
        data.forEach((section, index) => {
            createCard(section.name, section.image, () => openSection(section.id), index);
        });
    } else {
        const section = data.find(s => s.id === currentSectionId);
        title.innerText = `منتجات: ${section.name}`;
        backBtn.classList.remove('hidden');
        if (document.getElementById('itemPrice')) document.getElementById('itemPrice').classList.remove('hidden');
        section.products.forEach((prod, index) => {
            createCard(prod.name, prod.image, null, index, prod.price);
        });
    }

}

function createCard(name, imgSrc, onClick, index) {
    const grid = document.getElementById('items-grid');
    const card = document.createElement('div');
    card.className = 'card';
    
    // إذا لم تكن هناك صورة نضع صورة افتراضية
    const img = imgSrc || 'https://via.placeholder.com/150';
    
    card.innerHTML = `
        <button class="delete-btn" onclick="event.stopPropagation(); deleteItem(${index})">×</button>
        <img src="${img}">
        <div class="card-overlay" onclick="${onClick ? 'onClick()' : ''}">
            <h3>${name}</h3>
        </div>
    `;
    if(onClick) card.onclick = onClick;
    grid.appendChild(card);
}

async function addNewItem() {
    const name = document.getElementById('itemName').value;
    const fileInput = document.getElementById('itemImage');
    const priceInput = document.getElementById('itemPrice');
    const price = priceInput ? priceInput.value : "";
    if (!name) return alert("يرجى إدخال الاسم");
    if (currentSectionId !== null && !price) return alert("يرجى إدخال السعر للمنتج");

    let imageBase64 = "";
    if (fileInput.files[0]) {
        imageBase64 = await convertBase64(fileInput.files[0]);
    }

    if (currentSectionId === null) {
        data.push({ id: Date.now(), name: name, image: imageBase64, products: [] });
    } else {
        const section = data.find(s => s.id === currentSectionId);
        section.products.push({ id: Date.now(), name: name, image: imageBase64, price: price });
    }

    save();
    render();
    document.getElementById('itemName').value = "";
    fileInput.value = "";
    if (priceInput) priceInput.value = "";
}


function convertBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
    });
}

function openSection(id) { currentSectionId = id; render(); }
function goBack() { currentSectionId = null; render(); }
function save() { localStorage.setItem('storeData', JSON.stringify(data)); }

// جلب بيانات الهيدر الحالية لعرضها في خانة الاسم باللوحة
function loadStoreProfileAdmin() {
    const profile = JSON.parse(localStorage.getItem('storeProfile')) || { name: "", logo: "", status: "" };
    if(document.getElementById('storeNameInput')) document.getElementById('storeNameInput').value = profile.name;
}

// دالة حفظ بيانات الهيدر بالكامل (شعار، اسم، حالة)
async function saveStoreProfile() {
    const nameInput = document.getElementById('storeNameInput').value;
    const logoFile = document.getElementById('storeLogoInput').files[0];
    const statusFile = document.getElementById('storeStatusInput').files[0];
    
    let profile = JSON.parse(localStorage.getItem('storeProfile')) || { name: "متجر جديد", logo: "", status: "" };
    
    if (nameInput) profile.name = nameInput;
    if (logoFile) profile.logo = await convertBase64(logoFile);
    if (statusFile) profile.status = await convertBase64(statusFile);
    
    localStorage.setItem('storeProfile', JSON.stringify(profile));
    alert("تم تحديث إعدادات الهيدر بنجاح!");
    location.reload();
}

// دالة حذف الحالة الحالية فقط
function deleteStatus() {
    let profile = JSON.parse(localStorage.getItem('storeProfile')) || { name: "", logo: "", status: "" };
    profile.status = "";
    localStorage.setItem('storeProfile', JSON.stringify(profile));
    alert("تم حذف الحالة النشطة بنجاح!");
    location.reload();
}

// إدراج التعبئة التلقائية للبيانات عند الفتح
setTimeout(loadStoreProfileAdmin, 100);

function deleteItem(index) {
    if (currentSectionId === null) data.splice(index, 1);
    else data.find(s => s.id === currentSectionId).products.splice(index, 1);
    save(); render();
}

render();
