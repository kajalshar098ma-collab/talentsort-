/* =============================
   TALENT SORT SCRIPT.JS
============================= */

/* SIGNUP */
function signup(){

let name=document.getElementById("name").value.trim();
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value.trim();
let msg=document.getElementById("msg");

if(name=="" || email=="" || password==""){
msg.innerHTML="Please fill all fields.";
msg.style.color="red";
return;
}

let user={
name:name,
email:email,
password:password
};

localStorage.setItem("user",JSON.stringify(user));

msg.innerHTML="Signup Successful!";
msg.style.color="green";

setTimeout(()=>{
window.location="login.html";
},1000);
}

/* LOGIN */
function login(){

let email=document.getElementById("loginEmail").value.trim();
let password=document.getElementById("loginPassword").value.trim();
let loginMsg=document.getElementById("loginMsg");

let user=JSON.parse(localStorage.getItem("user"));

if(user==null){
loginMsg.innerHTML="Please Sign Up First.";
loginMsg.style.color="red";
return;
}

if(email===user.email && password===user.password){

loginMsg.innerHTML="Login Successful...";
loginMsg.style.color="green";

setTimeout(()=>{
window.location="dashboard.html";
},1000);

}else{
loginMsg.innerHTML="Invalid Email or Password.";
loginMsg.style.color="red";
}
}

/* LOAD DASHBOARD */
function loadDashboard(){

let user=JSON.parse(localStorage.getItem("user"));

if(user==null){
window.location="login.html";
return;
}

if(document.getElementById("username")){
username.innerHTML=user.name;
}

if(document.getElementById("pname")){
pname.innerHTML=user.name;
}

if(document.getElementById("pemail")){
pemail.innerHTML=user.email;
}

let photo=localStorage.getItem("photo");

if(photo && document.getElementById("profileImage")){
profileImage.src=photo;
}

showSavedResume();
loadAdmin();
}

/* PAGE SWITCH */
function showPage(id){

let pages=document.querySelectorAll(".page");

pages.forEach(function(page){
page.classList.add("hidden");
});

document.getElementById(id).classList.remove("hidden");
}

/* COMPANY PANEL */
function openCompanyPanel(){
window.location="company.html";
}

/* LOGOUT */
function logout(){
window.location="login.html";
}

/* RESUME SAVE */
function saveResume(){

let resume={
name:rname.value,
age:rage.value,
phone:rphone.value,
email:remail.value,
address:raddress.value,
skills:rskills.value,
hobby:rhobby.value,
education:redu.value,
experience:rexp.value,
language:rlanguage.value,
objective:robjective.value
};

localStorage.setItem("resume",JSON.stringify(resume));

resumeMsg.innerHTML="Resume Saved Successfully!";
resumeMsg.style.color="green";

showSavedResume();
}

/* SHOW RESUME */
function showSavedResume(){

let data=JSON.parse(localStorage.getItem("resume"));

if(data==null || !document.getElementById("resumeData")) return;

resumeData.innerHTML=`
<div class="resume-card">
<h2>${data.name}</h2>
<p><b>Age:</b> ${data.age}</p>
<p><b>Phone:</b> ${data.phone}</p>
<p><b>Email:</b> ${data.email}</p>
<p><b>Address:</b> ${data.address}</p>
<hr>
<p><b>Objective:</b> ${data.objective}</p>
<p><b>Skills:</b> ${data.skills}</p>
<p><b>Education:</b> ${data.education}</p>
<p><b>Experience:</b> ${data.experience}</p>
<p><b>Languages:</b> ${data.language}</p>
<p><b>Hobbies:</b> ${data.hobby}</p>
</div>
`;
}

/* APPLY JOB */
function applyJob(job){

let apps=JSON.parse(localStorage.getItem("applications")) || [];

apps.push(job);

localStorage.setItem("applications",JSON.stringify(apps));

jobMsg.innerHTML="Applied Successfully!";
jobMsg.style.color="green";

loadAdmin();
}

/* ADMIN */
function loadAdmin(){

let apps=JSON.parse(localStorage.getItem("applications")) || [];
let user=JSON.parse(localStorage.getItem("user"));

if(document.getElementById("totalUsers")){
totalUsers.innerHTML=user ? 1 : 0;
}

if(document.getElementById("adminJobs")){
adminJobs.innerHTML=apps.length;
}

if(document.getElementById("totalJobs")){
totalJobs.innerHTML=apps.length;
}

if(document.getElementById("applicationList")){

let html="";

apps.forEach(function(job,index){
html+=`<div class="job-card">${index+1}. ${job}</div>`;
});

applicationList.innerHTML=html;
}
}

/* SCORE */
function generateScore(){

let score=70+Math.floor(Math.random()*30);

scoreValue.innerHTML=score;

if(document.getElementById("scoreHome")){
scoreHome.innerHTML=score;
}
}

/* INTERVIEW */
function scheduleInterview(){

intMsg.innerHTML="Interview Scheduled Successfully!";
intMsg.style.color="green";
}

/* AI CHAT */
function sendMessage(){

let text=chatInput.value.trim().toLowerCase();

if(text=="") return;

chatBox.innerHTML += `<div class="msg-user">You: ${text}</div>`;

let reply="";

if(text.includes("resume")){
reply="Create a strong resume with projects, skills and achievements.";
}
else if(text.includes("job")){
reply="Go to Apply Jobs section and apply directly.";
}
else if(text.includes("interview")){
reply="Prepare communication, basics and confidence.";
}
else if(text.includes("skill")){
reply="Top skills: Java, Python, Web Development, Communication.";
}
else if(text.includes("hello") || text.includes("hi")){
reply="Hello 👋 How can I help you today?";
}
else{
reply="I can help with resume, jobs, interviews and career guidance.";
}

setTimeout(()=>{
chatBox.innerHTML += `<div class="msg-admin">AI: ${reply}</div>`;
chatBox.scrollTop=chatBox.scrollHeight;
},400);

chatInput.value="";
}

/* PHOTO */
function uploadPhoto(event){

let file=event.target.files[0];

if(!file) return;

let reader=new FileReader();

reader.onload=function(){
profileImage.src=reader.result;
localStorage.setItem("photo",reader.result);
};

reader.readAsDataURL(file);
}

function savePhoto(){
alert("Photo Saved Successfully!");
}

/* DARK MODE */
function toggleDarkMode(){
document.body.classList.toggle("dark-mode");
}

/* DOWNLOAD RESUME */
function downloadResume(){

let data=JSON.parse(localStorage.getItem("resume"));

if(data==null){
alert("No Resume Found");
return;
}

let text=`
Talent Sort Resume

Name: ${data.name}
Age: ${data.age}
Phone: ${data.phone}
Email: ${data.email}
Address: ${data.address}

Objective: ${data.objective}
Skills: ${data.skills}
Education: ${data.education}
Experience: ${data.experience}
Languages: ${data.language}
Hobbies: ${data.hobby}
`;

let blob=new Blob([text],{type:"text/plain"});
let a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="Resume.txt";
a.click();
}