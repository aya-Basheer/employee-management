

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const roleInput = document.getElementById('role');
const statusInput = document.getElementById('status');
const tableBody = document.querySelector('#employee-table-body');
const trashBody = document.querySelector('#trash-table-body');
const showTrashBtn = document.getElementById('show-trash-btn');
const trashSection = document.getElementById('trash-section');
// const mainCount = document.getElementById('main-count');
const trashCount = document.getElementById('trash-count');
console.log(showTrashBtn);
// مصفوفات لتخزين البيانات
let employees = [];
let trash = [];

// معالجة إدخال جديد
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const status = statusInput.value;

  if (!name || !role || !status) {
    alert('Please fill in all fields!');
    return;
  }

  employees.push({ id: Date.now(), name, role, status });
  renderEmployees();
  form.reset();
});

// عرض الموظفين الرئيسيين
function renderEmployees() {
  tableBody.innerHTML = '';
  // mainCount.innerText = employees.length;

  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td><span class="badge ${emp.status}">${emp.status}</span></td>
      <td>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

// نقل إلى سلة المهملات
function deleteEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (confirm(`Move ${emp.name} to trash?`)) {
    trash.push(emp);
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
    renderTrash();
  }
}

// تعديل بيانات موظف
function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  const newName = prompt('Edit Name:', emp.name);
  const newRole = prompt('Edit Role:', emp.role);

  if (newName && newRole) {
    emp.name = newName;
    emp.role = newRole;
    renderEmployees();
  }
}

// عرض سلة المهملات
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
        <button onclick="restoreEmployee(${emp.id})">Restore</button>
        <button onclick="permanentlyDelete(${emp.id})">Delete Forever</button>
      </td>`;
    trashBody.appendChild(tr);
  });
}

// استرجاع موظف من سلة المهملات
function restoreEmployee(id) {
  const emp = trash.find(e => e.id === id);
  employees.push(emp);
  trash = trash.filter(e => e.id !== id);
  renderEmployees();
  renderTrash();
}

// حذف نهائي
function permanentlyDelete(id) {
  if (confirm('Permanently delete this employee?')) {
    trash = trash.filter(e => e.id !== id);
    renderTrash();
  }
}

// عرض/إخفاء سلة المهملات
showTrashBtn.addEventListener('click', () => {
  trashSection.classList.toggle('hidden');
});

// قياس أداء العرض
console.time('render');
renderEmployees();
console.timeEnd('render');

