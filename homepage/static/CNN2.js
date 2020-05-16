const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
  inpFile.click();
});

inpFile.addEventListener("change", function() {
  if (inpFile.value) {
    customTxt.innerHTML = inpFile.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});

inpFile.addEventListener("change", function() {
	const file = this.files[0];

	if (file) {
		const reader = new FileReader();

		previewDefaultText.style.display = "none";
		previewImage.style.display = "block";

		reader.addEventListener("load", function() {
			console.log(this);
			previewImage.setAttribute("src", this.result);
		});

		reader.readAsDataURL(file);
	} else {
		previewDefaultText.style.display = null;
		previewImage.style.display = null;

		previewImage.setAttribute("src", "");
	}
});