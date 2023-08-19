// @ts-check
window.addEventListener("DOMContentLoaded", () => {
    // HTML
    const button = document.getElementById("exec");
    if (button == null) throw new Error("button null");
    const bands = document.getElementById("bands");
    if (!(bands instanceof HTMLInputElement)) throw new Error("bands not input");
    const otherArea = document.getElementById("other");
    if (otherArea == null) throw new Error("otherArea null");

    // ボタンイベント設定
    button.addEventListener("click", () => {
        // 入力分割
        const inputBands = bands.value
            .replace(/\//g, ",")
            .split(",")
            .map(p=>p.replace(/ /g, ""));
        const jpBands = [1,3,8,11,18,19,21,26,28,41,42];
        const operators = ["d","a","s","r"];
        // bandごと
        for (const jpBand of jpBands) {
            // 事業者ごとに繰り返し
            for (const ops of operators) {
                // 対応検索
                const operator = document.getElementById(`b${jpBand}-${ops}`);
                // 日本のbandの対応事業者がいれば
                if (operator != null) {
                    operator.classList.remove("compatible", "incompatible");
                    // 事業者の使用するbandが入力されていれば
                    if (inputBands.includes(jpBand.toString())) {
                        operator.classList.add("compatible");
                    } else {
                        operator.classList.add("incompatible");
                    }
                }
            }
        }
        const otherBands = inputBands.filter(u=>!(
            jpBands.map(p=>p.toString())
                .includes(u)
        ));
        otherArea.textContent = otherBands.toString();
    });

    bands.addEventListener("keypress", (ev) => {
        if (ev.key == "Enter") button.click();
    });
});