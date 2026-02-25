let selectedPlan = '';

// Fonction pour basculer le menu mobile
function toggleMenu() {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Fonction pour fermer le menu mobile
function closeMenu() {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    burger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
}

function scrollToPlans() {
    document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
    closeMenu();
}

function openForm(planName) {
    selectedPlan = planName;
    const planSelect = document.getElementById('plan');

    if (planName === 'Plan Basic') planSelect.value = 'Basic - 5 500£';
    else if (planName === 'Plan Premium') planSelect.value = 'Premium - 10 000£';
    else if (planName === 'Plan Elite') planSelect.value = 'Elite - 15 000£';

    document.getElementById('formModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeMenu();
}

function closeForm() {
    document.getElementById('formModal').style.display = 'none';
    document.getElementById('investmentForm').reset();
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target == modal) {
        closeForm();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeForm();
    }
});

// Fermer le menu mobile si on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fonction pour zoomer sur les images
function setupImageZoom() {
    const images = document.querySelectorAll('.images-grid img');
    const overlay = document.createElement('div');
    overlay.className = 'image-zoom-overlay';
    document.body.appendChild(overlay);

    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.classList.contains('zoomed')) {
                this.classList.remove('zoomed');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                document.querySelectorAll('.images-grid img.zoomed').forEach(z => {
                    z.classList.remove('zoomed');
                });
                this.classList.add('zoomed');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    overlay.addEventListener('click', function() {
        document.querySelectorAll('.images-grid img.zoomed').forEach(img => {
            img.classList.remove('zoomed');
        });
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.images-grid img.zoomed').forEach(img => {
                img.classList.remove('zoomed');
            });
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function submitForm(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const plan = document.getElementById('plan').value;
    const paiement = document.getElementById('paiement').value;

    let montant = '150£';
    if (plan.includes('Premium') || plan.includes('10 000')) montant = '400 £';
    else if (plan.includes('Elite') || plan.includes('15 000')) montant = '500 £';

    const message = `*🔔 NOUVELLE DEMANDE D'INVESTISSEMENT - Vantex Banque*%0A%0A` +
                  `*👤 INFORMATIONS PERSONNELLES*%0A` +
                  `Nom complet : ${prenom} ${nom}%0A` +
                  `📧 Email : ${email}%0A` +
                  `*💰 DÉTAILS DE L'INVESTISSEMENT*%0A` +
                  `Plan choisi : ${plan}%0A` +
                  `Montant à investir : ${montant}%0A` +
                  `💳 Moyen de paiement : ${paiement}%0A%0A` +
                  `*📅 DATE DE LA DEMANDE*%0A` +
                  `${new Date().toLocaleString('fr-FR')}%0A%0A` +
                  `_🔔 Nouvel investisseur potentiel - À contacter dans les plus brefs délais_`;

    const whatsappNumber = "33756911686";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    closeForm();

    alert('✅ Votre demande a été prise en compte ! Vous allez être redirigé vers WhatsApp pour finaliser votre investissement avec un conseiller.');
}

// Initialiser le zoom des images au chargement
document.addEventListener('DOMContentLoaded', setupImageZoom);
