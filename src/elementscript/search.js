(function () {
  var host = document.currentScript;
  var box = document.createElement("div");
  box.style.cssText = "width:100%;max-width:400px;margin:20px auto;font-family:Arial,Helvetica,sans-serif;";

  box.innerHTML = ''
    + '<div style="display:flex;align-items:center;background:#fff;border-radius:40px;padding:5px 10px;box-shadow:0 4px 10px rgba(0,0,0,0.1);">'
    + '  <input type="text" placeholder="Search..." '
    + '    style="flex:1;border:none;outline:none;font-size:15px;padding:10px 15px;border-radius:40px;color:#333;">'
    + '  <button type="button" '
    + '    style="width:40px;height:40px;border:none;border-radius:50%;cursor:pointer;'
    + '    background:linear-gradient(135deg,#ff5f6d,#ff9966);display:flex;align-items:center;justify-content:center;">'
    + '    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;">'
    + '      <circle cx="11" cy="11" r="8"></circle>'
    + '      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>'
    + '    </svg>'
    + '  </button>'
    + '</div>'
    + '<div id="search-info" style="margin-top:8px;font-size:13px;color:#666;"></div>';

  host.parentNode.insertBefore(box, host);

  var input = box.querySelector("input");
  var info = box.querySelector("#search-info");
  var btn = box.querySelector("button");

  btn.onclick = function () {
    var q = (input.value || "").trim();
    info.textContent = q ? ('You searched for: "' + q + '" (dummy)') : "Please type something.";
  };
})();
