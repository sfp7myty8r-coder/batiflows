```javascript
// =========================================
// BATIFLOW - CALCULATEUR MAÇONNERIE
// =========================================

// Vérification de connexion
const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// =========================================
// FORMULAIRE MAÇONNERIE
// =========================================

const masonryForm =
    document.getElementById("masonryForm");


if (masonryForm) {

    masonryForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // =====================================
            // RÉCUPÉRATION DES VALEURS
            // =====================================

            const wallLength =
                Number(
                    document.getElementById(
                        "wallLength"
                    ).value
                );


            const wallHeight =
                Number(
                    document.getElementById(
                        "wallHeight"
                    ).value
                );


            const brickLengthCm =
                Number(
                    document.getElementById(
                        "brickLength"
                    ).value
                );


            const brickHeightCm =
                Number(
                    document.getElementById(
                        "brickHeight"
                    ).value
                );


            const jointCm =
                Number(
                    document.getElementById(
                        "jointThickness"
                    ).value
                );


            const loss =
                Number(
                    document.getElementById(
                        "masonryLoss"
                    ).value
                );


            // =====================================
            // VALIDATION
            // =====================================

            if (
                wallLength <= 0 ||
                wallHeight <= 0 ||
                brickLengthCm <= 0 ||
                brickHeightCm <= 0 ||
                jointCm < 0
            ) {

                alert(
                    "Veuillez entrer des valeurs valides."
                );

                return;
            }


            // =====================================
            // SURFACE DU MUR
            // =====================================

            const wallArea =
                wallLength *
                wallHeight;


            // =====================================
            // DIMENSIONS BRIQUE EN MÈTRES
            // =====================================

            const brickLengthM =
                brickLengthCm / 100;


            const brickHeightM =
                brickHeightCm / 100;


            const jointM =
                jointCm / 100;


            // =====================================
            // SURFACE APPARENTE D'UNE BRIQUE
            // AVEC SON JOINT
            // =====================================

            const brickModuleArea =
                (brickLengthM + jointM) *
                (brickHeightM + jointM);


            // =====================================
            // NOMBRE THÉORIQUE DE BRIQUES
            // =====================================

            const theoreticalBricks =
                wallArea /
                brickModuleArea;


            // =====================================
            // NOMBRE AVEC PERTE
            // =====================================

            const finalBricks =
                Math.ceil(
                    theoreticalBricks *
                    (1 + loss / 100)
                );


            // =====================================
            // ESTIMATION DU MORTIER
            // =====================================

            /*
                Estimation simplifiée du mortier.

                On estime d'abord le volume occupé
                par les joints sur une face du mur.

                Cette valeur est indicative.
                Elle pourra être améliorée dans
                une future version avec :
                - épaisseur du mur
                - type de bloc
                - ouvertures
                - dosage
                - méthode de métré.
            */


            const brickFaceArea =
                brickLengthM *
                brickHeightM;


            const brickVolumeFace =
                brickFaceArea *
                0.15;


            const mortarVolume =
                Math.max(
                    0,
                    (wallArea * 0.15) -
                    (theoreticalBricks * brickVolumeFace)
                );


            // Ajouter la perte au mortier

            const mortarFinal =
                mortarVolume *
                (1 + loss / 100);


            // =====================================
            // AFFICHAGE DES RÉSULTATS
            // =====================================

            document.getElementById(
                "wallAreaResult"
            ).textContent =
                wallArea.toFixed(2) +
                " m²";


            document.getElementById(
                "brickTheoreticalResult"
            ).textContent =
                Math.ceil(
                    theoreticalBricks
                );


            document.getElementById(
                "brickFinalResult"
            ).textContent =
                finalBricks;


            document.getElementById(
                "mortarVolumeResult"
            ).textContent =
                mortarFinal.toFixed(2) +
                " m³";


            // =====================================
            // AFFICHER LES RÉSULTATS
            // =====================================

            const results =
                document.getElementById(
                    "masonryResults"
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
