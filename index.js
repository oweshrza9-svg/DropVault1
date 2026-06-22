const inputBtn = document.getElementById("input-btn");
const inputEl=document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
let myleads=[];
let saveTab= document.getElementById("save-tab");

 saveTab.addEventListener("click", function () {

    chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {

            console.log(tabs);

            myleads.push({
                         title:tabs[0].title,
                         url: tabs[0].url
                        });

            localStorage.setItem(
                "myleads",
                JSON.stringify(myleads)
            );

            render(myleads);
        }
    );

});
      

 let localstorageLeads =JSON.parse(localStorage.getItem("myleads")) 
    if(localstorageLeads){
      myleads=localstorageLeads;
      render(myleads);
    };
 

   function render(leads){
     let listItems = "";   
     for ( let i=0 ; i < leads.length ;i++){
     listItems +=   `<li>
                          <a href='${leads[i]}' target='_blank'>
                               ${leads[i]}
                               </a>
                     </li>`;
          
   }        // ulEl.innerHTML += "<li>" + myleads[i] + "</li>";
           
    ulEl.innerHTML = listItems;
 

  }


    inputBtn.addEventListener("click", function() {
     if(inputEl.value.trim()=== ""){
          alert("Please write something ");
          return;
     }
         myleads.push(inputEl.value);          
         inputEl.value = "";
        
         localStorage.setItem("myleads",JSON.stringify(myleads));
         console.log(localStorage.getItem("myleads"))
          render(myleads);
         
     });  

    deleteBtn.addEventListener("dblclick" ,function() {
      localStorage.clear();
      myleads=[];
      render(myleads);
      
     });

    
