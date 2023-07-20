var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById('submitBtn')
var tableContent = document.getElementById('tableContent');
var boxAlert = document.querySelector(".box-alert");
var closeBtn = document.getElementById("closeBtn");
var allBookmarks = []

if (localStorage.getItem("allBookmarks") != null){
    allBookmarks = JSON.parse(localStorage.getItem("allBookmarks"));
    bookmarkDisplay();
}


bookmarkName.addEventListener("keyup",function(){
    if (bookmarkNameValidation()){
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
    } else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

    }
})

bookmarkURL.addEventListener("keyup",function(){
    if (bookmarkURLValidation()){
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");
    } else{
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");
    }
})

submitBtn.addEventListener("click",function(){
    addBookmark();
})

function addBookmark(){

    if (bookmarkNameValidation() && bookmarkURLValidation()){
        var bookmark = {
            bookmarkName : bookmarkName.value,
            bookmarkURL : bookmarkURL.value,
        }
    
        allBookmarks.push(bookmark);
        localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
        bookmarkDisplay();
        clearForm()
    } else {
        boxAlert.classList.replace("d-none","d-block")
    }
    


}

function bookmarkDisplay(){
    box = ``;

    for(var i =0 ; i < allBookmarks.length ; i++){
        box += `
            <tr>
                <td>${i+1}</td>
                <td>${allBookmarks[i].bookmarkName}</td>
                <td><button onclick="visitURL(${i})" class="btn btn-visit "><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
                <td><button onclick="deleteBookmark(${i})" class="btn btn-delete "><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
            </tr>
        `;
    }
    tableContent.innerHTML = box;
}

function clearForm(){
    bookmarkName.value = "";
    bookmarkURL.value = "";
    bookmarkURL.classList.remove("is-valid");
    bookmarkName.classList.remove("is-valid");
}

function deleteBookmark(index){
    allBookmarks.splice(index,1);
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
    bookmarkDisplay();
}

function visitURL(index){
    window.open('https://'+ allBookmarks[index].bookmarkURL, "_blank");
}


// =====================> Validation
function bookmarkNameValidation(){
    var regex = /^[a-zA-z]{3,}$/gm
    if(regex.test(bookmarkName.value)){
        return true
    } else {
        return false
    }
}


function bookmarkURLValidation(){
    var regex = /www\.[A-za-z]{3,}\.com/gm
    if(regex.test(bookmarkURL.value.toLowerCase())){
        return true
    } else {
        return false
    }
}

closeBtn.addEventListener("click",function(){
    boxAlert.classList.replace("d-block","d-none");
})