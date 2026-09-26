```javascript
alert("MASONRY JS CHARGE");

const masonryForm = document.getElementById("masonryForm");

if (!masonryForm) {

    alert("ERREUR : masonryForm introuvable");

} else {

    alert("FORMULAIRE MAÇONNERIE TROUVÉ");

    masonryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("BOUTON CALCULER CLIQUÉ");

        const wallLength =
            Number(document.getElementById("wallLength").value);

        const wallHeight =
            Number(document.getElementById("wallHeight").value);

        const brickLength =
            Number(document.getElementById("brickLength").value);

        const brickHeight =
            Number(document.getElementById("brickHeight").value);

        const joint =
            Number(document.getElementById("jointThickness").value);

        const loss =
            Number(document.getElementById("masonryLoss").value);


        const wallArea =
            wallLength * wallHeight;


        const brickLengthM =
            brickLength / 100;

        const brickHeightM =
            brickHeight / 100;

        const jointM =
            joint / 100;


        const moduleArea =
            (brickLengthM + jointM) *
            (brickHeightM + jointM);


        const theoreticalBricks =
            wallArea / moduleArea;


        const finalBricks =
            Math.ceil(
                theoreticalBricks *
                (1 + loss / 100)
            );


        document.getElementById("wallAreaResult").textContent =
            wallArea.toFixed(2) + " m²";


        document.getElementById("brickTheoreticalResult").textContent =
            Math.ceil(theoreticalBricks);


        document.getElementById("brickFinalResult").textContent =
            finalBricks;


        document.getElementById("mortarVolumeResult").textContent =
            "0.00 m³";


        document.getElementById("masonryResults").style.display =
            "block";


        alert("CALCUL TERMINÉ");

    });

}
```
