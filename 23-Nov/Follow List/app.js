const imgSrc1 =
	"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const imgSrc2 =
	"https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const imgSrc3 =
	"https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const pics = document.querySelectorAll(".pic img");

const imgSources = [imgSrc1, imgSrc2, imgSrc3];
const followBtns = document.querySelectorAll(".btn-right");

function assignImages() {
	pics.forEach((pic, idx) => {
		if (imgSources[idx]) {
			pic.src = imgSources[idx];
		}
	});
}
assignImages();

function followUser() {
	followBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const icon = btn.querySelector("i");
			const followSpan = btn.querySelector("span");
			const followStatus = followSpan.innerText;

			if (followStatus === "Follow") {
				console.log("TRUE");
				followSpan.innerText = "Unfollow";
				icon.classList.remove("bi-plus");
				icon.classList.add("bi-dash-lg");
			} else {
				followSpan.innerText = "Follow";
				icon.classList.remove("bi-dash-lg");
				icon.classList.add("bi-plus");
			}
		});
	});
}
followUser();
