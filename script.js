let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let tabCount = document.getElementById('tabCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');


function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  

  if (currentStatus === 'all-filter-btn') {
    tabCount.innerText = allCardSection.children.length;
  } else if (currentStatus === 'interview-filter-btn') {
    tabCount.innerText = interviewList.length;
  } else {
    tabCount.innerText = rejectedList.length;
  }
}

calculateCount();


// Toggle Filter
function toggleStyle(id) {

  allFilterBtn.classList.add('bg-gray-300');
  interviewFilterBtn.classList.add('bg-gray-300');
  rejectedFilterBtn.classList.add('bg-gray-300');

  allFilterBtn.classList.remove('bg-black', 'text-white');
  interviewFilterBtn.classList.remove('bg-black', 'text-white');
  rejectedFilterBtn.classList.remove('bg-black', 'text-white');

  const selected = document.getElementById(id);

  currentStatus = id;

  selected.classList.remove('bg-gray-300');
  selected.classList.add('bg-blue-500', 'text-white');

  if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  }

  calculateCount();
}


mainContainer.addEventListener('click', function (event) {

  // Interview section
  if (event.target.classList.contains('interview-btn')) {
    const card = event.target.closest('.card');

    const job = getJobData(card);
    card.querySelector('.status').innerText = 'Interview';

    if (!interviewList.find(item => item.companyName === job.companyName)) {
      interviewList.push({ ...job, status: 'Interview' });
    }

    rejectedList = rejectedList.filter(item => item.companyName !== job.companyName);

    if (currentStatus === 'rejected-filter-btn') renderRejected();

    calculateCount();
  }

  // Rejected section
  else if (event.target.classList.contains('rejected-btn')) {
    const card = event.target.closest('.card');

    const job = getJobData(card);
    card.querySelector('.status').innerText = 'Rejected';

    if (!rejectedList.find(item => item.companyName === job.companyName)) {
      rejectedList.push({ ...job, status: 'Rejected' });
    }

    interviewList = interviewList.filter(item => item.companyName !== job.companyName);

    if (currentStatus === 'interview-filter-btn') renderInterview();

    calculateCount();
  }

else if (event.target.closest('.btn-delete')) {

  const btn = event.target.closest('.btn-delete');
  const card = btn.closest('.card'); 

  const name = card.querySelector('.companyName').innerText;

  card.remove();

  interviewList = interviewList.filter(item => item.companyName !== name);
  rejectedList = rejectedList.filter(item => item.companyName !== name);

  renderInterview();
  renderRejected();
  calculateCount();
}
 });

function getJobData(card) {
  return {
    companyName: card.querySelector('.companyName').innerText,
    position: card.querySelector('.position').innerText,
    location: card.querySelector('.location').innerText,
    type: card.querySelector('.type').innerText,
    salary: card.querySelector('.salary').innerText,
    description: card.querySelector('.description').innerText
  };
}


//  Interview page 
function renderInterview() {
  filterSection.innerHTML = '';

  if (interviewList.length === 0) {
    filterSection.innerHTML = emptyHTML();
    return;
  }

  interviewList.forEach(job => {
    filterSection.appendChild(createCard(job));
  });
}


//  Rejected page
function renderRejected() {
  filterSection.innerHTML = '';

  if (rejectedList.length === 0) {
    filterSection.innerHTML = emptyHTML();
    return;
  }

  rejectedList.forEach(job => {
    filterSection.appendChild(createCard(job));
  });
}


// interview lis
function createCard(job) {
  const div = document.createElement('div');
  div.className = 'card flex justify-between px-5 py-5 bg-white rounded-xl';

  div.innerHTML = `
    <div class=" space-y-4">
      <div>
        <p class="companyName text-xl font-semibold text-gray-700">${job.companyName}</p>
        <p class="position text-gray-500">${job.position}</p>
      </div>

      <div class="flex gap-2 text-sm">
        <p class="location text-gray-500 ">${job.location}</p>
        <p class="type text-gray-500 ">${job.type}</p>
        <p class="salary text-gray-500 ">${job.salary}</p>
      </div>

      <p class="status  bg-gray-100 text-gray-600 px-2 w-30 text-center font-semibold rounded">${job.status}</p>
      <p class="description text-sm text-gray-500">${job.description}</p>

      <div class="flex gap-3">
        <button class="interview-btn border p-6 border-green-700  text-green-700 px-4 py-2 font-bold rounded">Interview</button>
        <button class="rejected-btn border p-6 border-red-700  text-red-700 px-4 py-2 font-bold rounded">Rejected</button>
      </div>
    </div>

    <div>
      <button class="btn-delete w-10 h-10 flex items-center justify-center rounded-full border 5 border-gray-300 text-gray-600"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  return div;
}

// Empty
function emptyHTML() {
  return `
    <div class="text-center mt-10">
      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" class="w-24 mx-auto mb-4">
      <h2 class="text-xl font-bold">No jobs Available</h2>
      <p class="text-gray-500">Please add or move jobs</p>
    </div>
  `;
}