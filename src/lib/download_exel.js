import * as XLSX from "xlsx";

export default function downloadExcel(data, event, status) {
  event = event ? event : "all_events";
  status = status ? status : "all";
  //   data = [data];
  const mappedData = data.map((item) => ({
    "DRP ID": item.DRP,
    Name: item.name,
    Email: item.email,
    Phone: item.phone,
    Event: item.event,
    "Event ID": item.eventId,
    "Team Name": item.teamName || "-",
    "Team Size": item.teamMembers?.length || 0,
    "Team Members": item.teamMembers?.join(", ") || "-",
    "Registration Type": item.registrationType,
    "Payment Mode": item.paymentMode,
    Status: item.status,
    "Payment Proof": item.paymentProof,
  }));

  const worksheet = XLSX.utils.json_to_sheet(mappedData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "registrations");

  XLSX.writeFile(workbook, `${event}_${status}.xlsx`);
}
