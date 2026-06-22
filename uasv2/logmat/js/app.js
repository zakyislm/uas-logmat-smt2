// State Proposisi
let state = {
    P: false,
    Q: false,
    R: false,
    S: true
};

// Data 20 Skenario Pengujian
const scenarios = [
    { no: 1, name: "Aman Sempurna", nim: "2510511059", student: "Dimitri", P: false, Q: false, R: false, S: true, expected: "K3" },
    { no: 2, name: "Terbukti Plagiarisme", nim: "2510511055", student: "Farrel", P: false, Q: true, R: false, S: true, expected: "K1" },
    { no: 3, name: "Menyontek Ujian", nim: "2510511038", student: "Fauzi", P: false, Q: false, R: true, S: true, expected: "K1" },
    { no: 4, name: "Kehadiran Kurang & Tugas Terlambat", nim: "2510511051", student: "Irsal", P: true, Q: false, R: false, S: false, expected: "K2" },
    { no: 5, name: "Kehadiran Kurang tapi Tugas Tepat", nim: "2510511065", student: "Zaky", P: true, Q: false, R: false, S: true, expected: "K3" },
    { no: 6, name: "Kehadiran Cukup tapi Tugas Terlambat", nim: "2510511101", student: "Budi", P: false, Q: false, R: false, S: false, expected: "K3" },
    { no: 7, name: "Plagiat & Menyontek", nim: "2510511102", student: "Andi", P: false, Q: true, R: true, S: true, expected: "K1" },
    { no: 8, name: "Bolos, Plagiat & Telat Tugas", nim: "2510511103", student: "Chandra", P: true, Q: true, R: false, S: false, expected: "K1" },
    { no: 9, name: "Skenario Komplit Pelanggaran", nim: "2510511104", student: "Deni", P: true, Q: true, R: true, S: false, expected: "K1" },
    { no: 10, name: "Kehadiran Cukup, Plagiat, Tugas Tepat", nim: "2510511105", student: "Eko", P: false, Q: true, R: false, S: true, expected: "K1" },
    { no: 11, name: "Kehadiran Cukup, Menyontek, Tugas Tepat", nim: "2510511106", student: "Fajar", P: false, Q: false, R: true, S: true, expected: "K1" },
    { no: 12, name: "Kehadiran Kurang, Menyontek, Tugas Tepat", nim: "2510511107", student: "Gani", P: true, Q: false, R: true, S: true, expected: "K1" },
    { no: 13, name: "Kehadiran Kurang, Plagiat, Tugas Tepat", nim: "2510511108", student: "Hadi", P: true, Q: true, R: false, S: true, expected: "K1" },
    { no: 14, name: "Kehadiran Kurang, Plagiat, Tugas Terlambat", nim: "2510511109", student: "Indra", P: true, Q: true, R: false, S: false, expected: "K1" },
    { no: 15, name: "Kehadiran Kurang, Menyontek, Tugas Terlambat", nim: "2510511110", student: "Joko", P: true, Q: false, R: true, S: false, expected: "K1" },
    { no: 16, name: "Aman - Kehadiran 100%, Tugas Tepat", nim: "2510511111", student: "Kurnia", P: false, Q: false, R: false, S: true, expected: "K3" },
    { no: 17, name: "Aman - Kehadiran 80%, Tugas Tepat", nim: "2510511112", student: "Lutfi", P: false, Q: false, R: false, S: true, expected: "K3" },
    { no: 18, name: "Hanya Bolos (Kehadiran < 75%)", nim: "2510511113", student: "Mawan", P: true, Q: false, R: false, S: true, expected: "K3" },
    { no: 19, name: "Hanya Telat Tugas (Tugas Terlambat)", nim: "2510511114", student: "Novi", P: false, Q: false, R: false, S: false, expected: "K3" },
    { no: 20, name: "Skenario Uji Batas Aman", nim: "2510511115", student: "Oki", P: false, Q: false, R: false, S: true, expected: "K3" }
];

// Inisialisasi Halaman
document.addEventListener("DOMContentLoaded", () => {
    renderScenarios();
    renderTruthTable();
    updateTogglesVisual();
    jalankanDeteksi(true);

    // Event Listeners
    document.getElementById("nim").addEventListener("input", jalankanDeteksi);
    document.getElementById("nama").addEventListener("input", jalankanDeteksi);
});

// Toggle Proposisi
function toggleCondition(prop) {
    state[prop] = !state[prop];
    updateTogglesVisual();
    jalankanDeteksi();

    // Vibration/pulse effect
    const btn = document.getElementById(`btn-${prop}`);
    btn.classList.add('scale-95');
    setTimeout(() => {
        btn.classList.remove('scale-95');
    }, 80);
}

// Sinkronisasi visual tombol toggle
function updateTogglesVisual() {
    ['P', 'Q', 'R', 'S'].forEach(prop => {
        const btn = document.getElementById(`btn-${prop}`);
        if (state[prop]) {
            btn.classList.add('active-condition');
        } else {
            btn.classList.remove('active-condition');
        }
    });
}

// Render Daftar Skenario
function renderScenarios() {
    const tbody = document.querySelector("#tableScenario tbody");
    tbody.innerHTML = "";
    scenarios.forEach(sc => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-primary/5 cursor-pointer border-b border-primary/10 transition-colors";
        tr.innerHTML = `
            <td class="p-2 border-r border-primary/20 font-headline font-bold text-xs">${sc.name}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${sc.P ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${sc.Q ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${sc.R ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${sc.S ? 'T' : 'F'}</td>
            <td class="p-2 text-center font-black">
                <span class="px-2 py-0.5 border border-primary ${sc.expected === 'K1' ? 'bg-secondary text-white' :
                sc.expected === 'K2' ? 'bg-primary-fixed text-primary' : 'bg-emerald-500 text-white'
            }">${sc.expected}</span>
            </td>
        `;
        tr.addEventListener("click", () => muatSkenario(sc));
        tbody.appendChild(tr);
    });
}

// Muat data skenario ke form
function muatSkenario(sc) {
    document.getElementById("nim").value = sc.nim;
    document.getElementById("nama").value = sc.student;
    state.P = sc.P;
    state.Q = sc.Q;
    state.R = sc.R;
    state.S = sc.S;
    updateTogglesVisual();
    jalankanDeteksi();
}

// Reset Form (Clear all inputs and toggles to pure empty)
function resetForm() {
    document.getElementById("nim").value = "";
    document.getElementById("nama").value = "";
    state.P = false;
    state.Q = false;
    state.R = false;
    state.S = false;
    updateTogglesVisual();
    jalankanDeteksi(true);
}

// Jalankan Deteksi menggunakan Forward Chaining
function jalankanDeteksi(skipScroll = false) {
    const nim = document.getElementById("nim").value || "-";
    const nama = document.getElementById("nama").value || "Mahasiswa Tanpa Nama";

    const P = state.P;
    const Q = state.Q;
    const R = state.R;
    const S = state.S;

    let logs = [];
    const timeStr = () => `[${new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(3, 8)}]`;

    logs.push(`<div class="text-[#ffcc00] font-black">${timeStr()} CORE_ENGINE: INITIALIZING SYSTEM SCAN...</div>`);
    logs.push(`<div>${timeStr()} IDENTIFICATION: NIM = ${nim} | NAMA = ${nama}</div>`);
    logs.push(`<div>${timeStr()} INPUT_FACTS: P (Kehadiran &lt; 75%) = ${P} | Q (Plagiarisme) = ${Q} | R (Menyontek) = ${R} | S (Tugas Tepat Waktu) = ${S}</div>\n`);

    let decision = "K3";
    let statusName = "STATUS AMAN";
    let statusDesc = "Mahasiswa teridentifikasi aman dari indikasi pelanggaran akademik utama.";
    let triggeredRule = "";

    // Forward Chaining Inference Engine

    // Evaluasi Rule 1
    logs.push(`<div>${timeStr()} EVALUATING RULE_01: Q ➝ K1 (Plagiarisme ➝ Pelanggaran Berat)</div>`);
    if (Q) {
        decision = "K1";
        statusName = "PELANGGARAN BERAT";
        statusDesc = "Ditemukan tindakan plagiarisme berat. Sistem merekomendasikan sanksi akademik tingkat tinggi.";
        triggeredRule = "Rule 1 (Q ➝ K1)";
        logs.push(`<div class="text-secondary font-black">${timeStr()} >>> RULE_01 TRIGGERED! Q IS TRUE. INFERENCE ENGINE HALTED.</div>`);
    } else {
        logs.push(`<div>${timeStr()} >>> RULE_01 BYPASSED (Q is False). Continuing...</div>`);

        // Evaluasi Rule 2
        logs.push(`\n<div>${timeStr()} EVALUATING RULE_02: R ➝ K1 (Menyontek ➝ Pelanggaran Berat)</div>`);
        if (R) {
            decision = "K1";
            statusName = "PELANGGARAN BERAT";
            statusDesc = "Ditemukan tindakan menyontek saat ujian. Sistem merekomendasikan sanksi akademik tingkat tinggi.";
            triggeredRule = "Rule 2 (R ➝ K1)";
            logs.push(`<div class="text-secondary font-black">${timeStr()} >>> RULE_02 TRIGGERED! R IS TRUE. INFERENCE ENGINE HALTED.</div>`);
        } else {
            logs.push(`<div>${timeStr()} >>> RULE_02 BYPASSED (R is False). Continuing...</div>`);

            // Evaluasi Rule 3
            logs.push(`\n<div>${timeStr()} EVALUATING RULE_03: (P ∧ ¬S) ➝ K2 (Kehadiran &lt; 75% DAN tugas terlambat ➝ Peringatan)</div>`);
            const notS = !S;
            const rule3Premis = P && notS;
            logs.push(`<div>${timeStr()} CHECKING PREMIS: P (Kehadiran &lt; 75%) = ${P} | ¬S (Tidak Tepat Tugas) = ${notS}</div>`);
            logs.push(`<div>${timeStr()} EVALUATION: (${P} ∧ ${notS}) = ${rule3Premis}</div>`);
            if (rule3Premis) {
                decision = "K2";
                statusName = "PERINGATAN AKADEMIK";
                statusDesc = "Kehadiran di bawah standar minimal sekaligus terlambat mengumpulkan tugas. Status mahasiswa masuk tahap waspada.";
                triggeredRule = "Rule 3 ((P ∧ ¬S) ➝ K2)";
                logs.push(`<div class="text-[#ffcc00] font-black">${timeStr()} >>> RULE_03 TRIGGERED! PREMIS IS TRUE. INFERENCE ENGINE HALTED.</div>`);
            } else {
                logs.push(`<div>${timeStr()} >>> RULE_03 BYPASSED. Continuing...</div>`);

                // Evaluasi Rule 4
                logs.push(`\n<div>${timeStr()} EVALUATING RULE_04 (DEFAULT): (¬Q ∧ ¬R ∧ ¬(P ∧ ¬S)) ➝ K3</div>`);
                const rule4Premis = !Q && !R && !rule3Premis;
                logs.push(`<div>${timeStr()} EVALUATION: ¬Q = ${!Q} | ¬R = ${!R} | ¬(P ∧ ¬S) = ${!rule3Premis}</div>`);
                logs.push(`<div>${timeStr()} COMBINED FACT: ${rule4Premis}</div>`);
                decision = "K3";
                statusName = "STATUS AMAN";
                statusDesc = "Seluruh kriteria pelanggaran bernilai False. Mahasiswa dalam kondisi aman.";
                triggeredRule = "Rule 4";
                logs.push(`<div class="text-emerald-400 font-black">${timeStr()} >>> RULE_04 ACTIVE. DEDUCTION COMPLETE.</div>`);
            }
        }
    }

    logs.push(`\n<div class="text-white font-black mt-4 pt-2 border-t border-white/10">${timeStr()} INFERENCE_RESULT: ${decision} (${statusName})</div>`);

    // Update UI Banner
    const banner = document.getElementById("resultBanner");
    const decisionEl = document.getElementById("resultDecision");
    const textEl = document.getElementById("resultText");
    const labelEl = document.getElementById("resultLabel");

    decisionEl.innerText = statusName;
    textEl.innerText = statusDesc;

    // Set styles based on decision
    if (decision === "K1") {
        banner.className = "bg-secondary text-white border-4 border-primary p-8 neo-brutal-shadow relative overflow-hidden transition-all duration-300 shrink-0";
        labelEl.className = "bg-white text-secondary px-4 py-1 font-headline font-black text-sm border-2 border-primary w-fit";
        labelEl.innerText = "K1 - CRITICAL WARNING";
    } else if (decision === "K2") {
        banner.className = "bg-primary-fixed text-primary border-4 border-primary p-8 neo-brutal-shadow relative overflow-hidden transition-all duration-300 shrink-0";
        labelEl.className = "bg-primary text-primary-fixed px-4 py-1 font-headline font-black text-sm border-2 border-primary w-fit";
        labelEl.innerText = "K2 - ACADEMIC ALERT";
    } else {
        banner.className = "bg-emerald-500 text-white border-4 border-primary p-8 neo-brutal-shadow relative overflow-hidden transition-all duration-300 shrink-0";
        labelEl.className = "bg-white text-emerald-600 px-4 py-1 font-headline font-black text-sm border-2 border-primary w-fit";
        labelEl.innerText = "K3 - SAFE STATE";
    }

    const pathBox = document.getElementById("pathBox");
    pathBox.innerHTML = logs.join("");
    pathBox.scrollTop = pathBox.scrollHeight;

    // Highlight row di tabel kebenaran
    highlightTruthTableRow(P, Q, R, S, skipScroll);
}

// Menghasilkan dan Merender 16 Kombinasi Tabel Kebenaran Lengkap
function renderTruthTable() {
    const tbody = document.querySelector("#truthTable tbody");
    tbody.innerHTML = "";

    // generate 16 kombinasi (P, Q, R, S)
    for (let i = 0; i < 16; i++) {
        const P = (i & 8) !== 0;
        const Q = (i & 4) !== 0;
        const R = (i & 2) !== 0;
        const S = (i & 1) !== 0;

        // Evaluasi output teoretis
        let K1 = Q || R;
        let K2 = !K1 && (P && !S);
        let K3 = !K1 && !K2;

        let finalResult = "K3";
        let badgeStyle = "bg-emerald-500 text-white";
        if (K1) {
            finalResult = "K1";
            badgeStyle = "bg-secondary text-white";
        } else if (K2) {
            finalResult = "K2";
            badgeStyle = "bg-primary-fixed text-primary";
        }

        const tr = document.createElement("tr");
        tr.setAttribute("data-p", P);
        tr.setAttribute("data-q", Q);
        tr.setAttribute("data-r", R);
        tr.setAttribute("data-s", S);
        tr.className = "hover:bg-primary/5 border-b border-primary/10 transition-colors";

        tr.innerHTML = `
            <td class="p-2 border-r border-primary/20 text-center font-bold">${P ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${Q ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${R ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${S ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${K1 ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${K2 ? 'T' : 'F'}</td>
            <td class="p-2 border-r border-primary/20 text-center font-bold">${K3 ? 'T' : 'F'}</td>
            <td class="p-2 text-center font-black">
                <span class="px-2 py-0.5 border border-primary ${badgeStyle}">${finalResult}</span>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

let scrollTimeout;

// Highlight baris tabel kebenaran yang sesuai dengan state input aktif
function highlightTruthTableRow(P, Q, R, S, skipScroll = false) {
    const rows = document.querySelectorAll("#truthTable tbody tr");
    let targetRow = null;
    rows.forEach(row => {
        const rowP = row.getAttribute("data-p") === "true";
        const rowQ = row.getAttribute("data-q") === "true";
        const rowR = row.getAttribute("data-r") === "true";
        const rowS = row.getAttribute("data-s") === "true";

        if (rowP === P && rowQ === Q && rowR === R && rowS === S) {
            row.classList.add("active-row");
            targetRow = row;
        } else {
            row.classList.remove("active-row");
        }
    });

    // Debounce scrollIntoView: wait 2.5 seconds of inactivity before scrolling
    clearTimeout(scrollTimeout);
    if (targetRow && !skipScroll) {
        scrollTimeout = setTimeout(() => {
            targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 2500); // 2.5 seconds
    }
}
