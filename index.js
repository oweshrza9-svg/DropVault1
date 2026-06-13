let inputBtn = document.getElementById("input-btn");
const inputEl=document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const myleads=["hello", "hello world","Hellooo poo!!"];

    inputBtn.addEventListener("click", function() {
         myleads.push(inputEl.value);
     //     console.log(myleads);
         
          console.log(myleads);
          
   for (i=0 ; i < myleads.length ;i++){
               ulEl.innerHTML += "<li>" ,myleads[i],"</li>";
   }
    })


   

