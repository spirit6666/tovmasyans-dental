const GOOGLE_SCRIPT_URL =
  "https://docs.google.com/spreadsheets/d/15Iz9L3geZARRHO24UMhRHZIaF1LHfY4lmq4oHQZI4RA/edit?gid=0#gid=0";

async function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector(".form-submit");
  const success = document.getElementById("form-success");

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value.trim()
  };

  button.disabled = true;
  button.textContent = "Sending...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    success.classList.add("show");
    form.reset();

  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong. Please try again.");
  }

  button.disabled = false;
  button.textContent = "Request appointment";

  return false;
}
