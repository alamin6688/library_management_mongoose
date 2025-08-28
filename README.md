<h1>Library Management API</h1>
<p>A professional RESTful API for managing a library system, built with Express, TypeScript and MongoDB (Mongoose).</p>

<h2>Features</h2>
<ul>
  <li><b>Book Management:</b> Create, read, update, and delete books with schema validation and business logic enforcement.</li>
  <li><b>Borrowing System:</b> Borrow books with availability checks and automatic updates to book status.</li>
  <li><b>Aggregation Reports:</b> Get a summary of borrowed books using MongoDB aggregation pipeline.</li>
  <li><b>Filtering & Sorting:</b> Retrieve books with flexible filtering, sorting, and pagination.</li>
  <li><b>Mongoose Middleware:</b> Uses pre-save hooks and instance methods for business logic.</li>
  <li><b>Centralized Error Handling:</b> Consistent error responses for all endpoints.</li>
</ul>

<h2>API Endpoints</h2>

<h3>Book Endpoints</h3>
<ul>
  <li><code>POST   /api/books</code> — Create a new book</li>
  <li><code>GET    /api/books</code> — Get all books (supports filtering, sorting, limit)</li>
  <li><code>GET    /api/books/:bookId</code> — Get a book by ID</li>
  <li><code>PUT    /api/books/:bookId</code> — Update a book</li>
  <li><code>DELETE /api/books/:bookId</code> — Delete a book</li>
</ul>

<h3>Borrow Endpoints</h3>
<ul>
  <li><code>POST   /api/borrow</code> — Borrow a book (with business logic)</li>
  <li><code>GET    /api/borrow</code> — Get borrowed books summary (aggregation)</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js (v18 or higher recommended)</li>
  <li>npm</li>
  <li>MongoDB database (local or Atlas)</li>
</ul>

<h3>Installation</h3>
<ol>
  <li><b>Clone the repository:</b>
    <pre><code>git clone https://github.com/your-username/library-management-mongoose.git
cd library-management-mongoose</code></pre>
  </li>
  <li><b>Install dependencies:</b>
    <pre><code>npm install</code></pre>
  </li>
  <li><b>Configure environment variables:</b>
    <ul>
      <li>Create a <code>.env</code> file in the root directory.</li>
      <li>Add your MongoDB credentials:</li>
    </ul>
    <pre><code>DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
PORT=3000</code></pre>
  </li>
  <li><b>Start the development server:</b>
    <pre><code>npm run dev</code></pre>
  </li>
</ol>

<h2>Usage</h2>
<ul>
  <li>Use Postman or any API client to interact with the endpoints.</li>
  <li>Make sure to send JSON bodies for POST/PUT requests.</li>
  <li>See the API section above for endpoint details and required fields.</li>
</ul>

<h2>Project Structure</h2>
<pre><code>├── src
│   ├── app
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── ...
│   ├── config
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
</code></pre>

<h2>License</h2>
<p>MIT</p>
