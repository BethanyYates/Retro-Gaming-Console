Retro Gaming Console Gallery

GitHub Repository:
https://github.com/BethanyYates/Retro-Gaming-Console.git

Project Description:
This project displays a gallery of retro gaming consoles using information retrieved from an external API. Each console card displays an image, name, manufacturer, and release year.

How the API Request Works:
When the Load Consoles button is clicked, JavaScript creates an XMLHttpRequest object and opens a GET request to the Retro Consoles API. The request is sent using send(), and the program waits for readyState 4 and status 200 before processing the response. JSON.parse() converts the responseText into a JavaScript object, and the console information is accessed through data.consoles.

How the Summary Is Calculated:
The total number of consoles is calculated using the array's length property. A loop compares the release years of each console to determine which one is the oldest and which one is the newest. The summary updates automatically using the information returned by the API.

Technologies Used:
HTML5
CSS3
JavaScript
XMLHttpRequest
JSON API