"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
        const { fullName, designation, contactNum, email, linkedin, address, careerObjective, languages, hobbies, skills, educationEntries, experienceEntries, profilePicDataURL } = JSON.parse(storedData);
        document.getElementById('fullName').innerText = fullName;
        document.getElementById('designation').innerText = designation;
        document.getElementById('contactNum').innerText = contactNum;
        document.getElementById('email').innerText = email;
        document.getElementById('llink').innerText = linkedin;
        document.getElementById('addrs').innerText = address;
        document.getElementById('careerob').innerText = careerObjective;
        if (profilePicDataURL) {
            document.getElementById('dp').src = profilePicDataURL;
        }
        populateList('language', languages);
        populateList('hobbies', hobbies);
        populateList('skills', skills);
        populateComplexEntries('.eduDetails', educationEntries, ['edyear', 'certification', 'school']);
        populateComplexEntries('.experience .eduDetails', experienceEntries, ['exyear', 'wdesignation', 'worg']);
    }
});
function populateList(elementId, items) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        container.appendChild(li);
    });
}
function populateComplexEntries(containerSelector, entries, fields) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('eduMoreDetail');
        fields.forEach(field => {
            const p = document.createElement('p');
            p.textContent = entry[field] || '';
            entryDiv.appendChild(p);
        });
        container.appendChild(entryDiv);
    });
}
// navigate back to the form for editing
function editResume() {
    window.location.href = 'index.html';
}
