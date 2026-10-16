/**
 * Festival of Life 2026 — check-in Google Sheet
 *
 * Setup (5 minutes):
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this whole file, save.
 * 2. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, authorise.
 * 3. Copy the web-app URL (ends in /exec). In Vercel → festival-of-life → Settings → Environment Variables,
 *    add CHECKIN_SHEET_WEBHOOK = that URL, then redeploy.
 *
 * Each check-in is added as a row on the "Check-ins" tab: Date | Session | Name | Time (UTC).
 * When the Redis database is connected, Redis does the duplicate check and this sheet is a copy.
 * Without Redis, this script blocks duplicates itself (same name, same date, same session).
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('Check-ins') || ss.insertSheet('Check-ins');
    if (sh.getLastRow() === 0) sh.appendRow(['Date', 'Session', 'Name', 'Time (UTC)']);
    var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim().toLowerCase(); };
    if (d.dedupe && sh.getLastRow() > 1) {
      var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues();
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][0] === d.date && rows[i][1] === d.session && norm(rows[i][2]) === norm(d.name)) {
          return json({ ok: false, duplicate: true });
        }
      }
    }
    sh.appendRow([d.date, d.session, d.name, d.time]);
    sh.getRange(sh.getLastRow(), 1).setNumberFormat('@'); // keep the date as typed text
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
