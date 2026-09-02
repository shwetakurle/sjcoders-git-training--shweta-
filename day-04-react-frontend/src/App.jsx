import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    fullName: "",
    employeeCode: "",
    email: "",
    department: "",
    role: "",
    phone: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(emptyForm);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Could not load employees. Check Spring Boot backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.fullName ||
      !formData.employeeCode ||
      !formData.email ||
      !formData.department ||
      !formData.role ||
      !formData.phone
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (editingId !== null) {
        await updateEmployee(editingId, formData);
        setMessage("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        setMessage("Employee added successfully!");
      }

      clearForm();
      await loadEmployees();
    } catch (err) {
      setError("Operation failed. Please check the backend.");
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      fullName: employee.fullName || "",
      employeeCode: employee.employeeCode || "",
      email: employee.email || "",
      department: employee.department || "",
      role: employee.role || "",
      phone: employee.phone || "",
      status: employee.status || "ACTIVE",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      setMessage("");
      setError("");

      await deleteEmployee(id);
      setMessage("Employee deleted successfully!");

      await loadEmployees();
    } catch (err) {
      setError("Unable to delete employee.");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const value = search.toLowerCase();

    return (
      employee.fullName?.toLowerCase().includes(value) ||
      employee.employeeCode?.toLowerCase().includes(value) ||
      employee.email?.toLowerCase().includes(value) ||
      employee.department?.toLowerCase().includes(value) ||
      employee.role?.toLowerCase().includes(value)
    );
  });

  const departmentCount = new Set(
    employees.map((employee) => employee.department).filter(Boolean)
  ).size;

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">
          🚀 Employee Command Center
        </span>

        <span className="text-light">
          React + Spring Boot
        </span>
      </nav>

      <div className="container py-4">

        {message && (
          <div className="alert alert-success">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            ⚠️ {error}
          </div>
        )}

        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Employees</h6>
                <h2>{employees.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Departments</h6>
                <h2>{departmentCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">API Status</h6>
                <h5 className={error ? "text-danger" : "text-success"}>
                  {error ? "Check Connection" : "● Connected"}
                </h5>
              </div>
            </div>
          </div>

        </div>

        <div className="row g-4">

          <div className="col-lg-4">

            <div className="card shadow-sm border-0">
              <div className="card-body">

                <h4 className="mb-3">
                  {editingId !== null
                    ? "✏️ Edit Employee"
                    : "➕ Add Employee"}
                </h4>

                <form onSubmit={handleSubmit}>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="employeeCode"
                    className="form-control mb-3"
                    placeholder="Employee Code (Example: SJC-103)"
                    value={formData.employeeCode}
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="department"
                    className="form-control mb-3"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="role"
                    className="form-control mb-3"
                    placeholder="Role / Designation"
                    value={formData.role}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <select
                    name="status"
                    className="form-select mb-3"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    {editingId !== null
                      ? "Update Employee"
                      : "Save Employee"}
                  </button>

                  {editingId !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={clearForm}
                    >
                      Cancel Edit
                    </button>
                  )}

                </form>

              </div>
            </div>
          </div>

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">
              <div className="card-body">

                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">

                  <h4>👥 Employee Directory</h4>

                  <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "300px" }}
                    placeholder="🔍 Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                </div>

                {loading ? (

                  <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-3">
                      Loading employees...
                    </p>
                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle">

                      <thead className="table-dark">
                        <tr>
                          <th>Code</th>
                          <th>Employee</th>
                          <th>Department</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>

                        {filteredEmployees.map((employee) => (

                          <tr key={employee.id}>

                            <td>
                              <span className="badge bg-primary">
                                {employee.employeeCode}
                              </span>
                            </td>

                            <td>
                              <strong>
                                {employee.fullName}
                              </strong>

                              <br />

                              <small className="text-muted">
                                {employee.email}
                              </small>

                              <br />

                              <small>
                                📞 {employee.phone}
                              </small>
                            </td>

                            <td>{employee.department}</td>

                            <td>{employee.role}</td>

                            <td>
                              <span
                                className={
                                  employee.status === "ACTIVE"
                                    ? "badge bg-success"
                                    : "badge bg-secondary"
                                }
                              >
                                {employee.status}
                              </span>
                            </td>

                            <td>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(employee)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDelete(employee.id)
                                }
                              >
                                Delete
                              </button>
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                    {filteredEmployees.length === 0 && (
                      <div className="text-center text-muted py-4">
                        No employees found.
                      </div>
                    )}

                  </div>

                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;