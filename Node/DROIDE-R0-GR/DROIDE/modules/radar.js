module.exports = {
  peticion: function validationRequest(data) {
    //json format validations
    if (!data.hasOwnProperty("protocols"))
      throw new Error("PROTOCOL NOT DETECTED");
    else if (!data.hasOwnProperty("scan")) throw new Error("SCAN NOT DETECTED");
    else if (
      data.protocols.length > 1 &&
      ((data.protocols.includes("closest-enemies") &&
        data.protocols.includes("furthest-enemies")) ||
        (data.protocols.includes("assist-allies") &&
          data.protocols.includes("avoid-crossfire")) ||
        (data.protocols.includes("prioritize-mech") &&
          data.protocols.includes("avoid-mech")))
    )
      throw new Error("INCOMPATIBLE PROTOCOLS");

    data = reorder(filterDistance(data));

    if (data == null) throw new Error("NO VALID DISTANCE");

    //ensure valid format
    return JSON.parse(
      `{"x":${data.scan[0].coordinates.x},"y":${data.scan[0].coordinates.y}}`
    );
  },
};
//ignore away
function filterDistance(data) {
  data.scan = data.scan.filter((element) => {
    element["distance"] = calculateDistance(element.coordinates);
    return element.distance <= 100;
  });
  return data;
}
//calculate priority
function reorder(data) {
  var type = "asc";
  data.protocols.forEach((pro) => {
    switch (pro) {
      case "closest-enemies":
        data.scan = data.scan.filter((element) => {
          return (
            element.hasOwnProperty("enemies") && element.enemies.number > 0
          );
        });
        type = "asc";
        break;

      case "furthest-enemies":
        data.scan = data.scan.filter((element) => {
          return (
            element.hasOwnProperty("enemies") && element.enemies.number > 0
          );
        });
        type = "desc";
        break;

      case "assist-allies":
        data.scan = data.scan.filter((element) => {
          return element.hasOwnProperty("allies");
        });
        type = "asc";
        break;

      case "avoid-crossfire":
        data.scan = data.scan.filter((element) => {
          return !element.hasOwnProperty("allies");
        });
        break;

      case "prioritize-mech":
        var ataque = data.scan.filter((element) => {
          return element.enemies.type == "mech";
        });
        data.scan = ataque != null ? ataque : data.scan;
        break;

      case "avoid-mech":
        data.scan = data.scan.filter((element) => {
          return element.enemies.type != "mech";
        });
        break;
    }
    data.scan = sortJSON(data.scan, type);
  });
  return data;
}
//calculate distance
function calculateDistance(coordinates) {
  return Math.sqrt(Math.pow(coordinates.x, 2) + Math.pow(coordinates.y, 2));
}
//order json
function sortJSON(data, type = "asc") {
  return data.sort(function (before, after) {
    if (type === "asc") {
      return before["distance"] < after["distance"] ? -1 : before["distance"] > after["distance"] ? 1 : 0;
    } else {
      return before["distance"] > after["distance"] ? -1 : before["distance"] < after["distance"] ? 1 : 0;
    }
  });
}
