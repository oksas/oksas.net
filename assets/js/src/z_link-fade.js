// If you're wondering, the z in the filename is to ensure masonry gets loaded first; there's probably a better way to do that though

var mason = new Masonry(".grid", {
	itemSelector: ".grid-item",
	gutter: 32
});

var $internalLinks = document.querySelectorAll(".internal");
var $content = document.querySelector(".content");
var fadeOutTime = 1000;

[].map.call($internalLinks, function($link) {
	$link.addEventListener("click", function(event) {
		event.preventDefault();
		var href = $link.href;
		$content.classList.add("leaving-content");

		setTimeout(function() {
			location.href = href;
		}, fadeOutTime);

		return false;
	});
});
