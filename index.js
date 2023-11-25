const expenseAmountInput = document.querySelector(".expenseAmount");
const expenseDescriptionInput = document.querySelector(".description");
const expenseCategoryInput = document.querySelector(".category");
const expenseAddExpenseBtn = document.querySelector(".addExpense");
const displayExpense = document.querySelector(".displayExpense");

let editIndex = null; // Variable to store the index of the item being edited

// Function to update the display based on stored data
function updateDisplay() {
  const storedData = JSON.parse(localStorage.getItem("localStorageData")) || [];

  // Clear existing content inside the div
  displayExpense.innerHTML = "";

  for (let i = 0; i < storedData.length; i++) {
    const data = storedData[i];

    // Display the expense data
    const amountOutput = document.createElement("h1");
    amountOutput.className = "amountOutput";
    amountOutput.innerHTML = "Amount = " + data.expenseAmount + "<br>";
    displayExpense.appendChild(amountOutput);

    const descriptionOutput = document.createElement("h1");
    descriptionOutput.className = "descriptionOutput";
    descriptionOutput.innerHTML =
      "Description = " + data.expenseDescription + "<br>";
    displayExpense.appendChild(descriptionOutput);

    const categoryOutput = document.createElement("h1");
    categoryOutput.className = "categoryOutput";
    categoryOutput.innerHTML = "Category = " + data.expenseCategory + "<br>";
    displayExpense.appendChild(categoryOutput);

    // Create Edit and Delete buttons dynamically
    const editBtn = document.createElement("button");
    editBtn.className = "editExpense";
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", () => editExpense(i));
    displayExpense.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteExpense";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", () => deleteExpense(i));
    displayExpense.appendChild(deleteBtn);
  }
}

// Function to handle editing an expense
function editExpense(index) {
  let existingData = JSON.parse(localStorage.getItem("localStorageData")) || [];

  // Store the index of the item being edited
  editIndex = index;

  // Fill input fields with existing data
  expenseAmountInput.value = existingData[index].expenseAmount;
  expenseDescriptionInput.value = existingData[index].expenseDescription;
  expenseCategoryInput.value = existingData[index].expenseCategory;

  // Change the "Add Expense" button to "Edit Expense"
  expenseAddExpenseBtn.innerHTML = "Edit Expense";

  // Remove the corresponding Edit and Delete buttons in the DOM
  const editBtn = document.querySelectorAll(".editExpense")[index];
  const deleteBtn = document.querySelectorAll(".deleteExpense")[index];

  if (editBtn) {
    editBtn.remove();
  }

  if (deleteBtn) {
    deleteBtn.remove();
  }
}

// Function to handle deleting an expense
function deleteExpense(index) {
  let existingData = JSON.parse(localStorage.getItem("localStorageData")) || [];

  // Remove the corresponding Edit and Delete buttons in the DOM
  const editBtn = document.querySelectorAll(".editExpense")[index];
  const deleteBtn = document.querySelectorAll(".deleteExpense")[index];

  if (editBtn) {
    editBtn.remove();
  }

  if (deleteBtn) {
    deleteBtn.remove();
  }

  // Remove the expense from the data array
  existingData.splice(index, 1);
  localStorage.setItem("localStorageData", JSON.stringify(existingData));

  // Update the display after deleting an expense
  updateDisplay();
}

// Event listener for Add/Edit Expense button
expenseAddExpenseBtn.addEventListener("click", () => {
  if (
    expenseAmountInput.value == "" ||
    expenseDescriptionInput.value == "" ||
    expenseCategoryInput.value == ""
  ) {
    alert("Please fill all Input");
  } else {
    let existingData =
      JSON.parse(localStorage.getItem("localStorageData")) || [];

    // Check if it's an edit or add operation
    if (editIndex !== null) {
      // Edit operation
      existingData[editIndex] = {
        expenseAmount: expenseAmountInput.value,
        expenseDescription: expenseDescriptionInput.value,
        expenseCategory: expenseCategoryInput.value,
      };

      // Clear the editIndex variable
      editIndex = null;

      // Change the button back to "Add Expense"
      expenseAddExpenseBtn.innerHTML = "Add Expense";
    } else {
      // Add operation
      let localStorageData = {
        expenseAmount: expenseAmountInput.value,
        expenseDescription: expenseDescriptionInput.value,
        expenseCategory: expenseCategoryInput.value,
      };

      existingData.push(localStorageData);
    }

    localStorage.setItem("localStorageData", JSON.stringify(existingData));

    // Update the display after adding/editing an expense
    updateDisplay();

    // Clear all input fields
    expenseAmountInput.value = "";
    expenseDescriptionInput.value = "";
    expenseCategoryInput.value = "";
  }
});

// Initial display
updateDisplay();
