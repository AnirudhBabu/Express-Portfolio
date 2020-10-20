/*
    File Name: app.js (In public/Scripts)
    Student Name: Anirudh Babu
    Student ID: 301105250
    Date: 9 October, 2020
*/
//IIFE - Immediately Invoked Function Expression
(function(){
    //Array that stores data that the user enters in the form
    let userData = String[5];

    //Function that sets each of the div's (that eventually contain content to be displayed)
    //height to the the height of the background image set in app.css 
    function setDivHeight()
    {
        let bgImage1 = new Image();
        bgImage1.src = "/Assets/images/background-s1.png";
        let style = document.createElement('style');
        style.innerHTML = `
        #unit1 {
        min-height: ${bgImage1.height * 0.53}px;
        width: 100%;
        }
        `;

        let bgImage2 = new Image();
        bgImage2.src = "/Assets/images/background-s2.png";
        style.innerHTML += `
        #unit2 {
        min-height: ${bgImage2.height * 0.53}px;
        width: 100%;
        }
        `;

        let bgImage3 = new Image();
        bgImage3.src = "/Assets/images/background-s3.png";
        style.innerHTML += `
        #unit3 {
        min-height: ${bgImage3.height * 0.53}px;
        width: 100%;
        }
        `;        

        let bgImage4 = new Image();
        bgImage4.src = "/Assets/images/background-s4.png";
        style.innerHTML += `
        #unit4 {
        min-height: ${bgImage4.height * 0.53}px;
        width: 100%;
        }
        `;
        //appending a style element to the head of the doc to implement the styles
        document.head.appendChild(style);
    }
    //Function that captures and stores the data entered by the user
    function DataCapture()
    {
        firstName = document.getElementsByTagName("input")[0].value;
        lastName = document.getElementsByTagName("input")[1].value;
        contactNumber = document.getElementsByTagName("input")[2].value;
        emailAddress = document.getElementsByTagName("input")[3].value;
        message = document.getElementsByTagName("textarea")[0].value;
        
        return [firstName, lastName, contactNumber, emailAddress, message];
    }
    window.addEventListener("load", setDivHeight);

    document.getElementById("submitButton") ? document.getElementById("submitButton").addEventListener("submit", (event)=>{
        event.preventDefault();
        userData = DataCapture();
        window.location.href = "\\";
        console.log(userData);
    }) : null ;
    
})();   