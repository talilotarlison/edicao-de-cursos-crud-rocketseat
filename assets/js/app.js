// Diálogo modal para novo curso
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new-course-button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Gerador de ID único - https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
function idGenerator() {
  let uuid = self.crypto.randomUUID();
  return uuid;
}

// Função para obter a data atual no formato DD/MM/AAAA
function obterDataAtual() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// formulario novo curso
const formElement = document.getElementById('my-form');
const courseList = document.getElementById('course-list');
// Adicionar evento de envio ao formulário
formElement.addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  const formData = new FormData(formElement);

  const formContent = {
    id: idGenerator(),
    courseName: formData.get('course-name'),
    category: formData.get('category-course'),
    instructor: formData.get('instructor-course'),
    statusCourse: formData.get('status-course'),
    urlCourse: formData.get('course-url'),
    dataAdded: obterDataAtual()
  }
  addNwewCourseLocalStorege(formContent);
  formElement.reset();
  dialog.close();
  loadCoursesFromLocalStorage()
});

// Função para adicionar novo curso ao localStorage
function addNwewCourseLocalStorege(course) {
  let courses = JSON.parse(localStorage.getItem('courses')) || [];
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Função para deixar a primeira letra maiúscula
function primeiraLetraMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Componente linha da tabela curso
function componentCourseList(course) {
  return (`<tr>
            <td>${primeiraLetraMaiuscula(course.courseName)}</td>
            <td>${primeiraLetraMaiuscula(course.category)}</td>
            <td>${primeiraLetraMaiuscula(course.instructor)}</td>
            <td>${course.statusCourse == "yes" ? "Sim" : "Não"}</td>
            <td>Desde ${course.dataAdded}</td>
            <td class="watch ${course.statusCourse == "yes" ? "" : "isDisabled"}">
                <a href="${course.statusCourse == "yes" ? course.urlCourse : "#"}" ${course.statusCourse == "yes" ? "target='_blank'" : "target='_self'"}>
                    <i class="material-icons">play_circle_outline</i>
                    Estudar
                </a>
            </td>
            <td class="edit-link"><a href="./page/course.html?id=${course.id}">
                    <i class="material-icons">edit</i>
                    Editar
                </a>
            </td>
        </tr>`);
}

// Adicionar curso à lista na página inicial
function loadingCourseToList(course) {
  const courseList = document.getElementById('course-list');
  courseList.innerHTML += componentCourseList(course);
}

// Carregar cursos do localStorage ao carregar a página
function loadCoursesFromLocalStorage() {
  courseList.innerHTML = '';
  let courses = JSON.parse(localStorage.getItem('courses')) || [];
  if (courses.length === 0) {
    courseList.innerHTML = '<tr><td colspan="7">Nenhum curso cadastrado.</td></tr>';
    return;
  }

  courses.forEach(course => {
    loadingCourseToList(course);
  });
}

// Inicialização da aplicação
function initApp() {
  console.log("App initialized");
  window.addEventListener('load', loadCoursesFromLocalStorage);
}
// Inicia a aplicação
initApp();
