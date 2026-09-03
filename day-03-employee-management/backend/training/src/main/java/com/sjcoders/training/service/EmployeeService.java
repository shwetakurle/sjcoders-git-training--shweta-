package com.sjcoders.training.service;

import com.sjcoders.training.model.Employee;
import com.sjcoders.training.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Add employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Search employee
    public List<Employee> searchEmployees(String query) {

        List<Employee> byName =
                employeeRepository.findByFullNameContainingIgnoreCase(query);

        if (!byName.isEmpty()) {
            return byName;
        }

        return employeeRepository
                .findByDepartmentContainingIgnoreCase(query);
    }

    // Update employee
    public Optional<Employee> updateEmployee(
            Long id,
            Employee updatedEmployee) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {

                    existingEmployee.setFullName(
                            updatedEmployee.getFullName()
                    );

                    existingEmployee.setEmail(
                            updatedEmployee.getEmail()
                    );

                    existingEmployee.setDepartment(
                            updatedEmployee.getDepartment()
                    );

                    return employeeRepository.save(existingEmployee);
                });
    }

    // Delete employee
    public boolean deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            return false;
        }

        employeeRepository.deleteById(id);
        return true;
    }
}