// !HTMl element
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var tableRecord = document.getElementById("tableRecord");
var screenModal = document.getElementById("screen-modal");
var btnColse = document.getElementById("close");

// ^Variable
var bookmarks;
if (localStorage.getItem("Recods") != null) {
  bookmarks = JSON.parse(localStorage.getItem("Recods"));
  displayRecord();
} else {
  bookmarks = [];
}

// *Functions
function addRecord() {
  if ((bookmarkName.value != "") & (bookmarkURL.value != "")) {
    if ((validateNameInput() == true) & (validateUrlInput() == true)) {
      var recod = {
        name: bookmarkName.value,
        siteURL: bookmarkURL.value,
      };
      bookmarks.push(recod);
      localStorage.setItem("Recods", JSON.stringify(bookmarks));
      displayRecord();
      clearForm();
    } else {
      screenModal.classList.replace("d-none", "d-flex");
    }
  } else {
    screenModal.classList.replace("d-none", "d-flex");
  }
}

function displayRecord() {
  var cartona = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    cartona += `
<tr class="pt-sans400">
<td>${i + 1}</td>
<td>${bookmarks[i].name}</td>
<td>
<a class="nav-link" target='blank' href="${bookmarks[i].siteURL}">
  <div class="btn btn-visit">
    <i class="fa-solid fa-eye pe-2"></i>view
  </div>
  </a>
</td>
<td>  <div class="btn btn-danger" onclick=" deleteRecord(${i})">
  <i class="fa-solid fa-trash pe-2" ></i>Delete
</div></td>
</tr> `;
  }
  document.getElementById("tableRecord").innerHTML = cartona;
}
function deleteRecord(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("Recods", JSON.stringify(bookmarks));
  displayRecord();
}

function clearForm() {
  bookmarkName.value = "";
  bookmarkName.classList.remove("is-valid");

  bookmarkURL.value = "";
  bookmarkURL.classList.remove("is-valid");

}

function validateUrlInput() {
  var regaxURl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  if (regaxURl.test(bookmarkURL.value) == true) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");
    return false;
  }
}

function validateNameInput() {
  var regaxName = /[a-zA-Z]{3,}/;
  if (regaxName.test(bookmarkName.value) == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
    return false;
  }
}

// ~Events
btnColse.addEventListener("click", function () {
  screenModal.classList.replace("d-flex", "d-none");
});
