window.addEventListener('load', function () {
  const listItems = document.getElementById('listItems');
  const submitButton = document.getElementById("submitButton");
  const userInput = document.getElementById("userInput");

  // Load list items from local storage on page load
  const savedList = localStorage.getItem('listItems');

  function createListItem(item) {
    if (item.trim() !== "") {
      const newListItem = document.createElement('li');
      newListItem.textContent = item;

      const deleteBox = document.createElement('span');
      deleteBox.textContent = "X";

      deleteBox.addEventListener("click", function () {
        listItems.removeChild(newListItem);
        removeFromLocalStorage(item);
      });

      newListItem.appendChild(deleteBox);
      listItems.appendChild(newListItem);
    }
  }

  function removeFromLocalStorage(item) {
    // Remove the item from local storage
    const listItemsArray = (localStorage.getItem('listItems') || '').split('\n');
    const index = listItemsArray.indexOf(item);
    if (index !== -1) {
      listItemsArray.splice(index, 1);
      localStorage.setItem('listItems', listItemsArray.join('\n'));
    }
  }

  submitButton.addEventListener('click', function () {
    const item = userInput.value;
    createListItem(item);
    userInput.value = "";
    saveListToLocalStorage(item);
  });

  function saveListToLocalStorage(item) {
    // Append the new item to local storage
    const listItemsArray = (localStorage.getItem('listItems') || '').split('\n');
    listItemsArray.push(item);
    localStorage.setItem('listItems', listItemsArray.join('\n'));
  }

  //Displays all stored items. split('\n') ensures a new li element is created rather than adding more text to the same li. 
  if (savedList) {
    savedList.split('\n').forEach(function (itemText) {
      createListItem(itemText);
    });
  }
});