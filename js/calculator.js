const form = document.getElementById("concreteForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const longueur = Number(document.getElementById("length").value);
    const largeur = Number(document.getElementById("width").value);
    const hauteur = Number(document.getElementById("height").value);
    const dosage = Number(document.getElementById("dosage").value);

    const volume = longueur * largeur * hauteur;

    const perte = document.getElementById("loss").checked;

    const volumeFinal = perte ? volume * 1.05 : volume;

    const ciment = volumeFinal * dosage;

    const sacs = Math.ceil(ciment / 50);

    document.getElementById("volumeResult").textContent =
        volume.toFixed(2) + " m³";

    document.getElementById("volumeLossResult").textContent =
        volumeFinal.toFixed(2) + " m³";

    document.getElementById("cementResult").textContent =
        ciment.toFixed(1) + " kg";

    document.getElementById("bagsResult").textContent =
        sacs + " sacs";

    document.getElementById("results").style.display = "block";

});
