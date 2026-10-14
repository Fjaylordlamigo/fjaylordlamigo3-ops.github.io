
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch('data/projects.json');
        
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projects = await response.json();
        container.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h4>📌 ${project.title}</h4>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p class="loading">⚠️ Unable to load projects right now.</p>';
        console.error('Error:', error);
    }
}

async function loadRepos() {
    const container = document.getElementById('repos-container');
    const username = 'fjaylordlamigo-ops';
    
    try {
        const response = await fetch(
            https://api.github.com/users/${username}/repos?sort=updated&per_page=5
        );
        
        if (!response.ok) {
            throw new Error('GitHub API error');
        }
        
        const repos = await response.json();
        container.innerHTML = '';

        repos.forEach(repo => {
            const item = document.createElement('div');
            item.className = 'repo-item';
            item.innerHTML = `
                <a href="${repo.html_url}" target="_blank">🔗 ${repo.name}</a>
                ${repo.language ? <span> • ${repo.language}</span> : ''}
            `;
            container.appendChild(item);
        });

    } catch (error) {
        container.innerHTML = '<p class="loading">⚠️ Unable to load repositories right now.</p>';
        console.error('Error:', error);
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const messageBox = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset message style
        messageBox.textContent = '';
        messageBox.style.color = '';

        // Validation
        if (!name || !email || !message) {
            messageBox.textContent = '❌ Please fill in all fields.';
            messageBox.style.color = '#ef4444';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            messageBox.textContent = '❌ Please enter a valid email address.';
            messageBox.style.color = '#ef4444';
            return;
        }

        // Success
        messageBox.textContent = '✅ Thank you! Message sent successfully.';
        messageBox.style.color = '#10b981';
        form.reset();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadRepos();
    setupContactForm();
});