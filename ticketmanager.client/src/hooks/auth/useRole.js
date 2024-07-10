const useRole = (requiredRoles) => {
    const { roles } = useAuth();
    return requiredRoles.some(role => roles.includes(role));
};

export default useRole;