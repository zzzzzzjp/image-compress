const fileInput = document.getElementById("fileInput");
const sizeSelect = document.getElementById("sizeSelect");
const compressBtn = document.getElementById("compressBtn");
const preview = document.getElementById("preview");
const downloadLink = document.getElementById("downloadLink");

compressBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("画像を選んでください");
    return;
  }

  const quality = Number(sizeSelect.value);
  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          preview.src = url;

          downloadLink.href = url;
          downloadLink.download = "compressed.jpg";
          downloadLink.textContent = "圧縮画像をダウンロード";
        },
        "image/jpeg",
        quality
      );
    };
  };

  reader.readAsDataURL(file);
});
