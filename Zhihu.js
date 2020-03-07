const path1 = "/moments?";
const path2 = "/topstory/recommend";
const path3 = "/questions/";
const path4 = "/market/header";
const path5 = "/people";
const path6 = "/moments/recommend?";

let url = $request.url;
let body = JSON.parse($response.body);

if (url.indexOf(path1) != -1 || url.indexOf(path6) != -1) {
  body.data = body.data.filter(function(item) {
    if (item.hasOwnProperty('adjson')) {
      return false;
    }
    return true;
  });
}

if (url.indexOf(path2) != -1) {
  body.data = body.data.filter(function(item) {
    if (item.card_type == "slot_event_card" || item.hasOwnProperty('ad')) {
      return false;
    }
    return true;
  });
}

if (url.indexOf(path3) != -1) {
  delete body.ad_info;
  /*
  body.data = body.data.filter(function(item) {
    if (item.author.name == "盐选推荐") {
      return false;
    }
    return true;
  });
  */
}

if (url.indexOf(path4) != -1) {
  body.sub_webs.splice(0, 1);
  body.sub_webs.splice(1, 1);
}

if (url.indexOf(path5) != -1) {
  delete body.mcn_user_info;
}

$done({
  body: JSON.stringify(body)
})
