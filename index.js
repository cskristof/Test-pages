// Load dropdown items
async function loadDropdown() {
    const dropdown = document.getElementById("dropdown");

    const res = await fetch("./leagues.json", { mode: 'no-cors' });
    console.log(res)
    const items = await res.json();
    console.log(items)

    items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
    });

    loadDetails()

    // Event listener
    dropdown.addEventListener("change", (e) => {
        const listContainer = document.getElementById("list");

        const selectedId = e.target.value;
        if (selectedId) {
            loadDetails(listContainer, selectedId);
        } else {
            listContainer.innerHTML = "";
        }
    });
}

// Load details from two JSON files
async function loadDetails(listContainer, selectedId) {
    const [res1, res2] = await Promise.all([fetch(`./json/${selectedId}/groups.json`), fetch(`./json/${selectedId}/guide.json`)]);

    const data1 = await res1.json();
    const data2 = await res2.json();

    console.log(data1)
    console.log(data2)

    // const combined = [...(data1[selectedId] || []), ...(data2[selectedId] || [])];

    // renderList(listContainer, combined);
}

function renderList(listContainer, items) {
    listContainer.innerHTML = "";

    items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "item";

        const title = document.createElement("div");
        title.className = "title";
        title.textContent = `${item.title} - Requirement (${item.requirement})`;

        div.appendChild(title);

        if (item.subtasks && item.subtasks.length > 0) {
            item.subtasks.forEach((st) => {
                const subtask = document.createElement("div");
                subtask.className = "subtask";
                subtask.innerHTML = `
              <strong>Subtask:</strong> ${st.task}<br>
              <strong>Solution:</strong> ${st.solution}
            `;
                div.appendChild(subtask);
            });
        }

        listContainer.appendChild(div);
    });
}

// Init
loadDropdown();
