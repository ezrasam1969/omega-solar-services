// import type { Quotation } from "@/types/quotation";

// const A4_W = 595.5;
// const A4_H = 842.25;
// const MARGIN = 49;
// const CONTENT_W = A4_W - MARGIN * 2;
// const BLUE = "0.09 0.25 0.40";
// // Easy-to-edit page border settings.
// const PO_BORDER_COLOR = BLUE;
// const PO_BORDER_WIDTH = 1.2;
// const PO_BORDER_INSET = 18;
// const BLACK = "0.07 0.07 0.07";
// const GRID = "0.68 0.68 0.68";
// const WHITE = "1 1 1";
// const FONT = "/F1";
// const BOLD = "/F2";

// type Align = "left" | "center" | "right";
// interface PdfTableRow {
//   cells: string[];
//   header?: boolean;
//   aligns?: Align[];
// }

// function escapePdfText(value: string) {
//   return value
//     .replace(/\\/g, "\\\\")
//     .replace(/\(/g, "\\(")
//     .replace(/\)/g, "\\)");
// }
// function concatBytes(parts: Uint8Array[]) {
//   const total = parts.reduce((n, p) => n + p.length, 0);
//   const out = new Uint8Array(total);
//   let offset = 0;
//   for (const part of parts) {
//     out.set(part, offset);
//     offset += part.length;
//   }
//   return out;
// }
// function bytesOf(value: string | Uint8Array) {
//   return typeof value === "string" ? new TextEncoder().encode(value) : value;
// }
// function makePdf(objects: (string | Uint8Array)[]) {
//   const header = new TextEncoder().encode("%PDF-1.4\n%âãÏÓ\n");
//   const chunks: Uint8Array[] = [header];
//   const offsets = [0];
//   let cursor = header.length;
//   for (let i = 0; i < objects.length; i++) {
//     const prefix = new TextEncoder().encode(`${i + 1} 0 obj\n`);
//     const body = bytesOf(objects[i]);
//     const suffix = new TextEncoder().encode("\nendobj\n");
//     offsets.push(cursor);
//     chunks.push(prefix, body, suffix);
//     cursor += prefix.length + body.length + suffix.length;
//   }
//   let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
//   for (let i = 1; i < offsets.length; i++)
//     xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
//   chunks.push(
//     new TextEncoder().encode(
//       `${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${cursor}\n%%EOF`,
//     ),
//   );
//   return new Blob([concatBytes(chunks)], { type: "application/pdf" });
// }
// function contentObject(commands: string) {
//   const encoded = new TextEncoder().encode(commands);
//   return `<< /Length ${encoded.length} >>\nstream\n${commands}\nendstream`;
// }
// function imageObject(bytes: Uint8Array, width: number, height: number) {
//   return concatBytes([
//     new TextEncoder().encode(
//       `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`,
//     ),
//     bytes,
//     new TextEncoder().encode("\nendstream"),
//   ]);
// }
// function parseJpegSize(bytes: Uint8Array) {
//   let i = 2;
//   while (i < bytes.length) {
//     if (bytes[i] !== 0xff) {
//       i++;
//       continue;
//     }
//     const marker = bytes[i + 1];
//     if (marker === 0xd8 || marker === 0xd9) {
//       i += 2;
//       continue;
//     }
//     const len = (bytes[i + 2] << 8) | bytes[i + 3];
//     if (marker >= 0xc0 && marker <= 0xc3)
//       return {
//         width: (bytes[i + 7] << 8) | bytes[i + 8],
//         height: (bytes[i + 5] << 8) | bytes[i + 6],
//       };
//     i += 2 + len;
//   }
//   throw new Error("Invalid JPEG");
// }
// function parsePngSize(bytes: Uint8Array) {
//   return {
//     width: (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19],
//     height:
//       (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23],
//   };
// }
// function textWidth(text: string, size: number) {
//   return text.length * size * 0.48;
// }
// function textCommand(
//   text: string,
//   x: number,
//   y: number,
//   size = 8,
//   bold = false,
//   color = BLACK,
//   align: Align = "left",
// ) {
//   const width = textWidth(text, size);
//   const xPos =
//     align === "center" ? x - width / 2 : align === "right" ? x - width : x;
//   return `BT ${bold ? BOLD : FONT} ${size} Tf ${color} rg 1 0 0 1 ${xPos.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET\n`;
// }
// function rectFill(x: number, y: number, w: number, h: number, color = WHITE) {
//   return `${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f\n`;
// }
// function lineCommand(
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   width = 0.5,
//   color = GRID,
// ) {
//   return `${color} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S\n`;
// }
// function wrapText(text: string, maxChars: number) {
//   const clean = String(text ?? "").trim();
//   if (!clean) return [""];
//   const words = clean.split(/\s+/);
//   const lines: string[] = [];
//   let line = "";
//   for (const word of words) {
//     if (word.length > maxChars && !line) {
//       let rest = word;
//       while (rest.length > maxChars) {
//         lines.push(rest.slice(0, maxChars));
//         rest = rest.slice(maxChars);
//       }
//       line = rest;
//       continue;
//     }
//     const next = line ? `${line} ${word}` : word;
//     if (next.length > maxChars && line) {
//       lines.push(line);
//       line = word;
//     } else line = next;
//   }
//   if (line) lines.push(line);
//   return lines;
// }
// function drawCellText(
//   text: string,
//   x: number,
//   yTop: number,
//   width: number,
//   rowHeight: number,
//   size = 7.2,
//   bold = false,
//   color = BLACK,
//   align: Align = "left",
// ) {
//   const maxChars = Math.max(5, Math.floor((width - 8) / (size * 0.48)));
//   const lines = wrapText(text, maxChars);
//   const lineHeight = size + 1.6;
//   const total = lines.length * lineHeight;
//   let y = yTop - (rowHeight - total) / 2 - size;
//   let c = "";
//   for (const line of lines) {
//     c += textCommand(
//       line,
//       align === "center"
//         ? x + width / 2
//         : align === "right"
//           ? x + width - 4
//           : x + 4,
//       y,
//       size,
//       bold,
//       color,
//       align,
//     );
//     y -= lineHeight;
//   }
//   return c;
// }
// function drawTable(
//   x: number,
//   yTop: number,
//   widths: number[],
//   rows: PdfTableRow[],
//   opts?: { fontSize?: number; headerHeight?: number; rowHeight?: number },
// ) {
//   const fontSize = opts?.fontSize ?? 7.25;
//   const rowHeight = opts?.rowHeight ?? 19;
//   const headerHeight = opts?.headerHeight ?? 20;
//   const totalW = widths.reduce((a, b) => a + b, 0);
//   if (Math.abs(totalW - CONTENT_W) > 0.5)
//     throw new Error(
//       `PO table width must be ${CONTENT_W.toFixed(1)}pt; received ${totalW.toFixed(1)}pt.`,
//     );
//   let y = yTop;
//   let c = "";
//   for (const row of rows) {
//     const h = row.header
//       ? headerHeight
//       : Math.max(
//           rowHeight,
//           ...widths.map((w, i) => {
//             const chars = Math.max(5, Math.floor((w - 8) / (fontSize * 0.48)));
//             return (
//               wrapText(row.cells[i] ?? "", chars).length * (fontSize + 1.6) + 8
//             );
//           }),
//         );
//     if (row.header) c += rectFill(x, y - h, totalW, h, BLUE);
//     let xx = x;
//     for (let i = 0; i < widths.length; i++) {
//       const w = widths[i];
//       c += lineCommand(xx, y, xx, y - h);
//       c += drawCellText(
//         row.cells[i] ?? "",
//         xx,
//         y,
//         w,
//         h,
//         fontSize,
//         !!row.header,
//         row.header ? WHITE : BLACK,
//         row.aligns?.[i] ?? (i === 0 ? "center" : "left"),
//       );
//       xx += w;
//     }
//     c += lineCommand(xx, y, xx, y - h);
//     c += lineCommand(x, y, x + totalW, y);
//     c += lineCommand(x, y - h, x + totalW, y - h);
//     y -= h;
//   }
//   return { commands: c, bottom: y };
// }
// export function formatLongDate(date: string) {
//   if (!date) return "";
//   const d = new Date(`${date}T00:00:00`);
//   if (Number.isNaN(d.getTime())) return date;
//   const day = d.getDate();
//   const suffix =
//     day % 10 === 1 && day !== 11
//       ? "st"
//       : day % 10 === 2 && day !== 12
//         ? "nd"
//         : day % 10 === 3 && day !== 13
//           ? "rd"
//           : "th";
//   return `${day}${suffix} ${d.toLocaleString("en-IN", { month: "long" })} ${d.getFullYear()}`;
// }
// function money(n: number) {
//   return `${Math.max(0, n).toLocaleString("en-IN")}/-`;
// }
// function centeredText(text: string, y: number, size: number, bold = false) {
//   return textCommand(text, A4_W / 2, y, size, bold, BLACK, "center");
// }
// function bulletFooterText(page: number) {
//   const text = `Omega Solar Power Systems `;
//   const suffix = ` Purchase Order   `;
//   const pageText = ` Page ${page}`;
//   const size = 6.7;
//   const bulletWidth = textWidth("•", size);
//   const totalWidth =
//     textWidth(text, size) +
//     bulletWidth +
//     textWidth(suffix, size) +
//     bulletWidth +
//     textWidth(pageText, size);
//   let x = A4_W / 2 - totalWidth / 2;
//   let c = textCommand(text, x, 22, size);
//   x += textWidth(text, size);
//   c += `BT ${FONT} ${size} Tf ${BLACK} rg 1 0 0 1 ${x.toFixed(2)} 22 Tm (${String.fromCharCode(0x95)}) Tj ET\n`;
//   x += bulletWidth;
//   c += textCommand(suffix, x, 22, size);
//   x += textWidth(suffix, size);
//   c += `BT ${FONT} ${size} Tf ${BLACK} rg 1 0 0 1 ${x.toFixed(2)} 22 Tm (${String.fromCharCode(0x95)}) Tj ET\n`;
//   x += bulletWidth;
//   c += textCommand(pageText, x, 22, size);
//   return c;
// }
// function pageFooter(page: number) {
//   return bulletFooterText(page);
// }
// function pageBackground() {
//   return `q ${A4_W} 0 0 ${A4_H} 0 0 cm /WM Do Q\n${PO_BORDER_COLOR} RG ${PO_BORDER_WIDTH} w ${PO_BORDER_INSET} ${PO_BORDER_INSET} ${A4_W - PO_BORDER_INSET * 2} ${A4_H - PO_BORDER_INSET * 2} re S\n`;
// }

// function buildPage1(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();
//   c += centeredText("OMEGA SOLAR POWER SYSTEMS", 793, 18, true);
//   c += centeredText(
//     "Malkajgiri, Secunderabad, Hyderabad, Telangana – 500026",
//     775,
//     8,
//     false,
//   );
//   c += centeredText("PH: 8978428057", 762, 8, false);
//   c += centeredText("PURCHASE ORDER", 738, 18, true);
//   const infoRows: PdfTableRow[] = [
//     {
//       cells: [
//         "PO Number",
//         q.quotationNumber,
//         "PO Date",
//         formatLongDate(q.proposalDate),
//       ],
//     },
//     {
//       cells: [
//         "Client Name",
//         q.customer.name || "—",
//         "Phone Number",
//         q.customer.mobile || "—",
//       ],
//     },
//     {
//       cells: [
//         "Client Address",
//         [q.customer.location, q.customer.pincode].filter(Boolean).join(" ") ||
//           "—",
//         "System Capacity",
//         q.system.capacity || "—",
//       ],
//     },
//     { cells: ["Project Type", q.system.projectType || "—", "", ""] },
//   ];
//   let t = drawTable(
//     margin,
//     714,
//     [80, 186, 99, 132],
//     infoRows.map((r) => ({ ...r, aligns: ["left", "left", "left", "left"] })),
//   );
//   c += t.commands;
//   c += textCommand(
//     "1. Purchase Order Scope",
//     A4_W / 2,
//     t.bottom - 22,
//     12,
//     true,
//     BLACK,
//     "center",
//   );
//   const scopeText = `Omega Solar Power Systems agrees to supply, install, commission and support a ${q.system.capacity || "—"} rooftop solar power system for the above-mentioned client, subject to the specifications, commercial terms and scope described in this Purchase Order.`;
//   let y = t.bottom - 39;
//   for (const line of wrapText(scopeText, 112)) {
//     c += textCommand(line, margin, y, 8.5);
//     y -= 11;
//   }
//   c += textCommand(
//     "2. System & Material Specifications",
//     A4_W / 2,
//     y - 10,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 29;
//   const techRows: PdfTableRow[] = [
//     {
//       header: true,
//       cells: ["Sl. No.", "Item / Component", "Specification / Brand"],
//       aligns: ["center", "left", "left"],
//     },
//     { cells: ["1", "Solar PV Modules", q.technical.panelType || "—"] },
//     { cells: ["2", "Solar Inverter", q.technical.inverterType || "—"] },
//     { cells: ["3", "AC Wiring", q.technical.acWiring || "—"] },
//     { cells: ["4", "Earthing Wire", q.technical.earthingWire || "—"] },
//     { cells: ["5", "DC Cable", q.technical.dcCable || "—"] },
//     { cells: ["6", "ACDB / DCDB", q.technical.acdbDcdb || "—"] },
//     { cells: ["7", "Earthing", q.technical.earthing || "—"] },
//     {
//       cells: [
//         "8",
//         "Lightning Protection",
//         q.technical.lightningProtection || "—",
//       ],
//     },
//     { cells: ["9", "Module Mounting Structure", q.technical.structure || "—"] },
//   ];
//   t = drawTable(margin, y, [36, 115, 346], techRows, {
//     fontSize: 7.45,
//     headerHeight: 22,
//     rowHeight: 22,
//   });
//   c += t.commands;
//   y = t.bottom - 23;
//   c += textCommand(
//     "3. Installation & Technical Configuration",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 18;
//   const install =
//     "The solar modules will be installed on a customized hot-dip galvanized mounting structure. DC generation from the PV modules will be routed through the DC protection arrangement to the inverter, converted to AC, and routed through the AC protection arrangement to the electrical system and net meter, as applicable.";
//   for (const line of wrapText(install, 112)) {
//     c += textCommand(line, margin, y, 8.5);
//     y -= 11;
//   }
//   c += textCommand(
//     "4. Company Scope of Work",
//     A4_W / 2,
//     y - 9,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 27;
//   const scopeRows: PdfTableRow[] = [
//     {
//       header: true,
//       cells: ["Sl.", "Company Scope"],
//       aligns: ["center", "left"],
//     },
//     {
//       cells: [
//         "1",
//         q.scope.installation
//           ? "Complete system installation - under company scope"
//           : "Complete system installation - not included",
//       ],
//     },
//     {
//       cells: [
//         "2",
//         q.scope.civilWorks
//           ? "Civil works required for the solar installation – under company scope"
//           : "Civil works required for the solar installation – not included",
//       ],
//     },
//     {
//       cells: [
//         "3",
//         q.scope.netMetering
//           ? "Net metering process and coordination – under company scope"
//           : "Net metering process and coordination – not included",
//       ],
//     },
//     {
//       cells: [
//         "4",
//         q.scope.subsidySupport
//           ? "Subsidy process / documentation support – under company scope"
//           : "Subsidy process / documentation support – not included",
//       ],
//     },
//     {
//       cells: [
//         "5",
//         q.scope.testingCommissioning
//           ? "Installation, testing and commissioning of the complete system"
//           : "Installation, testing and commissioning – not included",
//       ],
//     },
//   ];
//   t = drawTable(margin, y, [36, 115, 346], techRows, {
//     fontSize: 8.2,
//     headerHeight: 24,
//     rowHeight: 24,
//   });
//   c += t.commands;
//   c += pageFooter(1);
//   return c;
// }
// function buildPage2(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();
//   let y = 792;
//   c += textCommand("5. PRICING", A4_W / 2, y, 13, true, BLACK, "center");
//   y -= 15;
//   const deduction =
//     Math.max(0, q.pricing.subsidy) + Math.max(0, q.pricing.discount);
//   let t = drawTable(
//     margin,
//     y,
//     CONTENT_W === 497.5 ? [365, 132.5] : [365, 132],
//     [
//       {
//         header: true,
//         cells: ["Particular", "Amount"],
//         aligns: ["left", "left"],
//       },
//       { cells: ["Actual Cost", money(q.pricing.actualProjectCost)] },
//       { cells: ["Deduction", deduction ? money(deduction) : "0/-"] },
//       { cells: ["Closing Price", money(q.pricing.closingPrice)] },
//     ],
//     { fontSize: 7.5, headerHeight: 22, rowHeight: 22 },
//   );
//   c += t.commands;
//   y = t.bottom - 19;
//   c += textCommand(
//     "6. WARRANTY AND SERVICE COMMITMENT",
//     A4_W / 2,
//     y - 4,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 24;
//   t = drawTable(
//     margin,
//     y,
//     [36, 115, 346],
//     [
//       {
//         header: true,
//         cells: ["Sl.", "Component", "Warranty / Service"],
//         aligns: ["center", "left", "left"],
//       },
//       {
//         cells: [
//           "1",
//           "Solar Panels",
//           q.warranty.panel || "25 Years Panel Warranty",
//         ],
//       },
//       {
//         cells: ["2", "Wiring", q.warranty.wiring || "30 Years Wiring Warranty"],
//       },
//       {
//         cells: [
//           "3",
//           "Mounting Structure",
//           q.warranty.structure || "30 Years Structure Warranty",
//         ],
//       },
//       {
//         cells: [
//           "4",
//           "Inverter",
//           q.warranty.inverter || "10 Years Inverter Warranty",
//         ],
//       },
//       {
//         cells: [
//           "5",
//           "Service",
//           q.warranty.freeService || "5 Years Free Service",
//         ],
//       },
//     ],
//     { fontSize: 7.4, headerHeight: 22, rowHeight: 22 },
//   );
//   c += t.commands;
//   y = t.bottom - 21;
//   const note =
//     "Note: Warranty coverage is subject to the respective manufacturer warranty terms and applicable exclusions. Free service is subject to Omega Solar Power Systems' service policy.";
//   for (const line of wrapText(note, 112)) {
//     c += textCommand(line, margin, y, 7.15);
//     y -= 9;
//   }
//   c += textCommand(
//     "7. Payment Terms",
//     A4_W / 2,
//     y - 7,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 27;
//   t = drawTable(
//     margin,
//     y,
//     [36, 365, 96.5],
//     [
//       {
//         header: true,
//         cells: ["Sl.", "Stage", "Payment"],
//         aligns: ["center", "left", "center"],
//       },
//       { cells: ["1", "Advance for designing", `${q.paymentTerms.designing}%`] },
//       {
//         cells: [
//           "2",
//           "Structure and wiring stage",
//           `${q.paymentTerms.structureWiring}%`,
//         ],
//       },
//       { cells: ["3", "Modules stage", `${q.paymentTerms.modules}%`] },
//       {
//         cells: [
//           "4",
//           "After fixing / completion of net meter",
//           `${q.paymentTerms.netMeterCompletion}%`,
//         ],
//       },
//     ],
//     { fontSize: 7.4, headerHeight: 22, rowHeight: 22 },
//   );
//   c += t.commands;
//   y = t.bottom - 32;
//   c += textCommand(
//     "8. General Terms & Conditions",
//     A4_W / 2,
//     y - 5,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 23;
//   const terms = [
//     "1. The system will be supplied and installed as per the specifications mentioned in this Purchase Order.",
//     "2. Structure height will be customized according to the site requirement, generally 6/8 feet as specified.",
//     "3. Civil works, net metering and subsidy process are included under company scope as stated above, subject to applicable utility/government rules and approvals.",
//     "4. Any additional work or material outside the stated scope may be charged separately after discussion with the client.",
//     "5. Final generation depends on solar irradiation, roof orientation, shading, weather conditions, grid availability and other site conditions.",
//     "6. The client shall provide reasonable access to the site and necessary electrical/infrastructure coordination required for installation.",
//     "7. Any changes to the system specifications or scope after order confirmation shall be mutually agreed in writing.",
//   ];
//   for (const term of terms) {
//     for (const line of wrapText(term, 112)) {
//       c += textCommand(line, margin, y, 7.15);
//       y -= 9;
//     }
//     y -= 4;
//   }
//   c += pageFooter(2);
//   return c;
// }
// function buildPage3(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();
//   let y = 792;
//   c += textCommand(
//     "9. Banking Details",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 15;
//   let t = drawTable(
//     margin,
//     y,
//     [119, 378.5],
//     [
//       { cells: ["Bank Name", "YES BANK"] },
//       { cells: ["Account number", "041361900015255"] },
//       { cells: ["IFSC CODE", "YESB0000413"] },
//     ],
//     { fontSize: 7.8, rowHeight: 24 },
//   );
//   c += t.commands;
//   y = t.bottom - 34;
//   c += textCommand(
//     "10. Order Acceptance",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 24;
//   const acceptance =
//     "By signing below, the client confirms acceptance of the Purchase Order, including the system specifications, scope of work, commercial terms, payment schedule and warranty/service conditions mentioned herein.";
//   for (const line of wrapText(acceptance, 112)) {
//     c += textCommand(line, margin, y, 7.8);
//     y -= 11;
//   }
//   c += textCommand("Customer Signature", 58, 245, 8, true);
//   c += textCommand("Authorized Signature", 424, 245, 8, true);
//   c += textCommand(
//     "OMEGA SOLAR POWER SYSTEMS | Malkajgiri, Secunderabad, Hyderabad, Telangana – 500026",
//     58,
//     115,
//     7.2,
//     true,
//   );
//   c += textCommand(
//     "Thank you for choosing Omega Solar Power Systems.",
//     58,
//     102,
//     7.2,
//   );
//   c += pageFooter(3);
//   return c;
// }

// export async function generatePurchaseOrderPdf(q: Quotation) {
//   const watermarkResponse = await fetch("/omega-watermark.jpg");
//   if (!watermarkResponse.ok)
//     throw new Error("Omega Solar watermark asset could not be loaded.");
//   const watermarkBytes = new Uint8Array(await watermarkResponse.arrayBuffer());
//   const wmSize = parseJpegSize(watermarkBytes);
//   const objects: (string | Uint8Array)[] = [
//     "",
//     "",
//     "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
//     "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
//   ];
//   const watermarkRef = objects.length + 1;
//   objects.push(imageObject(watermarkBytes, wmSize.width, wmSize.height));
//   const pages = [buildPage1(q), buildPage2(q), buildPage3(q)];
//   const contentRefs: number[] = [];
//   const pageRefs: number[] = [];
//   for (let i = 0; i < pages.length; i++) {
//     let content = pages[i];
//     contentRefs.push(objects.length + 1);
//     objects.push(contentObject(content));
//   }
//   for (let i = 0; i < contentRefs.length; i++) {
//     const xobject = ` /XObject << /WM ${watermarkRef} 0 R >>`;
//     pageRefs.push(objects.length + 1);
//     objects.push(
//       `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W} ${A4_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >>${xobject} >> /Contents ${contentRefs[i]} 0 R >>`,
//     );
//   }
//   objects[0] = `<< /Type /Catalog /Pages 2 0 R >>`;
//   objects[1] = `<< /Type /Pages /Count ${pageRefs.length} /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] >>`;
//   return makePdf(objects);
// }
// export function downloadBlob(blob: Blob, filename: string) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   setTimeout(() => URL.revokeObjectURL(url), 1500);
// }

// import type { Quotation } from "@/types/quotation";

// const A4_W = 595.5;
// const A4_H = 842.25;
// const MARGIN = 49;
// const CONTENT_W = A4_W - MARGIN * 2;
// const BLUE = "0.09 0.25 0.40";
// // Easy-to-edit page border settings.
// const PO_BORDER_COLOR = BLUE;
// const PO_BORDER_WIDTH = 1.2;
// const PO_BORDER_INSET = 18;
// const BLACK = "0.07 0.07 0.07";
// const GRID = "0.68 0.68 0.68";
// const WHITE = "1 1 1";
// const FONT = "/F1";
// const BOLD = "/F2";

// type Align = "left" | "center" | "right";
// interface PdfTableRow {
//   cells: string[];
//   header?: boolean;
//   aligns?: Align[];
// }

// function escapePdfText(value: string) {
//   return value
//     .replace(/\\/g, "\\\\")
//     .replace(/\(/g, "\\(")
//     .replace(/\)/g, "\\)");
// }
// function concatBytes(parts: Uint8Array[]) {
//   const total = parts.reduce((n, p) => n + p.length, 0);
//   const out = new Uint8Array(total);
//   let offset = 0;
//   for (const part of parts) {
//     out.set(part, offset);
//     offset += part.length;
//   }
//   return out;
// }
// function bytesOf(value: string | Uint8Array) {
//   return typeof value === "string" ? new TextEncoder().encode(value) : value;
// }
// function makePdf(objects: (string | Uint8Array)[]) {
//   const header = new TextEncoder().encode("%PDF-1.4\n%âãÏÓ\n");
//   const chunks: Uint8Array[] = [header];
//   const offsets = [0];
//   let cursor = header.length;
//   for (let i = 0; i < objects.length; i++) {
//     const prefix = new TextEncoder().encode(`${i + 1} 0 obj\n`);
//     const body = bytesOf(objects[i]);
//     const suffix = new TextEncoder().encode("\nendobj\n");
//     offsets.push(cursor);
//     chunks.push(prefix, body, suffix);
//     cursor += prefix.length + body.length + suffix.length;
//   }
//   let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
//   for (let i = 1; i < offsets.length; i++)
//     xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
//   chunks.push(
//     new TextEncoder().encode(
//       `${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${cursor}\n%%EOF`,
//     ),
//   );
//   return new Blob([concatBytes(chunks)], { type: "application/pdf" });
// }
// function contentObject(commands: string) {
//   const encoded = new TextEncoder().encode(commands);
//   return `<< /Length ${encoded.length} >>\nstream\n${commands}\nendstream`;
// }
// function imageObject(bytes: Uint8Array, width: number, height: number) {
//   return concatBytes([
//     new TextEncoder().encode(
//       `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`,
//     ),
//     bytes,
//     new TextEncoder().encode("\nendstream"),
//   ]);
// }
// function parseJpegSize(bytes: Uint8Array) {
//   let i = 2;
//   while (i < bytes.length) {
//     if (bytes[i] !== 0xff) {
//       i++;
//       continue;
//     }
//     const marker = bytes[i + 1];
//     if (marker === 0xd8 || marker === 0xd9) {
//       i += 2;
//       continue;
//     }
//     const len = (bytes[i + 2] << 8) | bytes[i + 3];
//     if (marker >= 0xc0 && marker <= 0xc3)
//       return {
//         width: (bytes[i + 7] << 8) | bytes[i + 8],
//         height: (bytes[i + 5] << 8) | bytes[i + 6],
//       };
//     i += 2 + len;
//   }
//   throw new Error("Invalid JPEG");
// }
// function parsePngSize(bytes: Uint8Array) {
//   return {
//     width: (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19],
//     height:
//       (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23],
//   };
// }
// function textWidth(text: string, size: number) {
//   return text.length * size * 0.48;
// }
// function textCommand(
//   text: string,
//   x: number,
//   y: number,
//   size = 8,
//   bold = false,
//   color = BLACK,
//   align: Align = "left",
// ) {
//   const width = textWidth(text, size);
//   const xPos =
//     align === "center" ? x - width / 2 : align === "right" ? x - width : x;
//   return `BT ${bold ? BOLD : FONT} ${size} Tf ${color} rg 1 0 0 1 ${xPos.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET\n`;
// }
// function rectFill(x: number, y: number, w: number, h: number, color = WHITE) {
//   return `${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f\n`;
// }
// function lineCommand(
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   width = 0.5,
//   color = GRID,
// ) {
//   return `${color} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S\n`;
// }
// function wrapText(text: string, maxChars: number) {
//   const clean = String(text ?? "").trim();
//   if (!clean) return [""];
//   const words = clean.split(/\s+/);
//   const lines: string[] = [];
//   let line = "";
//   for (const word of words) {
//     if (word.length > maxChars && !line) {
//       let rest = word;
//       while (rest.length > maxChars) {
//         lines.push(rest.slice(0, maxChars));
//         rest = rest.slice(maxChars);
//       }
//       line = rest;
//       continue;
//     }
//     const next = line ? `${line} ${word}` : word;
//     if (next.length > maxChars && line) {
//       lines.push(line);
//       line = word;
//     } else line = next;
//   }
//   if (line) lines.push(line);
//   return lines;
// }
// function drawCellText(
//   text: string,
//   x: number,
//   yTop: number,
//   width: number,
//   rowHeight: number,
//   size = 7.2,
//   bold = false,
//   color = BLACK,
//   align: Align = "left",
// ) {
//   const maxChars = Math.max(5, Math.floor((width - 8) / (size * 0.48)));
//   const lines = wrapText(text, maxChars);
//   const lineHeight = size + 1.6;
//   const total = lines.length * lineHeight;
//   let y = yTop - (rowHeight - total) / 2 - size;
//   let c = "";
//   for (const line of lines) {
//     c += textCommand(
//       line,
//       align === "center"
//         ? x + width / 2
//         : align === "right"
//           ? x + width - 4
//           : x + 4,
//       y,
//       size,
//       bold,
//       color,
//       align,
//     );
//     y -= lineHeight;
//   }
//   return c;
// }
// function drawTable(
//   x: number,
//   yTop: number,
//   widths: number[],
//   rows: PdfTableRow[],
//   opts?: { fontSize?: number; headerHeight?: number; rowHeight?: number },
// ) {
//   const fontSize = opts?.fontSize ?? 7.25;
//   const rowHeight = opts?.rowHeight ?? 19;
//   const headerHeight = opts?.headerHeight ?? 20;
//   const totalW = widths.reduce((a, b) => a + b, 0);
//   if (Math.abs(totalW - CONTENT_W) > 0.5)
//     throw new Error(
//       `PO table width must be ${CONTENT_W.toFixed(1)}pt; received ${totalW.toFixed(1)}pt.`,
//     );
//   let y = yTop;
//   let c = "";
//   for (const row of rows) {
//     const h = row.header
//       ? headerHeight
//       : Math.max(
//           rowHeight,
//           ...widths.map((w, i) => {
//             const chars = Math.max(5, Math.floor((w - 8) / (fontSize * 0.48)));
//             return (
//               wrapText(row.cells[i] ?? "", chars).length * (fontSize + 1.6) + 8
//             );
//           }),
//         );
//     if (row.header) c += rectFill(x, y - h, totalW, h, BLUE);
//     let xx = x;
//     for (let i = 0; i < widths.length; i++) {
//       const w = widths[i];
//       c += lineCommand(xx, y, xx, y - h);
//       c += drawCellText(
//         row.cells[i] ?? "",
//         xx,
//         y,
//         w,
//         h,
//         fontSize,
//         !!row.header,
//         row.header ? WHITE : BLACK,
//         row.aligns?.[i] ?? (i === 0 ? "center" : "left"),
//       );
//       xx += w;
//     }
//     c += lineCommand(xx, y, xx, y - h);
//     c += lineCommand(x, y, x + totalW, y);
//     c += lineCommand(x, y - h, x + totalW, y - h);
//     y -= h;
//   }
//   return { commands: c, bottom: y };
// }
// export function formatLongDate(date: string) {
//   if (!date) return "";
//   const d = new Date(`${date}T00:00:00`);
//   if (Number.isNaN(d.getTime())) return date;
//   const day = d.getDate();
//   const suffix =
//     day % 10 === 1 && day !== 11
//       ? "st"
//       : day % 10 === 2 && day !== 12
//         ? "nd"
//         : day % 10 === 3 && day !== 13
//           ? "rd"
//           : "th";
//   return `${day}${suffix} ${d.toLocaleString("en-IN", { month: "long" })} ${d.getFullYear()}`;
// }
// function money(n: number) {
//   return `${Math.max(0, n).toLocaleString("en-IN")}/-`;
// }
// function centeredText(text: string, y: number, size: number, bold = false) {
//   return textCommand(text, A4_W / 2, y, size, bold, BLACK, "center");
// }
// function bulletFooterText(page: number) {
//   const size = 6.7;
//   const leftText = "Omega Solar Power Systems";
//   const middleText = "Purchase Order";
//   const leftX = 58;
//   const gap = 7;
//   const bulletWidth = textWidth("•", size);

//   let c = textCommand(leftText, leftX, 22, size);
//   let x = leftX + textWidth(leftText, size) + gap;
//   c += `BT ${FONT} ${size} Tf ${BLACK} rg 1 0 0 1 ${x.toFixed(2)} 22 Tm (${String.fromCharCode(0x95)}) Tj ET\n`;
//   x += bulletWidth + gap;
//   c += textCommand(middleText, x, 22, size);

//   // Keep the second bullet and page number at the far right edge.
//   const pageText = `Page ${page}`;
//   const pageRight = A4_W - 58;
//   const pageWidth = textWidth(pageText, size);
//   const bulletX = pageRight - pageWidth - gap - bulletWidth;
//   c += `BT ${FONT} ${size} Tf ${BLACK} rg 1 0 0 1 ${bulletX.toFixed(2)} 22 Tm (${String.fromCharCode(0x95)}) Tj ET\n`;
//   c += textCommand(pageText, pageRight, 22, size, false, BLACK, "right");
//   return c;
// }

// function pageFooter(page: number) {
//   return bulletFooterText(page);
// }
// function pageBackground() {
//   return `q ${A4_W} 0 0 ${A4_H} 0 0 cm /WM Do Q\n${PO_BORDER_COLOR} RG ${PO_BORDER_WIDTH} w ${PO_BORDER_INSET} ${PO_BORDER_INSET} ${A4_W - PO_BORDER_INSET * 2} ${A4_H - PO_BORDER_INSET * 2} re S\n`;
// }

// function buildPage1(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();

//   c += centeredText("OMEGA SOLAR POWER SYSTEMS", 793, 18, true);
//   c += centeredText(
//     "Malkajgiri, Secunderabad, Hyderabad, Telangana – 500026",
//     775,
//     8,
//     false,
//   );
//   c += centeredText("PH: 8978428057", 762, 8, false);
//   c += centeredText("PURCHASE ORDER", 738, 18, true);

//   const infoRows: PdfTableRow[] = [
//     {
//       cells: [
//         "PO Number",
//         q.quotationNumber,
//         "PO Date",
//         formatLongDate(q.proposalDate),
//       ],
//     },
//     {
//       cells: [
//         "Client Name",
//         q.customer.name || "—",
//         "Phone Number",
//         q.customer.mobile || "—",
//       ],
//     },
//     {
//       cells: [
//         "Client Address",
//         [q.customer.location, q.customer.pincode].filter(Boolean).join(" ") ||
//           "—",
//         "System Capacity",
//         q.system.capacity || "—",
//       ],
//     },
//     { cells: ["Project Type", q.system.projectType || "—", "", ""] },
//   ];

//   let t = drawTable(
//     margin,
//     714,
//     [80, 186, 99, 132],
//     infoRows.map((r) => ({ ...r, aligns: ["left", "left", "left", "left"] })),
//   );
//   c += t.commands;

//   c += textCommand(
//     "1. Purchase Order Scope",
//     A4_W / 2,
//     t.bottom - 22,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   const scopeText = `Omega Solar Power Systems agrees to supply, install, commission and support a ${q.system.capacity || "—"} rooftop solar power system for the above-mentioned client, subject to the specifications, commercial terms and scope described in this Purchase Order.`;
//   let y = t.bottom - 39;
//   for (const line of wrapText(scopeText, 112)) {
//     c += textCommand(line, margin, y, 8.5);
//     y -= 11;
//   }

//   c += textCommand(
//     "2. System & Material Specifications",
//     A4_W / 2,
//     y - 10,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 29;

//   const techRows: PdfTableRow[] = [
//     {
//       header: true,
//       cells: ["Sl. No.", "Item / Component", "Specification / Brand"],
//       aligns: ["center", "left", "left"],
//     },
//     { cells: ["1", "Solar PV Modules", q.technical.panelType || "—"] },
//     { cells: ["2", "Solar Inverter", q.technical.inverterType || "—"] },
//     { cells: ["3", "AC Wiring", q.technical.acWiring || "—"] },
//     { cells: ["4", "Earthing Wire", q.technical.earthingWire || "—"] },
//     { cells: ["5", "DC Cable", q.technical.dcCable || "—"] },
//     { cells: ["6", "ACDB / DCDB", q.technical.acdbDcdb || "—"] },
//     { cells: ["7", "Earthing", q.technical.earthing || "—"] },
//     {
//       cells: [
//         "8",
//         "Lightning Protection",
//         q.technical.lightningProtection || "—",
//       ],
//     },
//     { cells: ["9", "Module Mounting Structure", q.technical.structure || "—"] },
//   ];

//   t = drawTable(margin, y, [36, 115, 346], techRows, {
//     fontSize: 8.2,
//     headerHeight: 24,
//     rowHeight: 24,
//   });
//   c += t.commands;
//   y = t.bottom - 28;

//   c += textCommand(
//     "3. Installation & Technical Configuration",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 20;
//   const install =
//     "The solar modules will be installed on a customized hot-dip galvanized mounting structure. DC generation from the PV modules will be routed through the DC protection arrangement to the inverter, converted to AC, and routed through the AC protection arrangement to the electrical system and net meter, as applicable.";
//   for (const line of wrapText(install, 112)) {
//     c += textCommand(line, margin, y, 8.5);
//     y -= 11;
//   }

//   // Section 4 starts page 2 to use the three A4 pages more effectively.
//   c += pageFooter(1);
//   return c;
// }

// function buildPage2(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();
//   let y = 792;

//   c += textCommand(
//     "4. Company Scope of Work",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 26;

//   const scopeRows: PdfTableRow[] = [
//     {
//       header: true,
//       cells: ["Sl.", "Company Scope"],
//       aligns: ["center", "left"],
//     },
//     {
//       cells: [
//         "1",
//         q.scope.installation
//           ? "Complete system installation - under company scope"
//           : "Complete system installation - not included",
//       ],
//     },
//     {
//       cells: [
//         "2",
//         q.scope.civilWorks
//           ? "Civil works required for the solar installation – under company scope"
//           : "Civil works required for the solar installation – not included",
//       ],
//     },
//     {
//       cells: [
//         "3",
//         q.scope.netMetering
//           ? "Net metering process and coordination – under company scope"
//           : "Net metering process and coordination – not included",
//       ],
//     },
//     {
//       cells: [
//         "4",
//         q.scope.subsidySupport
//           ? "Subsidy process / documentation support – under company scope"
//           : "Subsidy process / documentation support – not included",
//       ],
//     },
//     {
//       cells: [
//         "5",
//         q.scope.testingCommissioning
//           ? "Installation, testing and commissioning of the complete system"
//           : "Installation, testing and commissioning – not included",
//       ],
//     },
//   ];

//   let t = drawTable(margin, y, [36, 461], scopeRows, {
//     fontSize: 8.2,
//     headerHeight: 24,
//     rowHeight: 24,
//   });
//   c += t.commands;
//   y = t.bottom - 30;

//   c += textCommand("5. PRICING", A4_W / 2, y, 13, true, BLACK, "center");
//   y -= 24;
//   const deduction =
//     Math.max(0, q.pricing.subsidy) + Math.max(0, q.pricing.discount);
//   t = drawTable(
//     margin,
//     y,
//     [365, 132.5],
//     [
//       {
//         header: true,
//         cells: ["Particular", "Amount"],
//         aligns: ["left", "left"],
//       },
//       { cells: ["Actual Cost", money(q.pricing.actualProjectCost)] },
//       { cells: ["Deduction", deduction ? money(deduction) : "0/-"] },
//       { cells: ["Closing Price", money(q.pricing.closingPrice)] },
//     ],
//     { fontSize: 8.2, headerHeight: 24, rowHeight: 24 },
//   );
//   c += t.commands;
//   y = t.bottom - 30;

//   c += textCommand(
//     "6. WARRANTY AND SERVICE COMMITMENT",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 24;
//   t = drawTable(
//     margin,
//     y,
//     [36, 115, 346],
//     [
//       {
//         header: true,
//         cells: ["Sl.", "Component", "Warranty / Service"],
//         aligns: ["center", "left", "left"],
//       },
//       {
//         cells: [
//           "1",
//           "Solar Panels",
//           q.warranty.panel || "25 Years Panel Warranty",
//         ],
//       },
//       {
//         cells: ["2", "Wiring", q.warranty.wiring || "30 Years Wiring Warranty"],
//       },
//       {
//         cells: [
//           "3",
//           "Mounting Structure",
//           q.warranty.structure || "30 Years Structure Warranty",
//         ],
//       },
//       {
//         cells: [
//           "4",
//           "Inverter",
//           q.warranty.inverter || "10 Years Inverter Warranty",
//         ],
//       },
//       {
//         cells: [
//           "5",
//           "Service",
//           q.warranty.freeService || "5 Years Free Service",
//         ],
//       },
//     ],
//     { fontSize: 8.0, headerHeight: 24, rowHeight: 24 },
//   );
//   c += t.commands;
//   y = t.bottom - 20;

//   const note =
//     "Note: Warranty coverage is subject to the respective manufacturer warranty terms and applicable exclusions. Free service is subject to Omega Solar Power Systems' service policy.";
//   for (const line of wrapText(note, 112)) {
//     c += textCommand(line, margin, y, 7.8);
//     y -= 10;
//   }

//   y -= 14;
//   c += textCommand("7. Payment Terms", A4_W / 2, y, 13, true, BLACK, "center");
//   y -= 24;
//   t = drawTable(
//     margin,
//     y,
//     [36, 365, 96.5],
//     [
//       {
//         header: true,
//         cells: ["Sl.", "Stage", "Payment"],
//         aligns: ["center", "left", "center"],
//       },
//       { cells: ["1", "Advance for designing", `${q.paymentTerms.designing}%`] },
//       {
//         cells: [
//           "2",
//           "Structure and wiring stage",
//           `${q.paymentTerms.structureWiring}%`,
//         ],
//       },
//       { cells: ["3", "Modules stage", `${q.paymentTerms.modules}%`] },
//       {
//         cells: [
//           "4",
//           "After fixing / completion of net meter",
//           `${q.paymentTerms.netMeterCompletion}%`,
//         ],
//       },
//     ],
//     { fontSize: 8.0, headerHeight: 24, rowHeight: 24 },
//   );
//   c += t.commands;

//   c += pageFooter(2);
//   return c;
// }

// function buildPage3(q: Quotation) {
//   const margin = MARGIN;
//   let c = pageBackground();
//   let y = 792;

//   c += textCommand(
//     "8. General Terms & Conditions",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 28;

//   const terms = [
//     "1. The system will be supplied and installed as per the specifications mentioned in this Purchase Order.",
//     "2. Structure height will be customized according to the site requirement, generally 6/8 feet as specified.",
//     "3. Civil works, net metering and subsidy process are included under company scope as stated above, subject to applicable utility/government rules and approvals.",
//     "4. Any additional work or material outside the stated scope may be charged separately after discussion with the client.",
//     "5. Final generation depends on solar irradiation, roof orientation, shading, weather conditions, grid availability and other site conditions.",
//     "6. The client shall provide reasonable access to the site and necessary electrical/infrastructure coordination required for installation.",
//     "7. Any changes to the system specifications or scope after order confirmation shall be mutually agreed in writing.",
//   ];

//   for (const term of terms) {
//     for (const line of wrapText(term, 100)) {
//       c += textCommand(line, A4_W / 2, y, 8.3, false, BLACK, "center");
//       y -= 11;
//     }
//     y -= 7;
//   }

//   y -= 18;
//   c += textCommand(
//     "9. Banking Details",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 24;
//   let t = drawTable(
//     margin,
//     y,
//     [119, 378.5],
//     [
//       { cells: ["Bank Name", "YES BANK"] },
//       { cells: ["Account number", "041361900015255"] },
//       { cells: ["IFSC CODE", "YESB0000413"] },
//     ],
//     { fontSize: 8.0, rowHeight: 24 },
//   );
//   c += t.commands;
//   y = t.bottom - 32;

//   c += textCommand(
//     "10. Order Acceptance",
//     A4_W / 2,
//     y,
//     13,
//     true,
//     BLACK,
//     "center",
//   );
//   y -= 26;
//   const acceptance =
//     "By signing below, the client confirms acceptance of the Purchase Order, including the system specifications, scope of work, commercial terms, payment schedule and warranty/service conditions mentioned herein.";
//   for (const line of wrapText(acceptance, 100)) {
//     c += textCommand(line, A4_W / 2, y, 8.3, false, BLACK, "center");
//     y -= 11;
//   }

//   c += textCommand("Customer Signature", 58, 245, 8, true);
//   c += textCommand("Authorized Signature", 424, 245, 8, true);
//   c += textCommand(
//     "OMEGA SOLAR POWER SYSTEMS | Malkajgiri, Secunderabad, Hyderabad, Telangana – 500026",
//     58,
//     115,
//     7.2,
//     true,
//   );
//   c += textCommand(
//     "Thank you for choosing Omega Solar Power Systems.",
//     58,
//     102,
//     7.2,
//   );

//   c += pageFooter(3);
//   return c;
// }

// export async function generatePurchaseOrderPdf(q: Quotation) {
//   const watermarkResponse = await fetch("/omega-watermark.jpg");
//   if (!watermarkResponse.ok)
//     throw new Error("Omega Solar watermark asset could not be loaded.");
//   const watermarkBytes = new Uint8Array(await watermarkResponse.arrayBuffer());
//   const wmSize = parseJpegSize(watermarkBytes);
//   const objects: (string | Uint8Array)[] = [
//     "",
//     "",
//     "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
//     "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
//   ];
//   const watermarkRef = objects.length + 1;
//   objects.push(imageObject(watermarkBytes, wmSize.width, wmSize.height));
//   const pages = [buildPage1(q), buildPage2(q), buildPage3(q)];
//   const contentRefs: number[] = [];
//   const pageRefs: number[] = [];
//   for (let i = 0; i < pages.length; i++) {
//     let content = pages[i];
//     contentRefs.push(objects.length + 1);
//     objects.push(contentObject(content));
//   }
//   for (let i = 0; i < contentRefs.length; i++) {
//     const xobject = ` /XObject << /WM ${watermarkRef} 0 R >>`;
//     pageRefs.push(objects.length + 1);
//     objects.push(
//       `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W} ${A4_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >>${xobject} >> /Contents ${contentRefs[i]} 0 R >>`,
//     );
//   }
//   objects[0] = `<< /Type /Catalog /Pages 2 0 R >>`;
//   objects[1] = `<< /Type /Pages /Count ${pageRefs.length} /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] >>`;
//   return makePdf(objects);
// }
// export function downloadBlob(blob: Blob, filename: string) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   setTimeout(() => URL.revokeObjectURL(url), 1500);
// }

import type { Quotation } from "@/types/quotation";

const A4_W = 595.5;
const A4_H = 842.25;
const MARGIN = 49;
const CONTENT_W = A4_W - MARGIN * 2;
const BLUE = "0.09 0.25 0.40";
// Easy-to-edit page border settings.
const PO_BORDER_COLOR = BLUE;
const PO_BORDER_WIDTH = 1.2;
const PO_BORDER_INSET = 18;
const BLACK = "0.07 0.07 0.07";
const GRID = "0.68 0.68 0.68";
const WHITE = "1 1 1";
const FONT = "/F1";
const BOLD = "/F2";

type Align = "left" | "center" | "right";
interface PdfTableRow {
  cells: string[];
  header?: boolean;
  aligns?: Align[];
}

function escapePdfText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}
function concatBytes(parts: Uint8Array[]) {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
function bytesOf(value: string | Uint8Array) {
  return typeof value === "string" ? new TextEncoder().encode(value) : value;
}
function makePdf(objects: (string | Uint8Array)[]) {
  const header = new TextEncoder().encode("%PDF-1.4\n%âãÏÓ\n");
  const chunks: Uint8Array[] = [header];
  const offsets = [0];
  let cursor = header.length;
  for (let i = 0; i < objects.length; i++) {
    const prefix = new TextEncoder().encode(`${i + 1} 0 obj\n`);
    const body = bytesOf(objects[i]);
    const suffix = new TextEncoder().encode("\nendobj\n");
    offsets.push(cursor);
    chunks.push(prefix, body, suffix);
    cursor += prefix.length + body.length + suffix.length;
  }
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++)
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  chunks.push(
    new TextEncoder().encode(
      `${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${cursor}\n%%EOF`,
    ),
  );
  return new Blob([concatBytes(chunks)], { type: "application/pdf" });
}
function contentObject(commands: string) {
  const encoded = new TextEncoder().encode(commands);
  return `<< /Length ${encoded.length} >>\nstream\n${commands}\nendstream`;
}
function imageObject(bytes: Uint8Array, width: number, height: number) {
  return concatBytes([
    new TextEncoder().encode(
      `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`,
    ),
    bytes,
    new TextEncoder().encode("\nendstream"),
  ]);
}
function parseJpegSize(bytes: Uint8Array) {
  let i = 2;
  while (i < bytes.length) {
    if (bytes[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = bytes[i + 1];
    if (marker === 0xd8 || marker === 0xd9) {
      i += 2;
      continue;
    }
    const len = (bytes[i + 2] << 8) | bytes[i + 3];
    if (marker >= 0xc0 && marker <= 0xc3)
      return {
        width: (bytes[i + 7] << 8) | bytes[i + 8],
        height: (bytes[i + 5] << 8) | bytes[i + 6],
      };
    i += 2 + len;
  }
  throw new Error("Invalid JPEG");
}
function parsePngSize(bytes: Uint8Array) {
  return {
    width: (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19],
    height:
      (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23],
  };
}
// Accurate built-in Helvetica glyph widths.
// The previous implementation used `text.length * size * 0.48`, which is only
// a rough estimate. That caused centered PDF text to drift horizontally even
// though the browser preview was correctly centered.
const HELVETICA_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278,
  278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584,
  584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556,
  833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278,
  278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222,
  500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500,
  500, 334, 260, 334, 584,
];
const HELVETICA_BOLD_WIDTHS = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278,
  278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584,
  584, 611, 975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611,
  833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333,
  278, 333, 584, 556, 333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278,
  556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556,
  500, 389, 280, 389, 584,
];

function textWidth(text: string, size: number, bold = false) {
  const widths = bold ? HELVETICA_BOLD_WIDTHS : HELVETICA_WIDTHS;
  let units = 0;

  for (const char of text) {
    const code = char.charCodeAt(0);
    units += code >= 32 && code <= 126 ? widths[code - 32] : 500;
  }

  return (units / 1000) * size;
}
function textCommand(
  text: string,
  x: number,
  y: number,
  size = 8,
  bold = false,
  color = BLACK,
  align: Align = "left",
) {
  const width = textWidth(text, size, bold);
  const xPos =
    align === "center" ? x - width / 2 : align === "right" ? x - width : x;
  return `BT ${bold ? BOLD : FONT} ${size} Tf ${color} rg 1 0 0 1 ${xPos.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET\n`;
}
function rectFill(x: number, y: number, w: number, h: number, color = WHITE) {
  return `${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f\n`;
}
function lineCommand(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width = 0.5,
  color = GRID,
) {
  return `${color} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S\n`;
}
function wrapText(text: string, maxChars: number) {
  const clean = String(text ?? "").trim();
  if (!clean) return [""];
  const words = clean.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (word.length > maxChars && !line) {
      let rest = word;
      while (rest.length > maxChars) {
        lines.push(rest.slice(0, maxChars));
        rest = rest.slice(maxChars);
      }
      line = rest;
      continue;
    }
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}
function drawCellText(
  text: string,
  x: number,
  yTop: number,
  width: number,
  rowHeight: number,
  size = 7.2,
  bold = false,
  color = BLACK,
  align: Align = "left",
) {
  const maxChars = Math.max(5, Math.floor((width - 8) / (size * 0.48)));
  const lines = wrapText(text, maxChars);
  const lineHeight = size + 1.6;
  const total = lines.length * lineHeight;
  let y = yTop - (rowHeight - total) / 2 - size;
  let c = "";
  for (const line of lines) {
    c += textCommand(
      line,
      align === "center"
        ? x + width / 2
        : align === "right"
          ? x + width - 4
          : x + 4,
      y,
      size,
      bold,
      color,
      align,
    );
    y -= lineHeight;
  }
  return c;
}
function drawTable(
  x: number,
  yTop: number,
  widths: number[],
  rows: PdfTableRow[],
  opts?: { fontSize?: number; headerHeight?: number; rowHeight?: number },
) {
  const fontSize = opts?.fontSize ?? 7.25;
  const rowHeight = opts?.rowHeight ?? 19;
  const headerHeight = opts?.headerHeight ?? 20;
  const totalW = widths.reduce((a, b) => a + b, 0);
  if (Math.abs(totalW - CONTENT_W) > 0.5)
    throw new Error(
      `PO table width must be ${CONTENT_W.toFixed(1)}pt; received ${totalW.toFixed(1)}pt.`,
    );
  let y = yTop;
  let c = "";
  for (const row of rows) {
    const h = row.header
      ? headerHeight
      : Math.max(
          rowHeight,
          ...widths.map((w, i) => {
            const chars = Math.max(5, Math.floor((w - 8) / (fontSize * 0.48)));
            return (
              wrapText(row.cells[i] ?? "", chars).length * (fontSize + 1.6) + 8
            );
          }),
        );
    if (row.header) c += rectFill(x, y - h, totalW, h, BLUE);
    let xx = x;
    for (let i = 0; i < widths.length; i++) {
      const w = widths[i];
      c += lineCommand(xx, y, xx, y - h);
      c += drawCellText(
        row.cells[i] ?? "",
        xx,
        y,
        w,
        h,
        fontSize,
        !!row.header,
        row.header ? WHITE : BLACK,
        row.aligns?.[i] ?? (i === 0 ? "center" : "left"),
      );
      xx += w;
    }
    c += lineCommand(xx, y, xx, y - h);
    c += lineCommand(x, y, x + totalW, y);
    c += lineCommand(x, y - h, x + totalW, y - h);
    y -= h;
  }
  return { commands: c, bottom: y };
}
export function formatLongDate(date: string) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${day}${suffix} ${d.toLocaleString("en-IN", { month: "long" })} ${d.getFullYear()}`;
}
function money(n: number) {
  return `${Math.max(0, n).toLocaleString("en-IN")}/-`;
}
function centeredText(text: string, y: number, size: number, bold = false) {
  return textCommand(text, A4_W / 2, y, size, bold, BLACK, "center");
}
function bulletFooterText(page: number) {
  const size = 6.7;
  const leftText = "Omega Solar Power Systems";
  const middleText = "Purchase Order";
  const pageText = `Page ${page}`;
  const bullet = "\\225"; // PDF WinAnsi bullet (•) for Helvetica.
  const leftX = MARGIN;
  const rightX = A4_W - MARGIN;

  let c = textCommand(leftText, leftX, 22, size, false, BLACK, "left");
  let x = leftX + textWidth(leftText, size) + 8;
  c += `BT ${FONT} ${size} Tf ${BLACK} rg 1 0 0 1 ${x.toFixed(2)} 22 Tm (${bullet}) Tj ET\n`;
  x += textWidth("•", size) + 8;
  c += textCommand(middleText, x, 22, size, false, BLACK, "left");

  // Page number is anchored to the right edge of the content area.
  c += textCommand(pageText, rightX, 22, size, false, BLACK, "right");
  return c;
}

function pageFooter(page: number) {
  return bulletFooterText(page);
}
function pageBackground() {
  return `q ${A4_W} 0 0 ${A4_H} 0 0 cm /WM Do Q\n${PO_BORDER_COLOR} RG ${PO_BORDER_WIDTH} w ${PO_BORDER_INSET} ${PO_BORDER_INSET} ${A4_W - PO_BORDER_INSET * 2} ${A4_H - PO_BORDER_INSET * 2} re S\n`;
}

function buildPage1(q: Quotation) {
  const margin = MARGIN;
  let c = pageBackground();

  c += centeredText("OMEGA SOLAR POWER SYSTEMS", 793, 19, true);
  c += centeredText(
    "Malkajgiri, Secunderabad, Hyderabad, Telangana 500026",
    775,
    8,
    false,
  );
  c += centeredText("PH: 8978428057", 762, 8, false);
  c += centeredText("PURCHASE ORDER", 738, 19, true);

  const infoRows: PdfTableRow[] = [
    {
      cells: [
        "PO Number",
        q.quotationNumber,
        "PO Date",
        formatLongDate(q.proposalDate),
      ],
    },
    {
      cells: [
        "Client Name",
        q.customer.name || "—",
        "Phone Number",
        q.customer.mobile || "—",
      ],
    },
    {
      cells: [
        "Client Address",
        [q.customer.location, q.customer.pincode].filter(Boolean).join(" ") ||
          "—",
        "System Capacity",
        q.system.capacity || "—",
      ],
    },
    { cells: ["Project Type", q.system.projectType || "—", "", ""] },
  ];

  let t = drawTable(
    margin,
    714,
    [80, 186, 99, 132],
    infoRows.map((r) => ({ ...r, aligns: ["left", "left", "left", "left"] })),
  );
  c += t.commands;

  c += textCommand(
    "1. Purchase Order Scope",
    margin,
    t.bottom - 22,
    13,
    true,
    BLACK,
    "left",
  );
  const scopeText = `Omega Solar Power Systems agrees to supply, install, commission and support a ${q.system.capacity || "—"} rooftop solar power system for the above-mentioned client, subject to the specifications, commercial terms and scope described in this Purchase Order.`;
  let y = t.bottom - 39;
  for (const line of wrapText(scopeText, 112)) {
    c += textCommand(line, margin, y, 8.5, false, BLACK, "left");
    y -= 11;
  }

  c += textCommand(
    "2. System & Material Specifications",
    margin,
    y - 10,
    13,
    true,
    BLACK,
    "left",
  );
  y -= 29;

  const techRows: PdfTableRow[] = [
    {
      header: true,
      cells: ["Sl. No.", "Item / Component", "Specification / Brand"],
      aligns: ["center", "left", "left"],
    },
    { cells: ["1", "Solar PV Modules", q.technical.panelType || "—"] },
    { cells: ["2", "Solar Inverter", q.technical.inverterType || "—"] },
    { cells: ["3", "AC Wiring", q.technical.acWiring || "—"] },
    { cells: ["4", "Earthing Wire", q.technical.earthingWire || "—"] },
    { cells: ["5", "DC Cable", q.technical.dcCable || "—"] },
    { cells: ["6", "ACDB / DCDB", q.technical.acdbDcdb || "—"] },
    { cells: ["7", "Earthing", q.technical.earthing || "—"] },
    {
      cells: [
        "8",
        "Lightning Protection",
        q.technical.lightningProtection || "—",
      ],
    },
    { cells: ["9", "Module Mounting Structure", q.technical.structure || "—"] },
  ];

  t = drawTable(margin, y, [36, 115, 346], techRows, {
    fontSize: 8.2,
    headerHeight: 24,
    rowHeight: 24,
  });
  c += t.commands;
  y = t.bottom - 28;

  c += textCommand(
    "3. Installation & Technical Configuration",
    margin,
    y,
    13,
    true,
    BLACK,
    "left",
  );
  y -= 20;
  const install =
    "The solar modules will be installed on a customized hot-dip galvanized mounting structure. DC generation from the PV modules will be routed through the DC protection arrangement to the inverter, converted to AC, and routed through the AC protection arrangement to the electrical system and net meter, as applicable.";
  for (const line of wrapText(install, 112)) {
    c += textCommand(line, margin, y, 8.5, false, BLACK, "left");
    y -= 11;
  }

  // Section 4 starts page 2 to use the three A4 pages more effectively.
  c += pageFooter(1);
  return c;
}

function buildPage2(q: Quotation) {
  const margin = MARGIN;
  let c = pageBackground();
  let y = 792;

  c += textCommand(
    "4. Company Scope of Work",
    margin,
    y,
    13,
    true,
    BLACK,
    "left",
  );
  y -= 26;

  const scopeRows: PdfTableRow[] = [
    {
      header: true,
      cells: ["Sl.", "Company Scope"],
      aligns: ["center", "left"],
    },
    {
      cells: [
        "1",
        q.scope.installation
          ? "Complete system installation - under company scope"
          : "Complete system installation - not included",
      ],
    },
    {
      cells: [
        "2",
        q.scope.civilWorks
          ? "Civil works required for the solar installation – under company scope"
          : "Civil works required for the solar installation – not included",
      ],
    },
    {
      cells: [
        "3",
        q.scope.netMetering
          ? "Net metering process and coordination – under company scope"
          : "Net metering process and coordination – not included",
      ],
    },
    {
      cells: [
        "4",
        q.scope.subsidySupport
          ? "Subsidy process / documentation support – under company scope"
          : "Subsidy process / documentation support – not included",
      ],
    },
    {
      cells: [
        "5",
        q.scope.testingCommissioning
          ? "Installation, testing and commissioning of the complete system"
          : "Installation, testing and commissioning – not included",
      ],
    },
  ];

  let t = drawTable(margin, y, [36, 461], scopeRows, {
    fontSize: 8.2,
    headerHeight: 24,
    rowHeight: 24,
  });
  c += t.commands;
  y = t.bottom - 30;

  c += textCommand("5. PRICING", margin, y, 13, true, BLACK, "left");
  y -= 24;
  const deduction =
    Math.max(0, q.pricing.subsidy) + Math.max(0, q.pricing.discount);
  t = drawTable(
    margin,
    y,
    [365, 132.5],
    [
      {
        header: true,
        cells: ["Particular", "Amount"],
        aligns: ["left", "left"],
      },
      { cells: ["Actual Cost", money(q.pricing.actualProjectCost)] },
      { cells: ["Deduction", deduction ? money(deduction) : "0/-"] },
      { cells: ["Closing Price", money(q.pricing.closingPrice)] },
    ],
    { fontSize: 8.2, headerHeight: 24, rowHeight: 24 },
  );
  c += t.commands;
  y = t.bottom - 30;

  c += textCommand(
    "6. WARRANTY AND SERVICE COMMITMENT",
    margin,
    y,
    13,
    true,
    BLACK,
    "left",
  );
  y -= 24;
  t = drawTable(
    margin,
    y,
    [36, 115, 346],
    [
      {
        header: true,
        cells: ["Sl.", "Component", "Warranty / Service"],
        aligns: ["center", "left", "left"],
      },
      {
        cells: [
          "1",
          "Solar Panels",
          q.warranty.panel || "25 Years Panel Warranty",
        ],
      },
      {
        cells: ["2", "Wiring", q.warranty.wiring || "30 Years Wiring Warranty"],
      },
      {
        cells: [
          "3",
          "Mounting Structure",
          q.warranty.structure || "30 Years Structure Warranty",
        ],
      },
      {
        cells: [
          "4",
          "Inverter",
          q.warranty.inverter || "10 Years Inverter Warranty",
        ],
      },
      {
        cells: [
          "5",
          "Service",
          q.warranty.freeService || "5 Years Free Service",
        ],
      },
    ],
    { fontSize: 8.0, headerHeight: 24, rowHeight: 24 },
  );
  c += t.commands;
  y = t.bottom - 20;

  const note =
    "Note: Warranty coverage is subject to the respective manufacturer warranty terms and applicable exclusions. Free service is subject to Omega Solar Power Systems' service policy.";
  for (const line of wrapText(note, 112)) {
    c += textCommand(line, margin, y, 8.2, false, BLACK, "left");
    y -= 10;
  }

  y -= 14;
  c += textCommand("7. Payment Terms", margin, y, 13, true, BLACK, "left");
  y -= 24;
  t = drawTable(
    margin,
    y,
    [36, 365, 96.5],
    [
      {
        header: true,
        cells: ["Sl.", "Stage", "Payment"],
        aligns: ["center", "left", "center"],
      },
      { cells: ["1", "Advance for designing", `${q.paymentTerms.designing}%`] },
      {
        cells: [
          "2",
          "Structure and wiring stage",
          `${q.paymentTerms.structureWiring}%`,
        ],
      },
      { cells: ["3", "Modules stage", `${q.paymentTerms.modules}%`] },
      {
        cells: [
          "4",
          "After fixing / completion of net meter",
          `${q.paymentTerms.netMeterCompletion}%`,
        ],
      },
    ],
    { fontSize: 8.0, headerHeight: 24, rowHeight: 24 },
  );
  c += t.commands;

  c += pageFooter(2);
  return c;
}

function buildPage3(q: Quotation) {
  const margin = MARGIN;
  let c = pageBackground();
  let y = 792;

  c += textCommand(
    "8. General Terms & Conditions",
    margin,
    y,
    13,
    true,
    BLACK,
    "left",
  );
  y -= 28;

  const terms = [
    "1. The system will be supplied and installed as per the specifications mentioned in this Purchase Order.",
    "2. Structure height will be customized according to the site requirement, generally 6/8 feet as specified.",
    "3. Civil works, net metering and subsidy process are included under company scope as stated above, subject to applicable utility/government rules and approvals.",
    "4. Any additional work or material outside the stated scope may be charged separately after discussion with the client.",
    "5. Final generation depends on solar irradiation, roof orientation, shading, weather conditions, grid availability and other site conditions.",
    "6. The client shall provide reasonable access to the site and necessary electrical/infrastructure coordination required for installation.",
    "7. Any changes to the system specifications or scope after order confirmation shall be mutually agreed in writing.",
  ];

  for (const term of terms) {
    for (const line of wrapText(term, 100)) {
      c += textCommand(line, margin, y, 8.3, false, BLACK, "left");
      y -= 11;
    }
    y -= 7;
  }

  y -= 18;
  c += textCommand("9. Banking Details", margin, y, 13, true, BLACK, "left");
  y -= 24;
  let t = drawTable(
    margin,
    y,
    [119, 378.5],
    [
      { cells: ["Bank Name", "YES BANK"] },
      { cells: ["Account number", "041361900015255"] },
      { cells: ["IFSC CODE", "YESB0000413"] },
    ],
    { fontSize: 8.0, rowHeight: 24 },
  );
  c += t.commands;
  y = t.bottom - 32;

  c += textCommand("10. Order Acceptance", margin, y, 13, true, BLACK, "left");
  y -= 26;
  const acceptance =
    "By signing below, the client confirms acceptance of the Purchase Order, including the system specifications, scope of work, commercial terms, payment schedule and warranty/service conditions mentioned herein.";
  for (const line of wrapText(acceptance, 100)) {
    c += textCommand(line, margin, y, 8.3, false, BLACK, "left");
    y -= 11;
  }

  c += textCommand("Customer Signature", 58, 245, 8, true);
  c += textCommand("Authorized Signature", 424, 245, 8, true);
  c += textCommand(
    "OMEGA SOLAR POWER SYSTEMS | Malkajgiri, Secunderabad, Hyderabad, Telangana  500026",
    58,
    115,
    7.2,
    true,
  );
  c += textCommand(
    "Thank you for choosing Omega Solar Power Systems.",
    58,
    102,
    7.2,
  );

  c += pageFooter(3);
  return c;
}

export async function generatePurchaseOrderPdf(q: Quotation) {
  const watermarkResponse = await fetch("/omega-watermark.jpg");
  if (!watermarkResponse.ok)
    throw new Error("Omega Solar watermark asset could not be loaded.");
  const watermarkBytes = new Uint8Array(await watermarkResponse.arrayBuffer());
  const wmSize = parseJpegSize(watermarkBytes);
  const objects: (string | Uint8Array)[] = [
    "",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  const watermarkRef = objects.length + 1;
  objects.push(imageObject(watermarkBytes, wmSize.width, wmSize.height));
  const pages = [buildPage1(q), buildPage2(q), buildPage3(q)];
  const contentRefs: number[] = [];
  const pageRefs: number[] = [];
  for (let i = 0; i < pages.length; i++) {
    let content = pages[i];
    contentRefs.push(objects.length + 1);
    objects.push(contentObject(content));
  }
  for (let i = 0; i < contentRefs.length; i++) {
    const xobject = ` /XObject << /WM ${watermarkRef} 0 R >>`;
    pageRefs.push(objects.length + 1);
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W} ${A4_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >>${xobject} >> /Contents ${contentRefs[i]} 0 R >>`,
    );
  }
  objects[0] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[1] = `<< /Type /Pages /Count ${pageRefs.length} /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] >>`;
  return makePdf(objects);
}
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
