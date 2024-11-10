<script>
    function navigateToMap() {
      window.location.href = '/map';
    }
  </script>
  
  <main class="home-container">
    <header class="hero">
      <div class="hero-content">
        <h1>Park Planning Assistant</h1>
        <p class="subtitle">Design and analyze urban green spaces with our interactive mapping tool</p>
        <button class="cta-button" on:click={navigateToMap}>
          Launch Map Tool
        </button>
      </div>
    </header>
  
    <section class="features">
      <div class="feature-card">
        <div class="icon">🗺️</div>
        <h3>Interactive Mapping</h3>
        <p>Draw and visualize potential park locations with our intuitive mapping interface</p>
      </div>
      <div class="feature-card">
        <div class="icon">📊</div>
        <h3>Data Analysis</h3>
        <p>Get instant insights about population density and environmental factors</p>
      </div>
      <div class="feature-card">
        <div class="icon">🌳</div>
        <h3>Green Space Planning</h3>
        <p>Optimize park placement using environmental and demographic data</p>
      </div>
    </section>
  
    <footer class="home-footer">
      <p>Created for HackRPI 2024</p>
    </footer>
  </main>
  
  <style>
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  
    .hero {
      background: linear-gradient(135deg, #1a4731 0%, #2d6a4f 100%);
      color: white;
      padding: 6rem 2rem;
      text-align: center;
    }
  
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }
  
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  
    .subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
  
    .cta-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .cta-button:hover {
      background-color: #45a049;
    }
  
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 4rem 2rem;
      background-color: #f5f5f5;
    }
  
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  
    .feature-card h3 {
      margin-bottom: 1rem;
      color: #2d6a4f;
    }
  
    .feature-card p {
      color: #666;
      line-height: 1.5;
    }
  
    .home-footer {
      margin-top: auto;
      text-align: center;
      padding: 2rem;
      background-color: #333;
      color: white;
    }
  
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
  
      .subtitle {
        font-size: 1rem;
      }
  
      .features {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
      }
    }
  </style>
  