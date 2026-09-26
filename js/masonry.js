```javascript
// =========================================
// BATIFLOW - CALCULATEUR MAÇONNERIE
// =========================================

// =========================================
// VÉRIFICATION DE CONNEXION
// =========================================

const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


// =========================================
// FORMULAIRE MAÇONNERIE
// =========================================

const masonryForm = document.getElementById("masonryForm");

if (masonryForm) {

    masonryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // =====================================
        // RÉCUPÉRATION DES DONNÉES
        // =====================================

        const wallLength = Number(
            document.getElementById("wallLength").value
        );

        const wallHeight = Number(
            document.getElementById("wallHeight").value
        );

        const brickLengthCm = Number(
            document.getElementById("brickLength").value
        );

        const brickHeightCm = Number(
            document.getElementById("brickHeight").value
        );

        const jointCm = Number(
            document.getElementById("jointThickness").value
        );

        const loss = Number(
            document.getElementById("masonryLoss").value
        );


        // =====================================
        // VALIDATION
        // =====================================

        if (
            !Number.isFinite(wallLength) ||
            !Number.isFinite(wallHeight) ||
            !Number.isFinite(brickLengthCm) ||
            !Number.isFinite(brickHeightCm) ||
            !Number.isFinite(jointCm) ||
            !Number.isFinite(loss)
        ) {

            alert("Veuillez remplir tous les champs.");

            return;
        }


        if (
            wallLength <= 0 ||
            wallHeight <= 0 ||
            brickLengthCm <= 0 ||
            brickHeightCm <= 0 ||
            jointCm < 0
        ) {

            alert("Veuillez entrer des valeurs supérieures à zéro.");

            return;
        }


        // =====================================
        // 1. SURFACE DU MUR
        // =====================================

        const wallArea =
            wallLength * wallHeight;


        // =====================================
        // 2. CONVERSION CM → M
        // =====================================

        const brickLengthM =
            brickLengthCm / 100;

        const brickHeightM =
            brickHeightCm / 100;

        const jointM =
            jointCm / 100;


        // =====================================
        // 3. MODULE DE MAÇONNERIE
        // =====================================
        // Brique + joint horizontal
        // Brique + joint vertical
        // =====================================

        const moduleLength =
            brickLengthM + jointM;

        const moduleHeight =
            brickHeightM + jointM;


        const moduleArea =
            moduleLength * moduleHeight;


        // =====================================
        // 4. NOMBRE THÉORIQUE DE BRIQUES
        // =====================================

        const theoreticalBricks =
            wallArea / moduleArea;


        // =====================================
        // 5. BRIQUES AVEC PERTE
        // =====================================

        const finalBricks =
            Math.ceil(
                theoreticalBricks *
                (1 + loss / 100)
            );


        // =====================================
        // 6. ESTIMATION DU MORTIER
        // =====================================
        //
        // Cette estimation utilise une méthode
        // simplifiée basée sur le volume occupé
        // par les joints.
        //
        // Elle est indicative et ne remplace
        // pas un métré d'exécution.
        // =====================================

        const brickArea =
            brickLengthM * brickHeightM;


        const jointArea =
            moduleArea - brickArea;


        const mortarRatio =
            jointArea / moduleArea;


        // Volume conventionnel de maçonnerie
        // basé sur une épaisseur de 15 cm.
        const wallThickness = 0.15;


        const masonryVolume =
            wallArea * wallThickness;


        const mortarVolume =
            masonryVolume *
            mortarRatio;


        const mortarWithLoss =
            mortarVolume *
            (1 + loss / 100);


        // =====================================
        // 7. AFFICHAGE DES RÉSULTATS
        // =====================================

        const wallAreaResult =
            document.getElementById("wallAreaResult");

        const brickTheoreticalResult =
            document.getElementById("brickTheoreticalResult");

        const brickFinalResult =
            document.getElementById("brickFinalResult");

        const mortarVolumeResult =
            document.getElementById("mortarVolumeResult");


        if (wallAreaResult) {

            wallAreaResult.textContent =
                wallArea.toFixed(2) + " m²";

        }


        if (brickTheoreticalResult) {

            brickTheoreticalResult.textContent =
                Math.ceil(theoreticalBricks);

        }


        if (brickFinalResult) {

            brickFinalResult.textContent =
                finalBricks;

        }


        if (mortarVolumeResult) {

            mortarVolumeResult.textContent =
                mortarWithLoss.toFixed(3) + " m³";

        }


        // =====================================
        // 8. AFFICHER LES RÉSULTATS
        // =====================================

        const results =
            document.getElementById("masonryResults");


        if (results) {

            results.style.display = "block";

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


// =========================================
// DÉCONNEXION
// =========================================

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("batiflowLoggedIn");

        window.location.href = "login.html";

    });

}


// =========================================
// MENU MOBILE
// =========================================

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");


if (mobileMenu && sidebar) {

    mobileMenu.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });

}
```
