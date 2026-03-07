// const treesContainer = document.getElementById('issues-container')

// async function loadTrees() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//     const data = await res.json();
//     displayIssues(data.data)
// }

// function displayIssues(issues){
//     console.log(issues)
//     issues.forEach(issue => {
//         console.log(issue)
//        const card = document.createElement("div") 
//        card.className ="card bg-white  shadow-sm"
//        card.innerHTML =` <div class="flex justify-between items-center mb-4">
//         <div class="bg-green-100 p-2 rounded-full">
//           <span class="text-green-600 text-xl">
//           <img src="./assets/Open-Status.png" alt=""></span>
//         </div>

//         <span class="bg-red-100 text-red-500 text-xs px-4 py-1 rounded-full font-semibold">
//           HIGH
//         </span>

//       </div>
//   <div class="card-body ">
//     <h2 class="card-title">${issue.title}</h2>
//     <p>${issue.description}</p>
//     <div class="card-actions">
//      <span class="border border-red-400 text-red-500 text-xs px-3 py-1 rounded-full">
//            BUG
//         </span>

//         <span class="border border-yellow-400 text-yellow-500 text-xs px-3 py-1 rounded-full">
//           🟡 HELP WANTED
//         </span>
//         <div class="border-t px-5 py-3 text-sm text-gray-500">
//       <p>#1 by john_doe</p>
//       <p>1/15/2024</p>
//     </div>
//     </div>
//   </div>
// </div> `
// treesContainer.appendChild(card)
// });

// }

// loadTrees()

const issuesContainer = document.getElementById("issues-container")
const loader = document.getElementById("loader")

const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

const searchInput = document.getElementById("searchInput")

let allIssues = []

// load issues

async function loadIssues() {

loader.classList.remove("hidden")

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
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

const card = document.createElement("div")

card.className = `card bg-white shadow ${borderColor}`

card.innerHTML = `

<div class="card-body">

<div class="flex justify-between">

<span class="text-sm font-bold">${issue.status}</span>

<span class="text-xs px-3 py-1 rounded bg-red-100 text-red-500">
${issue.priority}
</span>

</div>

<h2 class="card-title">${issue.title}</h2>

<p class="text-sm">${issue.description}</p>

<div class="flex gap-2">

<span class="badge badge-outline">${issue.label}</span>

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



