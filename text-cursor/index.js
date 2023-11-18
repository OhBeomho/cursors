const defaultText = "Hello, World!";
const textInput = document.querySelector("input");
const elements = [];

for (let char of defaultText) {
  const element = document.createElement("div");
  element.classList.add("c");
  element.innerText = char;

  elements.push(element);
  document.body.appendChild(element);
}

window.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  elements.forEach((element, i) =>
    setTimeout(
      () =>
        element.animate([{ left: x + 20 * (i + 1) + "px", top: y - 15 + "px" }], {
          duration: 500,
          fill: "forwards"
        }),
      i * 50
    )
  );
});
textInput.addEventListener("input", () => {
  const text = textInput.value;

  document.querySelectorAll(".c").forEach((e) => e.remove());
  elements.splice(0, elements.length);

  for (let char of text || defaultText) {
    const element = document.createElement("div");
    element.classList.add("c");
    element.innerText = char;

    elements.push(element);
    document.body.appendChild(element);
  }
});
