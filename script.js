/* =========================
   WhatsApp
========================= */

const phoneNumber = "218915371573";


/* =========================
   منتجات روستن
========================= */

const products = {

    smoothie: [

        {
            id: "strawberry-smoothie",
            name: "سموثي فراولة مزين",
            description: "سموثي فراولة طازجة بتزيين خاص",
            price: 10,
            image: "images/strawberry-smoothie.jpg"
        },

        {
            id: "mango-smoothie",
            name: "سموثي مانجو مزين",
            description: "سموثي مانجو طازج بتزيين خاص",
            price: 12,
            image: "images/mango-smoothie.jpg"
        }

    ],


    fresh: [

        {
            id: "mango",
            name: "مانجو عادي",
            description: "عصير مانجو طازج",
            price: 8,
            image: "images/mango.jpg"
        },

        {
            id: "strawberry",
            name: "فراولة عادي",
            description: "عصير فراولة طازجة",
            price: 7,
            image: "images/strawberry.jpg"
        },

        {
            id: "strawberry-special",
            name: "فراولة مزين",
            description: "عصير فراولة بتزيين خاص",
            price: 8,
            image: "images/strawberry-special.jpg"
        },

        {
            id: "mango-special",
            name: "مانجو مزين",
            description: "عصير مانجو بتزيين خاص",
            price: 9,
            image: "images/mango-special.jpg"
        }

    ],


    mojito: [

        {
            id: "mojito-normal",
            name: "موحيتو عادي",
            description: "موحيتو منعش",
            price: 10,
            image: "images/mojito-normal.jpg"
        },

        {
            id: "mojito-special",
            name: "موخيتو مزين",
            description: "موخيتو بتزيين خاص",
            price: 12,
            image: "images/mojito-special.jpg"
        }

    ],


    special: [

        {
            id: "three-layers",
            name: "3 طبقات مزين",
            description: "مشروب ثلاث طبقات بتزيين خاص",
            price: 12,
            image: "images/three-layers.jpg"
        }

    ],


    nescafe: [

        {
            id: "nescafe-normal",
            name: "نسكافيه عادي",
            description: "نسكافيه",
            price: 5,
            image: "images/nescafe-normal.jpg"
        },

        {
            id: "nescafe-special",
            name: "نسكافيه مزين",
            description: "نسكافيه بتزيين خاص",
            price: 7,
            image: "images/nescafe-special.jpg"
        }

    ],


    custom: [

        {
            id: "serum",
            name: "إضافة سيروم",
            description: "إضافة حسب الطلب",
            price: null,
            image: "images/serum.jpg"
        },

        {
            id: "custom-juice",
            name: "عصير على حسب الطلب",
            description: "اختر العصير والمكونات حسب رغبتك",
            price: null,
            image: "images/custom-juice.jpg"
        }

    ]

};


/* =========================
   السلة
========================= */

let cart = [];


/* =========================
   عرض التصنيف
========================= */

function showCategory(category) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    products[category].forEach(product => {

        const productElement =
            document.createElement("div");

        productElement.className = "product";

        const priceText =
            product.price !== null
                ? `${product.price} LYD`
                : "حسب الطلب";

        productElement.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="price">
                    ${priceText}
                </div>

                <button
                    type="button"
                    onclick="addToCart('${product.id}')">

                    إضافة للطلب

                </button>

            </div>

        `;

        container.appendChild(productElement);

    });

}


/* =========================
   البحث عن المنتج
========================= */

function findProduct(productId) {

    for (const category in products) {

        const product =
            products[category].find(
                item => item.id === productId
            );

        if (product) {

            return product;

        }

    }

    return null;

}


/* =========================
   إضافة للسلة
========================= */

function addToCart(productId) {

    const product =
        findProduct(productId);

    if (!product) {

        return;

    }

    const existingProduct =
        cart.find(
            item => item.id === productId
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCart();

}


/* =========================
   زيادة الكمية
========================= */

function increaseQuantity(productId) {

    const product =
        cart.find(
            item => item.id === productId
        );

    if (!product) {

        return;

    }

    product.quantity++;

    updateCart();

}


/* =========================
   تقليل الكمية
========================= */

function decreaseQuantity(productId) {

    const product =
        cart.find(
            item => item.id === productId
        );

    if (!product) {

        return;

    }

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }

    updateCart();

}


/* =========================
   تحديث السلة
========================= */

function updateCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("total");

    if (cart.length === 0) {

        container.innerHTML =
            "لا توجد منتجات";

        totalElement.textContent =
            "0";

        return;

    }

    container.innerHTML = "";

    let total = 0;

    let hasCustomPrice = false;


    cart.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        if (product.price !== null) {

            const productTotal =
                product.price *
                product.quantity;

            total += productTotal;

            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <div>
                        ${product.price} LYD × ${product.quantity}
                    </div>

                </div>


                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="decreaseQuantity('${product.id}')">

                        −

                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity('${product.id}')">

                        +

                    </button>

                </div>


                <strong>
                    ${productTotal} LYD
                </strong>

            `;

        } else {

            hasCustomPrice = true;

            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <div>
                        حسب الطلب × ${product.quantity}
                    </div>

                </div>


                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="decreaseQuantity('${product.id}')">

                        −

                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity('${product.id}')">

                        +

                    </button>

                </div>


                <strong>
                    حسب الطلب
                </strong>

            `;

        }


        container.appendChild(item);

    });


    if (hasCustomPrice) {

        totalElement.textContent =
            `${total} + حسب الطلب`;

    } else {

        totalElement.textContent =
            total;

    }

}


/* =========================
   الانتقال للمنيو
========================= */

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* =========================
   إرسال الطلب WhatsApp
========================= */

function sendOrder() {

    if (cart.length === 0) {

        alert(
            "يرجى اختيار العصائر أولاً"
        );

        return;

    }


    const customerName =
        document
            .getElementById("customer-name")
            .value
            .trim();


    const customerPhone =
    document
        .getElementById("customer-phone")
        .value
        .trim();


    const notes =
        document
            .getElementById("order-notes")
            .value
            .trim();


    if (!customerPhone) {

    alert(
        "يرجى إدخال رقم الهاتف"
    );

    return;

}


    let message =
    "🍹 طلب جديد من روستن\n\n" +
    "🔢 رقم الطلب: " +
    window.currentOrderNumber +
    "\n\n";


    if (customerName) {

        message +=
            "👤 الاسم: " +
            customerName +
            "\n";

    }


    message +=
    "📱 رقم الهاتف: " +
    customerPhone +
    "\n\n";


    message +=
        "🧾 الطلب:\n";


    let total = 0;

    let hasCustomPrice = false;


    cart.forEach(product => {

        if (product.price !== null) {

            const productTotal =
                product.price *
                product.quantity;

            total += productTotal;

            message +=
                "• " +
                product.name +
                " × " +
                product.quantity +
                " = " +
                productTotal +
                " LYD\n";

        } else {

            hasCustomPrice = true;

            message +=
                "• " +
                product.name +
                " × " +
                product.quantity +
                " = حسب الطلب\n";

        }

    });


    message +=
        "\n💰 الإجمالي: " +
        total +
        " LYD";


    if (hasCustomPrice) {

        message +=
            " + منتجات حسب الطلب";

    }


    if (notes) {

        message +=
            "\n\n📝 ملاحظات:\n" +
            notes;

    }


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;

}
/* =========================
   رقم الطلب
========================= */

function generateOrderNumber() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    const randomNumber =
        Math.floor(1000 + Math.random() * 9000);

    return `RO-${year}${month}${day}-${randomNumber}`;

}


/* =========================
   فتح تأكيد الطلب
========================= */

function openOrderConfirmation() {

    if (cart.length === 0) {

        alert(
            "يرجى اختيار العصائر أولاً"
        );

        return;

    }

    const customerPhone =
        document
            .getElementById("customer-phone")
            .value
            .trim();

    if (!customerPhone) {

        alert(
            "يرجى إدخال رقم الهاتف"
        );

        document
            .getElementById("customer-phone")
            .focus();

        return;

    }

    const orderNumber =
        generateOrderNumber();

    window.currentOrderNumber =
        orderNumber;


    const confirmationNumber =
        document.getElementById(
            "confirmation-order-number"
        );

    confirmationNumber.textContent =
        orderNumber;


    const container =
        document.getElementById(
            "confirmation-items"
        );

    container.innerHTML = "";

    let total = 0;
    let hasCustomPrice = false;


    cart.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "confirmation-item";


        if (product.price !== null) {

            const productTotal =
                product.price *
                product.quantity;

            total += productTotal;


            item.innerHTML = `

                <div class="confirmation-item-info">

                    <div class="confirmation-item-name">
                        ${product.name}
                    </div>

                    <div class="confirmation-item-quantity">
                        ${product.price} LYD × ${product.quantity}
                    </div>

                </div>

                <div class="confirmation-item-price">
                    ${productTotal} LYD
                </div>

            `;

        } else {

            hasCustomPrice = true;

            item.innerHTML = `

                <div class="confirmation-item-info">

                    <div class="confirmation-item-name">
                        ${product.name}
                    </div>

                    <div class="confirmation-item-quantity">
                        حسب الطلب × ${product.quantity}
                    </div>

                </div>

                <div class="confirmation-item-price">
                    حسب الطلب
                </div>

            `;

        }


        container.appendChild(item);

    });


    const totalElement =
        document.getElementById(
            "confirmation-total"
        );


    if (hasCustomPrice) {

        totalElement.textContent =
            `${total} LYD + حسب الطلب`;

    } else {

        totalElement.textContent =
            `${total} LYD`;

    }


    document
        .getElementById("order-confirmation")
        .style.display = "flex";

}


/* =========================
   إغلاق التأكيد
========================= */

function closeOrderConfirmation() {

    document
        .getElementById("order-confirmation")
        .style.display = "none";

}


/* =========================
   تأكيد وإرسال الطلب
========================= */

function confirmAndSendOrder() {

    closeOrderConfirmation();

    sendOrder();

}


/* =========================
   تشغيل الموقع
========================= */

showCategory("smoothie");

updateCart();
updateFloatingCart();

/* =========================
   زر WhatsApp
========================= */

const whatsappButton =
    document.getElementById(
        "whatsapp-button"
    );


whatsappButton.addEventListener(
    "click",
    openOrderConfirmation
);
/* =========================
   السلة العائمة
========================= */

function updateFloatingCart() {

    const floatingCart =
        document.getElementById(
            "floating-cart"
        );

    const floatingText =
        document.getElementById(
            "floating-cart-text"
        );


    if (!floatingCart) {
        return;
    }


    if (cart.length === 0) {

        floatingCart.style.display =
            "none";

        return;
    }


    let totalItems = 0;

    let totalPrice = 0;

    let hasCustomPrice = false;


    cart.forEach(product => {

        totalItems +=
            product.quantity;


        if (product.price !== null) {

            totalPrice +=
                product.price *
                product.quantity;

        } else {

            hasCustomPrice = true;

        }

    });


    let text =
        `طلبك · ${totalItems} منتجات`;


    if (hasCustomPrice) {

        text +=
            ` · ${totalPrice} LYD + حسب الطلب`;

    } else {

        text +=
            ` · ${totalPrice} LYD`;

    }


    floatingText.textContent =
        text;


    floatingCart.style.display =
        "block";
}


/* =========================
   الانتقال للسلة
========================= */

function scrollToCart() {

    document
        .querySelector(".cart")
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}
function searchProducts() {

    const search =
        document
            .getElementById("search-input")
            .value
            .trim()
            .toLowerCase();

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    if (!search) {

        showCategory("smoothie");

        return;
    }

    let results = [];

    for (const category in products) {

        products[category].forEach(product => {

            const name =
                product.name.toLowerCase();

            const description =
                product.description.toLowerCase();

            if (
                name.includes(search) ||
                description.includes(search)
            ) {

                results.push(product);

            }

        });

    }


    if (results.length === 0) {

        container.innerHTML = `
            <p style="
                text-align:center;
                grid-column:1/-1;
                padding:30px;
                color:#777;
            ">
                لا يوجد منتج بهذا الاسم
            </p>
        `;

        return;
    }


    results.forEach(product => {

        const productElement =
            document.createElement("div");

        productElement.className =
            "product";

        const priceText =
            product.price !== null
                ? `${product.price} LYD`
                : "حسب الطلب";

        productElement.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="price">
                    ${priceText}
                </div>

                <button
                    type="button"
                    onclick="addToCart('${product.id}')">

                    إضافة للطلب

                </button>

            </div>

        `;

        container.appendChild(productElement);

    });
}