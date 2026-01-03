import URI_API from "./api.js";

/* ===== FETCH STATS ===== */
async function fetchStats() {
    try {
        const [codesRes, tagsRes, topicsRes] = await Promise.all([
            fetch(`${URI_API}/api/codes`),
            fetch(`${URI_API}/api/tags`),
            fetch(`${URI_API}/api/topics`)
        ]);

        const codesData = await codesRes.json();
        const tagsData = await tagsRes.json();
        const topicsData = await topicsRes.json();

        return {
            codes: codesData.total,      // 🔥 lấy trực tiếp total
            tags: tagsData.length,
            topics: topicsData.length
        };

    } catch (error) {
        console.error("Lỗi fetch thống kê:", error);
        return { codes: 0, tags: 0, topics: 0 };
    }
}

/* ===== INIT DASHBOARD ===== */
async function initDashboard() {
    const stats = await fetchStats();

    /* ===== SET NUMBER ===== */
    document.getElementById("codeCount").textContent = stats.codes;
    document.getElementById("tagCount").textContent = stats.tags;
    document.getElementById("topicCount").textContent = stats.topics;

    /* ===== BAR CHART ===== */
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: ["Codes", "Tags", "Topics"],
            datasets: [{
                label: "Số lượng",
                data: [stats.codes, stats.tags, stats.topics],
                backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    /* ===== DOUGHNUT CHART ===== */
    new Chart(document.getElementById("pieChart"), {
        type: "doughnut",
        data: {
            labels: ["Codes", "Tags", "Topics"],
            datasets: [{
                data: [stats.codes, stats.tags, stats.topics],
                backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
            }]
        },
        options: {
            responsive: true
        }
    });
}

initDashboard();
