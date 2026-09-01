const API_URL = "http://localhost:8080/api/employees";

const employeeForm = document.getElementById("employeeForm");
const tableBody = document.getElementById("employeeTableBody");
const searchBox = document.getElementById("searchBox");
const message = document.getElementById("message");

// Load all employees
async function loadEmployees() {
    try {
        const response = await fetch(API_URL);
        const employees = await response.json();

        displayEmployees(employees);
    } catch (error) {
        showMessage("Unable to load employees.", "danger");
    }
}

// Display employees in table
function displayEmployees(employees) {
    tableBody.innerHTML = "";

    employees.forEach(employee => {
        const row = `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.employeeCode}</td>
                <td>${employee.fullName}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.role}</td>
                <td>${employee.status}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

// Save employee
employeeForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const employee = {
        employeeCode: document.getElementById("employeeCode").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        role: document.getElementById("role").value,
        status: document.getElementById("status").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            showMessage("Employee saved successfully!", "success");

            employeeForm.reset();

            loadEmployees();
        } else {
            showMessage("Failed to save employee.", "danger");
        }

    } catch (error) {
        showMessage("Server connection error.", "danger");
    }
});

// Search employee
searchBox.addEventListener("input", async function() {
    const query = searchBox.value.trim();

    if (query === "") {
        loadEmployees();
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/search?query=${encodeURIComponent(query)}`
        );

        const employees = await response.json();

        displayEmployees(employees);

    } catch (error) {
        showMessage("Search failed.", "danger");
    }
});

// Show success/error message
function showMessage(text, type) {
    message.innerHTML = `
        <div class="alert alert-${type}">
            ${text}
        </div>
    `;

    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
}

// Load employees when page opens
loadEmployees();