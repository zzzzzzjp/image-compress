const qualityInput = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

qualityInput.addEventListener("input", () => {
  qualityValue.textContent = qualityInput.value;
});

async function compressImages() {
  const files = document.getElementById("fileInput").files;
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (files.length === 0) {
    alert("画像を選んでください");
    return;
  }

  for (const file of files) {
    const img = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const quality = qualityInput.value / 100;

    canvas.toBlob(
      (blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "compressed_" + file.name;
        link.textContent = "ダウンロード：" + file.name;

        result.appendChild(link);
      },
      "image/jpeg",
      quality
    );
  }
}

