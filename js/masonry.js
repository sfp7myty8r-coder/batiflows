```javascript
// =========================================
// BATIFLOW
// CALCULATEUR MAÇONNERIE
// VERSION COMPLÈTE
// =========================================


// =========================================
// VÉRIFICATION DE CONNEXION
// =========================================

const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// =========================================
// ATTENDRE QUE LA PAGE SOIT CHARGÉE
// =========================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // FORMULAIRE MAÇONNERIE
    // =====================================

    const masonryForm =
        document.getElementById("masonryForm");


    if (!masonryForm) {

        console.error(
            "BATIFLOW : formulaire masonryForm introuvable."
        );

        return;
    }


    // =====================================
    // CALCUL MAÇONNERIE
    // =====================================

    masonryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // =================================
            // RÉCUPÉRATION DES VALEURS
            // =================================

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


            // =================================
            // VALIDATION
            // =================================

            if (
                !Number.isFinite(wallLength) ||
                !Number.isFinite(wallHeight) ||
                !Number.isFinite(brickLengthCm) ||
                !Number.isFinite(brickHeightCm) ||
                !Number.isFinite(jointCm) ||
                !Number.isFinite(loss)
            ) {

                alert(
                    "Veuillez remplir correctement tous les champs."
                );

                return;
            }


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


            // =================================
            // 1. SURFACE DU MUR
            // =================================

            const wallArea =
                wallLength *
                wallHeight;


            // =================================
            // 2. CONVERSION CM → M
            // =================================

            const brickLength =
                brickLengthCm / 100;

            const brickHeight =
                brickHeightCm / 100;

            const joint =
                jointCm / 100;


            // =================================
            // 3. MODULE DE MAÇONNERIE
            // =================================

            /*
             * Une brique occupe :
             *
             * longueur + joint
             * hauteur + joint
             */

            const moduleLength =
                brickLength +
                joint;


            const moduleHeight =
                brickHeight +
                joint;


            const moduleArea =
                moduleLength *
                moduleHeight;


            // =================================
            // 4. NOMBRE THÉORIQUE DE BRIQUES
            // =================================

            const theoreticalBricks =
                wallArea /
                moduleArea;


            // =================================
            // 5. NOMBRE AVEC PERTES
            // =================================

            const finalBricks =
                Math.ceil(
                    theoreticalBricks *
                    (1 + loss / 100)
                );


            // =================================
            // 6. ESTIMATION DU MORTIER
            // =================================

            /*
             * IMPORTANT :
             *
```
