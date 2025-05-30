document.addEventListener('DOMContentLoaded', () => {
        const experiences = [
        {
            title: "Front End Developer",
            company: "LotusSoft Technology Pvt. Ltd (Kupondol, Lalitpur)",
            duration: "April 2025 - Present",
            details: [
                "Developed responsive UIs using Next.js, Tailwind CSS, and TypeScript",
                "Designed various UI/UX components for projects",
                "Implemented API integrations using Postman"
            ]
        },
        {
            title: "Secondary Computer Teacher",
            company: "Sanskar Gurukul (Bode, Bhaktapur)",
            duration: "Dec 2023 - Jan 2025",
            details: [
                "Taught HTML, CSS, and JavaScript to secondary-level students",
                "Designed interactive lessons on computer fundamentals and programming",
                "Guided practical projects to enhance problem-solving skills"
            ]
        },
        {
            title: "Front End Developer Internship",
            company: "Ayata Incorporation Pvt. Ltd (Bijulibajar, Kathmandu)",
            duration: "Feb 2024 - May 2024",
            details: [
                "Developed responsive UIs using HTML, CSS, JavaScript, and React",
                "Collaborated on UI/UX improvements",
                "Implemented API integrations"
            ]
        },
        {
            title: "Web Developer (Remote)",
            company: "Dolphin Education Consultancy (Putali Sadak, Kathmandu)",
            duration: "Jan 2024 - Apr 2024",
            details: [
                "Developed company website using HTML, CSS, JavaScript, and Bootstrap",
                "Optimized website performance and responsiveness",
                "Managed web content updates"
            ]
        }
    ];

    const projects = [
    {
        title: "Online Item Rental System",
        tech: "React, PHP, MySQL",
        category: "academic",
        repo: "https://github.com/AromKhadka/ERP-system",
        details: [
        "Designed and developed front-end using React, HTML, CSS, and JavaScript.",
        "Built RESTful APIs in PHP for authentication and item management.",
        "Used MySQL for secure and efficient data storage."
        ]
    },
    {
        title: "Online Shopping Platform",
        tech: "Bootstrap, PHP, MySQL",
        category: "academic",
        repo: "https://github.com/AromKhadka/shopping",
        details: [
        "Developed a user-friendly and responsive front-end using Bootstrap and vanilla JS.",
        "Engineered the back-end using PHP and MySQL for secure transactions.",
        "Implemented authentication, cart system, and product listing."
        ]
    },
    {
        title: "E-Billing System",
        tech: "Bootstrap, PHP, MySQL",
        category: "academic",
        repo: "https://github.com/AromKhadka/e-billing-",
        details: [
        "Created an intuitive interface for billing and invoices.",
        "Used PHP and MySQL for handling records and transactions.",
        "Ensured accuracy and security of financial data."
        ]
    },
    {
        title: "Movie Explorer System",
        tech: "React, JavaScript",
        category: "other",
        repo: "https://github.com/AromKhadka/Movie-Explorer-System",
        details: [
        "Developed a React-based movie website that allows users to search for movies by title.",
        "Implemented sorting by genre, and viewing trending and upcoming movies.",
        "Designed a user-friendly and visually appealing interface."
        ]
    },
    {
        title: "Expenses Calculator",
        tech: "React, JavaScript",
        category: "other",
        repo: "https://github.com/AromKhadka/Expenses-calculator",
        details: [
        "Built an easy-to-use budgeting calculator to help users understand their expenses.",
        "Implemented features for adding and deleting expense transactions.",
        "Displayed weekly expenses as a bar chart on the UI."
        ]
    },
    {
        title: "Vehicle Tracking System",
        tech: "Android, PHP, Firebase",
        category: "other",
        repo: "https://github.com/AromKhadka/vehicle-tracking-system",
        details: [
        "Developed an Android app with an admin website to manage transports.",
        "Utilized Firebase Authentication and Database for real-time data.",
        "Integrated Google Map API for vehicle tracking."
        ]
    },
    {
        title: "Portfolio Website",
        tech: "HTML, CSS, JavaScript",
        category: "other",
        repo: "https://github.com/AromKhadka/Portfolio-Website",
        details: [
        "Created a personal portfolio website to showcase skills and projects.",
        "Implemented responsive design for various devices.",
        "Included sections for work experience, projects, skills, and contact information."
        ]
    },
    {
        title: "NGO Website",
        tech: "HTML, CSS, JavaScript",
        category: "other",
        repo: "https://github.com/AromKhadka/NGO_website",
        details: [
        "Developed a website for an NGO to present their mission and activities.",
        "Designed user-friendly navigation and informative content sections.",
        "Ensured accessibility and responsiveness across devices."
        ]
    },
    {
        title: "Consultancy Website",
        tech: "HTML, CSS, JavaScript",
        category: "other",
        repo: "https://github.com/AromKhadka/consultancy_website",
        details: [
        "Built a professional website for a consultancy firm.",
        "Highlighted services, team members, and contact information.",
        "Focused on clean design and user experience."
        ]
    }
    ];
    const skills = {
        "Programming": ["Next.js", "TypeScript", "Python", "C", "C++", "HTML", "Tailwind CSS", "JavaScript", "React", "Node.js", "PHP"],
        "Database": ["MySQL"],
        "Other": ["MS Word", "MS PowerPoint", "MS Excel", "MS Access"]
    };

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

    const languages = [
        { name: "English", level: "Proficient" },
        { name: "Hindi", level: "Proficient" },
        { name: "Nepali", level: "Proficient" }
    ];

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

    const academicProjects = document.getElementById('academicProjects');
    const otherProjects = document.getElementById('otherProjects');

    projects.forEach(proj => {
    const projectHTML = `
        <div class="project-card">
        <h3>${proj.title}</h3>
        <p class="tech">⚙️ ${proj.tech}</p>
        <ul>
            ${proj.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <a href="${proj.repo}" target="_blank" class="repo-button">🔗 View Repository</a>
        </div>
    `;

    if (proj.category === 'academic') {
        academicProjects.innerHTML += projectHTML;
    } else {
        otherProjects.innerHTML += projectHTML;
    }
    });

    const skillCategories = document.getElementById('skillCategories');
    Object.entries(skills).forEach(([category, items]) => {
        skillCategories.innerHTML += `
            <div class="skill-category">
                <h4>${category} 🛠️</h4>
                <ul>
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>`;
    });

    const academicsTimeline = document.getElementById('academicsTimeline');
    academics.forEach(academic => {
        academicsTimeline.innerHTML += `
            <div class="academic-item">
                <h3>${academic.institution}</h3>
                <p>📅 ${academic.duration}</p>
                <p>📍 ${academic.location}</p>
            </div>`;
    });

    const languageGrid = document.getElementById('languageGrid');
    languages.forEach(lang => {
        languageGrid.innerHTML += `
            <div class="language-card">
                <h4>${lang.name}</h4>
                <p>${lang.level} 📊</p>
            </div>`;
    });


    console.log("🚀 Welcome to Arom Khadka's Portfolio!");
});
