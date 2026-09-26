```javascript
// =========================================
// BATIFLOW
// CALCULATEUR DALLE
// =========================================


// =========================================
// VÉRIFICATION DE CONNEXION
// =========================================

const loggedIn =
    localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {

    window.location.href =
        "login.html";

}


// =========================================
// ATTENDRE LE CHARGEMENT DE LA PAGE
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =====================================
        // FORMULAIRE
        // =====================================

        const slabForm =
            document.getElementById("slabForm");


        if (!slabForm) {

            console.error(
                "BATIFLOW : slabForm introuvable."
            );

            return;

        }


        // =====================================
        // CALCUL DE LA DALLE
        // =====================================

        slabForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // =================================
                // RÉCUPÉRATION DES VALEURS
                // =================================

                const length =
                    parseFloat(
                        document.getElementById(
                            "slabLength"
                        ).value
                    );


                const width =
                    parseFloat(
                        document.getElementById(
                            "slabWidth"
                        ).value
                    );


                const thicknessCm =
                    parseFloat(
                        document.getElementById(
                            "slabThickness"
                        ).value
                    );


                const dosage =
                    parseFloat(
                        document.getElementById(
                            "slabDosage"
                        ).value
                    );


                const loss =
                    parseFloat(
                        document.getElementById(
                            "slabLoss"
                        ).value
                    );


                // =================================
                // VALIDATION
                // =================================

                if (
                    !Number.isFinite(length) ||
                    !Number.isFinite(width) ||
                    !Number.isFinite(thicknessCm) ||
                    !Number.isFinite(dosage) ||
                    !Number.isFinite(loss)
                ) {

                    alert(
                        "Veuillez remplir correctement tous les champs."
                    );

                    return;

                }


                if (
                    length <= 0 ||
                    width <= 0 ||
                    thicknessCm <= 0
                ) {

                    alert(
                        "Veuillez entrer des dimensions valides."
                    );

                    return;

                }


                // =================================
                // CONVERSION ÉPAISSEUR
                // =================================

                const thickness =
                    thicknessCm / 100;


                // =================================
                // SURFACE
                // =================================

                const area =
                    length * width;


                // =================================
                // VOLUME THÉORIQUE
                // =================================

                const volume =
                    area * thickness;


                // =================================
                // VOLUME AVEC PERTE
                // =================================

                const volumeWithLoss =
                    volume *
                    (1 + loss / 100);


                // =================================
                // CIMENT
                // =================================

                const cementKg =
                    volumeWithLoss *
                    dosage;


                // =================================
                // SACS DE 50 KG
                // =================================

                const bags =
                    Math.ceil(
                        cementKg / 50
                    );


                // =================================
                // SABLE
                // =================================

                /*
                 * Estimation simplifiée.
                 *
                 * Valeur utilisée :
                 * 0,50 m³ de sable / m³ de béton.
                 *
                 * À améliorer ultérieurement
                 * avec une formulation réelle.
                 */

                const sand =
                    volumeWithLoss * 0.50;


                // =================================
                // GRAVIER
                // =================================

                /*
                 * Estimation simplifiée.
                 *
                 * Valeur utilisée :
                 * 0,80 m³ de gravier / m³ de béton.
                 */

                const gravel =
                    volumeWithLoss * 0.80;


                // =================================
                // AFFICHAGE
                // =================================

                const areaResult =
                    document.getElementById(
                        "slabAreaResult"
                    );


                const volumeResult =
                    document.getElementById(
                        "slabVolumeResult"
                    );


                const volumeLossResult =
                    document.getElementById(
                        "slabVolumeLossResult"
                    );


                const cementResult =
                    document.getElementById(
                        "slabCementResult"
                    );


                const bagsResult =
                    document.getElementById(
                        "slabBagsResult"
                    );


                const sandResult =
                    document.getElementById(
                        "slabSandResult"
                    );


                const gravelResult =
                    document.getElementById(
                        "slabGravelResult"
                    );


                if (areaResult) {

                    areaResult.textContent =
                        area.toFixed(2) +
                        " m²";

                }


                if (volumeResult) {

                    volumeResult.textContent =
                        volume.toFixed(2) +
                        " m³";

                }


                if (volumeLossResult) {

                    volumeLossResult.textContent =
                        volumeWithLoss.toFixed(2) +
                        " m³";

                }


                if (cementResult) {

                    cementResult.textContent =
                        cementKg.toFixed(1) +
                        " kg";

                }


                if (bagsResult) {

                    bagsResult.textContent =
                        bags +
                        " sacs";

                }


                if (sandResult) {

                    sandResult.textContent =
                        sand.toFixed(2) +
                        " m³";

                }


                if (gravelResult) {

                    gravelResult.textContent =
                        gravel.toFixed(2) +
                        " m³";

                }


                // =================================
                // AFFICHER LES RÉSULTATS
                // =================================

                const results =
                    document.getElementById(
                        "slabResults"
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


        // =====================================
        // DÉCONNEXION
        // =====================================

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    localStorage.removeItem(
                        "batiflowLoggedIn"
                    );


                    window.location.href =
                        "login.html";

                }
            );

        }


        // =====================================
        // MENU MOBILE
        // =====================================

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
                function () {

                    sidebar.classList.toggle(
                        "open"
                    );

                }
            );

        }

    }
);
```
