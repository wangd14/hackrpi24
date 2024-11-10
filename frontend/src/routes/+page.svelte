<script>
    import { Link } from "svelte-routing";
  </script>
  
  <div class="container">
    <nav class="navbar">
      <div class="nav-brand">ParkPlanr</div>
      <div class="nav-links">
        <Link to="/" class="nav-link">Home</Link>
        <Link to="/map" class="nav-link">Map</Link>
      </div>
    </nav>
  
    <main class="hero">
      <div class="hero-content">
        <h1>Design Better Green Spaces</h1>
        <p class="subtitle">Use data-driven insights to plan and analyze urban parks for your community</p>
        <div class="cta-buttons">
          <Link to="/map">
            <button class="primary-button">Open Map Tool</button>
          </Link>
        </div>
      </div>
      
      <div class="features">
        <div class="feature-card">
          <span class="feature-icon">🎯</span>
          <h3>Area Analysis</h3>
          <p>Calculate and visualize potential park spaces with our drawing tools</p>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">📊</span>
          <h3>Population Data</h3>
          <p>Access detailed population density information for better planning</p>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">🌳</span>
          <h3>Environmental Impact</h3>
          <p>Understand vegetation coverage and sunlight exposure patterns</p>
        </div>
      </div>
    </main>
  
    <footer class="footer">
      <p>Created at HackRPI 2024 | Park Planning Assistant</p>
    </footer>
  </div>
  
  <style>
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  
    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2d6a4f;
    }
  
    .nav-links {
      display: flex;
      gap: 2rem;
    }
  
    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
    }
  
    .nav-link:hover {
      color: #2d6a4f;
    }
  
    .hero {
      flex: 1;
      padding: 2rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
  
    .hero-content {
      max-width: 800px;
      margin: 3rem auto;
      text-align: center;
      padding: 2rem;
    }
  
    h1 {
      font-size: 3.5rem;
      color: #1a4731;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
  
    .subtitle {
      font-size: 1.25rem;
      color: #495057;
      margin-bottom: 2rem;
      line-height: 1.5;
    }
  
    .cta-buttons {
      margin: 2rem 0;
    }
  
    .primary-button {
      background-color: #2d6a4f;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .primary-button:hover {
      background-color: #1a4731;
    }
  
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 2rem;
    }
  
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
  
    .feature-card:hover {
      transform: translateY(-5px);
    }
  
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: inline-block;
    }
  
    .feature-card h3 {
      color: #2d6a4f;
      margin-bottom: 1rem;
    }
  
    .feature-card p {
      color: #6c757d;
      line-height: 1.6;
    }
  
    .footer {
      text-align: center;
      padding: 2rem;
      background-color: #1a4731;
      color: white;
    }
  
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }
  
      .subtitle {
        font-size: 1.1rem;
      }
  
      .navbar {
        padding: 1rem;
      }
  
      .nav-links {
        gap: 1rem;
      }
  
      .features {
        grid-template-columns: 1fr;
        padding: 0 1rem;
      }
  
      .hero-content {
        padding: 1rem;
      }
    }
  </style>