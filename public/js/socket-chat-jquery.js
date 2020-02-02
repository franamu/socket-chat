// Funciones para renderizar  usuarios
var params = new URLSearchParams(window.location.search);
var nombre = params.get("nombre");
var sala = params.get("sala");

// referencias de jQuery
var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var divChatbox = $("#divChatbox");

function renderizarUsuarios(personas) {
  var html = "";
  html += "<li>";
  html += '<a href="javascript:void(0)" class="active">';
  html += "Chat de <span> " + params.get("sala") + "</span>";
  html += "</a>";
  html += "</li>";

  for (var i = 0; i < personas.length; i++) {
    html += "<li>";
    html +=
      '<a data-id="' +
      personas[i].id +
      '" href="javascript:void(0)"><img src="assets/images/users/user.png" alt="user-img" class="img-circle"> <span>' +
      personas[i].nombre +
      '<small class="text-success">online</small></span></a>';
    html += "</li>";
  }

  divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {
  var html = "";
  var fecha = new Date(mensaje.fecha);
  var hora = fecha.getHours() + ":" + fecha.getMilliseconds();
  var adminClass = "info";

  if (yo) {
    html += '<li class="reverse">';
    html += '  <div class="chat-content">';
    html += "    <h5>" + mensaje.nombre.nombre + "</h5>";
    html += "    " + mensaje.mensaje + "</div>";
    html += "  </div>";
    html += '  <div class="chat-img">';
    html += '    <img src="assets/images/users/user.png" alt="user" />';
    html += "  </div>";
    html += '  <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  } else {
    html += '<li class="animated fadeIn">';
    html += '  <div class="chat-img">';
    html += '    <img src="assets/images/users/user.png" alt="user" />';
    html += "  </div>";
    html += '  <div class="chat-content">';
    html += "    <h5>" + mensaje.nombre.nombre + "</h5>";
    html += '    <div class="box bg-light-info">';
    html += "" + mensaje.mensaje + "";
    html += "    </div>";
    html += "  </div>";
    html += '  <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  }

  divChatbox.append(html);
}

function scrollBottom() {
  // selectores
  var newMessage = divChatbox.children("li:last-child");

  // alturas
  var clientHeight = divChatbox.prop("clientHeight");
  var scrollTop = divChatbox.prop("scrollTop");
  var scrollHeight = divChatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// listeners
divUsuarios.on("click", "a", function() {
  var id = $(this).data("id");

  if (id) {
  }
});

formEnviar.on("submit", function(e) {
  e.preventDefault();

  if (txtMensaje.val().trim().length === 0) {
  }

  socket.emit(
    "crearMensaje",
    {
      nombre: sala,
      mensaje: txtMensaje.val()
    },
    function(mensaje) {
      txtMensaje.val("").focus();
      renderizarMensajes(mensaje, true);
      scrollBottom();
    }
  );
});
