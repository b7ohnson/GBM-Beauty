// Run with: node load-services.js
const https = require('https');

const services = {
  svc_001: { name: "Full Sew In",       price: "125+", category: "Extensions",  duration: 150, description: "Hair is braided down, wefts are sewn on from ear to ear, and a closure is added." },
  svc_002: { name: "Wig Install",        price: "125",  category: "Extensions",  duration: 120, description: "End to end wig installation. Hair braided, wig bonded in place, and secured with wig clips." },
  svc_003: { name: "Knotless Braids",    price: "140+", category: "Braids",      duration: 150, description: "Depends on size. We'll talk about what look you want and bring your braids to life." },
  svc_004: { name: "Box Braids",         price: "120+", category: "Braids",      duration: 240, description: "Depends on size. Protective and trendy, this braid style parts sections of hair in boxes." },
  svc_005: { name: "Marley Twist",       price: "140+", category: "Braids",      duration: 240, description: "" },
  svc_006: { name: "Cornrows",           price: "60+",  category: "Braids",      duration: 105, description: "Depends on size. Cornrows braid the hair close to the scalp for chic raised braids." },
  svc_007: { name: "Kid's Braids",       price: "60+",  category: "Braids",      duration: 120, description: "Braids for the little ones in your life." },
  svc_008: { name: "All Over Color",     price: "110",  category: "Color",       duration: 120, description: "Give your color a full reset with an all over color change." },
  svc_009: { name: "Color Correction",   price: "180",  category: "Color",       duration: 180, description: "Get your hair color back on track with a color correction." },
  svc_010: { name: "Root Touch Up",      price: "82",   category: "Color",       duration: 90,  description: "Clean up roots with a root touch up." },
  svc_011: { name: "Toner",              price: "67",   category: "Color",       duration: 60,  description: "Neutralize brassy color-treated hair with an all-over toner." },
  svc_012: { name: "Blowout",            price: "53",   category: "Styling",     duration: 60,  description: "Enjoy a wash, blow dry, and fresh-from-the-salon confidence." },
  svc_013: { name: "Updo",               price: "85",   category: "Styling",     duration: 90,  description: "Style your hair for an important event. Bring photos for a specific look." },
  svc_014: { name: "Loc Re-twist",       price: "70",   category: "Locs",        duration: 105, description: "Incorporate new hair growth and touch up existing twists for polished locs." },
  svc_015: { name: "Women's Cut",        price: "45+",  category: "Cuts",        duration: 45,  description: "Women's cut, detail and price may vary depending on hair type or length." },
  svc_016: { name: "Men's Cut",          price: "45",   category: "Cuts",        duration: 45,  description: "Carve shape and style into your hair with a fresh cut." },
  svc_017: { name: "Bang Trim",          price: "30",   category: "Cuts",        duration: 45,  description: "Add face-framing detail to your look with a bang trim." },
  svc_018: { name: "Individual Lashes",  price: "30",   category: "Lashes",      duration: 60,  description: "Lashes placed one by one for a full and natural look." },
  svc_019: { name: "Strip Lashes",       price: "20",   category: "Lashes",      duration: 15,  description: "We'll fit and apply your strip lashes." },
  svc_020: { name: "Eyebrow Wax",        price: "10",   category: "Waxing",      duration: 15,  description: "Define, shape, and maintain your brows." },
  svc_021: { name: "Consultation",       price: "10",   category: "General",     duration: 30,  description: "One on one consultation to evaluate your hair. Bring pictures!" },
};

const body = JSON.stringify(services);
const options = {
  hostname: 'gbm-beauty-platform-default-rtdb.firebaseio.com',
  path: '/config/services.json',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ All 21 services loaded into Firebase!');
    } else {
      console.log('❌ Error:', res.statusCode, data);
    }
  });
});

req.on('error', e => console.error('❌ Request failed:', e.message));
req.write(body);
req.end();
