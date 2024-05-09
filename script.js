document.getElementById("colorForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let paletteName = document.getElementById("paletteNameInput").value.trim();
  if (!paletteName) {
    alert("Please enter a valid name for your color palette.");
    return;
  }
  let input = document.getElementById("colorInput").value;
  let colors = input.split("/").pop().split("-");
  let formattedColors = `<color-palette name="${paletteName}" type="regular">\n`;
  colors.forEach(function(color) {
    let colorCode = color.trim();
    formattedColors += `<color>#${colorCode}</color>\n`;
  });
  formattedColors += "</color-palette>";

  let output = document.getElementById("output");
  let formattedColorsTextArea = document.getElementById("formattedColors");
  formattedColorsTextArea.value = formattedColors;

  output.classList.remove("hidden");
});

document.getElementById("copyButton").addEventListener("click", function() {
  let textarea = document.getElementById("formattedColors");
  textarea.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
