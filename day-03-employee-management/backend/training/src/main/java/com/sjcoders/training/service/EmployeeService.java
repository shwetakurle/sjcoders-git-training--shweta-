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
}