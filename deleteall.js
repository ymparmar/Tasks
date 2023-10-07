
function confirmDelete() {

    const result = confirm("Are you sure you want to delete all items?");
    

    if (result) {

        clearList();
        deleteall();
        

        
    } else {

        return;
    }
}


function clearList() {

    var tableBody = document.getElementById("productTableBody");


    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
    }


    localStorage.removeItem("products");
}

function deleteall(){
const toastTrigger = document.getElementById('DeleteAllbtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}
}