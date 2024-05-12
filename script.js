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

  let colors;

  if (input.includes('coolors.co')) {
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

// Create a link element
const link = document.createElement('a');

document.getElementById("generateBtn").addEventListener("click", function() {
  let input = document.getElementById("colorInput").value;
  let paletteName = document.getElementById("paletteNameInput").value.trim();

  if (!input) {
    alert("Please paste a URL to convert to your color palette.");
    return;
  }

  let colors; // Declare colors variable here

  if (input.includes('coolors.co')) {
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

  if (!colors) {
    alert("Unable to extract colors from the provided URL.");
    return;
  }

  // Generate XML content dynamically
  let xmlContent = `<?xml version='1.0'?>\n<workbook>\n  <preferences>\n    <color-palette name="${paletteName}" type="regular">\n`;

  colors.forEach(function(color) {
    const trimmedColor = color.trim();
    xmlContent += `      <color>#${trimmedColor}</color>\n`;
  });

  xmlContent += `    </color-palette>\n  </preferences>\n</workbook>`;

  // Create a Blob from the XML content
  const blob = new Blob([xmlContent], { type: 'text/xml' });

  // Set href and download attributes for the link
  link.href = window.URL.createObjectURL(blob);
  link.download = 'Preferences.tps';

  // Simulate a click on the link to trigger the download
  link.click();
});
