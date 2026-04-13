# Mini-Commerce Template

Simple HTML/CSS/JS storefront template with WhatsApp ordering.  
Use this as a base for client projects.

---

## Live Demo
https://your-demo-link.com

---

## What to Change Per Client

### 1. Business Name
Update:
- `nav-logo` (HTML)
- `buildMessage()` greeting (JS)

Example:
"Adaeze Wigs"

---

### 2. Phone Number (WhatsApp)
In `sendToWhatsApp()`:

const phone = "2348098765432";

- Must include country code  
- No spaces or symbols  

---

### 3. Products
Update the `products` array:

const products = [
  {
    name: "Straight Lace Wig",
    price: "₦120,000",
    img: "👱‍♀️"
  }
];

Change:
- Name  
- Price  
- Image  

---

### 4. Colors (Branding)
In CSS:

:root {
  --rose: #e11d48;
  --rose-lt: #fecdd3;
}

Replace with client brand colors.

---

## Images (Optional)

1. Create `images/` folder  
2. Add images  
3. Update product:

img: "images/straight-lace.jpg"

---

## How Images Work

- Emoji → renders as text  
- File path → renders as <img> automatically  

---

## Structure

index.html  
style.css  
script.js  
images/
