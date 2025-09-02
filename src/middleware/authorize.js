function authorize(requiredPermission) {
  return (req, res, next) => {
    const usuario = req.user;
    if (
      !usuario ||
      !usuario.rolUsuario ||
      !usuario.rolUsuario.permisoUsuario ||
      !usuario.rolUsuario.permisoUsuario.includes(requiredPermission)
    ) {
      return res.status(403).json({ error: 'No tenés permiso para esta acción' });
    }
    next();
  };
}

module.exports = authorize;