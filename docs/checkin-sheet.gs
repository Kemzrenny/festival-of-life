/**
 * Festival of Life 2026 — daily check-in Google Sheet
 *
 * Setup (5 minutes):
 * 1. Create a Google Sheet. Extensions → Apps Script. Delete what's there, paste this whole file, save.
 * 2. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy and authorise.
 * 3. Copy the web-app URL (ends in /exec). In Vercel → festival-of-life → Settings → Environment Variables,
 *    add CHECKIN_SHEET_WEBHOOK = that URL (all environments), then redeploy.
 *
 * Every check-in becomes a row on the "Check-ins" tab: Date | Session | Name | Time (UTC) | Key.
 * Duplicates are blocked: the same name (ignoring case and extra spaces) can check in once per session per day.
 * The Key column is used for the fast duplicate check; you can hide it but don't delete it.
 * If you edit this script later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
 */
var TAB = 'Check-ins';
var SIX_HOURS = 21600;

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Date', 'Session', 'Name', 'Time (UTC)', 'Key']);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('@');
  }
  return sh;
}
function norm_(s) { return String(s).replace(/\s+/g, ' ').trim().toLowerCase(); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var key = d.date + '|' + d.session + '|' + norm_(d.name);
  var cache = CacheService.getScriptCache();
  if (cache.get(key)) return json_({ ok: false, duplicate: true }); // fast path, no sheet read

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'busy' });
  try {
    var sh = sheet_();
    var found = sh.getLastRow() > 1 && sh.getRange(2, 5, sh.getLastRow() - 1, 1)
      .createTextFinder(key).matchEntireCell(true).matchCase(true).findNext();
    if (found) { cache.put(key, '1', SIX_HOURS); return json_({ ok: false, duplicate: true }); }
    sh.appendRow([d.date, d.session, d.name, d.time, key]);
    cache.put(key, '1', SIX_HOURS);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Warm-up ping: the check-in page calls this when it opens so the first check-in isn't slow. */
function doGet() { return json_({ ok: true }); }
