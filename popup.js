

window.addEventListener('DOMContentLoaded', function () {	
	
    var button = document.querySelectorAll('button');
	button[0].addEventListener('click', clickHandler);
	button[1].addEventListener('click', more_detail);
	button[2].addEventListener('click', clickHandler);
	button[3].addEventListener('click', more_detail);

	var input = document.getElementById("files");
	chrome.storage.sync.set({'showReport': "Off"}, function() {
        
      
	});

	input.addEventListener('change', function () {
	  if (this.files && this.files[0]) {
		var myFile = this.files[0];
		var reader = new FileReader();
		var sourcecode = [];
		chrome.storage.sync.set({'file': "Off"}, function() {
      
		});
		
		reader.addEventListener('load', function (e) {

				var lines = e.target.result.split('\n');
    			for(var line = 0; line < lines.length; line++){
				
						  sourcecode.push(lines[line] + " newlinecom ");
						
				}

				
	
				chrome.storage.sync.set({'file': "On"}, function() {
		
				});

				chrome.storage.local.set({'codes': sourcecode}, function() {
		
				});
			   

		});
		
		reader.readAsBinaryString(myFile);
		input.value = '';

	  }   
	});
	

	

	
	//design button
	button[0].style.display = 'none';
	//plus of design button
	button[1].style.display = 'none';
	//requirement button
	button[2].style.display = 'none';
	//plus of requirement button
	button[3].style.display = 'none';
	//switch button
	document.querySelector('label').addEventListener('click', display);	

	

	});

	function showReportInfo(comments) {

		let newWindow = window.open("about:blank", "", "width=500,height=500,left=400, top=200");
    
		var count = Object.keys(comments).length;
		//console.log(count);
		if(newWindow)
		{
			newWindow.document.writeln("Design SATD Comments<br>");
		  newWindow.document.writeln("Lines &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comments<br>");
		  var design = 0;
		for (i = 0; i < count; i++) { 
		  var num = i.toString();
		  //console.log(comments[num]["comment"]);
		  //console.log(comments[num]["linestart"]);
		  //console.log(comments[num]["lineend"]);
	
		  var line_start = comments[num]["linestart"];
		  var line_end = comments[num]["lineend"];
		  var label = comments[num]["label"];
		  var satdcomment = comments[num]["comment"];



		 
		  if (label == "design")
		  {
			  design = design + 1;
			  if(line_start != line_end)
			  {
				newWindow.document.writeln(line_start + " - " + line_end + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
			  if(line_start == line_end)
			  {
				newWindow.document.writeln(line_start  + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
		  }

		 
	
		}

		
		if(design == 0)
		{
		  newWindow.document.writeln("- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -<br>");
		}

		newWindow.document.writeln("Requirement SATD Comments<br>");
		newWindow.document.writeln("Lines &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comments<br>");

		var req = 0;
		for (j = 0; j < count; j++) { 
			var num = j.toString();
			//console.log(comments[num]["comment"]);
			//console.log(comments[num]["linestart"]);
			//console.log(comments[num]["lineend"]);
	  
			var line_start = comments[num]["linestart"];
			var line_end = comments[num]["lineend"];
			var label = comments[num]["label"];
			var satdcomment = comments[num]["comment"];
		
  
  
		   
			if (label == "req")
			{
				req = req + 1;
				if(line_start != line_end)
				{
				  newWindow.document.writeln(line_start + " - " + line_end + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
				}
				if(line_start == line_end)
				{
				  newWindow.document.writeln(line_start  + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
				}
			}
  
	  
		  }

		  
			if(req == 0)
			{
			  newWindow.document.writeln("- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -<br>");
			}
	}
		
	  
	  }
	

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		for (key in changes) {
	
		  var storageChange = changes[key];
	
		  if(key == "showReport" && storageChange.newValue == "On")
		  {
			chrome.storage.sync.get(['comments'], function(result) {
			
			showReportInfo(result.comments);
			 
			});


			chrome.storage.sync.set({'showReport': "Off"}, function() {
        
      
			});
	
		  }
	
	
		  
		}
	
	  
	
	  });
	

    function clickHandler(element) {
		
		var button = document.querySelectorAll('button');
		
		//design button
		button1.onclick = function (){
			//press button(design)
			if(button[0].value == "unpress"){
				this.style.backgroundColor = "#FF0000";
				this.style.color = "black";
				this.value = "press";

				// Save it using the Chrome extension storage API.
				chrome.storage.sync.set({'markDesign': "On"}, function() {
					// Notify that we saved.
				
				});
				
			}
			//unpress button(design)
			else if (button[0].value == "press"){
				this.style.backgroundColor = '';
				this.style.color = '';
				this.value = "unpress";

				// Save it using the Chrome extension storage API.
				chrome.storage.sync.set({'markDesign': "Off"}, function() {
					// Notify that we saved.
				
				});
			}
		}
		//start highlight
		button2.onclick = function () {
			if(button[2].value == "unpress"){
				this.style.backgroundColor = "#FFFF00";
				this.style.color = "black";
				this.value = "press";
				//add highlight function

				chrome.storage.sync.set({'markReq': "On"}, function() {
					// Notify that we saved.
				
				});
			}
			//unpress button(requirement) disable function
			else if (button[2].value == "press"){
				this.style.backgroundColor = '';
				this.style.color = '';
				this.value = "unpress";
				//disable highlight

				chrome.storage.sync.set({'markReq': "Off"}, function() {
					// Notify that we saved.
				
				});
			}
			
		}
		       
	}

	function showDesignInfo(comments) {

		let newWindow = window.open("about:blank", "", "width=500,height=500,left=400");
    
		var count = Object.keys(comments).length;
		//console.log(count);
		if(newWindow)
		{
		  newWindow.document.writeln("Lines &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comments<br>");
		for (i = 0; i < count; i++) { 
		  var num = i.toString();
		  //console.log(comments[num]["comment"]);
		  //console.log(comments[num]["linestart"]);
		  //console.log(comments[num]["lineend"]);
	
		  var line_start = comments[num]["linestart"];
		  var line_end = comments[num]["lineend"];
		  var label = comments[num]["label"];
		  var satdcomment = comments[num]["comment"];


		 
		  if (label == "design")
		  {
			  if(line_start != line_end)
			  {
				newWindow.document.writeln(line_start + " - " + line_end + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
			  if(line_start == line_end)
			  {
				newWindow.document.writeln(line_start  + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
		  }

	
		}
	}
		
	  
	  }


	  
	function showReqInfo(comments) {

		let newWindow = window.open("about:blank", "", "width=500,height=500,left=400, top=200");
    
		var count = Object.keys(comments).length;
		//console.log(count);
		if(newWindow)
		{
		  newWindow.document.writeln("Lines &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comments<br>");
		for (i = 0; i < count; i++) { 
		  var num = i.toString();
		  //console.log(comments[num]["comment"]);
		  //console.log(comments[num]["linestart"]);
		  //console.log(comments[num]["lineend"]);
	
		  var line_start = comments[num]["linestart"];
		  var line_end = comments[num]["lineend"];
		  var label = comments[num]["label"];
		  var satdcomment = comments[num]["comment"];


		 
		  if (label == "req")
		  {
			  if(line_start != line_end)
			  {
				newWindow.document.writeln(line_start + " - " + line_end + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
			  if(line_start == line_end)
			  {
				newWindow.document.writeln(line_start  + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp " + satdcomment + "<br>");
			  }
		  }

	
		}
	}
		
	  
	  }
	
	function more_detail(element){

		var plus_button_design = document.querySelector(".plus-button-design");
		var plus_button_requirement = document.querySelector(".plus-button-requirement");


		plus_button_design.onclick = function (){

			chrome.storage.sync.get(['comments'], function(result) {
				//console.log(result.comments);
				showDesignInfo(result.comments);
			   
			  });

		
		}

		plus_button_requirement.onclick = function(){
			chrome.storage.sync.get(['comments'], function(result) {
				//console.log(result.comments);
				showReqInfo(result.comments);
			   
			  });
		}

	}

	//show or hide button
	function display(element) {
		
		var button = document.querySelectorAll('button');
		var CheckBox = document.getElementById("checked");
		//var input_file_button = document.querySelector('div');
		var input_file_button = document.querySelector(".upload-btn-wrapper");

		CheckBox.onchange = function (){
			//unchecked toggle button
			if(CheckBox.checked == false)
			{				
				button[0].style.display = 'none';
				button[1].style.display = 'none';
				button[2].style.display = 'none';
				button[3].style.display = 'none';
				document.getElementById('button1').style.backgroundColor = '';
				document.getElementById('button1').style.color = '';
				document.getElementById('button2').style.backgroundColor = '';
				document.getElementById('button2').style.color = '';
				input_file_button.style.display = 'inline';

				// Save it using the Chrome extension storage API.
				chrome.storage.sync.set({'Open': "Off"}, function() {
					// Notify that we saved.
				
				});

				chrome.storage.sync.set({'markReq': "Off"}, function() {
				 
				});
		
				chrome.storage.sync.set({'markDesign': "Off"}, function() {
				 
				});
							
			}
			//checked toggle button and start function
			else
			{				
				button[0].style.display = 'inline';
				button[1].style.display = 'inline';
				button[2].style.display = 'inline';
				button[3].style.display = 'inline';	
				
				input_file_button.style.display = 'none';

				// Save it using the Chrome extension storage API.
				chrome.storage.sync.set({'Open': "On"}, function() {
					// Notify that we saved.
				
				});
				

				//add function
			}
		}
		
		
		
	}


	


