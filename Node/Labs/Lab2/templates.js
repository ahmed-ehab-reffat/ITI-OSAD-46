const home = (inventory) => `
  <html lang="en">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head><title>Inventory</title></head>
    <link rel="stylesheet" href="/styles/home.css">
    <body>
      <h1>Inventory</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
        ${inventory
          .map(
            (item) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
          </tr>
        `,
          )
          .join("")}
      </table>
      <h2>Add New Item</h2>
      <form method="POST" action="/inventory">
        <input type="text" name="name" placeholder="Item name" required>
        <button type="submit">Add Item</button>
      </form>
        <a href="/astronomy">View Astronomy</a> | <a href="/serbal">View Serbal</a>
    </body>
  </html>
`;

const item = (item) => `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.name} - Details</title>
    <link rel="stylesheet" href="/styles/item.css">
  </head>
  <body>
    <div class="container">
      <header>
        <a href="/" class="back-link">Back to Inventory</a>
      </header>
      
      <main class="item-card">
        <div class="item-header">
          <span class="category-tag">${item.category}</span>
          <h1>${item.name}</h1>
        </div>

        <div class="item-stats">
          <div class="stat">
            <label>Current Stock</label>
            <span class="value">${item.quantity}</span>
          </div>
          <div class="stat">
            <label>Status</label>
            <span class="status-indicator ${item.quantity > 0 ? "in-stock" : "out-of-stock"}">
              ${item.quantity > 0 ? "Available" : "Restock Needed"}
            </span>
          </div>
        </div>
      </main>
    </div>
  </body>
  </html>`;

const astronomy = () => `
  <html lang="en">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head><title>Astronomy</title></head>
    <link rel="stylesheet" href="/styles/astronomy.css">
    <body>
      <h1>Milky Way Galaxy</h1>
      <img src="/images/galaxy.jpg" alt="galaxy" width="700" height="400">
      <a href="/">Back to Home</a>
    </body>
  </html>
`;

const serbal = () => `
  <html lang="en">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head><title>Serbal</title></head>
    <link rel="stylesheet" href="/styles/serbal.css">
    <body>
      <h1>Serbal</h1>
      <img src="/images/serbal.jpeg" alt="serbal" width="700" height="400">
      <a href="/">Back to Home</a>
    </body>
  </html>
`;

const notFound = () => `
  <html lang="en">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head><title>404 Not Found</title></head>
    <link rel="stylesheet" href="/styles/notFound.css">
    <body>
      <h1>Page Not Found!</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/">Go to Home</a>
    </body>
  </html>
`;

module.exports = {
  home,
  item,
  astronomy,
  serbal,
  notFound,
};
