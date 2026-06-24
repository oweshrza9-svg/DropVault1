const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
let myleads=[];
let saveTab= document.getElementById("save-tab");

// the main save tab that saves the whole tab
 saveTab.addEventListener("click", function () {

    chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {

            myleads.push({
                         title:tabs[0].title,
                         url: tabs[0].url,
                         favicon:tabs[0].favIconUrl
                        });

            localStorage.setItem(
                "myleads",
                JSON.stringify(myleads)
            );

            render(myleads);
        }
    );

});
     
  

// this one checks if somthing in the local storage if yes than 
// itll run if not than itll stay as it was ;)

 let localstorageLeads =JSON.parse(localStorage.getItem("myleads")) 
    if(localstorageLeads){
      myleads=localstorageLeads;
      render(myleads);
    };
 
// the button that renders the leads

 function render(leads) {
    let listItems = "";

  for(let i = 0; i < leads.length; i++){
    let domain = "";
    try{
        domain = new URL(leads[i].url).hostname;
    }
    catch{
        domain = leads[i].url;
    }
    let title = leads[i].title;
    if(title.length > 25){
        title = title.slice(0,25) + "...";
    }
        listItems += `
        <li class="lead-item">

            <div class="left-section">

                <img
                    class="site-logo"
                    src="${leads[i].favicon || 'img/icon.png'}"
                    alt="logo"
                >

                <div class="site-info">

                    <h3>${title}</h3>

                   <a href="${leads[i].url}" target="_blank">
                                 ${domain}
                   </a>

                </div>

            </div>

            <div class="action-buttons">

                <a href="${leads[i].url}" target="_blank">
                    <span class="open-btn">↗</span>
                </a>

                <img
                    class="action-icon delete-icon"
                    src="img/icon.png"
                    alt="delete"
                >

            </div>

        </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

    deleteBtn.addEventListener("dblclick" ,function() {
      localStorage.clear();
      myleads=[];
      render(myleads);
      
     });


ulEl.addEventListener("click", function(e){

     if(e.target.classList.contains("delete-icon")){
            const index = Number(e.target.dataset.index);
            myleads.splice(index,1);
            localStorage.setItem(
            "myleads",
            JSON.stringify(myleads)
        );

        render(myleads);
    }
});



