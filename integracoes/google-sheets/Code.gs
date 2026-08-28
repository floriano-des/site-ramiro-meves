const SHEET_NAME = 'Leads';
const TIME_ZONE = 'America/Sao_Paulo';
const HEADERS = [
  'ID',
  'Criado em',
  'Atualizado em',
  'Status',
  'Nome',
  'WhatsApp',
  'Bairro',
  'Cidade',
  'E-mail',
  'Consentimento',
  'Versão do consentimento',
  'Origem',
  'Página',
  'Enviado pelo navegador em',
  'Dispositivo'
];

function doGet() {
  return jsonResponse({ ok: true, service: 'ramiro-leads' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const payload = parsePayload(event);

    if (payload.website) {
      return jsonResponse({ ok: true, ignored: true });
    }

    validatePayload(payload);

    const sheet = getLeadSheet();
    const existingRow = findLeadRow(sheet, payload.lead_id);
    const now = Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
    const currentCreatedAt = existingRow > 0 ? sheet.getRange(existingRow, 2).getDisplayValue() : now;
    const status = payload.etapa === 'concluido'
      ? 'Completo'
      : payload.etapa === 'parcial'
        ? 'Parcial'
        : 'Passo 1';

    const row = [
      safeCell(payload.lead_id, 100),
      currentCreatedAt,
      now,
      status,
      safeCell(payload.nome, 100),
      safeCell(normalizePhone(payload.whatsapp), 20),
      safeCell(payload.bairro, 100),
      safeCell(payload.cidade, 100),
      safeCell(payload.email, 160),
      payload.consentimento === 'sim' ? 'Sim' : 'Não',
      safeCell(payload.consent_version, 100),
      safeCell(payload.origem, 80),
      safeCell(payload.pagina, 500),
      safeCell(payload.enviado_em, 60),
      safeCell(payload.dispositivo, 500)
    ];

    if (existingRow > 0) {
      sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return jsonResponse({ ok: true, lead_id: payload.lead_id, status });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error.message || error) });
  } finally {
    lock.releaseLock();
  }
}

function parsePayload(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error('Requisição sem dados.');
  }

  try {
    return JSON.parse(event.postData.contents);
  } catch (error) {
    return event.parameter || {};
  }
}

function validatePayload(payload) {
  if (!payload.lead_id) throw new Error('ID do cadastro ausente.');
  if (!payload.nome) throw new Error('Nome ausente.');
  if (normalizePhone(payload.whatsapp).length < 10) throw new Error('WhatsApp inválido.');
  if (payload.consentimento !== 'sim') throw new Error('Consentimento obrigatório.');
}

function getLeadSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1E3038')
      .setFontColor('#FFFDF1');
  }

  return sheet;
}

function findLeadRow(sheet, leadId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const match = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(String(leadId))
    .matchEntireCell(true)
    .findNext();

  return match ? match.getRow() : 0;
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 13);
}

function safeCell(value, maxLength) {
  const text = String(value || '').trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
