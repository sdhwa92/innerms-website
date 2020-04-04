(($) => {
  let storage = [];
  let time = new Date();
  let popupOpen = "true";
  let expTime = "";

  if ( localStorage.getItem("openPopupAds") ) {
    storage = localStorage.getItem("openPopupAds").split("|");
    popupOpen = storage[0];
    expTime = storage[1];
  }


  // -- Open popup by default if the open popup is not false
  if ( popupOpen !== "false" || time > expTime ) {
    $("#popup-ads").modal({
      backdrop: 'static',
      keyboard: false
    });
  }


  $(".popup-close").click(function() {
    $("#popup-ads").modal("hide");
    let checkboxVal = document.getElementById("popupAdsCheckbox").checked;
    if ( checkboxVal ) {
      let forHour = time.setHours(time.getHours() + 1);
      localStorage.setItem("openPopupAds", "false|"+forHour);
    }
  });
})(jQuery);
