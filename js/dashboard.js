// ======================================
// BATIFLOW - TABLEAU DE BORD
// ======================================


// Vérification de connexion

const loggedIn =
    localStorage.getItem("batiflowLoggedIn");

if (loggedIn !== "true") {

    window.location.href = "login.html";

}


// Récupération de l'utilisateur

const savedUser =
    localStorage.getItem("batiflowUser");


if (savedUser) {

    const user =
        JSON.parse(savedUser);


    const userName =
        document.getElementById("userName");

    const welcomeName =
        document.getElementById("welcomeName");


    if (userName) {

        userName.textContent =
            user.name;

    }


    if (welcomeName) {

        welcomeName.textContent =
            user.name + " 👋";

    }

}


// Déconnexion

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


// Menu mobile

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
