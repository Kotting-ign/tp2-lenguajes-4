import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Configuración predeterminada de EmailJS (puede modificarse o cargarse vía variables de entorno)
const EMAILJS_CONFIG = {
  serviceId: 'service_lenguaje4',
  templateId: 'template_contacto',
  publicKey: 'tu_public_key_aqui'
};

export default function FormularioContacto() {
  // Estados para los valores de los campos
  const [formData, setFormData] = useState({
    nombreApellido: '',
    emailRemitente: '',
    emailDestino: 'contacto@ucasal.edu.ar', // Permite ingresar cualquier correo según lo solicitado
    mensaje: ''
  });

  // Estados para errores de validación de cada campo
  const [errores, setErrores] = useState({});

  // Control para saber qué campos fueron interactuados (touched)
  const [tocado, setTocado] = useState({});

  // Estados para el flujo de envío
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // Estado para desplegar opciones avanzadas de configuración de EmailJS si se desea
  const [mostrarConfigEmail, setMostrarConfigEmail] = useState(false);
  const [configEmailJS, setConfigEmailJS] = useState(EMAILJS_CONFIG);

  // Funciones de validación específicas para cada campo
  const validarCampo = (campo, valor) => {
    let error = '';

    switch (campo) {
      case 'nombreApellido':
        if (!valor || valor.trim() === '') {
          error = 'El Nombre y Apellido es obligatorio.';
        } else if (valor.trim().length < 3) {
          error = 'Debe ingresar al menos 3 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)) {
          error = 'El nombre solo puede contener letras y espacios.';
        }
        break;

      case 'emailRemitente':
        if (!valor || valor.trim() === '') {
          error = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())) {
          error = 'Ingrese un formato de correo electrónico válido (ej: usuario@correo.com).';
        }
        break;

      case 'emailDestino':
        if (!valor || valor.trim() === '') {
          error = 'El correo de destino es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())) {
          error = 'Ingrese un correo de destino válido.';
        }
        break;

      case 'mensaje':
        if (!valor || valor.trim() === '') {
          error = 'El mensaje no puede estar vacío.';
        } else if (valor.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres.';
        } else if (valor.length > 300) {
          error = 'El mensaje no puede superar el límite de 300 caracteres.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para el mensaje, aseguramos que nunca exceda los 300 caracteres al tipear
    const valorFinal = name === 'mensaje' ? value.slice(0, 300) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: valorFinal
    }));

    // Si el usuario ya interactuó con el campo, actualizamos el error en tiempo real
    if (tocado[name]) {
      const error = validarCampo(name, valorFinal);
      setErrores((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Manejar cuando el usuario sale del foco (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTocado((prev) => ({ ...prev, [name]: true }));

    const error = validarCampo(name, value);
    setErrores((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  // Validar todo el formulario antes de enviar
  const validarFormularioCompleto = () => {
    const nuevosErrores = {};
    Object.keys(formData).forEach((campo) => {
      const error = validarCampo(campo, formData[campo]);
      if (error) {
        nuevosErrores[campo] = error;
      }
    });

    setErrores(nuevosErrores);
    // Marcamos todos los campos como tocados para que se visualicen los errores
    setTocado({
      nombreApellido: true,
      emailRemitente: true,
      emailDestino: true,
      mensaje: true
    });

    return Object.keys(nuevosErrores).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');

    const esValido = validarFormularioCompleto();
    if (!esValido) {
      setMensajeError('Por favor complete y corrija los campos marcados antes de enviar.');
      return;
    }

    setEnviando(true);

    const templateParams = {
      from_name: formData.nombreApellido.trim(),
      from_email: formData.emailRemitente.trim(),
      to_email: formData.emailDestino.trim(),
      message: formData.mensaje.trim(),
      fecha: new Date().toLocaleString('es-AR')
    };

    let envioExitoso = false;

    // 1. Intentar enviar mediante EmailJS (lo visto en clases) si las credenciales están configuradas
    if (
      configEmailJS.publicKey &&
      configEmailJS.publicKey !== 'tu_public_key_aqui' &&
      configEmailJS.serviceId &&
      configEmailJS.templateId
    ) {
      try {
        await emailjs.send(
          configEmailJS.serviceId,
          configEmailJS.templateId,
          templateParams,
          configEmailJS.publicKey
        );
        envioExitoso = true;
      } catch (err) {
        console.warn('Fallo intento con EmailJS, procediendo con método directo:', err);
      }
    }

    // 2. Si EmailJS no tenía credenciales reales o arrojó error, usamos el servicio directo
    // FormSubmit AJAX para que "pueda poner cualquier mail y que funcione" en tiempo real
    if (!envioExitoso) {
      try {
        const respuesta = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formData.emailDestino.trim())}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            'Nombre y Apellido': formData.nombreApellido.trim(),
            'Correo Remitente': formData.emailRemitente.trim(),
            'Mensaje de Contacto': formData.mensaje.trim(),
            _subject: `Nuevo mensaje de ${formData.nombreApellido} (TP3 Lenguaje IV)`,
            _template: 'table'
          })
        });

        if (respuesta.ok) {
          envioExitoso = true;
        } else {
          throw new Error('Error en el servicio de correo.');
        }
      } catch (errorDirecto) {
        console.error('Error al enviar:', errorDirecto);
        setMensajeError(
          'Ocurrió un error al enviar el correo. Por favor verifique su conexión e intente nuevamente.'
        );
        setEnviando(false);
        return;
      }
    }

    // Éxito en el envío
    setEnviando(false);
    setMensajeExito(
      `¡Mensaje enviado con éxito a "${formData.emailDestino.trim()}"! Muchas gracias por contactarnos.`
    );

    // Resetear campos
    setFormData({
      nombreApellido: '',
      emailRemitente: '',
      emailDestino: formData.emailDestino, // Preservar el mail de destino configurado
      mensaje: ''
    });
    setTocado({});
    setErrores({});
  };

  // Reiniciar formulario
  const handleReset = () => {
    setFormData({
      nombreApellido: '',
      emailRemitente: '',
      emailDestino: 'contacto@ucasal.edu.ar',
      mensaje: ''
    });
    setErrores({});
    setTocado({});
    setMensajeExito('');
    setMensajeError('');
  };

  const caracteresRestantes = 300 - formData.mensaje.length;

  return (
    <div className="form-card-container">
      <div className="form-header">
        <div className="form-badge">TP3 · Lenguaje IV</div>
        <h2 className="form-title">Formulario de Contacto</h2>
        <p className="form-subtitle">
          Completa los campos a continuación. Los datos serán validados y enviados directamente por correo electrónico.
        </p>
      </div>

      {mensajeExito && (
        <div className="alert alert-success" role="alert">
          <div className="alert-icon">✓</div>
          <div className="alert-content">
            <h4>¡Envío completado!</h4>
            <p>{mensajeExito}</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setMensajeExito('')}
              style={{ marginTop: '0.5rem' }}
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      )}

      {mensajeError && (
        <div className="alert alert-error" role="alert">
          <div className="alert-icon">⚠</div>
          <div className="alert-content">
            <h4>No pudimos enviar el mensaje</h4>
            <p>{mensajeError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="contacto-form">
        {/* Campo: Nombre y Apellido */}
        <div className={`form-group ${tocado.nombreApellido && errores.nombreApellido ? 'has-error' : ''} ${tocado.nombreApellido && !errores.nombreApellido && formData.nombreApellido ? 'is-valid' : ''}`}>
          <label htmlFor="nombreApellido" className="form-label">
            Nombre y Apellido <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="nombreApellido"
              name="nombreApellido"
              className="form-control"
              placeholder="Ej: Ignacio Kotting"
              value={formData.nombreApellido}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={tocado.nombreApellido && !!errores.nombreApellido}
              aria-describedby={errores.nombreApellido ? 'error-nombreApellido' : undefined}
            />
            {tocado.nombreApellido && (
              <span className="validation-icon" aria-hidden="true">
                {errores.nombreApellido ? '✕' : '✓'}
              </span>
            )}
          </div>
          {tocado.nombreApellido && errores.nombreApellido && (
            <p id="error-nombreApellido" className="error-text">
              <span className="error-bullet">•</span> {errores.nombreApellido}
            </p>
          )}
        </div>

        {/* Campo: Correo Electrónico del Remitente */}
        <div className={`form-group ${tocado.emailRemitente && errores.emailRemitente ? 'has-error' : ''} ${tocado.emailRemitente && !errores.emailRemitente && formData.emailRemitente ? 'is-valid' : ''}`}>
          <label htmlFor="emailRemitente" className="form-label">
            Tu Correo Electrónico <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="emailRemitente"
              name="emailRemitente"
              className="form-control"
              placeholder="tu.correo@ejemplo.com"
              value={formData.emailRemitente}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={tocado.emailRemitente && !!errores.emailRemitente}
              aria-describedby={errores.emailRemitente ? 'error-emailRemitente' : undefined}
            />
            {tocado.emailRemitente && (
              <span className="validation-icon" aria-hidden="true">
                {errores.emailRemitente ? '✕' : '✓'}
              </span>
            )}
          </div>
          {tocado.emailRemitente && errores.emailRemitente && (
            <p id="error-emailRemitente" className="error-text">
              <span className="error-bullet">•</span> {errores.emailRemitente}
            </p>
          )}
        </div>

        {/* Campo: Correo de Destino (para poder poner cualquier mail y que funcione) */}
        <div className={`form-group ${tocado.emailDestino && errores.emailDestino ? 'has-error' : ''} ${tocado.emailDestino && !errores.emailDestino && formData.emailDestino ? 'is-valid' : ''}`}>
          <div className="label-with-badge">
            <label htmlFor="emailDestino" className="form-label">
              Correo de Destino <span className="required-star">*</span>
            </label>
            <span className="badge-hint">Podés colocar cualquier mail</span>
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              id="emailDestino"
              name="emailDestino"
              className="form-control"
              placeholder="correo.destino@ejemplo.com"
              value={formData.emailDestino}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={tocado.emailDestino && !!errores.emailDestino}
              aria-describedby={errores.emailDestino ? 'error-emailDestino' : undefined}
            />
            {tocado.emailDestino && (
              <span className="validation-icon" aria-hidden="true">
                {errores.emailDestino ? '✕' : '✓'}
              </span>
            )}
          </div>
          <span className="field-hint">
            A este buzón de correo se reenviarán los datos del formulario.
          </span>
          {tocado.emailDestino && errores.emailDestino && (
            <p id="error-emailDestino" className="error-text">
              <span className="error-bullet">•</span> {errores.emailDestino}
            </p>
          )}
        </div>

        {/* Campo: Mensaje (no mayor a 300 caracteres) */}
        <div className={`form-group ${tocado.mensaje && errores.mensaje ? 'has-error' : ''} ${tocado.mensaje && !errores.mensaje && formData.mensaje ? 'is-valid' : ''}`}>
          <div className="label-with-counter">
            <label htmlFor="mensaje" className="form-label">
              Mensaje <span className="required-star">*</span>
            </label>
            <span
              className={`char-counter ${
                formData.mensaje.length >= 300
                  ? 'char-limit-reached'
                  : formData.mensaje.length >= 260
                  ? 'char-limit-near'
                  : ''
              }`}
            >
              {formData.mensaje.length} / 300 caracteres ({caracteresRestantes} restantes)
              {formData.mensaje.length >= 300 && ' - Límite alcanzado'}
            </span>
          </div>
          <div className="textarea-wrapper">
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              maxLength={300}
              className="form-control"
              placeholder="Escribe tu consulta o mensaje aquí (máximo 300 caracteres)..."
              value={formData.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={tocado.mensaje && !!errores.mensaje}
              aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
            />
          </div>
          <div className="char-progress-bar">
            <div
              className={`char-progress-fill ${
                formData.mensaje.length >= 300
                  ? 'progress-danger'
                  : formData.mensaje.length >= 260
                  ? 'progress-warning'
                  : 'progress-normal'
              }`}
              style={{ width: `${(formData.mensaje.length / 300) * 100}%` }}
            />
          </div>
          {tocado.mensaje && errores.mensaje && (
            <p id="error-mensaje" className="error-text">
              <span className="error-bullet">•</span> {errores.mensaje}
            </p>
          )}
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={enviando}
          >
            {enviando ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span>Enviando correo...</span>
              </>
            ) : (
              <>
                <span>Enviar Mensaje</span>
                <span className="btn-icon">✈</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={enviando}
          >
            Limpiar Formulario
          </button>
        </div>
      </form>

      {/* Sección opcional para ver/editar credenciales de EmailJS de clases */}
      <div className="emailjs-toggle-wrapper">
        <button
          type="button"
          className="btn-toggle-config"
          onClick={() => setMostrarConfigEmail(!mostrarConfigEmail)}
        >
          ⚙ {mostrarConfigEmail ? 'Ocultar' : 'Configurar'} Credenciales EmailJS (Opcional)
        </button>

        {mostrarConfigEmail && (
          <div className="emailjs-config-box">
            <p className="config-desc">
              Si posees tus claves de cuenta de <strong>EmailJS</strong>, puedes ingresarlas aquí:
            </p>
            <div className="config-grid">
              <div>
                <label className="config-label">Service ID</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={configEmailJS.serviceId}
                  onChange={(e) =>
                    setConfigEmailJS({ ...configEmailJS, serviceId: e.target.value })
                  }
                  placeholder="service_..."
                />
              </div>
              <div>
                <label className="config-label">Template ID</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={configEmailJS.templateId}
                  onChange={(e) =>
                    setConfigEmailJS({ ...configEmailJS, templateId: e.target.value })
                  }
                  placeholder="template_..."
                />
              </div>
              <div>
                <label className="config-label">Public Key</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={configEmailJS.publicKey}
                  onChange={(e) =>
                    setConfigEmailJS({ ...configEmailJS, publicKey: e.target.value })
                  }
                  placeholder="Public Key"
                />
              </div>
            </div>
            <span className="config-note">
              ✓ Si dejas los campos por defecto o no tienes claves, el sistema utiliza el reenvío directo para entregar el correo a cualquier dirección ingresada.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
