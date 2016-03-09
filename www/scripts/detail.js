var truck_info=localStorage.getItem("selected-truck");
truck_info=JSON.parse(truck_info);
document.getElementById("detail-tname").innerText+=truck_info.tinfo.tname;
document.getElementById("detail-photo").innerText+=truck_info.tinfo.pic;
document.getElementById("detail-location").innerText+=truck_info.lastpos.lat +","+truck_info.lastpos.lon;
document.getElementById("detail-time").innerText+=truck_info.lastpos.timestamp;
document.getElementById("detail-tags").innerText+=truck_info.tinfo.tags;
document.getElementById("detail-blurb").innerText+=truck_info.tinfo.msg;