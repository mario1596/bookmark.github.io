


$(document).ready( function (){
    
    
    $("#bmform").on("submit",function(e){
        
       //console.log("form is working");
        
        
        var formobject = {
            
            title: $("#title").val(),
            url: $("#url").val()
        }
        
        console.log(formobject);
        
        setLS(formobject); /* para hacer funcionar la funcion */
        
      e.preventDefault(); /* esto evita que se cierre rapido */
      $(this)[0].reset(); /* this clear the input field */
        
    });  /* end of form */
    
    function setLS(formobject){ /* tiene que ser como el de arriba en el parentesis */
        
      var check = localStorage.getItem("website");
        
        if(check === null){ /* check the websites */
            
            var websitelist = [];
            websitelist.push(formobject); /* para pasar lo del form aqui */ 
            
            var x = JSON.stringify(websitelist); /* acepta todos los lenguajes el json */
            
            localStorage.setItem("website",x);
        } else{
            
            var retrieveitem = 
               JSON.parse(localStorage.getItem("website"));
            retrieveitem.push(formobject);  /* parchear la info , si habia */
            
            var x = JSON.stringify(retrieveitem);
            
            localStorage.setItem("website",x);
            
            bringwebsites();
        }
        
    }
    
    });    /* ---------- end of everythinggg ----- */ 


function deleteItem(uRL){
    
    console.log(uRL);
    
    var retrieveitem = 
               JSON.parse(localStorage.getItem("website"));
    for (var i=0; i < retrieveitem.length; i++){
        
        if(retrieveitem[i].url == uRL){
            console.log("condition is true"); /* condicion para ver si el url esta en la lista */
            
            retrieveitem.splice(i, 1);
            
        }
    }
    var x = JSON.stringify(retrieveitem);         
            localStorage.setItem("website",x);
     bringwebsites();
}



function editItem(Title , uRL){
    console.log(Title , uRL);
    
     let retrieveitem = 
     JSON.parse(localStorage.getItem("website"));
    
    for (let i=0; i < retrieveitem.length; i++){
        
        if(retrieveitem[i].url == uRL){
            console.log("condition is true"); /* condicion para ver si el url esta en la lista */
            
        
            
            
            var form2 = `
 <div class="form-group">
    <label>Website Name</label>
    <input type="text" class="form-control" value="${Title}" id="title2" aria-describedby="emailHelp" placeholder="add website name here">
  </div>
  <div class="form-group">
    <label>URL</label>
    <input type="text" class="form-control" value="${uRL}" id="url2" placeholder="add ulr here">
  </div>
    <div class="container text-center">
    <div class="row">
        <div class="col lg">
<button type="button" class="btn-lg btn-danger btn-block" data-dismiss="modal" aria-label="Close">Close </button>
    </div>
        <div class="col lg">
  <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
    </div>
    </div>
    </div>


`;
            
            
            $("#f2").html(form2);
            
            
            $("#f2").on("submit",function(e){
               
                
                
                var formObject2 = {
                    title: $("#title2").val(), /* remeber the # porque es un id */ 
                    url: $("#url2").val()
                }
                
                console.log(formObject2);
                
                e.preventDefault();
                
               // $(this)[0].reset();
                
                retrieveitem.splice(i, 1);
                
                retrieveitem.push(formObject2);
                
            var x = JSON.stringify(retrieveitem);         
            localStorage.setItem("website",x);
            bringwebsites();
            });
        }
    }
}

    
    $(window).on("load", function(){
        
        bringwebsites();
        
    });
    
    
    function bringwebsites(){
       var retrieveitem = 
               JSON.parse(localStorage.getItem("website"));
        console.log(retrieveitem); /* parchear de nuevo */
        
        $("#BM").html("  ");
        
        $.each(retrieveitem,function(index, item){ /* equivalencia a for for loop */
            
           var Title = item.title;
           var uRL = item.url; 
            
            
            var myList = `  <li class="list-group-item border border-light bg-info d-flex justify-content-between align-items-center">
    ${Title}
  <a href="${uRL}">  <span class="badge badge-primary badge-pill"><i class="fas fa-link"></i></span></a>

<a href="#"  onclick="editItem('${Title}' , '${uRL}')" data-toggle="modal" data-target=".m2">  <span class="badge badge-primary badge-pill"><i class="fas fa-edit"></i></span> </a>

<a href="#"  onclick="deleteItem('${uRL}')">  <span class="badge badge-primary badge-pill"><i class="fas fa-trash-alt"></i></span> </a>



</li> 
  `;
            
            $("#BM").append(myList);
        });
        
    }




    
