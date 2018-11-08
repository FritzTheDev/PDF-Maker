const PDFDocument = require('pdfkit');
const fs = require('fs');

const dataTargets = JSON.parse(fs.readFileSync('reservoir-pdf-data.json'));
const doc = new PDFDocument({autoFirstPage: false});

// # Pipe its output somewhere, like to a file or HTTP response
// # See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

for (i in dataTargets) {
  doc.addPage()
  doc.image('assets/WSU-Page-Header.png', 0, 0, { width: 625, height: 75 });
  doc.fontSize(20).text(dataTargets[i].name, 85, 80, { align: 'center' });
  doc.fontSize(12).text(dataTargets[i].summary, 10, 105, { align: 'left', width: 595 });
  doc.image(dataTargets[i].mainPic, 80, 175, { width: 450 });
  doc.fontSize(6).text(`Reservoir Condition Graph from http://cdec.water.ca.gov/cgi-progs/products/${dataTargets[i].urlEnding}.pdf`, 80, 505, { align: 'center' });
  doc.fontSize(20).text('Inflows', 140, 520);
  doc.fontSize(20).text('Outflows', 420, 520);
  doc.image(dataTargets[i].inflow, 25, 545, { width: 280 });
  doc.image(dataTargets[i].outflow, 315, 545, { width: 280 });
}
// doc.image('assets/WSU-Page-Header.png', 0, 0, {width: 625, height: 75});
// doc.fontSize(20).text('Shasta Storage', 90, 80, {align: 'center'});
// doc.fontSize(12).text('As of August 12, 2018, storage was approximately 2,940,462AF (down 110,145 AF and at 65% of capacity, down 2% in capacity in the last week). The current level is 95% of the historical average. Total capacity of Shasta is about 4,552,000AF. Shasta’s weekly average inflows are about 5,392AF/day, and outflows are about 19,762AF/day as of Sunday', 10, 105, {align: 'left', width: 595});
// doc.image('assets/Shasta_Reservoir_Conditions.png', 80, 175, {width: 450});
// doc.fontSize(6).text('Reservoir Condition Graph from http://cdec.water.ca.gov/cgi-progs/products/shares.pdf', 80, 505, {align: 'center'});
// doc.fontSize(20).text('Inflows', 140, 520);
// doc.fontSize(20).text('Outflows', 420, 520);
// doc.image('assets/shainflow.png', 25, 545, {width: 280});
// doc.image('assets/shaoutflow.png', 315, 545, {width: 280});
doc.end();
// # Finalize PDF file
