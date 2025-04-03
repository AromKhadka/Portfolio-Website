document.addEventListener('DOMContentLoaded', () => {
    // Experience Data
    const experiences = [
        {
            title: "Secondary Computer Teacher",
            company: "Sanskar Gurukul (Bode, Bhaktapur)",
            duration: "Dec 2023 - Present",
            details: [
                "Teaching HTML, CSS, and JavaScript to secondary-level students",
                "Designing interactive lessons on computer fundamentals and programming",
                "Guiding practical projects to enhance problem-solving skills"
            ]
        },
        {
            title: "Front End Developer Internship",
            company: "Ayata Incorporation Pvt. Ltd (Bijulibajar, Kathmandu)",
            duration: "Feb 2024 - May 2024",
            details: [
                "Developed responsive UIs using HTML/CSS/JavaScript/React",
                "Collaborated on UI/UX improvements",
                "Implemented API integrations"
            ]
        },
        {
            title: "Web Developer (Remote)",
            company: "Dolphin Education Consultancy (Putali Sadak, Kathmandu)",
            duration: "Jan 2024 - Apr 2024",
            details: [
                "Developed company website using HTML/CSS/JavaScript/Bootstrap",
                "Optimized website performance and responsiveness",
                "Managed web content updates"
            ]
        }
    ];

    // Project Data
    const projects = [
        {
            title: "Online Item Rental System",
            tech: "React, PHP, MySQL",
            details: [
                "Front-end development with React",
                "RESTful APIs with PHP",
                "MySQL database integration"
            ]
        },
        {
            title: "Online Shopping Platform",
            tech: "Bootstrap, PHP, MySQL",
            details: [
                "Responsive front-end with Bootstrap",
                "Back-end with PHP/MySQL",
                "Database connectivity implementation"
            ]
        },
        {
            title: "E-Billing System",
            tech: "Bootstrap, PHP, MySQL",
            details: [
                "User-friendly invoice generation interface",
                "Billing operations management",
                "Financial data integration"
            ]
        }
    ];

    // Skill Data
    const skills = {
        "Programming": ["C", "C++", "HTML", "CSS", "JavaScript", "Python", "React", "Node.js", "PHP"],
        "Database": ["MySQL"],
        "Other": ["MS Word", "MS PowerPoint", "MS Excel", "MS Access"]
    };

    // Academic Data
    const academics = [
        {
            institution: "Tribhuvan University - Bhaktapur Multiple Campus (MIT)",
            duration: "2025 - Present",
            location: "Bhaktapur, Nepal"
        },
        {
            institution: "Tribhuvan University - Kathmandu Bernhardt College (B.Sc.CSIT)",
            duration: "2019 - 2024",
            location: "Kathmandu, Nepal"
        },
        {
            institution: "V.S Niketan College (Science 12)",
            duration: "2017 - 2019",
            location: "Kathmandu, Nepal"
        },
        {
            institution: "Bharat Baba Eng. Boarding School",
            duration: "2003 - 2016",
            location: "Kalaiya, Nepal"
        }
    ];

    // Language Data
    const languages = [
        { name: "English", level: "Proficient" },
        { name: "Hindi", level: "Proficient" },
        { name: "Nepali", level: "Proficient" }
    ];

    // Populate Experiences
    const experienceTimeline = document.getElementById('experienceTimeline');
    experiences.forEach(exp => {
        experienceTimeline.innerHTML += `
            <div class="experience-item">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="duration">📅 ${exp.duration}</p>
                <ul>
                    ${exp.details.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>`;
    });

    // Populate Projects
    const projectGrid = document.getElementById('projectGrid');
    projects.forEach(proj => {
        projectGrid.innerHTML += `
            <div class="project-card">
                <h3>${proj.title}</h3>
                <p class="tech">⚙️ ${proj.tech}</p>
                <ul>
                    ${proj.details.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>`;
    });

    // Populate Skills
    const skillCategories = document.getElementById('skillCategories');
    Object.entries(skills).forEach(([category, items]) => {
        skillCategories.innerHTML += `
            <div class="skill-category">
                <h4>${category} 🛠️</h4>
                <ul>
                    ${items.map(item => `<li> ${item}</li>`).join('')}
                </ul>
            </div>`;
    });

    // Populate Academics
    const academicsTimeline = document.getElementById('academicsTimeline');
    academics.forEach(academic => {
        academicsTimeline.innerHTML += `
            <div class="academic-item">
                <h3>${academic.institution}</h3>
                <p>📅 ${academic.duration}</p>
                <p>📍 ${academic.location}</p>
            </div>`;
    });

    // Populate Languages
    const languageGrid = document.getElementById('languageGrid');
    languages.forEach(lang => {
        languageGrid.innerHTML += `
            <div class="language-card">
                <h4>${lang.name}</h4>
                <p>${lang.level} 📊</p>
            </div>`;
    });

    // Console greeting
    console.log("🚀 Welcome to Arom Khadka's Portfolio!");
});