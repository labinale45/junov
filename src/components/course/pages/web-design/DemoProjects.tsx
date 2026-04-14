import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    features: ["Hero section with name & title", "About me section", "Skills grid", "Projects showcase", "Contact form", "Responsive design"],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarah's Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #333; }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 2rem;
        }
        .hero h1 { font-size: 3rem; margin-bottom: 0.5rem; }
        .hero p { font-size: 1.2rem; opacity: 0.9; }
        
        /* Skills Grid */
        .skills {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            padding: 4rem 2rem;
            max-width: 900px;
            margin: 0 auto;
        }
        .skill-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            transition: transform 0.3s;
        }
        .skill-card:hover { transform: translateY(-5px); }
        .skill-card h3 { margin-bottom: 0.5rem; }
        .skill-bar {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
        }
        .skill-bar-fill {
            height: 100%;
            background: linear-gradient(to right, #667eea, #764ba2);
            border-radius: 4px;
        }
        
        /* Projects Section */
        .projects {
            background: #f8f9fa;
            padding: 4rem 2rem;
        }
        .projects h2 { text-align: center; margin-bottom: 2rem; }
        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }
        .project-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .project-card img { width: 100%; height: 200px; object-fit: cover; }
        .project-card .info { padding: 1.5rem; }
        
        /* Contact Form */
        .contact {
            max-width: 600px;
            margin: 4rem auto;
            padding: 0 2rem;
        }
        .contact input, .contact textarea {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        .contact button {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Sarah Johnson</h1>
        <p>Web Designer & Frontend Developer</p>
    </section>

    <section class="skills">
        <div class="skill-card">
            <h3>HTML5</h3>
            <div class="skill-bar"><div class="skill-bar-fill" style="width: 95%"></div></div>
        </div>
        <div class="skill-card">
            <h3>CSS3</h3>
            <div class="skill-bar"><div class="skill-bar-fill" style="width: 90%"></div></div>
        </div>
        <div class="skill-card">
            <h3>JavaScript</h3>
            <div class="skill-bar"><div class="skill-bar-fill" style="width: 75%"></div></div>
        </div>
        <div class="skill-card">
            <h3>Responsive Design</h3>
            <div class="skill-bar"><div class="skill-bar-fill" style="width: 88%"></div></div>
        </div>
    </section>

    <section class="projects">
        <h2>My Projects</h2>
        <div class="project-grid">
            <div class="project-card">
                <img src="https://picsum.photos/400/200?1" alt="Project 1">
                <div class="info">
                    <h3>Restaurant Website</h3>
                    <p>A responsive restaurant site with menu and reservations.</p>
                </div>
            </div>
            <div class="project-card">
                <img src="https://picsum.photos/400/200?2" alt="Project 2">
                <div class="info">
                    <h3>E-Commerce Store</h3>
                    <p>Product showcase with cart and checkout UI.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="contact">
        <h2>Get In Touch</h2>
        <form>
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
    </section>
</body>
</html>`,
  },
  {
    id: "restaurant",
    title: "Restaurant Landing Page",
    features: ["Full-screen hero with background image", "Menu section with categories", "Photo gallery", "Operating hours", "Reservation form", "Footer with map"],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Bella Cucina</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; color: #2c2c2c; }
        
        .hero {
            height: 100vh;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                        url('https://picsum.photos/1200/800') center/cover;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
        }
        .hero h1 { font-size: 4rem; letter-spacing: 0.2rem; }
        .hero p { font-size: 1.3rem; margin-top: 1rem; font-style: italic; }
        
        .section { padding: 5rem 2rem; max-width: 1000px; margin: 0 auto; }
        .section h2 { 
            text-align: center; font-size: 2rem; margin-bottom: 3rem;
            position: relative;
        }
        .section h2::after {
            content: '';
            display: block;
            width: 60px;
            height: 3px;
            background: #c0392b;
            margin: 0.5rem auto 0;
        }

        /* Menu Grid */
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        .menu-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem 0;
            border-bottom: 1px dotted #ccc;
        }
        .menu-item .name { font-weight: bold; }
        .menu-item .price { color: #c0392b; font-weight: bold; }
        .menu-item .desc { font-size: 0.85rem; color: #777; }

        /* Reservation Form */
        .reservation {
            background: #f9f3f0;
            padding: 4rem 2rem;
        }
        .reservation form {
            max-width: 500px;
            margin: 0 auto;
            display: grid;
            gap: 1rem;
        }
        .reservation input, .reservation select {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        .reservation button {
            background: #c0392b;
            color: white;
            border: none;
            padding: 1rem;
            font-size: 1.1rem;
            cursor: pointer;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>La Bella Cucina</h1>
        <p>Authentic Italian Dining Since 1985</p>
    </section>

    <section class="section">
        <h2>Our Menu</h2>
        <div class="menu-grid">
            <div>
                <h3>Starters</h3>
                <div class="menu-item">
                    <div><span class="name">Bruschetta</span>
                    <p class="desc">Toasted bread with tomato & basil</p></div>
                    <span class="price">$8.50</span>
                </div>
                <div class="menu-item">
                    <div><span class="name">Caprese Salad</span>
                    <p class="desc">Fresh mozzarella, tomato, basil</p></div>
                    <span class="price">$10.00</span>
                </div>
            </div>
            <div>
                <h3>Mains</h3>
                <div class="menu-item">
                    <div><span class="name">Margherita Pizza</span>
                    <p class="desc">San Marzano tomato, mozzarella</p></div>
                    <span class="price">$14.00</span>
                </div>
                <div class="menu-item">
                    <div><span class="name">Spaghetti Carbonara</span>
                    <p class="desc">Pancetta, egg, parmesan, black pepper</p></div>
                    <span class="price">$16.50</span>
                </div>
            </div>
        </div>
    </section>

    <section class="reservation">
        <h2>Make a Reservation</h2>
        <form>
            <input type="text" placeholder="Full Name" required>
            <input type="email" placeholder="Email" required>
            <input type="date" required>
            <select required>
                <option value="">Number of Guests</option>
                <option>1-2</option>
                <option>3-4</option>
                <option>5-6</option>
                <option>7+</option>
            </select>
            <button type="submit">Reserve Table</button>
        </form>
    </section>
</body>
</html>`,
  },
  {
    id: "product",
    title: "Product Showcase Page",
    features: ["Product hero with large image", "Feature highlights", "Specifications table", "Customer reviews", "Call-to-action buttons", "Responsive grid"],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProSound X1 Headphones</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #1a1a1a; }
        
        .product-hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 80vh;
            align-items: center;
            padding: 4rem;
            background: #f0f0f0;
        }
        .product-hero img {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
        }
        .product-info h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .product-info .price {
            font-size: 2rem;
            color: #e74c3c;
            margin: 1rem 0;
        }
        .product-info .price .original {
            text-decoration: line-through;
            color: #999;
            font-size: 1.2rem;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            margin-right: 1rem;
        }
        .btn-buy { background: #e74c3c; color: white; }
        .btn-cart { background: #333; color: white; }
        
        .features {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            padding: 4rem 2rem;
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
        }
        .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        
        .specs {
            background: #f9f9f9;
            padding: 4rem 2rem;
        }
        .specs table {
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
            width: 100%;
        }
        .specs th, .specs td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        .specs th { font-weight: 600; width: 40%; }
        
        @media (max-width: 768px) {
            .product-hero { grid-template-columns: 1fr; text-align: center; padding: 2rem; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <section class="product-hero">
        <img src="https://picsum.photos/400/400" alt="ProSound X1">
        <div class="product-info">
            <h1>ProSound X1</h1>
            <p>Premium Wireless Headphones</p>
            <div class="price">
                $149.99 <span class="original">$199.99</span>
            </div>
            <p>Active noise cancellation, 40-hour battery, studio-quality sound.</p>
            <div style="margin-top: 1.5rem;">
                <button class="btn btn-buy">Buy Now</button>
                <button class="btn btn-cart">Add to Cart</button>
            </div>
        </div>
    </section>

    <section class="features">
        <div><div class="feature-icon">🎧</div><h3>40hr Battery</h3><p>All-day listening</p></div>
        <div><div class="feature-icon">🔇</div><h3>ANC</h3><p>Active noise cancellation</p></div>
        <div><div class="feature-icon">📱</div><h3>Bluetooth 5.3</h3><p>Seamless connection</p></div>
    </section>

    <section class="specs">
        <h2 style="text-align:center; margin-bottom:2rem;">Specifications</h2>
        <table>
            <tr><th>Driver Size</th><td>40mm</td></tr>
            <tr><th>Frequency</th><td>20Hz - 20kHz</td></tr>
            <tr><th>Battery</th><td>40 hours (ANC on)</td></tr>
            <tr><th>Weight</th><td>250g</td></tr>
            <tr><th>Connectivity</th><td>Bluetooth 5.3, USB-C</td></tr>
        </table>
    </section>
</body>
</html>`,
  },
];

const WebDesignDemoProjects = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Demo Projects</h1>
          <p className="text-muted-foreground mt-1">Three guided projects with complete, runnable code.</p>
        </div>
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {projects.map((p) => (
              <TabsTrigger key={p.id} value={p.id} className="text-xs">{p.title}</TabsTrigger>
            ))}
          </TabsList>
          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id} className="space-y-6 mt-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">{project.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground mb-2">Features:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {project.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <CodeBlock code={project.code} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignDemoProjects;
