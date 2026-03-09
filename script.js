const issuesContainer = document.getElementById("issues-container");
const loader = document.getElementById("loader");

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const searchInput = document.getElementById("searchInput");

let allIssues = [];

// load issues
async function loadIssues() {
  loader.classList.remove("hidden");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);

  loader.classList.add("hidden");
}
document.getElementById("openBtn").addEventListener("click", () => {
  loader.classList.remove("hidden");

  setTimeout(() => {
    const openIssues = allIssues.filter((issue) => issue.status === "open");

    displayIssues(openIssues);

    loader.classList.add("hidden");
  }, 200);
});
document.getElementById("closedBtn").addEventListener("click", () => {
  loader.classList.remove("hidden");

  setTimeout(() => {
    const closedIssues = allIssues.filter((issue) => issue.status === "closed");

    displayIssues(closedIssues);

    loader.classList.add("hidden");
  }, 200);
});

function displayIssues(issues) {
  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    const statusIcon =
      issue.status === "open"
        ? `<img src="./assets/Open-Status.png" class="w-6">`
        : `<img src="../assets/Closed- Status .png" class="w-6">`;

    const card = document.createElement("div");

    card.className = `card bg-white shadow ${borderColor}`;

    card.innerHTML = `

<div class="card-body">

<div class="flex justify-between">
<span>
${statusIcon}
</span>

<span class="text-xs px-3 py-1 rounded bg-red-100 text-red-500">
${issue.priority}
</span>

</div>


<h2 class="card-title">${issue.title}</h2>

<p class="text-sm line-clamp-2 text-slate-500">${issue.description}</p>

<div class="flex gap-2">

${issue.labels
  .map(
    (label, index) =>
      `<span class="${
        index === 0
          ? "border border-red-400 text-red-500"
          : "border border-yellow-400 text-yellow-500"
      } text-xs px-3 py-1 rounded-full">${label}</span>`,
  )
  .join("")}


</div>

<div class="border-t pt-2 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

</div>

`;
    card.addEventListener("click", () => {
      openModal(issue);
    });
    issuesContainer.appendChild(card);
  });
}
document.getElementById("openBtn").addEventListener("click", () => {

const openIssues = allIssues.filter(issue => issue.status === "open")

displayIssues(openIssues)

document.getElementById("issue-count").innerText = openIssues.length

})
document.getElementById("closedBtn").addEventListener("click", () => {

const closedIssues = allIssues.filter(issue => issue.status === "closed")

displayIssues(closedIssues)

document.getElementById("issue-count").innerText = closedIssues.length

})
document.getElementById("allBtn").addEventListener("click", () => {

displayIssues(allIssues)

document.getElementById("issue-count").innerText = allIssues.length

})
async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

updateIssueCounts(allIssues)

}

function openModal(issue) {
  document.getElementById("modal-title").innerText = issue.title;

  document.getElementById("modal-description").innerText = issue.description;

  document.getElementById("modal-author").innerText =
    "Opened by " + issue.author;

  document.getElementById("modal-date").innerText = issue.createdAt;

  document.getElementById("modal-status").innerText = issue.status;

  document.getElementById("modal-assignee").innerText = issue.author;

  document.getElementById("modal-priority").innerText = issue.priority;

  // labels
  const labelsContainer = document.getElementById("modal-labels");

  labelsContainer.innerHTML = "";

  issue.labels.forEach((label, index) => {
    const span = document.createElement("span");

    span.className =
      index === 0
        ? "border border-red-400 text-red-500 text-xs px-3 py-1 rounded-full"
        : "border border-yellow-400 text-yellow-500 text-xs px-3 py-1 rounded-full";

    span.innerText = label;

    labelsContainer.appendChild(span);
  });

  document.getElementById("issueModal").showModal();
}

allBtn.addEventListener("click", () => {
  setActive(allBtn);

  displayIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  setActive(openBtn);

  const openIssues = allIssues.filter((issue) => issue.status === "open");

  displayIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActive(closedBtn);

  const closedIssues = allIssues.filter((issue) => issue.status === "closed");

  displayIssues(closedIssues);
});

function setActive(btn) {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  btn.classList.add("btn-primary");
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allIssues.filter((issue) =>
    issue.title.toLowerCase().includes(value),
  );

  displayIssues(filtered);
});

loadIssues();
