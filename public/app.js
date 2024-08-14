document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "modify") {
    const id = event.target.dataset.id;
    const newTitle = prompt("Введите новое название");
    if (newTitle) {
      modify(id, newTitle).then(() => {
        event.target.closest("li").childNodes[0].textContent = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function modify(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}
