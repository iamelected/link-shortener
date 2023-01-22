async function shortenLink() {
  const input = document.getElementById("enter-link");
  const button = document.querySelector(".submit");
  const h2 = document.querySelector("h2");

  if (button) {
    button.addEventListener("click", async function () {
      const link = input.value;
      if (!link) {
        alert("Please enter a URL");
        return;
      }
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // Протокол
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // имя домена
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // или IP-адрес (v4)
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // порт и путь
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // строка запроса
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // локатор фрагментов
      if (!pattern.test(link)) {
        alert("Please enter a valid URL");
        return;
      }
      const request = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`
      );
      const response = await request.json();
      const shortened = response.result.full_short_link;
      input.value = shortened;

      navigator.clipboard.writeText(shortened);

      alert("Link copied to clipboard!");
    });
  }
  const text = "Paste the URL to be shortened";
  let index = 0;
  const intervalId = setInterval(() => {
    h2.textContent += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(intervalId);
    }
  }, 100);
}

window.onload = shortenLink;
