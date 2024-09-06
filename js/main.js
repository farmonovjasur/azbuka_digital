const burger = document.querySelector('.burger')

burger.addEventListener('click', () => {
	burger.classList.toggle('active')
})

const addChosen = document.getElementById('suit_heart')

//sidebar

// Stack to keep track of the navigation history
let navigationHistory = [];

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.width === '325px') {
        sidebar.style.width = '0';
        sidebar.style.opacity = '0';
        closeAllNestedSidebars(); // Close any open nested sidebars
    } else {
        sidebar.style.width = '325px';
        sidebar.style.opacity = '1';
        resetSidebarContent(); // Reset the sidebar content to its initial state
    }
}

function openNestedSidebar(id) {
    closeAllNestedSidebars(); // Close any open nested sidebars before opening a new one
    const nestedSidebar = document.getElementById(id);
    nestedSidebar.style.width = '325px';
    nestedSidebar.style.opacity = '1'; // Set opacity to 1 when opening
}

function closeNestedSidebar(id) {
    const nestedSidebar = document.getElementById(id);
    nestedSidebar.style.width = '0';
    nestedSidebar.style.opacity = '0'; // Set opacity to 0 when closing
}

function closeAllNestedSidebars() {
    const nestedSidebars = document.querySelectorAll('.nested-sidebar');
    nestedSidebars.forEach(sidebar => {
        sidebar.style.width = '0';
        sidebar.style.opacity = '0'; // Set opacity to 0 for all nested sidebars
    });
}

function replaceNestedContent(containerId, newContentId) {
    const container = document.getElementById(containerId);

    // Push current state to the history stack
    navigationHistory.push(container.innerHTML);

    // Replace content with new content
    const newContent = document.getElementById(newContentId).innerHTML;
    container.innerHTML = newContent;
}

function resetSidebarContent() {
    // Reset nested sidebars and their content to the default view
    document.getElementById('nested-content1').innerHTML = `
        <h3>Курсы и обучение</h3>
        <a href="#" onclick="replaceNestedContent('nested-content1', 'newContent1')">SMM - продвижение в соц. сетях</a>
        <a href="#" onclick="replaceNestedContent('nested-content1', 'newContent2')">Программирование</a>
        <a href="#" onclick="replaceNestedContent('nested-content1', 'newContent3')">Создание сайтов</a>
    `;
    navigationHistory = []; // Clear history when resetting
}

function navigateBack(containerId) {
    if (navigationHistory.length > 0) {
        // Pop the last state from the history stack and set it as current content
        const previousContent = navigationHistory.pop();
        const container = document.getElementById(containerId);
        container.innerHTML = previousContent;
    } else {
        // If no history, reset to default content
        resetSidebarContent();
    }
}

