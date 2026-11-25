(function () {
    const STORAGE_KEY = "valentin_portfolio_theme";
    const THEMES = [
        { id: "finary", label: "Café / Finary", dot: "#e5a93c" },
        { id: "notion", label: "Clair (Notion)", dot: "#37352f" },
        { id: "gemini", label: "Sombre (Gemini)", dot: "#8ab4f8" },
        { id: "bleu-orange", label: "Bleu & Orange", dot: "#f97316" }
    ];

    // Compatibilité si l'ancien thème "cafe" était enregistré
    let savedTheme = localStorage.getItem(STORAGE_KEY) || "finary";
    if (savedTheme === "cafe") savedTheme = "finary";

    if (savedTheme !== "finary") {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.querySelector(".nav-barre");
        if (!nav) return;

        if (nav.classList.contains("nav-droite")) {
            nav.classList.remove("nav-droite");
        }

        const currentObj = THEMES.find((t) => t.id === savedTheme) || THEMES[0];

        const dropdown = document.createElement("div");
        dropdown.className = "theme-dropdown";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "theme-toggle-btn";
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.innerHTML = `
            <span class="theme-dot" style="background:${currentObj.dot}"></span>
            <span class="theme-current-label">${currentObj.label}</span>
            <span class="theme-chevron">▼</span>
        `;

        const menu = document.createElement("div");
        menu.className = "theme-menu";

        THEMES.forEach((t) => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "theme-option" + (t.id === savedTheme ? " active" : "");
            option.innerHTML = `
                <span class="theme-option-left">
                    <span class="theme-dot" style="background:${t.dot}"></span>
                    <span>${t.label}</span>
                </span>
                ${t.id === savedTheme ? "<span>✓</span>" : ""}
            `;

            option.addEventListener("click", () => {
                if (t.id === "finary") {
                    document.documentElement.removeAttribute("data-theme");
                } else {
                    document.documentElement.setAttribute("data-theme", t.id);
                }
                localStorage.setItem(STORAGE_KEY, t.id);

                // Mettre à jour le bouton principal
                toggleBtn.querySelector(".theme-dot").style.background = t.dot;
                toggleBtn.querySelector(".theme-current-label").textContent = t.label;

                // Mettre à jour l'état actif dans le menu
                menu.querySelectorAll(".theme-option").forEach((el, idx) => {
                    const item = THEMES[idx];
                    const isAct = item.id === t.id;
                    el.classList.toggle("active", isAct);
                    el.innerHTML = `
                        <span class="theme-option-left">
                            <span class="theme-dot" style="background:${item.dot}"></span>
                            <span>${item.label}</span>
                        </span>
                        ${isAct ? "<span>✓</span>" : ""}
                    `;
                });

                dropdown.classList.remove("open");
                toggleBtn.setAttribute("aria-expanded", "false");
            });

            menu.appendChild(option);
        });

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle("open");
            toggleBtn.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", () => {
            dropdown.classList.remove("open");
            toggleBtn.setAttribute("aria-expanded", "false");
        });

        dropdown.appendChild(toggleBtn);
        dropdown.appendChild(menu);
        nav.prepend(dropdown);
    });
})();
