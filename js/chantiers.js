/* =========================================
   BATIFLOW — GESTION DES CHANTIERS
========================================= */


/* =========================================
   PROTECTION CONNEXION
========================================= */

const loggedIn = localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


/* =========================================
   UTILISATEUR
========================================= */

const savedUser = localStorage.getItem("batiflowUser");

if (savedUser) {

    try {

        const user = JSON.parse(savedUser);

        const userName = document.getElementById("userName");

        if (userName) {
            userName.textContent = user.name;
        }

    } catch (error) {

        console.log("Impossible de charger l'utilisateur.");

    }

}


/* =========================================
   ÉLÉMENTS HTML
========================================= */

const chantierModal = document.getElementById("chantierModal");
const addChantierButton = document.getElementById("addChantierButton");
const emptyAddButton = document.getElementById("emptyAddButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const chantierForm = document.getElementById("chantierForm");

const chantiersList = document.getElementById("chantiersList");
const emptyState = document.getElementById("emptyState");

const totalChantiers = document.getElementById("totalChantiers");
const chantiersEnCours = document.getElementById("chantiersEnCours");
const chantiersPause = document.getElementById("chantiersPause");
const chantiersTermines = document.getElementById("chantiersTermines");


/* =========================================
   STOCKAGE LOCAL
========================================= */

let chantiers = [];

const savedChantiers = localStorage.getItem("batiflowChantiers");

if (savedChantiers) {

    try {

        chantiers = JSON.parse(savedChantiers);

        if (!Array.isArray(chantiers)) {
            chantiers = [];
        }

    } catch (error) {

        chantiers = [];

    }

}


/* =========================================
   SAUVEGARDER
========================================= */

function sauvegarderChantiers() {

    localStorage.setItem(
        "batiflowChantiers",
        JSON.stringify(chantiers)
    );

}


/* =========================================
   OUVRIR MODALE
========================================= */

function ouvrirModal() {

    if (!chantierModal) {
        return;
    }

    chantierModal.classList.add("show");

}


/* =========================================
   FERMER MODALE
========================================= */

function fermerModal() {

    if (!chantierModal) {
        return;
    }

    chantierModal.classList.remove("show");

}


/* =========================================
   NOUVEAU CHANTIER
========================================= */

function nouveauChantier() {

    if (!chantierForm) {
        return;
    }

    chantierForm.reset();

    const avancement = document.getElementById(
        "chantierAvancement"
    );

    const depense = document.getElementById(
        "chantierDepense"
    );

    if (avancement) {
        avancement.value = 0;
    }

    if (depense) {
        depense.value = 0;
    }

    ouvrirModal();

}


/* =========================================
   BOUTON NOUVEAU CHANTIER
========================================= */

if (addChantierButton) {

    addChantierButton.addEventListener(
        "click",
        nouveauChantier
    );

}


if (emptyAddButton) {

    emptyAddButton.addEventListener(
        "click",
        nouveauChantier
    );

}


/* =========================================
   FERMETURE MODALE
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        fermerModal
    );

}


if (cancelModal) {

    cancelModal.addEventListener(
        "click",
        fermerModal
    );

}


if (chantierModal) {

    chantierModal.addEventListener(
        "click",
        function (event) {

            if (event.target === chantierModal) {
                fermerModal();
            }

        }
    );

}


/* =========================================
   FORMATAGE FCFA
========================================= */

function formatFCFA(nombre) {

    return Number(nombre || 0).toLocaleString(
        "fr-FR"
    ) + " FCFA";

}


/* =========================================
   FORMATAGE DATE
========================================= */

function formatDate(date) {

    if (!date) {
        return "Non renseignée";
    }

    const dateObj = new Date(
        date + "T00:00:00"
    );

    if (isNaN(dateObj.getTime())) {
        return date;
    }

    return dateObj.toLocaleDateString(
        "fr-FR"
    );

}


/* =========================================
   TEXTE DU STATUT
========================================= */

function getStatutText(statut) {

    switch (statut) {

        case "en-cours":
            return "En cours";

        case "pause":
            return "En pause";

        case "termine":
            return "Terminé";

        case "a-demarrer":
            return "À démarrer";

        default:
            return "À démarrer";

    }

}


/* =========================================
   CLASSE DU STATUT
========================================= */

function getStatutClass(statut) {

    switch (statut) {

        case "en-cours":
            return "status-en-cours";

        case "pause":
            return "status-pause";

        case "termine":
            return "status-termine";

        case "a-demarrer":
            return "status-a-demarrer";

        default:
            return "status-a-demarrer";

    }

}


/* =========================================
   AFFICHER STATISTIQUES
========================================= */

function afficherStatistiques() {

    const total = chantiers.length;

    const enCours = chantiers.filter(
        chantier => chantier.statut === "en-cours"
    ).length;

    const pause = chantiers.filter(
        chantier => chantier.statut === "pause"
    ).length;

    const termines = chantiers.filter(
        chantier => chantier.statut === "termine"
    ).length;


    if (totalChantiers) {
        totalChantiers.textContent = total;
    }

    if (chantiersEnCours) {
        chantiersEnCours.textContent = enCours;
    }

    if (chantiersPause) {
        chantiersPause.textContent = pause;
    }

    if (chantiersTermines) {
        chantiersTermines.textContent = termines;
    }

}


/* =========================================
   SÉCURISER LE TEXTE
========================================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   AFFICHER LES CHANTIERS
========================================= */

function afficherChantiers() {

    if (!chantiersList || !emptyState) {
        return;
    }


    chantiersList.innerHTML = "";


    if (chantiers.length === 0) {

        emptyState.style.display = "block";
        chantiersList.style.display = "none";

        afficherStatistiques();

        return;

    }


    emptyState.style.display = "none";
    chantiersList.style.display = "grid";


    chantiers.forEach(
        function (chantier, index) {

            const budget = Number(
                chantier.budget || 0
            );

            const depense = Number(
                chantier.depense || 0
            );

            const avancement = Math.min(
                100,
                Math.max(
                    0,
                    Number(
                        chantier.avancement || 0
                    )
                )
            );


            let budgetClass = "";


            if (budget > 0) {

                const ratio =
                    depense / budget;

                if (ratio >= 1) {

                    budgetClass =
                        "budget-danger";

                } else if (ratio >= 0.8) {

                    budgetClass =
                        "budget-warning";

                }

            }


            const card =
                document.createElement("article");


            card.className =
                "chantier-card";


            card.innerHTML = `

                <div class="chantier-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(chantier.nom)}
                        </h3>

                        <p class="chantier-client">
                            👤 ${escapeHTML(chantier.client)}
                        </p>

                    </div>

                    <span class="status-badge ${getStatutClass(chantier.statut)}">
                        ${getStatutText(chantier.statut)}
                    </span>

                </div>


                <div class="chantier-info-grid">

                    <div class="chantier-info">

                        <span>
                            📍 Localisation
                        </span>

                        <strong>
                            ${escapeHTML(
                                chantier.localisation
                            )}
                        </strong>

                    </div>


                    <div class="chantier-info">

                        <span>
                            📅 Début
                        </span>

                        <strong>
                            ${formatDate(
                                chantier.dateDebut
                            )}
                        </strong>

                    </div>


                    <div class="chantier-info">

                        <span>
                            🏁 Fin prévue
                        </span>

                        <strong>
                            ${formatDate(
                                chantier.dateFin
                            )}
                        </strong>

                    </div>


                    <div class="chantier-info">

                        <span>
                            💰 Budget
                        </span>

                        <strong>
                            ${formatFCFA(budget)}
                        </strong>

                    </div>

                </div>


                <div class="progress-section">

                    <div class="progress-top">

                        <span>
                            Avancement du chantier
                        </span>

                        <strong>
                            ${avancement}%
                        </strong>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${avancement}%"
                        ></div>

                    </div>

                </div>


                <div class="budget-section">

                    <div class="budget-row">

                        <span>
                            Dépenses actuelles
                        </span>

                        <strong class="${budgetClass}">
                            ${formatFCFA(depense)}
                        </strong>

                    </div>


                    <div class="budget-row">

                        <span>
                            Solde budget
                        </span>

                        <strong class="${
                            depense > budget
                                ? "budget-danger"
                                : ""
                        }">

                            ${formatFCFA(
                                budget - depense
                            )}

                        </strong>

                    </div>

                </div>


                ${
                    chantier.notes
                    ?
                    `
                    <div class="chantier-notes">

                        📝
                        ${escapeHTML(
                            chantier.notes
                        )}

                    </div>
                    `
                    :
                    ""
                }


                <div class="chantier-actions">

                    <button
                        type="button"
                        class="chantier-action"
                        onclick="modifierChantier(${index})"
                    >
                        ✏️ Modifier
                    </button>


                    <button
                        type="button"
                        class="chantier-action delete"
                        onclick="supprimerChantier(${index})"
                    >
                        🗑️ Supprimer
                    </button>

                </div>

            `;


            chantiersList.appendChild(card);

        }
    );


    afficherStatistiques();

}


/* =========================================
   ENREGISTRER UN CHANTIER
========================================= */

if (chantierForm) {

    chantierForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nom =
                document.getElementById(
                    "chantierNom"
                ).value.trim();


            const client =
                document.getElementById(
                    "chantierClient"
                ).value.trim();


            const localisation =
                document.getElementById(
                    "chantierLocalisation"
                ).value.trim();


            const dateDebut =
                document.getElementById(
                    "dateDebut"
                ).value;


            const dateFin =
                document.getElementById(
                    "dateFin"
                ).value;


            const budget =
                Number(
                    document.getElementById(
                        "chantierBudget"
                    ).value
                );


            const depense =
                Number(
                    document.getElementById(
                        "chantierDepense"
                    ).value
                ) || 0;


            const avancement =
                Number(
                    document.getElementById(
                        "chantierAvancement"
                    ).value
                );


            const statut =
                document.getElementById(
                    "chantierStatut"
                ).value;


            const notes =
                document.getElementById(
                    "chantierNotes"
                ).value.trim();


            if (!nom || !client || !localisation) {

                alert(
                    "Veuillez remplir les informations obligatoires."
                );

                return;

            }


            if (budget < 0 || depense < 0) {

                alert(
                    "Le budget et les dépenses ne peuvent pas être négatifs."
                );

                return;

            }


            if (
                avancement < 0 ||
                avancement > 100
            ) {

                alert(
                    "L'avancement doit être compris entre 0 et 100 %."
                );

                return;

            }


            const chantier = {

                id: Date.now(),

                nom: nom,

                client: client,

                localisation: localisation,

                dateDebut: dateDebut,

                dateFin: dateFin,

                budget: budget,

                depense: depense,

                avancement: avancement,

                statut: statut,

                notes: notes

            };


            chantiers.push(chantier);


            sauvegarderChantiers();


            chantierForm.reset();


            fermerModal();


            afficherChantiers();


            alert(
                "Chantier enregistré avec succès !"
            );

        }
    );

}


/* =========================================
   MODIFIER UN CHANTIER
========================================= */

window.modifierChantier =
function (index) {

    const chantier =
        chantiers[index];


    if (!chantier) {
        return;
    }


    document.getElementById(
        "chantierNom"
    ).value = chantier.nom || "";


    document.getElementById(
        "chantierClient"
    ).value = chantier.client || "";


    document.getElementById(
        "chantierLocalisation"
    ).value =
        chantier.localisation || "";


    document.getElementById(
        "dateDebut"
    ).value =
        chantier.dateDebut || "";


    document.getElementById(
        "dateFin"
    ).value =
        chantier.dateFin || "";


    document.getElementById(
        "chantierBudget"
    ).value =
        chantier.budget || 0;


    document.getElementById(
        "chantierDepense"
    ).value =
        chantier.depense || 0;


    document.getElementById(
        "chantierAvancement"
    ).value =
        chantier.avancement || 0;


    document.getElementById(
        "chantierStatut"
    ).value =
        chantier.statut || "a-demarrer";


    document.getElementById(
        "chantierNotes"
    ).value =
        chantier.notes || "";


    ouvrirModal();


    const ancienSubmit =
        chantierForm.onsubmit;


    chantierForm.onsubmit =
    function (event) {

        event.preventDefault();


        chantier.nom =
            document.getElementById(
                "chantierNom"
            ).value.trim();


        chantier.client =
            document.getElementById(
                "chantierClient"
            ).value.trim();


        chantier.localisation =
            document.getElementById(
                "chantierLocalisation"
            ).value.trim();


        chantier.dateDebut =
            document.getElementById(
                "dateDebut"
            ).value;


        chantier.dateFin =
            document.getElementById(
                "dateFin"
            ).value;


        chantier.budget =
            Number(
                document.getElementById(
                    "chantierBudget"
                ).value
            );


        chantier.depense =
            Number(
                document.getElementById(
                    "chantierDepense"
                ).value
            ) || 0;


        chantier.avancement =
            Number(
                document.getElementById(
                    "chantierAvancement"
                ).value
            );


        chantier.statut =
            document.getElementById(
                "chantierStatut"
            ).value;


        chantier.notes =
            document.getElementById(
                "chantierNotes"
            ).value.trim();


        sauvegarderChantiers();


        chantierForm.onsubmit =
            ancienSubmit || null;


        fermerModal();


        afficherChantiers();


        alert(
            "Chantier modifié avec succès !"
        );

    };

};


/* =========================================
   SUPPRIMER UN CHANTIER
========================================= */

window.supprimerChantier =
function (index) {

    const chantier =
        chantiers[index];


    if (!chantier) {
        return;
    }


    const confirmation =
        confirm(
            "Voulez-vous vraiment supprimer le chantier « " +
            chantier.nom +
            " » ?"
        );


    if (!confirmation) {
        return;
    }


    chantiers.splice(
        index,
        1
    );


    sauvegarderChantiers();


    afficherChantiers();

};


/* =========================================
   MENU MOBILE
========================================= */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================
   DÉCONNEXION
========================================= */

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


/* =========================================
   AFFICHAGE INITIAL
========================================= */

afficherChantiers();

