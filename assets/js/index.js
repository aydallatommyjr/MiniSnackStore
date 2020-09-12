let historyStorage= [];
let targetSnack = "";
let snacksPurchased = [];
const password = "admin";




let cart = document.getElementById("cart")
let arrow = document.querySelectorAll(".arrow")
let purchasedTable = document.getElementById("purchased-table");
let purchaseBtn = document.getElementById("purchase");
let payment = document.getElementById("payment");
let totalPrice = document.getElementById("totalPrice");
let historyTable = document.querySelector("#history-table");
let body = document.body;
let historyBtn = document.getElementById("history-btn");

function drag(ev) {
  targetSnack = ev.target;
  cart.classList.add("animate-cart");
  arrow[0].classList.add("animate-arrow")
  arrow[1].classList.add("animate-arrow")
}

function allowDrop(ev) {
  ev.preventDefault();
}



const addToPurchased = (snacks) => {
  let row = purchasedTable.insertRow();

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();

  cell1.innerHTML = snacks.productname;
  cell2.innerHTML = snacks.productprice;
  cell3.innerHTML = `<button
    class="btn btn-danger delete"
    type="button"
    style="margin-bottom: 0; margin-left: 0"
  >
    Delete
  </button>`;

  snacksPurchased.push(snacks);
  console.log(snacks.productname);
};

let calculateTotal = () => {
    let total = 0;
    for (let i = 1; i < purchasedTable.rows.length; i++) {
        total += parseFloat(purchasedTable.rows[i].cells[1].innerText.slice(1));
    }

    totalPrice.innerText = `₱${total}`;
 
};

function drop(ev) {
  ev.preventDefault();
  let productDesc = targetSnack.children[0].innerText;
  let productPrice = targetSnack.children[2].innerText;

  let snackPurchased = {
    productname: productDesc,
    productprice: productPrice,
  };

  addToPurchased(snackPurchased);
  calculateTotal();

  console.log(productDesc);
  console.log(productPrice);
}



purchasedTable.addEventListener("click", (ev) => {
  if (ev.target.className.includes("delete")) {
    swal({
        title: "Are you sure ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Product Successfuly Deleted ", {
            icon: "success",
          });
          snacksPurchased.splice(
            snacksPurchased.findIndex(
              (snack) =>
                snack.productname ==
                ev.target.parentNode.parentNode.childNodes[0].innerText
            ),
            1
          );
          ev.target.parentNode.parentNode.remove();
          calculateTotal();
        }
      });
   
   
  }


});

const reset = () => {
  totalPrice.innerText = "₱0";
  payment.value = "";
 for (let i = purchasedTable.rows.length-1; i>0; i--) {
  purchasedTable.rows[i].remove();
}

}









let historyDeserialized =  JSON.parse(localStorage.getItem("history")) ?? [];





const addToHistory = (history) => {
  
  
   historyStorage.push(history);
   let historySerialized = JSON.stringify(historyStorage);
   localStorage.setItem("history", historySerialized);
   console.log(historyStorage);


  let row = historyTable.insertRow();
  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();
  let cell6 = row.insertCell();

  
  // cell1.innerHTML = history.saleid;
  // cell2.innerHTML = history.totalprice;
  // cell3.innerHTML = history.payment
  // cell4.innerHTML = history.change
  // cell5.innerHTML = history.datetoday;
  // cell6.innerHTML = `<button
  //   class="btn btn-danger delete-history"
  //   type="button"
  //   style="margin-bottom: 0; margin-left: 0"
  // >
  //   Delete
  // </button>`;

  historyDeserialized =  JSON.parse(localStorage.getItem("history")) ?? [];
for (let i = 0; i < historyDeserialized.length; i++) {

  cell1.innerHTML = historyDeserialized[i].saleid
  cell2.innerHTML = historyDeserialized[i].totalprice;
  cell3.innerHTML = historyDeserialized[i].payment
  cell4.innerHTML = historyDeserialized[i].change
  cell5.innerHTML = historyDeserialized[i].datetoday;
  cell6.innerHTML = `<button
    class="btn btn-danger delete-history"
    type="button"
    style="margin-bottom: 0; margin-left: 0"
  >
    Delete
  </button>`;
}
 

}


purchaseBtn.addEventListener("click", (ev) => {
    let change = +payment.value - +totalPrice.innerText.slice(1);
    
    if(change > 0){
      let saleId = historyTable.rows.length-1;
      let total = totalPrice.innerText;
      let dateToday = new Date();
      
      
      let history = {
          saleid: saleId,
          totalprice : total,
          payment : `₱${payment.value}`,
          change : `₱${change}`,
          datetoday : dateToday
      };
    
       //historyStorage.push(history);
        swal("Thanks for buying !", `Heres your change : ₱${change} !`, "success");

       addToHistory(history);
       reset();

    }


    if(change == 0 && +payment.value > 0){
        swal("Thanks for buying !", "Please come again :)", "success");
        addToHistory();
        reset();
    }



    if(change < 0){
        swal("Ooops Insufficient Payment!", "Please check your payment input :)", "error");
    }

   
    
});






historyTable.addEventListener("click", ev => {

    if (ev.target.className.includes("delete-history")) {
        console.log(ev.target.parentNode.parentNode);
        swal({
            title: "Please enter the password ",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,

            content: {
              element: "input",
              attributes: {
                placeholder: "Type your password",
                type: "password",
              },
            },
          }).then((value) => {
            if(password==value){
              ev.target.parentNode.parentNode.remove();
              swal("Product Successfuly Deleted ", {
                icon: "success",
              });
            }else{
              swal("Wrong Password !", "", "error");
            }
            
          });
    }



      
    
})

window.onload = (event) => {
  
  let row = historyTable.insertRow();
  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();
  let cell6 = row.insertCell();

  
  // cell1.innerHTML = history.saleid;
  // cell2.innerHTML = history.totalprice;
  // cell3.innerHTML = history.payment
  // cell4.innerHTML = history.change
  // cell5.innerHTML = history.datetoday;
  // cell6.innerHTML = `<button
  //   class="btn btn-danger delete-history"
  //   type="button"
  //   style="margin-bottom: 0; margin-left: 0"
  // >
  //   Delete
  // </button>`;

  
for (let i = 0; i < historyDeserialized.length; i++) {

  cell1.innerHTML = historyDeserialized[i].saleid
  cell2.innerHTML = historyDeserialized[i].totalprice;
  cell3.innerHTML = historyDeserialized[i].payment
  cell4.innerHTML = historyDeserialized[i].change
  cell5.innerHTML = historyDeserialized[i].datetoday;
  cell6.innerHTML = `<button
    class="btn btn-danger delete-history"
    type="button"
    style="margin-bottom: 0; margin-left: 0"
  >
    Delete
  </button>`;
}
};