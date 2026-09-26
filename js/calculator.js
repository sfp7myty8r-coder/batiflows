// =========================================
// BATIFLOW - CALCULATEUR BTP
// =========================================

// Vérifier que l'utilisateur est connecté
const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// =========================================
// ÉLÉMENTS DE LA PAGE
// =========================================

const concreteForm = document.getElementById("concreteForm");
const results = document.getElementById("results");

const volumeResult = document.getElementById("volumeResult");
const volumeLossResult = document.getElementById("volumeLossResult");
const cementResult = document.getElementById("cementResult");
const bagsResult = document.getElementById("bagsResult");


// =========================================
// CALCUL DU BÉTON
// =========================================

if (concreteForm) {

    concreteForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Récupérer les valeurs
        const length = parseFloat(
            document.getElementById("length").value
        );

        const width = parseFloat(
            document.getElementById("width").value
        );

        const height = parseFloat(
            document.getElementById("height").value
        );

        const dosage = parseFloat(
            document.getElementById("dosage").value
        );

        const lossCheckbox =
            document.getElementById("loss");


        // Vérifier les valeurs
        if (
            isNaN(length) ||
            isNaN(width) ||
            isNaN(height) ||
            isNaN(dosage)
        ) {

            alert("Veuillez remplir tous les champs.");

            return;
        }


        if (
            length <= 0 ||
            width <= 0 ||
            height <= 0
        ) {

            alert(
                "Les dimensions doivent être supérieures à 0."
            );

            return;
        }


        // =====================================
        // VOLUME
        // =====================================

        const volume =
            length * width * height;


        // =====================================
        // PERTE
        // =====================================

        let volumeWithLoss = volume;

        if (lossCheckbox && lossCheckbox.checked) {

            volumeWithLoss =
                volume * 1.05;

        }


        // =====================================
        // CIMENT
        // =====================================

        const cementKg =
            volumeWithLoss * dosage;


        // =====================================
        // SACS
        // =====================================

        const cementBags =
            Math.ceil(cementKg / 50);


        // =====================================
        // AFFICHER LES RÉSULTATS
        // =====================================

        volumeResult.textContent =
            volume.toFixed(2) + " m³";


        volumeLossResult.textContent =
            volumeWithLoss.toFixed(2) + " m³";


        cementResult.textContent =
            cementKg.toFixed(1) + " kg";


        bagsResult.textContent =
            cementBags + " sacs";


        // Afficher la zone résultats
        results.style.display = "block";


        // Faire défiler vers les résultats
        setTimeout(function() {

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    });

}


// =========================================
// DÉCONNEXION
// =========================================

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            localStorage.removeItem(
                "batiflowLoggedIn"
            );

            window.location.href =
                "login.html";

        }
    );

}


// =========================================
// MENU MOBILE
// =========================================

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");

if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle("open");

        }
    );

}
