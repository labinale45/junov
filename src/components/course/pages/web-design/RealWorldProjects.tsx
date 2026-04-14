import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ecommerceCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopEase - Online Store</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #333; }
        
        /* Navigation */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .navbar .logo { font-size: 1.5rem; font-weight: bold; color: #e74c3c; }
        .navbar nav a {
            margin-left: 2rem;
            text-decoration: none;
            color: #333;
            font-weight: 500;
        }
        .cart-icon { position: relative; }
        .cart-count {
            position: absolute;
            top: -8px; right: -8px;
            background: #e74c3c;
            color: white;
            width: 20px; height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
        }
        
        /* Hero Banner */
        .hero-banner {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-align: center;
            padding: 5rem 2rem;
        }
        .hero-banner h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero-banner .btn-shop {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: white;
            color: #667eea;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 1rem;
        }
        
        /* Product Grid */
        .products { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
        .products h2 { text-align: center; margin-bottom: 2rem; font-size: 2rem; }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
        }
        .product-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s;
        }
        .product-card:hover { transform: translateY(-5px); }
        .product-card img { width: 100%; height: 250px; object-fit: cover; }
        .product-card .info { padding: 1.5rem; }
        .product-card .info h3 { margin-bottom: 0.5rem; }
        .product-card .info .price { color: #e74c3c; font-size: 1.3rem; font-weight: bold; }
        .product-card .info .rating { color: #f39c12; font-size: 0.9rem; }
        .btn-add {
            display: block;
            width: 100%;
            padding: 0.75rem;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
            border-radius: 6px;
        }
        .btn-add:hover { background: #555; }
        
        /* Footer */
        .footer {
            background: #1a1a1a;
            color: #aaa;
            padding: 3rem 2rem;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .footer h4 { color: white; margin-bottom: 1rem; }
        .footer a { color: #aaa; text-decoration: none; display: block; margin-bottom: 0.5rem; }
        .footer a:hover { color: white; }
        
        @media (max-width: 768px) {
            .hero-banner h1 { font-size: 2rem; }
            .navbar nav { display: none; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <span class="logo">ShopEase</span>
        <nav>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
        <div class="cart-icon">
            🛒 <span class="cart-count">3</span>
        </div>
    </nav>

    <section class="hero-banner">
        <h1>Spring Collection 2024</h1>
        <p>Up to 40% off on selected items</p>
        <a href="#" class="btn-shop">Shop Now</a>
    </section>

    <section class="products">
        <h2>Featured Products</h2>
        <div class="product-grid">
            <div class="product-card">
                <img src="https://picsum.photos/300/250?1" alt="Product">
                <div class="info">
                    <h3>Classic White Sneakers</h3>
                    <div class="rating">★★★★★ (128)</div>
                    <p class="price">$89.99</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>
            <div class="product-card">
                <img src="https://picsum.photos/300/250?2" alt="Product">
                <div class="info">
                    <h3>Leather Crossbody Bag</h3>
                    <div class="rating">★★★★☆ (94)</div>
                    <p class="price">$129.99</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>
            <div class="product-card">
                <img src="https://picsum.photos/300/250?3" alt="Product">
                <div class="info">
                    <h3>Minimalist Watch</h3>
                    <div class="rating">★★★★★ (203)</div>
                    <p class="price">$199.99</p>
                    <button class="btn-add">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-grid">
            <div><h4>ShopEase</h4><p>Your one-stop online store for quality products.</p></div>
            <div><h4>Quick Links</h4><a href="#">Home</a><a href="#">Shop</a><a href="#">About</a></div>
            <div><h4>Support</h4><a href="#">FAQ</a><a href="#">Shipping</a><a href="#">Returns</a></div>
            <div><h4>Contact</h4><p>info@shopease.com</p><p>+1 234 567 890</p></div>
        </div>
    </footer>
</body>
</html>`;

const businessCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrightPath Consulting</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #2d3436; }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 3rem;
            background: white;
            box-shadow: 0 1px 5px rgba(0,0,0,0.05);
        }
        .header .logo { font-size: 1.4rem; font-weight: bold; color: #0984e3; }
        .header nav a { margin-left: 2rem; text-decoration: none; color: #555; }
        .header .btn-cta {
            background: #0984e3; color: white;
            padding: 0.6rem 1.5rem; border-radius: 6px;
            text-decoration: none; margin-left: 2rem;
        }
        
        .hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            padding: 6rem 3rem;
            background: linear-gradient(135deg, #f8f9fa, #e8f4f8);
        }
        .hero h1 { font-size: 2.8rem; line-height: 1.2; margin-bottom: 1rem; }
        .hero p { color: #636e72; font-size: 1.1rem; margin-bottom: 2rem; }
        
        .services {
            padding: 5rem 3rem;
            text-align: center;
        }
        .services h2 { font-size: 2rem; margin-bottom: 3rem; }
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .service-card {
            padding: 2rem;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            transition: all 0.3s;
        }
        .service-card:hover {
            border-color: #0984e3;
            box-shadow: 0 5px 20px rgba(9,132,227,0.1);
        }
        .service-card .icon { font-size: 2.5rem; margin-bottom: 1rem; }
        
        .testimonials {
            background: #f8f9fa;
            padding: 5rem 3rem;
            text-align: center;
        }
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 2rem auto 0;
        }
        .testimonial {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .testimonial .stars { color: #f39c12; margin-bottom: 1rem; }
        .testimonial .author { font-weight: bold; margin-top: 1rem; }
        
        .contact-section {
            padding: 5rem 3rem;
            max-width: 600px;
            margin: 0 auto;
        }
        .contact-section h2 { text-align: center; margin-bottom: 2rem; }
        .contact-section form { display: grid; gap: 1rem; }
        .contact-section input, .contact-section textarea, .contact-section select {
            padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;
        }
        .contact-section button {
            background: #0984e3; color: white; border: none;
            padding: 1rem; font-size: 1rem; border-radius: 8px; cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .hero { grid-template-columns: 1fr; }
            .services-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header class="header">
        <span class="logo">BrightPath</span>
        <nav>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Team</a>
            <a href="#contact" class="btn-cta">Contact Us</a>
        </nav>
    </header>

    <section class="hero">
        <div>
            <h1>Grow Your Business With Expert Consulting</h1>
            <p>We help startups and enterprises streamline operations, boost revenue, and build sustainable growth strategies.</p>
            <a href="#contact" class="btn-cta" style="display:inline-block; padding:1rem 2rem; border-radius:8px; text-decoration:none;">Get Started</a>
        </div>
        <div style="text-align:center; font-size: 8rem;">📊</div>
    </section>

    <section class="services">
        <h2>Our Services</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="icon">💡</div>
                <h3>Strategy</h3>
                <p>Business planning, market analysis, competitive positioning</p>
            </div>
            <div class="service-card">
                <div class="icon">📈</div>
                <h3>Growth</h3>
                <p>Revenue optimization, marketing automation, customer retention</p>
            </div>
            <div class="service-card">
                <div class="icon">⚙️</div>
                <h3>Operations</h3>
                <p>Process improvement, workflow automation, team management</p>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <h2>What Our Clients Say</h2>
        <div class="testimonial-grid">
            <div class="testimonial">
                <div class="stars">★★★★★</div>
                <p>"BrightPath helped us increase revenue by 150% in just 6 months."</p>
                <p class="author">— Maria S., CEO of TechFlow</p>
            </div>
            <div class="testimonial">
                <div class="stars">★★★★★</div>
                <p>"Their strategy sessions completely transformed how we approach customers."</p>
                <p class="author">— David K., Founder of GreenLeaf</p>
            </div>
        </div>
    </section>

    <section class="contact-section" id="contact">
        <h2>Get In Touch</h2>
        <form>
            <input type="text" placeholder="Company Name" required>
            <input type="email" placeholder="Email" required>
            <select><option>Strategy Consulting</option><option>Growth Consulting</option><option>Operations</option></select>
            <textarea rows="4" placeholder="Tell us about your project"></textarea>
            <button type="submit">Send Inquiry</button>
        </form>
    </section>
</body>
</html>`;

const WebDesignRealWorldProjects = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Real-World Projects</h1>
          <p className="text-muted-foreground mt-1">Production-quality website projects with complete code.</p>
        </div>
        <Tabs defaultValue="ecommerce" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="ecommerce" className="text-xs">E-Commerce Storefront</TabsTrigger>
            <TabsTrigger value="business" className="text-xs">Business Website</TabsTrigger>
          </TabsList>
          <TabsContent value="ecommerce" className="space-y-6 mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">ShopEase — E-Commerce Storefront</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Sticky navigation with cart icon and count badge</li>
                  <li>Hero banner with promotional text and CTA</li>
                  <li>Product grid with images, ratings, prices, and &quot;Add to Cart&quot;</li>
                  <li>Responsive layout — single column on mobile</li>
                  <li>Multi-column footer with links and contact info</li>
                </ul>
              </CardContent>
            </Card>
            <CodeBlock code={ecommerceCode} />
          </TabsContent>
          <TabsContent value="business" className="space-y-6 mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">BrightPath — Business Consulting Website</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Professional header with navigation and CTA button</li>
                  <li>Two-column hero with headline and visual</li>
                  <li>Services grid with hover effects</li>
                  <li>Client testimonials section</li>
                  <li>Contact form with service selection dropdown</li>
                </ul>
              </CardContent>
            </Card>
            <CodeBlock code={businessCode} />
          </TabsContent>
        </Tabs>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignRealWorldProjects;
