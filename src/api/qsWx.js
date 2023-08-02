import request from "@/utils/request";

export function getWxInfo(id) {
  return request({
    url: "api/wx/queryShareContent",
    method: "get",
  });
}

export function updateWxInfo(data) {
  return request({
    url: "api/wx/setShareContent",
    method: "post",
    data,
  });
}
