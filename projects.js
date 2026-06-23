/* 
  projects.js
  Lavanya Sai Bandla Portfolio - Projects Portfolio Data & Filtering
*/

// Projects database
const projectsData = [
  {
    id: 1,
    title: "Smart AI-IoT System for Psychological Disorders Monitoring & Prediction",
    category: "ai-ml",
    tech: ["Arduino", "Python", "Flask", "Firebase", "Next.js", "Machine Learning"],
    image: "assets/project-ai-iot.png",
    github: "https://github.com/lavanyabandla27/AI-IoT-Psychological-Monitoring",
    shortDesc: "An AI + IoT based real-time monitoring system utilizing physiological sensors and a Random Forest ML model (92.4% accuracy).",
    highlights: [
      "Developed AI + IoT based monitoring system to track anxiety metrics",
      "Utilized Random Forest model achieving 92.4% classification accuracy",
      "Created instant SMS/Email real-time alerts when threshold is breached",
      "Configured secure Firebase Cloud authentication and database syncing",
      "Integrated beautiful, interactive Next.js analytics dashboard"
    ],
    detailedDesc: "This project presents a hardware-software co-designed system that continuously captures physiological signals (heart rate variability, galvanic skin response, and body temperature) using Arduino. The data is processed in a Flask server, where a Random Forest classifier evaluates psychological states in real-time. If critical anxiety levels are predicted, it alerts caregivers. Data is synced to Firebase and displayed in a responsive Next.js frontend."
  },
  {
    id: 2,
    title: "Gemini Based YouTube Content Summarizer",
    category: "nlp-ai",
    tech: ["Python", "Gemini API", "NLP", "YouTube Data API", "Streamlit"],
    image: "assets/project-summarizer.png",
    github: "https://github.com/lavanyabandla27/YouTube-Content-Summarizer",
    shortDesc: "An AI-powered application that extracts transcripts from YouTube videos and summarizes content with 92% semantic accuracy.",
    highlights: [
      "AI based intelligent summarization system",
      "Automatic transcript processing using YouTube Data API and Web Scraping",
      "Utilized Google Gemini API for semantic summary extraction",
      "Achieved 92% semantic accuracy verified via test sets",
      "Built interactive Streamlit UI for user-friendly query execution"
    ],
    detailedDesc: "This application enables users to paste any YouTube video link, dynamically extracts its spoken transcript in multiple languages, and feeds the content into the Gemini LLM with tailored prompt templates. It generates structured bulleted summaries, chapter outlines, key takeaways, and answerable FAQs about the video content, saving users hours of watching time."
  },
  {
    id: 3,
    title: "Java Based Online Beauty Parlour Management System",
    category: "java",
    tech: ["Java", "OOP", "Collections", "File Handling"],
    image: "assets/project-beauty.png",
    github: "https://github.com/lavanyabandla27/Beauty-Parlour-Management",
    shortDesc: "A modular, command-line and GUI administration platform for booking, billing, and user tracking using robust OOP design.",
    highlights: [
      "Customer registration and personalized service profile tracking",
      "Real-time appointment booking and calendar collision checking",
      "Comprehensive billing system generating printable invoices",
      "File persistence simulating a flat-file database using Java IO streams",
      "Modular Object-Oriented software pattern using collections"
    ],
    detailedDesc: "Designed as an industry-standard Java software solution, this management system utilizes Java Collections (List, Map) and Object-Oriented principles (Inheritance, Polymorphism, Encapsulation) to handle customer profiles, service catalogs, appointment timings, and bills. Data is saved in text files to ensure persistence across sessions without complex external database setups."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(projectsData);
  initFiltersAndSearch();
});

// Render project cards to grid
function renderProjects(projectsArray) {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;

  if (projectsArray.length === 0) {
    projectsGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-search-minus fa-3x text-muted mb-3"></i>
        <h4 class="text-muted">No projects match your search criteria</h4>
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = projectsArray.map(proj => `
    <div class="col-md-6 col-lg-4 mb-4 project-card-item" data-category="${proj.category}">
      <div class="glass-panel project-card tilt-card">
        <img src="${proj.image}" alt="${proj.title}" class="project-image" onerror="this.src='https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(proj.title)}'">
        <div class="project-tech-tags">
          ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <h4 class="project-title">${proj.title}</h4>
        <p class="project-desc">${proj.shortDesc}</p>
        <div class="project-actions">
          <button class="btn btn-premium btn-premium-secondary py-2 px-3 text-sm" onclick="openProjectModal(${proj.id})">
            Details
          </button>
          <a href="${proj.github}" target="_blank" class="project-link-btn">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-apply the 3D card tilt effect to the newly generated cards
  if (typeof window.applyTiltEffect === 'function') {
    window.applyTiltEffect(projectsGrid.querySelectorAll('.tilt-card'));
  }
}

// Setup search & filter behaviors
function initFiltersAndSearch() {
  const searchInput = document.getElementById("project-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeCategory = "all";
  let searchQuery = "";

  function applyFilters() {
    let filtered = projectsData;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Apply search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.shortDesc.toLowerCase().includes(query) || 
        p.tech.some(t => t.toLowerCase().includes(query))
      );
    }

    renderProjects(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-filter");
      applyFilters();
    });
  });
}

// Open detailed modal dialog with project details
window.openProjectModal = function (projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modalTitle = document.getElementById("projectModalLabel");
  const modalBody = document.getElementById("projectModalBody");
  const modalGithubLink = document.getElementById("projectModalGithub");

  if (!modalTitle || !modalBody) return;

  modalTitle.textContent = proj.title;
  modalGithubLink.href = proj.github;

  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-6 mb-4 mb-md-0">
        <img src="${proj.image}" alt="${proj.title}" class="img-fluid rounded-4 mb-3 border border-1 border-secondary" onerror="this.src='https://placehold.co/600x400/1e293b/ffffff?text=Project+Preview'">
        <h6 class="fw-bold mt-2"><i class="fas fa-code text-cyan me-2"></i>Technologies Used:</h6>
        <div class="d-flex flex-wrap gap-2 mt-2">
          ${proj.tech.map(t => `<span class="badge bg-secondary p-2">${t}</span>`).join('')}
        </div>
      </div>
      <div class="col-md-6">
        <h5 class="fw-bold mb-3"><i class="fas fa-info-circle text-indigo me-2"></i>Project Overview</h5>
        <p class="text-secondary">${proj.detailedDesc}</p>
        
        <h5 class="fw-bold my-3"><i class="fas fa-star text-warning me-2"></i>Key Highlights</h5>
        <ul class="list-group list-group-flush bg-transparent">
          ${proj.highlights.map(h => `
            <li class="list-group-item bg-transparent text-secondary border-0 ps-0 py-2">
              <i class="fas fa-check-circle text-success me-2"></i>${h}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  // Display Modal via Bootstrap instance
  const modalEl = document.getElementById("projectModal");
  if (modalEl) {
    const modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
  }
};
