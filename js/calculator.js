```javascript
// =========================================
// BATIFLOW - CALCULATEUR BTP
// =========================================


// Vérification de connexion
const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// Récupération du formulaire
const concreteForm = document.getElementById("concreteForm");


// Récupération des éléments de résultat
const results = document.getElementById("results");

const volumeResult = document.getElementById("volumeResult");

const volumeLossResult = document.getElementById("volumeLossResult");

const cementResult = document.getElementById("cementResult");

const bagsResult = document.getElementById("bagsResult");


// Fonction pour arrondir
function roundNumber(number, decimals = 2) {

    return Number(
        number.toFixed(decimals)
    );

}


// Calculateur béton
if (concreteForm) {

    concreteForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // Récupération des valeurs
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


        // Vérification
        if (
            isNaN(length) ||
            isNaN(width) ||
            isNaN(height) ||
            isNaN(dosage) ||
            length <= 0 ||
            width <= 0 ||
            height <= 0
        ) {

            alert(
                "Veuillez entrer des dimensions valides."
            );

            return;

        }


        // =====================================
        // 1. VOLUME THÉORIQUE
        // =====================================

        const volume =
            length *
            width *
            height;


        // =====================================
        // 2. MARGE DE PERTE
        // =====================================

        const lossCheckbox =
            document.getElementById("loss");

        let volumeWithLoss = volume;


        if (lossCheckbox.checked) {

            volumeWithLoss =
                volume * 1.05;

        }


        // =====================================
        // 3. CIMENT
        // =====================================

        const cementKg =
            volumeWithLoss * dosage;


        // =====================================
        // 4. NOMBRE DE SACS
        // =====================================

        const cementBags =
            cementKg / 50;


        // =====================================
        // AFFICHAGE
        // =====================================

        volumeResult.textContent =
            roundNumber(volume, 2) + " m³";


        volumeLossResult.textContent =
            roundNumber(volumeWithLoss, 2) + " m³";


        cementResult.textContent =
            roundNumber(cementKg, 1) + " kg";


        bagsResult.textContent =
            Math.ceil(cementBags) + " sacs";


        // Afficher les résultats
        results.style.display = "block";


        // Faire défiler vers les résultats
        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

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
    document.querySelector(".sidebar");


if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle("open");

        }
    );

}
```
