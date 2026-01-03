fetch("components/sidebar.html")
    .then(res => res.text())
    .then(html => {
        const sidebarContainer = document.getElementById("sidebar");
        sidebarContainer.innerHTML = html;

        const sidebar = sidebarContainer.querySelector(".sidebar");
        const toggleBtn = sidebar.querySelector("#toggleSidebar");

        /* ===== Active menu theo URL ===== */
        const currentPage = location.pathname.split("/").pop() || "index.html";

        sidebar.querySelectorAll(".nav-link").forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

        /* ===== Restore trạng thái collapse ===== */
        if (localStorage.getItem("sidebarCollapsed") === "true") {
            sidebar.classList.add("collapsed");
        }

        /* ===== Toggle sidebar ===== */
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");

            localStorage.setItem(
                "sidebarCollapsed",
                sidebar.classList.contains("collapsed")
            );
        });
    });
