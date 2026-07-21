// Project 4: Front-End Integration with Express API
// Created by Umar Mohammed for INFO 350

// ------------------------------------------------------
// 1. Select HTML elements
// ------------------------------------------------------

const loadItemsBtn = document.getElementById("loadItemsBtn");
const clearItemsBtn = document.getElementById("clearItemsBtn");
const itemForm = document.getElementById("itemForm");

const messageArea = document.getElementById("message-area");
const greetingArea = document.getElementById("greeting-area");
const itemsContainer = document.getElementById("items-container");

const titleInput = document.getElementById("titleInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");


// ------------------------------------------------------
// 2. Helper function to show user-friendly messages
// ------------------------------------------------------

function showMessage(text, type) {
    messageArea.innerHTML = `<div class="message ${type}">${text}</div>`;
}


// ------------------------------------------------------
// 3. GET request: fetch items from Express back-end
// ------------------------------------------------------

async function fetchItems() {
    showMessage("Loading items from the Express API...", "loading");
    itemsContainer.innerHTML = "";
    greetingArea.innerHTML = "";

    try {
        const response = await fetch("/api/items");

        if (!response.ok) {
            throw new Error("The API request failed.");
        }

        const result = await response.json();

        greetingArea.innerHTML = `
            <div class="api-note">
                <strong>Environment Message:</strong> ${result.message}
            </div>
        `;

        if (!result.data || result.data.length === 0) {
            showMessage("No results found.", "empty");
            return;
        }

        displayItems(result.data);
        showMessage("Items loaded successfully!", "success");

    } catch (error) {
        console.error("Error loading items:", error);

        showMessage(
            "Unable to load items. Please check the server or try again later.",
            "error"
        );
    }
}


// ------------------------------------------------------
// 4. Display items as responsive cards
// ------------------------------------------------------

function displayItems(items) {
    itemsContainer.innerHTML = "";

    items.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <span class="category-tag">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;

        itemsContainer.appendChild(card);
    });
}


// ------------------------------------------------------
// 5. POST request: send new item to Express back-end
// ------------------------------------------------------

async function addItem(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !category || !description) {
        showMessage("Please fill in the title, category, and description.", "error");
        return;
    }

    const newItem = {
        title: title,
        category: category,
        description: description
    };

    showMessage("Saving your new item...", "loading");

    try {
        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "The item could not be saved.");
        }

        showMessage("New item added successfully!", "success");

        itemForm.reset();

        // Reload the items so the new item appears on the page
        fetchItems();

        console.log("POST response from API:");
        console.log(result);

    } catch (error) {
        console.error("Error adding item:", error);

        showMessage(
            "Unable to add the item. Please check your information and try again.",
            "error"
        );
    }
}


// ------------------------------------------------------
// 6. Clear displayed items
// ------------------------------------------------------

function clearItems() {
    itemsContainer.innerHTML = "";
    greetingArea.innerHTML = "";
    showMessage("Items cleared from the dashboard.", "empty");
}


// ------------------------------------------------------
// 7. Event listeners
// ------------------------------------------------------

loadItemsBtn.addEventListener("click", fetchItems);
clearItemsBtn.addEventListener("click", clearItems);
itemForm.addEventListener("submit", addItem);

// Load items automatically when the page opens
fetchItems();