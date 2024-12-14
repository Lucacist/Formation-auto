// Configuration des quiz pour chaque page
if (typeof quizConfig === 'undefined') {
    const quizConfig = {
        page1: {
            title: "Quiz - Formation sécurité",
            image: "img/accueil/securite.webp",
            link: "#quiz1",
            description: "Testez vos connaissances sur la sécurité"
        },
        page2: {
            title: "Quiz - Le Véhicule Automobile",
            image: "img/accueil/vehicule-auto.webp",
            link: "#quiz2",
            description: "Évaluez votre compréhension du véhicule automobile"
        },
        page3: {
            title: "Quiz - Les Pièces du Moteur",
            image: "img/accueil/pieces.webp",
            link: "#quiz3",
            description: "Testez vos connaissances sur les pièces du moteur"
        },
        page4: {
            title: "Quiz - La Distribution",
            image: "img/accueil/Courroie_distribution.webp",
            link: "#quiz4",
            description: "Évaluez vos connaissances sur la distribution"
        },
        page5: {
            title: "Quiz - Le Cycle à 4 temps",
            image: "img/accueil/cycle-4-temps.webp",
            link: "#quiz5",
            description: "Testez vos connaissances sur le cycle à 4 temps"
        },
        page6: {
            title: "Quiz - Les Caractéristiques du Moteur",
            image: "img/accueil/caracteristique-moteur.gif",
            link: "#quiz6",
            description: "Évaluez votre compréhension des caractéristiques du moteur"
        },
        page7: {
            title: "Quiz - Les Lubrifiants / Le Graissage",
            image: "img/accueil/lubrifiants.webp",
            link: "#quiz7",
            description: "Testez vos connaissances sur les lubrifiants et le graissage"
        },
        page8: {
            title: "Quiz - Le Refroidissement",
            image: "img/accueil/refroidissement.webp",
            link: "#quiz8",
            description: "Évaluez vos connaissances sur le système de refroidissement"
        },
        page9: {
            title: "Quiz - Les Pneumatiques",
            image: "img/accueil/pneu.webp",
            link: "#quiz9",
            description: "Testez vos connaissances sur les pneumatiques"
        },
        page10: {
            title: "Quiz - La Suspension",
            image: "img/accueil/suspension.webp",
            link: "#quiz10",
            description: "Évaluez vos connaissances sur la suspension"
        },
        page11: {
            title: "Quiz - La Suspension Pilotée",
            image: "img/accueil/suspension-pilotée.webp",
            link: "#quiz11",
            description: "Testez vos connaissances sur la suspension pilotée"
        },
        page12: {
            title: "Quiz - Les Trains Roulants",
            image: "img/accueil/Train-roulant.webp",
            link: "#quiz12",
            description: "Évaluez vos connaissances sur les trains roulants"
        },
        page13: {
            title: "Quiz - Le Freinage / ABS - ESP",
            image: "img/accueil/freinage.webp",
            link: "#quiz13",
            description: "Testez vos connaissances sur le freinage et les systèmes ABS/ESP"
        },
        page14: {
            title: "Quiz - La Direction",
            image: "img/accueil/direction.webp",
            link: "#quiz14",
            description: "Évaluez vos connaissances sur la direction"
        },
        page15: {
            title: "Quiz - La Transmission",
            image: "img/accueil/transmission.webp",
            link: "#quiz15",
            description: "Testez vos connaissances sur la transmission"
        },
        page16: {
            title: "Quiz - Electricité",
            image: "img/accueil/elec.webp",
            link: "#quiz16",
            description: "Évaluez vos connaissances en électricité automobile"
        },
        page17: {
            title: "Quiz - Alternateur / Démarreur",
            image: "img/accueil/alternateur.webp",
            link: "#quiz17",
            description: "Testez vos connaissances sur l'alternateur et le démarreur"
        },
        page18: {
            title: "Quiz - La Signalisation",
            image: "img/accueil/signalisation.webp",
            link: "#quiz18",
            description: "Évaluez vos connaissances sur la signalisation"
        },
        page19: {
            title: "Quiz - Les Carburants",
            image: "img/accueil/carburants.webp",
            link: "#quiz19",
            description: "Testez vos connaissances sur les carburants"
        },
        page20: {
            title: "Quiz - Les Capteurs de l'injection",
            image: "img/accueil/Systeme-general.webp",
            link: "#quiz20",
            description: "Évaluez vos connaissances sur les capteurs d'injection"
        },
        page21: {
            title: "Quiz - Injection Essence / Diesel",
            image: "img/accueil/injection.webp",
            link: "#quiz21",
            description: "Testez vos connaissances sur l'injection essence et diesel"
        },
        page22: {
            title: "Quiz - La Climatisation Automobile",
            image: "img/accueil/clim.webp",
            link: "#quiz22",
            description: "Évaluez vos connaissances sur la climatisation automobile"
        },
        page23: {
            title: "Quiz - Allumage",
            image: "img/accueil/allumage.webp",
            link: "#quiz23",
            description: "Testez vos connaissances sur l'allumage"
        },
        page24: {
            title: "Quiz - La Suralimentation",
            image: "img/accueil/suralimentation.gif",
            link: "#quiz24",
            description: "Évaluez vos connaissances sur la suralimentation"
        },
        page25: {
            title: "Quiz - La Dépollution",
            image: "img/accueil/depollution.webp",
            link: "#quiz25",
            description: "Testez vos connaissances sur la dépollution"
        },
        page26: {
            title: "Quiz - Les Airbags",
            image: "img/accueil/airbags.webp",
            link: "#quiz26",
            description: "Évaluez vos connaissances sur les airbags"
        },
        page27: {
            title: "Quiz - Le MUX",
            image: "img/accueil/mux.webp",
            link: "#quiz27",
            description: "Testez vos connaissances sur le MUX"
        },
        page28: {
            title: "Quiz - Le Tri Sélectif",
            image: "img/accueil/tri.webp",
            link: "#quiz28",
            description: "Évaluez vos connaissances sur le tri sélectif"
        },
        page29: {
            title: "Quiz - Les Aides à la Conduite",
            image: "img/accueil/aide.webp",
            link: "#quiz29",
            description: "Testez vos connaissances sur les aides à la conduite"
        },
        page30: {
            title: "Quiz - TP Atelier",
            image: "img/accueil/tp-atelier.webp",
            link: "#quiz30",
            description: "Évaluez vos connaissances pratiques d'atelier"
        }
    };
    window.quizConfig = quizConfig;
}
