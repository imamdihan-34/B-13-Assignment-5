

const issuesContainer = document.getElementById("issues-container")
const loader = document.getElementById("loader")

const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

const searchInput = document.getElementById("searchInput")

let allIssues = []

// load issues

async function loadIssues() {

const loader = document.getElementById("loader")

loader.classList.remove("hidden")  

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

await new Promise(resolve => setTimeout(resolve, 1000))

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

loader.classList.add("hidden") 
}

function displayIssues(issues){

issuesContainer.innerHTML = ""

issues.forEach(issue => {

const borderColor =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"

const statusIcon = issue.status === "open"
? `<img src="./assets/Open-Status.png" class="w-6">`
: `<img src="../assets/Closed- Status .png" class="w-6">`;

const card = document.createElement("div")

card.className = `card bg-white shadow ${borderColor}`

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

${issue.labels.map((label, index) => 
`<span class="${
index === 0 
? "border border-red-400 text-red-500" 
: "border border-yellow-400 text-yellow-500"
} text-xs px-3 py-1 rounded-full">${label}</span>`
).join("")}


</div>

<div class="border-t pt-2 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

</div>

`

issuesContainer.appendChild(card)

})

}




allBtn.addEventListener("click", ()=>{

setActive(allBtn)

displayIssues(allIssues)

})

openBtn.addEventListener("click", ()=>{

setActive(openBtn)

const openIssues = allIssues.filter(issue => issue.status === "open")

displayIssues(openIssues)

})

closedBtn.addEventListener("click", ()=>{

setActive(closedBtn)

const closedIssues = allIssues.filter(issue => issue.status === "closed")

displayIssues(closedIssues)

})



function setActive(btn){

allBtn.classList.remove("btn-primary")
openBtn.classList.remove("btn-primary")
closedBtn.classList.remove("btn-primary")

btn.classList.add("btn-primary")

}




searchInput.addEventListener("input", ()=>{

const value = searchInput.value.toLowerCase()

const filtered = allIssues.filter(issue =>
issue.title.toLowerCase().includes(value)
)

displayIssues(filtered)

})




loadIssues()



