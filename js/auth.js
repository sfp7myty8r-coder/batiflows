// ======================================
// BATIFLOW — AUTHENTIFICATION SUPABASE
// ======================================


// ======================================
// CONFIGURATION SUPABASE
// ======================================

const BATIFLOW_SUPABASE_URL =
    "https://bwimievqpgaifjwbzayb.supabase.co";

const BATIFLOW_SUPABASE_KEY =
    "sb_publishable_D6v3wBJQVQypsPNyRZPfsA_PVQ_u-PX";


// ======================================
// CLIENT SUPABASE
// ======================================

const batiflowSupabase =
    window.supabase.createClient(
        BATIFLOW_SUPABASE_URL,
        BATIFLOW_SUPABASE_KEY
    );


// ======================================
// PROTÉGER UNE PAGE
// ======================================

async function protegerPageBATIFLOW() {

    try {

        const {
            data,
            error
        } =
            await batiflowSupabase
                .auth
                .getSession();


        if (error) {

            console.error(
                "Erreur Supabase :",
                error
            );

            window.location.href =
                "connexion.html";

            return null;
        }


        const session =
            data.session;


        // Aucun utilisateur connecté
        if (!session) {

            window.location.href =
                "connexion.html";

            return null;
        }


        // Utilisateur connecté
        return session;


    } catch (error) {

        console.error(
            "Erreur authentification :",
            error
        );

        window.location.href =
            "connexion.html";

        return null;
    }
}


// ======================================
// RÉCUPÉRER L'UTILISATEUR
// ======================================

async function obtenirUtilisateurBATIFLOW() {

    try {

        const {
            data,
            error
        } =
            await batiflowSupabase
                .auth
                .getUser();


        if (error) {

            console.error(
                "Erreur utilisateur :",
                error
            );

            return null;
        }


        return data.user;


    } catch (error) {

        console.error(error);

        return null;
    }
}


// ======================================
// DÉCONNEXION
// ======================================

async function deconnecterBATIFLOW() {

    try {

        await batiflowSupabase
            .auth
            .signOut();

    } catch (error) {

        console.error(
            "Erreur déconnexion :",
            error
        );

    }


    // Retour à la connexion
    window.location.href =
        "connexion.html";
}


// ======================================
// ÉCOUTER LES CHANGEMENTS DE SESSION
// ======================================

batiflowSupabase
    .auth
    .onAuthStateChange(
        function(event, session) {

            console.log(
                "BATIFLOW Auth :",
                event
            );

        }
    );

