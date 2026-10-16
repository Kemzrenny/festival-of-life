/**
 * Festival of Life 2026 — daily check-in Google Sheet
 *
 * Setup (5 minutes):
 * 1. Create a Google Sheet. Extensions → Apps Script. Delete what's there, paste this whole file, save.
 * 2. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy and authorise.
 * 3. Copy the web-app URL (ends in /exec). In Vercel → festival-of-life → Settings → Environment Variables,
 *    add CHECKIN_SHEET_WEBHOOK = that URL (all environments), then redeploy.
 *
 * Every check-in becomes a row on the "Check-ins" tab: Date | Session | Name | Time (UTC).
 * Duplicates are blocked: the same name (ignoring case and extra spaces) can check in once per session per day.
 * If you edit this script later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
 */
var TAB = 'Check-ins';

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Date', 'Session', 'Name', 'Time (UTC)']);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('@');
  }
  return sh;
}
function rows_(sh) {
  return sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues() : [];
}
function norm_(s) { return String(s).replace(/\s+/g, ' ').trim().toLowerCase(); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var sh = sheet_(), rows = rows_(sh), count = 0;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i][0] === d.date && rows[i][1] === d.session) {
        if (norm_(rows[i][2]) === norm_(d.name)) return json_({ ok: false, duplicate: true });
        count++;
      }
    }
    sh.appendRow([d.date, d.session, d.name, d.time]);
    return json_({ ok: true, count: count + 1 });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Today's totals for the check-in page: ?date=YYYY-MM-DD */
function doGet(e) {
  var date = (e && e.parameter && e.parameter.date) || '';
  var rows = rows_(sheet_()), m = 0, ev = 0;
  for (var i = 0; i < rows.length; i++) {
    if (rows[i][0] !== date) continue;
    if (rows[i][1].indexOf('Morning') === 0) m++; else if (rows[i][1].indexOf('Evening') === 0) ev++;
  }
  return json_({ date: date, morning: m, evening: ev });
}
