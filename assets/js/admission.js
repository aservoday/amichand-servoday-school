// =============================
// Auto Registration Number
// =============================

window.onload = () => {

    const year = new Date().getFullYear();

    const random = Math.floor(1000 + Math.random() * 9000);

    const regNo = document.getElementById("registrationNumber");

    if(regNo){

        regNo.value = `ASCS-${year}-${random}`;

    }

};
// =============================
// Auto Today's Date
// =============================

const today = new Date();

const yyyy = today.getFullYear();

const mm = String(today.getMonth()+1).padStart(2,'0');

const dd = String(today.getDate()).padStart(2,'0');

const dateInput = document.getElementById("submitDate");

if(dateInput){

dateInput.value = `${yyyy}-${mm}-${dd}`;

}
// =============================
// Mobile Validation
// =============================

const mobileInputs=document.querySelectorAll("input[type='tel']");

mobileInputs.forEach(input=>{

input.addEventListener("input",()=>{

input.value=input.value.replace(/\D/g,'');

if(input.value.length>10){

input.value=input.value.slice(0,10);

}

});

});
// =============================
// Photo Preview
// =============================

document.querySelectorAll("input[type='file']").forEach(file=>{

file.addEventListener("change",function(){

const selected=this.files[0];

if(!selected) return;

if(!selected.type.startsWith("image/")) return;

const reader=new FileReader();

reader.onload=(e)=>{

let img=document.createElement("img");

img.src=e.target.result;

img.style.width="120px";

img.style.height="120px";

img.style.objectFit="cover";

img.style.marginTop="10px";

img.style.borderRadius="12px";

img.style.border="2px solid #1976D2";

this.parentElement.appendChild(img);

};

reader.readAsDataURL(selected);

});

});
// =============================
// Submit Loading
// =============================

const form=document.getElementById("admissionForm");

const submitBtn=document.getElementById("submitBtn");

form.addEventListener("submit",(e)=>{

e.preventDefault();

submitBtn.innerHTML="Submitting...";

submitBtn.disabled=true;

setTimeout(()=>{

submitBtn.innerHTML="Admission Submitted ✓";

document.getElementById("successMessage").style.display="block";

form.reset();

window.scrollTo({

top:0,

behavior:"smooth"

});

},2000);

});