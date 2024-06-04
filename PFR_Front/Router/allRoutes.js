import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/PFR_Front/pages/home.html", []),
    new Route("/galerie", "La galerie", "/PFR_Front/pages/galerie.html", []),
    new Route("/carte", "La carte", "/PFR_Front/pages/carte.html", []),
    new Route("/signin", "Inscription", "/PFR_Front/pages/auth/signin.html", "/PFR_Front/js/auth/signin.js", ['disconnected']),
    new Route("/signup", "Connexion", "/PFR_Front/pages/auth/signup.html", "/PFR_Front/js/auth/signup.js", ['disconnected']),
    new Route("/account", "Mon Compte", "/PFR_Front/pages/auth/account.html", ['client', 'admin']),
    new Route("/editPassword", "Modification Mdp", "/PFR_Front/pages/auth/editPassword.html", ['client', 'admin']),
    new Route("/reservations", "Les réservations", "/PFR_Front/pages/reservations/allResa.html", ['client']),
    new Route("/reserver", "Réserver", "/PFR_Front/pages/reservations/reserver.html", ['client']),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";