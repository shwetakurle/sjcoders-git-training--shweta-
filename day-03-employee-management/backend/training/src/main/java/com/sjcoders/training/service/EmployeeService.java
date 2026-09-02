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

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> searchEmployees(String query) {
        List<Employee> byName =
                employeeRepository.findByFullNameContainingIgnoreCase(query);

        if (!byName.isEmpty()) {
            return byName;
        }

        return employeeRepository.findByDepartmentContainingIgnoreCase(query);
    }

    public Optional<Employee> updateEmployee(Long id, Employee updatedEmployee) {

        return employeeRepository.findById(id).map(employee -> {

            employee.setFullName(updatedEmployee.getFullName());
            employee.setEmployeeCode(updatedEmployee.getEmployeeCode());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setRole(updatedEmployee.getRole());
            employee.setPhone(updatedEmployee.getPhone());
            employee.setStatus(updatedEmployee.getStatus());

            return employeeRepository.save(employee);
        });
    }

    public boolean deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            return false;
        }

        employeeRepository.deleteById(id);
        return true;
    }
}