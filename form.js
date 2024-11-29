"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to load data from localStorage when the form is opened
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
        const { fullName, designation, contactNum, email, linkedin, address, careerObjective, languages, hobbies, skills, educationEntries, experienceEntries, profilePicDataURL } = JSON.parse(storedData);
        // Populate form fields with stored data
        document.getElementById('fullNameInput').value = fullName || '';
        document.getElementById('designationInput').value = designation || '';
        document.getElementById('contactNumInput').value = contactNum || '';
        document.getElementById('emailInput').value = email || '';
        document.getElementById('llinkInput').value = linkedin || '';
        document.getElementById('addrsInput').value = address || '';
        document.getElementById('careerobInput').value = careerObjective || '';
        document.getElementById('languageInput').value = languages ? languages.join(', ') : '';
        document.getElementById('hobbiesInput').value = hobbies ? hobbies.join(', ') : '';
        document.getElementById('skillsInput').value = skills ? skills.join(', ') : '';
        // Populate education and experience sections with stored entries
        populateEntries('education-section', educationEntries, 'education-group', ['educationYear[]', 'certification[]', 'school[]']);
        populateEntries('experience-section', experienceEntries, 'experience-group', ['experienceYear[]', 'workDesignation[]', 'workOrganization[]']);
    }
});
// Function to populate education or experience entries in the form
function populateEntries(containerId, entries, entryClass, fieldNames) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing entries
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add(entryClass);
        fieldNames.forEach((field, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = field;
            input.value = entry[Object.keys(entry)[index]] || '';
            entryDiv.appendChild(input);
        });
        container.appendChild(entryDiv);
    });
}
// Function to save data and navigate to resume page
function generateResume() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const fullName = document.getElementById('fullNameInput').value;
        const designation = document.getElementById('designationInput').value;
        const contactNum = document.getElementById('contactNumInput').value;
        const email = document.getElementById('emailInput').value;
        const linkedin = document.getElementById('llinkInput').value;
        const address = document.getElementById('addrsInput').value;
        const careerObjective = document.getElementById('careerobInput').value;
        const languages = document.getElementById('languageInput').value.split(',').map(s => s.trim());
        const hobbies = document.getElementById('hobbiesInput').value.split(',').map(s => s.trim());
        const skills = document.getElementById('skillsInput').value.split(',').map(s => s.trim());
        const educationEntries = Array.from(document.querySelectorAll('#education-section .education-group')).map(group => ({
            edyear: group.querySelector('[name="educationYear[]"]').value,
            certification: group.querySelector('[name="certification[]"]').value,
            school: group.querySelector('[name="school[]"]').value,
        }));
        const experienceEntries = Array.from(document.querySelectorAll('#experience-section .experience-group')).map(group => ({
            exyear: group.querySelector('[name="experienceYear[]"]').value,
            wdesignation: group.querySelector('[name="workDesignation[]"]').value,
            worg: group.querySelector('[name="workOrganization[]"]').value,
        }));
        const profilePicInput = document.getElementById('profilePicInput');
        const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        const profilePicDataURL = profilePicFile ? yield convertFileToDataURL(profilePicFile) : '';
        const resumeData = {
            fullName,
            designation,
            contactNum,
            email,
            linkedin,
            address,
            careerObjective,
            languages,
            hobbies,
            skills,
            educationEntries,
            experienceEntries,
            profilePicDataURL
        };
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        window.location.href = "resume.html";
    });
}
// Helper function to convert a file to a Data URL
function convertFileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}
// Function to clone a section for Education or Experience
function cloneSection(sectionClass, containerId) {
    const container = document.getElementById(containerId);
    const sectionToClone = container.querySelector(`.${sectionClass}`);
    if (sectionToClone) {
        const clonedSection = sectionToClone.cloneNode(true);
        clonedSection.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        const addButton = container.querySelector('button');
        if (addButton) {
            container.insertBefore(clonedSection, addButton);
        }
    }
}
// Event listeners for Add Education and Add Experience buttons
document.addEventListener('DOMContentLoaded', () => {
    const addEducationButton = document.getElementById('add-education-btn');
    const addExperienceButton = document.getElementById('add-experience-btn');
    addEducationButton === null || addEducationButton === void 0 ? void 0 : addEducationButton.addEventListener('click', () => cloneSection('education-group', 'education-section'));
    addExperienceButton === null || addExperienceButton === void 0 ? void 0 : addExperienceButton.addEventListener('click', () => cloneSection('experience-group', 'experience-section'));
});
