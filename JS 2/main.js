const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");
const sortSelect = document.getElementById("sortSelect");
const btnSaveStorage = document.getElementById("btnSaveStorage");
const inputs = document.getElementsByTagName("input");

let arrRecords = JSON.parse(localStorage.getItem("userRecords")) || [];
const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

iterateRecords();

sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    if (sortBy === "") return;

    arrRecords.sort((a, b) => {
        if (typeof a[sortBy] === 'string') {
            return a[sortBy].localeCompare(b[sortBy]);
        }
        return a[sortBy] - b[sortBy];
    });

    iterateRecords();
});

btnSaveStorage.addEventListener("click", () => {
    localStorage.setItem("userRecords", JSON.stringify(arrRecords));
    alert("Records saved to browser storage!");
});

btnInsertUpdate.addEventListener("click", () => {
    if(btnInsertUpdate.value === "insert") {
        for(const txt of inputs) {
            if(txt.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        const infoRecord = {
            fname: inputs[0].value,
            mname: inputs[1].value,
            lname: inputs[2].value,
            age: parseInt(inputs[3].value)      
        };
      
        arrRecords.push(infoRecord);
    } else {
        const index = parseInt(btnInsertUpdate.value);
        arrRecords[index] = {
            fname: inputs[0].value,
            mname: inputs[1].value,
            lname: inputs[2].value,
            age: parseInt(inputs[3].value)
        };

        btnInsertUpdate.innerText = "Insert";
        btnInsertUpdate.value = "insert";
    }

    for(const txt of inputs) txt.value = "";
    iterateRecords();
});

btnClear.addEventListener("click", () => {
    for(const txt of inputs) txt.value = "";
    btnInsertUpdate.innerText = "Insert";
    btnInsertUpdate.value = "insert";
});

btnClearItems.addEventListener("click", () => {
    if(confirm("Clear all records and storage?")) {
        arrRecords = [];
        localStorage.removeItem("userRecords");
        iterateRecords();
    }
});

function iterateRecords() {
    tblRecords.innerHTML = "";
    const status = document.getElementById("status");

    if(arrRecords.length > 0) {
        status.style.display = "none";

        const tblHeader = document.createElement("thead");
        const tblHeaderRow = document.createElement("tr");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";

        tblTHsLabels.forEach((label, i) => {
            const th = document.createElement("th");
            th.style.padding = "5px";
            if(i !== 4) th.style.borderRight = "1px solid black";
            th.innerText = label;
            tblHeaderRow.appendChild(th);
        });

        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);

        const tblBody = document.createElement("tbody");
        arrRecords.forEach((rec, i) => {
            const tblRow = document.createElement("tr");
            tblRow.style.borderBottom = "1px solid black";

            ['fname', 'mname', 'lname', 'age'].forEach(field => {
                const td = document.createElement("td");
                td.style.borderRight = "1px solid black";
                td.style.padding = "10px";
                td.innerText = rec[field];
                tblRow.appendChild(td);
            });

            const actionTd = document.createElement("td");
            actionTd.style.padding = "10px";

            const btnDelete = document.createElement("button");
            btnDelete.innerText = "Delete";
            btnDelete.style.marginRight = "5px";
            btnDelete.onclick = () => {
                arrRecords.splice(i, 1);
                iterateRecords();
            };

            const btnUpdate = document.createElement("button");
            btnUpdate.innerText = "Edit";
            btnUpdate.onclick = () => {
                inputs[0].value = rec.fname;
                inputs[1].value = rec.mname;
                inputs[2].value = rec.lname;
                inputs[3].value = rec.age;
                btnInsertUpdate.innerText = "Update";
                btnInsertUpdate.value = i;
            };

            actionTd.appendChild(btnDelete);
            actionTd.appendChild(btnUpdate);
            tblRow.appendChild(actionTd);
            tblBody.appendChild(tblRow);
        });
        tblRecords.appendChild(tblBody);
    } else {
        status.style.display = "inline";
        status.innerText = "No Records...";
    }
}