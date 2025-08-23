document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("playerName").value.trim();

  if (!name) {
    alert("Enter your name");
    return;
  }

  localStorage.setItem("playerName", name);

  window.location.href = "home.html";
});
