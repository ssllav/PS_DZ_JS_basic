// Конфигурация локальной нейросети
const LM_STUDIO_URL = "http://192.168.44.99:1234/v1/chat/completions";
const MODEL_NAME = "google/gemma-4b";

// DOM элементы ввода/вывода
const rawTextarea = document.getElementById('rawText');
const parseBtn = document.getElementById('parseBtn');
const fileInput = document.getElementById('templateFile');
const buildWordBtn = document.getElementById('buildWordBtn');

// Элементы таблицы буфера (стак полей)
const fields = {
    fullName: document.getElementById('field-fullName'),
    shortName: document.getElementById('field-shortName'),
    legalAddress: document.getElementById('field-legalAddress'),
    postalAddress: document.getElementById('field-postalAddress'),
    inn: document.getElementById('field-inn'),
    kpp: document.getElementById('field-kpp'),
    ogrn: document.getElementById('field-ogrn'),
    bankName: document.getElementById('field-bankName'),
    rs: document.getElementById('field-rs'),
    ks: document.getElementById('field-ks'),
    bik: document.getElementById('field-bik'),

    // НОВЫЕ ПОЛЯ:
    director: document.getElementById('field-director'),
    phone: document.getElementById('field-phone'),
    email: document.getElementById('field-email')
};

/**
 * ЭТАП 2 (Логический скальпель): Разбор ИНН/КПП, если ИИ прислал их одной строкой/через слэш
 * @param {string} rawValue - Сырая строка ИНН/КПП от ИИ
 * @returns {Object} {inn, kpp}
 */
function extractInnKppLogic(rawValue) {
    if (!rawValue) return { inn: '', kpp: '' };

    // Оставляем только цифры и слэш
    const clean = rawValue.replace(/[^0-9/]/g, ''); // "7725841234/772501001"

    // Мягко делим строку по символу слэша
    const parts = clean.split('/');

    // Если разделилось на две части
    if (parts.length >= 2) {
        return {
            inn: parts[0],
            kpp: parts[1]
        };
    }

    // Если слэша нет, но длина 10 или 12 знаков — это чистый ИНН
    if (clean.length === 10 || clean.length === 12) {
        return { inn: clean, kpp: '' };
    }

    // Во всех остальных случаях пишем всё в ИНН, пусть человек поправит в таблице
    return { inn: rawValue, kpp: '' };
}


/**
 * ЭТАП 1 (Лингвистический грейдер): Запрос к ИИ для грубой кластеризации хаоса в JSON
 * @param {string} text - Грязный текст от контрагента
 * @returns {Promise<Object>} Структурированный объект от ИИ
 */
async function queryAiToParseText(text) {
    // В промпте жестко требуем упаковать ИНН/КПП в одну сырую строку inn_kpp_raw, не заставляя ИИ гадать слэши
    /*const systemPrompt = `Ты — точный робот-секретарь. Извлеки реквизиты организации из текста. 
    Ответь СТРОГО в формате валидного JSON со следующими ключами:
    "fullName" (полное название), "shortName" (сокращенное), "legalAddress" (юр. адрес), "postalAddress" (почтовый),
    "inn_kpp_raw" (НАПИШИ СЮДА ИНН И КПП КАК ЕСТЬ В ТЕКСТЕ, НАПРИМЕР "7725841234/772501001" ИЛИ ПРОСТО ЦИФРЫ),
    "ogrn", "bankName", "rs" (расчетный счет), "ks" (корр. счет), "bik".
    Если какого-то поля нет в тексте, оставь значение пустой строкой "". Не пиши никаких пояснений, только чистый JSON.`;*/

    const systemPrompt = `Ты — точный робот-секретарь. Извлеки реквизиты организации из текста. 
    Ответь СТРОГО в формате валидного JSON со следующими ключами:
    "fullName", "shortName", "legalAddress", "postalAddress", "inn_kpp_raw", "ogrn", "bankName", "rs", "ks", "bik",
    "director" (ФИО руководителя директора/гендиректора), "phone" (номер телефона), "email" (электронная почта).
    Если какого-то поля нет в тексте, оставь значение пустой строкой "". Не пиши никаких пояснений, только чистый JSON.`;


    const response = await fetch(LM_STUDIO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Распарси этот текст:\n${text}` }
            ],
            temperature: 0.1
        })
    });

    if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);

    const result = await response.json();
    let aiResponseText = result.choices[0].message.content.trim();

    // Вычищаем маркдаун обертки, если они есть
    aiResponseText = aiResponseText.replace(/```json|```/g, '').trim();

    return JSON.parse(aiResponseText);
}

/**
 * ЭТАП 3 (Экспорт): Генерация Word файла на базе значений ИЗ ТАБЛИЦЫ
 */
/**
 * ЭТАП 3 (Экспорт): Генерация Word файла на базе значений ИЗ ТАБЛИЦЫ
 */
function buildWordDocument(fileContent, data) {
    // Безопасно вытаскиваем конструкторы из window
    const PizZipConstructor = window.PizZip?.default || window.PizZip;
    const DocxtemplaterConstructor = window.docxtemplater?.default || window.docxtemplater;

    if (!PizZipConstructor) throw new Error("Критическая ошибка: PizZip не обнаружен в window.");
    if (!DocxtemplaterConstructor) throw new Error("Критическая ошибка: docxtemplater не обнаружен в window.");

    // Создаем экземпляр PizZip из бинарника
    const zip = new PizZipConstructor(fileContent);

    // Инициализируем docxtemplater
    const doc = new DocxtemplaterConstructor(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '{{', end: '}}' },
        // Защита: если в таблице пусто, пишем прочерк в Word
        parser: (tag) => ({
            get: (scope) => (scope && scope[tag] !== undefined && scope[tag] !== '') ? scope[tag] : "___"
        })
    });

    // Накатываем данные из интерактивной таблицы
    doc.render(data);

    // Собираем итоговый файл в блоб
    const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Формируем ссылку и триггерим скачивание в браузере
    const url = window.URL.createObjectURL(out);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `Договор_${data.shortName || data.inn || 'Новый'}.docx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}


// ==========================================
// НАБЛЮДАТЕЛИ И ОБРАБОТЧИКИ СОБЫТИЙ (LISTENERS)
// ==========================================

// Обработка кнопки "Распознать ИИ"
parseBtn.addEventListener('click', async () => {
    const rawText = rawTextarea.value.trim();
    if (!rawText) return alert("Поле ввода пусто!");

    // Переводим кнопку в состояние загрузки по БЭМ
    parseBtn.disabled = true;
    parseBtn.classList.add('manager-panel__button--state-loading');
    parseBtn.innerText = "ИИ анализирует лингвистические поля...";

    try {
        // Шаг 1: Получаем грубый кластер данных от ИИ
        const aiJson = await queryAiToParseText(rawText);

        // Шаг 2: Пропускаем капризный блок ИНН/КПП через жесткий JS-фильтр регулярных выражений
        const cleanInnKpp = extractInnKppLogic(aiJson.inn_kpp_raw);

        // Шаг 3: Раскладываем данные в интерактивную HTML таблицу для проверки человеком
        fields.fullName.value = aiJson.fullName || '';
        fields.shortName.value = aiJson.shortName || '';
        fields.legalAddress.value = aiJson.legalAddress || '';
        fields.postalAddress.value = aiJson.postalAddress || '';
        fields.inn.value = cleanInnKpp.inn;
        fields.kpp.value = cleanInnKpp.kpp;
        fields.ogrn.value = aiJson.ogrn || '';
        fields.bankName.value = aiJson.bankName || '';
        fields.rs.value = aiJson.rs || '';
        fields.ks.value = aiJson.ks || '';
        fields.bik.value = aiJson.bik || '';
                // НОВЫЕ ПОЛЯ:
        fields.director.value = aiJson.director || '';
        fields.phone.value = aiJson.phone || '';
        fields.email.value = aiJson.email || '';

    } catch (error) {
        console.error("Критический сбой парсинга:", error);
        alert("Не удалось корректно разобрать JSON от ИИ. Проверьте консоль F12. Вы можете заполнить таблицу вручную.");
    } finally {
        // Возвращаем кнопку в исходное состояние
        parseBtn.disabled = false;
        parseBtn.classList.remove('manager-panel__button--state-loading');
        parseBtn.innerText = "Распознать ИИ";
    }
});

// Обработка кнопки "Сгенерировать и скачать документ Word"
buildWordBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) return alert("Пожалуйста, выберите файл Шаблон.docx на вашем диске!");

    // ВАЖНО: Мы полностью отвязались от ИИ на этапе сборки. 
    // Данные вытаскиваются НАПРЯМУЮ из инпутов таблицы, которые супруга уже проверила/отредактировала.
    const finalDataToExport = {
        fullName: fields.fullName.value.trim(),
        shortName: fields.shortName.value.trim(),
        legalAddress: fields.legalAddress.value.trim(),
        postalAddress: fields.postalAddress.value.trim(),
        inn: fields.inn.value.trim(),
        kpp: fields.kpp.value.trim(),
        ogrn: fields.ogrn.value.trim(),
        bankName: fields.bankName.value.trim(),
        rs: fields.rs.value.trim(),
        ks: fields.ks.value.trim(),
        bik: fields.bik.value.trim(),
                // НОВЫЕ ПОЛЯ ДЛЯ ШАБЛОНА WORD:
        director: fields.director.value.trim(),
        phone: fields.phone.value.trim(),
        email: fields.email.value.trim()
    };

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            buildWordDocument(e.target.result, finalDataToExport);
        } catch (err) {
            alert("Ошибка при записи переменных в Word. Проверьте синтаксис усов {{}} в шаблоне.");
            console.error("Сбой рендеринга DOCX:", err);
        }
    };
    reader.readAsArrayBuffer(file);
});
