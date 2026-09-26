```javascript
// =========================================
// BATIFLOW - CALCULATEUR MORTIER
// =========================================

// Vérification de connexion
const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// =========================================
// FORMULAIRE
// =========================================

const mortarForm =
    document.getElementById("mortarForm");


// =========================================
// CALCUL
// =========================================

if (mortarForm) {

    mortarForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Récupération des valeurs
            const length =
                Number(
                    document.getElementById(
                        "mortarLength"
                    ).value
                );

            const width =
                Number(
                    document.getElementById(
                        "mortarWidth"
                    ).value
                );

            const thickness =
                Number(
                    document.getElementById(
                        "mortarThickness"
                    ).value
                );

            const dosage =
                Number(
                    document.getElementById(
                        "mortarDosage"
                    ).value
                );


            const lossCheckbox =
                document.getElementById(
                    "mortarLoss"
                );


            // =====================================
            // VÉRIFICATION
            // =====================================

            if (
                length <= 0 ||
                width <= 0 ||
                thickness <= 0 ||
                dosage <= 0
            ) {

                alert(
                    "Veuillez entrer des valeurs valides."
                );

                return;
            }


            // =====================================
            // VOLUME THÉORIQUE
            // =====================================

            const volume =
                length *
                width *
                thickness;


            // =====================================
            // VOLUME AVEC PERTE
            // =====================================

            let volumeWithLoss =
                volume;


            if (
                lossCheckbox &&
                lossCheckbox.checked
            ) {

                volumeWithLoss =
                    volume * 1.05;

            }


            // =====================================
            // CIMENT
            // =====================================

            const cementKg =
                volumeWithLoss *
                dosage;


            // =====================================
            // SACS DE 50 KG
            // =====================================

            const cementBags =
                Math.ceil(
                    cementKg / 50
                );


            // =====================================
            // SABLE
            // =====================================

            /*
             Estimation simplifiée :

             Pour 1 m³ de mortier,
             on utilise ici environ 1,20 m³
             de sable humide/foisonné.

             Cette valeur est paramétrable
             dans une future version.
            */

            const sandVolume =
                volumeWithLoss * 1.20;


            // =====================================
            // AFFICHAGE
            // =====================================

            document.getElementById(
                "mortarVolumeResult"
            ).textContent =
                volume.toFixed(2) + " m³";


            document.getElementById(
                "mortarVolumeLossResult"
            ).textContent =
                volumeWithLoss.toFixed(2) + " m³";


            document.getElementById(
                "mortarCementResult"
            ).textContent =
                cementKg.toFixed(1) + " kg";


            document.getElementById(
                "mortarBagsResult"
            ).textContent =
                cementBags + " sacs";


            document.getElementById(
                "mortarSandResult"
            ).textContent =
                sandVolume.toFixed(2) + " m³";


            // =====================================
            // AFFICHER LES RÉSULTATS
            // =====================================

            const results =
                document.getElementById(
                    "mortarResults"
                );


            if (results) {

                results.style.display =
                    "block";


                results.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


// =========================================
// DÉCONNEXION
// =========================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


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
    document.getElementById(
        "mobileMenu"
    );

const sidebar =
    document.getElementById(
        "sidebar"
    );


if (
    mobileMenu &&
    sidebar
) {

    mobileMenu.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}
```
