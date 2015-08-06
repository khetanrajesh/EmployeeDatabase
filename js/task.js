

    //variable to store the json data
    var jsonObj;
    var addButton;

    //method to initialize the application
   function initialize() {

       document.getElementById("Searchbox").addEventListener("keydown", filter);
       document.getElementById("Searchbox").addEventListener("keyup", filter);
       addButton = document.getElementById("add");
       loadData("assets/sample.json").then(function(result) {
        
           jsonObj = JSON.parse(result);
           sort();

       });
   }


   //method to parse and sort the data read from file
   function sort() {

       var div = document.getElementById("content");
       div.innerHTML = "";
       jsonObj.sort(sortBy("name"));
       for (var i in jsonObj) {
           display(i);
       }
   }


    //method to sort based on a property
   function sortBy(property) {
       return function(a, b) {
           if (a[property].toUpperCase() > b[property].toUpperCase()) {
               return 1;
           } else if (a[property].toUpperCase() < b[property].toUpperCase()) {
               return -1;
           }
           return 0;
       }
   }

    //Method to add a new html div element with the name passed. ID is set to the index
   function display(index) {

       var dummyDiv = document.getElementById("a-well");
       var dummyDivClone = dummyDiv.cloneNode(true);
       var div = document.getElementById("content");
       dummyDivClone.setAttribute("id", index);
       dummyDivClone.lastElementChild.setAttribute("id", "name" + index);
       dummyDivClone.firstElementChild.setAttribute("id", "avatar" + index);
       div.appendChild(dummyDivClone);
       document.getElementById("name" + index).innerHTML = jsonObj[index].name;
       document.getElementById("avatar" + index).src = jsonObj[index].avatar;
       dummyDivClone.addEventListener("click",changeModalData);
       
   }


    //Method to filter the data based on the search query
   function filter() {

       var found=false;
       addButton.style.display= "none" ;
       var div = document.getElementById("content");
       div.innerHTML = "";
       var query = document.getElementById("Searchbox").value;
  
       var queryRegex = new RegExp(query, 'i');
       
       for (var i in jsonObj) {       
           name = jsonObj[i].name;
           if (jsonObj[i].name.match(queryRegex)) {
               display(i);
               var found=true;
               
           }
           
       }
       if(!found){
               
               addButton.style.display= "block" ;
       }

   }

    function add(){
        
        console.log("here");
        var employeeName =document.getElementById("employee_name");
        var employeeDesignation = document.getElementById("employee_designation");
        
            if(employeeName.value.trim()  && employeeDesignation.value.trim()){
            jsonObj.push({name:employeeName.value.trim(), designation: employeeDesignation.value.trim(), avatar: "images/avatar.png"});
            document.getElementById("addModal").style.display="none";
            addButton.style.display= "none" ;
            sort();
            employeeName.value="";
            employeeDesignation.value="";
            document.getElementById("Searchbox").value="";
        }
    
    }


    //display modal with the details of person clicked
  function changeModalData(){
      
       document.getElementById("modal-avatar").src=jsonObj[this.id].avatar;
       document.getElementById("modal-name").innerHTML=jsonObj[this.id].name;
       document.getElementById("modal-designation").innerHTML=jsonObj[this.id].designation;
        
    }


    //Method to get the read the sample data from the file
    function loadData(url) {
       return new Promise(function(resolve) {
           var xmlhttp;
           if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
               xmlhttp = new XMLHttpRequest();
           } else { // code for IE6, IE5
               xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
           }
           xmlhttp.onreadystatechange = function() {
               if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                   resolve(xmlhttp.responseText);
               }
           }
           xmlhttp.open("GET", url, true);
           xmlhttp.send();
       });
   }