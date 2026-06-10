const storeKey = "oficiopro-ia-mvp-v1";

const defaultState = {
  selectedView: "trabajo",
  selectedClientId: "cli-hogar",
  selectedOrderId: "ord-hogar",
  selectedPointId: "pto-hogar-ap",
  selectedTaskId: "task-hogar-inicio",
  clients: [
    {
      id: "cli-hogar",
      nombre: "Hogar San Jose",
      telefono: "",
      direccion: "Hogar San Jose",
      latitud: "",
      longitud: "",
      tipo_cliente: "empresa",
      observaciones: "Instalacion WiFi real con TP-Link Omada EAP245.",
      created_at: nowIso(),
      updated_at: nowIso()
    },
    {
      id: "cli-demo",
      nombre: "Campo La Esperanza",
      telefono: "+54 9 11 5555-0188",
      direccion: "Ruta rural 8, galpon principal",
      latitud: "",
      longitud: "",
      tipo_cliente: "campo",
      observaciones: "Acceso con tranquera. Confirmar senal 4G en el galpon.",
      created_at: nowIso(),
      updated_at: nowIso()
    }
  ],
  orders: [
    {
      id: "ord-hogar",
      numero: "OT-WIFI-0001",
      cliente_id: "cli-hogar",
      tecnico: "Martin",
      fecha_programada: "2026-06-08",
      tipo_trabajo: "Instalacion WiFi",
      descripcion: "Instalacion y configuracion de red WiFi en Hogar San Jose con AP TP-Link Omada EAP245.",
      estado: "en curso",
      fecha_inicio: "2026-06-08T09:30:00-03:00",
      fecha_fin: "",
      latitud_inicio: "",
      longitud_inicio: "",
      latitud_fin: "",
      longitud_fin: "",
      created_at: nowIso(),
      updated_at: nowIso()
    },
    {
      id: "ord-demo",
      numero: "OT-0001",
      cliente_id: "cli-demo",
      tecnico: "Martin",
      fecha_programada: today(),
      tipo_trabajo: "Instalacion de camaras IP",
      descripcion: "Instalacion de camaras IP en galpon rural con NVR y router 4G.",
      estado: "pendiente",
      fecha_inicio: "",
      fecha_fin: "",
      latitud_inicio: "",
      longitud_inicio: "",
      latitud_fin: "",
      longitud_fin: "",
      created_at: nowIso(),
      updated_at: nowIso()
    }
  ],
  steps: [
    step("ord-hogar", 1, "Inicio y revision de equipamiento", "Revisar AP TP-Link EAP245, alimentacion, router y acceso a Omada Controller.", true),
    step("ord-hogar", 2, "Reset y deteccion del AP", "Resetear el AP, verificar LED verde y conectarlo por cable al router.", true),
    step("ord-hogar", 3, "Adopcion en Omada", "Adoptar el AP en Omada y confirmar estado conectado.", true),
    step("ord-hogar", 4, "Configuracion WiFi", "Configurar SSID HogarSanJose y clave final registrada como dato sensible.", false),
    step("ord-hogar", 5, "Prueba y cierre", "Verificar navegacion, estado final operativo e informar al cliente.", true),
    step("ord-demo", 1, "Relevar conectividad y energia", "Verificar senal 4G, alimentacion y puntos de montaje.", true),
    step("ord-demo", 2, "Instalar camara 1", "Montar, orientar, cablear y probar la camara del acceso.", true),
    step("ord-demo", 3, "Instalar camara 2", "Montar, orientar, cablear y probar la camara del interior del galpon.", true),
    step("ord-demo", 4, "Configurar NVR y router 4G", "Registrar camaras, almacenamiento y acceso remoto.", false),
    step("ord-demo", 5, "Pruebas finales y conformidad", "Validar visualizacion local, remota y explicar uso al cliente.", true)
  ],
  sitePoints: [
    sitePoint("pto-hogar-ap", "ord-hogar", 1, "equipo", "AP TP-Link EAP245", "Ubicacion del AP adoptado por Omada y conectado al router.", true),
    sitePoint("pto-hogar-router", "ord-hogar", 2, "conectividad", "Router principal", "Conexion cableada entre AP y router para adopcion y funcionamiento.", true),
    sitePoint("pto-hogar-omada", "ord-hogar", 3, "prueba", "Omada Controller", "Pantalla de adopcion y estado conectado del AP.", true),
    sitePoint("pto-hogar-wifi", "ord-hogar", 4, "prueba", "SSID HogarSanJose", "Prueba final de red WiFi configurada.", true),
    sitePoint("pto-cam-1", "ord-demo", 1, "camara", "Camara acceso galpon", "Ubicacion sugerida para controlar entrada principal y porton.", true),
    sitePoint("pto-cam-2", "ord-demo", 2, "camara", "Camara interior galpon", "Ubicacion sugerida para cubrir zona de herramientas y tablero.", true),
    sitePoint("pto-cable-1", "ord-demo", 3, "recorrido_cable", "Recorrido cable UTP exterior", "Registrar por donde pasa el cable, fijaciones, cruces y protecciones.", true),
    sitePoint("pto-nvr-1", "ord-demo", 4, "equipo", "NVR y router 4G", "Punto de instalacion de equipos, alimentacion y senal 4G.", true)
  ],
  workflowItems: [
    workflowItem("ord-hogar", "inicio", "Inicio de tareas", "Revisar equipamiento TP-Link EAP245, router, cableado y acceso al controlador Omada."),
    workflowItem("ord-hogar", "equipamiento", "Reset del AP", "Resetear el equipo, verificar LED verde y preparar adopcion."),
    workflowItem("ord-hogar", "configuracion", "Adopcion en Omada", "Conectar AP por cable al router y adoptarlo en Omada Controller."),
    workflowItem("ord-hogar", "configuracion", "Configurar red WiFi", "Configurar SSID HogarSanJose y clave final registrada como dato sensible."),
    workflowItem("ord-hogar", "prueba", "Prueba final", "Verificar WiFi operativo, internet funcionando y AP conectado."),
    workflowItem("ord-hogar", "cierre", "Cierre del trabajo", "Registrar estado final, problemas resueltos e informe para empresa."),
    workflowItem("ord-demo", "preparacion", "Confirmar alcance con el cliente", "Validar cantidad de camaras, zonas a cubrir, acceso a energia, internet y ubicacion de equipos."),
    workflowItem("ord-demo", "materiales", "Preparar materiales sugeridos", "Cable UTP exterior, fichas RJ45, soportes, cajas estancas, grampas, NVR, router 4G y fuente/PoE."),
    workflowItem("ord-demo", "evidencias", "Registrar evidencias obligatorias", "Foto de cada ubicacion de camara, recorrido de cable, NVR/router, energia y prueba final."),
    workflowItem("ord-demo", "riesgos", "Revisar riesgos del sitio", "Senal 4G baja, cable expuesto al clima, falta de energia estable, puntos ciegos o mala vision nocturna."),
    workflowItem("ord-demo", "pruebas", "Ejecutar pruebas finales", "Visualizacion local, visualizacion remota, grabacion, reinicio de router/NVR y app del cliente."),
    workflowItem("ord-demo", "cierre", "Cerrar con el cliente", "Explicar uso, recomendaciones, conformidad y generar informe/presupuesto si corresponde.")
  ],
  events: [],
  evidence: [],
  taskLogs: [
    taskLog("task-hogar-inicio", "ord-hogar", "09:30", "Inicio de tareas", "Revision de equipamiento TP-Link EAP245, router y acceso al controlador.", "Inicio"),
    taskLog("task-hogar-omada", "ord-hogar", "09:45", "Configuracion de Omada Controller", "Instalacion/acceso al controlador Omada para gestionar el AP.", "Configuracion"),
    taskLog("task-hogar-reset", "ord-hogar", "10:15", "Reset y deteccion del AP", "Se realiza reset del TP-Link EAP245 y se verifica LED verde.", "Equipamiento"),
    taskLog("task-hogar-adopcion", "ord-hogar", "10:45", "Adopcion del AP", "El AP fue detectado y adoptado correctamente en Omada.", "Configuracion"),
    taskLog("task-hogar-wifi", "ord-hogar", "11:30", "Configuracion WiFi", "SSID HogarSanJose configurado para la red del Hogar San Jose.", "Configuracion"),
    taskLog("task-hogar-clave", "ord-hogar", "12:00", "Cambio de clave WiFi", "Clave final configurada y guardada como dato sensible.", "Configuracion"),
    taskLog("task-hogar-cierre", "ord-hogar", "12:40", "Cierre", "WiFi operativo e Internet funcionando.", "Cierre")
  ],
  resolvedProblems: [
    resolvedProblem("ord-hogar", "AP aparecia desconectado", "El AP no estaba conectado por cable al router.", "Se conecto el AP al router por cable.", "Omada lo mostro como conectado."),
    resolvedProblem("ord-hogar", "AP no detectado", "El equipo necesitaba reset y adopcion desde Omada.", "Se reseteo el TP-Link EAP245 y se inicio adopcion.", "El AP quedo adoptado."),
    resolvedProblem("ord-hogar", "Error de acceso directo al AP", "El AP quedo administrado por Omada.", "Se gestiono la configuracion desde Omada Controller.", "Configuracion centralizada correcta."),
    resolvedProblem("ord-hogar", "Contrasena WiFi a corregir", "La clave final solicitada debia actualizarse.", "Se configuro la clave final y se marco como dato sensible.", "SSID HogarSanJose operativo.")
  ],
  technicalData: [
    technicalRecord("ord-hogar", "Access Point", "TP-Link", "EAP245", "AP-HOGARSANJOSE-01", "192.168.0.17", "admin", "Javier@1357", "HogarSanJose", "julian1901", "AP adoptado por Omada y conectado por cable al router.")
  ],
  materials: [],
  budgetItems: [],
  budgetNotes: "Presupuesto sujeto a disponibilidad de materiales y condiciones finales del sitio.",
  voiceReplyMode: "headset",
  visionEndpoint: "",
  visionApiKey: "",
  visionMode: "local",
  companyReportDraft: "",
  fullTechnicalReportDraft: "",
  checklist: [
    check("ord-demo", "internet verificado"),
    check("ord-demo", "energia verificada"),
    check("ord-demo", "ubicacion de camaras definida"),
    check("ord-demo", "camaras instaladas"),
    check("ord-demo", "NVR/DVR configurado"),
    check("ord-demo", "visualizacion local probada"),
    check("ord-demo", "visualizacion remota probada"),
    check("ord-demo", "fotos finales cargadas"),
    check("ord-demo", "materiales usados cargados"),
    check("ord-demo", "cliente informado"),
    check("ord-demo", "conformidad del cliente")
  ],
  selectedEvidenceId: "",
  reportDraft: ""
};

let state = loadState();
ensureSeedData();
let recognition = null;
let listening = false;
let handsFree = false;
let voiceStatus = "Toca Manos libres o Escuchar una vez.";
let assistantDialog = { active: false, intent: "", step: "", data: {}, question: "" };
let headsetLikely = false;
let suppressSpeech = false;
let pendingPhotoPointId = "";
let pendingPhotoTaskId = "";
let tickTimer = null;

function nowIso() {
  return new Date().toISOString();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function step(orderId, numero, titulo, descripcion, requiereFoto) {
  return {
    id: uid("paso"),
    orden_id: orderId,
    numero,
    titulo,
    descripcion,
    estado: "pendiente",
    requiere_foto: requiereFoto,
    completed_at: ""
  };
}

function check(orderId, descripcion) {
  return {
    id: uid("chk"),
    orden_id: orderId,
    descripcion,
    estado: "pendiente",
    obligatorio: true,
    completed_at: ""
  };
}

function workflowItem(orderId, categoria, titulo, detalle) {
  return {
    id: uid("flujo"),
    orden_id: orderId,
    categoria,
    titulo,
    detalle,
    estado: "pendiente",
    created_at: nowIso(),
    completed_at: ""
  };
}

function taskLog(id, orderId, hora, titulo, descripcion, categoria) {
  const date = orderId === "ord-hogar" ? `2026-06-08T${hora}:00-03:00` : nowIso();
  return {
    id,
    orden_id: orderId,
    hora,
    titulo,
    descripcion,
    categoria,
    photo_ids: [],
    created_at: date
  };
}

function resolvedProblem(orderId, problema, causa, solucion, resultado) {
  return {
    id: uid("prob"),
    orden_id: orderId,
    problema,
    causa,
    solucion,
    resultado,
    created_at: nowIso()
  };
}

function technicalRecord(orderId, equipo, marca, modelo, nombre_asignado, ip, usuario, contrasena, ssid, clave_wifi, observaciones) {
  return {
    id: uid("tec"),
    orden_id: orderId,
    equipo,
    marca,
    modelo,
    nombre_asignado,
    ip,
    usuario,
    contrasena,
    ssid,
    clave_wifi,
    observaciones,
    sensitive: true,
    showSecrets: false,
    created_at: nowIso(),
    updated_at: nowIso()
  };
}

function sitePoint(id, orderId, numero, tipo, nombre, descripcion, obligatorio = true) {
  return {
    id,
    orden_id: orderId,
    numero,
    tipo,
    nombre,
    descripcion,
    estado: "pendiente",
    obligatorio,
    latitud: "",
    longitud: "",
    observacion: "",
    created_at: nowIso(),
    updated_at: nowIso(),
    completed_at: ""
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey));
    return saved ? { ...defaultState, ...saved } : defaultState;
  } catch {
    return defaultState;
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function mergeById(collectionName, records) {
  state[collectionName] = state[collectionName] || [];
  records.forEach((record) => {
    if (!state[collectionName].some((item) => item.id === record.id)) {
      state[collectionName].push(record);
    }
  });
}

function ensureSeedData() {
  mergeById("clients", defaultState.clients);
  mergeById("orders", defaultState.orders);
  mergeById("steps", defaultState.steps);
  mergeById("sitePoints", defaultState.sitePoints);
  mergeById("workflowItems", defaultState.workflowItems);
  mergeById("taskLogs", defaultState.taskLogs);
  mergeById("resolvedProblems", defaultState.resolvedProblems);
  mergeById("technicalData", defaultState.technicalData);
  state.evidence = state.evidence || [];
  state.evidence.forEach((item) => {
    item.equipo_tipo = item.equipo_tipo || inferDeviceType(item.descripcion || "");
    item.contexto_imagen = item.contexto_imagen || inferImageContext(item.descripcion || "");
    item.scan_estado = item.scan_estado || "pendiente";
    item.lectura_ocr = item.lectura_ocr || "";
    item.ip_detectada = item.ip_detectada || "";
    item.mac_serie = item.mac_serie || "";
    item.puerto_conexion = item.puerto_conexion || "";
    item.respuesta_equipo = item.respuesta_equipo || "";
    item.conclusion_tecnica = item.conclusion_tecnica || "";
    item.ai_extract_json = item.ai_extract_json || "";
    item.ai_categoria = item.ai_categoria || "";
    item.ai_titulo = item.ai_titulo || "";
    item.ai_descripcion = item.ai_descripcion || "";
    item.ai_estado_equipo = item.ai_estado_equipo || "";
    item.ai_confianza = item.ai_confianza || "";
  });
  state.materials = state.materials || [];
  state.budgetItems = state.budgetItems || [];
  state.visionEndpoint = "";
  state.visionApiKey = "";
  state.visionMode = "local";
  state.companyReportDraft = state.companyReportDraft || "";
  state.fullTechnicalReportDraft = state.fullTechnicalReportDraft || "";
  if (state.lastMigrationVersion !== 35) {
    state.selectedOrderId = "ord-hogar";
    state.selectedClientId = "cli-hogar";
    state.selectedPointId = "pto-hogar-ap";
    state.selectedTaskId = "task-hogar-inicio";
    state.companyReportDraft = "";
    state.fullTechnicalReportDraft = "";
    const wifiStep = state.steps.find((item) => item.id === "step-ord-hogar-4");
    if (wifiStep) wifiStep.descripcion = "Configurar SSID HogarSanJose y clave final registrada como dato sensible.";
    const wifiWorkflow = state.workflowItems.find((item) => item.id === "wf-ord-hogar-configurar-red-wifi");
    if (wifiWorkflow) wifiWorkflow.detalle = "Configurar SSID HogarSanJose y clave final registrada como dato sensible.";
    const keyTask = state.taskLogs.find((item) => item.id === "task-hogar-clave");
    if (keyTask) keyTask.descripcion = "Clave final configurada y guardada como dato sensible.";
    const keyProblem = state.resolvedProblems.find((item) => item.problema === "Contrasena WiFi a corregir" && item.order_id === "ord-hogar");
    if (keyProblem) keyProblem.solucion = "Se configuro la clave final y se marco como dato sensible.";
    state.steps
      .filter((item) => item.order_id === "ord-hogar" && item.descripcion?.includes("julian1901"))
      .forEach((item) => { item.descripcion = item.descripcion.replace("julian1901", "registrada como dato sensible"); });
    state.workflowItems
      .filter((item) => item.order_id === "ord-hogar" && item.detalle?.includes("julian1901"))
      .forEach((item) => { item.detalle = item.detalle.replace("julian1901", "registrada como dato sensible"); });
    state.taskLogs
      .filter((item) => item.order_id === "ord-hogar" && item.descripcion?.includes("julian1901"))
      .forEach((item) => { item.descripcion = item.descripcion.replace("julian1901", "registrada como dato sensible"); });
    state.resolvedProblems
      .filter((item) => item.order_id === "ord-hogar" && item.solucion?.includes("julian1901"))
      .forEach((item) => { item.solucion = item.solucion.replace("julian1901", "registrada como dato sensible"); });
    if (["inicio", "clientes", "cierre", "presupuesto"].includes(state.selectedView)) {
      state.selectedView = "trabajo";
    }
    state.lastMigrationVersion = 35;
  }
  if (!state.selectedOrderId || !state.orders.some((item) => item.id === state.selectedOrderId)) {
    state.selectedOrderId = "ord-hogar";
    state.selectedClientId = "cli-hogar";
  }
  saveState();
}

function setView(view) {
  state.selectedView = view;
  saveState();
  render();
}

function goToView(view, spokenText) {
  setView(view);
  if (spokenText) speak(spokenText);
}

function selectClient(clientId) {
  const found = state.clients.find((item) => item.id === clientId);
  if (!found) return;
  state.selectedClientId = found.id;
  voiceStatus = `Cliente seleccionado: ${found.nombre}`;
  saveState();
  render();
}

function selectOrder(orderId) {
  const found = state.orders.find((item) => item.id === orderId);
  if (!found) return;
  state.selectedOrderId = found.id;
  state.selectedClientId = found.cliente_id;
  state.selectedPointId = orderSitePoints(found.id)[0]?.id || "";
  voiceStatus = `Orden seleccionada: ${found.numero}`;
  saveState();
  render();
}

function selectSitePoint(pointId, targetView = "") {
  const found = (state.sitePoints || []).find((item) => item.id === pointId);
  if (!found) return;
  state.selectedPointId = found.id;
  voiceStatus = `Seleccionado manualmente. Punto activo: ${found.nombre}`;
  saveState();
  if (targetView) {
    setView(targetView);
  } else {
    render();
  }
}

function requestPointPhoto(pointId) {
  const found = (state.sitePoints || []).find((item) => item.id === pointId);
  if (!found) return;
  state.selectedPointId = found.id;
  pendingPhotoPointId = found.id;
  voiceStatus = `Foto para punto: ${found.nombre}`;
  saveState();
  const input = document.querySelector("#photoInputGlobal") || document.querySelector("#photoInput");
  if (input) {
    input.value = "";
    input.click();
  } else {
    render();
  }
}

function requestTaskPhoto(taskId) {
  const task = (state.taskLogs || []).find((item) => item.id === taskId);
  if (!task) return;
  pendingPhotoTaskId = task.id;
  voiceStatus = `Foto para tarea: ${task.titulo}`;
  saveState();
  const input = document.querySelector("#photoInputGlobal") || document.querySelector("#photoInput");
  if (input) {
    input.value = "";
    input.click();
  } else {
    render();
  }
}

function addTaskLogFromForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const id = uid("task");
  const created = nowIso();
  state.taskLogs = state.taskLogs || [];
  state.taskLogs.push({
    id,
    orden_id: order().id,
    hora: data.hora || new Date().toTimeString().slice(0, 5),
    titulo: data.titulo || "Tarea registrada",
    descripcion: data.descripcion || "",
    categoria: data.categoria || "Configuracion",
    photo_ids: [],
    created_at: created
  });
  state.selectedTaskId = id;
  addEvent("comentario", `${data.titulo}: ${data.descripcion}`);
  saveState();
  form.reset();
  render();
}

function addResolvedProblemFromForm(form) {
  const data = Object.fromEntries(new FormData(form));
  state.resolvedProblems = state.resolvedProblems || [];
  state.resolvedProblems.push(resolvedProblem(order().id, data.problema, data.causa, data.solucion, data.resultado));
  addEvent("solucion", `Problema resuelto: ${data.problema}. Resultado: ${data.resultado}`);
  saveState();
  form.reset();
  render();
}

function saveTechnicalData(form) {
  const data = Object.fromEntries(new FormData(form));
  state.technicalData = state.technicalData || [];
  const existing = state.technicalData.find((item) => item.id === data.id);
  const payload = {
    orden_id: order().id,
    equipo: data.equipo || "",
    marca: data.marca || "",
    modelo: data.modelo || "",
    nombre_asignado: data.nombre_asignado || "",
    ip: data.ip || "",
    usuario: data.usuario || "",
    contrasena: data.contrasena || "",
    ssid: data.ssid || "",
    clave_wifi: data.clave_wifi || "",
    observaciones: data.observaciones || "",
    sensitive: true,
    updated_at: nowIso()
  };
  if (existing) {
    Object.assign(existing, payload);
  } else {
    state.technicalData.push({ ...payload, id: uid("tec"), showSecrets: false, created_at: nowIso() });
  }
  saveState();
  form.reset();
  render();
}

function toggleTechnicalSecrets(id) {
  const item = (state.technicalData || []).find((entry) => entry.id === id);
  if (!item) return;
  item.showSecrets = !item.showSecrets;
  saveState();
  render();
}

function inferDeviceType(text) {
  const value = normalizeCommand(text || "");
  if (value.includes("router")) return "router";
  if (value.includes("dvr")) return "dvr";
  if (value.includes("nvr")) return "nvr";
  if (value.includes("camara") || value.includes("camera")) return "camara";
  if (value.includes("ap") || value.includes("access point") || value.includes("omada") || value.includes("eap")) return "access point";
  if (value.includes("switch")) return "switch";
  return "equipo";
}

function inferImageContext(text) {
  const value = normalizeCommand(text || "");
  if (value.includes("error") || value.includes("falla") || value.includes("desconectado")) return "error de sistema";
  if (value.includes("prueba") || value.includes("test") || value.includes("ping")) return "prueba de conexion";
  if (value.includes("gabinete") || value.includes("rack") || value.includes("tablero")) return "gabinete tecnico";
  if (value.includes("router")) return "router";
  if (value.includes("ap") || value.includes("omada") || value.includes("eap")) return "ap";
  if (value.includes("dvr") || value.includes("nvr")) return "dvr/nvr";
  return "pantalla de configuracion";
}

function extractFirstIp(text) {
  return String(text || "").match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/)?.[0] || "";
}

function extractStatus(text) {
  const value = normalizeCommand(text || "");
  if (value.includes("conectado") || value.includes("connected") || value.includes("adoptado") || value.includes("online")) return "Conectado";
  if (value.includes("desconectado") || value.includes("offline") || value.includes("error") || value.includes("fail")) return "Problema detectado";
  if (value.includes("ok") || value.includes("success") || value.includes("funcionando")) return "Operativo";
  return "";
}

function categoryFromTechnicalText(text, context = "") {
  const value = normalizeCommand(`${context} ${text}`);
  if (value.includes("error") || value.includes("desconectado") || value.includes("offline") || value.includes("falla")) return "Problema detectado";
  if (value.includes("solucion") || value.includes("corregido") || value.includes("resuelto")) return "Solucion aplicada";
  if (value.includes("ping") || value.includes("test") || value.includes("prueba") || value.includes("ok")) return "Prueba";
  if (value.includes("ssid") || value.includes("omada") || value.includes("adoptado") || value.includes("ip") || value.includes("config")) return "Configuracion";
  return "Equipamiento";
}

function localVisionFallback(item, visibleText) {
  const combined = [
    item.descripcion,
    item.contexto_imagen,
    item.equipo_tipo,
    visibleText,
    item.lectura_ocr,
    item.respuesta_equipo
  ].filter(Boolean).join("\n");
  const device = item.equipo_tipo || inferDeviceType(combined);
  const category = categoryFromTechnicalText(combined, item.contexto_imagen);
  const ip = item.ip_detectada || extractFirstIp(combined);
  const status = item.ai_estado_equipo || item.respuesta_equipo || extractStatus(combined);
  const isOmadaAp = normalizeCommand(combined).includes("omada") || normalizeCommand(combined).includes("eap");
  const title = category === "Problema detectado"
    ? `${device.toUpperCase()} con problema detectado`
    : isOmadaAp && status === "Conectado"
    ? "AP adoptado correctamente"
    : `${device.toUpperCase()} verificado`;
  const description = isOmadaAp
    ? `El AP TP-Link EAP245 fue detectado y documentado en el flujo tecnico.${status ? ` Estado: ${status}.` : ""}${ip ? ` IP: ${ip}.` : ""}`
    : `Se registra evidencia tecnica de ${device}.${status ? ` Estado/respuesta: ${status}.` : ""}${ip ? ` IP detectada: ${ip}.` : ""}`;
  return {
    schema: "oficiopro.image_extract.v1",
    fuente: "fallback-local",
    contexto_imagen: item.contexto_imagen || inferImageContext(combined),
    categoria: category,
    titulo_tarea: title,
    descripcion_tecnica: description,
    equipo_tipo: device,
    equipo_nombre: item.descripcion || "",
    ip,
    estado: status,
    texto_visible: visibleText || item.lectura_ocr || "",
    datos: {
      mac_serie: item.mac_serie || "",
      puerto_conexion: item.puerto_conexion || "",
      punto_trabajo_id: item.punto_id || "",
      tarea_id: item.task_id || ""
    },
    recomendacion: category === "Problema detectado"
      ? "Registrar causa, aplicar solucion y repetir prueba de conexion."
      : "Guardar evidencia y asociarla al informe tecnico.",
    confianza: visibleText || item.lectura_ocr ? 0.72 : 0.48
  };
}

async function detectVisibleTextFromImage(item) {
  if (!("TextDetector" in window)) return item.lectura_ocr || "";
  try {
    const image = new Image();
    image.src = item.url_archivo;
    await image.decode();
    const detector = new TextDetector();
    const detections = await detector.detect(image);
    return detections.map((entry) => entry.rawValue).filter(Boolean).join("\n");
  } catch {
    return item.lectura_ocr || "";
  }
}

function selectEvidenceForScan(id) {
  const item = (state.evidence || []).find((entry) => entry.id === id);
  if (!item) return;
  item.equipo_tipo = item.equipo_tipo || inferDeviceType(item.descripcion);
  state.selectedEvidenceId = id;
  saveState();
  render();
}

function saveEvidenceScan(form) {
  const data = Object.fromEntries(new FormData(form));
  const item = (state.evidence || []).find((entry) => entry.id === data.id);
  if (!item) return;
  Object.assign(item, {
    equipo_tipo: data.equipo_tipo || inferDeviceType(item.descripcion),
    contexto_imagen: data.contexto_imagen || inferImageContext(item.descripcion),
    lectura_ocr: data.lectura_ocr || "",
    ip_detectada: data.ip_detectada || "",
    mac_serie: data.mac_serie || "",
    puerto_conexion: data.puerto_conexion || "",
    respuesta_equipo: data.respuesta_equipo || "",
    conclusion_tecnica: data.conclusion_tecnica || "",
    scan_estado: "registrado",
    updated_at: nowIso()
  });
  addEvent("prueba", `Lectura tecnica registrada: ${item.equipo_tipo} ${item.ip_detectada || ""} ${item.respuesta_equipo || ""}`.trim());
  saveState();
  render();
}

function saveVisionConfig(form) {
  state.visionEndpoint = "";
  state.visionApiKey = "";
  state.visionMode = "local";
  voiceStatus = "Analisis local gratis activado.";
  saveState();
  render();
}

async function callVisionEndpoint(payload) {
  return null;
}

async function analyzeEvidenceWithAI(id) {
  const item = (state.evidence || []).find((entry) => entry.id === id);
  if (!item) return;
  state.selectedEvidenceId = id;
  item.scan_estado = "analizando ia";
  saveState();
  render();

  const visibleText = item.lectura_ocr || await detectVisibleTextFromImage(item);
  const payload = {
    image_data_url: item.url_archivo,
    visible_text: visibleText,
    context: item.contexto_imagen || inferImageContext(item.descripcion),
    work: {
      client: client().nombre,
      order: order().numero,
      job_type: order().tipo_trabajo,
      description: order().descripcion
    },
    expected_json_schema: {
      categoria: "Inicio | Equipamiento | Configuracion | Problema detectado | Solucion aplicada | Prueba | Cierre",
      titulo_tarea: "string",
      descripcion_tecnica: "string",
      equipo_tipo: "router | ap | dvr | nvr | camara | gabinete | pantalla | switch | equipo",
      equipo_nombre: "string",
      ip: "string",
      estado: "string",
      texto_visible: "string",
      datos: "object",
      recomendacion: "string",
      confianza: "number"
    }
  };

  const result = localVisionFallback(item, visibleText);

  item.lectura_ocr = visibleText || item.lectura_ocr || "";
  item.contexto_imagen = result.contexto_imagen || item.contexto_imagen || "";
  item.equipo_tipo = result.equipo_tipo || item.equipo_tipo || "";
  item.ip_detectada = result.ip || item.ip_detectada || "";
  item.respuesta_equipo = result.estado || item.respuesta_equipo || "";
  item.conclusion_tecnica = result.descripcion_tecnica || item.conclusion_tecnica || "";
  item.ai_categoria = result.categoria || "";
  item.ai_titulo = result.titulo_tarea || "";
  item.ai_descripcion = result.descripcion_tecnica || "";
  item.ai_estado_equipo = result.estado || "";
  item.ai_confianza = String(result.confianza ?? "");
  item.ai_extract_json = JSON.stringify(result, null, 2);
  item.scan_estado = "ia estructurada";
  item.updated_at = nowIso();
  await addEvent("prueba", `Extraccion IA: ${item.ai_titulo || item.descripcion}`);
  saveState();
  render();
}

function saveExtractionAsTask(id) {
  const item = (state.evidence || []).find((entry) => entry.id === id);
  if (!item) return;
  const taskId = uid("task");
  const category = item.ai_categoria || categoryFromTechnicalText(`${item.lectura_ocr} ${item.respuesta_equipo}`, item.contexto_imagen);
  state.taskLogs = state.taskLogs || [];
  state.taskLogs.push({
    id: taskId,
    orden_id: order().id,
    hora: new Date().toTimeString().slice(0, 5),
    titulo: item.ai_titulo || "Extraccion tecnica desde imagen",
    descripcion: item.ai_descripcion || item.conclusion_tecnica || item.respuesta_equipo || item.descripcion,
    categoria: category,
    photo_ids: [item.id],
    created_at: nowIso()
  });
  item.task_id = taskId;
  state.selectedTaskId = taskId;
  addEvent("comentario", `Tarea creada desde imagen: ${item.ai_titulo || item.descripcion}`);
  saveState();
  render();
}

async function runNativeOcr(id) {
  const item = (state.evidence || []).find((entry) => entry.id === id);
  if (!item) return;
  state.selectedEvidenceId = id;
  if (!("TextDetector" in window)) {
    item.scan_estado = "sin ocr nativo";
    voiceStatus = "Este navegador no trae OCR nativo. Carga la lectura manual en la foto.";
    saveState();
    render();
    return;
  }
  try {
    const image = new Image();
    image.src = item.url_archivo;
    await image.decode();
    const detector = new TextDetector();
    const detections = await detector.detect(image);
    item.lectura_ocr = detections.map((entry) => entry.rawValue).filter(Boolean).join("\n");
    item.scan_estado = item.lectura_ocr ? "ocr detectado" : "ocr sin texto";
    voiceStatus = item.lectura_ocr ? "OCR detectado en la foto." : "OCR no encontro texto legible.";
  } catch (error) {
    item.scan_estado = "error ocr";
    voiceStatus = "No pude leer OCR en esta foto. Carga la lectura manual.";
  }
  saveState();
  render();
}

function client() {
  return state.clients.find((item) => item.id === state.selectedClientId) || state.clients[0];
}

function selectedClient() {
  return state.clients.find((item) => item.id === state.selectedClientId) || null;
}

function order() {
  return state.orders.find((item) => item.id === state.selectedOrderId) || state.orders[0];
}

function orderSteps(orderId = order().id) {
  return state.steps.filter((item) => item.orden_id === orderId).sort((a, b) => a.numero - b.numero);
}

function orderEvents(orderId = order().id) {
  return state.events.filter((item) => item.orden_id === orderId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function orderMaterials(orderId = order().id) {
  return state.materials.filter((item) => item.orden_id === orderId);
}

function orderBudgetItems(orderId = order().id) {
  return (state.budgetItems || []).filter((item) => item.orden_id === orderId);
}

function orderChecklist(orderId = order().id) {
  return state.checklist.filter((item) => item.orden_id === orderId);
}

function orderWorkflow(orderId = order().id) {
  return (state.workflowItems || []).filter((item) => item.orden_id === orderId);
}

function orderTaskLogs(orderId = order().id) {
  return (state.taskLogs || []).filter((item) => item.orden_id === orderId).sort((a, b) => String(a.hora).localeCompare(String(b.hora)));
}

function orderResolvedProblems(orderId = order().id) {
  return (state.resolvedProblems || []).filter((item) => item.orden_id === orderId);
}

function orderTechnicalData(orderId = order().id) {
  return (state.technicalData || []).filter((item) => item.orden_id === orderId);
}

function orderSitePoints(orderId = order().id) {
  return (state.sitePoints || []).filter((item) => item.orden_id === orderId).sort((a, b) => a.numero - b.numero);
}

function currentSitePoint() {
  return orderSitePoints().find((item) => item.id === state.selectedPointId) || orderSitePoints()[0] || null;
}

function currentStep() {
  return orderSteps().find((item) => item.estado !== "completado") || orderSteps().at(-1);
}

function formatDate(value) {
  if (!value) return "sin registrar";
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function statusClass(value) {
  return String(value || "").replace(/\s+/g, "-");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function detectHeadset() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    headsetLikely = false;
    return false;
  }
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const labels = devices.map((device) => `${device.kind} ${device.label}`.toLowerCase()).join(" ");
    headsetLikely = /auricular|headset|headphone|earphone|earbud|airpods|bluetooth|buds|manos libres/.test(labels);
    return headsetLikely;
  } catch {
    headsetLikely = false;
    return false;
  }
}

async function speak(text) {
  voiceStatus = text;
  if (suppressSpeech) {
    render();
    return;
  }
  if (state.voiceReplyMode === "off") {
    render();
    return;
  }
  if (state.voiceReplyMode === "headset") {
    const detected = await detectHeadset();
    if (!detected) {
      voiceStatus = `${text} (voz silenciada: no detecte auricular)`;
      render();
      return;
    }
  }
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR";
    utterance.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({});
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        latitud: position.coords.latitude.toFixed(6),
        longitud: position.coords.longitude.toFixed(6)
      }),
      () => resolve({}),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
}

async function addEvent(tipo, descripcion, pasoId = currentStep()?.id) {
  const gps = await getLocation();
  state.events.unshift({
    id: uid("evt"),
    orden_id: order().id,
    paso_id: pasoId || "",
    tipo_evento: tipo,
    descripcion,
    latitud: gps.latitud || "",
    longitud: gps.longitud || "",
    created_by: order().tecnico || "Tecnico",
    created_at: nowIso()
  });
  saveState();
  render();
}

async function startWork() {
  const current = order();
  if (current.estado !== "en curso") {
    const gps = await getLocation();
    current.estado = "en curso";
    current.fecha_inicio = current.fecha_inicio || nowIso();
    current.latitud_inicio = gps.latitud || current.latitud_inicio;
    current.longitud_inicio = gps.longitud || current.longitud_inicio;
    current.updated_at = nowIso();
    await addEvent("inicio", "Trabajo iniciado");
  }
  speak("Trabajo iniciado.");
  saveState();
  render();
}

async function pauseWork() {
  order().estado = "pausada";
  order().updated_at = nowIso();
  await addEvent("pausa", "Trabajo pausado");
  speak("Trabajo pausado.");
  saveState();
  render();
}

async function finishWork() {
  const missing = closingIssues();
  if (missing.length) {
    speak(`Faltan ${missing.length} pendientes antes de cerrar.`);
    alert(`Antes de finalizar faltan:\n\n${missing.join("\n")}`);
    setView("cierre");
    return;
  }
  const gps = await getLocation();
  order().estado = "terminada";
  order().fecha_fin = nowIso();
  order().latitud_fin = gps.latitud || order().latitud_fin;
  order().longitud_fin = gps.longitud || order().longitud_fin;
  order().updated_at = nowIso();
  await addEvent("cierre", "Trabajo finalizado");
  state.reportDraft = buildReport();
  if (!orderBudgetItems().length) {
    const orderId = order().id;
    const previousView = state.selectedView;
    generateBudget();
    state.selectedView = previousView;
    saveState();
  }
  speak("Trabajo finalizado.");
  saveState();
  setView("informe");
}

async function completeStep() {
  const stepItem = currentStep();
  if (!stepItem) return;
  stepItem.estado = "completado";
  stepItem.completed_at = nowIso();
  await addEvent("paso_completado", `Paso completado: ${stepItem.titulo}`, stepItem.id);
  speak("Paso completado.");
  saveState();
  render();
}

async function addMaterialFromText(text) {
  const parsed = parseMaterial(text);
  state.materials.unshift({
    id: uid("mat"),
    orden_id: order().id,
    nombre_material: parsed.name,
    cantidad: parsed.quantity,
    unidad: parsed.unit,
    observacion: parsed.note,
    created_at: nowIso()
  });
  await addEvent("material", `Material usado: ${parsed.name}, ${parsed.quantity || "sin cantidad"} ${parsed.unit || ""}`.trim());
  speak("Material cargado.");
  saveState();
  render();
}

function parseMaterial(text) {
  const clean = text.trim().replace(/\.$/, "");
  const match = clean.match(/(.+?)[, ]+(\d+(?:[,.]\d+)?)\s*(metros?|mts?|m|unidades?|u|rollos?|cajas?|horas?)?/i);
  if (!match) return { name: clean || "Material sin nombre", quantity: "", unit: "", note: "" };
  return {
    name: match[1].trim(),
    quantity: match[2].replace(",", "."),
    unit: match[3] || "",
    note: clean
  };
}

async function addComment(text, tipo = "comentario") {
  if (!text.trim()) return;
  await addEvent(tipo, normalizeAiText(text, tipo));
  speak(tipo === "problema" ? "Problema guardado." : "Evento registrado.");
}

function addSitePointFromText(text, tipo = "relevamiento") {
  const orderId = order().id;
  const number = orderSitePoints(orderId).length + 1;
  const name = text.trim() || `Punto tecnico ${number}`;
  const point = sitePoint(uid("pto"), orderId, number, tipo, name, "Punto agregado durante la planificacion o el trabajo en campo.", true);
  state.sitePoints.push(point);
  state.selectedPointId = point.id;
  saveState();
  render();
  speak("Punto agregado.");
}

async function markSitePointSurveyed(pointId, observation = "") {
  const point = (state.sitePoints || []).find((item) => item.id === pointId);
  if (!point) return;
  const gps = await getLocation();
  point.estado = "relevado";
  point.observacion = observation || point.observacion;
  point.latitud = gps.latitud || point.latitud;
  point.longitud = gps.longitud || point.longitud;
  point.completed_at = point.completed_at || nowIso();
  point.updated_at = nowIso();
  state.selectedPointId = point.id;
  await addEvent("punto_relevado", `Punto relevado: ${point.nombre}${point.observacion ? `. ${point.observacion}` : ""}`);
  speak("Punto relevado.");
  saveState();
  render();
}

function removeSitePoint(pointId) {
  const point = (state.sitePoints || []).find((item) => item.id === pointId);
  if (!point || !confirm(`Eliminar punto "${point.nombre}"?`)) return;
  state.sitePoints = state.sitePoints.filter((item) => item.id !== pointId);
  state.evidence = state.evidence.map((item) => item.punto_id === pointId ? { ...item, punto_id: "" } : item);
  state.selectedPointId = orderSitePoints()[0]?.id || "";
  saveState();
  render();
}

function toggleWorkflowItem(id) {
  const item = (state.workflowItems || []).find((entry) => entry.id === id);
  if (!item) return;
  item.estado = item.estado === "completado" ? "pendiente" : "completado";
  item.completed_at = item.estado === "completado" ? nowIso() : "";
  voiceStatus = `${item.estado === "completado" ? "Completado" : "Pendiente"}: ${item.titulo}`;
  saveState();
  render();
}

function generateWorkflowForOrder(description) {
  const orderId = order().id;
  const lower = normalizeCommand(description);
  const cameraPlan = lower.includes("camara") || lower.includes("nvr") || lower.includes("dvr");
  const items = cameraPlan
    ? [
        ["preparacion", "Confirmar alcance y condiciones", "Validar cantidad de camaras, zonas a cubrir, permisos de acceso, energia disponible, internet y senal 4G."],
        ["relevamiento", "Relevar ubicaciones y recorridos", "Definir punto de cada camara, altura, angulo, cobertura, recorrido de cable, cruces, protecciones y ubicacion de NVR/router."],
        ["materiales", "Preparar materiales sugeridos", "Cable UTP exterior, fichas RJ45, soportes, cajas estancas, grampas/canaleta/cano, fuente o PoE, NVR, router 4G y herramientas."],
        ["evidencias", "Fotos obligatorias por punto", "Antes y despues de cada camara, recorrido de cable, conexiones RJ45, NVR/router, energia, prueba local y prueba remota."],
        ["riesgos", "Riesgos y advertencias", "Senal 4G baja, falta de energia estable, cable expuesto al clima, puntos ciegos, contraluz, vision nocturna deficiente o acceso remoto bloqueado."],
        ["instalacion", "Ejecucion tecnica", "Montar soportes, tender y proteger cableado, crimpear fichas, conectar camaras, configurar NVR/router y ordenar cableado."],
        ["pruebas", "Pruebas finales", "Comprobar imagen local, imagen remota, grabacion, fecha/hora, reinicio de equipos, app del cliente y retencion de video."],
        ["cierre", "Cierre con cliente", "Explicar uso, registrar conformidad, recomendaciones, materiales usados, informe final y presupuesto si corresponde."]
      ]
    : [
        ["preparacion", "Confirmar alcance", "Validar descripcion del trabajo, acceso, herramientas, materiales y riesgos del sitio."],
        ["relevamiento", "Relevar zona de trabajo", "Registrar estado inicial, ubicacion GPS si aplica, fotos antes y puntos donde se interviene."],
        ["materiales", "Preparar materiales", "Listar materiales previstos y registrar materiales usados durante la ejecucion."],
        ["evidencias", "Registrar evidencias", "Fotos antes/durante/despues, problemas encontrados y pruebas realizadas."],
        ["pruebas", "Validar funcionamiento", "Comprobar que el trabajo queda operativo y documentar resultado."],
        ["cierre", "Cerrar con cliente", "Informar tareas realizadas, recomendaciones, conformidad e informe final."]
      ];

  state.workflowItems = (state.workflowItems || []).filter((item) => item.orden_id !== orderId);
  state.workflowItems.push(...items.map((item) => workflowItem(orderId, item[0], item[1], item[2])));
}

function normalizeAiText(text, tipo) {
  const trimmed = text.trim();
  if (tipo === "problema" && !trimmed.toLowerCase().startsWith("problema")) {
    return `Problema detectado: ${trimmed}`;
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function generatePlanFromDescription(description) {
  const lower = description.toLowerCase();
  const orderId = order().id;
  state.steps = state.steps.filter((item) => item.orden_id !== orderId);
  state.checklist = state.checklist.filter((item) => item.orden_id !== orderId);
  state.sitePoints = (state.sitePoints || []).filter((item) => item.orden_id !== orderId);
  state.workflowItems = (state.workflowItems || []).filter((item) => item.orden_id !== orderId);

  const cameraPlan = lower.includes("camara") || lower.includes("cÃ¡mara");
  const steps = cameraPlan
    ? [
        ["Relevar sitio, internet y energia", "Confirmar ubicaciones, senal 4G, alimentacion y recorrido de cable.", true],
        ["Instalar soportes y cableado", "Montar soportes, tender cable UTP y proteger recorridos exteriores.", true],
        ["Conectar camaras y NVR", "Crimpear fichas, alimentar camaras y registrar canales en el NVR.", true],
        ["Configurar visualizacion remota", "Configurar router 4G, app y permisos de acceso remoto.", false],
        ["Probar sistema y documentar", "Validar imagen local/remota, grabacion, fotos finales y conformidad.", true]
      ]
    : [
        ["Relevar el trabajo", "Verificar condiciones del sitio y riesgos.", true],
        ["Preparar materiales", "Ordenar herramientas, repuestos y protecciones.", false],
        ["Ejecutar instalacion", "Realizar el trabajo principal segun descripcion.", true],
        ["Probar funcionamiento", "Validar operacion y registrar resultados.", false],
        ["Cerrar con cliente", "Explicar uso, recomendaciones y conformidad.", true]
      ];

  state.steps.push(...steps.map((item, index) => step(orderId, index + 1, item[0], item[1], item[2])));
  const sitePoints = cameraPlan
    ? [
        ["camara", "Camara acceso o frente", "Registrar ubicacion exacta, altura, orientacion y campo visual.", true],
        ["camara", "Camara interior o punto critico", "Registrar cobertura, obstaculos, iluminacion y angulo final.", true],
        ["recorrido_cable", "Recorrido principal de cable UTP", "Documentar por donde pasa el cable, sujeciones, cruces y protecciones.", true],
        ["equipo", "NVR/DVR, router y energia", "Registrar gabinete/equipo, tomas, UPS si existe y nivel de senal 4G.", true],
        ["prueba", "Punto de prueba final", "Registrar evidencia de visualizacion local/remota y conformidad.", true]
      ]
    : [
        ["relevamiento", "Punto inicial de trabajo", "Registrar ubicacion, condicion inicial y acceso.", true],
        ["instalacion", "Zona de intervencion", "Documentar antes/durante/despues del trabajo realizado.", true],
        ["prueba", "Punto de prueba final", "Registrar resultado y conformidad.", true]
      ];
  state.sitePoints.push(...sitePoints.map((item, index) => sitePoint(uid("pto"), orderId, index + 1, item[0], item[1], item[2], item[3])));
  state.selectedPointId = state.sitePoints.find((item) => item.orden_id === orderId)?.id || "";
  [
    "internet verificado",
    "energia verificada",
    "ubicacion de camaras definida",
    "camaras instaladas",
    "NVR/DVR configurado",
    "visualizacion local probada",
    "visualizacion remota probada",
    "fotos finales cargadas",
    "materiales usados cargados",
    "cliente informado",
    "conformidad del cliente"
  ].forEach((item) => state.checklist.push(check(orderId, item)));
  generateWorkflowForOrder(description);
  saveState();
  render();
  speak("Flujo de trabajo generado.");
}

function closingIssues() {
  const missing = [];
  orderChecklist().filter((item) => item.obligatorio && item.estado !== "completado").forEach((item) => missing.push(`- Checklist: ${item.descripcion}`));
  orderSitePoints().filter((item) => item.obligatorio && item.estado !== "relevado").forEach((item) => missing.push(`- Punto sin relevar: ${item.nombre}`));
  const photos = state.evidence.filter((item) => item.orden_id === order().id);
  if (!photos.length) missing.push("- Falta cargar al menos una foto");
  if (!orderMaterials().length) missing.push("- Falta cargar materiales usados");
  return missing;
}

function handlePhoto(input) {
  const file = input.files?.[0];
  if (!file) return;
  const pointId = pendingPhotoPointId || currentSitePoint()?.id || "";
  const taskId = pendingPhotoTaskId || "";
  pendingPhotoPointId = "";
  pendingPhotoTaskId = "";
  const reader = new FileReader();
  reader.onload = async () => {
    const selectedPoint = (state.sitePoints || []).find((item) => item.id === pointId) || currentSitePoint();
    const gps = await getLocation();
    const evidenceId = uid("evd");
    state.evidence.unshift({
      id: evidenceId,
      orden_id: order().id,
      paso_id: currentStep()?.id || "",
      punto_id: selectedPoint?.id || "",
      task_id: taskId,
      evento_id: "",
      tipo_archivo: "foto",
      url_archivo: reader.result,
      descripcion: `Foto de ${taskId ? (state.taskLogs || []).find((item) => item.id === taskId)?.titulo : selectedPoint?.nombre || currentStep()?.titulo || "orden"}`,
      equipo_tipo: inferDeviceType(selectedPoint?.nombre || selectedPoint?.tipo || ""),
      contexto_imagen: inferImageContext(selectedPoint?.nombre || selectedPoint?.tipo || ""),
      lectura_ocr: "",
      ip_detectada: "",
      mac_serie: "",
      puerto_conexion: "",
      respuesta_equipo: "",
      conclusion_tecnica: "",
      ai_extract_json: "",
      ai_categoria: "",
      ai_titulo: "",
      ai_descripcion: "",
      ai_estado_equipo: "",
      ai_confianza: "",
      scan_estado: "pendiente",
      latitud: gps.latitud || "",
      longitud: gps.longitud || "",
      created_at: nowIso()
    });
    if (taskId) {
      const task = (state.taskLogs || []).find((item) => item.id === taskId);
      if (task) task.photo_ids = [...(task.photo_ids || []), evidenceId];
    }
    if (selectedPoint) {
      selectedPoint.estado = "relevado";
      selectedPoint.latitud = gps.latitud || selectedPoint.latitud;
      selectedPoint.longitud = gps.longitud || selectedPoint.longitud;
      selectedPoint.completed_at = selectedPoint.completed_at || nowIso();
      selectedPoint.updated_at = nowIso();
    }
    await addEvent("foto", `Foto cargada: ${selectedPoint?.nombre || currentStep()?.titulo || "orden"}`);
    speak("Foto cargada.");
    saveState();
    render();
  };
  reader.readAsDataURL(file);
}

function setupSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  recognition = new SpeechRecognition();
  recognition.lang = "es-AR";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onstart = () => {
    listening = true;
    voiceStatus = "Escuchando. Deci: Oficio, cliente.";
    render();
  };
  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    if (!result.isFinal) return;
    const transcript = result[0].transcript;
    const field = document.querySelector("#voiceText");
    if (field) field.value = transcript;
    voiceStatus = `Escuche: ${transcript}`;
    runVoiceCommand(transcript);
  };
  recognition.onend = () => {
    listening = false;
    if (handsFree) {
      voiceStatus = "Reactivando manos libres...";
      render();
      window.setTimeout(() => startListening(true), 500);
    } else {
      voiceStatus = "Escucha detenida.";
      render();
    }
  };
  recognition.onerror = (event) => {
    listening = false;
    const messages = {
      "not-allowed": "Permiso de microfono denegado. Habilitalo en Chrome.",
      "service-not-allowed": "El navegador bloqueo el reconocimiento. Proba con HTTPS o Chrome actualizado.",
      "no-speech": "No escuche voz. Proba hablar mas cerca del telefono.",
      "audio-capture": "No pude acceder al microfono.",
      network: "Error de red del servicio de voz.",
      aborted: "Escucha cancelada."
    };
    voiceStatus = messages[event.error] || `Error de voz: ${event.error || "desconocido"}`;
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      handsFree = false;
    }
    render();
  };
  return recognition;
}

function startListening(keepHandsFree = false) {
  if (!recognition) setupSpeech();
  if (!recognition) {
    voiceStatus = "Este navegador no tiene reconocimiento de voz. Usa el campo de comandos.";
    render();
    alert("Este navegador no expone Web Speech API. Usa el campo de prueba de comandos.");
    return;
  }
  handsFree = keepHandsFree;
  if (listening) return;
  try {
    listening = true;
    voiceStatus = keepHandsFree ? "Activando manos libres..." : "Activando microfono...";
    recognition.start();
    render();
  } catch {
    listening = false;
    voiceStatus = "No pude iniciar el microfono. Espera un segundo y proba de nuevo.";
    render();
  }
}

function stopListening() {
  handsFree = false;
  if (listening) {
    recognition.stop();
    listening = false;
  }
  render();
}

function toggleListening() {
  if (listening || handsFree) {
    stopListening();
  } else {
    startListening(false);
  }
}

function toggleHandsFree() {
  if (handsFree) {
    stopListening();
    speak("Modo manos libres apagado.");
  } else {
    startListening(true);
  }
}

async function testHeadsetVoice() {
  const detected = await detectHeadset();
  if (detected) {
    await speak("Auricular detectado. Respuestas por voz activas.");
  } else {
    voiceStatus = "No detecte auricular. La app no hablara por el parlante.";
    render();
  }
}

function normalizeCommand(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\boficio\b/g, "")
    .replace(/[,.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function commandHas(text, patterns) {
  return patterns.some((pattern) => text === pattern || text.includes(pattern));
}

function commandDetail(text, patterns) {
  let detail = text;
  patterns.forEach((pattern) => {
    detail = detail.replace(pattern, " ");
  });
  return detail
    .replace(/\b(de|del|la|el|los|las|trabajo|trabajos|punto|puntos|ubicacion|ubicaciones)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedIncludes(value, needle) {
  return normalizeCommand(value).includes(normalizeCommand(needle));
}

function findClientByVoice(detail) {
  const normalizedDetail = normalizeCommand(detail);
  if (!normalizedDetail) return null;
  return state.clients.find((item) => normalizedIncludes(item.nombre, normalizedDetail));
}

function findPointByVoice(detail) {
  const normalizedDetail = normalizeCommand(detail);
  if (!normalizedDetail) return currentSitePoint();
  return orderSitePoints().find((item) =>
    normalizedIncludes(item.nombre, normalizedDetail) ||
    normalizedIncludes(item.tipo, normalizedDetail) ||
    normalizedIncludes(item.descripcion, normalizedDetail) ||
    normalizedDetail.split(" ").some((part) =>
      part.length > 2 &&
      (normalizedIncludes(item.nombre, part) ||
        normalizedIncludes(item.tipo, part) ||
        normalizedIncludes(item.descripcion, part))
    )
  );
}

function askAssistant(question, intent = assistantDialog.intent, step = assistantDialog.step, data = assistantDialog.data || {}) {
  assistantDialog = { active: true, intent, step, data, question };
  voiceStatus = question;
  render();
  speak(question);
}

function closeAssistant(message = "Listo.") {
  assistantDialog = { active: false, intent: "", step: "", data: {}, question: "" };
  voiceStatus = message;
  render();
  speak(message);
}

function startAssistant() {
  askAssistant("Te escucho. Podes decir: crear punto, registrar evento, problema, material, seleccionar punto o presupuesto.", "menu", "intent", {});
}

function isYes(text) {
  return commandHas(text, ["si", "sÃ­", "ok", "dale", "correcto", "confirmar", "afirmativo"]);
}

function isNo(text) {
  return commandHas(text, ["no", "negativo", "cancelar", "cancela", "salir"]);
}

function handleAssistantDialog(text) {
  if (isNo(text)) {
    closeAssistant("Cancelado.");
    return true;
  }

  if (assistantDialog.intent === "menu") {
    if (commandHas(text, ["crear punto", "nuevo punto", "agregar punto", "relevamiento", "crear relevamiento"])) {
      askAssistant("Decime el nombre del punto de trabajo.", "point", "name", {});
      return true;
    }
    if (commandHas(text, ["evento", "comentario", "nota"])) {
      askAssistant("Dictame el evento para guardar en la bitacora.", "event", "text", {});
      return true;
    }
    if (commandHas(text, ["problema", "incidencia", "falla"])) {
      askAssistant("Dictame el problema encontrado.", "problem", "text", {});
      return true;
    }
    if (commandHas(text, ["material", "materiales"])) {
      askAssistant("Dictame material, cantidad y unidad.", "material", "text", {});
      return true;
    }
    if (commandHas(text, ["seleccionar punto", "selecionar punto", "elegir punto", "usar punto", "punto"])) {
      askAssistant("Que punto queres usar? Por ejemplo: cable, camara acceso o router.", "select_point", "text", {});
      return true;
    }
    if (commandHas(text, ["presupuesto", "cotizacion"])) {
      generateBudget();
      setView("presupuesto");
      closeAssistant("Presupuesto generado.");
      return true;
    }
    askAssistant("No entendi. Decime: crear punto, evento, problema, material, seleccionar punto o presupuesto.", "menu", "intent", {});
    return true;
  }

  if (assistantDialog.intent === "point" && assistantDialog.step === "name") {
    assistantDialog.data.name = text;
    askAssistant("Que tipo de punto es? Deci camara, cable, energia, equipo o prueba.", "point", "type", assistantDialog.data);
    return true;
  }

  if (assistantDialog.intent === "point" && assistantDialog.step === "type") {
    const type = text.includes("cable") ? "recorrido_cable" : text.includes("camara") ? "camara" : text.includes("energia") ? "energia" : text.includes("equipo") || text.includes("router") || text.includes("nvr") ? "equipo" : text.includes("prueba") ? "prueba" : "relevamiento";
    addSitePointFromText(assistantDialog.data.name, type);
    askAssistant("Punto creado. Queres usarlo ahora?", "point", "use_now", { pointId: state.selectedPointId });
    return true;
  }

  if (assistantDialog.intent === "point" && assistantDialog.step === "use_now") {
    if (isYes(text)) {
      selectSitePoint(assistantDialog.data.pointId, "trabajo");
      closeAssistant("Punto activo.");
    } else {
      closeAssistant("Punto guardado.");
    }
    return true;
  }

  if (assistantDialog.intent === "event") {
    addComment(text, "comentario");
    closeAssistant("Evento registrado.");
    return true;
  }

  if (assistantDialog.intent === "problem") {
    addComment(text, "problema");
    closeAssistant("Problema guardado.");
    return true;
  }

  if (assistantDialog.intent === "material") {
    addMaterialFromText(text);
    closeAssistant("Material cargado.");
    return true;
  }

  if (assistantDialog.intent === "select_point") {
    const found = findPointByVoice(text);
    if (found) {
      selectSitePoint(found.id, "trabajo");
      closeAssistant(`Punto activo: ${found.nombre}.`);
    } else {
      askAssistant("No encontre ese punto. Proba decir cable, camara acceso, interior o router.", "select_point", "text", {});
    }
    return true;
  }

  return false;
}

function runVoiceCommand(rawText) {
  const rawNormalized = String(rawText || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const text = normalizeCommand(rawText);
  const hadWake = /\boficio\b/.test(rawNormalized);
  if (!text && hadWake) return startAssistant();
  if (!text) return;
  if (commandHas(text, ["asistente", "ayuda", "dialogo", "dialogo guiado", "modo alexa", "te escucho"])) return startAssistant();
  if (text.includes("voz apagada") || text.includes("silenciar voz")) {
    state.voiceReplyMode = "off";
    voiceStatus = "Respuestas por voz apagadas.";
    saveState();
    render();
    return;
  }
  if (text.includes("voz auricular") || text.includes("solo auricular")) {
    state.voiceReplyMode = "headset";
    voiceStatus = "Respuestas por voz solo con auricular.";
    saveState();
    render();
    return;
  }
  const directSelectionCommand = commandHas(text, [
    "seleccionar cliente",
    "selecionar cliente",
    "elegir cliente",
    "buscar cliente",
    "seleccionar punto",
    "selecionar punto",
    "seleccionar punto de trabajo",
    "selecionar punto de trabajo",
    "elegir punto",
    "usar punto",
    "seleccionar relevamiento",
    "selecionar relevamiento",
    "seleccionar ubicacion",
    "selecionar ubicacion",
    "seleccionar camara",
    "selecionar camara",
    "seleccionar cable",
    "selecionar cable",
    "usar cable",
    "usar camara"
  ]);
  if (assistantDialog.active && !directSelectionCommand && handleAssistantDialog(text)) return;
  if (directSelectionCommand) {
    assistantDialog = { active: false, intent: "", step: "", data: {}, question: "" };
  }
  if (commandHas(text, ["generar presupuesto", "crear presupuesto", "hacer presupuesto", "armar presupuesto", "generar cotizacion", "crear cotizacion"])) {
    generateBudget();
    return goToView("informe", "Presupuesto generado y guardado.");
  }
  if (commandHas(text, ["generar informe empresa", "informe empresa", "reporte empresa", "informe reducido"])) {
    state.companyReportDraft = buildCompanyReport();
    saveState();
    return goToView("informe", "Informe para empresa generado.");
  }
  if (commandHas(text, ["generar informe tecnico", "informe tecnico", "reporte tecnico", "informe completo"])) {
    state.fullTechnicalReportDraft = buildFullTechnicalReport();
    saveState();
    return goToView("informe", "Informe tecnico generado.");
  }
  if (commandHas(text, ["nuevo cliente", "crear cliente", "agregar cliente", "alta cliente", "cargar cliente"])) {
    state.selectedClientId = "";
    setView("trabajo");
    speak("Carga el cliente desde la orden activa.");
    return;
  }
  if (commandHas(text, ["seleccionar cliente", "selecionar cliente", "elegir cliente", "buscar cliente"])) {
    const name = commandDetail(text, ["seleccionar cliente", "selecionar cliente", "elegir cliente", "buscar cliente"]);
    const found = findClientByVoice(name);
    if (found) {
      state.selectedClientId = found.id;
      saveState();
      setView("trabajo");
      speak("Cliente seleccionado.");
    } else {
      speak("No encontre ese cliente.");
    }
    return;
  }
  if (commandHas(text, ["agregar punto", "crear punto", "nuevo punto", "cargar punto", "agregar relevamiento", "crear relevamiento", "nuevo relevamiento", "punto nuevo"])) {
    const detail = commandDetail(text, ["agregar punto", "crear punto", "nuevo punto", "cargar punto", "agregar relevamiento", "crear relevamiento", "nuevo relevamiento", "punto nuevo"]) || prompt("Nombre del punto tecnico") || "";
    const type = text.includes("cable") ? "recorrido_cable" : text.includes("camara") ? "camara" : text.includes("energia") ? "energia" : text.includes("equipo") ? "equipo" : "relevamiento";
    return addSitePointFromText(detail, type);
  }
  if (commandHas(text, ["punto relevado", "punto completo", "relevar punto", "relevamiento completo", "marcar punto", "marcar relevado", "completar punto", "punto terminado", "relevado"])) {
    const detail = commandDetail(text, ["punto relevado", "punto completo", "relevar punto", "relevamiento completo", "marcar punto", "marcar relevado", "completar punto", "punto terminado", "relevado"]);
    const found = findPointByVoice(detail);
    return markSitePointSurveyed(found?.id || currentSitePoint()?.id, detail);
  }
  if (commandHas(text, [
    "seleccionar punto",
    "selecionar punto",
    "seleccionar punto de trabajo",
    "selecionar punto de trabajo",
    "elegir punto",
    "usar punto",
    "abrir punto",
    "buscar punto",
    "seleccionar relevamiento",
    "selecionar relevamiento",
    "elegir relevamiento",
    "seleccionar ubicacion",
    "selecionar ubicacion",
    "elegir ubicacion",
    "usar ubicacion",
    "seleccionar camara",
    "selecionar camara",
    "usar camara",
    "seleccionar cable",
    "selecionar cable",
    "usar cable"
  ])) {
    const pointPatterns = [
      "seleccionar punto de trabajo",
      "selecionar punto de trabajo",
      "seleccionar punto",
      "selecionar punto",
      "elegir punto",
      "usar punto",
      "abrir punto",
      "buscar punto",
      "seleccionar relevamiento",
      "selecionar relevamiento",
      "elegir relevamiento",
      "seleccionar ubicacion",
      "selecionar ubicacion",
      "elegir ubicacion",
      "usar ubicacion",
      "seleccionar camara",
      "selecionar camara",
      "usar camara",
      "seleccionar cable",
      "selecionar cable",
      "usar cable"
    ];
    const detail = commandDetail(text, pointPatterns);
    const found = findPointByVoice(detail);
    if (found) {
      state.selectedPointId = found.id;
      saveState();
      setView("trabajo");
      speak("Punto seleccionado.");
    } else {
      voiceStatus = `No encontre el punto: ${detail || text}`;
      render();
      speak("No encontre ese punto.");
    }
    return;
  }
  if (commandHas(text, ["iniciar trabajo", "empezar trabajo", "arrancar trabajo", "comenzar trabajo"])) return startWork();
  if (commandHas(text, ["pausar trabajo", "pausa trabajo", "poner pausa", "detener trabajo"])) return pauseWork();
  if (commandHas(text, ["finalizar trabajo", "terminar trabajo", "cerrar trabajo", "fin trabajo"])) return finishWork();
  if (commandHas(text, ["paso completo", "paso completado", "completar paso", "siguiente paso", "paso listo"])) return completeStep();
  if (commandHas(text, ["sacar foto", "tomar foto", "agregar foto", "cargar foto", "foto punto", "foto evidencia"])) {
    document.querySelector("#photoInput")?.click();
    speak("Camara lista.");
    return;
  }
  if (text.includes("problema")) {
    const detail = text.replace("problema", "").trim() || prompt("Describe el problema encontrado") || "";
    return addComment(detail, "problema");
  }
  if (commandHas(text, ["material usado", "agregar material", "cargar material", "use material", "usar material"])) {
    const detail = commandDetail(text, ["material usado", "agregar material", "cargar material", "use material", "usar material"]) || prompt("Dicta material, cantidad y unidad") || "";
    return addMaterialFromText(detail);
  }
  if (commandHas(text, ["agregar evento", "crear evento", "registrar evento", "comentario", "agregar comentario", "registrar comentario", "nota"])) {
    const detail = commandDetail(text, ["agregar evento", "crear evento", "registrar evento", "comentario", "agregar comentario", "registrar comentario", "nota"]) || prompt("Dicta el evento") || "";
    return addComment(detail, "comentario");
  }
  if (commandHas(text, ["ir a inicio", "abrir inicio", "abrir clientes", "ir a clientes", "ver clientes"])) return goToView("trabajo", "Trabajo.");
  if (commandHas(text, ["abrir ordenes", "ir a ordenes", "ver ordenes", "abrir relevamiento", "ir a relevamiento"])) return goToView("ordenes", "Relevo.");
  if (commandHas(text, ["abrir trabajo", "ir a trabajo", "modo trabajo"])) return goToView("trabajo", "Trabajo en curso.");
  if (commandHas(text, ["abrir materiales", "ir a materiales", "ver materiales", "abrir evidencias", "ver evidencias"])) return goToView("materiales", "Materiales y evidencias.");
  if (commandHas(text, ["abrir cierre", "ir a cierre", "ver checklist"])) return goToView("trabajo", "Trabajo.");
  if (commandHas(text, ["abrir informe", "ir a informe", "ver informe"])) return goToView("informe", "Informe.");
  if (commandHas(text, ["abrir presupuesto", "ir a presupuesto", "ver presupuesto"])) return goToView("informe", "Informe.");
  voiceStatus = "Comando no reconocido. Usa: abrir trabajo, seleccionar punto, sacar foto, problema, material usado, generar presupuesto o generar informe.";
  saveState();
  render();
  speak("No reconoci el comando.");
}

function runCommandSelfTest() {
  suppressSpeech = true;
  const previous = {
    view: state.selectedView,
    point: state.selectedPointId,
    client: state.selectedClientId,
    dialog: { ...assistantDialog }
  };
  const results = [];
  const test = (label, command, check) => {
    runVoiceCommand(command);
    const ok = check();
    results.push(`${ok ? "OK" : "FALLA"} ${label}: ${command}`);
  };

  test("abrir clientes redirige", "Oficio abrir clientes", () => state.selectedView === "trabajo");
  test("seleccionar cliente", "Oficio seleccionar cliente Hogar San Jose", () => state.selectedClientId === "cli-hogar");
  test("abrir relevamiento", "Oficio abrir relevamiento", () => state.selectedView === "ordenes");
  test("seleccionar AP", "Oficio seleccionar punto AP", () => {
    const point = (state.sitePoints || []).find((item) => item.id === state.selectedPointId);
    return state.selectedView === "trabajo" && point && normalizeCommand(point.nombre + " " + point.tipo).includes("ap");
  });
  test("materiales navega", "Oficio abrir materiales", () => state.selectedView === "materiales");
  test("presupuesto redirige", "Oficio abrir presupuesto", () => state.selectedView === "informe");
  test("informe tecnico", "Oficio generar informe tecnico", () => state.selectedView === "informe" && Boolean(state.fullTechnicalReportDraft));

  state.selectedView = previous.view;
  state.selectedPointId = previous.point;
  state.selectedClientId = previous.client;
  assistantDialog = previous.dialog;
  suppressSpeech = false;
  voiceStatus = `Prueba comandos: ${results.join(" | ")}`;
  saveState();
  render();
}

function elapsedLabel() {
  const current = order();
  if (!current.fecha_inicio) return "00:00:00";
  const end = current.fecha_fin ? new Date(current.fecha_fin) : new Date();
  const seconds = Math.max(0, Math.floor((end - new Date(current.fecha_inicio)) / 1000));
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function elapsedHours() {
  const current = order();
  if (!current.fecha_inicio) return 1;
  const end = current.fecha_fin ? new Date(current.fecha_fin) : new Date();
  const hours = Math.max(1, Math.ceil((end - new Date(current.fecha_inicio)) / 3600000));
  return Number.isFinite(hours) ? hours : 1;
}

function money(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function budgetTotal() {
  return orderBudgetItems().reduce((sum, item) => sum + Number(item.cantidad || 0) * Number(item.precio_unitario || 0), 0);
}

function addBudgetItem(data) {
  state.budgetItems = state.budgetItems || [];
  state.budgetItems.push({
    id: uid("pre"),
    orden_id: order().id,
    categoria: data.categoria || "servicio",
    concepto: data.concepto || "Item de presupuesto",
    detalle: data.detalle || "",
    cantidad: Number(data.cantidad || 1),
    unidad: data.unidad || "unidad",
    precio_unitario: Number(data.precio_unitario || 0),
    created_at: nowIso(),
    updated_at: nowIso()
  });
  saveState();
  render();
}

function removeBudgetItem(id) {
  state.budgetItems = (state.budgetItems || []).filter((item) => item.id !== id);
  saveState();
  render();
}

function updateBudgetItem(id, field, value) {
  const item = (state.budgetItems || []).find((entry) => entry.id === id);
  if (!item) return;
  item[field] = field === "cantidad" || field === "precio_unitario" ? Number(value || 0) : value;
  item.updated_at = nowIso();
  saveState();
  render();
}

function generateBudget() {
  const orderId = order().id;
  const points = orderSitePoints(orderId);
  const materials = orderMaterials(orderId);
  const problems = orderEvents(orderId).filter((item) => item.tipo_evento === "problema").length;
  const cameraPoints = points.filter((item) => item.tipo.includes("camara")).length || 1;
  const cablePoints = points.filter((item) => item.tipo.includes("cable")).length;
  const hours = elapsedHours();
  const items = [];

  items.push({
    categoria: "mano_obra",
    concepto: "Mano de obra tecnica",
    detalle: `Ejecucion, configuracion y pruebas en campo (${hours} h estimadas/registradas).`,
    cantidad: hours,
    unidad: "hora",
    precio_unitario: 18000
  });
  items.push({
    categoria: "instalacion",
    concepto: "Instalacion y orientacion de camaras",
    detalle: `Montaje, ajuste y documentacion de ${cameraPoints} punto(s) de camara.`,
    cantidad: cameraPoints,
    unidad: "punto",
    precio_unitario: 25000
  });
  if (cablePoints) {
    items.push({
      categoria: "instalacion",
      concepto: "Tendido y proteccion de cableado",
      detalle: "Recorrido, fijaciones, cruces y protecciones relevadas.",
      cantidad: cablePoints,
      unidad: "recorrido",
      precio_unitario: 22000
    });
  }
  points.filter((item) => item.tipo === "equipo" || item.tipo === "conectividad").forEach((point) => {
    items.push({
      categoria: "configuracion",
      concepto: `Configuracion ${point.nombre}`,
      detalle: point.observacion || point.descripcion,
      cantidad: 1,
      unidad: "servicio",
      precio_unitario: 30000
    });
  });
  materials.forEach((material) => {
    items.push({
      categoria: "material",
      concepto: material.nombre_material,
      detalle: material.observacion || "Material registrado durante el trabajo.",
      cantidad: Number(material.cantidad || 1),
      unidad: material.unidad || "unidad",
      precio_unitario: 0
    });
  });
  if (problems) {
    items.push({
      categoria: "incidencia",
      concepto: "Diagnostico y correccion de incidencias",
      detalle: `${problems} incidencia(s) registrada(s) durante el trabajo.`,
      cantidad: problems,
      unidad: "incidencia",
      precio_unitario: 12000
    });
  }
  items.push({
    categoria: "documentacion",
    concepto: "Informe tecnico y evidencias",
    detalle: "Armado de informe final, fotos, checklist y recomendaciones.",
    cantidad: 1,
    unidad: "servicio",
    precio_unitario: 15000
  });

  state.budgetItems = (state.budgetItems || []).filter((item) => item.orden_id !== orderId);
  items.forEach((item) => addBudgetItemWithoutRender(orderId, item));
  saveState();
  render();
  speak("Presupuesto generado.");
}

function addBudgetItemWithoutRender(orderId, data) {
  state.budgetItems = state.budgetItems || [];
  state.budgetItems.push({
    id: uid("pre"),
    orden_id: orderId,
    categoria: data.categoria || "servicio",
    concepto: data.concepto || "Item de presupuesto",
    detalle: data.detalle || "",
    cantidad: Number(data.cantidad || 1),
    unidad: data.unidad || "unidad",
    precio_unitario: Number(data.precio_unitario || 0),
    created_at: nowIso(),
    updated_at: nowIso()
  });
}

function buildReport() {
  const c = client();
  const o = order();
  const events = orderEvents().reverse();
  const materials = orderMaterials();
  const checklist = orderChecklist();
  const points = orderSitePoints();
  const workflow = orderWorkflow();
  const doneSteps = orderSteps().filter((item) => item.estado === "completado");
  const problems = events.filter((item) => item.tipo_evento === "problema");
  const tests = events.filter((item) => item.tipo_evento === "prueba" || item.descripcion.toLowerCase().includes("prueba"));

  return `
    <h1>Informe tecnico OficioPro IA</h1>
    <p><strong>Cliente:</strong> ${escapeHtml(c.nombre)}<br>
    <strong>Fecha:</strong> ${formatDate(o.fecha_fin || nowIso())}<br>
    <strong>Tecnico:</strong> ${escapeHtml(o.tecnico)}<br>
    <strong>Orden:</strong> ${escapeHtml(o.numero)}<br>
    <strong>Trabajo realizado:</strong> ${escapeHtml(o.tipo_trabajo)}</p>

    <h2>Resumen</h2>
    <p>Se realizo ${escapeHtml(o.descripcion)}. El trabajo fue registrado en campo mediante bitacora, materiales, evidencias y checklist operativo.</p>

    <h2>Tareas realizadas</h2>
    <ul>${doneSteps.map((item) => `<li>${escapeHtml(item.titulo)}: ${escapeHtml(item.descripcion)}</li>`).join("") || "<li>Sin pasos completados registrados.</li>"}</ul>

    <h2>Flujo operativo de la orden</h2>
    <ul>${workflow.map((item) => `<li>${item.estado === "completado" ? "OK" : "Pendiente"} - ${escapeHtml(item.titulo)}: ${escapeHtml(item.detalle)}</li>`).join("") || "<li>Sin flujo operativo generado.</li>"}</ul>

    <h2>Puntos de trabajo relevados</h2>
    <ul>${points.map((item) => `<li>${item.estado === "relevado" ? "OK" : "Pendiente"} - ${escapeHtml(item.nombre)} (${escapeHtml(item.tipo)}). ${escapeHtml(item.descripcion)}${item.latitud ? ` GPS ${escapeHtml(item.latitud)}, ${escapeHtml(item.longitud)}.` : ""}${item.observacion ? ` ${escapeHtml(item.observacion)}` : ""}</li>`).join("") || "<li>Sin puntos tecnicos registrados.</li>"}</ul>

    <h2>Materiales usados</h2>
    <ul>${materials.map((item) => `<li>${escapeHtml(item.nombre_material)} ${escapeHtml(item.cantidad)} ${escapeHtml(item.unidad)} ${item.observacion ? `- ${escapeHtml(item.observacion)}` : ""}</li>`).join("") || "<li>Sin materiales cargados.</li>"}</ul>

    <h2>Incidencias y soluciones</h2>
    <ul>${problems.map((item) => `<li>${escapeHtml(item.descripcion)} (${formatDate(item.created_at)})</li>`).join("") || "<li>No se registraron incidencias.</li>"}</ul>

    <h2>Pruebas realizadas</h2>
    <ul>${tests.map((item) => `<li>${escapeHtml(item.descripcion)}</li>`).join("") || "<li>Checklist de pruebas completado segun items marcados.</li>"}</ul>

    <h2>Checklist</h2>
    <ul>${checklist.map((item) => `<li>${item.estado === "completado" ? "OK" : "Pendiente"} - ${escapeHtml(item.descripcion)}</li>`).join("")}</ul>

    <h2>Recomendaciones</h2>
    <p>Revisar estado de conectividad 4G periodicamente, mantener protegidas las conexiones exteriores y conservar las credenciales de acceso remoto en un lugar seguro.</p>

    <h2>Conformidad del cliente</h2>
    <p>Firma y aclaracion: ______________________________________________</p>
  `;
}

function buildCompanyReport() {
  const c = client();
  const o = order();
  const tasks = orderTaskLogs();
  const problems = orderResolvedProblems();
  const tech = orderTechnicalData()[0] || {};
  return `
    <h1>INFORME DE TRABAJO</h1>
    <p><strong>Cliente:</strong> ${escapeHtml(c.nombre)}<br>
    <strong>Fecha:</strong> ${formatDate(o.fecha_fin || o.fecha_inicio || nowIso()).split(",")[0]}<br>
    <strong>Trabajo:</strong> ${escapeHtml(o.tipo_trabajo)}<br>
    <strong>Estado final:</strong> ${escapeHtml(o.estado === "terminada" ? "Instalacion finalizada correctamente." : "Trabajo en curso / pendiente de cierre.")}</p>
    <h2>Horarios principales</h2>
    <ul>${tasks.map((item) => `<li><strong>${escapeHtml(item.hora)} - ${escapeHtml(item.titulo)}</strong><br>${escapeHtml(item.descripcion)}</li>`).join("") || "<li>Sin tareas registradas.</li>"}</ul>
    <h2>Problemas resueltos</h2>
    <ul>${problems.map((item) => `<li>${escapeHtml(item.problema)}. Solucion: ${escapeHtml(item.solucion)}. Resultado: ${escapeHtml(item.resultado)}</li>`).join("") || "<li>Sin problemas resueltos registrados.</li>"}</ul>
    <h2>Configuracion final</h2>
    <p><strong>Equipo:</strong> ${escapeHtml(tech.marca || "")} ${escapeHtml(tech.modelo || "")}<br>
    <strong>Nombre AP:</strong> ${escapeHtml(tech.nombre_asignado || "")}<br>
    <strong>IP AP:</strong> ${escapeHtml(tech.ip || "")}<br>
    <strong>SSID:</strong> ${escapeHtml(tech.ssid || "")}<br>
    <strong>Clave WiFi:</strong> ${escapeHtml(tech.clave_wifi || "")}</p>
  `;
}

function buildFullTechnicalReport() {
  const c = client();
  const o = order();
  const tasks = orderTaskLogs();
  const tech = orderTechnicalData();
  const problems = orderResolvedProblems();
  const photos = state.evidence.filter((item) => item.orden_id === o.id);
  return `
    <h1>Informe tecnico completo</h1>
    <p><strong>Cliente:</strong> ${escapeHtml(c.nombre)}<br>
    <strong>Orden:</strong> ${escapeHtml(o.numero)}<br>
    <strong>Trabajo:</strong> ${escapeHtml(o.descripcion)}<br>
    <strong>Tecnico:</strong> ${escapeHtml(o.tecnico)}</p>
    <h2>Todos los pasos / tareas</h2>
    <ul>${tasks.map((item) => `<li>${escapeHtml(item.hora)} - ${escapeHtml(item.categoria)} - <strong>${escapeHtml(item.titulo)}</strong>: ${escapeHtml(item.descripcion)}</li>`).join("")}</ul>
    <h2>Datos tecnicos</h2>
    <ul>${tech.map((item) => `<li>${escapeHtml(item.equipo)} ${escapeHtml(item.marca)} ${escapeHtml(item.modelo)} Â· Nombre: ${escapeHtml(item.nombre_asignado)} Â· IP: ${escapeHtml(item.ip)} Â· Usuario: ${escapeHtml(item.usuario)} Â· SSID: ${escapeHtml(item.ssid)} Â· Observaciones: ${escapeHtml(item.observaciones)}</li>`).join("") || "<li>Sin datos tecnicos.</li>"}</ul>
    <h2>Problemas, causas y soluciones</h2>
    <ul>${problems.map((item) => `<li><strong>${escapeHtml(item.problema)}</strong><br>Causa: ${escapeHtml(item.causa)}<br>Solucion: ${escapeHtml(item.solucion)}<br>Resultado: ${escapeHtml(item.resultado)}</li>`).join("") || "<li>Sin problemas registrados.</li>"}</ul>
    <h2>Fotos y evidencias</h2>
    <ul>${photos.map((item) => `<li>${escapeHtml(item.descripcion)} - ${formatDate(item.created_at)}${item.equipo_tipo ? `<br>Equipo: ${escapeHtml(item.equipo_tipo)}` : ""}${item.contexto_imagen ? `<br>Contexto: ${escapeHtml(item.contexto_imagen)}` : ""}${item.ip_detectada ? `<br>IP: ${escapeHtml(item.ip_detectada)}` : ""}${item.puerto_conexion ? `<br>Conexion: ${escapeHtml(item.puerto_conexion)}` : ""}${item.respuesta_equipo ? `<br>Respuesta: ${escapeHtml(item.respuesta_equipo)}` : ""}${item.lectura_ocr ? `<br>Lectura/OCR: ${escapeHtml(item.lectura_ocr)}` : ""}${item.conclusion_tecnica ? `<br>Conclusion: ${escapeHtml(item.conclusion_tecnica)}` : ""}${item.ai_titulo ? `<br>IA: ${escapeHtml(item.ai_categoria)} - ${escapeHtml(item.ai_titulo)}. ${escapeHtml(item.ai_descripcion || "")}` : ""}</li>`).join("") || "<li>Sin fotos cargadas.</li>"}</ul>
    <h2>Recomendaciones</h2>
    <p>Guardar credenciales Omada en lugar seguro, mantener AP conectado por cable al router, documentar futuros cambios de SSID/clave y revisar periodicamente estado del AP en Omada.</p>
  `;
}

function saveClient(form) {
  const data = Object.fromEntries(new FormData(form));
  const existing = state.clients.find((item) => item.id === data.id);
  if (existing) {
    Object.assign(existing, data, { updated_at: nowIso() });
    state.selectedClientId = existing.id;
  } else {
    const id = uid("cli");
    state.clients.push({ ...data, id, created_at: nowIso(), updated_at: nowIso() });
    state.selectedClientId = id;
  }
  saveState();
  render();
}

function saveOrder(form) {
  const data = Object.fromEntries(new FormData(form));
  const existing = state.orders.find((item) => item.id === data.id);
  if (existing) {
    Object.assign(existing, data, { updated_at: nowIso() });
    state.selectedOrderId = existing.id;
  } else {
    const id = uid("ord");
    state.orders.push({ ...data, id, estado: "pendiente", fecha_inicio: "", fecha_fin: "", latitud_inicio: "", longitud_inicio: "", latitud_fin: "", longitud_fin: "", created_at: nowIso(), updated_at: nowIso() });
    state.selectedOrderId = id;
    generatePlanFromDescription(data.descripcion);
  }
  saveState();
  render();
}

function resetDemo() {
  localStorage.removeItem(storeKey);
  state = JSON.parse(JSON.stringify(defaultState));
  saveState();
  render();
}

async function completeDemoClose() {
  state.checklist
    .filter((item) => item.orden_id === order().id)
    .forEach((item) => {
      item.estado = "completado";
      item.completed_at = item.completed_at || nowIso();
    });

  if (!orderMaterials().length) {
    state.materials.unshift({
      id: uid("mat"),
      orden_id: order().id,
      nombre_material: "Cable UTP exterior",
      cantidad: "25",
      unidad: "metros",
      observacion: "Carga de demo para validar informe final",
      created_at: nowIso()
    });
  }

  if (!state.evidence.some((item) => item.orden_id === order().id)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 900 675"><rect width="900" height="675" fill="#dfe8df"/><rect x="70" y="90" width="760" height="420" rx="12" fill="#ffffff" stroke="#9aa89d" stroke-width="8"/><rect x="125" y="155" width="250" height="170" rx="10" fill="#1f7a54"/><rect x="525" y="165" width="160" height="110" rx="10" fill="#2d648d"/><circle cx="605" cy="220" r="34" fill="#ffffff"/><path d="M160 445h580" stroke="#d98f28" stroke-width="28" stroke-linecap="round"/><text x="450" y="590" font-family="Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle" fill="#17211b">Evidencia demo OficioPro IA</text></svg>`;
    state.evidence.unshift({
      id: uid("evd"),
      orden_id: order().id,
      paso_id: currentStep()?.id || "",
      punto_id: currentSitePoint()?.id || "",
      evento_id: "",
      tipo_archivo: "foto",
      url_archivo: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      descripcion: "Foto final de demo",
      latitud: "",
      longitud: "",
      created_at: nowIso()
    });
  }

  orderSitePoints().forEach((point) => {
    point.estado = "relevado";
    point.observacion = point.observacion || "Relevado en demo con evidencia de instalacion.";
    point.completed_at = point.completed_at || nowIso();
    point.updated_at = nowIso();
  });

  await addEvent("prueba", "Demo completada: checklist, materiales y evidencia listos");
  saveState();
  render();
}

function renderShell(content, title, subtitle, actions = "") {
  const nav = [
    ["trabajo", "Trabajo"],
    ["ordenes", "Relevo"],
    ["materiales", "Evidencias"],
    ["informe", "Informe"]
  ];
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">OP</div><span>OficioPro Lite</span></div>
        <nav class="nav">${nav.map(([id, label]) => `<button class="${state.selectedView === id ? "active" : ""}" onclick="setView('${id}')">${label}</button>`).join("")}</nav>
        <div class="sidebar-note">Modo campo: registrar trabajo, relevo, evidencias e informe.</div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div><h1>${title}</h1><p>${subtitle}</p></div>
          <div class="actions">${actions}</div>
        </div>
        <input id="photoInputGlobal" class="no-print" type="file" accept="image/*" capture="environment" style="display:none" onchange="handlePhoto(this)">
        ${content}
      </main>
    </div>
  `;
}

function renderInicio() {
  const o = order();
  const content = `
    <section class="stat-grid">
      <div class="stat"><strong>${state.clients.length}</strong><span>clientes</span></div>
      <div class="stat"><strong>${state.orders.length}</strong><span>ordenes</span></div>
      <div class="stat"><strong>${orderEvents().length}</strong><span>eventos</span></div>
      <div class="stat"><strong>${elapsedLabel()}</strong><span>tiempo actual</span></div>
    </section>
    <section class="grid cols-2" style="margin-top:16px">
      <div class="panel">
        <h2>Caso tecnico de prueba</h2>
        <p>Cliente Hogar San Jose, instalacion y configuracion WiFi con TP-Link Omada EAP245. La orden ya esta lista para registrar horarios, fotos, problemas, datos tecnicos e informes.</p>
        <div class="actions">
          <button class="btn primary" onclick="setView('trabajo')">Abrir trabajo</button>
          <button class="btn" onclick="generatePlanFromDescription(order().descripcion)">Generar pasos IA</button>
          <button class="btn ghost" onclick="resetDemo()">Reiniciar demo</button>
        </div>
      </div>
      <div class="panel">
        <h2>Orden activa</h2>
        <p><strong>${escapeHtml(o.numero)}</strong> Â· ${escapeHtml(o.tipo_trabajo)}</p>
        <p>${escapeHtml(o.descripcion)}</p>
        <span class="status ${statusClass(o.estado)}">${escapeHtml(o.estado)}</span>
      </div>
    </section>
  `;
  return renderShell(content, "Inicio", "Panel operativo para tecnicos en campo.");
}

function renderClientes() {
  const c = selectedClient();
  const cards = state.clients.map((item) => `
    <article class="card ${item.id === state.selectedClientId ? "selected" : ""}">
      <h3>${escapeHtml(item.nombre)}</h3>
      <p>${escapeHtml(item.direccion)}<br>${escapeHtml(item.telefono)}</p>
      <div class="actions"><button class="btn" data-action="select-client" data-id="${item.id}">Seleccionar</button></div>
    </article>
  `).join("");
  const form = `
    <div class="grid cols-2">
      <section class="grid">${cards}</section>
      <section class="panel">
        <h2>${c ? "Editar cliente" : "Nuevo cliente"}</h2>
        <form class="form-grid" onsubmit="event.preventDefault(); saveClient(this);">
          <input type="hidden" name="id" value="${escapeHtml(c?.id || "")}">
          <label>Nombre<input name="nombre" required value="${escapeHtml(c?.nombre || "")}"></label>
          <label>Telefono<input name="telefono" value="${escapeHtml(c?.telefono || "")}"></label>
          <label class="full">Direccion<input name="direccion" value="${escapeHtml(c?.direccion || "")}"></label>
          <label>Latitud<input name="latitud" value="${escapeHtml(c?.latitud || "")}"></label>
          <label>Longitud<input name="longitud" value="${escapeHtml(c?.longitud || "")}"></label>
          <label>Tipo<select name="tipo_cliente">
            ${["casa", "campo", "galpon", "comercio", "empresa"].map((item) => `<option ${c?.tipo_cliente === item ? "selected" : ""}>${item}</option>`).join("")}
          </select></label>
          <label class="full">Observaciones<textarea name="observaciones">${escapeHtml(c?.observaciones || "")}</textarea></label>
          <div class="actions full"><button class="btn primary">Guardar cliente</button><button type="button" class="btn" onclick="state.selectedClientId=''; saveState(); render();">Nuevo</button></div>
        </form>
      </section>
    </div>
  `;
  return renderShell(form, "Clientes", "Crear, editar y consultar clientes.");
}

function renderSitePointRows(mode = "plan") {
  const points = orderSitePoints();
  if (!points.length) return `<div class="empty">Todavia no hay puntos tecnicos. Genera el plan IA o agrega uno manualmente.</div>`;
  return points.map((point) => {
    const photos = state.evidence.filter((item) => item.punto_id === point.id).length;
    const gps = point.latitud ? `GPS ${point.latitud}, ${point.longitud}` : "sin GPS";
    const isActive = point.id === state.selectedPointId;
    const actions = mode === "work"
      ? `<button class="btn" data-action="use-point" data-id="${point.id}">Usar</button><button class="btn" data-action="photo-point" data-id="${point.id}">Foto</button><button class="btn primary" data-action="survey-point" data-id="${point.id}">Relevar</button>`
      : `<button class="btn" data-action="select-point" data-id="${point.id}">Seleccionar</button><button class="btn" data-action="photo-point" data-id="${point.id}">Foto</button><button class="btn danger" data-action="remove-point" data-id="${point.id}">Eliminar</button>`;
    return `
      <div class="step-row ${point.estado === "relevado" ? "done" : ""} ${isActive ? "active-point" : ""}">
        <div class="step-dot">${point.estado === "relevado" ? "OK" : point.numero}</div>
        <div>
          <strong>${escapeHtml(point.nombre)}${isActive ? " Â· Activo" : ""}</strong>
          <div class="mini muted">${escapeHtml(point.tipo)} Â· ${escapeHtml(point.descripcion)}</div>
          <div class="mini muted">${gps} Â· fotos: ${photos}${point.observacion ? ` Â· ${escapeHtml(point.observacion)}` : ""}</div>
        </div>
        <div class="actions">${actions}</div>
      </div>
    `;
  }).join("");
}

function renderWorkflow(mode = "plan") {
  const items = orderWorkflow();
  if (!items.length) return `<div class="empty">Genera pasos IA para crear el flujo del instalador.</div>`;
  return `
    <div class="workflow-list">
      ${items.map((item) => `
        <div class="workflow-row ${item.estado === "completado" ? "done" : ""}">
          <div>
            <span class="status">${escapeHtml(item.categoria)}</span>
            <h3>${escapeHtml(item.titulo)}</h3>
            <p class="mini">${escapeHtml(item.detalle)}</p>
          </div>
          <button class="btn ${item.estado === "completado" ? "" : "primary"}" data-action="toggle-workflow" data-id="${item.id}">${item.estado === "completado" ? "Pendiente" : "Completar"}</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderTaskLogSection() {
  const categories = ["Inicio", "Equipamiento", "Configuracion", "Problema detectado", "Solucion aplicada", "Prueba", "Cierre"];
  const rows = orderTaskLogs().map((task) => {
    const photos = state.evidence.filter((item) => item.task_id === task.id);
    return `
      <div class="task-row">
        <div>
          <strong>${escapeHtml(task.hora)} - ${escapeHtml(task.titulo)}</strong>
          <div><span class="status">${escapeHtml(task.categoria)}</span></div>
          <p class="mini">${escapeHtml(task.descripcion)}</p>
          <div class="mini muted">Fotos asociadas: ${photos.length}</div>
        </div>
        <div class="actions"><button class="btn" data-action="photo-task" data-id="${task.id}">Foto</button></div>
      </div>
    `;
  }).join("") || `<div class="empty">Sin tareas horarias registradas.</div>`;
  return `
    <div class="panel">
      <h2>Tareas / relevo</h2>
      <form class="form-grid" onsubmit="event.preventDefault(); addTaskLogFromForm(this);">
        <label>Hora<input type="time" name="hora" value="${new Date().toTimeString().slice(0, 5)}"></label>
        <label>Categoria<select name="categoria">${categories.map((item) => `<option>${item}</option>`).join("")}</select></label>
        <label class="full">Titulo<input name="titulo" placeholder="Ej: Adopcion del AP en Omada" required></label>
        <label class="full">Descripcion<textarea name="descripcion" placeholder="Detalle de la tarea realizada"></textarea></label>
        <div class="actions full"><button class="btn primary">Guardar tarea</button></div>
      </form>
      <div class="task-list">${rows}</div>
    </div>
  `;
}

function renderResolvedProblemsSection() {
  const rows = orderResolvedProblems().map((item) => `
    <div class="problem-row">
      <div><strong>Problema:</strong> ${escapeHtml(item.problema)}</div>
      <div><strong>Causa:</strong> ${escapeHtml(item.causa)}</div>
      <div><strong>Solucion:</strong> ${escapeHtml(item.solucion)}</div>
      <div><strong>Resultado:</strong> ${escapeHtml(item.resultado)}</div>
    </div>
  `).join("") || `<div class="empty">Sin problemas resueltos registrados.</div>`;
  return `
    <div class="panel">
      <h2>Problemas resueltos</h2>
      <form class="form-grid" onsubmit="event.preventDefault(); addResolvedProblemFromForm(this);">
        <label class="full">Problema detectado<input name="problema" required placeholder="Ej: AP aparecia desconectado"></label>
        <label class="full">Causa<input name="causa" placeholder="Ej: Falta de conexion por cable al router"></label>
        <label class="full">Solucion aplicada<input name="solucion" placeholder="Ej: Se conecto AP al router por cable"></label>
        <label class="full">Resultado<input name="resultado" placeholder="Ej: Omada lo mostro como conectado"></label>
        <div class="actions full"><button class="btn primary">Agregar problema resuelto</button></div>
      </form>
      <div class="problem-list">${rows}</div>
    </div>
  `;
}

function maskSecret(value, show) {
  if (!value) return "";
  return show ? escapeHtml(value) : "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢";
}

function renderTechnicalDataSection() {
  const rows = orderTechnicalData().map((item) => `
    <div class="tech-row">
      <div><strong>${escapeHtml(item.equipo)} ${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}</strong></div>
      <div>Nombre: ${escapeHtml(item.nombre_asignado)}</div>
      <div>IP: ${escapeHtml(item.ip)}</div>
      <div>Usuario: ${escapeHtml(item.usuario)}</div>
      <div>ContraseÃ±a Omada: <strong>${maskSecret(item.contrasena, item.showSecrets)}</strong></div>
      <div>SSID: ${escapeHtml(item.ssid)}</div>
      <div>Clave WiFi: <strong>${maskSecret(item.clave_wifi, item.showSecrets)}</strong></div>
      <div class="mini muted">Dato sensible Â· ${escapeHtml(item.observaciones || "")}</div>
      <div class="actions"><button class="btn" data-action="toggle-secrets" data-id="${item.id}">${item.showSecrets ? "Ocultar contraseÃ±as" : "Mostrar contraseÃ±as"}</button></div>
    </div>
  `).join("") || `<div class="empty">Sin datos tecnicos cargados.</div>`;
  return `
    <div class="panel">
      <h2>Datos tecnicos</h2>
      <form class="form-grid" onsubmit="event.preventDefault(); saveTechnicalData(this);">
        <input type="hidden" name="id" value="">
        <label>Equipo<input name="equipo" placeholder="Access Point"></label>
        <label>Marca<input name="marca" placeholder="TP-Link"></label>
        <label>Modelo<input name="modelo" placeholder="EAP245"></label>
        <label>Nombre asignado<input name="nombre_asignado" placeholder="AP-HOGARSANJOSE-01"></label>
        <label>IP<input name="ip" placeholder="192.168.0.17"></label>
        <label>Usuario<input name="usuario" placeholder="admin"></label>
        <label>ContraseÃ±a<input type="password" name="contrasena" placeholder="Dato sensible"></label>
        <label>SSID<input name="ssid" placeholder="HogarSanJose"></label>
        <label>Clave WiFi<input type="password" name="clave_wifi" placeholder="Dato sensible"></label>
        <label class="full">Observaciones<textarea name="observaciones"></textarea></label>
        <div class="actions full"><button class="btn primary">Guardar datos tecnicos</button></div>
      </form>
      <div class="tech-list">${rows}</div>
    </div>
  `;
}

function renderOrdenes() {
  const o = order();
  const pointOptions = ["camara", "recorrido_cable", "equipo", "energia", "conectividad", "prueba", "relevamiento"];
  const list = state.orders.map((item) => {
    const c = state.clients.find((client) => client.id === item.cliente_id);
    return `
      <article class="card ${item.id === state.selectedOrderId ? "selected" : ""}">
        <h3>${escapeHtml(item.numero)} Â· ${escapeHtml(item.tipo_trabajo)}</h3>
        <p>${escapeHtml(c?.nombre || "Sin cliente")}<br>${escapeHtml(item.descripcion)}</p>
        <div class="actions"><span class="status ${statusClass(item.estado)}">${escapeHtml(item.estado)}</span><button class="btn" data-action="select-order" data-id="${item.id}">Seleccionar</button></div>
      </article>
    `;
  }).join("");
  const form = `
    <div class="grid cols-2">
      <section class="grid">${list}</section>
      <section class="grid">
        <div class="panel">
          <h2>Nueva orden o edicion</h2>
          <form class="form-grid" onsubmit="event.preventDefault(); saveOrder(this);">
            <input type="hidden" name="id" value="${escapeHtml(o?.id || "")}">
            <label>Numero<input name="numero" required value="${escapeHtml(o?.numero || `OT-${String(state.orders.length + 1).padStart(4, "0")}`)}"></label>
            <label>Cliente<select name="cliente_id">${state.clients.map((item) => `<option value="${item.id}" ${o?.cliente_id === item.id ? "selected" : ""}>${escapeHtml(item.nombre)}</option>`).join("")}</select></label>
            <label>Tecnico<input name="tecnico" value="${escapeHtml(o?.tecnico || "")}"></label>
            <label>Fecha programada<input type="date" name="fecha_programada" value="${escapeHtml(o?.fecha_programada || today())}"></label>
            <label class="full">Tipo de trabajo<input name="tipo_trabajo" value="${escapeHtml(o?.tipo_trabajo || "")}"></label>
            <label class="full">Descripcion<textarea name="descripcion">${escapeHtml(o?.descripcion || "")}</textarea></label>
            <div class="actions full"><button class="btn primary">Guardar orden</button><button type="button" class="btn" onclick="generatePlanFromDescription(document.querySelector('[name=descripcion]').value)">Generar pasos IA</button></div>
          </form>
        </div>
        <div class="panel">
          <h2>Puntos de trabajo y evidencias</h2>
          <p class="mini">Planifica ubicaciones de camaras, recorridos de cable, equipos, energia y pruebas. Cada punto puede tener GPS, observacion y fotos propias.</p>
          <form class="form-grid" onsubmit="event.preventDefault(); addSitePointFromText(this.nombre.value, this.tipo.value); this.reset();">
            <label>Tipo<select name="tipo">${pointOptions.map((item) => `<option value="${item}">${escapeHtml(item)}</option>`).join("")}</select></label>
            <label>Nombre del punto<input name="nombre" placeholder="Ej: Recorrido cable por pared norte" required></label>
            <div class="actions full"><button class="btn primary">Agregar punto</button></div>
          </form>
          <div class="step-list" style="margin-top:12px">${renderSitePointRows("plan")}</div>
        </div>
        <div class="panel">
          <h2>Flujo del instalador</h2>
          <p class="mini">Reporte operativo para campo: preparacion, evidencias, riesgos, pruebas y cierre.</p>
          ${renderWorkflow("plan")}
        </div>
        ${renderTechnicalDataSection()}
      </section>
    </div>
  `;
  return renderShell(form, "Relevo", "Puntos de trabajo, recorrido, ubicaciones y evidencias requeridas.");
}

function renderVoiceBar() {
  const example = state.selectedView === "clientes"
    ? "Ej: seleccionar cliente Hogar San Jose"
    : state.selectedView === "ordenes" || state.selectedView === "trabajo"
    ? "Ej: seleccionar punto AP, sacar foto, problema..."
    : "Ej: iniciar trabajo, generar informe tecnico";
  const hasSpeech = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const secureHint = window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? ""
    : " Â· Si no escucha, Chrome puede exigir HTTPS para el microfono.";
  return `
    <div class="voice-bar ${listening ? "listening" : ""}">
      <div class="voice-dot"></div>
      <div style="flex:1">
        <strong>${handsFree ? "Manos libres activo" : listening ? "Escuchando" : "Comandos listos"}</strong>
        <div class="mini">${handsFree ? "Deci 'Oficio' y el comando. Para apagar, toca Detener." : example}</div>
        <div class="mini">${hasSpeech ? escapeHtml(voiceStatus) : "Tu navegador no soporta voz. Usa el comando escrito."}${secureHint}</div>
        ${assistantDialog.active ? `<div class="mini"><strong>Dialogo:</strong> ${escapeHtml(assistantDialog.question)}</div>` : ""}
      </div>
      <div class="voice-actions">
        <button class="btn warning" onclick="toggleHandsFree()">${handsFree ? "Detener" : "Manos libres"}</button>
        <button class="btn" onclick="toggleListening()">${listening && !handsFree ? "Detener" : "Escuchar"}</button>
      </div>
    </div>
    <div class="voice-input no-print">
      <input id="voiceText" placeholder="Escribir comando de voz para probar">
      <button class="btn primary" onclick="runVoiceCommand(document.querySelector('#voiceText').value)">Ejecutar comando</button>
      <button class="btn ghost" data-action="assistant">Asistente</button>
    </div>
  `;
}

function renderTrabajo() {
  const c = client();
  const o = order();
  const stepItem = currentStep();
  const selectedPoint = currentSitePoint();
  const pointSelect = orderSitePoints().length
    ? `<label>Punto activo<select onchange="selectSitePoint(this.value)">${orderSitePoints().map((point) => `<option value="${point.id}" ${selectedPoint?.id === point.id ? "selected" : ""}>${escapeHtml(point.nombre)}</option>`).join("")}</select></label>`
    : `<div class="empty">Agrega puntos de trabajo desde Ordenes.</div>`;
  const events = orderEvents().map((item) => `
    <div class="event ${escapeHtml(item.tipo_evento)}">
      <strong>${escapeHtml(item.tipo_evento)}</strong>
      <div>${escapeHtml(item.descripcion)}</div>
      <div class="mini muted">${formatDate(item.created_at)} ${item.latitud ? `Â· GPS ${item.latitud}, ${item.longitud}` : ""}</div>
    </div>
  `).join("") || `<div class="empty">Todavia no hay eventos.</div>`;

  const content = `
    <input id="photoInput" class="no-print" type="file" accept="image/*" capture="environment" style="display:none" onchange="handlePhoto(this)">
    <section class="work-layout" style="margin-top:14px">
      <div class="grid">
        <div class="current-step">
          <div class="actions" style="justify-content:space-between"><span>${escapeHtml(c.nombre)}</span><span class="status ${statusClass(o.estado)}">${escapeHtml(o.estado)}</span></div>
          <h2 style="margin-top:12px">${escapeHtml(o.tipo_trabajo)}</h2>
          <p>${escapeHtml(o.descripcion)}</p>
          <h3>Paso actual: ${escapeHtml(stepItem?.titulo || "Sin pasos")}</h3>
          <p>${escapeHtml(stepItem?.descripcion || "")}</p>
          <strong>Cronometro: ${elapsedLabel()}</strong>
        </div>
        <div class="panel">
          <h2>Acciones de instalacion</h2>
          <div style="margin-top:12px">${pointSelect}</div>
          <div class="quick-grid" style="margin-top:12px">
            <button class="btn primary" onclick="startWork()">Iniciar</button>
            <button class="btn primary" onclick="document.querySelector('#photoInput').click()">Foto</button>
            <button class="btn danger" onclick="addComment(prompt('Problema encontrado') || '', 'problema')">Problema</button>
            <button class="btn warning" onclick="addMaterialFromText(prompt('Material usado') || '')">Material</button>
            <button class="btn" onclick="addComment(prompt('Prueba realizada') || '', 'prueba')">Prueba</button>
            <button class="btn" onclick="completeStep()">Paso OK</button>
            <button class="btn primary" onclick="finishWork()">Finalizar</button>
          </div>
        </div>
        ${renderTaskLogSection()}
      </div>
      <aside>
        <div class="panel">
          <h2>Bitacora</h2>
          <div class="timeline" style="margin-top:12px">${events}</div>
        </div>
      </aside>
    </section>
  `;
  return renderShell(content, "Trabajo", "Lo imprescindible para registrar la instalacion en campo.");
}

function renderMateriales() {
  const rows = orderMaterials().map((item) => `
    <div class="material-row">
      <div class="step-dot">M</div>
      <div><strong>${escapeHtml(item.nombre_material)}</strong><div class="mini muted">${escapeHtml(item.observacion || "")}</div></div>
      <strong>${escapeHtml(item.cantidad)} ${escapeHtml(item.unidad)}</strong>
    </div>
  `).join("") || `<div class="empty">Sin materiales cargados.</div>`;
  const photos = state.evidence.filter((item) => item.orden_id === order().id).map((item) => {
    const point = orderSitePoints().find((point) => point.id === item.punto_id);
    return `
    <div class="photo photo-card">
      <img src="${item.url_archivo}" alt="${escapeHtml(item.descripcion)}">
      <div class="mini">
        <strong>${escapeHtml(point?.nombre || "Orden general")}</strong><br>
        ${escapeHtml(item.descripcion)}<br>
        ${formatDate(item.created_at)}${item.latitud ? `<br>GPS ${escapeHtml(item.latitud)}, ${escapeHtml(item.longitud)}` : ""}
      </div>
    </div>
  `;
  }).join("") || `<div class="empty full">Sin fotos cargadas.</div>`;
  const content = `
    <section class="grid cols-2">
      <div class="panel">
        <h2>Materiales</h2>
        <div class="actions" style="margin:12px 0"><button class="btn warning" onclick="addMaterialFromText(prompt('Material usado') || '')">Cargar material</button></div>
        <div class="material-list">${rows}</div>
        <h2 style="margin-top:18px">Puntos relevados</h2>
        <div class="step-list" style="margin-top:12px">${renderSitePointRows("work")}</div>
      </div>
      <div class="panel">
        <h2>Evidencias</h2>
        <input id="photoInput" type="file" accept="image/*" capture="environment" onchange="handlePhoto(this)" style="margin:12px 0">
        <div class="photo-grid">${photos}</div>
      </div>
    </section>
  `;
  return renderShell(content, "Evidencias", "Fotos y materiales usados.");
}

function toggleCheck(id) {
  const item = state.checklist.find((check) => check.id === id);
  item.estado = item.estado === "completado" ? "pendiente" : "completado";
  item.completed_at = item.estado === "completado" ? nowIso() : "";
  addEvent("prueba", `Checklist ${item.estado}: ${item.descripcion}`);
  saveState();
  render();
}

function renderCierre() {
  const issues = closingIssues();
  const checks = orderChecklist().map((item) => `
    <div class="check-row ${item.estado === "completado" ? "done" : ""}">
      <div class="step-dot">${item.estado === "completado" ? "OK" : ""}</div>
      <div><strong>${escapeHtml(item.descripcion)}</strong><div class="mini muted">${item.obligatorio ? "obligatorio" : "opcional"}</div></div>
      <button class="btn" onclick="toggleCheck('${item.id}')">${item.estado === "completado" ? "Desmarcar" : "Completar"}</button>
    </div>
  `).join("");
  const content = `
    <section class="grid cols-2">
      <div class="panel">
        <h2>Checklist final</h2>
        <div class="check-list" style="margin-top:12px">${checks}</div>
      </div>
      <div class="panel">
        <h2>Validacion de cierre</h2>
        ${issues.length ? `<p>Faltan pendientes antes de finalizar:</p><ul>${issues.map((item) => `<li>${escapeHtml(item.replace("- ", ""))}</li>`).join("")}</ul>` : `<p>Todo listo para cerrar el trabajo.</p>`}
        <div class="actions"><button class="btn primary" onclick="finishWork()">Finalizar trabajo</button><button class="btn" onclick="completeDemoClose()">Completar demo</button></div>
      </div>
    </section>
  `;
  return renderShell(content, "Cierre y checklist", "Validacion antes de terminar la orden.");
}

function budgetDocumentHtml() {
  const c = client();
  const o = order();
  const items = orderBudgetItems();
  const subtotal = budgetTotal();
  const rows = items.map((item) => `
    <tr>
      <td>${escapeHtml(item.categoria)}</td>
      <td><strong>${escapeHtml(item.concepto)}</strong><br><span class="mini">${escapeHtml(item.detalle || "")}</span></td>
      <td>${escapeHtml(item.cantidad)}</td>
      <td>${escapeHtml(item.unidad)}</td>
      <td>${money(item.precio_unitario)}</td>
      <td>${money(Number(item.cantidad || 0) * Number(item.precio_unitario || 0))}</td>
    </tr>
  `).join("");
  return `
    <h1>Presupuesto de trabajo</h1>
    <p><strong>Cliente:</strong> ${escapeHtml(c.nombre)}<br>
    <strong>Orden:</strong> ${escapeHtml(o.numero)}<br>
    <strong>Tecnico:</strong> ${escapeHtml(o.tecnico)}<br>
    <strong>Trabajo:</strong> ${escapeHtml(o.tipo_trabajo)}<br>
    <strong>Fecha:</strong> ${formatDate(nowIso())}</p>
    <p>${escapeHtml(o.descripcion)}</p>
    <table class="budget-table">
      <thead><tr><th>Categoria</th><th>Concepto</th><th>Cant.</th><th>Unidad</th><th>Unitario</th><th>Total</th></tr></thead>
      <tbody>${rows || `<tr><td colspan="6">Sin items de presupuesto.</td></tr>`}</tbody>
      <tfoot><tr><td colspan="5">Total estimado</td><td>${money(subtotal)}</td></tr></tfoot>
    </table>
    <h2>Notas y condiciones</h2>
    <p>${escapeHtml(state.budgetNotes || "")}</p>
    <p><strong>Aceptacion del cliente:</strong> ______________________________________________</p>
  `;
}

function renderPresupuesto() {
  const items = orderBudgetItems();
  const rows = items.map((item) => `
    <div class="budget-row">
      <label>Categoria<input value="${escapeHtml(item.categoria)}" onchange="updateBudgetItem('${item.id}', 'categoria', this.value)"></label>
      <label>Concepto<input value="${escapeHtml(item.concepto)}" onchange="updateBudgetItem('${item.id}', 'concepto', this.value)"></label>
      <label class="full">Detalle<input value="${escapeHtml(item.detalle || "")}" onchange="updateBudgetItem('${item.id}', 'detalle', this.value)"></label>
      <label>Cant.<input type="number" min="0" step="0.01" value="${escapeHtml(item.cantidad)}" onchange="updateBudgetItem('${item.id}', 'cantidad', this.value)"></label>
      <label>Unidad<input value="${escapeHtml(item.unidad)}" onchange="updateBudgetItem('${item.id}', 'unidad', this.value)"></label>
      <label>Precio unitario<input type="number" min="0" step="1" value="${escapeHtml(item.precio_unitario)}" onchange="updateBudgetItem('${item.id}', 'precio_unitario', this.value)"></label>
      <div class="budget-line-total"><strong>${money(Number(item.cantidad || 0) * Number(item.precio_unitario || 0))}</strong><button class="btn danger" onclick="removeBudgetItem('${item.id}')">Eliminar</button></div>
    </div>
  `).join("") || `<div class="empty">Todavia no hay presupuesto. Genera uno con la informacion relevada.</div>`;
  const content = `
    <section class="grid cols-2">
      <div class="grid">
        <div class="panel">
          <h2>Generador</h2>
          <p>Usa la informacion de la orden, puntos relevados, materiales, incidencias y tiempo registrado para proponer un presupuesto editable.</p>
          <div class="actions"><button class="btn primary" onclick="generateBudget()">Generar presupuesto</button><button class="btn" onclick="addBudgetItem({})">Agregar item</button><button class="btn" onclick="window.print()">Exportar PDF</button><button class="btn" onclick="shareBudget()">Compartir</button></div>
        </div>
        <div class="panel">
          <h2>Items editables</h2>
          <div class="budget-list">${rows}</div>
          <label style="margin-top:12px">Notas y condiciones<textarea oninput="state.budgetNotes=this.value; saveState();">${escapeHtml(state.budgetNotes || "")}</textarea></label>
        </div>
      </div>
      <aside class="panel">
        <h2>Total estimado</h2>
        <div class="stat" style="margin:12px 0"><strong>${money(budgetTotal())}</strong><span>${items.length} item(s)</span></div>
        <article class="report">${budgetDocumentHtml()}</article>
      </aside>
    </section>
  `;
  return renderShell(content, "Presupuesto", "Cotizacion editable despues de relevar toda la informacion del trabajo.", `<button class="btn primary" onclick="generateBudget()">Generar presupuesto</button>`);
}

function renderInforme() {
  if (!state.companyReportDraft) state.companyReportDraft = buildCompanyReport();
  const content = `
    <section class="grid">
      <div class="panel no-print">
        <h2>Informe de tareas y relevo</h2>
        <div class="actions" style="margin-top:12px">
          <button class="btn primary" onclick="state.companyReportDraft=buildCompanyReport(); saveState(); render();">Actualizar informe</button>
          <button class="btn" onclick="window.print()">Exportar PDF</button>
        </div>
      </div>
      <div class="panel no-print">
        <h2>Texto editable</h2>
        <textarea style="min-height:160px" oninput="state.companyReportDraft=this.value; saveState();">${escapeHtml(state.companyReportDraft)}</textarea>
      </div>
      <article class="report">${state.companyReportDraft}</article>
    </section>
  `;
  return renderShell(content, "Informe", "Resumen editable de tareas, relevo, problemas y estado final.", `<button class="btn primary" onclick="window.print()">PDF</button>`);
}

async function shareReport() {
  const text = document.querySelector(".report")?.innerText || "";
  if (navigator.share) {
    await navigator.share({ title: "Informe OficioPro IA", text });
  } else {
    await navigator.clipboard.writeText(text);
    alert("Informe copiado al portapapeles.");
  }
}

async function shareBudget() {
  const text = document.querySelector(".report")?.innerText || "";
  if (navigator.share) {
    await navigator.share({ title: "Presupuesto OficioPro IA", text });
  } else {
    await navigator.clipboard.writeText(text);
    alert("Presupuesto copiado al portapapeles.");
  }
}

function render() {
  const views = {
    ordenes: renderOrdenes,
    trabajo: renderTrabajo,
    materiales: renderMateriales,
    informe: renderInforme
  };
  if (!views[state.selectedView]) {
    state.selectedView = "trabajo";
    saveState();
  }
  document.querySelector("#app").innerHTML = views[state.selectedView]();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (action === "select-client") return selectClient(id);
  if (action === "select-order") return selectOrder(id);
  if (action === "select-point") return selectSitePoint(id);
  if (action === "use-point") return selectSitePoint(id, "trabajo");
  if (action === "photo-point") return requestPointPhoto(id);
  if (action === "photo-task") return requestTaskPhoto(id);
  if (action === "scan-evidence") return state.selectedEvidenceId === id ? (state.selectedEvidenceId = "", saveState(), render()) : selectEvidenceForScan(id);
  if (action === "ocr-evidence") return runNativeOcr(id);
  if (action === "ai-evidence") return analyzeEvidenceWithAI(id);
  if (action === "task-from-evidence") return saveExtractionAsTask(id);
  if (action === "survey-point") return markSitePointSurveyed(id, prompt("Observacion del punto") || "");
  if (action === "remove-point") return removeSitePoint(id);
  if (action === "toggle-workflow") return toggleWorkflowItem(id);
  if (action === "toggle-secrets") return toggleTechnicalSecrets(id);
  if (action === "assistant") return startAssistant();
  if (action === "test-commands") return runCommandSelfTest();
});

window.oficioRunCommand = runVoiceCommand;
window.oficioDebugState = () => state;
window.selectClient = selectClient;
window.selectOrder = selectOrder;
window.selectSitePoint = selectSitePoint;
window.markSitePointSurveyed = markSitePointSurveyed;
window.removeSitePoint = removeSitePoint;
window.requestPointPhoto = requestPointPhoto;
window.requestTaskPhoto = requestTaskPhoto;
window.selectEvidenceForScan = selectEvidenceForScan;
window.saveEvidenceScan = saveEvidenceScan;
window.runNativeOcr = runNativeOcr;
window.analyzeEvidenceWithAI = analyzeEvidenceWithAI;
window.saveExtractionAsTask = saveExtractionAsTask;
window.saveVisionConfig = saveVisionConfig;
window.addTaskLogFromForm = addTaskLogFromForm;
window.addResolvedProblemFromForm = addResolvedProblemFromForm;
window.saveTechnicalData = saveTechnicalData;
window.toggleTechnicalSecrets = toggleTechnicalSecrets;
window.buildCompanyReport = buildCompanyReport;
window.buildFullTechnicalReport = buildFullTechnicalReport;
window.startAssistant = startAssistant;
window.runCommandSelfTest = runCommandSelfTest;
render();
clearInterval(tickTimer);
tickTimer = setInterval(() => {
  if (state.selectedView === "trabajo" && order().estado === "en curso") render();
}, 1000);
