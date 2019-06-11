


class Line {

    /**
     * @public
     * @constructs Line
     * @param {Node} node A single line in a file.
     * @param {Number} index The index of the line in the file.
     */
    constructor(node, index) {
      this.node = node;
      this.index = index;
      this.text = node.textContent;
      this.parentNode = node.parentNode;
    }
  
    /**
     * Render line (adds comment style).
     * @public
     * @instance
     * @method render
     */
    render() {
      //this.parentNode.classList.add('blob-expanded');
    }
  
    /**
     * Show line.
     * @public
     * @instance
     * @method show
     */
    show() {
      //this.parentNode.style.display = '';
    }
  
    /**
     * Hide line.
     * @public
     * @instance
     * @method hide
     */
    hide() {
      //this.parentNode.style.display = 'none';
    }
  
    /**
     * Cleanup and destroy line.
     * @public
     * @instance
     * @method destroy
     */
    destroy() {
      delete this.node;
      delete this.index;
      delete this.text;
      delete this.parentNode;
    }
  }


  /**
   * @public
   * @class File
   */
  class File {
  
    /**
     * @public
     * @instance
     * @method constructor
     */
    constructor() {
      this.nodes = document.getElementsByClassName('blob-code');
      //this.lines = [];
      //this.comments = [];
      this.length = 0;
      this.parse();
      this.render();
      //this.show2();
      this.send();
    }
  
    /**
     * Break down lines of a file into comments.
     * @public
     * @instance
     * @method parse
     */
    parse() {
      //var comment = false;
      //var lines;
      this.length = this.nodes.length;
      
  
      for (var index = 0, length = this.nodes.length; index < length; index++) {
        var node = this.nodes[index];
        var line = new Line(node, index);
        keepcomment.push(line.text + " newlinecom ");
  
        //this.lines.push(line);
  
        /*if (!comment && COMMENT_START.test(line.text)) {
          lines = [];
          comment = true;
        }*/
  
        /*if (comment) {
          lines.push(line);
        }*/
  
        /*if (comment && COMMENT_END.test(line.text)) {
          this.comments.push(new Comment(lines));
          comment = false;
        }*/
      }
    }
  
    /**
     * Render the files comments.
     * @public
     * @instance
     * @method show
     */
    render() {
      //this.comments.forEach(comment => comment.render());
    }
  
    /**
     * Show file comments.
     * @public
     * @instance
     * @method hide
     */
    show() {
      //this.comments.forEach(comment => comment.show());
      
    }

    show2()
    {
        
        let newWindow = window.open("about:blank", "", "_blank");
        if (newWindow) {
                this.keepcomment.forEach(function(textincom) {
              newWindow.document.write(JSON.stringify(textincom));
            });
        }
    }
    send()
    {
     
      }

    
    
  
    /**
     * Hide file comments.
     * @public
     * @instance
     * @method hide
     */
    hide() {
      /*var lineNum = +location.hash.replace('#L', '');
  
      this.comments.forEach(comment => {
        if (lineNum <= comment.start.index || lineNum >= comment.end.index) {
          comment.hide();
        }
      });*/
    }
  
    /**
     * Cleanup and destroy file.
     * @public
     * @instance
     * @method destroy
     */
    destroy() {
      //this.comments.forEach(comment => comment.destroy());
      //this.lines.forEach(line => line.destroy());
      delete this.nodes;
      //delete this.lines;
      //delete this.comments;
    }
  }

class Extension {

    /**
     * @public
     * @instance
     * @method constructor
     */
    constructor() {
      this.container = document.getElementById('js-repo-pjax-container');
      this.render();
      this.observe();
    }
  
    /**
     * Creates a MutationObserver that watches for the file viewer to be swapped
     * out.
     * @public
     * @instance
     * @method observe
     */
    observe() {
      this.observer = new MutationObserver(() => {
        this.destroy();
        this.render();

      });
      this.observer.observe(this.container, {
        childList: true
      });
    }

  
    /**
     * Renders the extension
     * @public
     * @instance
     * @method render
     */
    render() {
      this.file = new File();
     
  
    }
  
    /**
     * Cleanup and destroy extension.
     * @public
     * @instance
     * @method destroy
     */
    
    destroy() {
      this.file.destroy();
      delete this.file;
 
    }
  }
  
  /**
   * Kick off extension.
   * @type {Extension}
   */
  
  (() => new Extension())();

  function highlightDesign(comments) {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) {
        if(label == "design")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "#FA8072";
          document.getElementById(text).style.color = "black";
        }
         
        
      }

    }
  
  }

  function unhighlightDesign(comments) {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) {
        if(label == "design")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "";
          document.getElementById(text).style.color = "";
        }
         
        
      }

    }
  
  }

  function highlightReq(comments) {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) {

        if(label == "req")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "#FFD700";
          document.getElementById(text).style.color = "black";
        }
         
        
      }

    }
  
  }

  function unhighlightReq(comments) {
    
    var count = Object.keys(comments).length;
    console.log(count);

    for (i = 0; i < count; i++) { 
      var num = i.toString();
      console.log(comments[num]["comment"]);
      console.log(comments[num]["linestart"]);
      console.log(comments[num]["lineend"]);

      var line_start = comments[num]["linestart"];
      var line_end = comments[num]["lineend"];
      var label = comments[num]["label"];
      

      for (j = line_start; j < line_end + 1; j++) {

        if(label == "req")
        {
          text = "LC"+ j.toString();
          document.getElementById(text).style.backgroundColor = "";
          document.getElementById(text).style.color = "";
        }
         
        
      }

    }
  
  }

  function sendcommentstoServer(comment, command)
  {
    const API_URL = 'http://127.0.0.1:5000/';
    const input = JSON.stringify(comment);
    //console.log(input);
  
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    
    data.append('input', input);
  
    xhr.open('POST', API_URL, true);
  
    xhr.onreadystatechange = function () {
      if(xhr.readyState == 4) {
        console.log("Hi")
        console.log(xhr.status)
        if(xhr.status == 200 || xhr.status == 0)
        {
        //console.log(xhr.responseText);
        var receiveJson = JSON.parse(xhr.responseText);
        console.log(receiveJson);
        //highlightComments(receiveJson);
        
        chrome.storage.sync.set({'comments': receiveJson}, function() {
        
      
        });

        chrome.storage.sync.get(['comments'], function(result) {
          console.log(result.comments);
  
           
          });
        
        if(command == "DetectFile")
        {

        chrome.storage.sync.set({'showReport': "On"}, function() {

        
        });
        }
       
       
        }
     
  
       
      }
      else{
        console.log("Hello");
      }
      
    };
  
    xhr.send(data);
  
  }
  

   // Save it using the Chrome extension storage API.
   chrome.storage.sync.clear();
   chrome.storage.sync.set({'Open': "Off"}, function() {
    // Notify that we saved.
    //window.alert("Clear");
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {

      var storageChange = changes[key];

      if(key == "Open" && storageChange.newValue == "On") 
      {
        sendcommentstoServer(keepcomment, "DetectGitHub");
        
      }

      if(key == "Open" && storageChange.newValue == "Off") 
      {
        chrome.storage.sync.get(['comments'], function(result) {
          unhighlightDesign(result.comments);
          unhighlightReq(result.comments);

         
        });
      }

      if(key == "markDesign" && storageChange.newValue == "On")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            console.log(result.comments);
            highlightDesign(result.comments);
           
          });
      
      }

      if(key == "markDesign" && storageChange.newValue == "Off")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            console.log(result.comments);
            unhighlightDesign(result.comments);
           
          });
      
      }

      if(key == "markReq" && storageChange.newValue == "On")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            console.log(result.comments);
            highlightReq(result.comments);
           
          });
      
      }

      if(key == "markReq" && storageChange.newValue == "Off")
      {
          chrome.storage.sync.get(['comments'], function(result) {
            console.log(result.comments);
            unhighlightReq(result.comments);
           
          });
      
      }

      if(key == "file" && storageChange.newValue == "On")
      {

        chrome.storage.local.get(['codes'], function(result) {
        var str1 = JSON.parse(JSON.stringify(result));
        sendcommentstoServer(str1['codes'],"DetectFile");
        console.log(str1['codes']);
         
        });

        

      }


      
    }

  

  });

  

 
	 

 
  
  
