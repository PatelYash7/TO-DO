let form=document.getElementById("form1");
let textInput=document.querySelector("[textInput]");
let msg=document.getElementById("msg");
let dateInput=document.querySelector("[dateInput]");
let textArea=document.querySelector("[textArea]");
let task =document.querySelector("[task]");
let add=document.getElementById("add1");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formValidation();
});
function formValidation(){
    if(textInput.value==="" && dateInput.value==="" ){
        msg.innerHTML="Text cannot be blank";
        // alert("not working");
    }else{
        console.log("Working");
        msg.innerHTML="";
        acceptData();
        // add.setAttribute("data-modal-hide","form");
        add.click();
        (()=>{
            add.setAttribute("data-modal-hide","");
        })()
        location.reload();
    }
}

let data = [{}];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    })
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    updateData();
  };

function updateData(){
    task.innerHTML="";
    data.map((x,y)=>{
        return(
            task.innerHTML+=
            `<div id=${y} class="bg-[#e2eede] border-4 border-[#abcea1] rounded p-2 grid gap-2">
                         <span class="font-bold">${x.text}</span>
                         <span class="text-xs text-gray-800">${x.date}</span>
                         <p>${x.description}</p>


                         <span class="justify-self-center flex gap-5">
                             <i  data-modal-toggle="form1" data-modal-target="form1"  onClick= "editData(this)" 
                             class="fas fa-edit cursor-pointer"></i>
                             <i onClick="deleteData(this);updateData()" class="fas fa-trash-alt cursor-pointer"></i>
                         </span>
                     </div>
            `
        )
    })
  resetData();
}
function deleteData(e){
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

function editData(e) {
  let selected=e.parentElement.parentElement;
  textInput.value = selected.children[0].innerHTML;
  dateInput.value= selected.children[1].innerHTML;
  textArea.value= selected.children[2].innerHTML;

  console.log(selected);
  deleteData(e);
//   resetData();
}
function resetData(){
    textInput.value="";
    textArea.value="";
    dateInput.value="";
}


// TO fetch the data from local storage 

(()=>{
    console.log("working11");
    data=JSON.parse(localStorage.getItem("data")) || [];
    updateData();
    console.log(data);

})();