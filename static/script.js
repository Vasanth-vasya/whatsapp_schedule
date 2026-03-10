const form = document.getElementById("scheduleForm")
const table = document.getElementById("tableBody")

form.addEventListener("submit", async (e)=>{

e.preventDefault()

let phone = document.getElementById("phone").value
let message = document.getElementById("message").value
let hour = document.getElementById("hour").value
let minute = document.getElementById("minute").value

await fetch("/schedule",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({phone,message,hour,minute})

})

loadMessages()

})


async function loadMessages(){

let res = await fetch("/messages")
let data = await res.json()

table.innerHTML=""

let sent=0
let scheduled=0
let failed=0

data.forEach(m=>{

table.innerHTML+=`

<tr>

<td>${m[1]}</td>
<td>${m[2]}</td>
<td>${m[3]}:${m[4]}</td>
<td>${m[5]}</td>

</tr>

`

if(m[5]=="sent") sent++
if(m[5]=="scheduled") scheduled++
if(m[5]=="failed") failed++

})

drawChart(sent,scheduled,failed)

}


function drawChart(sent,scheduled,failed){

new Chart(document.getElementById("statsChart"),{

type:"doughnut",

data:{
labels:["Sent","Scheduled","Failed"],
datasets:[{

data:[sent,scheduled,failed]

}]
}

})

}

loadMessages()