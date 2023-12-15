/**
 * sophisticated_code.js
 * This code implements a dynamic web application that allows users to create and manage a shopping list.
 * It utilizes various JavaScript features such as closures, promises, event handling, and object-oriented programming.
 */

// Utility class for managing and manipulating the shopping list
class ShoppingList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clearList() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.length;
  }
}

// Model for a shopping item
class ShoppingItem {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  getTotalPrice() {
    return this.quantity * this.price;
  }
}

// View class responsible for rendering the shopping list on the web page
class ShoppingListView {
  constructor(listModel, elementId) {
    this.listModel = listModel;
    this.container = document.getElementById(elementId);
  }

  render() {
    this.container.innerHTML = ''; // Clear the container

    this.listModel.items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Quantity: ${item.quantity}, Price: $${item.price})`;
      this.container.appendChild(listItem);
    });

    const totalItems = document.createElement('p');
    totalItems.textContent = `Total Items: ${this.listModel.getTotalItems()}`;
    this.container.appendChild(totalItems);
  }
}

// Controller class responsible for handling user interaction and updating the model and view accordingly
class ShoppingListController {
  constructor(listModel, listView) {
    this.listModel = listModel;
    this.listView = listView;
  }

  addItem(name, quantity, price) {
    const newItem = new ShoppingItem(name, quantity, price);
    this.listModel.addItem(newItem);
    this.listView.render();
  }

  removeItem(item) {
    this.listModel.removeItem(item);
    this.listView.render();
  }

  clearList() {
    this.listModel.clearList();
    this.listView.render();
  }
}

// Create instance of ShoppingList and ShoppingListView
const shoppingList = new ShoppingList();
const shoppingListView = new ShoppingListView(shoppingList, 'shopping-list-container');

// Create instance of ShoppingListController
const shoppingListController = new ShoppingListController(shoppingList, shoppingListView);

// Add sample items
shoppingListController.addItem('Apples', 5, 1.5);
shoppingListController.addItem('Bananas', 3, 0.75);
shoppingListController.addItem('Milk', 2, 2.99);
shoppingListController.addItem('Bread', 1, 3.49);

// Example of event handling
document.getElementById('add-item-form').addEventListener('submit', event => {
  event.preventDefault();
  const nameInput = document.getElementById('item-name');
  const quantityInput = document.getElementById('item-quantity');
  const priceInput = document.getElementById('item-price');

  const name = nameInput.value;
  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);

  shoppingListController.addItem(name, quantity, price);

  // Reset form inputs
  nameInput.value = '';
  quantityInput.value = '';
  priceInput.value = '';
});

// Example of asynchronous code with promises
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  // Process data...
}

// Run initial rendering
shoppingListView.render();
