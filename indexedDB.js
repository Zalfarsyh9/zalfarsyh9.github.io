// Open or create the IndexedDB database
let db;
const request = indexedDB.open("ContactMessagesDB", 1);

// Handle database setup
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
  console.log("Database setup complete");
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onerror = (event) => {
  console.error("Database error:", event.target.errorCode);
};

function requestNotificationPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      }
    });
  }
}
function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("Pesan Baru", {
      body: "Data berhasil disimpan di IndexedDB",
      icon: "images/icon-pwa-192x192.png"
    });
  }
}

// Add form submission to IndexedDB
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting to server

  const name = form.querySelector("input[placeholder='Your firstname']").value;
  const nameLast = form.querySelector(
    "input[placeholder='Your lastname']"
  ).value;
  const email = form.querySelector("input[placeholder='Enter Email']").value;
  const comment = form.querySelector(
    "textarea[placeholder='Write Something']"
  ).value;

  const newMessage = {
    name: name,
    nameLast: nameLast,
    email: email,
    comment: comment,
    date: new Date().toISOString(),
  };

  const transaction = db.transaction("messages", "readwrite");
  const store = transaction.objectStore("messages");
  store.add(newMessage);

  transaction.oncomplete = () => {
    console.log("Message saved to database");
    form.reset(); // Reset form fields
    alert("Message saved locally!");
  };

  transaction.onerror = (event) => {
    console.error("Transaction error:", event.target.errorCode);
  };
});

document.addEventListener("DOMContentLoaded", requestNotificationPermission);