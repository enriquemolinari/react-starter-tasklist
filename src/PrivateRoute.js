import User from "./User";

export default function PrivateRoute({ component, requiredRoles }) {
  if (!User.current().userId() || !User.current().hasRole(requiredRoles))
    return null;

  return component;
}
