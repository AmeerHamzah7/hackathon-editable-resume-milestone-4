// Function to load data from localStorage when the form is opened
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
        const {
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
        } = JSON.parse(storedData);

        // Populate form fields with stored data
        (document.getElementById('fullNameInput') as HTMLInputElement).value = fullName || '';
        (document.getElementById('designationInput') as HTMLInputElement).value = designation || '';
        (document.getElementById('contactNumInput') as HTMLInputElement).value = contactNum || '';
        (document.getElementById('emailInput') as HTMLInputElement).value = email || '';
        (document.getElementById('llinkInput') as HTMLInputElement).value = linkedin || '';
        (document.getElementById('addrsInput') as HTMLTextAreaElement).value = address || '';
        (document.getElementById('careerobInput') as HTMLTextAreaElement).value = careerObjective || '';
        (document.getElementById('languageInput') as HTMLInputElement).value = languages ? languages.join(', ') : '';
        (document.getElementById('hobbiesInput') as HTMLInputElement).value = hobbies ? hobbies.join(', ') : '';
        (document.getElementById('skillsInput') as HTMLInputElement).value = skills ? skills.join(', ') : '';

        // Populate education and experience sections with stored entries
        populateEntries('education-section', educationEntries, 'education-group', ['educationYear[]', 'certification[]', 'school[]']);
        populateEntries('experience-section', experienceEntries, 'experience-group', ['experienceYear[]', 'workDesignation[]', 'workOrganization[]']);
    }
});

// Function to populate education or experience entries in the form
function populateEntries(containerId: string, entries: any[], entryClass: string, fieldNames: string[]): void {
    const container = document.getElementById(containerId) as HTMLElement;
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
async function generateResume(): Promise<void> {
    const fullName = (document.getElementById('fullNameInput') as HTMLInputElement).value;
    const designation = (document.getElementById('designationInput') as HTMLInputElement).value;
    const contactNum = (document.getElementById('contactNumInput') as HTMLInputElement).value;
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const linkedin = (document.getElementById('llinkInput') as HTMLInputElement).value;
    const address = (document.getElementById('addrsInput') as HTMLInputElement).value;
    const careerObjective = (document.getElementById('careerobInput') as HTMLInputElement).value;

    const languages = (document.getElementById('languageInput') as HTMLInputElement).value.split(',').map(s => s.trim());
    const hobbies = (document.getElementById('hobbiesInput') as HTMLInputElement).value.split(',').map(s => s.trim());
    const skills = (document.getElementById('skillsInput') as HTMLInputElement).value.split(',').map(s => s.trim());

    const educationEntries = Array.from(document.querySelectorAll('#education-section .education-group')).map(group => ({
        edyear: (group.querySelector('[name="educationYear[]"]') as HTMLInputElement).value,
        certification: (group.querySelector('[name="certification[]"]') as HTMLInputElement).value,
        school: (group.querySelector('[name="school[]"]') as HTMLInputElement).value,
    }));

    const experienceEntries = Array.from(document.querySelectorAll('#experience-section .experience-group')).map(group => ({
        exyear: (group.querySelector('[name="experienceYear[]"]') as HTMLInputElement).value,
        wdesignation: (group.querySelector('[name="workDesignation[]"]') as HTMLInputElement).value,
        worg: (group.querySelector('[name="workOrganization[]"]') as HTMLInputElement).value,
    }));

    const profilePicInput = document.getElementById('profilePicInput') as HTMLInputElement;
    const profilePicFile = profilePicInput.files?.[0];
    const profilePicDataURL = profilePicFile ? await convertFileToDataURL(profilePicFile) : '';

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
}

// Helper function to convert a file to a Data URL
function convertFileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

// Function to clone a section for Education or Experience
function cloneSection(sectionClass: string, containerId: string): void {
    const container = document.getElementById(containerId) as HTMLElement;
    const sectionToClone = container.querySelector(`.${sectionClass}`) as HTMLElement;

    if (sectionToClone) {
        const clonedSection = sectionToClone.cloneNode(true) as HTMLElement;
        clonedSection.querySelectorAll('input').forEach(input => {
            (input as HTMLInputElement).value = '';
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

    addEducationButton?.addEventListener('click', () => cloneSection('education-group', 'education-section'));
    addExperienceButton?.addEventListener('click', () => cloneSection('experience-group', 'experience-section'));
});
