app.factory("BackgroundFactory", function() {
	let starBg = this;

	this.BgImg = "/images/galaga-bg.jpeg";

	return {
		setBgImg: function(newBgImg){
			starBg.bgImg = newBgImg;
		},
		getBgImg: function(){
			return vmBgImg;
		}
	};

});