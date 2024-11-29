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

        (document.getElementById('fullName') as HTMLElement).innerText = fullName;
        (document.getElementById('designation') as HTMLElement).innerText = designation;
        (document.getElementById('contactNum') as HTMLElement).innerText = contactNum;
        (document.getElementById('email') as HTMLElement).innerText = email;
        (document.getElementById('llink') as HTMLElement).innerText = linkedin;
        (document.getElementById('addrs') as HTMLElement).innerText = address;
        (document.getElementById('careerob') as HTMLElement).innerText = careerObjective;

        if (profilePicDataURL) {
            (document.getElementById('dp') as HTMLImageElement).src = profilePicDataURL;
        }

        populateList('language', languages);
        populateList('hobbies', hobbies);
        populateList('skills', skills);

        populateComplexEntries('.eduDetails', educationEntries, ['edyear', 'certification', 'school']);
        populateComplexEntries('.experience .eduDetails', experienceEntries, ['exyear', 'wdesignation', 'worg']);
    }
});

function populateList(elementId: string, items: string[]): void {
    const container = document.getElementById(elementId) as HTMLElement;
    container.innerHTML = ''; 
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        container.appendChild(li);
    });
}

function populateComplexEntries(containerSelector: string, entries: any[], fields: string[]): void {
    const container = document.querySelector(containerSelector) as HTMLElement;
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
function editResume(): void {
    window.location.href = 'index.html';
}

