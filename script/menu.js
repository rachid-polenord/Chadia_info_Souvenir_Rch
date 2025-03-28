// menu.js

// Définir les éléments du menu
const menuItems = [
    { text: 'Accueil', href: 'pages/accueil.html', icon: 'images/home.png' },
    { text: 'Job_Be', href: 'pages/job_be.html', icon: 'images/bel.png' },
    { text: 'Job_Fr', href: 'pages/job_fr.html', icon: 'images/fr.png' },
    { text: 'job_EU', href: 'pages/job_EU.html', icon: 'images/EU.png' },
    { text: 'logement', href: 'pages/logement.html', icon: 'images/logement.png' },
    { text: 'Regies', href: 'pages/regies.html', icon: 'images/regie.png' }
];

// Ajouter les styles du menu en JavaScript
const style = document.createElement('style');
style.textContent = `
    #menu-container {
        background-color: white;
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        position: sticky;
        top: 0;
        z-index: 1000;
        border-bottom: 2px solid #1e3d58;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    #menu-container a {
        color: black;
        text-decoration: none;
        padding: 10px 15px;
        margin-right: 10px;
        display: inline-block;
        transition: background-color 0.3s, transform 0.2s;
        text-align: center;
        border-radius: 5px;
    }

    #menu-container a:hover {
        background-color: lightgrey;
    }

    #menu-container a.active {
        background-color: #888; /* Couleur pour l'élément actif */
    }

    .icon {
        width: 24px;
        height: 24px;
        display: block;
        margin: 0 auto;
    }

    .text {
        display: block;
        font-size: 14px;
    }

    @media (min-width: 601px) {
        .icon {
            display: none;
        }
        .text {
            display: block;
        }
    }

    @media (max-width: 600px) {
        #menu-container {
            justify-content: space-around;
        }
        #menu-container a {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px;
        }
        .text {
            font-size: 12px;
        }
        .icon {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Fonction pour générer le menu
function updateMenu() {
    const menuContainer = document.getElementById('menu-container');
    const iframe = document.querySelector('iframe[name="iframe"]');
    
    if (!menuContainer || !iframe) return;

    // Récupérer l'URL actuelle depuis l'iframe
    const currentUrl = iframe.contentWindow.location.href;

    menuContainer.innerHTML = '';

    const isMobile = window.innerWidth <= 600;

    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.href;
        menuItem.target = 'iframe';

        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.className = 'icon';
        icon.alt = item.text;

        menuItem.appendChild(icon);

        if (!isMobile) {
            const text = document.createElement('span');
            text.textContent = item.text;
            text.className = 'text';
            menuItem.appendChild(text);
        }

        // Vérifier si l'URL de l'iframe correspond
        if (currentUrl.includes(item.href)) {
            menuItem.classList.add('active');
        }

        menuContainer.appendChild(menuItem);
    });
}

// Mettre à jour le menu lors du redimensionnement de la fenêtre
window.addEventListener('resize', updateMenu);

// Attendre que le DOM soit chargé avant d'exécuter `updateMenu`
document.addEventListener('DOMContentLoaded', () => {
    updateMenu();
    // Ajouter un écouteur sur le chargement de l'iframe
    document.querySelector('iframe[name="iframe"]').addEventListener('load', updateMenu);
});
