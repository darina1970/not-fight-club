document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("playerName").value.trim();

  if (!name) {
    alert("Enter your name");
    return;
  }

  localStorage.setItem("playerName", name);

  // localStorage.setItem(
  //   "battleStats",
  //   JSON.stringify({
  //     wins: 0,
  //     losses: 0,
  //     draws: 0,
  //   })
  // );

  window.location.href = "home.html";
});
