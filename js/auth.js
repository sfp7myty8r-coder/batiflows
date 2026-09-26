// ======================================
// BATIFLOW - AUTHENTIFICATION V1
// ======================================

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


// ================================
// INSCRIPTION
// ================================

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const passwordConfirm =
            document.getElementById("registerPasswordConfirm").value;

        const message =
            document.getElementById("registerMessage");


        if (password !== passwordConfirm) {

            message.textContent =
                "Les mots de passe ne correspondent pas.";

            return;
        }


        const user = {

            name: name,
            email: email,
            password: password

        };


        localStorage.setItem(
            "batiflowUser",
            JSON.stringify(user)
        );


        message.textContent =
            "Compte créé avec succès !";


        setTimeout(function() {

            window.location.href = "login.html";

        }, 1000);

    });

}


// ================================
// CONNEXION
// ================================

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        const savedUser =
            localStorage.getItem("batiflowUser");


        if (!savedUser) {

            message.textContent =
                "Aucun compte trouvé. Créez d'abord un compte.";

            return;
        }


        const user =
            JSON.parse(savedUser);


        if (
            email === user.email &&
            password === user.password
        ) {

            localStorage.setItem(
                "batiflowLoggedIn",
                "true"
            );


            message.textContent =
                "Connexion réussie !";


            setTimeout(function() {

                window.location.href =
                    "dashboard.html";

            }, 800);

        } else {

            message.textContent =
                "E-mail ou mot de passe incorrect.";

        }

    });

}
