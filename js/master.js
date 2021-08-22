let mainColor = localStorage.getItem("color-option");

        if(mainColor !== null)
        {
            document.documentElement.style.setProperty("--main--color", mainColor);

            document.querySelectorAll(".colors-list li").forEach(element => {
                
                element.classList.remove("active");

                if(element.dataset.color === mainColor )
                {
                    element.classList.add("active");
                }
            }) ;

            

        }
document.querySelector(".toggle-setting .fa-cog").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");

};


//switch colors
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {
    li.addEventListener("click" , (e) => {
         
        document.documentElement.style.setProperty('--main--color' , e.target.dataset.color);
        localStorage.setItem("color-option" , e.target.dataset.color );
        
        handleActive(e);
    })
});

//switch background


let backgroundOption = true ;

let backgroundInterval; 

let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null)
{
    if(backgroundLocalItem === 'true')
    {
        backgroundOption = true;
    }
    else
    {
        backgroundOption = false; 
    }

    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");

    });
    if (backgroundLocalItem === 'true')
    {
        document.querySelector(".random-background  .yes").classList.add("active");
    }
    else
    {
        document.querySelector(".random-background  .no").classList.add("active");
    }

}

const randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach(span => {
    span.addEventListener("click" , (e) => {
         
        handleActive(e);
        
        if(e.target.dataset.background === 'yes')
        {
            backgroundOption = true;

            randomizeImgs ();

            localStorage.setItem("background_option" , true);
        }
        else
        {
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option" , false);

        }
    })
});




let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg" , "02.jpg" , "03.jpg" ,"04.jpg" , "05.jpg"]; 



function randomizeImgs ()
{
    if(backgroundOption === true)
    {
        backgroundInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")' ;
        }, 1000);
    }
    
}
randomizeImgs ();

//select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    
    let skillsOffsetTop = ourSkills.offsetTop;  

    let skillsOuterHeight = ourSkills.offsetHeight;       

    
    let windowHeight = this.innerHeight;   

    let windowScrollTop = this.pageYOffset;

     if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

         let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

         allSkills.forEach(skill => {

              skill.style.width = skill.dataset.progress
         });
     }
};


//create popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click" , (e) => {

        //create overlay element
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popupbox
        let popupBox = document.createElement("div");
        //add class to the popup box
        popupBox.className ='popup-box';
        
        if(img.alt !== null)
        {
            //create heading 
            let imgHeader = document.createElement("h3");

            let imgtext = document.createTextNode(img.alt);

            //append the text to the heading

            imgHeader.appendChild(imgtext);

            //append theheading to popupbox
            popupBox.appendChild(imgHeader);
        }
        //create the image
        let popupImage = document.createElement("img");

        //set Image source
        popupImage.src = img.src;
        
        //add image to popup box 
        popupBox.appendChild(popupImage);

        //append the popupbox to body 
        document.body.appendChild(popupBox);

        //create the close span

        let theCloseButton = document.createElement("span");
         
        //create the close button text

        theCloseButtonText = document.createTextNode("x");

        //append the text to closebutton

        theCloseButton.appendChild(theCloseButtonText);

        //add class to theclosebutton
        theCloseButton.className = 'close-button';

        //add close button to the popupbox

        popupBox.appendChild(theCloseButton);


    });

});

// close the popup 
document.addEventListener('click' , function (e) {

    if(e.target.className == "close-button" )
    {
        //remove the currentpopup
        e.target.parentNode.remove();

        //remove the overlay
        document.querySelector(".popup-overlay").remove();
    }

});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const alllinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements)
{
    elements.forEach(element => {

        element.addEventListener("click" , (e) => {
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'
            });
        });
});

}

scrollToSomewhere(allBullets);
scrollToSomewhere(alllinks);

// handle active state

function handleActive(ev)
{
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
                
        element.classList.remove("active");
    }) ;

    ev.target.classList.add("active");
}



let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets");

let bulletLocalItem =localStorage.getItem("bullets_option");

 if(bulletLocalItem !== null)
 {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

    });
    
    if(bulletLocalItem === 'block')
    {
        bulletscontainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else
    {
        bulletscontainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }


 }
 
    bulletsSpan.forEach(span => {

        span.addEventListener("click" , (e) => {

            if(span.dataset.display === 'show')
            {
                bulletscontainer.style.display = 'block' ;
                localStorage.setItem("bullets_option" , "block");
            }
            else
            {
                bulletscontainer.style.display = 'none';
                localStorage.setItem("bullets_option" , "none");
            }

            handleActive(e);


        });
    });

//reset button

document.querySelector(".reset-option").onclick = function () 
{   localStorage.clear();
    //localStorage.removeItem("color_option");
    //localStorage.removeItem("background_option");
    //localStorage.removeItem("bullets_option");
    //reload window 
    window.location.reload();
};

//toggle menu

let toggleBtn =document.querySelector(".toggle-menu");

let tlinks =document.querySelector(".links");

  toggleBtn.onclick = function(e)
  {
      e.stopPropagation();
      this.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
  }

  document.addEventListener("click" , (e) => {
      if(e.target !== toggleBtn && e.target !== tlinks)
      {
         if(tlinks.classList.contains("open"))
         {
            toggleBtn.classList.toggle("menu-active");
            tlinks.classList.toggle("open");  
         }
      }

  });

  tlinks.onclick = function(e)
  {
     e.stopPropagation();
  }