document.getElementById("colorForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let paletteName = document.getElementById("paletteNameInput").value.trim();
  if (!paletteName) {
    alert("Please enter a valid name for your color palette.");
    return;
  }
  let input = document.getElementById("colorInput").value;

  if (!input) {
    alert("Please paste a URL to convert to your color palette.");
    return;
  }
//  let colors = input.split("/").pop().split("-");
  let colors;

  if (input.includes('coolors.co')) {
//    const regex = /(?:\/|\-)([0-9A-Fa-f]{6})(?!\w)/g;
//    colors = input.match(regex); // Assign value here
    // Remove hyphens from color codes
//    colors = colors.map(color => color.replace('-', ''));
    colors = input.split("/").pop().split("-");
  }
  // Check if input contains a ColorHunt URL
  else if (input.includes('colorhunt.co')) {
    const regex = /palette\/([0-9A-Za-z]{24})/;
    const match = input.match(regex);
    if (match && match[1]) {
      const paletteID = match[1];
      // Split the palette ID into four 6-character color codes
      colors = [
        paletteID.substr(0, 6),
        paletteID.substr(6, 6),
        paletteID.substr(12, 6),
        paletteID.substr(18, 6)
      ];
    } else {
      alert("Invalid ColorHunt URL format.");
      return;
    }
  }

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
