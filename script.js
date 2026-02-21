let jobs = [
  {
    id: 1,
    companyName: "IOVISION",
    position: "Web Developer - WordPress & PHP",
    location: "Remote",
    type: "Full-time",
    salary: "BDT 40,000 - BDT 60,000",
    description: "Develop dynamic and interactive websites and web applications using WordPress CMS or custom PHP solutions.",
    status: "all"
  },
  {
    id: 2,
    companyName: "Datascape IT Limited",
    position: "Web Designer & Developer",
    location: "Anywhere in Bangladesh",
    type: "Part-time",
    salary: "Negotiable",
    description: "Design modern websites and build interactive user interfaces.",
    status: "all"
  },
  {
    id: 3,
    companyName: "BJIT Ltd.",
    position: "IT Intern",
    location: "Remote",
    type: "Full-time",
    salary: "BDT 10,000",
    description: "Develop responsive web applications.",
    status: "all"
  },
  {
    id: 4,
    companyName: "Flow Sleek",
    position: "Webflow Developer Internship (Web Design)",
    location: "Khulna",
    type: "Full-time",
    salary: "BDT 20,000",
    description: "Work on scalable backend systems.",
    status: "all"
  },
  {
    id: 5,
    companyName: "CloudCore",
    position: "Cloud Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000",
    description: "Manage cloud infrastructure.",
    status: "all"
  },
  {
    id: 6,
    companyName: "DesignHub",
    position: "UI/UX Designer",
    location: "UK",
    type: "Contract",
    salary: "$70,000",
    description: "Design user-centered products.",
    status: "all"
  },
  {
    id: 7,
    companyName: "Appify",
    position: "Mobile Developer",
    location: "Remote",
    type: "Part-time",
    salary: "$90,000",
    description: "Build mobile apps.",
    status: "all"
  },
  {
    id: 8,
    companyName: "AI Labs",
    position: "AI Engineer",
    location: "USA",
    type: "Full-time",
    salary: "$150,000",
    description: "Develop AI-based solutions.",
    status: "all"
  }
];

let currentTab = "all";

function renderJobs() {
  const container = document.getElementById("jobContainer");
  const empty = document.getElementById("emptyState");

  container.innerHTML = "";

  const filtered = jobs.filter(job => {
    if (currentTab === "all") return job.status === "all";
    return job.status === currentTab;
  });

  document.getElementById("tabCount").innerText = filtered.length + " jobs";

  if (filtered.length === 0) {
    empty.classList.remove("hidden");
    return;
  } else {
    empty.classList.add("hidden");
  }

  filtered.forEach(job => {
    const card = document.createElement("div");

    card.className = "bg-white p-5 rounded-xl shadow-sm";

    card.innerHTML = `
      <h3 class="font-semibold text-[#1E3A5F]">${job.companyName}</h3>
      <p class="text-sm text-gray-500">${job.position}</p>

      <p class="text-sm text-gray-400 mt-1">
        ${job.location} • ${job.type} • ${job.salary}
      </p>

      <span class="inline-block mt-3 text-xs px-3 py-1 rounded bg-gray-200 text-gray-600">
        ${job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()}
      </span>

      <p class="text-sm text-gray-500 mt-3">${job.description}</p>

      <div class="flex gap-3 mt-4">
        <button onclick="updateStatus(${job.id}, 'interview')" 
          class="px-4 py-1 text-sm font-bold border rounded 
          ${job.status === 'interview' ? 'bg-green-500 text-white' : 'border-green-500 text-green-500'}">
          INTERVIEW
        </button>

        <button onclick="updateStatus(${job.id}, 'rejected')" 
          class="px-4 py-1 text-sm font-bold border rounded 
          ${job.status === 'rejected' ? 'bg-red-500 text-white' : 'border-red-500 text-red-500'}">
          REJECTED
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  updateDashboard();
}

function updateStatus(id, status) {
  const job = jobs.find(j => j.id === id);

  if (job.status === status) {
    job.status = "all";
  } else {
    job.status = status;
  }

  renderJobs();
}

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-white", "text-gray-900");
  });

  const active = document.getElementById(`tab-${tab}`);
  active.classList.add("bg-blue-600", "text-white");

  renderJobs();
}

function updateDashboard() {
  document.getElementById("totalJobs").innerText = jobs.length;
  document.getElementById("interviewCount").innerText =
    jobs.filter(j => j.status === "interview").length;
  document.getElementById("rejectedCount").innerText =
    jobs.filter(j => j.status === "rejected").length;
}

renderJobs();