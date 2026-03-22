export function getPriceLabel(event) {
  if (event.participationMode === "solo")
    return event.price > 0 ? `₹${event.price}` : "Free";
  if (event.participationMode === "team")
    return event.teamPrice > 0 ? `₹${event.teamPrice} / team` : "Free";
  if (event.participationMode === "both") {
    if (event.price > 0 && event.teamPrice > 0)
      return `₹${event.price} solo · ₹${event.teamPrice} team`;
    return event.price > 0 ? `₹${event.price}` : "Free";
  }
  return "Free";
}
