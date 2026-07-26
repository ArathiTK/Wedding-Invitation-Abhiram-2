export const WEDDING = {
  groom: "Abhiram TK",
  bride: "Athira K",
  groomParents: {
    mother: "Mrs. Sheela M",
    father: "Mr. Thulasidas TK",
  },
  groomGrandparents: {
    late: "Late TK Padmanabhan",
    grandmother: "Mrs. CV Chandramathi",
  },
  brideParents: {
    father: "Mr. Anil Kumar K",
    mother: "Mrs. Sindhu P",
  },
  ceremony: {
    date: "Friday, 06 November 2026",
    isoDate: "2026-11-06",
    time: "12:10 PM – 12:50 PM",
    startTime: "121000",
    endTime: "125000",
    venue: "Nova Auditorium Palazhi",
    address: "Opposite HiLite Mall, Kozhikode",
    contact: "+91-9447685756",
    coordinates: { lat: 11.2588, lng: 75.7855 },
    googleMapsUrl: "https://maps.google.com/?q=Nova+Auditorium+Palazhi+Kozhikode",
  },
  reception: {
    date: "Saturday, 07 November 2026",
    isoDate: "2026-11-07",
    time: "12:00 PM – 2:30 PM",
    startTime: "120000",
    endTime: "143000",
    venue: "Sreevalsam Auditorium Payyanur",
    address: "Madathumpadi Temple Road, Payyanur, Kannur",
    coordinates: { lat: 12.0992, lng: 75.2099 },
    googleMapsUrl: "https://maps.google.com/?q=Sreevalsam+Auditorium+Payyanur",
  },
  footer: {
    regards: ["TK Shyam Sundar", "Vinni Pramod"],
    contact: "+91-9447685756",
    whatsapp: "919447685756",
  },
};

export function makeGoogleCalendarUrl(event: {
  title: string;
  isoDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
}) {
  const start = `${event.isoDate.replace(/-/g, "")}T${event.startTime}`;
  const end = `${event.isoDate.replace(/-/g, "")}T${event.endTime}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    location: `${event.venue}, ${event.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
