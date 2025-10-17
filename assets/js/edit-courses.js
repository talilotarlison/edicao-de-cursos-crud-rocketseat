// Função para pegar o parâmetro 'id' da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Pega o valor do parâmetro 'id'
const userId = getUrlParameter('id');

// Exibe o valor na página
console.log("Edit Courses script loaded. User ID:", userId);

// Função para obter a data atual no formato DD/MM/AAAA
function obterDataAtual() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Excluir courso
const deleteCourseButton = document.getElementById('delete-course-button');
deleteCourseButton.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses = courses.filter(c => c.id !== userId);
        localStorage.setItem('courses', JSON.stringify(courses));
        alert("Curso excluído com sucesso!");
        window.location.href = '../index.html'; // Redireciona para a página de cursos

    }
});

// Seleciona os campos do formulário
const formDataCourse = {
    categoryCourseInput: document.getElementById('category-course'),
    courseNameInput: document.getElementById('course-name'),
    instructorCourseInput: document.getElementById('instructor-course'),
    statusCourseInput: document.getElementById('status-course'),
    courseUrlInput: document.getElementById('course-url'),
}

// atualizar curso
const updateCourseForm = document.getElementById('btn-save');
updateCourseForm.addEventListener('click', (e) => {
    e.preventDefault();
    // Seleciona os campos do formulário
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseIndex = courses.findIndex(c => c.id === userId);
    if (courseIndex !== -1) {
        courses[courseIndex] = {
            id: userId,
            courseName: formDataCourse.courseNameInput.value,
            category: formDataCourse.categoryCourseInput.value,
            instructor: formDataCourse.instructorCourseInput.value,
            statusCourse: formDataCourse.statusCourseInput.value,
            urlCourse: formDataCourse.courseUrlInput.value,
            dataAdded: obterDataAtual()
        };
        localStorage.setItem('courses', JSON.stringify(courses));
        alert("Curso atualizado com sucesso!");
        window.location.href = '../index.html'; // Redireciona para a página de cursos
    } else {
        alert(`Curso não encontrado com ID: ${userId}`);
        console.error("Curso não encontrado com ID:", userId);
    }
});

// Função para carregar os dados do curso com base no ID
function loadCourseData(userId) {
    // Carrega os cursos do localStorage
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(c => c.id === userId);
    console.log("Course data for ID", userId, ":", course);
    // Seleciona os campos do formulário
    if (course) {
        formDataCourse.courseNameInput.value = course.courseName;
        formDataCourse.categoryCourseInput.value = course.category;
        formDataCourse.instructorCourseInput.value = course.instructor;
        formDataCourse.statusCourseInput.value = course.statusCourse;
        formDataCourse.courseUrlInput.value = course.urlCourse;
    } else {
        alert(`Curso não encontrado com ID: ${userId}`);
        console.error("Curso não encontrado com ID:", userId);
    }
}

// Carrega os dados do curso ao carregar a página
window.addEventListener('load', () => {
    if (userId) {
        loadCourseData(userId);
    } else {
        console.error("Nenhum ID de curso fornecido na URL.");
    }
});
