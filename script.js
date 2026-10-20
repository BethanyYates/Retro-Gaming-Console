"use strict";

// API URL
const apiURL = "https://ozarktechwebdev.com/api/consoles.json";

// Select HTML elements
const loadButton = document.getElementById("loadConsoles");
const message = document.getElementById("message");
const summary = document.getElementById("summary");
const consoleContainer = document.getElementById("consoleContainer");

// Load consoles when the button is clicked
loadButton.addEventListener("click", loadConsoles);

function loadConsoles() {
    // Clear previous results
    consoleContainer.innerHTML = "";
    summary.textContent = "";
    message.textContent = "Loading...";
    message.classList.remove("error");

    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Open GET request
    xhr.open("GET", apiURL, true);

    // Handle response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                try {
                    // Convert JSON text into an object
                    const data = JSON.parse(xhr.responseText);

                    // Access the consoles array
                    const consoles = data.consoles;

                    console.log(data);
                    console.log(consoles);

                    if (!Array.isArray(consoles)) {
                        throw new Error("Invalid console data.");
                    }

                    // Display the console cards
                    displayConsoles(consoles);

                    // Calculate and display summary
                    displaySummary(consoles);

                    // Remove loading message
                    message.textContent = "";

                } catch (error) {
                    message.textContent =
                        "Error reading console data: " + error.message;
                    message.classList.add("error");
                }

            } else {
                // Display HTTP error
                message.textContent =
                    "Error loading consoles. Status code: " +
                    xhr.status;
                message.classList.add("error");
            }
        }
    };

    // Send request
    xhr.send();
}

// Create a card for each console
function displayConsoles(consoles) {
    consoleContainer.innerHTML = "";

    for (let i = 0; i < consoles.length; i++) {
        const item = consoles[i];

        // Create card
        const card = document.createElement("article");
        card.className = "console-card";

        // Create image
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        image.loading = "lazy";

        // Create console name
        const name = document.createElement("h2");
        name.textContent = item.name;

        // Create manufacturer
        const manufacturer = document.createElement("p");
        manufacturer.textContent =
            "Manufacturer: " + item.manufacturer;

        // Create release year
        const year = document.createElement("p");
        year.textContent = "Year: " + item.year;

        // Add elements to card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(manufacturer);
        card.appendChild(year);

        // Add card to gallery
        consoleContainer.appendChild(card);
    }
}

// Calculate oldest, newest, and total consoles
function displaySummary(consoles) {
    if (consoles.length === 0) {
        summary.textContent = "No consoles found.";
        return;
    }

    // Start with the first console
    let oldest = consoles[0];
    let newest = consoles[0];

    // Compare release years
    for (let i = 1; i < consoles.length; i++) {

        if (Number(consoles[i].year) < Number(oldest.year)) {
            oldest = consoles[i];
        }

        if (Number(consoles[i].year) > Number(newest.year)) {
            newest = consoles[i];
        }
    }

    // Display calculated summary
    summary.textContent =
        consoles.length + " consoles | " +
        "Oldest: " + oldest.name +
        " (" + oldest.year + ") | " +
        "Newest: " + newest.name +
        " (" + newest.year + ")";
}