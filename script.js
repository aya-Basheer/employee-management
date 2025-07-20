

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const roleInput = document.getElementById('role');
const salaryInput = document.getElementById('salary');
const statusInput = document.getElementById('status');
const tableBody = document.querySelector('#employee-table-body');
const trashBody = document.querySelector('#trash-table-body');
const showTrashBtn = document.getElementById('show-trash-btn');
const trashSection = document.getElementById('trash-section');
// const mainCount = document.getElementById('main-count');
const trashCount = document.getElementById('trash-count');
console.log(showTrashBtn);
//array for store employee
let employees = [];
let trash = [];

// proccess new input
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const salary = salaryInput.value.trim();
  const status = statusInput.value;

  if (!name || !role || !status || !salary) {
    alert('Please fill in all fields!');
    return;
  }

    if (name.length < 4 || role.length < 4) {
    alert('Name and Role must be at least 4 characters long.');
    return;
  }
      const hasNumbers = /\d/; 
    if(!hasNumbers.test(salary)){

 alert('Name and Role must  contain numbers only.');
    }
    // const hasNumbers = /\d/; 
  if (hasNumbers.test(name) || hasNumbers.test(role)) {
    alert('Name and Role must not contain numbers.');
    return;
  }
  employees.push({ id: Date.now(), name, role,salary, status });
  renderEmployees();
  form.reset();
});


function renderEmployees() {
  tableBody.innerHTML = '';
  // mainCount.innerText = employees.length;

  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.role}</td>
       <td>${emp.salary}</td>
      <td><span class="badge ${emp.status}">${emp.status}</span></td>
      <td>
       <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
  <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>`;
    tableBody.appendChild(tr);
  });
}

//store in trash
function deleteEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (confirm(`Move ${emp.name} to trash?`)) {
    trash.push(emp);
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
    renderTrash();
  }
}

// Modify employee data
function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  const newName = prompt('Edit Name:', emp.name);
  const newRole = prompt('Edit Role:', emp.role);
  const newSalary = prompt('Edit salary:', emp.salary);
  if (newName && newRole &&newSalary) {
    emp.name = newName;
    emp.role = newRole;
    emp.salary = newSalary;
    renderEmployees();
  }
}

// display trash
function renderTrash() {
  trashBody.innerHTML = '';
  trashCount.textContent = trash.length;

  trash.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td><span class="badge ${emp.status}">${emp.status}</span></td>
      <td>
        <button class="edit-btn" onclick="restoreEmployee(${emp.id})">Restore</button>
        <button class="delete-btn" onclick="permanentlyDelete(${emp.id})">Delete Forever</button>
      </td>`;
    trashBody.appendChild(tr);
  });
}

// 
function restoreEmployee(id) {
  const emp = trash.find(e => e.id === id);
  employees.push(emp);
  trash = trash.filter(e => e.id !== id);
  renderEmployees();
  renderTrash();
}

// permanently Delete
function permanentlyDelete(id) {
  if (confirm('Permanently delete this employee?')) {
    trash = trash.filter(e => e.id !== id);
    renderTrash();
  }
}


showTrashBtn.addEventListener('click', () => {
  trashSection.classList.toggle('hidden');
});

// scale performance
console.time('render');
renderEmployees();
console.timeEnd('render');

