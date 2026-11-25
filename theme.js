(function () {
    const STORAGE_KEY = "valentin_portfolio_theme";
    const THEMES = [
        { id: "cafe", label: "Thème Café (Défaut)" },
        { id: "clair", label: "Thème Clair" },
        { id: "sombre", label: "Thème Sombre" },
        { id: "bleu-orange", label: "Thème Bleu & Orange" }
    ];

    // 1. Appliquer immédiatement le thème sauvegardé (évite le flash blanc)
    const savedTheme = localStorage.getItem(STORAGE_KEY) || "cafe";
    if (savedTheme !== "cafe") {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    // 2. Injecter le sélecteur compact dans la barre de navigation une fois le DOM prêt
    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.querySelector(".nav-barre");
        if (!nav) return;

        // Si la barre n'avait qu'un seul élément aligné à droite, on équilibre gauche/droite
        if (nav.classList.contains("nav-droite")) {
            nav.classList.remove("nav-droite");
        }

        const switcher = document.createElement("div");
        switcher.className = "theme-switcher";
        switcher.setAttribute("aria-label", "Changer le thème de couleur");

        THEMES.forEach((t) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "theme-btn" + (t.id === savedTheme ? " active" : "");
            btn.setAttribute("data-set-theme", t.id);
            btn.title = t.label;

            btn.addEventListener("click", () => {
                if (t.id === "cafe") {
                    document.documentElement.removeAttribute("data-theme");
                } else {
                    document.documentElement.setAttribute("data-theme", t.id);
                }
                localStorage.setItem(STORAGE_KEY, t.id);

                switcher.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
            });

            switcher.appendChild(btn);
        });

        nav.prepend(switcher);
    });
})();
